// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { X, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import IoTArchitectureDetail from "./IoTArchitectureDetail";

interface LayerIoTProps {
  dict: Dictionary;
  locale?: string;
}

export default function LayerIoT({ dict, locale }: LayerIoTProps) {
  const { iot } = dict.architectureDetails;
  const [isExpanded, setIsExpanded] = useState(false);
  const isTr = locale === "tr";

  const iotLayer = dict.platform.layers.find((l) => l.id === "iot-ignite");

  return (
    <SectionWrapper
      id="layer-iot"
      dark
      className="bg-black py-28! sm:py-32! overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-4"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold tracking-[0.2em] uppercase">
                {iotLayer
                  ? `${iotLayer.number}: ${iotLayer.metaphor}`
                  : "LAYER 1: THE SENSES"}
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
              {iot.title}
            </h2>

            <p className="text-xl text-accent/80 font-medium mb-8 italic tracking-wide">
              {iot.tagline}
            </p>

            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mb-10">
              {iot.description}
            </p>
          </motion.div>

          {/* Image Content - Stacked */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {/* 1. Edge Device Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative lg:mt-0"
            >
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px] animate-pulse" />

              <div className="relative rounded-3xl overflow-hidden aspect-16/10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <NextImage
                  src="/images/iot-gateway.png"
                  alt="IoT-Ignite Gateway Device"
                  fill
                  className="object-cover transform hover:scale-105 transition-transform duration-1000"
                />

                {/* Glassmorphism Badge */}
                <div className="absolute bottom-4 right-4 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl max-w-[160px]">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent animate-ping shrink-0" />
                    <div>
                      <p className="text-white font-bold text-[10px] tracking-widest uppercase mb-0.5">
                        {isTr ? "Canlı Uç" : "Live Edge"}
                      </p>
                      <p className="text-neutral-400 text-[9px] uppercase tracking-tighter">
                        {isTr ? "Aktif & Güvenli" : "Active & Secure"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating technical detail tags */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-4 p-3 bg-black/60 backdrop-blur-md border border-accent/20 rounded-xl hidden md:block"
              >
                <p className="text-accent text-[8px] font-bold tracking-widest uppercase mb-1">
                  {isTr ? "Mimari" : "Architecture"}
                </p>
                <p className="text-white text-[10px] font-mono">
                  IoT-Ignite Agent 2.0
                </p>
              </motion.div>
            </motion.div>

            {/* 2. Data Flow Architecture — coded component for TR, static image for EN */}
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
              className="relative cursor-pointer group/arch"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#050505] transition-all duration-500 group-hover/arch:border-accent/40 group-hover/arch:shadow-[0_0_60px_rgba(0,209,255,0.2)]">
                <NextImage
                  src={
                    isTr
                      ? "/images/iot-data-flow-tr.png"
                      : "/images/iot-data-flow.png"
                  }
                  alt="IoT Data Flow Architecture"
                  fill
                  className="object-contain p-0 transition-transform duration-700 scale-110 group-hover/arch:scale-125"
                />
              </div>

              {/* Interaction Label */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full opacity-0 group-hover/arch:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-accent text-[10px] font-bold tracking-widest uppercase">
                  {isTr ? "Büyütmek için tıklayın" : "Click to Expand (400%)"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Cards - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {iot.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-white/2 border border-white/5 hover:border-accent/40 hover:bg-white/4 transition-all duration-500 h-full flex flex-col"
            >
              <div className="h-12 w-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                <span className="text-xs font-bold font-mono">0{i + 1}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-4 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Centered CTA below cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <Button
            onClick={() => setIsExpanded(true)}
            variant="primary"
            size="lg"
          >
            {isTr ? "MİMARİMİZ" : "SEE OUR ARCHITECTURE"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Fullscreen Overlay (400% / Direct View) */}
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

            {/* Expanded Content Container (Replacing Image with Interactive Tour) */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-7xl max-h-[95vh] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <IoTArchitectureDetail locale={locale} />
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
