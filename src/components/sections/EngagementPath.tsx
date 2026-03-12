// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import type { Dictionary } from "@/types";
import dynamic from "next/dynamic";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Presentation,
  Wallet,
  Rocket,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";

const WorkshopModal = dynamic(() => import("@/components/ui/WorkshopModal"), {
  ssr: false,
});

interface EngagementPathProps {
  dict: Dictionary;
}

export default function EngagementPath({ dict }: EngagementPathProps) {
  const { deploymentModel } = dict;
  const { engagementPath } = deploymentModel;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);

  const icons = [Presentation, Wallet, Rocket, CheckCircle2];
  const accentColors = [
    {
      text: "text-accent",
      bg: "bg-accent",
      border: "border-accent",
      glow: "shadow-accent/50",
    },
    {
      text: "text-secondary",
      bg: "bg-secondary",
      border: "border-secondary",
      glow: "shadow-secondary/50",
    },
    {
      text: "text-[#E879F9]",
      bg: "bg-[#E879F9]",
      border: "border-[#E879F9]",
      glow: "shadow-[#E879F9]/50",
    },
    {
      text: "text-green-400",
      bg: "bg-green-400",
      border: "border-green-400",
      glow: "shadow-green-400/50",
    },
  ];

  return (
    <>
      <SectionWrapper
        id="engagement-path"
        dark
        className="bg-black relative overflow-hidden"
      >
        {/* Background decorative gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,209,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              {engagementPath.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-secondary text-xl font-bold tracking-[0.2em] uppercase mb-8"
            >
              {engagementPath.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 text-lg max-w-4xl mx-auto leading-relaxed font-light"
            >
              {engagementPath.description}
            </motion.p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* ANIMATED TIMELINE — Replaces the old milestones.jpeg  */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="relative">
            {/* Horizontal progress line (desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] bg-white/10 z-0">
              {/* Animated fill */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-linear-to-r from-accent via-[#E879F9] to-green-400 origin-left"
              />
              {/* Moving light particle */}
              <motion.div
                animate={{ left: ["0%", "100%"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
                className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white blur-[3px]"
              />
            </div>

            {/* Vertical progress line (mobile) */}
            <div className="lg:hidden absolute top-0 bottom-0 left-[28px] w-[2px] bg-white/10 z-0">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="w-full h-full bg-linear-to-b from-accent via-[#E879F9] to-green-400 origin-top"
              />
            </div>

            {/* Timeline Nodes + Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {engagementPath.steps.map((step: any, i: number) => {
                const Icon = icons[i];
                const color = accentColors[i];
                const isHovered = hoveredIdx === i;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="flex flex-col items-center lg:items-center"
                  >
                    {/* Node Circle */}
                    <motion.div
                      animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
                      className={`relative flex items-center justify-center w-[56px] h-[56px] rounded-full border-2 ${color.border} bg-black mb-6 transition-shadow duration-500 ${isHovered ? `shadow-[0_0_25px] ${color.glow}` : ""}`}
                    >
                      <Icon className={`w-6 h-6 ${color.text}`} />
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        className={`absolute inset-0 rounded-full border ${color.border} opacity-0`}
                      />
                    </motion.div>

                    {/* Step Number */}
                    <span
                      className={`text-xs font-mono font-bold ${color.text} tracking-widest mb-2`}
                    >
                      STEP 0{i + 1}
                    </span>

                    {/* Duration Badge */}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${color.border} ${color.text} bg-white/3 mb-4`}
                    >
                      {step.duration}
                    </span>

                    {/* Card */}
                    <div
                      className={`w-full p-6 rounded-2xl border transition-all duration-500 text-center lg:text-center ${
                        isHovered
                          ? `bg-white/6 border-white/20 shadow-2xl ${color.glow} shadow-lg`
                          : "bg-white/2 border-white/5"
                      }`}
                    >
                      <h4
                        className={`text-lg font-bold text-white mb-3 transition-colors ${isHovered ? color.text : ""}`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-neutral-400 text-sm leading-relaxed font-light">
                        {step.description}
                      </p>

                      {/* Hover indicator */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          height: isHovered ? "auto" : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${color.bg} animate-pulse`}
                          />
                          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                            {i === 0
                              ? "Ücretsiz"
                              : i === 1
                                ? "Düşük Risk"
                                : i === 2
                                  ? "Doğrulanmış KPI"
                                  : "Tam Ölçek / Kurumsal Ölçek"}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <Button
              onClick={() => setIsWorkshopOpen(true)}
              variant="primary"
              size="lg"
            >
              <CalendarCheck className="mr-3 h-5 w-5" />
              {engagementPath.workshopCta}
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>

      <WorkshopModal
        isOpen={isWorkshopOpen}
        onClose={() => setIsWorkshopOpen(false)}
        dict={engagementPath.workshopModal}
      />
    </>
  );
}
