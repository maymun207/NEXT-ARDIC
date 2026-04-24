"use client";

import { useState } from "react";
import Image from "next/image";

type TabID = "l1-3" | "l4-6" | "l7-9";

const LAYER_GROUPS = {
  "l1-3": {
    title: "Layers 1–3: Governing the Data Foundation",
    subtitle: "The bedrock. Clean, governed data is the prerequisite for trustworthy AI inference.",
    image: "/images/L1.jpeg",
    color: "#0e7490",
    layers: [
      { name: "L3: Vector & Search", desc: "The translation layer. Converts structured and unstructured enterprise data into vector embeddings for reasoning engines to query." },
      { name: "L2: Data Storage & Lakehouse", desc: "The open-format vault. Utilizes Apache Iceberg to prevent format lock-in and ensure rapid retrieval." },
      { name: "L1: Data Ingestion & Governance", desc: "The foundation. Enforces strict data contracts from source systems. Insight: AI built on bad data is dangerous." },
    ],
  },
  "l4-6": {
    title: "Layers 4–6: Routing, Reasoning & Automation",
    subtitle: "Where intelligence is orchestrated, governed, and set into motion.",
    image: "/images/L4.jpeg",
    color: "#7c3aed",
    layers: [
      { name: "L6: Workflow & Automation", desc: "Stateful, versionable code ensuring durable, long-running process resilience." },
      { name: "L5: Agent Orchestration", desc: "Powered by LangGraph. Every deployed agent operates under a dedicated Entra Workload ID with scoped permissions—never inherited user credentials." },
      { name: "L4: AI / ML Core", desc: "Self-hosted inference (vLLM) and unified routing proxies (LiteLLM) to strictly control costs. Retains frontier models purely as a fallback tier." },
    ],
  },
  "l7-9": {
    title: "Layers 7–9: Seamless Experience & Ultimate Control",
    subtitle: "What users see and what security teams trust — governed end-to-end.",
    image: "/images/L7.jpeg",
    color: "#b45309",
    layers: [
      { name: "L9: Security & Trust", desc: "The North–South ultimate control plane. Features declarative policy (OPA), I/O validation (Guardrails AI), and OSS PII detection (Presidio)." },
      { name: "L8: UI & Experience", desc: "Native enterprise integration (e.g., Teams bots). Aligns with existing user habits rather than fighting them." },
      { name: "L7: Reporting & Analytics", desc: "OSS self-serve metrics and operational observability (Grafana/ClickHouse)." },
    ],
  },
};

export default function DigitalConsciousnessPage() {
  const [activeTab, setActiveTab] = useState<TabID>("l1-3");

  return (
    <section
      style={{
        background: "#f1f1f3",
        fontFamily: "'Inter', sans-serif",
        padding: "10vh 4%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ width: "92%", maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 4vw, 4rem)",
            fontWeight: 700,
            color: "#050505",
            fontFamily: "'DM Serif Display', serif",
            marginBottom: "1.5rem",
            lineHeight: 1.1
          }}
        >
          THE DIGITAL CONSCIOUSNESS <br />
          OF THE FACTORY
        </h2>
        <p style={{
          fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
          color: "#666",
          maxWidth: "800px",
          margin: "0 auto 4rem auto",
          lineHeight: 1.6
        }}>
          Unifying data, machines, and human expertise into a single, intelligent nervous system.
        </p>

        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <Image
            src="/images/9Layers.jpeg"
            alt="9 Layers of Digital Consciousness"
            width={1400}
            height={800}
            priority
            unoptimized={true}
            style={{ 
              width: "100%", 
              height: "auto"
            }}
          />
        </div>

        {/* ── INTERACTIVE LAYER DETAILS ── */}
        <div style={{ marginTop: "5rem", width: "100%", textAlign: "left" }}>
          {/* Tabs - Segmented Control UI */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#0ab9e6", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Explore Architecture Details
            </p>
            <div style={{
              display: "inline-flex",
              background: "#f1f5f9",
              padding: "6px",
              borderRadius: "999px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
              gap: "4px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              {(Object.keys(LAYER_GROUPS) as TabID[]).map((tabId) => {
                const group = LAYER_GROUPS[tabId];
                const isActive = activeTab === tabId;
                return (
                  <button
                    key={tabId}
                    onClick={() => setActiveTab(tabId)}
                    style={{
                      padding: "0.85rem 2rem",
                      background: isActive ? "#ffffff" : "transparent",
                      border: "none",
                      borderRadius: "999px",
                      color: isActive ? group.color : "#64748b",
                      fontWeight: isActive ? 800 : 600,
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      letterSpacing: "0.02em",
                      boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#0f172a";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#64748b";
                    }}
                  >
                    {isActive && (
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: group.color, flexShrink: 0 }} />
                    )}
                    {tabId === "l1-3" ? "Layers 1-3" : tabId === "l4-6" ? "Layers 4-6" : "Layers 7-9"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Content */}
          <div style={{ maxWidth: "920px", margin: "0 auto", display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "center" }}>
            {/* Left: Image */}
            <div style={{ flex: "1 1 45%", minWidth: "300px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: "100%", height: "max-content" }}>
                <Image
                  src={LAYER_GROUPS[activeTab].image}
                  alt={LAYER_GROUPS[activeTab].title}
                  width={800}
                  height={500}
                  unoptimized
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    mixBlendMode: "darken"
                  }}
                />
                {/* Edge fade to hide sharp cuts on all sides for all images */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: `
                    linear-gradient(to top, #f1f1f3 0%, transparent 15%),
                    linear-gradient(to bottom, #f1f1f3 0%, transparent 15%),
                    linear-gradient(to left, #f1f1f3 0%, transparent 10%),
                    linear-gradient(to right, #f1f1f3 0%, transparent 10%)
                  `
                }}></div>
              </div>
            </div>

            {/* Right: Layer Cards */}
            <div style={{ flex: "1 1 40%", minWidth: "300px", maxWidth: "520px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ marginBottom: "0.25rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.3rem" }}>
                  {LAYER_GROUPS[activeTab].title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, margin: 0 }}>
                  {LAYER_GROUPS[activeTab].subtitle}
                </p>
              </div>

              {LAYER_GROUPS[activeTab].layers.map((layer) => (
                <div
                  key={layer.name}
                  style={{
                    padding: "1rem 1.25rem",
                    background: `linear-gradient(135deg, #ffffff, ${LAYER_GROUPS[activeTab].color}05)`,
                    border: `1px solid ${LAYER_GROUPS[activeTab].color}20`,
                    borderLeft: `4px solid ${LAYER_GROUPS[activeTab].color}`,
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                    transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.03)";
                  }}
                >
                  <h4 style={{ fontSize: "14px", fontWeight: 800, color: LAYER_GROUPS[activeTab].color, marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {layer.name.split(":")[0]}
                    <span style={{ color: "#0f172a" }}>{layer.name.replace(/^L\d+:\s*/, "")}</span>
                  </h4>
                  <p style={{ fontSize: "13px", color: "#334155", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                    {layer.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
