/**
 * ============================================================================
 * sentry.client.config.ts — Sentry Client-Side SDK Configuration
 * ============================================================================
 *
 * Initialises Sentry for the browser (client bundle). This file is
 * automatically loaded by @sentry/nextjs.
 *
 * KVKK / GDPR Compliance:
 *   - PII (cookies, auth headers) is stripped in `beforeSend`.
 *   - tracesSampleRate is set to 10% (free-tier budget).
 *   - replaysOnErrorSampleRate captures 100% of error sessions.
 *   - replaysSessionSampleRate is set to 1% (minimal data).
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

    /** Capture replay for 100% of errored sessions (debugging). */
    replaysOnErrorSampleRate: 1.0,

    /** Minimal replay sampling for non-error sessions (1%). */
    replaysSessionSampleRate: 0.01,

    /** Tag the environment — Vercel sets VERCEL_ENV automatically. */
    environment: process.env.VERCEL_ENV ?? "development",

    /**
     * KVKK / GDPR: Strip any potential PII before sending to Sentry.
     * We only collect technical error data — never cookies, auth tokens,
     * or personal identifiers.
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

    /**
     * Integrations: only include replay if DSN is configured to avoid
     * loading the replay SDK when Sentry is disabled.
     */
    integrations: process.env.NEXT_PUBLIC_SENTRY_DSN
        ? [
            Sentry.replayIntegration({
                /** Do NOT capture text inputs in replays — KVKK PII concern. */
                maskAllText: true,
                /** Block all media to reduce data and avoid capturing PII. */
                blockAllMedia: true,
            }),
        ]
        : [],
});
