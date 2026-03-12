"use client";

import type { Dictionary, Locale } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  X,
  ArrowLeft,
  Flame,
  AlertOctagon,
  HelpCircle,
  Trash2,
  Zap,
  Clock,
  Percent,
} from "lucide-react";

interface CaseStudyCeramicProps {
  dict: Dictionary;
  locale: Locale;
}

/* ─── Animated counter ─── */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    // Just show the target directly for complex strings
    const timer = setTimeout(() => setDisplayed(target), 200);
    return () => clearTimeout(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

export default function CaseStudyCeramic({
  dict,
  locale,
}: CaseStudyCeramicProps) {
  const cs = (dict as any).caseStudies?.studies?.["ceramic-tile-production"];
  if (!cs) return null;

  const challengeIcons = [Flame, AlertOctagon, HelpCircle, Trash2];
  const challengeColors = [
    "text-orange-400",
    "text-red-400",
    "text-yellow-400",
    "text-blue-400",
  ];

  const metricIcons = [Zap, Clock, Percent];
  const metricColors = [
    "from-[#8B5CF6] to-[#6D28D9]",
    "from-[#8B5CF6] to-[#6D28D9]",
    "from-accent to-[#00A3CC]",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Close + Back */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <Link
          href={`/${locale}/case-studies`}
          className="flex h-10 items-center gap-2 px-4 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          {(dict as any).caseStudies?.backLabel || "Back"}
        </Link>
        <Link
          href={`/${locale}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/images/case-study-ceramic.png"
          alt={cs.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-[#E879F9]/10 text-[#E879F9] border border-[#E879F9]/20 mb-5">
              {cs.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
              {cs.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
              {cs.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Limits of Intuition (Challenges) ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-16 tracking-wider uppercase"
          >
            {cs.challengesTitle}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {cs.challenges.map((challenge: any, i: number) => {
              const Icon = challengeIcons[i] || Flame;
              const color = challengeColors[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl border border-white/10 bg-white/2 p-8 hover:border-white/20 transition-all group"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${color} mb-5 group-hover:bg-white/10 transition-colors`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">
                    {challenge.title}
                  </h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    {challenge.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Optimization at Scale ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-16 tracking-wider uppercase"
          >
            {cs.optimizationTitle}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cs.metrics.map((metric: any, i: number) => {
              const Icon = metricIcons[i] || Zap;
              const gradient = metricColors[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="rounded-2xl border border-white/10 bg-linear-to-b from-white/4 to-transparent p-8 text-center group hover:border-[#8B5CF6]/30 transition-all"
                >
                  <div className="flex justify-center mb-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${gradient} text-white`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#8B5CF6] to-accent mb-3">
                    <AnimatedCounter target={metric.value} />
                  </p>
                  <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider">
                    {metric.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
