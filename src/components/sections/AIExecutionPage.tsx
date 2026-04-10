"use client";

import { useState } from "react";
import Image from "next/image";

const OVERLAYS = [
  {
    id: "architecture",
    title: "The Technical Architecture",
    description: "Deploying governed, composable, and sovereign platforms that outlast vendor hype.",
    color: "#0284c7",
    desktopStyle: { top: "38%", left: "-8%", width: "230px" },
  },
  {
    id: "impact",
    title: "The Human Impact",
    description: "Managing AI anxiety and preserving the psychological contract through explainability and human-in-the-loop design.",
    color: "#b45309",
    desktopStyle: { top: "5%", right: "12%", width: "250px" },
  },
  {
    id: "economic",
    title: "The Economic Reality",
    description: "Controlling hidden integration costs, optimizing hybrid hardware, and ensuring ROI at every deployment phase.",
    color: "#475569",
    desktopStyle: { bottom: "12%", right: "5%", width: "240px" },
  },
];

const STATS = [
  {
    value: "85%",
    text: "of organizations misestimate AI project costs by more than 10%.",
  },
  {
    value: "6x",
    text: "Organizations investing in structured change management (ADKAR) are six times more likely to achieve adoption goals.",
  },
  {
    value: "2-3x",
    text: "The implementation premium required to integrate AI into complex legacy systems.",
  },
  {
    value: "0",
    text: "The number of AI initiatives that succeed without visible, sustained executive sponsorship.",
  },
];

// ── LCOAI Modal Panel (fixed center-screen) ─────────────────────────────────
function LCOAIPanel({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.35)",
          backdropFilter: "blur(4px)",
          zIndex: 998,
        }}
      />
      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(720px, 92vw)",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "linear-gradient(135deg, rgba(248,252,255,0.98), rgba(230,244,252,0.97))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(14,165,233,0.25)",
          borderRadius: "20px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
          padding: "2rem",
          zIndex: 999,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#0284c7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Title */}
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem", lineHeight: 1.2, paddingRight: "2rem" }}>
          Standardizing Economics: The Leveled Cost of AI (LCOAI)
        </h3>
        <p style={{ fontSize: "13px", color: "#475569", marginBottom: "1.5rem", lineHeight: 1.5 }}>
          To objectively compare API-based vendor usage versus self-hosted models, we utilize{" "}
          <strong>LCOAI</strong>—a standardized metric adapted from the energy sector (LCOE).
        </p>

        {/* LCOAI Image */}
        <div style={{ width: "100%", borderRadius: "14px", overflow: "hidden", marginBottom: "1.5rem" }}>
          <img
            src="/images/LCOAI.jpeg"
            alt="Standardizing Economics: The Leveled Cost of AI (LCOAI)"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              mixBlendMode: "multiply",
              borderRadius: "14px",
            }}
          />
        </div>

        {/* Hybrid Infrastructure note */}
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "rgba(241,245,249,0.8)",
            border: "1.5px solid rgba(148,163,184,0.3)",
            borderRadius: "14px",
            borderLeft: "4px solid #0ea5e9",
          }}
        >
          <h4 style={{ fontSize: "13.5px", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem", lineHeight: 1.3 }}>
            Hybrid Infrastructure Optimization:
          </h4>
          <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.55, margin: 0 }}>
            We optimize LCOAI by balancing public cloud elasticity (for variable training/bursts) with on-premises consistency.
          </p>
        </div>
      </div>
    </>
  );
}

// ── Human Impact Modal (ADKAR Staircase) ──────────────────────────────
const ADKAR_STEPS = [
  { label: "Awareness",     height: 48  },
  { label: "Desire",        height: 72  },
  { label: "Knowledge",     height: 100 },
  { label: "Ability",       height: 130 },
  { label: "Reinforcement", height: 160 },
];

function HumanImpactPanel({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.35)",
          backdropFilter: "blur(4px)",
          zIndex: 998,
        }}
      />
      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(700px, 92vw)",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "linear-gradient(135deg, rgba(248,252,255,0.98), rgba(230,244,252,0.97))",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(14,165,233,0.25)",
          borderRadius: "20px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
          padding: "2rem",
          zIndex: 999,
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)",
            borderRadius: "50%", width: "28px", height: "28px",
            cursor: "pointer", fontSize: "16px", color: "#0284c7",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ×
        </button>

        {/* Title */}
        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.4rem", lineHeight: 1.2, paddingRight: "2rem" }}>
          The Organization Mandate: AI is Behavioral Change
        </h3>
        <p style={{ fontSize: "13px", color: "#475569", marginBottom: "1.75rem", lineHeight: 1.6, textAlign: "center" }}>
          When AI-driven change is frequent and continuous, traditional OCM approaches fall short.
          Adopting AI is not a software installation; it is a fundamental behavioral shift.
        </p>

        {/* ADKAR Image */}
        <div style={{ position: "relative", width: "100%", borderRadius: "14px", overflow: "hidden", marginBottom: "1.5rem" }}>
          <img
            src="/images/ADKAR.jpeg"
            alt="The Organization Mandate: AI is Behavioral Change — ADKAR Framework"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              mixBlendMode: "multiply",
              borderRadius: "14px",
            }}
          />
        </div>

        {/* ADKAR Imperative box */}
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "linear-gradient(135deg, rgba(226,240,253,0.6), rgba(241,250,255,0.8))",
            border: "1.5px solid rgba(14,165,233,0.3)",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(14,165,233,0.08)",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", marginBottom: "0.6rem" }}>
            The ADKAR Imperative:
          </h4>
          <p style={{ fontSize: "12.5px", color: "#334155", lineHeight: 1.6, margin: 0 }}>
            Organizations fail when they <strong>jump straight to &ldquo;Knowledge&rdquo;</strong> (software training) without first
            building &ldquo;Awareness&rdquo; and &ldquo;Desire.&rdquo; Our deployment framework embeds continuous learning
            directly into everyday workflows, ensuring technological adoption matches human readiness.
          </p>
        </div>
      </div>
    </>
  );
}

// ── Tech Architecture Modal (4-tab) ──────────────────────────────────────────
const TECH_TABS = [
  { id: "overview", label: "Overview" },
  { id: "l1-3",    label: "L1–3: Data Foundation" },
  { id: "l4-6",    label: "L4–6: Intelligence Core" },
  { id: "l7-9",    label: "L7–9: Experience & Control" },
] as const;
type TechTab = typeof TECH_TABS[number]["id"];

const ALL_LAYERS = [
  "L9: Security & Trust (APIM, Guardrails, OPA)",
  "L8: UI & Experience",
  "L7: Reporting & Analytics",
  "L6: Workflow & Automation",
  "L5: Agent Orchestration",
  "L4: AI / ML Core",
  "L3: Vector & Search",
  "L2: Data Storage & Lakehouse",
  "L1: Data Ingestion & Governance",
];

const LAYER_GROUPS: Record<string, { title: string; subtitle: string; layers: { name: string; desc: string }[] }> = {
  "l1-3": {
    title: "Layers 1–3: Governing the Data Foundation",
    subtitle: "The bedrock. Clean, governed data is the prerequisite for trustworthy AI inference.",
    layers: [
      { name: "L3: Vector & Search",           desc: "The translation layer. Converts structured and unstructured enterprise data into vector embeddings for reasoning engines to query." },
      { name: "L2: Data Storage & Lakehouse",  desc: "The open-format vault. Utilizes Apache Iceberg to prevent format lock-in and ensure rapid retrieval." },
      { name: "L1: Data Ingestion & Governance", desc: "The foundation. Enforces strict data contracts from source systems. Insight: AI built on bad data is dangerous." },
    ],
  },
  "l4-6": {
    title: "Layers 4–6: Routing, Reasoning & Automation",
    subtitle: "Where intelligence is orchestrated, governed, and set into motion.",
    layers: [
      { name: "L6: Workflow & Automation",   desc: "Stateful, versionable code ensuring durable, long-running process resilience." },
      { name: "L5: Agent Orchestration",     desc: "Powered by LangGraph. Every deployed agent operates under a dedicated Entra Workload ID with scoped permissions—never inherited user credentials." },
      { name: "L4: AI / ML Core",            desc: "Self-hosted inference (vLLM) and unified routing proxies (LiteLLM) to strictly control costs. Retains frontier models purely as a fallback tier." },
    ],
  },
  "l7-9": {
    title: "Layers 7–9: Seamless Experience & Ultimate Control",
    subtitle: "What users see and what security teams trust — governed end-to-end.",
    layers: [
      { name: "L9: Security & Trust (The Spine)", desc: "The North–South ultimate control plane. Features declarative policy (OPA), I/O validation (Guardrails AI), and OSS PII detection (Presidio)." },
      { name: "L8: UI & Experience",              desc: "Native enterprise integration (e.g., Teams bots). Aligns with existing user habits rather than fighting them." },
      { name: "L7: Reporting & Analytics",        desc: "OSS self-serve metrics and operational observability (Grafana/ClickHouse)." },
    ],
  },
};

const TAB_ACCENT_COLORS: Record<TechTab, string> = {
  "overview": "#0284c7",
  "l1-3":    "#0e7490",
  "l4-6":    "#7c3aed",
  "l7-9":    "#b45309",
};

function TechArchPanel({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<TechTab>("overview");
  const accent = TAB_ACCENT_COLORS[activeTab];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(6px)", zIndex: 998 }}
      />
      {/* Modal */}
      <div
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(960px, 95vw)", maxHeight: "88vh",
          display: "flex", flexDirection: "column",
          background: "linear-gradient(145deg, rgba(248,252,255,0.99), rgba(228,244,255,0.97))",
          backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(14,165,233,0.2)", borderRadius: "22px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
          zIndex: 999, overflow: "hidden",
        }}
      >
        {/* ── Header bar ── */}
        <div style={{ padding: "1.5rem 2rem 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.2, margin: 0 }}>
                A Composable, Sovereign Enterprise Platform
              </h3>
              <p style={{ fontSize: "12.5px", color: "#64748b", marginTop: "0.4rem", lineHeight: 1.5 }}>
                Every single layer remains independently replaceable. Format lock-in is defeated, hallucinations are engineered out, and inference costs are scaled efficiently.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                flexShrink: 0, marginLeft: "1rem",
                background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)",
                borderRadius: "50%", width: "30px", height: "30px",
                cursor: "pointer", fontSize: "18px", color: "#0284c7",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >×</button>
          </div>

          {/* ── Tab bar ── */}
          <div style={{ display: "flex", gap: "0.5rem", borderBottom: "2px solid rgba(14,165,233,0.12)", paddingBottom: "0" }}>
            {TECH_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const tabAccent = TAB_ACCENT_COLORS[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.6rem 1.1rem",
                    background: isActive ? `${tabAccent}18` : "transparent",
                    border: "none",
                    borderBottom: isActive ? `3px solid ${tabAccent}` : "3px solid transparent",
                    borderRadius: "8px 8px 0 0",
                    color: isActive ? tabAccent : "#64748b",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab content (scrollable) ── */}
        <div style={{ overflowY: "auto", padding: "1.5rem 2rem 2rem", flex: 1 }}>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              {/* Left: layer stack list */}
              <div style={{ flex: "1 1 55%", minWidth: "260px" }}>
                <p style={{ fontSize: "13px", color: "#475569", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                  Nine independently swappable layers from data ingestion to security — built on open standards so no single vendor can hold your stack hostage.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {ALL_LAYERS.map((layer, i) => {
                    const layerNum = 9 - i;
                    const colors = ["#b45309", "#b45309", "#b45309", "#7c3aed", "#7c3aed", "#7c3aed", "#0e7490", "#0e7490", "#0e7490"];
                    return (
                      <div
                        key={layer}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.75rem",
                          padding: "0.55rem 0.9rem",
                          background: `${colors[i]}10`,
                          border: `1px solid ${colors[i]}30`,
                          borderLeft: `4px solid ${colors[i]}`,
                          borderRadius: "8px",
                          fontSize: "12.5px", fontWeight: 600, color: "#0f172a",
                        }}
                      >
                        <span style={{ fontSize: "10px", fontWeight: 700, color: colors[i], minWidth: "20px" }}>L{layerNum}</span>
                        {layer.replace(/^L\d+:\s*/, "")}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Right: key principles */}
              <div style={{ flex: "1 1 35%", minWidth: "220px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: "🔒", title: "Sovereign by Design", text: "No vendor owns your data pipeline. Every layer can be swapped." },
                  { icon: "🚫", title: "Hallucination Engineered Out", text: "Strict I/O validation and RAG pipelines grounded in your actual data." },
                  { icon: "💰", title: "Inference Cost Control", text: "LiteLLM proxy routes to self-hosted vLLM first; frontier models only as fallback." },
                ].map((p) => (
                  <div key={p.title} style={{ padding: "1rem", background: "rgba(241,250,255,0.8)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: "12px" }}>
                    <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{p.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>{p.title}</div>
                    <div style={{ fontSize: "12px", color: "#475569", lineHeight: 1.5 }}>{p.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LAYER GROUP TABS (L1-3, L4-6, L7-9) */}
          {(activeTab === "l1-3" || activeTab === "l4-6" || activeTab === "l7-9") && (() => {
            const group = LAYER_GROUPS[activeTab];
            const tabImages: Record<string, string> = {
              "l1-3": "/images/L1.jpeg",
              "l4-6": "/images/L4.jpeg",
              "l7-9": "/images/L7.jpeg",
            };
            return (
              <div>
                {/* Section title */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.3rem" }}>{group.title}</h4>
                  <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{group.subtitle}</p>
                </div>

                {/* Side-by-side: image LEFT, cards RIGHT */}
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "stretch" }}>

                  {/* LEFT: image */}
                  <div style={{ flex: "0 0 52%", borderRadius: "14px", overflow: "hidden" }}>
                    <img
                      src={tabImages[activeTab]}
                      alt={group.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        mixBlendMode: "multiply",
                        borderRadius: "14px",
                      }}
                    />
                  </div>

                  {/* RIGHT: 3 cards, space-between so they line up with each layer */}
                  <div style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "0.65rem",
                  }}>
                    {group.layers.map((layer) => (
                      <div
                        key={layer.name}
                        style={{
                          flex: 1,
                          padding: "0.9rem 1.1rem",
                          background: `linear-gradient(135deg, rgba(248,252,255,0.94), ${accent}06)`,
                          border: `1px solid ${accent}22`,
                          borderLeft: `4px solid ${accent}`,
                          borderRadius: "12px",
                          boxShadow: `0 3px 14px ${accent}06`,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ fontSize: "13px", fontWeight: 800, color: accent, marginBottom: "0.3rem" }}>
                          {layer.name.split(":")[0]}
                          <span style={{ color: "#0f172a", marginLeft: "0.4rem" }}>
                            {layer.name.replace(/^L\d+:\s*/, "")}
                          </span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#334155", lineHeight: 1.55 }}>
                          {layer.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AIExecutionPage() {
  const [hoveredOverlay, setHoveredOverlay] = useState<string | null>(null);
  const [showLCOAI, setShowLCOAI] = useState(false);
  const [showHumanImpact, setShowHumanImpact] = useState(false);
  const [showTechArch, setShowTechArch] = useState(false);


  return (
    <section
      id="ai-execution-strategies"
      className="bg-white py-16 px-[4%] flex flex-col items-center justify-center font-['Inter',_sans-serif]"
    >
      {/* ── HEADER ── */}
      <div className="text-center mb-16 max-w-4xl">
        <h2 className="text-[clamp(2.5rem,4vw,3.8rem)] font-[800] text-[#202a30] font-['DM_Serif_Display',_serif] tracking-tight leading-[1.15]">
          The Triad of Enterprise AI Execution
        </h2>
      </div>

      {/* ── MAIN 2-COLUMN LAYOUT ── */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1400px] gap-12 lg:gap-8 items-stretch">
        
        {/* ── LEFT COLUMN: IMAGE & CUBE OVERLAYS ── */}
        <div className="flex-1 w-full lg:w-[65%] relative flex flex-col justify-center">
          
          {/* Main Image Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1.4/1] mb-8 lg:mb-0">
            <Image
              src="/images/AI-Execution.jpeg"
              alt="AI Execution Architecture Cubes"
              fill
              priority
              unoptimized
              className="object-contain object-center lg:object-right mix-blend-multiply"
            />
          </div>

          {/* Overlays Wrapper: stacked on mobile, absolute on desktop */}
          <div
            className="flex flex-col gap-4"
            style={{ position: "static" }}
          >
            {/* Desktop absolute overlay layer */}
            <div
              className="hidden lg:block"
              style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}
            >
              {/* Pulse keyframe */}
              <style>{`
                @keyframes _pulse-ring {
                  0%   { transform: scale(1);   opacity: 0.7; }
                  70%  { transform: scale(2.2); opacity: 0; }
                  100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes _pulse-dot {
                  0%, 100% { opacity: 1; }
                  50%       { opacity: 0.55; }
                }
              `}</style>

              {OVERLAYS.map((o) => (
                <div
                  key={o.id + "-desktop"}
                  onMouseEnter={() => setHoveredOverlay(o.id)}
                  onMouseLeave={() => setHoveredOverlay(null)}
                  onClick={() => {
                    if (o.id === "economic") setShowLCOAI(true);
                    if (o.id === "impact") setShowHumanImpact(true);
                    if (o.id === "architecture") setShowTechArch(true);
                  }}
                  style={{
                    position: "absolute",
                    ...o.desktopStyle,
                    pointerEvents: "auto",
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    background: hoveredOverlay === o.id
                      ? "linear-gradient(135deg, rgba(240,251,255,0.96), rgba(210,240,252,0.92))"
                      : "linear-gradient(135deg, rgba(250,253,255,0.75), rgba(230,245,250,0.6))",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: hoveredOverlay === o.id ? `1.5px solid ${o.color}55` : "1px solid rgba(255,255,255,0.9)",
                    borderLeft: `4px solid ${o.color}`,
                    boxShadow: hoveredOverlay === o.id
                      ? "0 16px 40px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.9)"
                      : "0 8px 32px rgba(0,0,0,0.06), inset 0 2px 0 0 rgba(255,255,255,0.8)",
                    transform: hoveredOverlay === o.id ? "translateY(-3px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {/* Metallic left accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px", bottom: "-4px", left: "-5px", width: "5px",
                      borderRadius: "4px 0 0 4px",
                      background: `linear-gradient(to bottom, #f0f0f0, #a0a5aa, ${o.color})`,
                      boxShadow: "inset 1px 0px 2px rgba(255,255,255,0.8)",
                    }}
                  />

                  {/* Pulsing interaction dot (top-right corner) */}
                  <div style={{ position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px" }}>
                    {/* Ring */}
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: o.color,
                      animation: "_pulse-ring 2s ease-out infinite",
                    }} />
                    {/* Solid dot */}
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      background: o.color,
                      animation: "_pulse-dot 2s ease-in-out infinite",
                    }} />
                  </div>

                  <h4 style={{ color: o.color, fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", lineHeight: 1.25, paddingRight: "18px" }}>
                    {o.title}
                  </h4>
                  <p style={{ color: "#334155", fontSize: "12.5px", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                    {o.description}
                  </p>

                  {/* Hover: "Explore →" label */}
                  <div style={{
                    marginTop: "0.5rem",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: o.color,
                    letterSpacing: "0.04em",
                    opacity: hoveredOverlay === o.id ? 1 : 0,
                    transform: hoveredOverlay === o.id ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                  }}>
                    Click to explore →
                  </div>

                  {/* ── HOVER PREVIEW POPOVER ── */}
                  <div style={{
                    position: "absolute",
                    // Architecture card: preview floats to the right
                    // Impact card: preview floats below
                    // Economic card: preview floats above
                    ...(o.id === "architecture" ? { left: "calc(100% + 14px)", top: 0 } : {}),
                    ...(o.id === "impact"        ? { top: "calc(100% + 12px)", right: 0 } : {}),
                    ...(o.id === "economic"      ? { bottom: "calc(100% + 12px)", right: 0 } : {}),
                    width: "200px",
                    background: "linear-gradient(135deg, rgba(248,252,255,0.98), rgba(230,244,255,0.96))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1.5px solid ${o.color}33`,
                    borderRadius: "12px",
                    boxShadow: `0 20px 50px rgba(0,0,0,0.14), 0 0 0 1px ${o.color}15`,
                    overflow: "hidden",
                    opacity: hoveredOverlay === o.id ? 1 : 0,
                    transform: hoveredOverlay === o.id ? "scale(1) translateY(0)" : "scale(0.92) translateY(6px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    pointerEvents: "none",
                    zIndex: 20,
                  }}>
                    {/* Preview header */}
                    <div style={{
                      padding: "8px 10px",
                      borderBottom: `1px solid ${o.color}20`,
                      display: "flex", alignItems: "center", gap: "6px",
                    }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: o.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "10px", fontWeight: 700, color: o.color, letterSpacing: "0.04em", lineHeight: 1 }}>
                        PREVIEW
                      </span>
                    </div>

                    {/* Preview content — image thumbnail for LCOAI & ADKAR, mini layer list for architecture */}
                    {o.id === "economic" && (
                      <img
                        src="/images/LCOAI.jpeg"
                        alt="LCOAI Preview"
                        style={{ width: "100%", height: "110px", objectFit: "cover", objectPosition: "center top", mixBlendMode: "multiply", display: "block" }}
                      />
                    )}
                    {o.id === "impact" && (
                      <img
                        src="/images/ADKAR.jpeg"
                        alt="ADKAR Preview"
                        style={{ width: "100%", height: "110px", objectFit: "cover", objectPosition: "center top", mixBlendMode: "multiply", display: "block" }}
                      />
                    )}
                    {o.id === "architecture" && (
                      <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {[
                          { l: "L9", label: "Security & Trust", c: "#b45309" },
                          { l: "L8", label: "UI & Experience",  c: "#b45309" },
                          { l: "L7", label: "Reporting & Analytics", c: "#b45309" },
                          { l: "L6", label: "Workflow & Automation", c: "#7c3aed" },
                          { l: "L5", label: "Agent Orchestration",   c: "#7c3aed" },
                          { l: "L4", label: "AI / ML Core",          c: "#7c3aed" },
                          { l: "L3", label: "Vector & Search",        c: "#0e7490" },
                          { l: "L2", label: "Data Storage",           c: "#0e7490" },
                          { l: "L1", label: "Data Ingestion",         c: "#0e7490" },
                        ].map((row) => (
                          <div key={row.l} style={{
                            display: "flex", alignItems: "center", gap: "5px",
                            padding: "2px 5px",
                            background: `${row.c}10`,
                            borderLeft: `3px solid ${row.c}`,
                            borderRadius: "4px",
                          }}>
                            <span style={{ fontSize: "8.5px", fontWeight: 800, color: row.c, minWidth: "16px" }}>{row.l}</span>
                            <span style={{ fontSize: "9px", color: "#334155", fontWeight: 500 }}>{row.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Preview footer */}
                    <div style={{
                      padding: "6px 10px",
                      borderTop: `1px solid ${o.color}15`,
                      fontSize: "9.5px",
                      color: o.color,
                      fontWeight: 700,
                      textAlign: "center",
                      letterSpacing: "0.03em",
                    }}>
                      Click card to open full view
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile stacked cards */}
            <div className="flex lg:hidden flex-col gap-4">
              {OVERLAYS.map((o) => (
                <div
                  key={o.id + "-mobile"}
                  onClick={() => {
                    if (o.id === "economic") setShowLCOAI(true);
                    if (o.id === "impact") setShowHumanImpact(true);
                    if (o.id === "architecture") setShowTechArch(true);
                  }}
                  style={{
                    padding: "1rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(250,253,255,0.9), rgba(230,245,250,0.7))",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    borderLeft: `4px solid ${o.color}`,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                  }}
                >
                  <h4 style={{ color: o.color, fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>{o.title}</h4>
                  <p style={{ color: "#334155", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LCOAI Modal */}
        {showLCOAI && <LCOAIPanel onClose={() => setShowLCOAI(false)} />}

        {/* Human Impact Modal */}
        {showHumanImpact && <HumanImpactPanel onClose={() => setShowHumanImpact(false)} />}

        {/* Technical Architecture Modal */}
        {showTechArch && <TechArchPanel onClose={() => setShowTechArch(false)} />}

        {/* ── RIGHT COLUMN: VERTICAL STATS CARDS ── */}
        <div className="w-full lg:w-[35%] flex flex-col gap-5 justify-center py-4 lg:pl-10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(240,248,255,0.65))",
                border: "1px solid rgba(14, 165, 233, 0.15)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              {/* Glass shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff80] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex items-center justify-center mb-3">
                <span
                  className="font-[900]"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    lineHeight: "1",
                    background: "linear-gradient(135deg, #0284c7, #0ea5e9, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </span>
              </div>

              <div className="text-center">
                <p className="text-[#334155] font-medium text-[14px] lg:text-[15px] leading-relaxed m-0 px-2 lg:px-4">
                  {stat.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
