/**
 * Params Module
 * 
 * This module serves as the single source of truth for all feature-specific 
 * and environment-based configurations for the CompanyTech website. 
 * hard-coded values are avoided throughout the application by centralizing 
 * them here.
 */

export const Params = {
    /**
     * SMTP Configuration
     * These parameters control the email transport behavior for contact forms
     * and other automated notifications.
     */
    smtp: {
        /** 
         * The hostname or IP address of the SMTP server.
         * Default: "localhost" (for local testing with tools like MailDev)
         */
        host: process.env.SMTP_HOST || 'localhost',

        /** 
         * The port to connect to on the SMTP server.
         * Common values: 587 (TLS), 465 (SSL), 25 (Standard), 1025 (Local Test)
         */
        port: Number(process.env.SMTP_PORT || 1025),

        /** 
         * Whether to use a secure connection (SSL/TLS).
         * If true, the connection will use TLS when connecting to the server.
         * Note: Port 465 usually requires secure: true.
         */
        secure: process.env.SMTP_SECURE === 'true',

        /** 
         * Authentication parameters for the SMTP server.
         * user: The username for SMTP authentication.
         * pass: The password or app-specific token for SMTP authentication.
         */
        auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || '',
        },

        /** 
         * The default "From" address for outgoing emails.
         * This should typically be an authorized address in your mail provider.
         */
        from: process.env.SMTP_FROM || 'info@CompanyTech.com',
    },

    /**
     * Contact Page Configuration
     * Parameters related to the contact form behavior and routing.
     */
    contact: {
        /** 
         * The recipient email address where contact form submissions are sent.
         */
        recipientEmail: process.env.CONTACT_EMAIL || 'info@template.com',

        /** 
         * API Endpoint for contact form submission.
         */
        apiEndpoint: '/api/contact',

        /**
         * Rate Limiting Configuration
         * Prevents spam by limiting submissions per IP address.
         */
        rateLimit: {
            /** Maximum number of submissions allowed within the window. */
            maxSubmissions: 3,
            /** Time window in milliseconds (Default: 15 minutes). */
            windowMs: 15 * 60 * 1000,
        }
    },

    /**
     * Cloudflare Turnstile CAPTCHA Configuration
     * Protects forms from automated spam submissions.
     * Site key is safe for client-side (NEXT_PUBLIC_ prefix).
     * Secret key is server-only — never exposed to the browser.
     */
    turnstile: {
        /**
         * The Turnstile site key (public, embedded in the browser widget).
         * Get from: Cloudflare Dashboard → Turnstile → Site → Site Key
         */
        siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",

        /**
         * The Turnstile secret key (server-only, used for verification).
         * Get from: Cloudflare Dashboard → Turnstile → Site → Secret Key
         */
        secretKey: process.env.TURNSTILE_SECRET_KEY || "",

        /**
         * The Cloudflare Turnstile verification endpoint.
         * This is a fixed URL — do not change it.
         */
        verifyUrl: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    },

    /**
     * Newsletter Configuration
     * Parameters related to the newsletter subscription form.
     */
    newsletter: {
        /**
         * Rate Limiting Configuration
         * 1 submission per email per 24 hours.
         */
        rateLimit: {
            /** Maximum number of submissions allowed within the window. */
            maxSubmissions: 1,
            /** Time window in milliseconds (Default: 24 hours). */
            windowMs: 24 * 60 * 60 * 1000,
        }
    },

    /**
     * Formspree Configuration
     * Server-side only — the endpoint is never exposed to the client bundle.
     */
    formspree: {
        /**
         * The Formspree form endpoint for contact form submissions.
         * Get from: Formspree Dashboard → Forms → Integration → Endpoint
         */
        endpoint: process.env.FORMSPREE_ENDPOINT || "",
    },

    /**
     * Cookie Consent Configuration
     * KVKK (Law No. 6698) and GDPR (Article 7) compliance settings.
     */
    cookieConsent: {
        /** Name of the browser cookie that stores consent preferences. */
        cookieName: "CompanyTech_consent",
        /** Number of days the consent cookie is valid. */
        expiryDays: 365,
    },

    /**
     * Newsletter Confirmation Configuration
     * Base URL used to construct double opt-in confirmation links.
     */
    newsletterConfirmation: {
        /** Base URL for the website (used in confirmation email links). */
        baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://CompanyTech.com.tr",
    },

    /**
     * Sentry Error Monitoring Configuration
     * Tracks production errors and performance. KVKK/GDPR compliant:
     * PII (cookies, auth headers) is stripped in beforeSend hooks.
     */
    sentry: {
        /** Sentry DSN — public project identifier (safe for client-side). */
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
    },
} as const;

export type ParamsType = typeof Params;
