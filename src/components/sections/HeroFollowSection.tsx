"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AIReadinessModal } from "../ui/AIReadinessModal";

const PILLARS = [
  {
    number: 1,
    accent: "#7ab8f5",
    textAccent: "#2565a3",
    label: "Build the Digital Foundation",
    tagline: "Secure. Connect. Integrate.",
    href: "/en#digital-foundation",
    services: ["Secure Edge & Devices", "Connect Systems", "Integrate Infrastructure"],
  },
  {
    number: 2,
    accent: "#8ecae6",
    textAccent: "#297291",
    label: "Activate AI-Driven Intelligence",
    tagline: "Capture. Analyze. Decide.",
    href: "/en#ai-intelligence",
    services: ["Real-Time Ingestion", "Data Discovery", "Operational Visibility"],
  },
  {
    number: 3,
    accent: "#a8d5e2",
    textAccent: "#4d9daf",
    label: "Operate and Optimize",
    tagline: "Automate. Orchestrate. Optimize.",
    href: "/en#orchestrate-operate",
    services: ["Automate Workflows", "Orchestrate Systems", "Optimize in Real Time"],
  },
];

/* ── Pillar card — horizontal rectangle ── */
function PillarCard({
  p, i, hovered, setHovered,
}: {
  p: typeof PILLARS[number];
  i: number;
  hovered: number | null;
  setHovered: (v: number | null) => void;
}) {
  const isHov = hovered === i;

  return (
    <Link href={p.href} style={{ textDecoration: "none", display: "block", width: "100%" }}>
      <div
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "1.2rem 1.6rem",
          borderRadius: "14px",
          border: `1.5px solid ${isHov ? p.accent : p.accent + "40"}`,
          borderLeft: `5px solid ${p.accent}`,
          background: isHov ? `${p.accent}0d` : "#ffffff",
          cursor: "pointer",
          transform: isHov ? "translateX(5px)" : "translateX(0)",
          transition: "transform 0.22s ease, box-shadow 0.22s ease, background 0.22s",
          boxShadow: isHov ? `0 8px 28px ${p.accent}44` : "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {/* Number badge */}
        <div
          style={{
            minWidth: "48px",
            height: "48px",
            borderRadius: "50%",
            background: `${p.accent}20`,
            border: `1.5px solid ${p.accent}60`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: p.textAccent,
            flexShrink: 0,
          }}
        >
          {p.number}
        </div>

        {/* Title + tagline */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: p.textAccent,
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            PILLAR {p.number}
          </div>
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              fontWeight: 700,
              color: "#050505",
              lineHeight: 1.3,
              margin: "0 0 0.2rem",
            }}
          >
            {p.label}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: p.textAccent,
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            {p.tagline}
          </p>
        </div>

        {/* Service chips — fills the right side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            alignItems: "flex-end",
            flexShrink: 0,
          }}
        >
          {p.services.map((s, si) => (
            <span
              key={si}
              style={{
                background: `${p.accent}14`,
                border: `1px solid ${p.accent}35`,
                color: "rgba(0,0,0,0.75)",
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "11.5px",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function HeroFollowSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        background: "#ffffff",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        minHeight: isMobile ? "auto" : "75vh",
        padding: isMobile ? "3rem 1.5rem 4rem" : "8vh 0",
      }}
    >
      {isMobile ? (
        /* ─ Mobile ─ */
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "2.4rem",
              color: "#050505",
              marginBottom: "0.75rem",
            }}
          >
            AIoT ADOPTION
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(0,0,0,0.65)",
              lineHeight: 1.65,
              marginBottom: "1.5rem",
            }}
          >
            Transform your business operations with AIoT.
          </p>
          <div style={{ marginBottom: "2.5rem" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "#050505",
                color: "#ffffff",
                padding: "0.8rem 1.5rem",
                borderRadius: "8px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
            >
              EVALUATE AI READINESS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {PILLARS.map((p, i) => (
              <PillarCard key={i} p={p} i={i} hovered={hovered} setHovered={setHovered} />
            ))}
          </div>
        </div>
      ) : (
        /* ─ Desktop: tree left · content right ─ */
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            minHeight: "75vh",
          }}
        >
          {/* Left: digital tree — fills height naturally */}
          <div
            style={{
              width: "44%",
              flexShrink: 0,
              alignSelf: "stretch",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/digital tree white.jpeg"
              alt="ARDICTECH Digital Tree — Three service pillars"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Right-edge fade */}
            <div
              style={{
                position: "absolute",
                top: 0, right: 0, bottom: 0,
                width: "18%",
                background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Right: title + description + cards */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "4rem 4vw 4rem 3vw",
            }}
          >
            {/* Title */}
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                color: "#050505",
                letterSpacing: "-0.01em",
                fontWeight: "bold",
                marginBottom: "0.75rem",
              }}
            >
              AIoT ADOPTION
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.85rem, 1.05vw, 0.95rem)",
                lineHeight: 1.7,
                color: "rgba(0,0,0,0.6)",
                maxWidth: "520px",
                marginBottom: "1.5rem",
              }}
            >
              Transform your business operations with AIoT: seamlessly connect
              devices, activate data intelligence, and continuously optimize
              manufacturing performance.
            </p>

            {/* CTA Button */}
            <div style={{ marginBottom: "2.5rem" }}>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "#050505",
                  color: "#ffffff",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "8px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                }}
              >
                EVALUATE AI READINESS
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* 3 horizontal pillar cards — stacked vertically */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.9rem",
              }}
            >
              {PILLARS.map((p, i) => (
                <PillarCard
                  key={i}
                  p={p}
                  i={i}
                  hovered={hovered}
                  setHovered={setHovered}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal Overlay */}
      <AIReadinessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
