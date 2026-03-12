// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Layers,
  Radio,
  Compass,
} from "lucide-react";

interface OperationalEnsoProps {
  dict: Dictionary;
  locale: string;
}

export default function OperationalEnso({
  dict,
  locale,
}: OperationalEnsoProps) {
  const { operationalEnso, gapAnalysis } = dict;
  const [activeStep, setActiveStep] = useState(-1);
  const [showFactory, setShowFactory] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFactory((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black">
      {/* 1. The Vision Section */}
      <SectionWrapper id="enso-vision" dark className="pb-0!">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6"
            >
              {operationalEnso.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-5xl md:text-7xl font-bold mb-8 tracking-tight"
            >
              {operationalEnso.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent text-2xl md:text-3xl font-medium mb-12 italic"
            >
              {operationalEnso.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl mx-auto text-neutral-400 text-lg md:text-xl font-light leading-relaxed"
            >
              &ldquo;{operationalEnso.description}&rdquo;
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* 2. The Gap Analysis Section */}
      <SectionWrapper id="enso-gap" dark className="pt-8!">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Reality Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-3xl bg-neutral-900/40 border border-white/5 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <AlertCircle size={120} />
              </div>
              <h3 className="text-white/60 text-sm font-bold tracking-widest uppercase mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" />
                {gapAnalysis.reality.title}
              </h3>
              <ul className="space-y-6">
                {gapAnalysis.reality.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-neutral-400 text-lg font-light leading-relaxed"
                  >
                    <span className="text-white/20 mt-1.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What Good Looks Like Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-3xl bg-accent/5 border border-accent/20 overflow-hidden group shadow-[0_0_50px_rgba(0,209,255,0.05)]"
            >
              <div className="absolute top-0 right-0 p-8 text-accent opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 size={120} />
              </div>
              <h3 className="text-accent text-sm font-bold tracking-widest uppercase mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-accent/30" />
                {gapAnalysis.good.title}
              </h3>
              <p className="text-white text-xl font-medium mb-8">
                {gapAnalysis.good.description}
              </p>
              <ul className="space-y-6 mb-12">
                {gapAnalysis.good.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-neutral-200 text-lg leading-relaxed"
                  >
                    <div className="mt-1 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-8 border-t border-accent/10">
                <p className="text-accent font-bold tracking-wider italic">
                  {gapAnalysis.good.footer}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. The Learning Cycle Section */}
      <SectionWrapper id="operational-enso" dark>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Main Grid: Image and Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            {/* Left: The Enso Image */}
            <div
              className="relative aspect-square cursor-help"
              onMouseEnter={() => activeStep === -1 && setActiveStep(-2)} // -2 means image hover
              onMouseLeave={() => activeStep === -2 && setActiveStep(-1)}
            >
              <div className="w-full h-full relative scale-[1.15]">
                <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full scale-75 animate-pulse" />

                {/* Layer 1: No Background Image (Enso Circle) */}
                <motion.div
                  animate={{ opacity: showFactory ? 0 : 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/EnsoFolder/enso-nobg.png"
                      alt="Operational Enso Cycle"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>

                {/* Layer 2: Factory Image (Interior) */}
                <motion.div
                  animate={{ opacity: showFactory ? 1 : 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Inner container to constrain/scale the factory image */}
                  <div className="relative w-[92%] h-[92%]">
                    <Image
                      src={
                        locale === "tr"
                          ? "/EnsoFolder/Enso-factory-tr.png"
                          : "/EnsoFolder/Enso-factory.png"
                      }
                      alt="Enso Factory"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"></div>
            </div>

            {/* Right: Explanation Text */}
            <div className="flex flex-col justify-center">
              <h3 className="text-white text-4xl font-bold mb-4">
                {operationalEnso.ensoTitle}
              </h3>
              <p className="text-accent text-xl font-medium mb-8 tracking-wide whitespace-pre-line">
                {operationalEnso.ensoSubheader}
              </p>
              <p className="text-neutral-400 text-lg font-light leading-relaxed italic">
                {operationalEnso.definition}
              </p>
            </div>
          </div>

          {/* Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {operationalEnso.pillars.map((pillar, i) => {
              const IconComponents = [Layers, Radio, Compass];
              const IconComp = IconComponents[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative group p-8 rounded-3xl bg-white/3 border border-white/6 hover:border-accent/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

                  {/* Icon */}
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20">
                    <IconComp className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-white text-xl font-bold mb-1 group-hover:text-accent transition-colors duration-300">
                    {pillar.title}
                  </h4>
                  <p className="text-accent/70 text-xs font-bold tracking-[0.2em] uppercase mb-5">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm font-light leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              );
            })}
          </div>

          {/* Explanation Text Above Cards */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-white/90 text-2xl md:text-3xl font-medium leading-relaxed">
              {operationalEnso.manufacturingExplanation}
            </p>
          </div>

          {/* Bottom: Steps Interaction (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-24">
            {operationalEnso.steps.map((step, i) => (
              <button
                key={step.id}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(-1)}
                className={`flex flex-col p-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden text-left h-full ${
                  activeStep === i
                    ? "bg-accent/10 border-accent/40 shadow-[0_0_30px_rgba(0,209,255,0.1)]"
                    : "bg-white/2 border-white/5 hover:border-white/10"
                }`}
              >
                <span
                  className={`font-mono text-sm mb-4 transition-colors ${activeStep === i ? "text-accent" : "text-neutral-600"}`}
                >
                  0{i + 1}
                </span>
                <h4
                  className={`text-lg font-bold mb-2 transition-colors ${activeStep === i ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}
                >
                  {step.title}
                </h4>
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-neutral-300 font-light leading-relaxed"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-accent text-sm font-bold tracking-[0.4em] uppercase">
              {operationalEnso.tagline}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
