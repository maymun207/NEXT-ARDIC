/**
 * ============================================================================
 * GET /api/newsletter/confirm
 * ============================================================================
 *
 * Handles newsletter subscription confirmation (double opt-in).
 *
 * Flow:
 *   1. User subscribes via the footer → status is set to "pending".
 *   2. A confirmation email is sent with a link containing the token.
 *   3. User clicks the link → this route is called.
 *   4. Token is validated against the `newsletter_subscribers` table.
 *   5. Status is updated from "pending" to "confirmed".
 *   6. User is redirected to the homepage with ?subscribed=true.
 *
 * KVKK/GDPR COMPLIANCE:
 *   - Double opt-in ensures freely given, informed consent.
 *   - Unconfirmed subscriptions remain "pending" and are not used.
 * ============================================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    /* Extract the confirmation token from the query string */
    const token = request.nextUrl.searchParams.get("token");

    /* Determine locale for redirect (default to "en") */
    const locale = request.nextUrl.searchParams.get("locale") || "en";

    /* Token is required */
    if (!token) {
        return NextResponse.redirect(
            new URL(`/${locale}?subscribed=error`, request.url)
        );
    }

    /* Supabase must be configured to verify the token */
    if (!isSupabaseConfigured() || !supabase) {
        console.error("[Newsletter Confirm] Supabase not configured.");
        return NextResponse.redirect(
            new URL(`/${locale}?subscribed=error`, request.url)
        );
    }

    try {
        /* Find the subscriber with this confirmation token and "pending" status */
        const { data: subscriber, error: findError } = await supabase
            .from("newsletter_subscribers")
            .select("id, status")
            .eq("confirmation_token", token)
            .eq("status", "pending")
            .single();

        if (findError || !subscriber) {
            /* Token not found or already confirmed */
            return NextResponse.redirect(
                new URL(`/${locale}?subscribed=already`, request.url)
            );
        }

        /* Update status to "confirmed" and clear the token */
        const { error: updateError } = await supabase
            .from("newsletter_subscribers")
            .update({
                status: "confirmed",
                confirmation_token: null,
                confirmed_at: new Date().toISOString(),
            })
            .eq("id", subscriber.id);

        if (updateError) {
            console.error("[Newsletter Confirm] Update error:", updateError);
            return NextResponse.redirect(
                new URL(`/${locale}?subscribed=error`, request.url)
            );
        }

        /* Success — redirect to homepage with confirmation flag */
        return NextResponse.redirect(
            new URL(`/${locale}?subscribed=true`, request.url)
        );
    } catch (err) {
        console.error("[Newsletter Confirm] Error:", err);
        return NextResponse.redirect(
            new URL(`/${locale}?subscribed=error`, request.url)
        );
    }
}
