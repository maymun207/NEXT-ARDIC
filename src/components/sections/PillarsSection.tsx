"use client";

import Image from "next/image";

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
    title: "Build the Digital Foundation",
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
    subtitle: "Capture. Analyze. Decide.",
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
    title: "Operate and Optimize",
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

/* ─────────────────────────────────────────────────────────────────────────────
   COMPACT WHITE SECTION — Image left · Pillar cards right
   ───────────────────────────────────────────────────────────────────────────── */

export default function PillarsSection() {
  return (
    <section
      id="pillars"
      aria-label="AIoT Adoption Pillars"
      style={{
        background: "#ffffff",
        padding: "clamp(3.5rem, 7vw, 5.5rem) 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "45% 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
          className="lg:grid-cols-[45%_1fr] grid-cols-1"
        >

          {/* ── LEFT: Digital Tree image ── */}
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              height: "clamp(420px, 58vh, 660px)",
              boxShadow: "0 12px 60px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="/images/Digital-tree-white.jpeg"
              alt="AIoT Digital Tree — 3 pillars of intelligence"
              fill
              style={{ objectFit: "cover", objectPosition: "left center" }}
              priority
            />
          </div>

          {/* ── RIGHT: Label + title + 3 cards ── */}
          <div>
            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: "32px", height: "2px", background: "#4a8fdb", borderRadius: "2px" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#4a8fdb",
                }}
              >
                AIoT Adoption
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
                fontWeight: 700,
                color: "#0f0f0e",
                lineHeight: 1.15,
                marginBottom: "0.6rem",
              }}
            >
              Three Pillars of Industrial Intelligence
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#666",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              A structured journey from connected devices to autonomous, self-optimizing operations.
            </p>

            {/* ── 3 Pillar Cards ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {PILLARS.map((p) => (
                <div
                  key={p.number}
                  style={{
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderLeft: `4px solid ${p.accentColor}`,
                    borderRadius: "16px",
                    padding: "1.1rem 1.4rem",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = `0 8px 32px ${p.accentColor}22`;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>

                    {/* Number badge */}
                    <div
                      style={{
                        minWidth: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: `${p.accentColor}14`,
                        border: `1.5px solid ${p.accentColor}38`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: p.accentColor,
                        flexShrink: 0,
                      }}
                    >
                      {p.number}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                          fontWeight: 700,
                          color: "#0f0f0e",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: p.accentColor,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "0.65rem",
                        }}
                      >
                        {p.subtitle}
                      </p>

                      {/* Sub-service chips */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {p.subServices.map((s, si) => (
                          <span
                            key={si}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.67rem",
                              fontWeight: 600,
                              color: p.accentColor,
                              background: `${p.accentColor}0c`,
                              border: `1px solid ${p.accentColor}28`,
                              borderRadius: "100px",
                              padding: "0.22rem 0.7rem",
                            }}
                          >
                            {s.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

