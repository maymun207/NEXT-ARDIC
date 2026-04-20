"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SubServiceModal, SubServiceData } from "@/components/ui/SubServiceModal";

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
    image: "/images/PILAROS Impenetrable Edge.jpeg",
    imageFit: "contain",
    imagePadding: "1rem",
    imageBlend: false,
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
    image: "/images/modal 2.jpeg",
    imageFit: "contain",
    imagePadding: "2.5rem",
    imageBlend: false,
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
    slug: "center-of-excellence",
    title: "Integrate the Infrastructure",
    modalTitle: "ARDIC Center of Excellence (CoE)",
    tagline: "One data substrate. Total operational coherence.",
    modalTagline: "An expert engineering services division dedicated to guiding enterprise deployments through the entire AIoT lifecycle.",
    image: "/images/coe_abstract_copper.png",
    imageFit: "cover",
    imagePosition: "center",
    imagePadding: "0px",
    imageBlend: true,
    accent: "#a8d5e2",
    description:
      "Our team provides the expert oversight needed to guarantee success. We accelerate your deployments with 2X faster solution launch velocity and achieve 40% lower end-to-end development costs.",
    bullets: [
      "Strategic Consulting: Aligning AIoT with business roadmaps",
      "End-to-End Solution Development: Architecture, validation, testing",
      "Continuous Support: Post-deployment monitoring and optimization"
    ],
  },
];

export default function Pillar1Page({ standalone = false }: { standalone?: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<SubServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (sub: any) => {
    setSelectedService(sub);
    setIsModalOpen(true);
  };

  // Layout redesigned from sticky scroll to vertical grid with expanding hover cards
  return (
    <section
      id="digital-foundation"
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
          background: "#ffffff",
        }}
      >
        {/* Top: Text Content */}
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
        
      {/* Bottom: Edge-to-Edge Unobscured Image */}
      <div style={{ position: "relative", width: "100%", background: "#ffffff", height: "35vh", minHeight: "300px", maxHeight: "400px" }}>
        <Image
          src={PILLAR.image}
          alt={PILLAR.title}
          fill
          priority
          unoptimized={true}
          style={{ objectFit: "contain", objectPosition: "center", opacity: 0.85, mixBlendMode: "multiply" }}
        />
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
                    {sub.id === "secure-edge" && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                    {sub.id === "connect-systems" && <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />}
                    {sub.id === "integrate-infrastructure" && <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />}
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
                  WHAT WE DO
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

              {/* ── ASSOCIATED PRODUCTS AT BOTTOM ── */}
              {sub.buttons && sub.buttons.length > 0 && (
                <div style={{
                  marginTop: "auto",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  display: "flex", gap: "0.5rem", flexWrap: "wrap"
                }}>
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
            </div>
          );
        })}
      </div>

      <SubServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </section>
  );
}
