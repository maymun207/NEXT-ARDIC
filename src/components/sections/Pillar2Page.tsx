"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PILLAR = {
  number: 2,
  title: "Activate AI-Driven\nIntelligence",
  tagline: "Collect. Analyze. Precision.",
  accent: "#8ecae6",
  textAccent: "#297291",
  image: "/images/HALF GLASS FACTORY .jpeg",
};

const SUB_SERVICES = [
  {
    id: "real-time-ingestion",
    slug: "real-time-ingestion",
    title: "Real-Time Ingestion",
    tagline: "The surface level of data extraction.",
    image: "/images/HALF GLASS FACTORY .jpeg",
    accent: "#8ecae6",
    description:
      "Your factory generates millions of data points every second at the surface level. We capture this fast-moving data from machines, sensors, and legacy systems reliably, avoiding silent data loss to establish a secure foundation for everything underneath.",
    bullets: [
      "High-frequency data ingestion securely at scale",
      "Unified telemetry streaming from all assets",
      "Immediate synchronization with local databases",
      "Elimination of proprietary hardware silos",
    ],
  },
  {
    id: "data-discovery",
    slug: "data-discovery",
    title: "Data Discovery & Logging",
    tagline: "Finding the needle in the data haystack.",
    image: "/images/HALF GLASS FACTORY .jpeg",
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
    image: "/images/HALF GLASS FACTORY .jpeg",
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
    image: "/images/HALF GLASS FACTORY .jpeg",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCTA, setHoveredCTA] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="ai-intelligence"
      style={{
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        paddingTop: standalone ? "4rem" : "8vh",
      }}
    >
      {/* ── SECTION HEADER ── */}
      <div style={{ width: "100%", padding: "0 4%", marginBottom: "4vh", display: "flex", alignItems: "center", gap: "2rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 900,
            color: PILLAR.textAccent || PILLAR.accent,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          PILLAR {PILLAR.number}
        </h2>
        <div style={{ flex: 1, height: "2px", background: `linear-gradient(to right, ${PILLAR.textAccent || PILLAR.accent}40, transparent)` }} />
      </div>

      <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ── LEFT: Sticky sidebar ─────────────────────────────────────────── */}
      <div
        style={{
          width: "42%",
          flexShrink: 0,
          position: "sticky",
          top: "4rem",
          height: "calc(100vh - 4rem)",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Image
          src={PILLAR.image}
          alt={PILLAR.title}
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.83) 0%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.50) 100%)",
          }}
        />
        {/* Right fade into main content */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "25%",
            background: "linear-gradient(to left, rgba(255,255,255,0.9) 0%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10vh 3rem 3.5rem",
          }}
        >
          {/* Top: Pillar badge */}
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `${PILLAR.accent}18`,
                border: `1px solid ${PILLAR.accent}40`,
                borderRadius: "999px",
                padding: "0.35rem 1rem",
                color: PILLAR.textAccent,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.18em",
              }}
            >
              ● PILLAR {PILLAR.number}
            </span>
          </div>

          {/* Middle: Title */}
          <div>
            <h1
              style={{
                fontSize: "clamp(2rem, 3.2vw, 3rem)",
                fontWeight: 700,
                color: "#050505",
                lineHeight: 1.2,
                fontFamily: "'DM Serif Display', serif",
                whiteSpace: "pre-line",
                marginBottom: "1rem",
              }}
            >
              {PILLAR.title}
            </h1>
            <p 
              style={{ 
                color: "#1c2b2b", 
                fontSize: "17px", 
                fontWeight: 800, 
                letterSpacing: "0.04em",
                textShadow: "0 0 12px rgba(255,255,255,0.9)", // White glow completely isolates text from image noise
              }}
            >
              {PILLAR.tagline}
            </p>

            {/* Divider */}
            <div
              style={{
                width: "40px",
                height: "2px",
                background: `linear-gradient(90deg, ${PILLAR.accent}, transparent)`,
                borderRadius: "2px",
                margin: "1.5rem 0",
              }}
            />

            {/* Sub-service nav dots */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {SUB_SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() =>
                    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      width: activeIndex === i ? "10px" : "6px",
                      height: activeIndex === i ? "10px" : "6px",
                      borderRadius: "50%",
                      background: activeIndex === i ? s.accent : "rgba(0,0,0,0.2)",
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                      boxShadow: activeIndex === i ? `0 0 8px ${s.accent}80` : "none",
                    }}
                  />
                  <span
                    style={{
                      color: activeIndex === i ? "#050505" : "rgba(0,0,0,0.45)",
                      fontSize: "12.5px",
                      fontWeight: activeIndex === i ? 600 : 400,
                      transition: "all 0.3s ease",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </nav>

            {/* Progress bar (Moved under nav dots) */}
            <div style={{ marginTop: "2.5rem" }}>
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  background: "rgba(0,0,0,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${((activeIndex + 1) / SUB_SERVICES.length) * 100}%`,
                    background: `linear-gradient(90deg, ${PILLAR.textAccent || PILLAR.accent}, ${SUB_SERVICES[activeIndex].accent})`,
                    borderRadius: "2px",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "11px", marginTop: "0.6rem" }}>
                {activeIndex + 1} / {SUB_SERVICES.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Scrolling sub-service hover cards grid ────────────────────────── */}
      <div style={{ flex: 1, padding: "3rem", background: "#f9f9fa", display: "flex", flexDirection: "column" }}>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
          alignItems: "stretch"
        }}>
          {SUB_SERVICES.map((sub, i) => {
            // Check if this is the 5th item (index 4)
            const isLast = i === 4;
            return (
              <HoverCard 
                key={sub.id} 
                sub={sub} 
                i={i} 
                isLast={isLast} 
                sectionRef={(el: HTMLElement | null) => { sectionRefs.current[i] = el; }} 
              />
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}

// Internal Hover Card Component
function HoverCard({ sub, i, isLast, sectionRef }: { sub: any, i: number, isLast: boolean, sectionRef: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        gridColumn: isLast ? "1 / -1" : "auto", // The 5th item spans full width
        width: isLast ? "calc(50% - 1rem)" : "100%", // Constrain 5th item to identical width and center it
        margin: isLast ? "0 auto" : "0",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: isHovered ? `0 24px 48px ${sub.accent}25` : "0 8px 24px rgba(0,0,0,0.04)",
        border: `1px solid ${isHovered ? sub.accent : "rgba(0,0,0,0.06)"}`,
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "default",
      }}
    >
      {/* Number Icon */}
      <div style={{
        width: "54px", height: "54px", borderRadius: "14px",
        background: `${sub.accent}15`, color: sub.accent,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", fontWeight: 800, marginBottom: "1.5rem"
      }}>
        0{i + 1}
      </div>

      <h2 style={{
        fontSize: "1.4rem", fontWeight: 700, color: "#050505",
        fontFamily: "'DM Serif Display', serif", lineHeight: 1.25, marginBottom: "0.5rem"
      }}>
        {sub.title}
      </h2>
      <p style={{
        color: sub.accent, fontSize: "12px", fontWeight: 700,
        letterSpacing: "0.08em", marginBottom: "1.25rem", textTransform: "uppercase"
      }}>
        {sub.tagline}
      </p>

      <div style={{ width: "24px", height: "2px", background: sub.accent, borderRadius: "2px", marginBottom: "1.25rem" }} />

      <p style={{
        color: "rgba(0,0,0,0.65)", fontSize: "14px", lineHeight: 1.6, flex: 1, marginBottom: "1.5rem"
      }}>
        {sub.description}
      </p>

      {/* Bullets (compressed for card view) */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {sub.bullets.slice(0, 3).map((b: string, bi: number) => (
          <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
            <span style={{
              flexShrink: 0, marginTop: "0.35rem", width: "5px", height: "5px",
              borderRadius: "50%", background: sub.accent
            }} />
            <span style={{ color: "rgba(0,0,0,0.7)", fontSize: "13px", lineHeight: 1.4 }}>
              {b}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div style={{ marginTop: "auto" }}>
        <Link
          href={`/en/services/ai-intelligence/${sub.slug}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.6rem 1.25rem", borderRadius: "8px",
            background: isHovered ? sub.accent : `${sub.accent}12`,
            color: isHovered ? "#ffffff" : sub.accent,
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textDecoration: "none",
            transition: "all 0.3s ease"
          }}
        >
          EXPLORE
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
