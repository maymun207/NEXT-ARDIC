"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PILLAR = {
  number: 1,
  title: "Building the\nDigital Foundation",
  tagline: "Secure. Connect. Integrate.",
  accent: "#7ab8f5",
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
      "Protocol-agnostic edge gateway security",
    ],
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
      "Real-time asset telemetry at industrial scale",
    ],
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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#000",
        fontFamily: "'Inter', sans-serif",
        paddingTop: standalone ? "4rem" : undefined, /* header clearance on standalone page only */
      }}
    >
      {/* ── LEFT: Sticky sidebar ─────────────────────────────────────────── */}
      <div
        style={{
          width: "42%",
          flexShrink: 0,
          position: "sticky",
          top: "4rem",           /* align to bottom of fixed header */
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
              "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.40) 60%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Right fade into main content */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "25%",
            background: "linear-gradient(to left, rgba(0,0,0,0.85) 0%, transparent 100%)",
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
                padding: "0.3rem 0.9rem",
                color: PILLAR.accent,
                fontSize: "11px",
                fontWeight: 700,
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
                color: "#ffffff",
                lineHeight: 1.2,
                fontFamily: "'DM Serif Display', serif",
                whiteSpace: "pre-line",
                marginBottom: "1rem",
              }}
            >
              {PILLAR.title}
            </h1>
            <p style={{ color: PILLAR.accent, fontSize: "14px", fontWeight: 600, letterSpacing: "0.08em" }}>
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
                      background: activeIndex === i ? s.accent : "rgba(255,255,255,0.3)",
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                      boxShadow: activeIndex === i ? `0 0 8px ${s.accent}80` : "none",
                    }}
                  />
                  <span
                    style={{
                      color: activeIndex === i ? "#ffffff" : "rgba(255,255,255,0.45)",
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
          </div>

          {/* Bottom: progress bar */}
          <div>
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "rgba(255,255,255,0.12)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((activeIndex + 1) / SUB_SERVICES.length) * 100}%`,
                  background: `linear-gradient(90deg, ${PILLAR.accent}, ${SUB_SERVICES[activeIndex].accent})`,
                  borderRadius: "2px",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginTop: "0.6rem" }}>
              {activeIndex + 1} / {SUB_SERVICES.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Scrolling sub-service sections ────────────────────────── */}
      <div style={{ flex: 1 }}>
        {SUB_SERVICES.map((sub, i) => (
          <section
            key={sub.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            style={{
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >


            {/* Text content */}
            <div
              style={{
                flex: 1,
                padding: "2.5rem 3.5rem 3rem",
                background: "#000",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "'DM Serif Display', serif",
                  lineHeight: 1.25,
                  marginBottom: "0.5rem",
                }}
              >
                {sub.title}
              </h2>
              <p
                style={{
                  color: sub.accent,
                  fontSize: "13.5px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: "1.5rem",
                }}
              >
                {sub.tagline}
              </p>

              <div
                style={{
                  width: "36px",
                  height: "2px",
                  background: `linear-gradient(90deg, ${sub.accent}, transparent)`,
                  borderRadius: "2px",
                  marginBottom: "1.5rem",
                }}
              />

              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: "600px",
                }}
              >
                {sub.description}
              </p>

              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {sub.bullets.map((b, bi) => (
                  <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span
                      style={{
                        flexShrink: 0,
                        marginTop: "0.3rem",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: sub.accent,
                        boxShadow: `0 0 6px ${sub.accent}80`,
                      }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.6 }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* ── WHAT WE DO CTA + hover preview ── */}
              <div
                style={{ position: "relative", display: "inline-block", marginTop: "2rem" }}
                onMouseLeave={() => setHoveredCTA(null)}
              >
                {/* Hover preview card */}
                {hoveredCTA === sub.id && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 12px)",
                      left: 0,
                      width: "320px",
                      background: "rgba(10,12,18,0.97)",
                      border: `1px solid ${sub.accent}35`,
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxShadow: `0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px ${sub.accent}15`,
                      animation: "fadeSlideUp 0.2s ease",
                      zIndex: 50,
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {/* Thumbnail image */}
                    <div style={{ position: "relative", height: "150px" }}>
                      <Image
                        src={sub.image}
                        alt={sub.title}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                      <div
                        style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(10,12,18,0.85) 100%)",
                        }}
                      />
                      <div style={{ position: "absolute", bottom: "0.75rem", left: "1rem" }}>
                        <p style={{ color: sub.accent, fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em" }}>
                          {sub.tagline}
                        </p>
                      </div>
                    </div>
                    {/* Preview content */}
                    <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                      <p style={{ color: "#fff", fontWeight: 600, fontSize: "13px", marginBottom: "0.75rem", fontFamily: "'DM Serif Display', serif" }}>
                        {sub.title}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        {sub.bullets.slice(0, 2).map((b, bi) => (
                          <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                            <span style={{ flexShrink: 0, marginTop: "0.35rem", width: "5px", height: "5px", borderRadius: "50%", background: sub.accent }} />
                            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", lineHeight: 1.5 }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p style={{ color: sub.accent, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", marginTop: "0.85rem" }}>
                        Click to explore →
                      </p>
                    </div>
                  </div>
                )}

                {/* The actual CTA link */}
                <Link
                  href={`/en/services/building-foundation/${sub.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.75rem 1.75rem",
                    background: `${sub.accent}14`,
                    border: `1px solid ${sub.accent}50`,
                    borderRadius: "8px",
                    color: sub.accent,
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    setHoveredCTA(sub.id);
                    (e.currentTarget as HTMLAnchorElement).style.background = `${sub.accent}24`;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 16px ${sub.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${sub.accent}14`;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  WHAT WE DO
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
