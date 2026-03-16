import type { Dictionary } from "@/types";
import { Wifi, Brain, Cloud, Link, Shield, Lock } from "lucide-react";

const ICONS: Record<string, React.ElementType> = { Wifi, Brain, Cloud, Link, Shield, Lock };

interface TechPlatformsProps {
  dict: Dictionary;
  locale: string;
}

export default function TechPlatforms({ dict, locale }: TechPlatformsProps) {
  const section = (dict as any).technologies;
  if (!section) return null;

  return (
    <section id="technologies" className="py-24 bg-[#fafaf8]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="section-heading text-4xl md:text-5xl mb-4">{section.title}</h2>
          <div className="accent-line mx-auto" />
          <p className="text-[#707068] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            {section.subtitle}
          </p>
        </div>

        {/* Tech Hex Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items?.map((item: any, idx: number) => {
            const Icon = ICONS[item.icon] || Wifi;
            return (
              <a
                key={item.id}
                href={`/${locale}/technologies/${item.id}`}
                className="group relative overflow-hidden rounded-2xl border border-[#e8e8e0] bg-white p-8 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Colored top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: item.color }}
                />

                {/* Icon circle */}
                <div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon className="h-7 w-7" style={{ color: item.color }} />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-[#1c2b2b] mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#707068] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-5 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}>
                  <span>Explore</span>
                  <svg className="h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
