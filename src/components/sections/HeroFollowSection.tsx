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
    label: "Building the Digital Foundation",
    tagline: "Secure. Connect. Integrate.",
    href: "/en/services/building-foundation",
    services: ["Secure Edge & Devices", "Connect Systems & Assets", "Integrate Infrastructure"],
  },
  {
    number: 2,
    accent: "#8ecae6",
    label: "Activate AI-Driven Intelligence",
    tagline: "Collect. Analyze. Precision.",
    href: "/en/services/ai-intelligence",
    services: ["Capture Real-Time Data", "Gain Operational Visibility", "Apply AI Insights"],
  },
  {
    number: 3,
    accent: "#a8d5e2",
    label: "Orchestrate & Operate",
    tagline: "Automate. Orchestrate. Optimize.",
    href: "/en/services/orchestrate-operate",
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
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        background: "#000000",
        paddingTop: isMobile ? "4vh" : "8vh",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        isolation: "isolate",
      }}
    >
      {/* ── Image column ── */}
      <div
        style={{
          width: isMobile ? "100%" : "50%",
          flexShrink: 0,
          overflow: "visible",
          position: "relative",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 82%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 82%, transparent 100%)",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <Image
            src="/images/digital tree.jpeg"
            alt="ARDICTECH Digital Tree — Three service pillars"
            width={1499}
            height={1536}
            priority
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "brightness(0.82)",
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
                background: "linear-gradient(to left, rgba(0,0,0,0.7) 0%, transparent 100%)",
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
            height: "calc(62.5vw * 1536 / 1499)",
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
        padding: desktop ? "0 4rem" : "1rem 1.25rem",
        borderTop: desktop ? "1px solid rgba(255,255,255,0.06)" : "none",
        borderRadius: desktop ? undefined : "12px",
        background: desktop ? undefined : "rgba(255,255,255,0.04)",
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
            left: 0,
            top: "50%",
            width: "2.5rem",
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
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: `${p.accent}20`,
            border: `1px solid ${p.accent}50`,
            color: p.accent,
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {p.number}
        </span>
        <span
          style={{
            color: p.accent,
            fontSize: "13px",
            fontWeight: 700,
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
            color: "#ffffff",
            fontSize: "clamp(1.4rem, 2.1vw, 1.9rem)",
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: "0.35rem",
            fontFamily: "'DM Serif Display', serif",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = p.accent; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "#ffffff"; }}
        >
          {p.label} →
        </h2>
      </Link>

      {/* Tagline */}
      <p
        style={{
          color: p.accent,
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.06em",
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
              color: "rgba(255,255,255,0.75)",
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
