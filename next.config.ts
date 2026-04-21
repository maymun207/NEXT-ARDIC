/**
 * ============================================================================
 * next.config.ts — Next.js 15 Configuration
 * ============================================================================
 *
 * Configures image optimization, HTTP security headers, and build settings.
 *
 * SECURITY HEADERS:
 *   The headers() function applies security headers when running in Next.js
 *   server mode (npm run dev / npm run start). On Vercel, the CDN edge
 *   headers in vercel.json take priority for static assets, but these
 *   headers still apply to API routes and server-rendered pages.
 *
 * CONTENT SECURITY POLICY (CSP):
 *   The CSP is STRICT by default. Only explicitly allowed sources can
 *   load resources. See the cspDirectives array below for the full policy.
 *
 * NOTE: When adding new external resources (fonts, analytics, etc.),
 *   update BOTH next.config.ts AND vercel.json to keep them in sync.
 * ============================================================================
 */

import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/* ── Content Security Policy Directives ─────────────────────────────────── */
/* Each directive on its own line for readability and easy maintenance.     */
/* TODO: Add a nonce-based script-src when CSP nonce middleware is set up.  */
const cspDirectives = [
    /* default-src: fallback for any resource type not explicitly listed */
    "default-src 'self'",

    /* script-src: JavaScript execution sources */
    /* 'self' = same-origin scripts only */
    /* 'unsafe-inline' = required for Next.js inline hydration/bootstrap scripts */
    /* TODO: Replace 'unsafe-inline' with 'nonce-${nonce}' when nonce middleware is implemented */
    /* *.sentry-cdn.com = Sentry SDK loader (if using lazy loading) */
    /* challenges.cloudflare.com = Cloudflare Turnstile CAPTCHA widget script */
    /* va.vercel-scripts.com = Vercel Web Analytics & Speed Insights scripts */
    "script-src 'self' 'unsafe-inline' *.sentry-cdn.com challenges.cloudflare.com va.vercel-scripts.com",

    /* style-src: CSS sources */
    /* 'unsafe-inline' is required for Tailwind CSS inline styles */
    "style-src 'self' 'unsafe-inline'",

    /* font-src: web font sources (Google Fonts served from gstatic) */
    "font-src 'self' fonts.gstatic.com",

    /* connect-src: fetch/XHR/WebSocket destinations */
    /* *.supabase.co = Supabase API and Realtime */
    /* formspree.io = contact form fallback */
    /* *.ingest.sentry.io = Sentry error and performance telemetry (EU) */
    /* *.ingest.us.sentry.io = Sentry US region telemetry */
    /* vitals.vercel-insights.com = Vercel Speed Insights beacon */
    /* challenges.cloudflare.com = Turnstile token verification requests */
    "connect-src 'self' *.supabase.co formspree.io *.ingest.sentry.io *.ingest.us.sentry.io vitals.vercel-insights.com challenges.cloudflare.com",

    /* img-src: image sources */
    /* 'self' = local images */
    /* data: = base64-encoded inline images */
    /* blob: = Next.js image optimization blobs */
    "img-src 'self' data: blob:",

    /* frame-src: allowed iframe sources */
    /* challenges.cloudflare.com = Cloudflare Turnstile CAPTCHA renders in an iframe */
    "frame-src 'self' challenges.cloudflare.com",

    /* frame-ancestors: who can embed this site in an iframe */
    /* 'none' = no one can frame this site (clickjacking protection) */
    "frame-ancestors 'none'",

    /* base-uri: restricts <base> element URL */
    "base-uri 'self'",

    /* form-action: where forms can submit to */
    /* 'self' = same-origin + formspree.io for contact forms */
    "form-action 'self' formspree.io",
];

/* Join all CSP directives into a single header value */
const contentSecurityPolicy = cspDirectives.join("; ");

/* ── Security Headers Array ─────────────────────────────────────────────── */
/* These headers are applied to ALL routes via the source: "/(.*)" pattern. */
const securityHeaders = [
    {
        /* Prevent the site from being embedded in iframes (clickjacking) */
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        /* Prevent MIME type sniffing attacks */
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        /* Enable DNS prefetching for external resources */
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        /* Control how much referrer information is sent with requests */
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        /* Restrict browser features/APIs the site can access */
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    {
        /* Force HTTPS for 2 years, include subdomains, allow preload list */
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        /* Content Security Policy — see cspDirectives above for breakdown */
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
    },
];

/* ── Next.js Configuration ──────────────────────────────────────────────── */
const nextConfig: NextConfig = {
    /**
     * Explicitly set Turbopack's root to this project directory.
     * Without this, Turbopack detects the stray package-lock.json at
     * /Users/tunckahveci/ and resolves node_modules from the wrong location,
     * causing "@tailwindcss/postcss" (and other deps) to not be found.
     */
    turbopack: {
        root: __dirname,
    },

    /* Image optimization settings */
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        qualities: [75, 90],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    /**
     * Async headers function — applies security headers to ALL routes.
     * These are active in Next.js server mode (dev + production).
     * On Vercel, vercel.json CDN headers take priority for static assets.
     */
    async headers() {
        return [
            {
                /* Match every route */
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

/**
 * In development, skip the Sentry wrapper entirely — it runs webpack transforms
 * on every file and is the primary cause of slow cold-start compilation.
 * In production builds, Sentry wraps the config for source map upload.
 */
const isDev = process.env.NODE_ENV === "development";

export default isDev
    ? nextConfig
    : withSentryConfig(nextConfig, {
          /* Suppress noisy source map upload logs in CI */
          silent: true,

          /* Use the org and project from Sentry environment or .sentryclirc */
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,

          /**
           * Automatically instrument API routes and data fetchers
           * for Sentry performance monitoring.
           */
          widenClientFileUpload: true,

          /**
           * Source maps: upload to Sentry for de-minified stack traces,
           * then delete from the build output so they are not served.
           */
          sourcemaps: {
              deleteSourcemapsAfterUpload: true,
          },

          /**
           * Automatically tree-shake unused Sentry code from the bundle.
           */
          disableLogger: true,
      });
