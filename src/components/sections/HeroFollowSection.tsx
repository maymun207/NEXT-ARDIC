"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * HeroFollowSection — Image rendered at 1200×1880 intrinsic size
 *
 * width/height props tell Next.js the intended aspect ratio (1200:1880).
 * CSS width:100% makes it fill the left column responsively.
 * height:auto preserves the 1200:1880 ratio — on a 50vw ≈ 696px column
 * the rendered height ≈ 1090px ≈ ~103vh (just over 1 page tall).
 */

// Top layer → Bottom layer (image reads top-to-bottom)
const PANELS = [
  {
    accent: "#4a8fdb",
    label: "CWF",
    sublabel: "The Visible Interface",
    description: "",
  },
  {
    accent: "#00c4a0",
    label: "ArAI",
    sublabel: "Cognitive Layer & Prescriptive Intelligence",
    description: "",
  },
  {
    accent: "#c8a96e",
    label: "ArMES",
    sublabel: "Operation Control",
    description: "",
  },
  {
    accent: "#4a8fdb",
    label: "IoT-Ignite",
    sublabel: "Sensing Filaments at the Edge",
    description: "",
  },
  {
    accent: "#00c4a0",
    label: "PilarOS / AFEX",
    sublabel: "Mobile Device & Gateway Security",
    description:
      "PilarOS is a Turkish-developed industrial Android OS built on AOSP and powered by " +
      "AFEX (Advance Framework Extension) — a deep-system engine that embeds specialized hooks " +
      "directly into the Android architecture, bypassing standard user permissions to grant " +
      "administrators root-level control over devices, apps, sensors, and data connectivity. " +
      "From smartphones to industrial gateways and sensors, PilarOS delivers centralized remote " +
      "monitoring, strict encryption, and remote device wipe — giving enterprises total " +
      "sovereignty over their IIoT mobile infrastructure.",
  },
  {
    accent: "#c8a96e",
    label: "ArCloud",
    sublabel: "The Foundation Data Substrate",
    description:
      "The foundation data substrate powering the ARDICTECH ecosystem. " +
      "Geographically distributed, managed cloud infrastructure built for " +
      "large-scale industrial platform hosting at enterprise grade — secure, " +
      "resilient, and cost-effective.",
  },
];

export default function HeroFollowSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      style={{
        display: "flex",
        alignItems: "flex-start",
        background: "#000000",
        paddingTop: "8vh",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        isolation: "isolate",
      }}
    >
      {/* ── LEFT: image at 1200×1880 intrinsic ratio, fills column width ── */}
      <div
        style={{
          width: "50%",
          flexShrink: 0,
          overflow: "visible",
          position: "relative",
          /* fade top edge */
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 8%)",
        }}
      >
        {/* Wrapper: carries the shift so overlay can anchor to it */}
        <div style={{ position: "relative", width: "125%", marginLeft: "-25%" }}>
          <Image
            src="/images/Factory Tree 2 copy.jpeg"
            alt="ARDICTECH Platform — Five intelligence layers"
            width={1280}
            height={1880}
            priority
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "brightness(0.72)",
            }}
          />

          {/* Left-edge fade */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "20%",
              bottom: 0,
              width: "20%",
              background:
                "linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Right-edge fade — subtle */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "18%",
              background:
                "linear-gradient(to left, rgba(0,0,0,0.75) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/*
        RIGHT column — CSS Grid with 8 rows proportional to image zones:
          Row 1  (22fr): factory building — no label
          Row 2  (12fr): CWF
          Row 3  (12fr): ArAI
          Row 4  (12fr): ArMES
          Row 5  (11fr): IoT-Ignite
          Row 6  (10fr): PilarOS / AFEX
          Row 7  ( 9fr): ArCloud (root grid above mushrooms)
          Row 8  (12fr): mushroom zone — no label
      */}
      <div
        style={{
          width: "50%",
          height: "calc(62.5vw * 1880 / 1280)",
          display: "grid",
          gridTemplateRows: "22fr 12fr 12fr 12fr 11fr 10fr 9fr 12fr",
        }}
      >
        {/* Row 1 — factory spacer */}
        <div />

        {/* Rows 2–7 — product panels */}
        {PANELS.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => p.description && setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 4rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              position: "relative",
              cursor: p.description ? "default" : undefined,
            }}
          >
            {/* Hover card — shows for any panel with a description */}
            {p.description && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 0.75rem)",
                  left: "4rem",
                  right: "2rem",
                  background: "rgba(10,10,10,0.92)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid ${p.accent}44`,
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  opacity: hoveredIndex === i ? 1 : 0,
                  transform: hoveredIndex === i ? "translateY(0)" : "translateY(-6px)",
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    color: "#d4cfc8",
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    fontFamily: "'Inter', sans-serif",
                    margin: 0,
                  }}
                >
                  {p.description}
                </p>
              </div>
            )}

            <span
              style={{
                color: p.accent,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                marginBottom: "0.5rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              ● {p.label}
            </span>

            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.0rem, 1.6vw, 1.4rem)",
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: "0.5rem",
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              {p.sublabel}
            </h2>

            <div
              style={{
                width: "28px",
                height: "2px",
                background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                borderRadius: "2px",
              }}
            />
          </div>
        ))}

        {/* Row 8 — mushroom spacer */}
        <div />
      </div>
    </section>
  );
}
