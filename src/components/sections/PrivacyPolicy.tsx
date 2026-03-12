// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
/**
 * ============================================================================
 * PrivacyPolicy — Section Component
 * ============================================================================
 *
 * Renders the full Privacy Policy page for CompanyTech.
 * All visible text is sourced from the i18n dictionary (`dict.privacyPage`)
 * so the same component works for both English ("en") and Turkish ("tr").
 *
 * Sections rendered:
 *   - Hero / title block with badge
 *   - Last-updated timestamp
 *   - Numbered policy sections (heading + body text)
 *   - Footer CTA strip linking back to the main site and Cookie Policy
 *
 * Layout: Dark, full-page, consistent with CookiePolicy / AboutUs / Careers.
 * ============================================================================
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X, Lock } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import type { Dictionary } from "@/types";

interface PrivacyPolicyProps {
  /** Full i18n dictionary for the current locale. */
  dict: Dictionary;
}

export default function PrivacyPolicy({ dict }: PrivacyPolicyProps) {
  /* Pull out the privacy-page sub-tree from the dictionary */
  const page = dict.privacyPage;

  return (
    <>
      {/* ── Close button — fixed top-right ────────────────────────────────── */}
      <Link
        href="/"
        className="fixed top-24 right-6 z-100 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/60 backdrop-blur-md hover:bg-white/10 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-lg"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </Link>

      {/* ── Hero / Heading block ───────────────────────────────────────────── */}
      <SectionWrapper
        id="privacy-policy-hero"
        dark
        className="bg-black relative overflow-hidden pt-32 sm:pt-40"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 mb-8"
          >
            <Lock className="w-4 h-4 text-primary" />
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              {page.badge}
            </span>
          </motion.div>

          {/* Page title — h1 for SEO */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            {page.title}
          </motion.h1>

          {/* Last updated timestamp */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm text-neutral-500 font-medium"
          >
            {page.lastUpdated}
          </motion.p>
        </div>
      </SectionWrapper>

      {/* ── Policy body ────────────────────────────────────────────────────── */}
      <SectionWrapper id="privacy-policy-body" dark className="bg-black">
        <div className="mx-auto max-w-3xl space-y-12">
          {page.sections.map(
            (section: { heading: string; body: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                {/* Section heading with numbered accent circle */}
                <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-4 flex items-start gap-3">
                  <span className="shrink-0 mt-1 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {section.heading}
                </h2>

                {/* Body text — double-newline in JSON becomes separate paragraphs */}
                <div className="pl-11">
                  {section.body.split("\n\n").map((para: string, j: number) => (
                    <p
                      key={j}
                      className="text-neutral-300 text-base leading-relaxed font-light mb-4 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            ),
          )}
        </div>
      </SectionWrapper>

      {/* ── Footer CTA strip ───────────────────────────────────────────────── */}
      <SectionWrapper id="privacy-policy-cta" dark className="bg-black">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-base mb-8"
          >
            {page.ctaText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Back to home */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary/10 text-white border border-primary/40 shadow-[0_0_20px_rgba(var(--color-primary),0.15)] hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_30px_rgba(var(--color-primary),0.3)] backdrop-blur-md transition-all duration-500 text-sm font-bold tracking-widest uppercase"
            >
              {page.ctaBack}
            </Link>
            {/* Cookie Policy link */}
            <Link
              href={page.cookieHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/4 text-neutral-300 border border-white/10 hover:bg-white/8 hover:text-white hover:border-white/20 transition-all duration-300 text-sm font-bold tracking-widest uppercase"
            >
              {page.cookieLink}
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
