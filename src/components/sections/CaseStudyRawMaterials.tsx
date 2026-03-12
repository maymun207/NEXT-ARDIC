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
  Droplets,
  Cog,
  BookOpen,
  TrendingUp,
  DollarSign,
  Zap,
  BarChart3,
  AlertTriangle,
  Target,
} from "lucide-react";

interface CaseStudyRawMaterialsProps {
  dict: Dictionary;
  locale: Locale;
}

/* ─── Animated counter ─── */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(Math.round(current * 10) / 10);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ─── Animated ring for stats ─── */
function StatRing({
  value,
  label,
  delay = 0,
  suffix = "%",
}: {
  value: number;
  label: string;
  delay?: number;
  suffix?: string;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const circumference = 2 * Math.PI * 52;
  const target = Math.min(value, 100);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-32 h-32 md:w-36 md:h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <circle
            ref={ref}
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              isInView ? circumference * (1 - target / 100) : circumference
            }
            className="transition-all duration-[2s] ease-out"
          />
          <defs>
            <linearGradient
              id="ring-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00D1FF" />
              <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-white">
            <AnimatedCounter target={value} suffix={suffix} />
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs md:text-sm text-neutral-400 font-medium text-center uppercase tracking-wider max-w-[120px]">
        {label}
      </p>
    </motion.div>
  );
}

export default function CaseStudyRawMaterials({
  dict,
  locale,
}: CaseStudyRawMaterialsProps) {
  const cs = (dict as any).caseStudies?.studies?.["raw-materials-factory"];
  if (!cs) return null;

  const processItems = [
    { icon: Droplets, title: cs.process.items[0].title, color: "text-accent" },
    { icon: Cog, title: cs.process.items[1].title, color: "text-[#E879F9]" },
    {
      icon: BookOpen,
      title: cs.process.items[2].title,
      color: "text-[#34D399]",
    },
  ];

  const financialIcons = [TrendingUp, Target, Zap, BarChart3];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Close + Back Buttons */}
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

      {/* ── Hero Section ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/images/case-study-raw-materials.png"
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
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/10 text-accent border border-accent/20 mb-5">
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

      {/* ── Operational Efficiency Gains ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-16 tracking-wider uppercase"
          >
            {cs.operationalTitle}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {cs.metrics.map((metric: any, i: number) => (
              <StatRing
                key={i}
                value={parseFloat(metric.value)}
                suffix={metric.suffix}
                label={metric.label}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Orchestrating The Process ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,209,255,0.04)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-12 tracking-wider uppercase">
              {cs.process.title}
            </h2>

            <div className="space-y-8">
              {processItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${item.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                      {item.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Solution Details / Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/2 p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
              {cs.challenges.title}
            </h3>
            <ul className="space-y-4">
              {cs.challenges.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-neutral-300 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Financial Breakdown ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-6 tracking-wider uppercase"
          >
            {cs.financial.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-sm text-center mb-16"
          >
            {cs.financial.subtitle}
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {cs.financial.items.map((item: any, i: number) => {
              const Icon = financialIcons[i] || DollarSign;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl border border-white/10 bg-linear-to-b from-white/4 to-transparent p-6 text-center group hover:border-accent/30 transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-accent to-[#E879F9] mb-2">
                    {item.value}
                  </p>
                  <p className="text-xs md:text-sm text-neutral-400 font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Annual Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center rounded-2xl border border-accent/20 bg-accent/5 p-8"
          >
            <p className="text-sm text-neutral-400 uppercase tracking-widest mb-2">
              {cs.financial.impactLabel}
            </p>
            <p className="text-4xl md:text-5xl font-bold text-accent">
              {cs.financial.impactValue}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
