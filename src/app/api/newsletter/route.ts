/**
 * ============================================================================
 * POST /api/newsletter
 * ============================================================================
 *
 * Handles newsletter subscription requests from the website footer.
 *
 * DOUBLE OPT-IN FLOW (KVKK / GDPR compliant):
 *   1. Validate the incoming email address (server-side).
 *   2. Rate-limit by email (1 per email per 24 hours).
 *   3. Generate a unique confirmation token (UUID v4).
 *   4. Store the subscription in Supabase with status = "pending".
 *   5. Send a confirmation email to the subscriber with a unique link.
 *   6. Send a notification email to the CompanyTech team.
 *   7. Subscriber must click the link to confirm (status → "confirmed").
 *
 * SECURITY:
 *   - Rate limiting prevents spam signups (1 per email per 24h).
 *   - Email validation happens server-side (not trusting client input).
 *   - Supabase upsert on unique email index prevents duplicates.
 *   - IP addresses are NEVER stored raw (KVKK sensitive data).
 * ============================================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/EmailService";
import { Params } from "@/lib/Params";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import crypto from "crypto";

/* ── Rate-limiter (in-memory, per-email, resets on cold start) ──────── */
const emailHits = new Map<string, { count: number; resetAt: number }>();

/**
 * Checks if a specific email address has exceeded the newsletter
 * submission limit. Uses configuration from Params.newsletter.rateLimit.
 *
 * @param email - The lowercase, trimmed email to check
 * @returns true if the email has exceeded the rate limit
 */
function isEmailRateLimited(email: string): boolean {
    const now = Date.now();
    const entry = emailHits.get(email);
    const { maxSubmissions, windowMs } = Params.newsletter.rateLimit;

    /* First request or window expired — reset the counter */
    if (!entry || now > entry.resetAt) {
        emailHits.set(email, { count: 1, resetAt: now + windowMs });
        return false;
    }

    /* Increment and check against the limit */
    entry.count++;
    return entry.count > maxSubmissions;
}

/**
 * Generates a unique confirmation token using crypto.randomUUID().
 * This token is stored in the database and included in the
 * confirmation email link. It is a UUID v4 string.
 *
 * @returns A newly generated UUID string for email confirmation
 */
function generateConfirmationToken(): string {
    return crypto.randomUUID();
}

/* ── POST /api/newsletter ──────────────────────────────────────────── */
export async function POST(request: NextRequest) {
    try {
        /* --- Parse & validate ------------------------------------------ */
        const body = await request.json();
        const rawEmail = body.email;

        /** Reject if the email is missing, not a string, or malformed */
        if (
            !rawEmail ||
            typeof rawEmail !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)
        ) {
            return NextResponse.json(
                { error: "Valid email is required." },
                { status: 400 }
            );
        }

        /* Normalise the email for consistent dedup and rate limiting */
        const email = rawEmail.trim().toLowerCase();

        /* Determine locale from request body (default to "en") */
        const locale = body.locale || "en";

        /* --- Rate limiting (per email, 1 per 24h) --------------------- */
        if (isEmailRateLimited(email)) {
            return NextResponse.json(
                { error: "You've already subscribed recently. Please try again later." },
                { status: 429 }
            );
        }

        /* --- Generate confirmation token for double opt-in ------------ */
        const confirmationToken = generateConfirmationToken();

        /* --- Store in Supabase with status = "pending" ---------------- */
        if (isSupabaseConfigured() && supabase) {
            try {
                /**
                 * Look up visitor by fingerprint if provided by the client.
                 * This links the subscription to the existing visitor record.
                 */
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
                 * Upsert: insert the subscription, but if the email already
                 * exists (unique index), update the visitor_id, locale, status,
                 * and regenerate the confirmation_token (for re-subscription).
                 */
                await supabase.from("newsletter_subscribers").upsert(
                    {
                        email,
                        visitor_id: visitorId,
                        locale,
                        status: "pending",
                        confirmation_token: confirmationToken,
                    },
                    { onConflict: "email" }
                );
            } catch (dbErr) {
                /** Don't fail the subscription if the DB insert fails */
                console.error("[Newsletter API] Supabase insert error:", dbErr);
            }
        }

        /* --- Send confirmation email to subscriber -------------------- */
        const baseUrl = Params.newsletterConfirmation.baseUrl;
        const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${confirmationToken}&locale=${locale}`;

        try {
            await emailService.sendContactEmail({
                fullName: email,
                email,
                company: "",
                jobTitle: "",
                _subject: locale === "tr"
                    ? "CompanyTech bülten aboneliğinizi onaylayın"
                    : "Please confirm your CompanyTech newsletter subscription",
                _customBody: locale === "tr"
                    ? `Bülten aboneliğinizi onaylamak için lütfen aşağıdaki bağlantıya tıklayın:\n\n${confirmUrl}\n\nBu işlemi siz yapmadıysanız bu e-postayı görmezden gelebilirsiniz.`
                    : `Please click the following link to confirm your newsletter subscription:\n\n${confirmUrl}\n\nIf you did not request this, you can safely ignore this email.`,
            });
        } catch (emailErr) {
            console.error("[Newsletter API] Confirmation email error:", emailErr);
        }

        /* --- Send notification email to CompanyTech team ---------------- */
        try {
            await emailService.sendContactEmail({
                fullName: "Newsletter Subscriber",
                email,
                company: "",
                jobTitle: "",
                _subject: "New Newsletter Subscription (Pending) — CompanyTech",
            });
        } catch (notifyErr) {
            console.error("[Newsletter API] Team notification error:", notifyErr);
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[Newsletter API Error]", err);
        return NextResponse.json(
            { error: "Failed to process subscription." },
            { status: 500 }
        );
    }
}
