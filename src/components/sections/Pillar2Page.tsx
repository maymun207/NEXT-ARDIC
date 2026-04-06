"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SubServiceModal, SubServiceData } from "@/components/ui/SubServiceModal";

const PILLAR = {
  number: 2,
  title: "Activate AI-Driven\nIntelligence",
  tagline: "Collect. Analyze. Precision.",
  accent: "#8ecae6",
  textAccent: "#297291",
  image: "/images/pillar2.jpeg",
};

const SUB_SERVICES = [
  {
    id: "real-time-ingestion",
    slug: "real-time-ingestion",
    title: "Real-Time Ingestion",
    tagline: "The surface level of data extraction.",
    image: "/images/RT1.jpeg",
    imageBg: "#ffffff",
    imageFit: "contain",
    imagePadding: "2rem",
    imageBlend: false,
    accent: "#8ecae6",
    description:
      "Your factory generates millions of data points every second at the surface level. We capture this fast-moving data from machines, sensors, and legacy systems reliably, avoiding silent data loss to establish a secure foundation for everything underneath.",
    bullets: [],
  },
  {
    id: "data-discovery",
    slug: "data-discovery",
    title: "Data Discovery & Logging",
    tagline: "Finding the needle in the data haystack.",
    image: "/images/pillar2.jpeg",
    imageFit: "contain",
    imagePadding: "2rem",
    imageBlend: false,
    accent: "#76b7d1",
    description:
      "As data drops into the first subterranean layer, we index and catalog massive operational logs. This document-level discovery phase ensures that every data point is instantly searchable, auditable, and traceable back to its origin.",
    bullets: [
      "High-speed semantic search across factory logs",
      "Automated documentation and metadata tagging",
      "Traceability for compliance and quality control",
      "Historical data archiving without performance loss",
    ],
  },
  {
    id: "core-processing",
    slug: "core-processing",
    title: "Core Processing & Normalization",
    tagline: "The mechanical gears of the operation.",
    image: "/images/pillar2.jpeg",
    imageFit: "contain",
    imagePadding: "2rem",
    imageBlend: false,
    accent: "#66a8c2",
    description:
      "Raw data has no meaning until it is processed. In the third layer, the 'gears' of our system clean, parse, and normalize varying edge protocols into a single, unified operational data model, preparing the fuel that powers advanced analytics.",
    bullets: [
      "Real-time protocol translation and normalization",
      "Data cleansing and noise reduction at the edge",
      "Seamless integration with ERP, MES, and SCADA",
      "Automated data pipeline health monitoring",
    ],
  },
  {
    id: "operational-visibility",
    slug: "operational-visibility",
    title: "Deep Operational Visibility",
    tagline: "See every process, everywhere.",
    image: "/images/pillar2.jpeg",
    imageFit: "contain",
    imagePadding: "2rem",
    imageBlend: false,
    accent: "#539ab5",
    description:
      "In the fourth layer, we place a magnifying glass over your contextualized data streams. We transform these streams into interactive observability dashboards and digital twins that visualize bottlenecks, performance degradation, and yield tracking across the enterprise.",
    bullets: [
      "Live Digital Twin monitoring and interaction",
      "Unified operational dashboards with role-based views",
      "Historical trend analysis and threshold alerts",
      "Multi-site visibility from a single pane of glass",
    ],
  },
  {
    id: "predictive-ai-engine",
    slug: "prescriptive-ai",
    title: "Prescriptive AI & Interfaces",
    tagline: "The enterprise, accessible from anywhere.",
    image: "/images/H3-ENTERPRISE AI .jpeg",
    imageFit: "cover",
    imagePadding: "0px",
    imageBlend: false,
    accent: "#438ca8",
    description:
      "At the deepest architectural layer lies our cognitive core. Far beyond merely predicting failures, it operates prescriptively—recommending exact actions and automating resolutions. Designed for complete accessibility, your entire factory is now at your fingertips through natural language.",
    bullets: [
      "Prescriptive root-cause analysis and automated resolution",
      "Omnichannel reach: Desktop Web Dashboards and Mobile Apps",
      "WhatsApp Integration: Chat with your factory on the go",
      "ARDY Copilot: Intuitive natural language interactions",
    ],
  },
];

export default function Pillar2Page({ standalone = false }: { standalone?: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<SubServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (sub: any) => {
    setSelectedService(sub);
    setIsModalOpen(true);
  };

  // Layout redesigned to side-by-side: Image left, 2x2 grid right with 5th element centered
  return (
    <section
      id="ai-intelligence"
      style={{
        position: "relative",
        zIndex: 10,
        background: "#fdfdfd", // Slight off-white to make the cards pop
        fontFamily: "'Inter', sans-serif",
        paddingTop: standalone ? "4rem" : "8vh",
        paddingBottom: "8vh",
      }}
    >
      {/* ── TOP HEADER HERO ── */}
      <div 
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 5%",
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "800px", marginTop: standalone ? "4rem" : "0", paddingBottom: "4rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: `${PILLAR.accent}18`, border: `1px solid ${PILLAR.accent}40`,
            borderRadius: "999px", padding: "0.4rem 1.25rem", color: PILLAR.textAccent,
            fontSize: "12px", fontWeight: 800, letterSpacing: "0.2em", marginBottom: "1.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            ● PILLAR {PILLAR.number}
          </span>
          <h2 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#050505",
            lineHeight: 1.1, fontFamily: "'DM Serif Display', serif", whiteSpace: "pre-line", marginBottom: "1rem"
          }}>
            {PILLAR.title}
          </h2>
          <p style={{
            color: "#1c2b2b", fontSize: "18px", fontWeight: 600, letterSpacing: "0.03em", opacity: 0.8
          }}>
            {PILLAR.tagline}
          </p>
        </div>
      </div>
        
      {/* MAIN CONTENT: 2 COLUMNS */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-8 xl:px-16 max-w-[1600px] mx-auto items-start">
        
        {/* Left: Image Container (Sticky on Desktop) */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-[12vh]">
          <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "65vh", 
            minHeight: "500px", 
            maxHeight: "800px",
            borderRadius: "24px", 
            overflow: "hidden", 
            boxShadow: "0 24px 48px rgba(0,0,0,0.08)" 
          }}>
            <Image
              src={PILLAR.image}
              alt={PILLAR.title}
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
            {/* Subtle Gradient Overlay so it looks premium */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 100%)",
              mixBlendMode: "multiply",
              pointerEvents: "none"
            }} />
          </div>
        </div>

        {/* Right: Vertical Hover Cards (Grid) */}
        <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          {SUB_SERVICES.map((sub, i) => {
            const isHovered = hoveredCard === sub.id;
            const isLast = i === 4;

            return (
              <div
                key={sub.id}
                onMouseEnter={() => setHoveredCard(sub.id)}
                onMouseLeave={() => setHoveredCard(null)}
                // Centering logic for the last item (5th item in a 2-col grid)
                className={isLast ? "md:col-span-2 md:w-[calc(50%-0.75rem)] md:mx-auto" : ""}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem", // Pillar 1 card padding
                  boxShadow: isHovered 
                    ? `0 24px 48px rgba(0,0,0,0.06), 0 0 0 1px ${sub.accent}30` 
                    : "0 8px 24px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.04)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)"
                }}
              >
                {/* Top Accent Icon & CTA Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: isHovered ? sub.accent : `${sub.accent}15`, 
                    color: isHovered ? "#fff" : sub.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.4s ease", flexShrink: 0
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {sub.id === "real-time-ingestion" && <path d="M22 12h-4l-3 9L9 3l-3 9H2" />}
                      {sub.id === "data-discovery" && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
                      {sub.id === "core-processing" && <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />}
                      {sub.id === "operational-visibility" && <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z" />}
                      {sub.id === "predictive-ai-engine" && <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                    </svg>
                  </div>

                  <button
                    onClick={() => handleOpenModal(sub)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.65rem 1.15rem", 
                      background: isHovered ? sub.accent : `rgba(0,0,0,0.02)`,
                      border: `1px solid ${isHovered ? sub.accent : `rgba(0,0,0,0.06)`}`,
                      borderRadius: "8px", 
                      color: isHovered ? "#fff" : "rgba(0,0,0,0.8)",
                      fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
                      transition: "all 0.4s ease",
                      boxShadow: isHovered ? `0 8px 16px ${sub.accent}40` : "none",
                      cursor: "pointer"
                    }}
                  >
                    EXPLORE
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <h3 style={{
                  fontSize: "1.6rem", fontWeight: 700, color: "#050505", fontFamily: "'DM Serif Display', serif",
                  marginBottom: "0.5rem", lineHeight: 1.2
                }}>
                  {sub.title}
                </h3>
                
                <p style={{
                  color: sub.accent, fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em",
                  marginBottom: "1.25rem"
                }}>
                  {sub.tagline}
                </p>

                <div style={{
                  width: isHovered ? "100%" : "30px",
                  height: "2px",
                  background: `linear-gradient(90deg, ${sub.accent}, transparent)`,
                  borderRadius: "2px",
                  transition: "width 0.5s ease",
                  marginBottom: "1.5rem"
                }}/>

                {/* ── VERTICAL EXPANDING CONTENT (CSS Grid Transition) ── */}
                <div style={{
                  display: "grid",
                  gridTemplateRows: isHovered ? "1fr" : "0fr",
                  opacity: isHovered ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  marginBottom: isHovered ? "2rem" : "0",
                }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ color: "rgba(0,0,0,0.65)", fontSize: "14px", lineHeight: 1.6, marginBottom: sub.bullets && sub.bullets.length > 0 ? "1.5rem" : "0" }}>
                      {sub.description}
                    </p>
                    {sub.bullets && sub.bullets.length > 0 && (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {sub.bullets.map((b, bi) => (
                          <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                            <span style={{ 
                              flexShrink: 0, marginTop: "0.35rem", width: "6px", height: "6px", 
                              borderRadius: "50%", background: sub.accent, boxShadow: `0 0 6px ${sub.accent}60`
                            }} />
                            <span style={{ color: "rgba(0,0,0,0.75)", fontSize: "13px", lineHeight: 1.5, fontWeight: 500 }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* ── ASSOCIATED PRODUCTS AT BOTTOM (MOCK) ── */}
                {/* 
                {(sub as any).buttons && (sub as any).buttons.length > 0 && (
                  <div style={{
                    marginTop: "auto",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    display: "flex", gap: "0.5rem", flexWrap: "wrap"
                  }}>
                    {(sub as any).buttons.map((btnText: string) => (
                      <span key={btnText} style={{
                        padding: "0.35rem 0.75rem", background: isHovered ? `${sub.accent}12` : "rgba(0,0,0,0.04)", 
                        border: `1px solid ${isHovered ? `${sub.accent}30` : "transparent"}`,
                        borderRadius: "6px", color: isHovered ? sub.accent : "rgba(0,0,0,0.5)", 
                        fontSize: "10.5px", fontWeight: 800, letterSpacing: "0.08em",
                        transition: "all 0.3s ease"
                      }}>
                        {btnText}
                      </span>
                    ))}
                  </div>
                )}
                */}
              </div>
            );
          })}
        </div>
      </div>
      
      <SubServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </section>
  );
}
