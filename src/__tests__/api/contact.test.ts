/**
 * @jest-environment node
 */
/**
 * ============================================================================
 * Contact API Route Unit Tests
 * ============================================================================
 *
 * Tests the /api/contact POST handler for:
 *   - Missing required fields → 400
 *   - Invalid email format → 400
 *   - Valid payload but Turnstile fails → 403
 *   - Rate limit exceeded → 429
 *   - Successful submission → 200
 *
 * IMPORTANT: All external calls (Turnstile, Supabase, Formspree, SMTP)
 * are mocked using jest.fn() — no real HTTP calls are made in tests.
 * ============================================================================
 */

/* ── Mock external dependencies BEFORE importing the route ──────────── */

/** Mock the EmailService so no real SMTP calls are made */
jest.mock("@/lib/EmailService", () => ({
    emailService: {
        sendContactEmail: jest.fn().mockResolvedValue(undefined),
    },
}));

/** Mock Supabase so no real database calls are made */
jest.mock("@/lib/supabase", () => ({
    isSupabaseConfigured: () => false,
    supabase: null,
}));

/** Mock Params to provide test-specific configuration */
jest.mock("@/lib/Params", () => ({
    Params: {
        contact: {
            rateLimit: {
                /* Allow 3 submissions per 15-minute window */
                maxSubmissions: 3,
                windowMs: 15 * 60 * 1000,
            },
        },
        turnstile: {
            secretKey: "test-secret-key",
            verifyUrl: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        },
        formspree: {
            endpoint: "",
        },
    },
}));

/**
 * Mock global.fetch to intercept Turnstile verification calls.
 * By default, returns success. Individual tests can override.
 */
const mockFetch = jest.fn();
global.fetch = mockFetch;

import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

/* ── Helper to create a NextRequest from a plain object ──────────────── */
function createRequest(
    body: Record<string, unknown>,
    ip: string = "127.0.0.1"
): NextRequest {
    const req = new NextRequest("http://localhost/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": ip,
        },
        body: JSON.stringify(body),
    });
    return req;
}

/* ── Reset mocks between tests ──────────────────────────────────────── */
beforeEach(() => {
    jest.clearAllMocks();

    /** Default: Turnstile verification succeeds */
    mockFetch.mockResolvedValue({
        json: async () => ({ success: true }),
    });
});

/* ── Test Suite ─────────────────────────────────────────────────────── */

describe("POST /api/contact", () => {
    /** Missing turnstileToken should return 400 */
    it("returns 400 when turnstileToken is missing", async () => {
        const req = createRequest({
            "Company Name": "Acme",
            "Contact Person": "John",
            Email: "john@acme.com",
        });

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toContain("CAPTCHA");
    });

    /** Invalid email format should return 400 */
    it("returns 400 for invalid email format", async () => {
        const req = createRequest(
            {
                "Contact Person": "John",
                Email: "not-an-email",
                turnstileToken: "valid-token",
            },
            "10.0.0.1"
        );

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toContain("email");
    });

    /** Valid payload but Turnstile verification fails → 403 */
    it("returns 403 when Turnstile verification fails", async () => {
        /* Override fetch to return failure */
        mockFetch.mockResolvedValueOnce({
            json: async () => ({ success: false }),
        });

        const req = createRequest(
            {
                "Company Name": "Acme",
                "Contact Person": "John",
                Email: "john@acme.com",
                turnstileToken: "bad-token",
            },
            "10.0.0.2"
        );

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(403);
        expect(data.error).toContain("CAPTCHA");
    });

    /** Successful submission with all fields valid → 200 */
    it("returns 200 for valid submission", async () => {
        const req = createRequest(
            {
                "Company Name": "Acme Manufacturing",
                "Contact Person": "Jane Doe",
                Email: "jane@acme.com",
                Phone: "+1 555 123 4567",
                Notes: "Interested in demo",
                turnstileToken: "valid-token",
            },
            "10.0.0.3"
        );

        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.ok).toBe(true);
    });

    /** Rate limiting: 4th request from same IP within window → 429 */
    it("returns 429 when rate limit is exceeded", async () => {
        const ip = "10.0.0.99";
        const validBody = {
            "Company Name": "Acme",
            "Contact Person": "John",
            Email: "john@acme.com",
            turnstileToken: "valid-token",
        };

        /* First 3 requests should succeed */
        for (let i = 0; i < 3; i++) {
            const req = createRequest(validBody, ip);
            const res = await POST(req);
            expect(res.status).toBe(200);
        }

        /* 4th request from the same IP should be rate limited */
        const req = createRequest(validBody, ip);
        const res = await POST(req);
        const data = await res.json();

        expect(res.status).toBe(429);
        expect(data.error).toContain("Too many");
    });
});
