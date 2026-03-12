/**
 * ============================================================================
 * src/app/[locale]/page.tsx — Homepage (Template Demo Page)
 * ============================================================================
 *
 * This is the main homepage that composes all section components.
 *
 * HOW TO CUSTOMIZE:
 *   1. Reorder, add, or remove section components by editing this file.
 *   2. To add a new section: create a new component in src/components/sections/
 *      and import it here.
 *   3. All text content is controlled via src/lib/dictionaries/en.json (and tr.json).
 *      You will NOT need to edit this file to change copy — edit the dictionary instead.
 *   4. Each section component has its own id="" attribute for anchor-link navigation.
 *
 * SECTION ORDER (top → bottom):
 *   1. HeroSection — Above-the-fold hero with headline and CTA buttons
 *   2. FeaturesSection — 3-column feature grid
 *   3. StatsSection — 4-metric social proof band
 *   4. CTASection — Full-width conversion CTA banner
 *   5. ContactSection — Contact form wired to /api/contact
 * ============================================================================
 */

import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

/** Page props provided by Next.js dynamic routing (locale segment). */
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  /* Await the locale from the route params (Next.js App Router pattern). */
  const { locale } = await params;

  /* Load the locale-specific dictionary server-side.
     The dictionary provides all text content for every section. */
  const dict = await getDictionary(locale as Locale);

  /* If the locale is not supported, getDictionary returns null.
     The middleware should prevent this case, but we guard defensively. */
  if (!dict) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Page not found.
      </main>
    );
  }

  return (
    <main>
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      {/* Full-viewport hero with headline, subheadline, and two CTA buttons */}
      <HeroSection dict={dict} />

      {/* ── Features Section ─────────────────────────────────────────────── */}
      {/* 3-column grid of feature cards (icon + title + description)       */}
      <FeaturesSection dict={dict} />

      {/* ── Stats Section ─────────────────────────────────────────────────── */}
      {/* 4-metric horizontal band with key proof-points                    */}
      <StatsSection dict={dict} />

      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      {/* Dark banner encouraging visitors to book a demo                   */}
      <CTASection dict={dict} />

      {/* ── Contact Section ───────────────────────────────────────────────── */}
      {/* Contact form wired to /api/contact with Turnstile CAPTCHA         */}
      <ContactSection dict={dict} />
    </main>
  );
}
