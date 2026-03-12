// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Target, Zap, Clock } from "lucide-react";
import type { Dictionary } from "@/types";
import Button from "@/components/ui/Button";

const PdfViewerModal = dynamic(() => import("@/components/ui/PdfViewerModal"), {
  ssr: false,
});

interface ValueFirstProps {
  dict: Dictionary;
}

export default function ValueFirst({ dict }: ValueFirstProps) {
  const { valueFirst } = dict;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const icons: Record<string, React.ReactNode> = {
    "hidden-losses": <Plus className="h-6 w-6" />,
    "quality-drift": <Target className="h-6 w-6" />,
    "energy-bom": <Zap className="h-6 w-6" />,
    "lead-times": <Clock className="h-6 w-6" />,
  };

  return (
    <>
      <section className="relative bg-black py-24 sm:py-28 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
              {valueFirst.title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    word.toLowerCase().includes("value") ||
                    word.toLowerCase().includes("first") ||
                    word.toLowerCase().includes("değer") ||
                    word.toLowerCase().replace("?", "").includes("yaratmalı")
                      ? "text-accent"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-neutral-300">
              {valueFirst.subtitle}
            </p>
          </div>

          {/* Value Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueFirst.cards.map((card) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative overflow-hidden rounded-2xl border border-neutral-800 bg-linear-to-br from-neutral-900 to-black p-6 transition-all duration-500 ${
                  hoveredCard === card.id
                    ? "scale-105 border-accent shadow-2xl shadow-accent/20"
                    : "hover:border-neutral-700"
                }`}
              >
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex rounded-lg p-3 transition-colors ${
                    hoveredCard === card.id
                      ? "bg-accent/20 text-accent"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {icons[card.id] || <Plus className="h-6 w-6" />}
                </div>

                {/* Title and Category */}
                <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
                <p className="text-xs font-medium tracking-wider text-neutral-500">
                  {card.category}
                </p>

                {/* Hover Content */}
                <div
                  className={`mt-6 transition-all duration-500 ${
                    hoveredCard === card.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-l-2 border-accent pl-4">
                    <p className="mb-4 text-sm leading-relaxed text-neutral-300">
                      {card.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        {card.metric}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {card.metricLabel}
                    </p>
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 ${
                    hoveredCard === card.id ? "opacity-100" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-16 flex justify-center">
            <Button
              onClick={() => setIsPdfOpen(true)}
              variant="primary"
              size="lg"
            >
              {valueFirst.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl="/DIGITAL FACTORY.pdf"
      />
    </>
  );
}
