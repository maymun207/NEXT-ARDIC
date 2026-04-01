"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * HeroFollowSection — Digital Tree image with 3 service pillars.
 * Desktop: side-by-side, pillars aligned to tree branches via CSS grid.
 * Mobile (<768px): image on top, pillar cards stacked below.
 */

const PILLARS = [
  // Top branch → Bottom branch
  {
    number: 1,
    accent: "#7ab8f5",
    textAccent: "#2565a3",
    label: "Building the Digital Foundation",
    tagline: "Secure. Connect. Integrate.",
    href: "/en#digital-foundation",
    services: ["Secure Edge & Devices", "Connect Systems & Assets", "Integrate Infrastructure"],
  },
  {
    number: 2,
    accent: "#8ecae6",
    textAccent: "#297291",
    label: "Activate AI-Driven Intelligence",
    tagline: "Collect. Analyze. Precision.",
    href: "/en#ai-intelligence",
    services: [
      "Real-Time Ingestion",
      "Data Discovery",
      "Core Processing",
      "Operational Visibility",
      "Prescriptive AI & Interfaces"
    ],
  },
  {
    number: 3,
    accent: "#a8d5e2",
    textAccent: "#4d9daf",
    label: "Orchestrate & Operate",
    tagline: "Automate. Orchestrate. Optimize.",
    href: "/en#orchestrate-operate",
    services: ["Automate Workflows", "Orchestrate Systems", "Optimize in Real Time"],
  },
];

export default function HeroFollowSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        paddingTop: isMobile ? "2vh" : "3vh",
        paddingBottom: isMobile ? "2vh" : "3vh",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        isolation: "isolate",
      }}
    >
      {/* ── Page Title ── */}
      <div 
        style={{ 
          width: isMobile ? "100%" : "50%", 
          marginLeft: isMobile ? "0" : "auto", 
          textAlign: isMobile ? "center" : "left", 
          marginBottom: "2vh", 
          padding: isMobile ? "0 2rem" : "0 2rem 0 8rem",
          position: "relative",
          zIndex: 20
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
            color: "#050505",
            letterSpacing: "-0.01em",
            fontWeight: "bold",
          }}
        >
          AIoT ADOPTION
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
      {/* ── Image column ── */}
      <div
        style={{
          width: isMobile ? "100%" : "50%",
          flexShrink: 0,
          overflow: "visible",
          position: "relative",
          marginTop: isMobile ? "0" : "-10vh", /* Pull tree UP next to the title */
          marginLeft: isMobile ? "0" : "-2vw", /* Slight left shift for scaling naturally */
          transform: isMobile ? "none" : "scale(1.2)", /* Scale up by ~20% */
          transformOrigin: "top left",
          zIndex: 0,
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 3%, black 96%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 3%, black 96%, transparent 100%)",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <Image
            src="/images/digital tree white.jpeg"
            alt="ARDICTECH Digital Tree — Three service pillars"
            width={1499}
            height={1536}
            priority
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              /* filter: brightness removed for light mode */
              /* On mobile constrain height so image doesn't dominate */
              maxHeight: isMobile ? "55vw" : undefined,
              objectFit: isMobile ? "cover" : undefined,
              objectPosition: isMobile ? "center top" : undefined,
            }}
          />
          {/* Right-edge fade — blends into the right text column */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "12%",
                background: "linear-gradient(to left, rgba(255,255,255,1) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* ── DESKTOP: right grid column ── */}
      {!isMobile && (
        <div
          style={{
            width: "50%",
            height: "calc(50vw * 1536 / 1499)",
            position: "relative",
            zIndex: 10, /* Keep text ABOVE the scaled tree and its fade layer */
            display: "grid",
            /*
              Branch centers: Pillar1=12%, Pillar2=35%, Pillar3=64% of grid height.
              Moved 10% up from measured: 22%→12%, 45%→35%, 74%→64%.
              Grid: 2fr 20fr 26fr 32fr 20fr
            */
            gridTemplateRows: "2fr 20fr 26fr 32fr 20fr",
          }}
        >
          {/* Spacer top */}
          <div />
          {PILLARS.map((p, i) => (
            <PillarRow key={i} p={p} i={i} hovered={hovered} setHovered={setHovered} desktop />
          ))}
          {/* Spacer bottom */}
          <div />
        </div>
      )}

      {/* ── MOBILE: stacked pillar cards ── */}
      {isMobile && (
        <div
          style={{
            width: "100%",
            padding: "2rem 1.5rem 3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {PILLARS.map((p, i) => (
            <PillarRow key={i} p={p} i={i} hovered={hovered} setHovered={setHovered} desktop={false} />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}

/* ─── Shared pillar row / card component ─── */
function PillarRow({
  p, i, hovered, setHovered, desktop,
}: {
  p: typeof PILLARS[number];
  i: number;
  hovered: number | null;
  setHovered: (v: number | null) => void;
  desktop: boolean;
}) {
  const isHovered = hovered === i;

  return (
    <div
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: desktop ? "8rem" : "0", /* Push the actual bounding box right */
        padding: desktop ? "0 2rem 0 0" : "1rem 1.25rem", /* Text flush with new border edge */
        borderTop: desktop ? "1px solid rgba(0,0,0,0.08)" : "none",
        borderRadius: desktop ? undefined : "12px",
        background: desktop ? undefined : "rgba(0,0,0,0.02)",
        border: desktop ? undefined : `1px solid ${p.accent}25`,
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Connecting line (desktop only) */}
      {desktop && (
        <div
          style={{
            position: "absolute",
            left: "-5.5rem", /* Reach back outside the left margin */
            top: "50%",
            width: "3.5rem",
            height: "1.5px",
            background: `linear-gradient(to right, ${p.accent}80, transparent)`,
            transform: "translateY(-50%)",
            opacity: isHovered ? 1 : 0.4,
            transition: "opacity 0.3s",
          }}
        />
      )}

      {/* Badge row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: `${p.accent}20`,
            border: `1px solid ${p.accent}50`,
            color: p.textAccent || p.accent,
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {p.number}
        </span>
        <span
          style={{
            color: p.textAccent || p.accent,
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.16em",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          PILLAR {p.number}
        </span>
      </div>

      {/* Title — clickable if href is set */}
      <Link
        href={p.href}
        style={{
          display: "inline-block",
          textDecoration: "none",
        }}
      >
        <h2
          style={{
            color: "#050505",
            fontSize: "clamp(1.4rem, 2.1vw, 1.9rem)",
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: "0.35rem",
            fontFamily: "'DM Serif Display', serif",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = p.accent; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "#050505"; }}
        >
          {p.label} →
        </h2>
      </Link>

      {/* Tagline */}
      <p
        style={{
          color: "#1c2b2b",
          fontSize: "16px",
          fontWeight: 800,
          letterSpacing: "0.04em",
          marginBottom: "0.6rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {p.tagline}
      </p>

      {/* Sub-services — always visible on mobile, hover on desktop */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          opacity: desktop ? (isHovered ? 1 : 0) : 1,
          transform: desktop ? (isHovered ? "translateY(0)" : "translateY(4px)") : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {p.services.map((s, si) => (
          <span
            key={si}
            style={{
              background: `${p.accent}12`,
              border: `1px solid ${p.accent}30`,
              color: "rgba(0,0,0,0.85)",
              borderRadius: "6px",
              padding: "2px 10px",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: "0.5rem",
          width: "28px",
          height: "2px",
          background: `linear-gradient(90deg, ${p.accent}, transparent)`,
          borderRadius: "2px",
        }}
      />
    </div>
  );
}
