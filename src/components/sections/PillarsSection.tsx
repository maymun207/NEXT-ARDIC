"use client";

import { useState, useCallback, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────────────────────── */

interface SubService {
  title: string;
  tagline?: string;
  coverage?: string;
  whatWeDo: string[];
  extras?: { label: string; items: string[] }[]; // e.g. Value Drivers / Examples
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  layout?: "left" | "center" | "split"; // default "left"
}

interface Pillar {
  number: number;
  title: string;
  subtitle: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  subServices: SubService[];
}

const PILLARS: Pillar[] = [
  {
    number: 1,
    title: "Building the Digital Foundation",
    subtitle: "Secure. Connect. Integrate.",
    accentColor: "#4a8fdb",
    gradientFrom: "#0a0f1e",
    gradientTo: "#0d1f3c",
    subServices: [
      {
        title: "Secure Edge and Devices",
        tagline: "Make sure every device in the operation is secure, visible, and under control.",
        coverage: "Mobile devices (phones, tablets), industrial machines (sensors, PLCs, IoT devices), edge gateways, field equipment.",
        whatWeDo: [
          "Device management (MDM)",
          "Security policies & access control",
          "Remote control & monitoring",
          "Firmware / software updates",
        ],
        accentColor: "#4a8fdb",
        gradientFrom: "#050d1a",
        gradientTo: "#0d2240",
      },
      {
        title: "Connect Systems and Assets",
        tagline: "Making sure systems talk to each other.",
        whatWeDo: [
          "IoT connectivity",
          "API integrations",
          "Real-time data streaming",
          "Device-to-cloud communication",
        ],
        extras: [
          {
            label: "Connections",
            items: [
              "Machines ↔ Cloud",
              "Devices ↔ Applications",
              "Sensors ↔ Dashboards",
              "Legacy Systems ↔ Modern Platforms",
            ],
          },
        ],
        accentColor: "#4a8fdb",
        gradientFrom: "#06101e",
        gradientTo: "#0e2644",
        layout: "split",
      },
      {
        title: "Integrate The Infrastructure",
        tagline: "Bringing all systems into one unified operation.",
        whatWeDo: [
          "System integration",
          "Data synchronization",
          "Workflow alignment",
          "Centralized architecture",
        ],
        extras: [
          {
            label: "Core Targets",
            items: [
              "ERP systems",
              "CRM systems",
              "Production systems",
              "IoT platforms",
              "Cloud + On-premise environments",
            ],
          },
        ],
        accentColor: "#4a8fdb",
        gradientFrom: "#070d1c",
        gradientTo: "#0f2348",
      },
    ],
  },
  {
    number: 2,
    title: "Activate AI-Driven Intelligence",
    subtitle: "Collect. Analyze. Precision.",
    accentColor: "#a855f7",
    gradientFrom: "#100a1e",
    gradientTo: "#1e0a3c",
    subServices: [
      {
        title: "Capture Real-Time Data",
        tagline: "Live data from the entire operation — as it happens.",
        extras: [
          {
            label: "Inputs",
            items: [
              "Machine data (temperature, speed)",
              "Device status",
              "Operational events",
              "User activity",
              "System logs",
            ],
          },
          {
            label: "Output",
            items: ["Streamed, centralized, instantly accessible platform data."],
          },
        ],
        whatWeDo: [
          "Real-time data collection",
          "Edge processing",
          "Centralized data streams",
          "Event-driven pipelines",
        ],
        accentColor: "#a855f7",
        gradientFrom: "#0e0818",
        gradientTo: "#1c0836",
        layout: "split",
      },
      {
        title: "Gain Operational Visibility",
        tagline: "See performance in real time.",
        whatWeDo: [
          "Dashboards & analytics",
          "Conversational UI",
          "Alerts & notifications",
          "Centralized monitoring",
        ],
        extras: [
          {
            label: "What You See",
            items: [
              "Track KPIs, identify issues instantly",
              "Monitor all operations from one place",
            ],
          },
        ],
        accentColor: "#a855f7",
        gradientFrom: "#0d081a",
        gradientTo: "#1a0a38",
      },
      {
        title: "Apply AI-Driven Insights",
        tagline: "Turning data into predictions, insights, and smarter decisions.",
        whatWeDo: [
          "Machine learning models",
          "Predictive analytics",
          "Anomaly detection",
          "Recommendation engines",
        ],
        extras: [
          {
            label: "Value Drivers",
            items: [
              "Predict failures",
              "Optimize processes",
              "Identify inefficiencies",
              "Automate decisions",
            ],
          },
        ],
        accentColor: "#a855f7",
        gradientFrom: "#0f081c",
        gradientTo: "#1e0c3a",
        layout: "split",
      },
    ],
  },
  {
    number: 3,
    title: "Orchestrate & Operate",
    subtitle: "Automate. Orchestrate. Optimize.",
    accentColor: "#00c4a0",
    gradientFrom: "#031410",
    gradientTo: "#072820",
    subServices: [
      {
        title: "Automate Workflows",
        tagline: "Systems trigger actions automatically. Processes run without human intervention.",
        whatWeDo: [
          "Workflow engines",
          "Rule-based automation",
          "Event-driven triggers",
        ],
        extras: [
          {
            label: "Examples in Action",
            items: [
              "Threshold exceeded → automatic shutdown or adjustment",
              "Data received → automatic report generation",
            ],
          },
        ],
        accentColor: "#00c4a0",
        gradientFrom: "#04120e",
        gradientTo: "#07281e",
        layout: "split",
      },
      {
        title: "Orchestrate Systems",
        tagline: "Multiple systems working together as one.",
        whatWeDo: [
          "System coordination",
          "Cross-platform workflows",
          "API orchestration",
          "Centralized control logic",
        ],
        extras: [
          {
            label: "Examples",
            items: [
              "IoT system → triggers ERP update",
              "AI prediction → triggers workflow in operations system",
            ],
          },
        ],
        accentColor: "#00c4a0",
        gradientFrom: "#031210",
        gradientTo: "#06261e",
      },
      {
        title: "Optimize Operations in Real Time",
        tagline: "Continuously improve operations as they run.",
        whatWeDo: [
          "Real-time analytics",
          "AI-driven recommendations",
          "Automated adjustments",
          "Performance optimization loops",
        ],
        extras: [
          {
            label: "Examples",
            items: [
              "Adjust machine performance instantly",
              "Reroute logistics dynamically",
              "Optimize energy usage live",
              "Detect and fix inefficiencies immediately",
            ],
          },
        ],
        accentColor: "#00c4a0",
        gradientFrom: "#041310",
        gradientTo: "#07281e",
        layout: "split",
      },
    ],
  },
];

/* Flatten into a panel list: [intro, sub, sub, sub, intro, sub, sub, sub, ...] */
interface PanelIntro { type: "intro"; pillarIdx: number }
interface PanelSub   { type: "sub"; pillarIdx: number; subIdx: number }
type Panel = PanelIntro | PanelSub;

const PANELS: Panel[] = PILLARS.flatMap((p, pi) => [
  { type: "intro" as const, pillarIdx: pi },
  ...p.subServices.map((_, si) => ({ type: "sub" as const, pillarIdx: pi, subIdx: si })),
]);

const TOTAL = PANELS.length; // 12

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

export default function PillarsSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState<number | null>(null);
  const [dir, setDir]         = useState<"next" | "prev">("next");
  const [transitioning, setTransitioning] = useState(false);
  const transitRef = useRef(false);

  const go = useCallback((idx: number) => {
    if (transitRef.current || idx === current || idx < 0 || idx >= TOTAL) return;
    transitRef.current = true;
    setDir(idx > current ? "next" : "prev");
    setTransitioning(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
      transitRef.current = false;
    }, 550);
  }, [current]);

  const goNext = useCallback(() => go(current + 1), [go, current]);
  const goPrev = useCallback(() => go(current - 1), [go, current]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const panel = PANELS[current];
  const pillar = PILLARS[panel.pillarIdx];

  /* Progress info */
  const subPanelsForCurrentPillar = PILLARS[panel.pillarIdx].subServices.length;
  const subIdx = panel.type === "sub" ? panel.subIdx : -1;

  /* Transform helpers */
  const getTransform = (i: number) => {
    if (i === current) return "translateX(0%)";
    if (i === prev)    return dir === "next" ? "translateX(-110%)" : "translateX(110%)";
    return dir === "next" ? "translateX(110%)" : "translateX(-110%)";
  };
  const getTransition = (i: number) =>
    i === current || i === prev ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)" : "none";

  return (
    <section
      id="pillars"
      className="relative w-full bg-black"
      style={{ minHeight: "100vh" }}
      aria-label="Service Pillars"
    >
      {/* ── Sticky top progress bar ── */}
      <div
        className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Pillar dots */}
        <div className="flex items-center gap-3">
          {PILLARS.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                // Jump to pillar intro
                const idx = PANELS.findIndex(pan => pan.type === "intro" && pan.pillarIdx === i);
                go(idx);
              }}
              className="flex items-center gap-2 transition-all duration-300"
              title={p.title}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: panel.pillarIdx === i ? "28px" : "8px",
                  height: "8px",
                  background: panel.pillarIdx === i ? p.accentColor : "rgba(255,255,255,0.25)",
                }}
              />
              {panel.pillarIdx === i && (
                <span
                  className="hidden md:block text-xs font-semibold"
                  style={{ color: p.accentColor, fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em" }}
                >
                  Pillar {p.number}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sub-service progress */}
        {panel.type === "sub" && (
          <div className="flex items-center gap-2">
            {Array.from({ length: subPanelsForCurrentPillar }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === subIdx ? "20px" : "6px",
                  height: "6px",
                  background: i === subIdx ? pillar.accentColor : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
            <span
              className="ml-2 text-xs"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}
            >
              {subIdx + 1} / {subPanelsForCurrentPillar}
            </span>
          </div>
        )}
        {panel.type === "intro" && (
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: pillar.accentColor, fontFamily: "'Inter', sans-serif" }}
          >
            {pillar.subtitle}
          </span>
        )}
      </div>

      {/* ── Slide stage ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 49px)" }}>
        {PANELS.map((pan, i) => {
          const pil = PILLARS[pan.pillarIdx];
          const isVisible = i === current || i === prev;

          return (
            <div
              key={i}
              className="absolute inset-0"
              aria-hidden={i !== current}
              style={{
                transform: getTransform(i),
                transition: getTransition(i),
                visibility: isVisible ? "visible" : "hidden",
                zIndex: i === current ? 10 : i === prev ? 5 : 0,
                background: `radial-gradient(ellipse at 60% 40%, ${pil.gradientTo} 0%, ${pil.gradientFrom} 70%)`,
              }}
            >
              {pan.type === "intro"
                ? <IntroPanel pillar={pil} />
                : <SubPanel pillar={pil} sub={pil.subServices[pan.subIdx]} subNum={pan.subIdx + 1} />
              }
            </div>
          );
        })}
      </div>

      {/* ── Arrow navigation ── */}
      {current > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Previous"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${pillar.accentColor}22`;
            (e.currentTarget as HTMLElement).style.borderColor = pillar.accentColor;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {current < TOTAL - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Next"
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = `${pillar.accentColor}22`;
            (e.currentTarget as HTMLElement).style.borderColor = pillar.accentColor;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   INTRO PANEL
   ───────────────────────────────────────────────────────────────────────────── */
function IntroPanel({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
      {/* Accent orb */}
      <div
        className="mb-8 flex h-20 w-20 items-center justify-center rounded-full text-4xl font-bold"
        style={{
          background: `${pillar.accentColor}18`,
          border: `1.5px solid ${pillar.accentColor}50`,
          color: pillar.accentColor,
          fontFamily: "'DM Serif Display', serif",
          boxShadow: `0 0 60px ${pillar.accentColor}30`,
        }}
      >
        {pillar.number}
      </div>

      {/* Sub-service chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {pillar.subServices.map((s, i) => (
          <span
            key={i}
            className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: `${pillar.accentColor}15`,
              border: `1px solid ${pillar.accentColor}35`,
              color: pillar.accentColor,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {s.title}
          </span>
        ))}
      </div>

      <h2
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {pillar.title}
      </h2>

      <div className="w-16 h-0.5 rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${pillar.accentColor}, transparent)` }} />

      <p
        className="text-lg sm:text-xl font-semibold tracking-widest"
        style={{ color: pillar.accentColor, fontFamily: "'Inter', sans-serif" }}
      >
        {pillar.subtitle}
      </p>

      {/* Scroll hint */}
      <p className="mt-12 text-xs text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
        Use arrow keys or buttons to explore →
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-SERVICE PANEL
   ───────────────────────────────────────────────────────────────────────────── */
function SubPanel({ pillar, sub, subNum }: { pillar: Pillar; sub: SubService; subNum: number }) {
  return (
    <div className="flex h-full w-full items-center px-8 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className={`grid gap-10 ${sub.extras && sub.layout === "split" ? "lg:grid-cols-2" : "lg:grid-cols-[55%_45%]"} items-center`}>

          {/* LEFT — main content */}
          <div>
            {/* Pillar breadcrumb */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: pillar.accentColor, fontFamily: "'Inter', sans-serif" }}
              >
                Pillar {pillar.number}
              </span>
              <span className="text-white/20">›</span>
              <span
                className="text-xs font-semibold uppercase tracking-widest text-white/40"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {subNum} / {pillar.subServices.length}
              </span>
            </div>

            {/* Accent line */}
            <div className="w-10 h-0.5 rounded-full mb-5" style={{ background: pillar.accentColor }} />

            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {sub.title}
            </h3>

            {sub.tagline && (
              <p
                className="text-base sm:text-lg text-white/60 mb-6 max-w-lg"
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: "1.7" }}
              >
                {sub.tagline}
              </p>
            )}

            {sub.coverage && (
              <div
                className="mb-6 rounded-xl px-5 py-4"
                style={{
                  background: `${pillar.accentColor}10`,
                  border: `1px solid ${pillar.accentColor}25`,
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest block mb-1"
                  style={{ color: pillar.accentColor, fontFamily: "'Inter', sans-serif" }}
                >
                  Coverage
                </span>
                <p className="text-sm text-white/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {sub.coverage}
                </p>
              </div>
            )}

            {/* What We Do */}
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest block mb-3"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}
              >
                What We Do
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sub.whatWeDo.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 shrink-0 h-4 w-4"
                      style={{ color: pillar.accentColor }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className="text-sm text-white/80"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — extras */}
          {sub.extras && sub.extras.length > 0 && (
            <div className="flex flex-col gap-4">
              {sub.extras.map((extra, ei) => (
                <div
                  key={ei}
                  className="rounded-2xl px-6 py-5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${pillar.accentColor}20`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest block mb-3"
                    style={{ color: pillar.accentColor, fontFamily: "'Inter', sans-serif" }}
                  >
                    {extra.label}
                  </span>
                  <ul className="space-y-2">
                    {extra.items.map((item, ii) => (
                      <li
                        key={ii}
                        className="flex items-start gap-2 text-sm text-white/70"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span style={{ color: pillar.accentColor, marginTop: "1px" }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
