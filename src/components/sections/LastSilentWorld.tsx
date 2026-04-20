"use client";

import Image from "next/image";

export default function LastSilentWorld() {
  return (
    <section
      style={{
        width: "100%",
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        lineHeight: 0,
        display: "flex",
        justifyContent: "center",
        paddingTop: "clamp(1.5rem, 3vh, 3rem)",
      }}
    >
      {/* ── Inner wrapper at 90% width ── */}
      <div
        style={{
          position: "relative",
          width: "90%",
          lineHeight: 0,
        }}
      >
        {/* ── LastWorld.jpeg ── */}
        <Image
          src="/images/LastWorld.jpeg"
          alt="The Last Silent World — 18B connected devices, 80% of industrial data never reaches a human, 0 of them can actually speak to you."
          width={1920}
          height={600}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          sizes="90vw"
          priority
        />

        {/* ── Overlay: title + stat labels ── */}
        <div style={{ position: "absolute", inset: 0, lineHeight: 1 }}>

          {/* Title */}
          <h2
            style={{
              position: "absolute",
              top: "8%",
              left: "7%",
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            The Last Silent World.
          </h2>

          {/* Accent bar — matches Hero Slide 1 style */}
          <div
            style={{
              position: "absolute",
              top: "21%",
              left: "7%",
              width: "44px",
              height: "3px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #7c3aed, #7c3aed55)",
            }}
          />

          {/* Subheader — matches "Intelligence Integrated" style */}
          <p
            style={{
              position: "absolute",
              top: "25%",
              left: "7%",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.45rem)",
              fontWeight: 600,
              color: "#111111",
              lineHeight: 1.4,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            IoT connects things. AIoT makes them intelligent.
          </p>

          {/* Under 18B */}
          <p
            style={{
              position: "absolute",
              top: "80%",
              left: "12%",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.45,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            connected devices on Earth
          </p>

          {/* Under 80% */}
          <p
            style={{
              position: "absolute",
              top: "80%",
              left: "38%",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.45,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            of industrial data never reaches a human
          </p>

          {/* Under 0 */}
          <p
            style={{
              position: "absolute",
              top: "80%",
              left: "68%",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.45,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            of them can actually speak to you
          </p>
        </div>
      </div>
    </section>
  );
}
