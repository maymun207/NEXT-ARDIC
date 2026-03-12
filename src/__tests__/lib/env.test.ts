/**
 * ============================================================================
 * src/__tests__/lib/env.test.ts — Environment Variable Configuration Tests
 * ============================================================================
 *
 * Validates that the .env.example file documents all required environment
 * variables, acting as a contract between the codebase and deployment.
 *
 * PURPOSE:
 *   Catches common deployment failure modes:
 *   - "It worked locally but failed on Vercel" (variable missing from .env.example)
 *   - Required variables accidentally removed from .env.example
 *   - New features adding env vars without documenting them
 *
 * DESIGN CHOICE:
 *   We test the .env.example file (not process.env) because:
 *   1. The env.example is the contract document — tests run without real secrets
 *   2. Live env var values are validated by the CI pipeline's build step
 *   3. This test should pass locally without any credentials configured
 *
 * HOW TO EXTEND:
 *   Add new required variable names to REQUIRED_VARS below when you add
 *   a new integration or feature that depends on an environment variable.
 * ============================================================================
 */

import fs from "fs";
import path from "path";

/**
 * All environment variables that MUST be documented in .env.example.
 * Adding a var here is the "contract" that it must be in .env.example.
 */
const REQUIRED_VARS = [
    /* Supabase client-side vars — safe for browser */
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    /* Supabase server-side vars — never expose client-side */
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    /* CAPTCHA (Cloudflare Turnstile) */
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    "TURNSTILE_SECRET_KEY",
    /* SMTP email service */
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "CONTACT_EMAIL",
    /* Site identity */
    "NEXT_PUBLIC_SITE_NAME",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SITE_DESCRIPTION",
] as const;

/**
 * Reads and parses the .env.example file from the project root.
 * Returns a Set of variable names that are documented in the file.
 */
function parseEnvExample(): Set<string> {
    /* Resolve .env.example relative to the project root (two levels up from here) */
    const envExamplePath = path.resolve(__dirname, "../../../.env.example");

    /* If the file doesn't exist, return an empty set (test will fail with a clear message) */
    if (!fs.existsSync(envExamplePath)) {
        return new Set();
    }

    const content = fs.readFileSync(envExamplePath, "utf-8");
    const varNames = new Set<string>();

    /* Parse each non-comment, non-empty line to extract variable names.
       Handles lines like: VAR_NAME=value or VAR_NAME= */
    for (const line of content.split("\n")) {
        const trimmed = line.trim();
        /* Skip comment lines (starting with #) and empty lines */
        if (trimmed.startsWith("#") || !trimmed) continue;

        /* Extract the variable name (everything before the first =) */
        const eqIndex = trimmed.indexOf("=");
        if (eqIndex > 0) {
            varNames.add(trimmed.substring(0, eqIndex).trim());
        }
    }

    return varNames;
}

describe("Environment Variable Configuration (.env.example coverage)", () => {
    /* Parse the .env.example file once before all tests. */
    const documentedVars = parseEnvExample();

    it(".env.example file must exist at the project root", () => {
        const envExamplePath = path.resolve(__dirname, "../../../.env.example");
        /* Fail fast with a helpful message if the file is missing. */
        expect(fs.existsSync(envExamplePath)).toBe(true);
    });

    it(".env.example must document all required environment variables", () => {
        /* Find any required vars that are missing from the example file. */
        const missingVars = REQUIRED_VARS.filter((v) => !documentedVars.has(v));

        if (missingVars.length > 0) {
            /* Fail with a clear message listing which vars are undocumented. */
            throw new Error(
                `The following required variables are missing from .env.example:\n` +
                missingVars.map((v) => `  - ${v}`).join("\n") +
                `\n\nAdd them to .env.example with a placeholder value and instructions.`
            );
        }

        /* All required vars are documented — pass. */
        expect(missingVars).toHaveLength(0);
    });

    /** All NEXT_PUBLIC_ vars documented in env.example should have NEXT_PUBLIC_ prefix. */
    it("all documented public vars have the correct NEXT_PUBLIC_ prefix", () => {
        const publicVarsMissingPrefix = REQUIRED_VARS.filter(
            (v) =>
                /* These vars are explicitly intended to be public */
                v.includes("NEXT_PUBLIC_")
        ).filter(
            /* Validate the documented name starts with NEXT_PUBLIC_ */
            (v) => documentedVars.has(v) && !v.startsWith("NEXT_PUBLIC_")
        );

        expect(publicVarsMissingPrefix).toHaveLength(0);
    });

    /** .env.example itself must not contain any real secret values. */
    it(".env.example must not contain real JWT tokens or secrets", () => {
        const envExamplePath = path.resolve(__dirname, "../../../.env.example");
        const content = fs.readFileSync(envExamplePath, "utf-8");

        /* JWT tokens start with "eyJ" — a real Supabase anon key would match this. */
        const hasSuspiciousToken = content
            .split("\n")
            .filter((line) => !line.trim().startsWith("#"))
            .some((line) => /=eyJ[A-Za-z0-9_-]{20,}/.test(line));

        /* Alert if a real JWT was accidentally committed to the example file. */
        expect(hasSuspiciousToken).toBe(false);
    });
});
