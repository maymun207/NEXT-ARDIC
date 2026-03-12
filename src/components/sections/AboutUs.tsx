// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Globe,
  Users,
  Cpu,
  FolderKanban,
  Calendar,
  ArrowRight,
  X,
} from "lucide-react";

interface AboutUsProps {
  dict: Dictionary;
}

/* ── Animated counter ─────────────────────────────────── */
function AnimatedStat({
  value,
  suffix = "",
  label,
  icon: Icon,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (t: number) => {
            const progress = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          setTimeout(() => requestAnimationFrame(step), delay);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.6 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
        {value > 9999 ? count.toLocaleString() : count}
        {suffix}
      </span>
      <span className="mt-2 text-sm text-neutral-400 font-medium uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function AboutUs({ dict }: AboutUsProps) {
  const about = dict.aboutUs;

  const stats = [
    {
      value: 2008,
      suffix: "",
      label: about.stats.founded,
      icon: Calendar,
      delay: 0,
    },
    {
      value: 90,
      suffix: "+",
      label: about.stats.projects,
      icon: FolderKanban,
      delay: 150,
    },
    {
      value: 1000000,
      suffix: "+",
      label: about.stats.devices,
      icon: Cpu,
      delay: 300,
    },
    {
      value: 20,
      suffix: "+",
      label: about.stats.team,
      icon: Users,
      delay: 450,
    },
  ];

  const leadership = about.leadership.map(
    (person: { name: string; role: string }) => ({
      name: person.name,
      role: person.role,
      initials: person.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    }),
  );

  const partners = ["AWS", "Google Cloud", "SAS", "Intel", "ARM"];

  return (
    <>
      {/* Close button — fixed top-right */}
      <Link
        href="/"
        className="fixed top-24 right-6 z-100 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/60 backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </Link>

      {/* ── Hero Section ─────────────────────────────── */}
      <SectionWrapper
        id="about-hero"
        dark
        className="bg-black relative overflow-hidden pt-32 sm:pt-40"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-5 py-2 mb-8"
          >
            <Globe className="w-4 h-4 text-accent" />
            <span className="font-heading text-xs font-semibold tracking-widest text-accent uppercase">
              {about.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8"
          >
            {about.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {about.description}
          </motion.p>
        </div>
      </SectionWrapper>

      {/* ── Stats Strip ──────────────────────────────── */}
      <section className="relative bg-black py-16 border-y border-white/5">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimatedStat key={i} {...s} />
          ))}
        </div>
      </section>

      {/* ── Mission / Who We Are ─────────────────────── */}
      <SectionWrapper id="about-mission" dark className="bg-black">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                {about.missionTitle}
              </h2>
              <p className="text-neutral-300 leading-relaxed text-lg font-light">
                {about.mission}
              </p>
            </motion.div>

            {/* Right: Tagline card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative p-8 rounded-3xl bg-white/3 border border-white/6"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
              <blockquote className="relative z-10">
                <p className="text-2xl md:text-3xl font-bold text-white italic leading-snug">
                  &ldquo;{about.tagline}&rdquo;
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Team Section ─────────────────────────────── */}
      <SectionWrapper id="about-team" dark className="bg-black">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              {about.teamTitle}
            </h2>
            <p className="text-neutral-300 text-lg font-light leading-relaxed max-w-3xl mb-6">
              {about.teamDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">
              {leadership.map(
                (
                  person: { name: string; role: string; initials: string },
                  i: number,
                ) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className={`group relative p-5 rounded-2xl border transition-all duration-300 ${
                      i === 0
                        ? "bg-white/4 border-accent/20 hover:border-accent/40"
                        : "bg-white/2 border-white/6 hover:border-white/15 hover:bg-white/4"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                        i === 0
                          ? "bg-accent/10 border border-accent/20"
                          : "bg-white/6 border border-white/8"
                      }`}
                    >
                      <span
                        className={`text-xs font-bold tracking-wide ${
                          i === 0 ? "text-accent" : "text-neutral-300"
                        }`}
                      >
                        {person.initials}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {person.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 font-medium uppercase tracking-wider">
                      {person.role}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── Partners Strip ────────────────────────────── */}
      <section className="relative bg-black py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              {about.partnersTitle}
            </h3>
            <p className="text-sm text-neutral-500">{about.partnersSubtitle}</p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-3 rounded-xl border border-white/10 bg-white/2 text-neutral-400 font-heading font-bold text-sm tracking-wider uppercase hover:text-white hover:border-accent/30 transition-all duration-300"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────── */}
      <SectionWrapper id="about-cta" dark className="bg-black">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-white mb-6"
          >
            {about.ctaTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg font-light mb-10"
          >
            {about.ctaDescription}
          </motion.p>
          <motion.a
            href="/"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent/10 text-white border border-accent/40 shadow-[0_0_20px_rgba(0,209,255,0.15)] hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] backdrop-blur-md transition-all duration-500 text-sm font-bold tracking-widest uppercase"
          >
            {about.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </SectionWrapper>
    </>
  );
}
