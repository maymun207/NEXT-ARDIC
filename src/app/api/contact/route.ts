/**
 * ============================================================================
 * POST /api/contact
 * ============================================================================
 *
 * Server-side proxy for contact form submissions. Handles:
 *   1. Cloudflare Turnstile CAPTCHA verification (anti-spam)
 *   2. In-memory rate limiting (max 3 per IP per 15 min)
 *   3. Server-side field validation (email format, required fields)
 *   4. Supabase insert (captured BEFORE email send)
 *   5. SMTP email notification to the CompanyTech team
 *   6. Optional Formspree forwarding (server-side only)
 *
 * SECURITY:
 *   - Turnstile secret key is server-only (no NEXT_PUBLIC_ prefix)
 *   - Formspree endpoint is server-only (no NEXT_PUBLIC_ prefix)
 *   - Rate limiting uses x-forwarded-for for IP detection on Vercel
 * ============================================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/EmailService";
import { Params } from "@/lib/Params";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/* ── Rate-limiter (simple in-memory, per-IP, resets on cold start) ──── */
const hits = new Map<string, { count: number; resetAt: number }>();

/**
 * Checks if a specific IP address has exceeded the submission limit.
 * Uses configuration from Params.contact.rateLimit.
 *
 * @param ip - The client IP address to check
 * @returns true if the IP has exceeded the rate limit
 */
function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = hits.get(ip);
    const { maxSubmissions, windowMs } = Params.contact.rateLimit;

    /* First request or window expired — reset the counter */
    if (!entry || now > entry.resetAt) {
        hits.set(ip, { count: 1, resetAt: now + windowMs });
        return false;
    }

    /* Increment and check against the limit */
    entry.count++;
    return entry.count > maxSubmissions;
}

/**
 * Verifies a Cloudflare Turnstile token against the Turnstile API.
 * Returns true if the token is valid, false otherwise.
 *
 * @param token - The Turnstile response token from the client widget
 * @returns true if the CAPTCHA challenge was passed successfully
 */
async function verifyTurnstile(token: string): Promise<boolean> {
    /* Skip verification if Turnstile is not configured */
    if (!Params.turnstile.secretKey) {
        console.warn("[Contact API] Turnstile secret key not configured — skipping verification");
        return true;
    }

    try {
        const response = await fetch(Params.turnstile.verifyUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: Params.turnstile.secretKey,
                response: token,
            }),
        });

        const data = await response.json();
        return data.success === true;
    } catch (err) {
        console.error("[Contact API] Turnstile verification error:", err);
        return false;
    }
}

/* ── POST /api/contact ─────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
    try {
        /* --- Rate limiting -------------------------------------------- */
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            req.headers.get("x-real-ip") ??
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        /* --- Parse & validate body ------------------------------------ */
        const body = await req.json();

        /* Honeypot check for spam bots — silently succeed */
        if (body._gotcha) {
            return NextResponse.json({ ok: true });
        }

        /* --- Turnstile CAPTCHA verification --------------------------- */
        /* If a token was provided, verify it. If not, only reject when    */
        /* Turnstile is properly configured (secret key exists). This      */
        /* allows the form to work when Turnstile fails to load on the     */
        /* client (e.g. domain mismatch, network issue).                   */
        const turnstileToken = body.turnstileToken;
        if (turnstileToken) {
            const isHuman = await verifyTurnstile(turnstileToken);
            if (!isHuman) {
                return NextResponse.json(
                    { error: "CAPTCHA verification failed. Please try again." },
                    { status: 403 }
                );
            }
        } else if (Params.turnstile.secretKey) {
            /* Secret key is set but no token received — reject submission */
            return NextResponse.json(
                { error: "CAPTCHA verification is required." },
                { status: 400 }
            );
        }

        /* --- Server-side field validation ----------------------------- */
        const email = body["Email"] || body.email || "";
        const name = body["Contact Person"] || body.name || "";
        const company = body["Company Name"] || body.company || "";
        const message = body["Notes"] || body.message || "";

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "A valid email address is required." },
                { status: 400 }
            );
        }

        if (!name.trim()) {
            return NextResponse.json(
                { error: "Contact name is required." },
                { status: 400 }
            );
        }

        /* --- Store in Supabase FIRST (captured even if SMTP fails) ---- */
        if (isSupabaseConfigured() && supabase) {
            try {
                /* Look up visitor by fingerprint if provided */
                let visitorId: string | null = null;
                if (body.fingerprint) {
                    const { data: visitor } = await supabase
                        .from("visitors")
                        .select("id")
                        .eq("fingerprint", body.fingerprint)
                        .single();
                    if (visitor) visitorId = visitor.id;
                }

                /**
                 * Map form field names to database columns.
                 * The ContactModal sends: "Company Name", "Contact Person",
                 * "Email", "Phone", "Notes", "Assessment Call Requested".
                 */
                await supabase.from("contacts").insert({
                    visitor_id: visitorId,
                    email,
                    name,
                    company,
                    message,
                });
            } catch (dbErr) {
                /* Don't fail the contact form if DB insert fails */
                console.error("[Contact API] Supabase insert error:", dbErr);
            }
        }

        /* --- Send email using the EmailService ----------------------- */
        await emailService.sendContactEmail(body);

        /* --- Forward to Formspree (server-side, fire-and-forget) ------ */
        if (Params.formspree.endpoint) {
            try {
                await fetch(Params.formspree.endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        name,
                        company,
                        message,
                        _subject: "Contact Request — CompanyTech",
                    }),
                });
            } catch (formspreeErr) {
                /* Don't fail if Formspree is unreachable */
                console.error("[Contact API] Formspree error:", formspreeErr);
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[Contact API] Error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}
