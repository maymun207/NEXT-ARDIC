"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Info, X } from "lucide-react";

interface ArMESModulesProps {
  modules: {
    name: string;
    description: string;
  }[];
  title?: string;
  subtitle?: string;
}

export default function ArMESModules({
  modules,
  title,
  subtitle,
}: ArMESModulesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-12 md:py-24 relative z-10">
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {title || "11 Interconnected Modules"}
        </h3>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          {subtitle ||
            "A comprehensive suite giving you power to manage every step of your production lifecycle."}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 md:gap-2 max-w-6xl mx-auto px-4 relative">
        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-3 w-full md:hidden">
          {modules.map((module, i) => (
            <ModuleHex
              key={i}
              module={module}
              totalIndex={i}
              onExpand={() => setExpandedIndex(i)}
            />
          ))}
        </div>

        {/* Desktop: Staggered honeycomb rows */}
        <div className="hidden md:flex flex-col items-center gap-1 md:gap-2 w-full">
          {/* Row 1: 4 Modules */}
          <div className="flex justify-center gap-4 md:gap-6 w-full">
            {modules.slice(0, 4).map((module, i) => (
              <ModuleHex
                key={i}
                module={module}
                totalIndex={i}
                onExpand={() => setExpandedIndex(i)}
              />
            ))}
          </div>

          {/* Row 2: 3 Modules (Offset) */}
          <div className="flex justify-center gap-4 md:gap-6 w-full -mt-16">
            {modules.slice(4, 7).map((module, i) => (
              <ModuleHex
                key={i + 4}
                module={module}
                totalIndex={i + 4}
                onExpand={() => setExpandedIndex(i + 4)}
              />
            ))}
          </div>

          {/* Row 3: 4 Modules */}
          <div className="flex justify-center gap-4 md:gap-6 w-full -mt-16">
            {modules.slice(7, 11).map((module, i) => (
              <ModuleHex
                key={i + 7}
                module={module}
                totalIndex={i + 7}
                onExpand={() => setExpandedIndex(i + 7)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
            onClick={() => setExpandedIndex(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-auto md:h-auto flex items-center justify-center rounded-full bg-white/10 md:bg-transparent border border-white/20 md:border-0 text-white hover:text-white hover:bg-white/20 transition-colors p-2 z-50"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedIndex(null);
              }}
            >
              <X size={24} className="md:hidden" strokeWidth={2} />
              <X size={40} className="hidden md:block" strokeWidth={1} />
            </motion.button>

            {/* Expanded Content Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-3xl w-full bg-[#0D0D0D]/50 border border-white/10 p-8 md:p-16 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-md select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-10 border border-secondary/20 shadow-[0_0_30px_rgba(0,209,255,0.1)]">
                  <span className="text-3xl font-bold">
                    {expandedIndex + 1}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                  {modules[expandedIndex].name}
                </h3>

                <div className="w-24 h-1 bg-linear-to-r from-transparent via-secondary to-transparent mb-12 opacity-50" />

                <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light">
                  {modules[expandedIndex].description}
                </p>
              </div>

              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/5 rounded-full blur-[100px] -z-10" />
            </motion.div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 font-mono text-xs tracking-widest uppercase">
              Click anywhere to minimize
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Background Glow */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}

function ModuleHex({
  module,
  totalIndex,
  onExpand,
}: {
  module: any;
  totalIndex: number;
  onExpand: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative group">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: totalIndex * 0.05 }}
        whileHover={{ scale: 1.05, zIndex: 50 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onExpand}
        className={cn(
          "relative w-full aspect-8/9 md:w-44 md:h-48 flex flex-col items-center justify-start pt-6 md:pt-12 p-3 text-center cursor-pointer transition-all duration-300",
          // Honeycomb shape using clip-path
          "bg-[#FED7AA]/30 shadow-[0_0_15px_rgba(254,215,170,0.1)]", // Light orange tint for the "border" hexagon
          "clip-hexagon",
        )}
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {/* Inner Hexagon (Black Background) */}
        <div
          className="absolute inset-[1.5px] bg-[#0A0A0A] -z-10"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75% , 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-20" />

        {/* Number Circle */}
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary text-[10px] md:text-xs font-bold border border-secondary/20 mb-2 group-hover:bg-secondary group-hover:text-black transition-all duration-300 shrink-0">
          {totalIndex + 1}
        </div>

        {/* Name */}
        <div className="relative z-10 w-full px-1">
          <span className="text-[10px] md:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors leading-tight line-clamp-3">
            {module.name}
          </span>
        </div>

        {/* Click Label */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[6px] md:text-[8px] text-secondary font-bold uppercase tracking-tight">
            Expand
          </span>
        </div>
      </motion.div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-60 p-4 bg-[#0D0D0D] border border-[#FED7AA]/30 rounded-xl shadow-2xl z-100 pointer-events-none backdrop-blur-xl"
          >
            <h4 className="text-secondary font-bold text-xs mb-1">
              {module.name}
            </h4>
            <p className="text-neutral-400 text-[10px] leading-relaxed">
              {module.description}
            </p>
            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0D0D0D] border-r border-b border-[#FED7AA]/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
