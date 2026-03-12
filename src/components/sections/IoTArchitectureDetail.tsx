"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

interface IoTArchitectureDetailProps {
  locale?: string;
}

const sectorsEn = [
  {
    id: 1,
    title: "Connectivity",
    subtitle: "Node / Things",
    image: "/images/iot-tour-sector-1.jpg",
  },
  {
    id: 2,
    title: "Edge",
    subtitle: "The Gateway",
    image: "/images/iot-tour-sector-2.jpg",
  },
  {
    id: 3,
    title: "Logic",
    subtitle: "Edge Logic",
    image: "/images/iot-tour-sector-3.jpg",
  },
  {
    id: 4,
    title: "Cloud",
    subtitle: "Integration",
    image: "/images/iot-tour-sector-4.jpg",
  },
];

const sectorsTr = [
  {
    id: 1,
    title: "Bağlantı",
    subtitle: "Düğümler / Cihazlar",
    image: "/images/iot-tour-sector-1-tr.png",
  },
  {
    id: 2,
    title: "Uç Cihaz",
    subtitle: "Ağ Geçidi",
    image: "/images/iot-tour-sector-2-tr.png",
  },
  {
    id: 3,
    title: "Mantık",
    subtitle: "Uç Mantık",
    image: "/images/iot-tour-sector-3-tr.png",
  },
  {
    id: 4,
    title: "Bulut",
    subtitle: "Entegrasyon",
    image: "/images/iot-tour-sector-4-tr.png",
  },
];

export default function IoTArchitectureDetail({
  locale,
}: IoTArchitectureDetailProps) {
  const sectors = locale === "tr" ? sectorsTr : sectorsEn;
  const [activeSector, setActiveSector] = useState(sectors[0]);

  const archTitle =
    locale === "tr" ? "IoT-Ignite Mimarisi" : "IoT-Ignite Architecture";
  const hoverHint =
    locale === "tr"
      ? "Keşfetmek için bir bölüme tıklayın veya üzerine gelin."
      : "Hover or click a sector to explore the technical depth.";

  return (
    <div className="w-full h-full bg-black flex flex-col md:flex-row overflow-hidden select-none">
      {/* Sidebar Navigation (Desktop: Left, Mobile: Top) */}
      <div className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-md z-10 flex flex-col">
        <div className="p-4 md:p-8 overflow-x-auto md:overflow-visible no-scrollbar">
          <h3 className="hidden md:block text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            {archTitle}
          </h3>

          {/* Navigation Items */}
          <div className="flex md:flex-col gap-2 md:gap-4 min-w-max md:min-w-0">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onMouseEnter={() => setActiveSector(sector)}
                onClick={() => setActiveSector(sector)}
                className={`group relative flex flex-col items-start p-3 md:p-5 rounded-xl transition-all duration-300 border text-left
                                    md:w-full w-32 sm:w-40 
                                    ${
                                      activeSector.id === sector.id
                                        ? "bg-accent/10 border-accent/40 shadow-[0_0_30px_rgba(0,209,255,0.1)]"
                                        : "bg-transparent border-transparent hover:bg-white/5"
                                    }`}
              >
                <span
                  className={`text-[10px] font-mono mb-1 transition-colors ${
                    activeSector.id === sector.id
                      ? "text-accent"
                      : "text-neutral-500"
                  }`}
                >
                  0{sector.id}
                </span>
                <span
                  className={`text-xs md:text-sm font-bold tracking-wider transition-colors ${
                    activeSector.id === sector.id
                      ? "text-white"
                      : "text-neutral-400 group-hover:text-neutral-200"
                  }`}
                >
                  {sector.subtitle}
                </span>

                {activeSector.id === sector.id && (
                  <>
                    {/* Desktop Indicator (Vertical) */}
                    <motion.div
                      layoutId="active-indicator-desktop"
                      className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full shadow-[0_0_15px_rgba(0,209,255,0.8)]"
                    />
                    {/* Mobile Indicator (Horizontal) */}
                    <motion.div
                      layoutId="active-indicator-mobile"
                      className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full shadow-[0_0_15px_rgba(0,209,255,0.8)]"
                    />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:block mt-auto p-8 opacity-40">
          <p className="text-[9px] uppercase tracking-[0.2em] font-light leading-relaxed">
            {hoverHint}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-black flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.05, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full max-h-[60vh] md:max-h-full aspect-4/3 md:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#050505]"
          >
            <NextImage
              src={activeSector.image}
              alt={activeSector.title}
              fill
              className="object-contain p-4"
              priority
            />

            {/* Overlay hint */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none opacity-60" />

            {/* Mobile Title Overlay */}
            <div className="absolute top-4 left-4 md:hidden bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">
                {activeSector.title}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
