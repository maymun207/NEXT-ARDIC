// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/types";
import { cn } from "@/lib/utils";

interface JourneyStateProps {
  dict: Dictionary;
  locale: string;
}

const HOTSPOT_ZONES = [
  {
    id: "searcher",
    nodeId: "A",
    left: "21.5%",
    top: "80%",
    width: "22%",
    height: "14%",
    cardPos: "top",
  },
  {
    id: "pilot-prisoner",
    nodeId: "pilot-purgatory",
    left: "74%",
    top: "41.5%",
    width: "22%",
    height: "14%",
    cardPos: "top",
  },
  {
    id: "restart",
    nodeId: "E",
    left: "74%",
    top: "6%",
    width: "22%",
    height: "14%",
    cardPos: "bottom",
  },
];

export default function JourneyState({ dict, locale }: JourneyStateProps) {
  const { journeyState } = dict;
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section
      id="journey-state"
      className="relative overflow-hidden bg-[#000000] py-24 sm:py-28 text-white"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Horizontal Split */}
        <h3 className="mb-12 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
          {journeyState.title}
        </h3>
        <div className="mb-24 grid gap-16 lg:grid-cols-[1fr_380px] lg:items-center">
          {/* Column 1: Title + Interactive Map Area (Image) - Moved to Left */}
          <div className="flex flex-col -translate-y-[5%]">
            <div className="relative group">
              <div className="relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <Image
                  src={
                    locale === "tr"
                      ? "/images/journey-flow-v3-tr.png"
                      : "/images/journey-flow-v3.png"
                  }
                  alt="Journey to Digitalization Flow"
                  width={1600}
                  height={900}
                  className={cn(
                    "h-auto w-full transition-all duration-1000 brightness-75",
                    hoveredNode ? "opacity-30 blur-[1px]" : "opacity-100",
                  )}
                  priority
                  unoptimized
                />

                {/* Seamless Edge Blends - Keeping them very narrow to not hide text */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                  {/* Left Edge Shade - REMOVED to show Node B text */}
                  {/* <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black via-black/80 to-transparent" /> */}
                  {/* Right Edge */}
                  <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black to-transparent" />
                  {/* Top Edge */}
                  <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-black to-transparent" />
                  {/* Bottom Edge */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black to-transparent" />
                </div>

                {/* Hotspot Hover Zones (Inside Image Container) */}
                <div className="absolute inset-0 z-20">
                  {HOTSPOT_ZONES.map((zone) => (
                    <div
                      key={zone.id}
                      style={{
                        left: zone.left,
                        top: zone.top,
                        width: zone.width,
                        height: zone.height,
                      }}
                      className="absolute group/hotspot cursor-help"
                      onMouseEnter={() => setHoveredNode(zone.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Subtly indicate the hotspot on hover */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-xl border border-accent/0 transition-all duration-500",
                          hoveredNode === zone.id
                            ? "border-accent/40 bg-accent/5"
                            : "bg-transparent",
                        )}
                      />

                      {/* Floating Card */}
                      <div
                        className={cn(
                          "absolute left-1/2 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/90 p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-500 z-50",
                          zone.cardPos === "bottom"
                            ? "top-full mt-6"
                            : "bottom-full mb-6",
                          hoveredNode === zone.id
                            ? "visible translate-y-0 opacity-100 scale-100"
                            : "invisible translate-y-4 opacity-0 scale-95",
                        )}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">
                            {locale === "tr"
                              ? "Tanısal Bakış"
                              : "Diagnostic Insight"}
                          </span>
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-white tracking-tight">
                          {
                            journeyState.states.find((s) => s.id === zone.id)
                              ?.title
                          }
                        </h4>
                        <p className="text-sm leading-relaxed text-neutral-300">
                          {
                            journeyState.states.find((s) => s.id === zone.id)
                              ?.description
                          }
                        </p>
                        <div
                          className={cn(
                            "absolute left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-white/10 bg-black/90",
                            zone.cardPos === "bottom"
                              ? "-top-2 border-t border-l"
                              : "-bottom-2 border-b border-r",
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: The Question - Moved to Right */}
          <div className="relative group lg:sticky lg:top-32">
            <h2 className="font-heading text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl tracking-tighter">
              {journeyState.question.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-500 group-hover:translate-x-2"
                >
                  {word}&nbsp;
                </span>
              ))}
            </h2>
            <div className="mt-8 h-1 w-24 bg-accent/50" />
          </div>
        </div>

        {/* Sync Grid: Assessment Cards at bottom */}
        <div className="grid gap-6 md:grid-cols-3">
          {journeyState.states.map((state, idx) => (
            <div
              key={state.id}
              onMouseEnter={() => setHoveredNode(state.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border transition-all duration-500 p-8 cursor-default",
                hoveredNode === state.id
                  ? "border-accent/60 bg-white/[0.07] scale-[1.02] shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]"
                  : "border-white/10 bg-white/3 backdrop-blur-xl",
              )}
            >
              <div
                className={cn(
                  "absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl transition-opacity duration-700",
                  hoveredNode === state.id ? "opacity-30" : "opacity-0",
                  idx === 0
                    ? "bg-blue-500"
                    : idx === 1
                      ? "bg-purple-500"
                      : "bg-emerald-500",
                )}
              />

              <div className="flex items-center gap-3 mb-6">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold border transition-colors duration-500",
                    hoveredNode === state.id
                      ? "bg-accent text-black border-accent"
                      : "bg-white/5 text-accent/80 border-white/10",
                  )}
                >
                  0{idx + 1}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium">
                  {locale === "tr" ? "Durum Analizi" : "State Analysis"}
                </span>
              </div>

              <h4 className="mb-3 text-2xl font-bold text-white tracking-tight">
                {state.title}
              </h4>
              <p
                className={cn(
                  "text-base leading-relaxed transition-colors duration-500",
                  hoveredNode === state.id
                    ? "text-neutral-100"
                    : "text-neutral-400",
                )}
              >
                {state.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
