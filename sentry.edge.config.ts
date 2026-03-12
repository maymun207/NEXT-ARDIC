/**
 * ============================================================================
 * sentry.edge.config.ts — Sentry Edge Runtime SDK Configuration
 * ============================================================================
 *
 * Initialises Sentry for the Vercel Edge runtime (middleware, edge functions).
 * This file is automatically loaded by @sentry/nextjs.
 *
 * KVKK / GDPR Compliance:
 *   - Same PII stripping as the client and server configs.
 * ============================================================================
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    /** DSN from env — Sentry project identifier. */
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    /** Release tag — set at build time by vercel.json buildCommand via git describe. */
    release: process.env.NEXT_PUBLIC_APP_VERSION || "dev",

    /** 10% performance trace sampling — sufficient for free tier. */
    tracesSampleRate: 0.1,

    /** Tag the environment — Vercel sets VERCEL_ENV automatically. */
    environment: process.env.VERCEL_ENV ?? "development",

    /**
     * KVKK / GDPR: Strip any potential PII before sending to Sentry.
     */
    beforeSend(event) {
        if (event.request?.headers) {
            /* Remove cookie header — may contain session/consent data */
            delete event.request.headers["cookie"];
            /* Remove authorization header — may contain JWTs */
            delete event.request.headers["authorization"];
        }
        return event;
    },
});
