// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState, useEffect } from "react";
import { Database, Activity, AlertTriangle, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/types";
import ROICalculator from "@/components/sections/ROICalculator";

interface UntappedPotentialProps {
  dict: Dictionary;
  locale?: string;
}

export default function UntappedPotential({
  dict,
  locale,
}: UntappedPotentialProps) {
  const { untappedPotential } = dict;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [ardiWidth, setArdiWidth] = useState(0); // 0 = Temel closed

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showCalculator) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCalculator]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCalculator(false);
    };
    if (showCalculator) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showCalculator]);

  // Open calculator when nav link is clicked
  useEffect(() => {
    const openCalc = () => setShowCalculator(true);
    window.addEventListener("open-roi-calculator", openCalc);
    return () => window.removeEventListener("open-roi-calculator", openCalc);
  }, []);

  // Track Temel sidebar state so calculator modal can shift away
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean; width?: number }>)
        .detail;
      setArdiWidth(detail.open ? (detail.width ?? 420) : 0);
    };
    window.addEventListener("Company-sidebar", handler);
    return () => window.removeEventListener("Company-sidebar", handler);
  }, []);

  const icons: Record<string, React.ReactNode> = {
    "dark-data": <Database className="h-6 w-6" />,
    "reactive-maintenance": <Activity className="h-6 w-6" />,
    "quality-escapes": <AlertTriangle className="h-6 w-6" />,
    "oee-uplift": <TrendingUp className="h-6 w-6" />,
  };

  return (
    <>
      <section id="roi" className="relative bg-black py-24 sm:py-28 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Headlines */}
            <div>
              <h2 className="font-heading text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                <span className="text-neutral-600">
                  {untappedPotential.title1}
                </span>
                <br />
                <span className="text-neutral-600">
                  {untappedPotential.title2}
                </span>
                <br />
                <span className="text-white">{untappedPotential.title3}</span>
              </h2>
            </div>

            {/* Right: Metrics */}
            <div className="flex flex-col items-start lg:items-end">
              <div className="lg:text-right">
                <div className="mb-4 font-heading text-6xl font-bold leading-none sm:text-7xl lg:text-8xl">
                  <div className="flex items-baseline">
                    <span>$</span>
                    <span>48M-</span>
                  </div>
                  <div className="flex items-baseline">
                    <span>$</span>
                    <span>73M</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm font-medium tracking-wider text-neutral-400">
                  <span>{untappedPotential.payback}</span>
                  <span className="text-accent">•</span>
                  <span>{untappedPotential.roi}</span>
                </div>
                <div className="inline-block border border-neutral-700 px-4 py-2 text-xs font-medium tracking-wider text-neutral-400">
                  {untappedPotential.annualLoss}
                </div>
              </div>
            </div>
          </div>

          {/* Loss Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {untappedPotential.cards.map((card) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                  hoveredCard === card.id
                    ? "border-blue-500 bg-linear-to-br from-blue-900 to-blue-950 shadow-2xl shadow-blue-500/20"
                    : "border-neutral-800 bg-linear-to-br from-neutral-900 to-black"
                }`}
              >
                {/* Default Card Content */}
                <div
                  className={`p-6 transition-opacity duration-500 ${
                    hoveredCard === card.id ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {/* Icon */}
                  <div className="mb-4 inline-flex rounded-lg bg-neutral-800 p-3 text-accent">
                    {icons[card.id] || <Database className="h-6 w-6" />}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xs font-bold tracking-wider text-neutral-400">
                    {card.title}
                  </h3>

                  {/* Range */}
                  <p className="mb-4 text-3xl font-bold">{card.range}</p>

                  {/* Category */}
                  <p className="text-xs font-medium tracking-wider text-accent">
                    {card.category}
                  </p>
                </div>

                {/* Hover Quote Content */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-500 ${
                    hoveredCard === card.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-center text-lg italic leading-relaxed text-white">
                    &ldquo;{card.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowCalculator(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-bold tracking-wider uppercase
                bg-accent/20 text-accent border border-accent/40 shadow-[0_0_20px_rgba(0,209,255,0.15)]
                hover:bg-accent/30 hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all duration-300 cursor-pointer"
            >
              <TrendingUp className="w-5 h-5" />
              {untappedPotential.cta}
            </button>
          </div>
        </div>
      </section>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl overflow-y-auto"
            style={{
              marginRight: ardiWidth > 0 ? `${ardiWidth}px` : "0px",
              transition: "margin-right 0.3s ease",
            }}
            onClick={() => setShowCalculator(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed top-6 right-6 z-120 text-white/50 hover:text-white transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowCalculator(false);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Calculator Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ROICalculator locale={locale} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
