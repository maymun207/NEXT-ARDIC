// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface UnderTheHoodProps {
  dict: Dictionary;
}

export default function UnderTheHood({ dict }: UnderTheHoodProps) {
  const { underTheHood } = dict.architectureDetails;

  return (
    <SectionWrapper
      id="under-the-hood"
      dark
      className="bg-[#050505] py-32! overflow-hidden border-y border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {underTheHood.title}
            </h2>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {underTheHood.categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-black border border-white/10 hover:border-accent/30 transition-all duration-500 flex flex-col h-full"
            >
              <h3 className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-8">
                {category.name}
              </h3>

              <ul className="space-y-4 flex-1">
                {category.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-neutral-300 group"
                  >
                    <div className="h-1 w-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                    <span className="text-base font-light tracking-wide">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Decorative faint background icon/shape could go here */}
            </motion.div>
          ))}
        </div>

        {/* Integration Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 rounded-3xl bg-linear-to-r from-accent/10 via-transparent to-accent/5 border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold text-xl">
              Universal Integration Framework
            </p>
            <p className="text-neutral-400 font-light">
              Supporting 100+ industrial protocols and enterprise software
              integrations.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {["SAP", "IFS", "Microsoft Azure", "AWS", "Google Cloud"].map(
              (partner) => (
                <span
                  key={partner}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono"
                >
                  {partner}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
