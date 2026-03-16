"use client";

import Image from "next/image";

/**
 * FactoryTreeSection — Flexbox sticky scroll
 *
 * Flexbox with align-items: flex-start is the most reliable
 * approach for sticky scroll in Next.js.
 *
 *   Parent: display flex, align-items flex-start
 *   Left:   position sticky, top 0, width 50%, height 100vh
 *   Right:  two stacked 100vh panels (total 200vh)
 */
export default function FactoryTreeSection() {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "flex-start",
        background: "#000000",
        marginTop: "-2px",
      }}
    >
      {/* ── LEFT: sticky image panel ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "50%",
          height: "100vh",
          flexShrink: 0,
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
        }}
      >
        {/* Image starts 10vh from top, squeezed 8% horizontally */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image
            src="/images/factory tree 2.jpeg"
            alt="Factory Tree — Digital Mycelium of Industry"
            fill
            priority
            style={{
              objectFit: "contain",
              objectPosition: "center bottom",
              transform: "scaleX(0.92)",
            }}
          />
        </div>

      </div>

      {/* ── RIGHT: two stacked 100vh content panels ── */}
      <div style={{ width: "50%" }}>
        {/* Panel 1 */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 5rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "#4a8fdb", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }}>
            ● Industrial Intelligence
          </span>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem", fontFamily: "'DM Serif Display', serif" }}>
            The Factory That<br />
            <span style={{ color: "#4a8fdb" }}>Thinks for Itself.</span>
          </h2>
          <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #4a8fdb, #1a4d3a)", borderRadius: "2px", marginBottom: "1.5rem" }} />
          <p style={{ color: "#a0a098", lineHeight: 1.7, fontSize: "1rem", maxWidth: "420px", fontFamily: "'Inter', sans-serif" }}>
            Like the mycelium network beneath a forest, ARDICTECH's intelligence
            layer connects every machine, every sensor, every data stream —
            silently and continuously — so your factory can sense, decide, and
            act in real time.
          </p>
        </div>

        {/* Panel 2 */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 5rem",
          }}
        >
          <span style={{ color: "#00c4a0", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }}>
            ● From Data to Decision
          </span>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem", fontFamily: "'DM Serif Display', serif" }}>
            Every Layer.<br />
            <span style={{ color: "#00c4a0" }}>One Platform.</span>
          </h2>
          <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #00c4a0, #1a4d3a)", borderRadius: "2px", marginBottom: "1.5rem" }} />
          <p style={{ color: "#a0a098", lineHeight: 1.7, fontSize: "1rem", maxWidth: "420px", fontFamily: "'Inter', sans-serif" }}>
            From secure hardware at the edge to conversational AI at the surface
            — ARDICTECH's five-layer ecosystem is the missing intelligence stack
            your manufacturing operation has been waiting for.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
            <a href="#products" style={{ border: "1.5px solid #1a4d3a", color: "#fff", background: "transparent", borderRadius: "8px", padding: "0.75rem 1.5rem", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Explore the Platform
            </a>
            <a href="#roi" style={{ border: "1.5px solid #1a4d3a", color: "#fff", background: "transparent", borderRadius: "8px", padding: "0.75rem 1.5rem", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
              Calculate Your ROI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
