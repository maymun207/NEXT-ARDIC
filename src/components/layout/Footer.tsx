/**
 * ============================================================================
 * src/components/layout/Footer.tsx — Site Footer
 * ============================================================================
 *
 * Full-width footer with company info, quick navigation links, legal links,
 * and a newsletter subscription form.
 *
 * HOW TO CUSTOMIZE:
 *   1. Social icons: Update SOCIAL_LINKS in src/lib/constants.ts with your URLs.
 *   2. Newsletter: The form POSTs to /api/newsletter — already wired up.
 *   3. Legal links: Privacy, Terms, and Cookies pages should exist in
 *      src/app/[locale]/privacy-policy, /terms, /cookie-policy directories.
 *   4. Quick links and copyright are read from the dictionary (dict.footer.*).
 *
 * DEPENDENCIES:
 *   - SOCIAL_LINKS constant from src/lib/constants.ts
 *   - dict.footer.* — all footer text from the active locale dictionary
 * ============================================================================
 */

import { Linkedin, Twitter, Youtube, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import type { Dictionary, Locale } from "@/types";
import FooterNewsletter from "./FooterNewsletter";
import FooterQuickLinks from "./FooterQuickLinks";

/** Props accepted by the Footer component. */
interface FooterProps {
  /** The full locale dictionary for all footer text. */
  dict: Dictionary;
  /** Current active locale (e.g. "en" or "tr"). */
  locale: Locale;
}

export default function Footer({ dict, locale }: FooterProps) {
  /* Extract the footer sub-object from the dictionary for cleaner references. */
  const { footer } = dict;

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ── Company Info Column ──────────────────────────────────────────── */}
          <div>
            {/* Site name — from dictionary. Links to locale home. */}
            <a
              href={`/${locale}`}
              className="font-heading text-xl font-bold text-white"
            >
              {dict.site.name}
            </a>

            {/* Tagline from dictionary */}
            <p className="mt-3 text-sm leading-relaxed">{footer.tagline}</p>

            {/* Location (optional) — remove the <div> below if not applicable */}
            {footer.location && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-secondary" />
                {footer.location}
              </div>
            )}

            {/* Social media icon links — configured via SOCIAL_LINKS constant */}
            <div className="mt-4 flex gap-3">
              {/* LinkedIn icon — always shown */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              {/* Twitter/X icon — shown if URL is configured */}
              {SOCIAL_LINKS.twitter && (
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary hover:text-white"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {/* YouTube icon — shown if URL is configured */}
              {SOCIAL_LINKS.youtube && (
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary hover:text-white"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* ── Quick Links Column ───────────────────────────────────────────── */}
          {/* Renders a bullet list of internal navigation links from the dict */}
          <FooterQuickLinks
            links={footer.links}
            locale={locale}
            quickLinksTitle={footer.quickLinks}
          />

          {/* ── Legal Links Column ───────────────────────────────────────────── */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
              {footer.legal}
            </h3>
            <ul className="space-y-3 text-sm">
              {/* Render legal links from the dict. Key = route path, value = label. */}
              {Object.entries(footer.legalLinks).map(([key, label]) => (
                <li key={key}>
                  <a
                    href={`/${locale}/${key}`}
                    className="transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter Column ────────────────────────────────────────────── */}
          {/* Connected to /api/newsletter — handles double opt-in by email */}
          <div>
            <FooterNewsletter
              title={footer.newsletter.title}
              placeholder={footer.newsletter.placeholder}
              subscribe={footer.newsletter.subscribe}
              gdpr={footer.newsletter.gdpr}
              locale={locale}
            />
          </div>
        </div>

        {/* ── Copyright Bar ─────────────────────────────────────────────────── */}
        <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
