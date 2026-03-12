// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { Layers, Activity, Bot, ArrowRight } from "lucide-react";

interface ImplementationRoadmapProps {
  dict: Dictionary;
}

export default function ImplementationRoadmap({
  dict,
}: ImplementationRoadmapProps) {
  const { deploymentModel } = dict;
  const { roadmap } = deploymentModel;

  const icons = [Layers, Activity, Bot];
  const borderColors = [
    "border-accent/30",
    "border-secondary/30",
    "border-[#E879F9]/30",
  ];
  const glowColors = [
    "shadow-accent/10",
    "shadow-secondary/10",
    "shadow-[#E879F9]/10",
  ];
  const accentColors = ["text-accent", "text-secondary", "text-[#E879F9]"];

  return (
    <SectionWrapper
      id="technical-roadmap"
      dark
      className="bg-[#050505] relative overflow-hidden"
    >
      {/* Top divider gradient */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-linear-to-b from-black to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            {roadmap.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-xl font-medium italic mb-8"
          >
            {roadmap.subtitle}
          </motion.p>
        </div>

        <div className="relative space-y-24">
          {/* Vertical Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-40 bottom-40 w-px bg-linear-to-b from-accent/20 via-secondary/20 to-[#E879F9]/20 -translate-x-1/2" />

          {roadmap.phases.map((phase: any, i: number) => {
            const Icon = icons[i];
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                className="relative grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Visual Phase Marker */}
                <div
                  className={`hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-black border ${borderColors[i]} shadow-[0_0_20px_rgba(0,0,0,1)] z-20 items-center justify-center animate-pulse`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${accentColors[i]} bg-current`}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`${isEven ? "lg:order-1" : "lg:order-2"} group`}
                >
                  <div
                    className={`relative p-8 md:p-12 rounded-[40px] bg-[#0A0A0A] border ${borderColors[i]} ${glowColors[i]} shadow-2xl transition-all duration-500 hover:bg-[#0D0D0D]`}
                  >
                    <div className="flex items-center gap-6 mb-8 text-white">
                      <div
                        className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${accentColors[i]}`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {phase.title}
                      </h3>
                    </div>

                    <ul className="space-y-6">
                      {phase.items.map((item: string, j: number) => (
                        <li
                          key={j}
                          className="flex items-start gap-4 group/item"
                        >
                          <div
                            className={`mt-2 h-[2px] w-4 ${j === 0 ? "bg-accent" : j === 1 ? "bg-secondary" : "bg-[#E879F9]"} transition-all duration-300 group-hover/item:w-6`}
                          />
                          <span className="text-lg text-neutral-300 font-light group-hover/item:text-white transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Empty side / Decorative side */}
                <div
                  className={`${isEven ? "lg:order-2" : "lg:order-1"} hidden lg:flex flex-col items-center justify-center p-12`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div
                      className={`absolute inset-0 ${accentColors[i]} blur-3xl opacity-10 animate-pulse`}
                    />
                    <span
                      className={`text-[120px] font-black opacity-5 ${accentColors[i]} select-none leading-none`}
                    >
                      PHASE 0{i + 1}
                    </span>
                    <div
                      className={`mt-8 flex items-center gap-4 ${accentColors[i]}`}
                    >
                      <span className="text-sm font-bold tracking-[0.4em] uppercase">
                        Advancing to target
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
