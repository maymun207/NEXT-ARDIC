"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PILLAR = {
  number: 1,
  title: "Building the\nDigital Foundation",
  tagline: "Secure. Connect. Integrate.",
  accent: "#7ab8f5",
  textAccent: "#2565a3",
  image: "/images/BuildingF.jpeg",
};

const SUB_SERVICES = [
  {
    id: "secure-edge",
    slug: "secure-edge",
    title: "Secure Edge & Devices",
    tagline: "Trust starts at the physical boundary.",
    image: "/images/pilaros image .jpeg",
    accent: "#7ab8f5",
    description:
      "Every intelligent operation begins at the edge. We secure every endpoint — from industrial gateways to mobile devices — with PilarOS and AFEX, an industrial Android OS with deep-system security hooks that give enterprises root-level control over the edge devices, gateways and mobile devices.",
    bullets: [
      "PilarOS & AFEX: domestic industrial Android with AFEX security engine",
      "Remote monitoring, encryption, and device wipe across all endpoints",
      "Mobile Device Management (MDM)",
      "Complete operational visibility and traceability",
    ],
    buttons: ["PILAROS & AFEX", "MODIVERSE"],
  },
  {
    id: "connect-systems",
    slug: "connect-systems",
    title: "Connect Systems & Assets",
    tagline: "Bridge every machine, protocol, and data stream.",
    image: "/images/ConnectS.jpeg",
    accent: "#8ecae6",
    description:
      "Isolated machines produce isolated insights. We connect every asset — OT, IT, and everything in between — using IoT-Ignite's protocol-agnostic edge computing layer. Whether it's a PLC, SCADA, MQTT sensor, or cloud API, all data flows into a single, unified intelligence stream.",
    bullets: [
      "IoT-Ignite: PaaS platform with smart edge computing",
      "Protocol-agnostic: MQTT, OPC-UA, Modbus, REST, and custom",
      "Scalable overlay network across plant, field, and cloud",
      "Plug-and-play edge deployments with zero coding",
    ],
    buttons: ["IOT-IGNITE", "ARCLOUD"],
  },
  {
    id: "integrate-infrastructure",
    slug: "integrate-infrastructure",
    title: "Integrate the Infrastructure",
    tagline: "One data substrate. Total operational coherence.",
    image: "/images/Integrate Infrasturture.jpeg",
    accent: "#a8d5e2",
    description:
      "Data without a home is noise. ArCloud provides the geographically distributed, enterprise-grade managed infrastructure that underpins the entire ARDICTECH ecosystem — giving you a secure, resilient, and cost-effective foundation to host your industrial intelligence platform at any scale.",
    bullets: [
      "ArCloud: managed cloud infrastructure, enterprise grade",
      "Geographically distributed for resilience and compliance",
      "Secure, cost-effective large-scale platform hosting",
      "Seamless integration with ArMES, IoT-Ignite, and ArAI",
    ],
  },
];

export default function Pillar1Page({ standalone = false }: { standalone?: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Layout redesigned from sticky scroll to vertical grid with expanding hover cards
  return (
    <section
      id="digital-foundation"
      style={{
        position: "relative",
        zIndex: 10,
        background: "#fdfdfd", // Slight off-white to make the cards pop
        fontFamily: "'Inter', sans-serif",
        paddingBottom: "10vh",
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
          padding: "5% 5% 0",
          background: "#ffffff",
          gap: "3rem"
        }}
      >
        {/* Top: Text Content */}
        <div style={{ maxWidth: "800px", marginTop: standalone ? "4rem" : "0" }}>
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
        
        {/* Bottom: Unobscured Image */}
        <div style={{ position: "relative", minHeight: "450px", width: "100%", maxWidth: "1200px" }}>
          <Image
            src={PILLAR.image}
            alt={PILLAR.title}
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "center", transform: "scale(0.95)" }}
          />
        </div>
      </div>

      {/* ── VERTICAL HOVER CARDS (GRID) ── */}
      <div style={{
        maxWidth: "1400px", 
        margin: "0 auto", 
        padding: "0 2rem",
        position: "relative", 
        zIndex: 20, 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.5rem", 
        alignItems: "stretch"
      }}>
        {SUB_SERVICES.map((sub) => {
          const isHovered = hoveredCard === sub.id;
          return (
            <div
              key={sub.id}
              onMouseEnter={() => setHoveredCard(sub.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                padding: "2.5rem 2rem",
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
              {/* Top Accent Icon/Header */}
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: isHovered ? sub.accent : `${sub.accent}15`, 
                color: isHovered ? "#fff" : sub.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.5rem", transition: "all 0.4s ease"
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {sub.id === "secure-edge" && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {sub.id === "connect-systems" && <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />}
                  {sub.id === "integrate-infrastructure" && <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />}
                </svg>
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
                  <p style={{ color: "rgba(0,0,0,0.65)", fontSize: "14px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {sub.description}
                  </p>
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
                </div>
              </div>

              {/* ── CTAs ALWAYS VISIBLE AT BOTTOM ── */}
              <div style={{
                marginTop: "auto",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}>
                {/* Associated Products Tags */}
                {sub.buttons && sub.buttons.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                    {sub.buttons.map((btnText: string) => (
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
                
                {/* WHAT WE DO Navigation Button */}
                <Link
                  href={`/en/services/building-foundation/${sub.slug}`}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1rem 1.5rem", 
                    background: isHovered ? sub.accent : `rgba(0,0,0,0.02)`,
                    border: `1px solid ${isHovered ? sub.accent : `rgba(0,0,0,0.06)`}`,
                    borderRadius: "10px", 
                    color: isHovered ? "#fff" : "rgba(0,0,0,0.7)",
                    fontSize: "12px", fontWeight: 800, letterSpacing: "0.15em", textDecoration: "none",
                    transition: "all 0.4s ease", width: "100%",
                    boxShadow: isHovered ? `0 8px 16px ${sub.accent}40` : "none"
                  }}
                >
                  WHAT WE DO
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
