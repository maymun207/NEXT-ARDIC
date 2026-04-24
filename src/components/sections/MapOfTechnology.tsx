"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useProductModal } from "@/context/ProductModalContext";

const DEBUG_MODE = true; // Re-enabled

const TECHNOLOGIES = [
  {
    id: "pilaros",
    title: "1. PilarOS",
    subtitle: "The secure industrial Android operating system",
    position: { top: "72%", left: "27%" }, // ✓ Line endpoint
    image: "/images/tech-map/extracted_slide_4.png",
    content: [
      { label: "AFEX Layer", text: "Bypasses application permissions, granting root-level management." },
      { label: "Peripheral Lockdown", text: "Blocks unauthorized USB, ADB, and Bluetooth access." }
    ]
  },
  {
    id: "arcloud",
    title: "2. ArCloud",
    subtitle: "Establishing an absolute, secure tether from chip to cloud",
    position: { top: "41%", left: "22%" }, // ✓ Exact from debug tool
    image: "/images/tech-map/extracted_slide_8.png",
    content: [
      { label: "The Gateway", text: "Signal passes via secure APN to scalable compute nodes." },
      { label: "The Engine", text: "Complex Event Processing evaluates data against business rules." }
    ]
  },
  {
    id: "modiverse",
    title: "3. Modiverse",
    subtitle: "Scales security to the exact depth of the enterprise mandate",
    position: { top: "21%", left: "40%" }, // ✓ Nudged right 1%
    image: "/images/tech-map/extracted_slide_5.png",
    content: [
      { label: "Hardware Level", text: "Persistent software agent providing absolute administrative lock-in." },
      { label: "Control Dashboard", text: "Real-time tracking, zero-touch activation, and bulk patching." }
    ]
  },
  {
    id: "iot-ignite",
    title: "4. IoT-Ignite",
    subtitle: "Captures and standardizes the industrial telemetry pulse",
    position: { top: "21%", left: "59%" }, // ✓ Fine-tuned
    image: "/images/tech-map/extracted_slide_6.png",
    content: [
      { label: "Connectivity", text: "Physical Nodes (MQTT, OPC-UA) and local processing hubs." },
      { label: "Cloud & Dashboards", text: "Central management platform consuming telemetry via REST API." }
    ]
  },
  {
    id: "armes",
    title: "5. ArMES",
    subtitle: "Weaves the digital thread from shop-floor reality to business planning",
    position: { top: "41%", left: "77%" }, // ✓ Fine-tuned
    image: "/images/tech-map/extracted_slide_9.png",
    content: [
      { label: "The Handshake", text: "Two-way ERP integration importing orders and pushing live shop-floor status back." }
    ]
  },
  {
    id: "arai",
    title: "6. ArAI",
    subtitle: "The Cognitive Pipeline: From query to prescriptive insight",
    position: { top: "72%", left: "74%" }, // ✓ Final
    image: "/images/tech-map/extracted_slide_12.png",
    content: [
      { label: "Pipeline", text: "Natural Language Query → Semantic Search → LLM Synthesis → Multi-Modal Response." },
      { label: "Grounded Data", text: "Shared graph-based state management prevents AI hallucination." }
    ]
  },
  {
    id: "cwf",
    title: "7. CWF",
    subtitle: "Conversational intelligence for production decisions",
    position: { top: "78%", left: "50%" }, // ✓ Exact from debug tool
    image: "/images/tech-map/cwf_slide2.png",
    content: [
      { label: "Chat With Factory", text: "Natural language interface to query and command shop-floor operations." }
    ]
  }
];

export default function MapOfTechnology() {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number; px: number; py: number } | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { openProduct } = useProductModal();

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!DEBUG_MODE) return;
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = Math.round((x / rect.width) * 100);
    const yPct = Math.round((y / rect.height) * 100);
    setClickCoords({ x: Math.round(x), y: Math.round(y), px: xPct, py: yPct });
  };

  return (
    <section className="relative w-full bg-[#e9ebef] py-16 sm:py-24 overflow-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl">
          <h2 className="text-[#1c2b2b] text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}>
            Map of Our Technology
          </h2>
          <div className="h-1 w-24 bg-[#1a4d3a] mx-auto rounded-full mb-6 opacity-80 gap-2"></div>
          <p className="text-[#505c65] text-lg sm:text-xl font-medium max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            A comprehensive overview of the ARDICTECH architecture, spanning from edge devices 
            to cloud intelligence and enterprise integrations.
          </p>
        </div>

        {/* Diagram Image Container */}
        <div className="w-full max-w-[1200px] relative bg-transparent group">

          {/* Debug coordinate display */}
          {DEBUG_MODE && clickCoords && (
            <div className="absolute -top-12 left-0 z-50 bg-black text-green-400 font-mono text-sm px-4 py-2 rounded-lg shadow-xl border border-green-500/40 flex gap-4">
              <span>left: <strong>{clickCoords.px}%</strong></span>
              <span>top: <strong>{clickCoords.py}%</strong></span>
              <span className="text-white/40">({clickCoords.x}px, {clickCoords.y}px)</span>
              <button onClick={() => setClickCoords(null)} className="text-white/60 hover:text-white ml-2">✕</button>
            </div>
          )}

          <div
            ref={imageContainerRef}
            onClick={handleImageClick}
            className={`relative w-full flex justify-center items-center ${DEBUG_MODE ? 'cursor-crosshair' : ''}`}
          >
            <Image
              src="/images/map.jpeg"
              alt="Map of Our Technology"
              width={3004}
              height={1408}
              unoptimized
              className="w-full h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
              style={{ mixBlendMode: "multiply", opacity: 0.9 }}
              priority
            />

            {/* Edge Fade Overlay to blend image into background */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{
              background: `
                linear-gradient(to right, #e9ebef 0%, transparent 8%, transparent 92%, #e9ebef 100%),
                linear-gradient(to bottom, #e9ebef 0%, transparent 12%, transparent 88%, #e9ebef 100%)
              `
            }}></div>

            {/* Hotspots overlay */}
            {TECHNOLOGIES.map((tech) => {
              const isTopHalf = parseInt(tech.position.top) < 50;
              // Adjust alignment for hotspots near edges to prevent screen overflow
              const isFarLeft = parseInt(tech.position.left) < 30;
              const isFarRight = parseInt(tech.position.left) > 70;
              
              let alignClass = "-translate-x-1/2 left-1/2";
              let triangleClass = "left-1/2 -translate-x-1/2";
              
              if (isFarLeft) {
                alignClass = "left-0";
                triangleClass = "left-[24px]"; // Align triangle with hotspot
              } else if (isFarRight) {
                alignClass = "right-0";
                triangleClass = "right-[24px]"; // Align triangle with hotspot
              }

              return (
                <div
                  key={tech.id}
                  className={`absolute ${activeTech === tech.id ? 'z-50' : 'z-20'}`}
                  style={{ top: tech.position.top, left: tech.position.left, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setActiveTech(tech.id)}
                  onMouseLeave={() => setActiveTech(null)}
                  onClick={() => setActiveTech(activeTech === tech.id ? null : tech.id)}
                >
                  <div className="relative cursor-pointer group/hotspot p-4">
                    {/* Outer pulsing ring - slow */}
                    <div className={`absolute inset-0 rounded-full bg-[#a7f3d0] animate-ping ${activeTech === tech.id ? 'opacity-60' : 'opacity-40'}`} style={{ animationDuration: '4s' }}></div>
                    {/* Inner solid dot - fully visible */}
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[1.5px] border-[#d1d5db] shadow-md transition-all duration-300 ${activeTech === tech.id ? 'bg-[#6ee7b7] scale-125' : 'bg-[#a7f3d0] group-hover/hotspot:bg-[#6ee7b7] group-hover/hotspot:scale-110'}`}></div>
                  </div>

                  {/* Hover Card */}
                  <AnimatePresence>
                    {activeTech === tech.id && (
                      <motion.div
                        initial={{ opacity: 0, y: isTopHalf ? -10 : 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: isTopHalf ? -5 : 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${alignClass} pointer-events-auto z-50 ${isTopHalf ? 'top-full mt-3' : 'bottom-full mb-3'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openProduct(tech.id);
                        }}
                      >
                        <div className="w-[280px] sm:w-[320px] sm:hover:w-[500px] md:hover:w-[640px] lg:hover:w-[760px] transition-[width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-[#121818]/95 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl overflow-hidden relative cursor-pointer group/card hover:bg-[#1a2525]/95">
                          {/* Glassmorphic highlight */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00c4a0]/50 to-transparent"></div>
                          
                          {/* Image Thumbnail */}
                          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-4 relative bg-black/50 border border-white/5 shadow-inner transform-gpu transition-all duration-500">
                            <Image src={tech.image} alt={tech.title} fill className="object-cover sm:scale-110 sm:group-hover/card:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                          </div>

                          <h4 className="text-xl font-bold text-white mb-1.5 tracking-wide">{tech.title}</h4>
                          <p className="text-[#00c4a0] text-sm font-medium leading-relaxed">{tech.subtitle}</p>
                          
                          {/* Details Link - Always visible as a button */}
                          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[#00c4a0] text-sm font-medium">Learn more about {tech.title.split('. ')[1]}</span>
                            <div className="flex items-center justify-center bg-[#00c4a0]/10 hover:bg-[#00c4a0]/20 text-[#00c4a0] text-sm font-medium px-4 py-2 rounded-lg transition-colors group-hover/card:bg-[#00c4a0]/20">
                              <span>View details</span>
                              <svg className="h-4 w-4 ml-1.5 transform group-hover/card:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {/* Triangle pointer */}
                        <div className={`w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent absolute ${triangleClass} transition-all duration-500 ${
                          isTopHalf 
                            ? 'border-b-[10px] border-b-[#121818]/95 -top-[10px]' 
                            : 'border-t-[10px] border-t-[#121818]/95 -bottom-[10px]'
                        }`}></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
