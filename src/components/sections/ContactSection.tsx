/**
 * ============================================================================
 * src/components/sections/ContactSection.tsx — Contact Form Section
 * ============================================================================
 *
 * Full contact form wired to the /api/contact API route. Features:
 *   - Cloudflare Turnstile CAPTCHA to prevent spam
 *   - Client-side validation with bilingual error messages from the dictionary
 *   - Loading, success, and error states
 *   - GDPR-compliant privacy notice
 *
 * HOW TO CUSTOMIZE:
 *   1. To add/remove fields: update the JSX below AND the /api/contact route
 *      handler (src/app/api/contact/route.ts) AND the dict.contact.fields keys.
 *   2. Field labels are controlled via dict.contact.fields.* in your dictionaries.
 *   3. TURNSTILE_SITE_KEY: set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local.
 *      For local development, use the Cloudflare test key: 1x00000000000000000000AA
 *
 * DEPENDENCIES:
 *   - @marsidev/react-turnstile — Cloudflare CAPTCHA widget
 *   - /api/contact — Next.js API route for form submission
 *   - dict.contact.* — all form labels/messages from the locale dictionary
 * ============================================================================
 */

"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import type { Dictionary } from "@/types";
import { CONTACT_API_ENDPOINT } from "@/lib/constants";

/** Supported form submission states. */
type FormState = "idle" | "sending" | "success" | "error";

/** Props accepted by ContactSection. */
interface ContactSectionProps {
  /** The full locale dictionary for all form labels and messages. */
  dict: Dictionary;
}

export default function ContactSection({ dict }: ContactSectionProps) {
  const { contact } = dict;

  /* Tracks the current form submission state for UI feedback. */
  const [formState, setFormState] = useState<FormState>("idle");

  /* Holds the Cloudflare Turnstile verification token after widget resolves. */
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  /**
   * Handles form submission.
   * Collects form data, appends the Turnstile token, and POSTs to /api/contact.
   * The API route validates the token server-side before sending the email.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Block submission if Turnstile hasn't resolved yet. */
    if (!turnstileToken) return;

    setFormState("sending");

    /* Collect all form field values into a plain object. */
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /* Include the CAPTCHA token so the API can verify with Cloudflare. */
        body: JSON.stringify({ ...body, turnstileToken }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      /* Network errors or unexpected failures */
      setFormState("error");
    }
  };

  return (
    /* Section ID "contact" is targeted by Header, Hero, and CTA anchor links. */
    <section id="contact" className="py-24 bg-neutral-950">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400">{contact.subtitle}</p>
        </div>

        {/* ── Success Message ───────────────────────────────────────────── */}
        {formState === "success" ? (
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-lg font-medium text-green-400">
              {contact.success}
            </p>
          </div>
        ) : (
          /* ── Contact Form ──────────────────────────────────────────────── */
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-white/10 bg-neutral-900/50 p-8"
          >
            {/* Row 1: Full Name + Email */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Full Name field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  {contact.fields.fullName} *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={contact.fields.fullName}
                />
              </div>

              {/* Business Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  {contact.fields.email} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={contact.fields.email}
                />
              </div>
            </div>

            {/* Row 2: Company Name + (optional) Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Company Name field */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  {contact.fields.company}
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={contact.fields.company}
                />
              </div>

              {/* Phone Number field (optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  {contact.fields.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={contact.fields.phone}
                />
              </div>
            </div>

            {/* Message textarea */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                {contact.fields.message} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={contact.fields.message}
              />
            </div>

            {/* ── Cloudflare Turnstile CAPTCHA ──────────────────────────── */}
            {/* Invisible widget that verifies the user is human.          */}
            {/* Token is verified server-side in /api/contact/route.ts.   */}
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("")}
              onExpire={() => setTurnstileToken("")}
              options={{ theme: "dark" }}
            />

            {/* ── Error message ─────────────────────────────────────────── */}
            {formState === "error" && (
              <p className="text-sm text-red-400">{contact.error}</p>
            )}

            {/* ── Privacy notice ────────────────────────────────────────── */}
            <p className="text-xs text-neutral-500">{contact.privacy}</p>

            {/* ── Submit button ─────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={formState === "sending" || !turnstileToken}
              className="w-full rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              {formState === "sending" ? contact.sending : contact.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
