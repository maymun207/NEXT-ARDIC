/**
 * ============================================================================
 * src/components/sections/FeaturesSection.tsx — Feature Grid Section
 * ============================================================================
 *
 * Displays a 3-column grid of feature cards, each with a Lucide icon, title,
 * and description. Used to communicate core product capabilities.
 *
 * HOW TO CUSTOMIZE:
 *   1. Edit content in your dictionary: dict.features.items
 *      Each item has: { icon, title, description }
 *   2. The icon field should match a Lucide icon name (string).
 *      Browse available icons at: https://lucide.dev/icons
 *   3. Add or remove feature cards by editing the items array in en.json/tr.json.
 *
 * DEPENDENCIES:
 *   - dict.features.title — section heading
 *   - dict.features.subtitle — section subheading
 *   - dict.features.items — array of { icon, title, description }
 * ============================================================================
 */

import {
  Zap,
  Shield,
  Globe,
  BarChart3,
  Lock,
  Users,
  Code2,
  Layers,
} from "lucide-react";
import type { Dictionary } from "@/types";

/** Props accepted by FeaturesSection. */
interface FeaturesSectionProps {
  /** The full locale dictionary providing all features text. */
  dict: Dictionary;
}

/**
 * Maps string icon names from the dictionary to actual Lucide components.
 * This pattern avoids dynamically importing icons at render time.
 * TODO: Add any additional Lucide icons you use in your dict.features.items here.
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  /* Speed / performance features */
  Zap: Zap,
  /* Security / compliance features */
  Shield: Shield,
  /* Global / multi-location features */
  Globe: Globe,
  /* Analytics / metrics features */
  BarChart3: BarChart3,
  /* Privacy / data protection features */
  Lock: Lock,
  /* Team / collaboration features */
  Users: Users,
  /* Developer / API features */
  Code2: Code2,
  /* Architecture / multi-layer features */
  Layers: Layers,
};

export default function FeaturesSection({ dict }: { dict: Dictionary }) {
  const { features } = dict;

  if (!features) return null;

  return (
    /* Features section with a slight dark background to contrast with the hero. */
    /* Section ID "features" is used by CTA and Hero "Learn More" buttons.    */
    <section id="features" className="py-24 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {features.title}
          </h2>
          <p className="mt-4 text-lg text-neutral-400">{features.subtitle}</p>
        </div>

        {/* ── Feature Cards Grid ─────────────────────────────────────────── */}
        {/* Responsive: 1 col on mobile, 2 cols on md, 3 cols on lg+         */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature, index) => {
            /* Resolve the icon component from the string name in the dict. */
            const Icon = ICON_MAP[feature.icon] ?? Zap;

            return (
              /* Feature card with glass-morphism border effect */
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-neutral-900/50 p-8 transition-all duration-300 hover:border-primary/40 hover:bg-neutral-900"
              >
                {/* ── Icon badge ─────────────────────────────────────────── */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </div>

                {/* ── Feature title ───────────────────────────────────────── */}
                <h3 className="mb-3 font-heading text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                {/* ── Feature description ─────────────────────────────────── */}
                <p className="text-sm leading-relaxed text-neutral-400">
                  {feature.description}
                </p>

                {/* ── Subtle accent line on hover ─────────────────────────── */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-linear-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
