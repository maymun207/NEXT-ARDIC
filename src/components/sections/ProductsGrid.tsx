"use client";

import { Factory, Smartphone, CircleDot, MessageCircle, Users } from "lucide-react";
import type { Dictionary } from "@/types";
import { useProductModal } from "@/context/ProductModalContext";

const ICONS: Record<string, React.ElementType> = {
  Factory,
  Smartphone,
  CircleDot,
  MessageCircle,
  Users,
};

/* Map from the dict item.id to the product modal id */
const PRODUCT_ID_MAP: Record<string, string> = {
  modiverse: "modiverse",
  armes: "armes",
  "digital-transformation": "", // no modal — keep as link
  cwf: "cwf",
  coe: "", // no modal yet — keep as link
};

interface ProductsGridProps {
  dict: Dictionary;
  locale: string;
}

export default function ProductsGrid({ dict, locale }: ProductsGridProps) {
  const section = (dict as any).products;
  const { openProduct } = useProductModal();
  if (!section) return null;

  return (
    <section id="products" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="section-heading text-4xl md:text-5xl mb-4">
            {section.title}
          </h2>
          <div className="accent-line mx-auto" />
          <p className="text-[#707068] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            {section.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items?.map((item: any, idx: number) => {
            const Icon = ICONS[item.icon] || Factory;
            const modalId = PRODUCT_ID_MAP[item.id];
            const hasModal = Boolean(modalId);

            const cardContent = (
              <>
                {/* Icon */}
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a4d3a]/8 group-hover:bg-[#00c4a0]/10 transition-colors duration-300">
                  <Icon className="h-7 w-7 text-[#1a4d3a] group-hover:text-[#00c4a0] transition-colors duration-300" />
                </div>

                {/* Tag */}
                <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#c8a96e]">
                  {item.tag}
                </span>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-[#1c2b2b] mb-3 group-hover:text-[#1a4d3a] transition-colors"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[#707068] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-1 text-sm font-medium text-[#1a4d3a] group-hover:text-[#00c4a0] transition-colors">
                  <span>{hasModal ? "View details" : "Learn more"}</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </>
            );

            if (hasModal) {
              return (
                <button
                  key={item.id}
                  onClick={() => openProduct(modalId)}
                  className="glass-card p-8 group block text-left w-full"
                  style={{ animationDelay: `${idx * 0.1}s`, background: "none", border: "none", cursor: "pointer" }}
                  aria-label={`Open ${item.title} details`}
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <a
                key={item.id}
                href={`/${locale}/products/${item.id}`}
                className="glass-card p-8 group block"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
