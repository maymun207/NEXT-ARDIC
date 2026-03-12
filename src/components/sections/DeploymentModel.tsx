// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import NextImage from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface DeploymentModelProps {
  dict: Dictionary;
  locale: string;
}

export default function DeploymentModel({
  dict,
  locale,
}: DeploymentModelProps) {
  const { deploymentModel, platform } = dict;
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const layer4 = platform.layers.find((l) => l.id === "cwf");
  const layer3 = platform.layers.find((l) => l.id === "arai");
  const layer2 = platform.layers.find((l) => l.id === "armes");
  const layer1 = platform.layers.find((l) => l.id === "iot-ignite");

  const activeLayerData =
    hoveredLayer === "layer-4"
      ? layer4
      : hoveredLayer === "layer-3"
        ? layer3
        : hoveredLayer === "layer-2"
          ? layer2
          : hoveredLayer === "layer-1"
            ? layer1
            : null;

  return (
    <SectionWrapper
      id="deployment-model"
      dark
      className="bg-black overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative">
        {/* Title Section */}
        <div className="mb-24 text-center">
          <h2 className="font-heading text-4xl font-bold sm:text-5xl lg:text-7xl text-white leading-[1.1] tracking-tight">
            {deploymentModel.title}
          </h2>
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-5 py-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-heading text-xs font-semibold tracking-widest text-accent uppercase">
                {platform.subtitle}
              </span>
            </div>
          </div>
          <div className="mx-auto mt-12 h-px w-24 bg-accent/30" />
        </div>

        {/* Integrated Approach Section */}
        <div className="mt-12 relative">
          <div className="flex flex-col items-center pb-20 px-2 md:px-8 bg-black text-center">
            <div className="relative w-full max-w-4xl mx-auto">
              <div
                className="relative overflow-hidden bg-black rounded-2xl border border-white/5"
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <NextImage
                  src="/images/platform-architecture-v4.jpeg"
                  alt="CompanyTech 4-Layer Architecture"
                  width={1200}
                  height={800}
                  className={`w-full h-auto object-contain transition-all duration-700 ${hoveredLayer ? "opacity-30 grayscale-[0.5] blur-[2px]" : "opacity-100"}`}
                  priority
                />

                {/* Gradient mask to hide baked-in English text on the right side */}
                <div
                  className="absolute inset-0 pointer-events-none z-5"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 56%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.92) 65%, black 70%)",
                  }}
                />

                {/* Localized text labels overlaying the masked English text */}
                {[
                  { top: "14%", layer: layer4 },
                  { top: "36%", layer: layer3 },
                  { top: "58%", layer: layer2 },
                  { top: "76%", layer: layer1 },
                ].map((pos, idx) => {
                  if (!pos.layer) return null;
                  return (
                    <div
                      key={pos.layer.id}
                      className="absolute right-[4%] sm:right-[6%] md:right-[8%] z-10"
                      style={{ top: pos.top, maxWidth: "44%" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="hidden sm:inline-block w-12 md:w-16 h-[2px]"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, #00e6e6)",
                          }}
                        />
                        <span className="w-2 h-2 rounded-full bg-[#00e6e6] shrink-0" />
                        <span className="text-[#00e6e6] font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight whitespace-nowrap">
                          {pos.layer.number}: {pos.layer.name}
                        </span>
                      </div>
                      <div className="ml-0 sm:ml-15 md:ml-19">
                        <p className="text-white text-[10px] sm:text-xs md:text-sm leading-snug">
                          ({pos.layer.type})
                        </p>
                        <p className="text-white text-[10px] sm:text-xs md:text-sm leading-snug">
                          – {pos.layer.metaphor}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Hotspots for Layers */}
                <div
                  className="absolute top-[5%] left-[5%] w-[40%] h-[20%] cursor-pointer z-20"
                  onMouseEnter={() => setHoveredLayer("layer-4")}
                />
                <div
                  className="absolute top-[25%] left-[5%] w-[40%] h-[18%] cursor-pointer z-20"
                  onMouseEnter={() => setHoveredLayer("layer-3")}
                />
                <div
                  className="absolute top-[45%] left-[5%] w-[40%] h-[18%] cursor-pointer z-20"
                  onMouseEnter={() => setHoveredLayer("layer-2")}
                />
                <div
                  className="absolute top-[68%] left-[5%] w-[40%] h-[18%] cursor-pointer z-20"
                  onMouseEnter={() => setHoveredLayer("layer-1")}
                />

                {/* Tooltip Overlay */}
                <AnimatePresence>
                  {hoveredLayer && activeLayerData && (
                    <motion.div
                      key={hoveredLayer}
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      className="absolute left-2 right-2 bottom-2 md:left-[58%] md:right-auto md:bottom-auto z-30 w-auto md:w-80 p-4 md:p-6 bg-black border border-accent/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                      style={{
                        top:
                          hoveredLayer === "layer-4"
                            ? "2%"
                            : hoveredLayer === "layer-3"
                              ? "22%"
                              : hoveredLayer === "layer-2"
                                ? "42%"
                                : "62%",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                          <span className="text-accent text-xs font-bold uppercase tracking-widest">
                            {activeLayerData.number}
                          </span>
                        </div>
                        <h5 className="text-white font-heading font-bold text-lg">
                          {activeLayerData.name}
                        </h5>
                      </div>
                      <p className="text-accent/80 text-sm font-medium mb-2 italic tracking-wide">
                        &ldquo;{activeLayerData.metaphor}&rdquo;
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed font-light">
                        {activeLayerData.description}
                      </p>

                      {/* Decorative element */}
                      <div className="absolute -left-2 top-8 w-2 h-2 bg-accent rotate-45 border border-white/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
