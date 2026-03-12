"use client";

import type { Dictionary, Locale } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, X, Factory, Layers } from "lucide-react";

interface CaseStudiesListingProps {
  dict: Dictionary;
  locale: Locale;
}

const caseStudies = [
  {
    id: "raw-materials-factory",
    icon: Factory,
    image: "/images/case-study-raw-materials.png",
    color: "from-accent/20 to-accent/5",
    borderColor: "border-accent/20 hover:border-accent/40",
    accentColor: "text-accent",
  },
  {
    id: "ceramic-tile-production",
    icon: Layers,
    image: "/images/case-study-ceramic.png",
    color: "from-[#E879F9]/20 to-[#E879F9]/5",
    borderColor: "border-[#E879F9]/20 hover:border-[#E879F9]/40",
    accentColor: "text-[#E879F9]",
  },
];

export default function CaseStudiesListing({
  dict,
  locale,
}: CaseStudiesListingProps) {
  const cs = (dict as any).caseStudies;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Close Button */}
      <Link
        href={`/${locale}`}
        className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/60 hover:bg-white/10 hover:text-white transition-all"
      >
        <X className="h-5 w-5" />
      </Link>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,209,255,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/10 text-accent border border-accent/20 mb-6">
              {cs.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {cs.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
              {cs.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, i) => {
            const data = cs.studies[study.id];
            if (!data) return null;
            const Icon = study.icon;

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  href={`/${locale}/case-studies/${study.id}`}
                  className={`group flex flex-col h-full rounded-3xl border ${study.borderColor} bg-linear-to-b ${study.color} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,209,255,0.08)] hover:-translate-y-1`}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={study.image}
                      alt={data.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm ${study.accentColor}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium tracking-widest uppercase text-white/70">
                          {data.industry}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                      {data.title}
                    </h2>
                    <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">
                      {data.tagline}
                    </p>

                    {/* Key Metrics Preview */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {data.metrics
                        .slice(0, 4)
                        .map((metric: any, j: number) => (
                          <div
                            key={j}
                            className="rounded-xl bg-white/3 border border-white/6 px-3 py-2.5 min-h-[72px]"
                          >
                            <p
                              className={`text-lg font-bold ${study.accentColor}`}
                            >
                              {metric.value}
                            </p>
                            <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all mt-auto">
                      {data.readMore}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
