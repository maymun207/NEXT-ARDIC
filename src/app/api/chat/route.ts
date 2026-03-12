import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { extractText, getDocumentProxy } from "unpdf";
import { loadGoogleDriveKnowledge } from "@/lib/google-drive-loader";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/* ── Max characters to extract per PDF ──────────────── */
const PDF_CHAR_LIMIT = 50_000;

export const dynamic = "force-dynamic";

/* ── Load AI configuration files ─────────────────────── */
async function loadAIConfig() {
    const aiDir = join(process.cwd(), "src", "ai");
    const persona = readFileSync(join(aiDir, "persona.md"), "utf-8");
    const sections: string[] = [];

    // 1. Load all .md files from knowledge/ directory
    const knowledgeDir = join(aiDir, "knowledge");
    if (existsSync(knowledgeDir)) {
        const mdFiles = readdirSync(knowledgeDir)
            .filter((f) => f.endsWith(".md"))
            .sort();
        for (const f of mdFiles) {
            const content = readFileSync(join(knowledgeDir, f), "utf-8");
            sections.push(`## [Knowledge: ${f}]\n\n${content}`);
        }
    }

    // 2. Parse PDF files from docs/ directory
    const docsDir = join(aiDir, "docs");
    if (existsSync(docsDir)) {
        const pdfFiles = readdirSync(docsDir)
            .filter((f) => f.endsWith(".pdf"))
            .sort();
        for (const f of pdfFiles) {
            try {
                const buffer = readFileSync(join(docsDir, f));
                const uint8 = new Uint8Array(buffer);
                const doc = await getDocumentProxy(uint8);
                const { text } = await extractText(doc, { mergePages: true });
                let extracted = text.trim();
                if (extracted.length > PDF_CHAR_LIMIT) {
                    extracted = extracted.slice(0, PDF_CHAR_LIMIT) + "\n\n[... document truncated ...]";
                }
                sections.push(`## [Document: ${f}]\n\n${extracted}`);
                console.log(`[Chat API] Loaded PDF: ${f} (${extracted.length} chars)`);
            } catch (err) {
                console.warn(`[Chat API] Could not parse PDF "${f}":`, err);
            }
        }
    }

    // 3. Load files from Google Drive (if configured)
    const driveContent = await loadGoogleDriveKnowledge();
    if (driveContent) {
        sections.push(`## [Google Drive Knowledge]\n\n${driveContent}`);
    }

    const knowledgeBase = sections.join("\n\n---\n\n");
    return { persona, knowledgeBase, sectionCount: sections.length };
}

/* ── Rate limiting ───────────────────────────────────── */
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 15; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

/* ── POST handler ────────────────────────────────────── */
export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please wait a moment." },
                { status: 429 }
            );
        }

        // Validate API key exists
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "AI service is not configured." },
                { status: 503 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { messages, locale = "en", stream: useStream = true, currentPage = "", calculatorState, fingerprint, sessionId } = body;

        // Helper: log a chat message to Supabase (fire-and-forget)
        const logChat = async (role: string, content: string) => {
            if (!isSupabaseConfigured() || !supabase || !content) return;
            try {
                let visitorId: string | null = null;
                if (fingerprint) {
                    const { data: visitor } = await supabase
                        .from("visitors")
                        .select("id")
                        .eq("fingerprint", fingerprint)
                        .single();
                    if (visitor) visitorId = visitor.id;
                }
                await supabase.from("chat_messages").insert({
                    visitor_id: visitorId,
                    session_id: sessionId || null,
                    role,
                    content,
                    page: currentPage || null,
                    locale,
                });
            } catch (err) {
                console.error("[Chat API] Supabase log error:", err);
            }
        };

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Messages are required." },
                { status: 400 }
            );
        }

        // Load persona & knowledge base
        const { persona, knowledgeBase } = await loadAIConfig();

        // Build system instruction
        const systemInstruction = buildSystemPrompt(persona, knowledgeBase, locale, currentPage, calculatorState);

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction,
            generationConfig: {
                temperature: 0.2,   // Low temperature = more deterministic, consistent factual recall
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 2048,
            },
        });

        // Build conversation history for Gemini
        // Gemini requires history to start with 'user' role.
        // If Temel sent proactive messages before the first user reply, we capture them
        // and inject them as context into the user's message — otherwise Gemini sees
        // "yes please" with no idea what the user is responding to.
        const allHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        // Find where the first user turn is
        const firstUserIdx = allHistory.findIndex((m: { role: string }) => m.role === "user");

        // Any model messages BEFORE the first user turn (proactive greetings / section prompts)
        const leadingModelMessages = firstUserIdx > 0
            ? allHistory.slice(0, firstUserIdx).map(m => m.parts[0].text).join("\n\n")
            : firstUserIdx === -1 && allHistory.length > 0
                ? allHistory.map(m => m.parts[0].text).join("\n\n")
                : "";

        // Clean history starts from the first user message
        const history = firstUserIdx >= 0 ? allHistory.slice(firstUserIdx) : [];

        // If Temel had context the user is responding to, prepend it so Gemini understands
        const rawLastMessage = messages[messages.length - 1].content;
        const lastMessage = leadingModelMessages && history.length === 0
            ? `[Context — Temel previously said:\n${leadingModelMessages}]\n\nUser reply: ${rawLastMessage}`
            : rawLastMessage;

        // Start chat session
        const chat = model.startChat({ history });


        // Log the user's message
        logChat("user", rawLastMessage);

        // Non-streaming mode (iOS fallback)
        if (!useStream) {
            const result = await chat.sendMessage(lastMessage);
            const text = result.response.text();
            logChat("assistant", text); // Log ARDI's response
            return NextResponse.json({ text });
        }

        // Streaming mode (default)
        const result = await chat.sendMessageStream(lastMessage);

        // Create SSE stream — robust dedup against Gemini SDK sending
        // cumulative or overlapping chunks instead of pure deltas
        const encoder = new TextEncoder();

        // Find the longest suffix of `a` that matches a prefix of `b`.
        // Returns the length of that overlap (0 if none).
        function overlapLength(a: string, b: string): number {
            const maxCheck = Math.min(a.length, b.length);
            for (let len = maxCheck; len > 0; len--) {
                if (a.endsWith(b.slice(0, len))) return len;
            }
            return 0;
        }

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    let accumulated = "";
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        if (!chunkText) continue;

                        let newText: string;

                        if (chunkText.startsWith(accumulated)) {
                            // Chunk is fully cumulative — take only the tail
                            newText = chunkText.slice(accumulated.length);
                        } else if (accumulated.includes(chunkText)) {
                            // Chunk is entirely contained in what we already sent
                            newText = "";
                        } else {
                            // Find overlap: longest suffix of accumulated that matches a prefix of chunk
                            const overlap = overlapLength(accumulated, chunkText);
                            newText = overlap > 0 ? chunkText.slice(overlap) : chunkText;
                        }

                        accumulated += newText;
                        if (newText) {
                            controller.enqueue(
                                encoder.encode(`data: ${JSON.stringify({ text: newText })}\n\n`)
                            );
                        }
                    }
                    // Log ARDI's complete response
                    logChat("assistant", accumulated);
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();
                } catch (err) {
                    const errorMsg = err instanceof Error ? err.message : "Stream error";
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ error: errorMsg })}\n\n`)
                    );
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        });
    } catch (err) {
        console.error("[Chat API Error]", err);
        const errorMsg = err instanceof Error ? err.message : String(err);

        // Rate limit / quota exceeded
        if (
            errorMsg.includes("429") ||
            errorMsg.includes("quota") ||
            errorMsg.includes("Too Many Requests") ||
            errorMsg.includes("RESOURCE_EXHAUSTED")
        ) {
            return NextResponse.json(
                { error: "rate_limit" },
                { status: 429 }
            );
        }

        // Auth / key issues
        if (errorMsg.includes("API_KEY") || errorMsg.includes("403") || errorMsg.includes("401")) {
            return NextResponse.json(
                { error: "auth_error" },
                { status: 503 }
            );
        }

        // General / connection errors
        return NextResponse.json(
            { error: "server_error" },
            { status: 500 }
        );
    }
}

/* ── Page content map ────────────────────────────────── */
const PAGE_CONTENT: Record<string, string> = {
    "Homepage": `The user is viewing the CompanyTech Homepage. Key sections visible:
- Hero carousel: "The Sentient Factory", "CWF: Chat With Your Factory", "Intelligent Manufacturing"
- Data Silenced / Untapped Potential section showing 4 loss categories:
  - Dark Data Loss ($8M–$12M): unmonitored process variables, invisible energy waste, yield losses, micro-stoppages
  - Reactive Maintenance ($15M–$25M): emergency breakdowns, lost production, spare parts overstocking, overtime catch-up
  - Quality Escapes ($10M–$18M): internal scrap, customer returns, rework labor, reputation loss
  - Decision Latency ($5M–$9M): inventory carrying costs, scheduling inefficiency, raw material waste, manual reporting labor
- ROI CALCULATOR (interactive 4-step wizard):
  - Step 1 Company Profile: Annual Revenue, # Factories, # Machines, Energy Costs, Raw Material Spend, Inventory Value
  - Step 2 Performance Metrics: OEE (0.3–0.95), Unplanned Downtime Rate, Scrap/Defect Rate, Customer Return Rate, Downtime Cost/Hour, Emergency Maintenance Calls/Year, Quality Inspectors, Supervisors
  - Step 3 Deployment Scope: Year 1/2/3 factories to deploy, Year 1/2/3 value capture rates (15–75%), Standard vs Custom investment model
  - Step 4 Results: Total Addressable Loss (midpoint), 3-Year Cumulative ROI, Payback Period (months), Loss breakdown bar chart, 3-Year Financial Table
  - All results apply a 30% conservative "reality discount" before display
  - Savings formula: midpoint × (factories deployed / total factories) × capture rate per year
- Platform overview: 4-layer architecture (IoT-Ignite, ArMES, ArAI, CWF)
- Engagement Path: Executive Workshop → POV → Pilot → Enterprise Scale
- Case Studies preview, Contact form

When users ask about the ROI calculator, coach them through inputs. Key advice:
- "I don't know my OEE" → suggest 50–65% as typical starting point for most manufacturers
- Most important inputs: Revenue (base for most formulas), OEE (drives Dark Data + Downtime), Downtime Cost/Hour (amplifies Reactive Maintenance)
- The 30% discount is already baked in — numbers are conservative
- Industry OEE benchmarks: Automotive 55–70%, Ceramics 50–65%, Food&Bev 45–65%, Pharma 50–70%, Chemicals 60–75%
- Industry downtime costs: Automotive $10K–$50K/hr, Pharma $5K–$30K/hr, Food $2K–$15K/hr, Ceramics $2K–$8K/hr
- Results: if Dark Data dominates → IoT-Ignite+ArAI; if Reactive Maintenance → ArMES predictive; if Quality → ArAI+SPC; if Decision Latency → CWF dashboards`,

    "About Us": `The user is viewing the CompanyTech About page. Key content:
- CompanyTech's mission: bridge the gap between raw industrial data and digital intelligence
- Company background: based in Istanbul, focused on Industry 4.0 for manufacturing
- Core values and approach to digital transformation
- Team and leadership
Discuss the company's story, values, and people if asked.`,

    "Case Studies": `The user is viewing the Case Studies page. They can see:
- Ceramic Tile Production case study: measurable OEE improvements, downtime reduction
- Raw Materials Factory case study: quality and traceability improvements
Proactively discuss real results, metrics, and outcomes from these case studies.`,

    "Ceramic Tile Production Case Study": `The user is viewing the Ceramic Tile Production Case Study in detail.
This case study shows how CompanyTech deployed IoT-Ignite + ArMES + ArAI at a ceramic tile manufacturer.
Key results include OEE uplift, reduced unplanned downtime, and improved quality traceability.
Go deep on this specific case study if asked.`,

    "Raw Materials Factory Case Study": `The user is viewing the Raw Materials Factory Case Study in detail.
This covers CompanyTech's deployment at a raw materials manufacturer with focus on production visibility and quality control.
Discuss the specific results and solution architecture if asked.`,

    "Careers": `The user is viewing the Careers page where they can submit their CV to CompanyTech.
CompanyTech is hiring talent passionate about Industry 4.0, IoT, AI, and manufacturing intelligence.
Encourage the user to apply and explain what it's like to work at CompanyTech if asked.`,
};

/* ── System prompt builder ───────────────────────────── */
function buildSystemPrompt(
    persona: string,
    knowledgeBase: string,
    locale: string,
    currentPage?: string,
    calculatorState?: Record<string, any>
): string {
    const pageContent = currentPage && PAGE_CONTENT[currentPage]
        ? `\n---\n\n# CURRENT PAGE CONTEXT\nThe user is currently on the **${currentPage}** page. Below is a description of the content they are seeing right now. Use this to give specific, contextual answers:\n\n${PAGE_CONTENT[currentPage]}`
        : currentPage
            ? `\n---\n\n# CURRENT PAGE CONTEXT\nThe user is currently on the **${currentPage}** page.`
            : "";

    // Inject live calculator numbers if the viewer has interacted with the calculator
    const calcContext = calculatorState ? `

---

# LIVE CALCULATOR STATE (The viewer's actual numbers right now)
The user is actively using the ROI Calculator. These are their CURRENT inputs and results — use these EXACT figures when discussing their situation:

**Company Profile:**
- Annual Revenue: $${(calculatorState.annualRevenue / 1_000_000).toFixed(0)}M
- Factories: ${calculatorState.numFactories}
- Machines: ${calculatorState.numMachines}
- Annual Energy Costs: $${(calculatorState.annualEnergyCosts / 1_000_000).toFixed(1)}M
- Annual Raw Material Spend: $${(calculatorState.annualRawMaterialSpend / 1_000_000).toFixed(0)}M
- Average Inventory Value: $${(calculatorState.averageInventoryValue / 1_000_000).toFixed(0)}M

**Performance Metrics:**
- OEE: ${(calculatorState.averageOEE * 100).toFixed(1)}%
- Unplanned Downtime Rate: ${(calculatorState.unplannedDowntimeRate * 100).toFixed(1)}%
- Scrap / Defect Rate: ${(calculatorState.scrapDefectRate * 100).toFixed(1)}%
- Downtime Cost per Hour: $${calculatorState.downtimeCostPerHour.toLocaleString()}
- Emergency Maintenance Calls/Year: ${calculatorState.emergencyMaintenanceCalls}

**Deployment Plan:**
- Factories in Year 1: ${calculatorState.year1Factories}, Year 2: ${calculatorState.year2Factories}, Year 3: ${calculatorState.year3Factories}
- Capture Rates: Year 1 ${(calculatorState.year1CaptureRate * 100).toFixed(0)}%, Year 2 ${(calculatorState.year2CaptureRate * 100).toFixed(0)}%, Year 3 ${(calculatorState.year3CaptureRate * 100).toFixed(0)}%
- Investment Model: ${calculatorState.investmentModel}

**Computed Results (their specific numbers):**
- ❗ Total Addressable Loss: $${(calculatorState.totalAddressableLoss / 1_000_000).toFixed(1)}M/year (after 30% reality discount)
- 🔍 Dark Data Loss: $${(calculatorState.darkDataLoss / 1_000_000).toFixed(1)}M
- 🔧 Reactive Maintenance Loss: $${(calculatorState.reactiveMaintenanceLoss / 1_000_000).toFixed(1)}M
- ⚠️ Quality Escapes Loss: $${(calculatorState.qualityEscapesLoss / 1_000_000).toFixed(1)}M
- ⚡ Decision Latency Loss: $${(calculatorState.decisionLatencyLoss / 1_000_000).toFixed(1)}M
- 📈 3-Year Cumulative ROI: ${(calculatorState.cumulativeROI * 100).toFixed(0)}%
- ⏱ Payback Period: ${Math.round(calculatorState.paybackMonths)} months
- 💰 Total Investment: $${(calculatorState.totalInvestment / 1_000_000).toFixed(1)}M | Total Savings: $${(calculatorState.totalSavings / 1_000_000).toFixed(1)}M

When the user asks about their results, ALWAYS reference these exact figures. Comment on which loss category dominates and what that means for which CompanyTech layer to prioritize. If their OEE is below 65%, note it's below world-class and there's significant upside. If payback is under 18 months, highlight it as a strong business case.` : "";

    return `
${persona}

---

# KNOWLEDGE BASE (Source of Truth)
Use the following information to answer user questions. Do NOT fabricate information beyond what is provided here.

${knowledgeBase}
${pageContent}
${calcContext}

---

# ADDITIONAL INSTRUCTIONS
- Always call yourself **Temel** — never "Company Agent" or "AI-powered advisor"
- The user's current website language is: ${locale === "tr" ? "Turkish" : "English"}
- ${locale === "tr" ? "You MUST respond in Turkish at all times. The user is on the Turkish version of the website. Write all your responses, greetings, suggestions, and explanations in Turkish. Use natural, professional Turkish." : "Respond in English by default. If the user writes in another language, respond in that language."}
- If the user asks something not covered in the knowledge base, acknowledge it honestly and suggest contacting the team
- Write in plain, conversational text. Do NOT use markdown headers (# ## ###), code blocks (\`\`\`), horizontal rules (---), or numbered/bullet lists with markdown syntax. You MAY use **bold** for emphasis. Use line breaks and short paragraphs to organize your response instead of markdown formatting.
- Keep responses focused and actionable

# DATA FIDELITY — CRITICAL
When quoting any numbers, benchmarks, percentages, ranges, or metrics:
- **ALWAYS use the EXACT figures from the knowledge base.** Do NOT round, paraphrase, estimate, or approximate.
- If the knowledge base says "OEE typical range for Ceramics: 50–65%", always say "50–65%" — never "around 55%" or "roughly 60%"
- If the knowledge base says "Downtime cost for Automotive: $10,000–$50,000/hr", always say "$10,000–$50,000/hr" — never "tens of thousands"
- Never invent numbers not explicitly stated in the knowledge base
- If a specific figure is not in the knowledge base, say so and recommend the team for an accurate assessment
- This rule is absolute: **consistency and accuracy of numbers is non-negotiable**
`.trim();
}
