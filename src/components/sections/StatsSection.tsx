/**
 * ============================================================================
 * src/components/sections/StatsSection.tsx — Metrics / Social Proof Band
 * ============================================================================
 *
 * A horizontal band of 4 key metrics (numbers + labels) that provide
 * social proof and quantify the product's impact. Typically placed after
 * the features section.
 *
 * HOW TO CUSTOMIZE:
 *   1. Edit content in your dictionary: dict.stats.items
 *      Each item has: { value, label, sublabel? }
 *   2. Change the number of stats by adding/removing items in en.json and tr.json.
 *   3. The gradient background can be changed via the className on <section>.
 *
 * DEPENDENCIES:
 *   - dict.stats.title — section title (optional)
 *   - dict.stats.items — array of { value, label, sublabel? }
 * ============================================================================
 */

import type { Dictionary } from "@/types";

/** Props accepted by StatsSection. */
interface StatsSectionProps {
  /** The full locale dictionary providing all stats text. */
  dict: Dictionary;
}

export default function StatsSection({ dict }: StatsSectionProps) {
  const { stats } = dict;

  return (
    /* Dark gradient background to differentiate from adjacent sections. */
    /* Section ID "stats" can be used as an anchor link target.          */
    <section
      id="stats"
      className="py-20 bg-linear-to-r from-primary-dark to-neutral-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Optional Section Title ─────────────────────────────────────── */}
        {stats.title && (
          <h2 className="mb-12 text-center font-heading text-2xl font-bold text-white sm:text-3xl">
            {stats.title}
          </h2>
        )}

        {/* ── Stats Grid ────────────────────────────────────────────────── */}
        {/* Responsive: 2 cols on sm, 4 cols on md+                         */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.items.map((stat, index) => (
            <div key={index} className="text-center">
              {/* ── Metric value (e.g., "40%", "500+", "$2M") ───────────── */}
              <div className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </div>

              {/* ── Metric label (e.g., "Reduction in Defects") ─────────── */}
              <div className="mt-2 text-sm font-medium text-neutral-200">
                {stat.label}
              </div>

              {/* ── Optional sublabel for additional context ─────────────── */}
              {stat.sublabel && (
                <div className="mt-1 text-xs text-neutral-400">
                  {stat.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
