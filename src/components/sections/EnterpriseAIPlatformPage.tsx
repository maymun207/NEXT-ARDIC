"use client";

import { useState } from "react";
import Image from "next/image";

type TabID = "architecture" | "phasing" | "opensource";

const TAB_CONTENT = {
  architecture: {
    label: "Target Architecture",
    description: "A comprehensive look at our scalable, highly available target architecture designed to act as the cognitive core of enterprise operations.",
  },
  phasing: {
    label: "Implementation Phasing",
    description: "Strategic rollout phases ensuring continuous delivery of value without disrupting ongoing mission-critical manufacturing workflows.",
  },
  opensource: {
    label: "Open Source Strategy",
    description: "Leveraging robust open source foundations to avoid vendor lock-in, maximize scalability, and empower internal developer ecosystems.",
  },
};

export default function EnterpriseAIPlatformPage() {
  const [hoveredCard, setHoveredCard] = useState<TabID | null>(null);

  return (
    <section
      id="enterprise-ai-platform"
      style={{
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        padding: "6vh 4% 4vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* ── TOP SECTION: TEXT AND IMAGE SIDE-BY-SIDE ── */}
      <div 
        style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          justifyContent: "space-between", 
          width: "95%", 
          maxWidth: "1300px", 
          gap: "2rem", 
          marginBottom: "2rem" 
        }}
      >
        {/* LEFT: TEXT BLOCK */}
        <div style={{ flex: "1 1 40%", minWidth: "320px", display: "flex", flexDirection: "column" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.8rem)",
              fontWeight: 800,
              color: "#202a30", // Dark slate color from screenshot
              fontFamily: "'Inter', sans-serif",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
              letterSpacing: "-0.01em"
            }}
          >
            Enterprise<br />
            AI Platform
          </h2>
          <p
            style={{
              color: "#505c65", // Slightly lighter gray-blue
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 500,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            The Physics of AI at Scale:<br />
            Architecture, Economics,<br />
            and the Human Mandate
          </p>
        </div>

        {/* RIGHT: IMAGE */}
        <div
          style={{
            flex: "1 1 50%",
            minWidth: "350px",
            position: "relative",
            height: "55vh",
            minHeight: "400px",
            maxHeight: "700px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Image
            src="/images/A-AI.jpeg"
            alt="Enterprise AI Platform Architecture"
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "center right", mixBlendMode: "multiply" }}
          />
        </div>
      </div>

        {/* ── HOVER CTA CARDS ── */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-end", // Changed to flex-end to expand upwards
            marginTop: "-1rem", // Pulled up slightly over the image bounds 
            zIndex: 10,
            position: "relative",
            padding: "0 1rem",
            width: "100%",
          }}
        >
          {(Object.keys(TAB_CONTENT) as TabID[]).map((tabId) => {
            const isHovered = hoveredCard === tabId;
            return (
              <div
                key={tabId}
                onMouseEnter={() => setHoveredCard(tabId)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: isHovered 
                    ? "linear-gradient(135deg, rgba(82, 219, 255, 0.4), rgba(10, 185, 230, 0.2))"
                    : "linear-gradient(135deg, rgba(230, 245, 250, 0.8), rgba(200, 235, 245, 0.6))",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isHovered 
                    ? "1px solid rgba(82, 219, 255, 0.6)"
                    : "1px solid rgba(255, 255, 255, 0.9)",
                  borderRadius: isHovered ? "20px" : "999px",
                  padding: isHovered ? "1.5rem 2rem" : "0.8rem 2.8rem",
                  width: "100%",
                  maxWidth: "340px",
                  color: isHovered ? "#04566b" : "#1c2b2b",
                  cursor: "pointer",
                  boxShadow: isHovered 
                    ? "0 12px 32px rgba(10, 185, 230, 0.25), inset 0 2px 4px rgba(255,255,255,0.7)"
                    : "0 8px 24px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255,255,255,1)",
                  transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  overflow: "visible", // Allow metallic caps to spill out slightly
                }}
              >
                {/* ── LEFT METALLIC CAP ── */}
                <div
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: isHovered ? "1.7rem" : "50%",
                    transform: isHovered ? "translateY(-50%)" : "translateY(-50%)",
                    width: "12px",
                    height: isHovered ? "40px" : "65%",
                    background: "linear-gradient(to bottom, #f0f0f0, #a0a5aa, #80858a, #d0d5d8)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: "10px 4px 4px 10px",
                    boxShadow: "inset 1px 0px 2px rgba(255,255,255,0.8), 2px 0 4px rgba(0,0,0,0.15)",
                    transition: "all 0.4s ease",
                    opacity: isHovered ? 1 : 0.8,
                  }}
                />

                <span style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "0.02em", whiteSpace: "nowrap", transition: "all 0.4s ease" }}>
                  {TAB_CONTENT[tabId].label}
                </span>

                {/* ── EXPANDABLE DESCRIPTION ── */}
                <div 
                  style={{
                    maxHeight: isHovered ? "150px" : "0px",
                    opacity: isHovered ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    marginTop: isHovered ? "1rem" : "0",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "#1c2b2b", margin: 0, fontWeight: 500 }}>
                    {TAB_CONTENT[tabId].description}
                  </p>
                </div>

                {/* ── RIGHT METALLIC CAP ── */}
                <div
                  style={{
                    position: "absolute",
                    right: "-4px",
                    top: isHovered ? "1.7rem" : "50%",
                    transform: isHovered ? "translateY(-50%)" : "translateY(-50%)",
                    width: "12px",
                    height: isHovered ? "40px" : "65%",
                    background: "linear-gradient(to bottom, #f0f0f0, #a0a5aa, #80858a, #d0d5d8)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: "4px 10px 10px 4px",
                    boxShadow: "inset -1px 0px 2px rgba(255,255,255,0.8), -2px 0 4px rgba(0,0,0,0.15)",
                    transition: "all 0.4s ease",
                    opacity: isHovered ? 1 : 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>
    </section>
  );
}
