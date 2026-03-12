// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import type { Dictionary } from "@/types";
import { motion } from "framer-motion";
import { Zap, Shield } from "lucide-react";
import NextImage from "next/image";

interface WrapperStrategyProps {
  dict: Dictionary;
}

export default function WrapperStrategy({ dict }: WrapperStrategyProps) {
  const { deploymentModel } = dict;
  const { wrapperStrategy } = deploymentModel;

  return (
    <section
      id="wrapper-strategy"
      className="relative w-full overflow-hidden bg-[#050505]"
    >
      {/* Background subtle effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-28">
        {/* Image with Text Overlaid on the Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,209,255,0.08)] mb-4 group"
        >
          <div className="relative w-full aspect-[2.2/1]">
            <NextImage
              src="/images/intelligent-wrapper-2.jpg"
              alt="Intelligent Wrapper — AI overlay on factory infrastructure"
              fill
              className="object-cover object-bottom bg-black transition-transform duration-1500 ease-out group-hover:scale-105"
              priority
              quality={90}
            />
          </div>

          {/* Gradient overlay on left side for text readability */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Text overlaid on the left side of the image */}
          <div className="absolute inset-0 flex items-start pt-[10%] pointer-events-none">
            <div className="max-w-lg px-8 lg:px-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg"
              >
                {wrapperStrategy.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-accent text-lg lg:text-xl font-medium italic mb-6 drop-shadow-md"
              >
                {wrapperStrategy.subtitle}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-neutral-200 text-sm lg:text-base leading-relaxed drop-shadow-md"
              >
                {wrapperStrategy.description}
              </motion.p>
            </div>
          </div>

          {/* Subtle inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none rounded-3xl" />

          {/* Sweeping scan line */}
          <motion.div
            animate={{ top: ["-5%", "105%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3,
            }}
            className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent pointer-events-none"
            style={{ filter: "blur(1px)" }}
          />
        </motion.div>

        {/* 2 Feature Cards — Tight Below the Image */}
        <div className="grid md:grid-cols-2 gap-6">
          {wrapperStrategy.features.map((feature: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="group p-8 rounded-3xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex gap-6 items-start">
                <div
                  className={`p-4 rounded-2xl ${i === 0 ? "bg-accent/10" : "bg-secondary/10"} border ${i === 0 ? "border-accent/20" : "border-secondary/20"}`}
                >
                  {i === 0 ? (
                    <Zap className="w-6 h-6 text-accent" />
                  ) : (
                    <Shield className="w-6 h-6 text-secondary" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-neutral-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
