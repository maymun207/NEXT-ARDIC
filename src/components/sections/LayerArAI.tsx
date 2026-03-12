// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import ArAIArchitectureDiagram from "./ArAIArchitectureDiagram";

interface LayerArAIProps {
  dict: Dictionary;
  locale?: string;
}

export default function LayerArAI({ dict, locale }: LayerArAIProps) {
  const { arai } = dict.architectureDetails;
  const [isExpanded, setIsExpanded] = useState(false);

  const araiLayer = dict.platform.layers.find((l) => l.id === "arai");

  return (
    <SectionWrapper
      id="layer-arai"
      dark
      className="bg-black py-28! sm:py-32! overflow-hidden relative"
    >
      {/* Dynamic background particles/glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10 animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold tracking-[0.2em] uppercase">
                {araiLayer
                  ? `${araiLayer.number}: ${araiLayer.metaphor}`
                  : "LAYER 3: THE BRAIN"}
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
              {arai.title}
            </h2>

            <p className="text-xl text-accent/80 font-medium mb-8 italic tracking-wide">
              {arai.tagline}
            </p>

            <p className="text-xl text-neutral-400 mb-8 leading-relaxed font-light">
              {arai.description}
            </p>

            {/* Standard CTA Button */}

            {/* Standard CTA Button */}
            <div className="mb-12">
              <Button
                onClick={() => setIsExpanded(true)}
                variant="primary"
                size="lg"
              >
                <Maximize2 className="mr-3 h-5 w-5" />
                {arai.architectureCta || "See our architecture"}
              </Button>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative lg:pt-20 group/arch"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square border border-white/5 bg-white/2 transition-colors duration-500 group-hover/arch:border-accent/30">
              <NextImage
                src="/images/arai-intelligence.jpeg"
                alt="ArAI Cognitive Interface"
                fill
                className="object-contain transition-transform duration-700 group-hover/arch:scale-105"
              />

              {/* Simple overlay gradient for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Vision Statement Block (Moved to under image) */}
            <div className="mt-12 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-accent/50 to-transparent" />
              <p className="text-xl md:text-2xl pl-8 leading-[1.6] text-white/80 font-medium italic tracking-tight">
                {arai.statement.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    const text = part.slice(2, -2);
                    const isHighlight =
                      text === "ArAI" ||
                      text === "Causal Reasoning" ||
                      text === "Nedensel Akıl Yürütmeyi";
                    return (
                      <span
                        key={i}
                        className={
                          isHighlight
                            ? "text-accent"
                            : "font-bold text-white px-0.5"
                        }
                      >
                        {text}
                      </span>
                    );
                  }
                  return part;
                })}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: 3 Cards Side by Side */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {arai.points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/3 border border-white/10 hover:border-accent/40 group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                <span className="text-sm font-bold font-mono">0{i + 1}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">
                {point.title}
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed font-light">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setIsExpanded(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-110"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-[95vw] lg:max-w-[85vw] max-h-[95vh] lg:max-h-[90vh] mt-2 mb-6 md:mt-4 flex flex-col items-center bg-[#050505] rounded-3xl overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dynamically Coded Architecture Diagram Component */}
              <div className="w-full">
                <ArAIArchitectureDiagram locale={locale} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
