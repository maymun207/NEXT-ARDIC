/**
 * ============================================================================
 * src/components/sections/CTASection.tsx — Call-to-Action Banner
 * ============================================================================
 *
 * A full-width, dark-background CTA section placed before the contact form.
 * Creates visual separation and encourages visitors to take the next step.
 *
 * HOW TO CUSTOMIZE:
 *   1. Edit headline and button text in dict.cta.* in your dictionary files.
 *   2. The button links to the #contact section by default.
 *      TODO: Change href if your contact section has a different ID.
 *   3. You can add a secondary button by adding ctaSecondary to the dict.
 *
 * DEPENDENCIES:
 *   - dict.cta.headline — main CTA heading
 *   - dict.cta.subtitle — supporting copy
 *   - dict.cta.button — primary button label
 * ============================================================================
 */

import type { Dictionary } from "@/types";

/** Props accepted by CTASection. */
interface CTASectionProps {
  /** The full locale dictionary providing all CTA text. */
  dict: Dictionary;
}

export default function CTASection({ dict }: CTASectionProps) {
  const { cta } = dict;

  return (
    /* Dark panel with a subtle radial gradient glow for visual interest. */
    /* Positioned as a bridge between the Stats and Contact sections.     */
    <section id="cta" className="relative overflow-hidden bg-neutral-900 py-24">
      {/* ── Background glow effect ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-accent/10"
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* CTA Headline */}
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {cta.headline}
        </h2>

        {/* CTA supporting subtitle */}
        {cta.subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
            {cta.subtitle}
          </p>
        )}

        {/* ── CTA Button ───────────────────────────────────────────────── */}
        {/* Scrolls to the contact section below.                         */}
        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl bg-primary px-10 py-4 text-base font-semibold text-white shadow-xl transition-all duration-200 hover:bg-primary-light hover:shadow-primary/30"
          >
            {cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
