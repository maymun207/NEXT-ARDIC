import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/* ── Lightweight User-Agent parser ──────────────────── */
function parseUA(ua: string): { browser: string; os: string } {
    let browser = "Unknown";
    let os = "Unknown";

    // Browser detection
    if (ua.includes("Firefox/")) browser = "Firefox";
    else if (ua.includes("Edg/")) browser = "Edge";
    else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
    else if (ua.includes("Chrome/") && ua.includes("Safari/")) browser = "Chrome";
    else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";

    // OS detection
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac OS X") || ua.includes("Macintosh")) os = "macOS";
    else if (ua.includes("Linux") && !ua.includes("Android")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    return { browser, os };
}

/* ── POST /api/track ────────────────────────────────── */
export async function POST(request: NextRequest) {
    if (!isSupabaseConfigured() || !supabase) {
        return NextResponse.json({ ok: true }); // Silently succeed if not configured
    }

    try {
        const body = await request.json();
        const { fingerprint, page, locale, referrer } = body;

        if (!fingerprint) {
            return NextResponse.json({ error: "Missing fingerprint" }, { status: 400 });
        }

        // Parse user agent
        const ua = request.headers.get("user-agent") || "";
        const { browser, os } = parseUA(ua);

        // Geolocation from Vercel headers (available in production)
        const country = request.headers.get("x-vercel-ip-country") || null;
        const city = request.headers.get("x-vercel-ip-city") || null;
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            || request.headers.get("x-real-ip")
            || null;

        // Upsert visitor: create new or update existing
        const { data: visitor, error: visitorErr } = await supabase
            .from("visitors")
            .upsert(
                {
                    fingerprint,
                    first_seen_at: new Date().toISOString(),
                    last_seen_at: new Date().toISOString(),
                    visit_count: 1,
                },
                { onConflict: "fingerprint" }
            )
            .select("id, visit_count")
            .single();

        if (visitorErr) {
            // If upsert didn't return data, try to fetch + update manually
            const { data: existing } = await supabase
                .from("visitors")
                .select("id, visit_count")
                .eq("fingerprint", fingerprint)
                .single();

            if (existing) {
                await supabase
                    .from("visitors")
                    .update({
                        last_seen_at: new Date().toISOString(),
                        visit_count: existing.visit_count + 1,
                    })
                    .eq("id", existing.id);

                // Log the visit
                await supabase.from("visits").insert({
                    visitor_id: existing.id,
                    page,
                    locale,
                    browser,
                    os,
                    country,
                    city,
                    ip_address: ip,
                    referrer,
                });

                return NextResponse.json({ ok: true, visitorId: existing.id });
            }

            console.error("[Track API] Visitor upsert error:", visitorErr);
            return NextResponse.json({ ok: true }); // Don't fail the client
        }

        // If visitor was newly created by upsert, use returned data
        if (visitor) {
            // Update visit count if visitor already existed
            if (visitor.visit_count > 0) {
                await supabase
                    .from("visitors")
                    .update({
                        last_seen_at: new Date().toISOString(),
                        visit_count: visitor.visit_count + 1,
                    })
                    .eq("id", visitor.id);
            }

            // Log the visit
            await supabase.from("visits").insert({
                visitor_id: visitor.id,
                page,
                locale,
                browser,
                os,
                country,
                city,
                ip_address: ip,
                referrer,
            });

            return NextResponse.json({ ok: true, visitorId: visitor.id });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[Track API] Error:", err);
        return NextResponse.json({ ok: true }); // Never fail the client
    }
}
