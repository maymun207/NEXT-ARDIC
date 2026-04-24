"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PILLAR = {
  number: 3,
  title: "Orchestrate\n& Operate",
  tagline: "Automate. Orchestrate. Optimize.",
  accent: "#5aabf5",    // Light Blue
  textAccent: "#1d62b8", // Darker Blue for text
  image: "/images/orchestrate.jpeg",
};

const SUB_SERVICES = [
  {
    id: "automate-workflows",
    slug: "automate-workflows",
    title: "Automate Workflows",
    tagline: "ELIMINATE MANUAL BOTTLENECKS",
    accent: "#5aabf5",
    description:
      "Translate static standard operating procedures into dynamic, automated workflows. We provide a low-code environment where process engineers can sequence actions and define triggers without writing a single line of software.",
    bullets: [
      "Drag-and-drop workflow builder",
      "Automated SOP enforcement",
      "Digital issue tracking integration",
    ],
  },
  {
    id: "orchestrate-systems",
    slug: "orchestrate-systems",
    title: "Orchestrate Systems",
    tagline: "HARMONIZED ENTERPRISE EXECUTION",
    accent: "#74bbf7",
    description:
      "Connect distinct islands of automation into a unified symphony. Our orchestration layer ensures that your AGVs, MES software, and human operators act in perfect concert, managing complex inter-dependencies automatically.",
    bullets: [
      "Cross-platform system synchronization",
      "Complex conflict-resolution engines",
      "Closed-loop API triggers",
    ],
  },
  {
    id: "optimize-real-time",
    slug: "optimize-real-time",
    title: "Optimize in Real Time",
    tagline: "THE SELF-TUNING FACTORY",
    accent: "#93cdfb",
    description:
      "Leverage edge learning models to adjust setpoints on the fly. By continuously analyzing live telemetry against historical baselines, the system fine-tunes machine parameters, reducing energy waste and preventing yield degradation.",
    bullets: [
      "Dynamic parameter configuration",
      "Machine-learning powered adjustments",
      "Real-time OEE improvement scoring",
    ],
  },
];

export default function Pillar3Page({ standalone = false }: { standalone?: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // We default to the first card being "open" visually if nothing is hovered, OR keep all small?
  // User asked: "when cursor comes on the hover card it expands". We will make them all small until hovered.
  
  return (
    <section
      id="orchestrate-operate"
      style={{
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        paddingTop: standalone ? "4rem" : "8vh",
        paddingBottom: "8vh",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
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
        <div style={{ maxWidth: "800px", marginTop: standalone ? "4rem" : "0", paddingBottom: "3rem" }}>
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

      {/* ── TOP: IMAGE AREA ── */}
      <div style={{ position: "relative", width: "100%", height: "45vh", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
        {/* Full Image visible using contain */}
        <Image
          src={PILLAR.image}
          alt={PILLAR.title}
          fill
          priority
          unoptimized={true}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>

      {/* ── BOTTOM: HOVER CARDS ROW ── */}
      {/* Cards are always equal width — they expand vertically on hover */}
      <div style={{ display: "flex", gap: "1.25rem", padding: "0 4%", marginBottom: "2rem", alignItems: "flex-start" }}>
        {SUB_SERVICES.map((sub, i) => (
          <HoverCard
            key={sub.id}
            sub={sub}
            i={i}
            hoveredCard={hoveredCard}
            setHoveredCard={setHoveredCard}
          />
        ))}
      </div>
    </section>
  );
}

// Interactivity Component for the Hover Cards — Option 1
// Default: shows number + title + 3-line description preview with gradient fade
// Hovered: card expands vertically to show full content
function HoverCard({ sub, i, hoveredCard, setHoveredCard }: any) {
  const isHovered = hoveredCard === i;

  return (
    <div
      onMouseEnter={() => setHoveredCard(i)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        flex: 1,
        transition: "all 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
        background: isHovered ? sub.accent : "#ffffff",
        border: `1px solid ${isHovered ? sub.accent : "rgba(0,0,0,0.07)"}`,
        borderRadius: "20px",
        padding: "1.75rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: isHovered ? `0 20px 48px ${sub.accent}35` : "0 2px 12px rgba(0,0,0,0.05)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── HEADER — always visible ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexShrink: 0 }}>
        <div
          style={{
            width: "44px", height: "44px", flexShrink: 0,
            background: isHovered ? "rgba(255,255,255,0.25)" : `${sub.accent}15`,
            color: isHovered ? "#fff" : sub.accent,
            borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: 800, transition: "all 0.4s ease",
          }}
        >
          0{i + 1}
        </div>
        <h3
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            fontWeight: 700,
            fontFamily: "'DM Serif Display', serif",
            color: isHovered ? "#ffffff" : "#050505",
            margin: 0,
            lineHeight: 1.2,
            transition: "color 0.4s ease",
          }}
        >
          {sub.title}
        </h3>
      </div>

      {/* ── TAGLINE — always visible ── */}
      <p style={{
        color: isHovered ? "rgba(255,255,255,0.75)" : sub.accent,
        fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em",
        marginBottom: "0.6rem", flexShrink: 0,
        transition: "color 0.4s ease",
      }}>
        {sub.tagline}
      </p>

      {/* ── DESCRIPTION PREVIEW — 3 lines visible always, fully visible on hover ── */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <p style={{
          color: isHovered ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.65)",
          fontSize: "13.5px",
          lineHeight: 1.65,
          margin: 0,
          // Clip to 3 lines when collapsed; full text when hovered
          display: "-webkit-box",
          WebkitLineClamp: isHovered ? "unset" : 3,
          WebkitBoxOrient: "vertical" as const,
          overflow: isHovered ? "visible" : "hidden",
          transition: "color 0.4s ease",
        }}>
          {sub.description}
        </p>
        {/* Gradient fade mask — only shown when collapsed */}
        {!isHovered && (
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "28px",
            background: "linear-gradient(to bottom, transparent, #ffffff)",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* ── EXPANDED CONTENT — bullets + CTA, only visible on hover ── */}
      <div
        style={{
          maxHeight: isHovered ? "400px" : "0px",
          opacity: isHovered ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease",
          marginTop: isHovered ? "1.25rem" : "0",
        }}
      >
        {/* Bullets */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sub.bullets.map((b: string, bi: number) => (
            <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
              <span style={{ flexShrink: 0, marginTop: "0.45rem", width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", lineHeight: 1.4 }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href={`/en/services/orchestrate-operate/${sub.slug}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.55rem 1.1rem", borderRadius: "8px",
            background: "rgba(255,255,255,0.18)",
            color: "#ffffff",
            fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", textDecoration: "none",
            transition: "background 0.3s ease",
          }}
        >
          EXPLORE
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}


