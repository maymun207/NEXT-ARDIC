// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { X } from "lucide-react";
import ArMESModules from "@/components/sections/ArMESModules";

interface LayerArMESProps {
  dict: Dictionary;
  locale?: string;
}

export default function LayerArMES({ dict, locale }: LayerArMESProps) {
  const { armes } = dict.architectureDetails;
  const [isExpanded, setIsExpanded] = useState(false);
  const isTr = locale === "tr";

  const armesLayer = dict.platform.layers.find((l) => l.id === "armes");

  return (
    <SectionWrapper
      id="layer-armes"
      dark
      className="bg-[#020202] py-28! sm:py-32! overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Image Content - Stacked layout on the left */}
          <div className="flex flex-col gap-12 lg:gap-16 lg:order-1 order-2 lg:pt-20">
            {/* 1. ArMES Traceability Interface */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-[80px]" />

              <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                <NextImage
                  src="/images/armes-traceability.png"
                  alt="ArMES Traceability Interface"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-1000"
                />

                {/* Floating ID badge */}
                <div className="absolute top-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-secondary font-bold tracking-[0.2em] uppercase">
                      {isTr ? "DPP Durumu" : "DPP Status"}
                    </span>
                    <span className="text-white text-xs font-mono">
                      ID: AR-T88291-C
                    </span>
                    <div className="mt-2 h-1 w-full bg-secondary/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-secondary"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Digital Passport Flow Diagram — with locale overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              transition={{ duration: 1, delay: 0.3 }}
              onClick={() => setIsExpanded(true)}
              className="relative cursor-pointer group/arch lg:pt-16"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-16/10 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#050505] transition-all duration-500 group-hover/arch:border-secondary/40 group-hover/arch:shadow-[0_0_60px_rgba(0,209,255,0.1)]">
                <NextImage
                  src={
                    isTr
                      ? "/images/armes-digital-passport-flow-tr.png"
                      : "/images/armes-digital-passport-flow.jpeg"
                  }
                  alt="Digital Passport Flow Architecture"
                  fill
                  className="object-contain p-0 transition-transform duration-700 scale-110 group-hover/arch:scale-125"
                />
              </div>

              {/* Interaction Label */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover/arch:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-secondary text-[10px] font-bold tracking-widest uppercase">
                  {isTr ? "Büyütmek için tıklayın" : "Click to Expand (400%)"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-2 order-1 lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-xs font-bold tracking-[0.2em] uppercase">
                {armesLayer
                  ? `${armesLayer.number}: ${armesLayer.metaphor}`
                  : "LAYER 2: THE NERVOUS SYSTEM"}
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
              {armes.title}
            </h2>

            <p className="text-xl text-secondary/80 font-medium mb-8 italic tracking-wide">
              {armes.tagline}
            </p>

            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12 max-w-2xl">
              {armes.description}
            </p>

            <div className="space-y-6 mb-12">
              {armes.capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="text-xl font-bold text-white">{cap.title}:</h3>
                  <p className="text-lg text-neutral-400 font-light leading-relaxed">
                    {cap.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* New Honeycomb Modules Grid - Full Width */}
        <div className="mt-24">
          <ArMESModules
            modules={armes.modules}
            title={armes.modulesTitle}
            subtitle={armes.modulesSubtitle}
          />
        </div>
      </div>

      {/* Fullscreen Overlay (400%) — with locale overlays */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsExpanded(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <X size={40} strokeWidth={1} />
            </motion.button>

            {/* Expanded Image Container */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-[98vw] max-h-[92vh] select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <NextImage
                src={
                  isTr
                    ? "/images/armes-digital-passport-flow-tr.png"
                    : "/images/armes-digital-passport-flow.jpeg"
                }
                alt="Digital Passport Flow Architecture Expanded"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 font-mono text-xs tracking-widest uppercase">
              {isTr
                ? "Küçültmek için herhangi bir yere tıklayın"
                : "Click anywhere to minimize"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
