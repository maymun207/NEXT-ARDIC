/**
 * ============================================================================
 * src/components/sections/HeroSection.tsx — Full-Width Hero Banner
 * ============================================================================
 *
 * The primary above-the-fold hero section. Displays the main headline,
 * subheadline, and two call-to-action buttons against a dark gradient.
 *
 * HOW TO CUSTOMIZE:
 *   1. Edit content by changing dict.hero.* keys in your dictionary files:
 *      - src/lib/dictionaries/en.json → hero.headline, hero.subheadline, etc.
 *   2. To use a background image instead of the gradient, replace the
 *      className gradient with a Next.js <Image> component.
 *   3. The "Learn More" CTA scrolls to #features. Update the href to
 *      match your first content section.
 *
 * DEPENDENCIES:
 *   - dict.hero.* — from the active locale dictionary
 * ============================================================================
 */

import type { Dictionary } from "@/types";

/** Props accepted by HeroSection. */
interface HeroSectionProps {
  /** The full locale dictionary providing all hero text. */
  dict: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const { hero } = dict;

  return (
    /* Full-viewport hero section with a dark gradient background. */
    /* Section ID "hero" allows smooth-scroll navigation links to target it. */
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Gradient Background ──────────────────────────────────────────────
          A three-stop radial gradient creates depth without a real image.
          TODO: Replace with a <Image> or video background if desired.       */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-neutral-950 via-primary-dark/30 to-neutral-950"
      />

      {/* ── Subtle grid overlay for texture ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Hero Content ─────────────────────────────────────────────────────
          z-10 ensures text renders above the absolute background layers.    */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8 lg:py-40">
        {/* Badge / pill label above the headline */}
        {hero.badge && (
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-light">
            {hero.badge}
          </div>
        )}

        {/* Primary headline — the most important message on the page */}
        <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>

        {/* Subheadline — supporting context for the headline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
          {hero.subheadline}
        </p>

        {/* ── CTA Buttons ─────────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary CTA — links to the contact/demo section */}
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-light hover:shadow-primary/25"
          >
            {hero.ctaPrimary}
          </a>

          {/* Secondary CTA — links to the features/content section */}
          <a
            href="#features"
            className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* ── Scroll indicator arrow ───────────────────────────────────────────
          Animated bounce indicates there's more content below the fold.     */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <div className="h-8 w-5 rounded-full border-2 border-white/30 flex items-start justify-center pt-1">
          <div className="h-2 w-0.5 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
