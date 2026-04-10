"use client";

import { useState } from "react";
import Image from "next/image";

export default function DigitalTransformationPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      style={{
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        padding: "8vh 4%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      {/* ── TITLE BLOCK ── */}
      <div style={{ textAlign: "center", marginBottom: "5vh", maxWidth: "800px" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 700,
            color: "#050505",
            fontFamily: "'DM Serif Display', serif",
            marginBottom: "1rem",
            lineHeight: 1.15,
          }}
        >
          Digital Transformation for Manufacturing
        </h2>
        <p style={{ color: "rgba(0,0,0,0.55)", fontSize: "17px", lineHeight: 1.7, margin: 0 }}>
          From a silent factory floor to a fully connected, AI-guided operation. IoT-Ignite captures the data, ArMES orchestrates production, PilarOS and Modiverse manage the digital layer — and ArAI with CWF bring conversational intelligence to every decision.
        </p>
      </div>

      {/* ── NEW DIAGRAM & PRODUCT LEGEND ── */}
      <div style={{ width: "92%", maxWidth: "1200px", marginBottom: "4rem", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        
        {/* DigiF.jpeg Image */}
        <div 
          style={{ 
            width: "100%", 
            position: "relative", 
            aspectRatio: "1.6 / 1", 
            marginBottom: "1rem",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)"
          }}
        >
          <Image
            src="/images/DigiF.jpeg"
            alt="Digital Architecture"
            fill
            priority
            unoptimized={true}
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>

        {/* Product Menu Pill Overlay (Now under image, aligned right) */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "16px",
            padding: "0.85rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 2px 0 0 rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            flexWrap: "nowrap",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          {["PilarOS & AFEX", "Modiverse", "IoT-Ignite", "ArMES", "ArAI", "CWF"].map((item, idx, arr) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexShrink: 0 }}>
              <button
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#050505",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0ab9e6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#050505")}
              >
                {item}
              </button>
              {idx < arr.length - 1 && (
                <div style={{ width: "1px", height: "1.2rem", background: "rgba(0,0,0,0.12)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATE LABELS ── */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginBottom: "2.5rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setIsFlipped(false)}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            border: `2px solid ${!isFlipped ? "#0ab9e6" : "rgba(0,0,0,0.1)"}`,
            background: !isFlipped ? "#0ab9e6" : "transparent",
            color: !isFlipped ? "#fff" : "rgba(0,0,0,0.4)",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.1em",
            cursor: "pointer",
            transition: "all 0.4s ease",
          }}
        >
          BASE FACTORY
        </button>

        {/* Arrow between */}
        <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
          <path d="M0 8 H34 M28 2 L 40 8 L28 14" stroke={isFlipped ? "#0ab9e6" : "rgba(0,0,0,0.2)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.4s ease" }} />
        </svg>

        <button
          onClick={() => setIsFlipped(true)}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            border: `2px solid ${isFlipped ? "#0ab9e6" : "rgba(0,0,0,0.1)"}`,
            background: isFlipped ? "#0ab9e6" : "transparent",
            color: isFlipped ? "#fff" : "rgba(0,0,0,0.4)",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.1em",
            cursor: "pointer",
            transition: "all 0.4s ease",
          }}
        >
          DIGITIZED FACTORY
        </button>
      </div>

      {/* ── 3D FLIP CARD ── */}
      <div
        onClick={() => setIsFlipped((f) => !f)}
        style={{
          width: "92%",
          maxWidth: "1400px",
          // Use DigF2's ratio (2810:1504 ≈ 1.87:1) so the back image fills fully
          // DigF1 will show with slight whitespace top/bottom which is fine
          aspectRatio: "1.87 / 1",
          cursor: "pointer",
          perspective: "2000px",
          position: "relative",
        }}
      >
        {/* The inner container that does the actual flip */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.85s cubic-bezier(0.4, 0.2, 0.2, 1)",
          }}
        >
          {/* ── FRONT FACE: Base Factory (DigF1) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
              transform: "translateZ(0)",
            }}
          >
            <Image
              src="/images/DigF1.jpeg"
              alt="Base Factory — Before Digitization"
              fill
              priority
              unoptimized={true}
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
            {/* Front label badge */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "#050505",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              🏭 RAW FACTORY — BEFORE ARDICTECH
            </div>
            {/* Click hint */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(12px)",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>Click to reveal digitized →</span>
            </div>
          </div>

          {/* ── BACK FACE: Digitized Factory (DigF2) ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg) translateZ(0)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(10,185,230,0.2)",
            }}
          >
            <Image
              src="/images/DigiF2.jpeg"
              alt="Digitized Factory — After Transformation"
              fill
              priority
              unoptimized={true}
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
            {/* Click hint */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(12px)",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ← Click to go back
            </div>
          </div>
        </div>
      </div>

      {/* ── 8 CHALLENGES SECTION ── */}
      <div style={{ width: "92%", maxWidth: "1400px", marginTop: "7vh" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.2em", color: "#0ab9e6", marginBottom: "0.75rem" }}>
            WHY IT MATTERS
          </p>
          <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: "#050505", fontFamily: "'DM Serif Display', serif", margin: 0 }}>
            Solving the Eight Fundamental Manufacturing Challenges
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
        >
          {[
            { icon: "⚠", title: "Downtime", desc: "Forecast failures 72+ hours ahead.", impact: "20-30% reduction", color: "#e85d04" },
            { icon: "◎", title: "Quality", desc: "Real-time computer vision.", impact: ">99% accuracy", color: "#e85d04" },
            { icon: "⇄", title: "Inflexibility", desc: "RL for real-time optimization.", impact: "30-50% faster changeover", color: "#e85d04" },
            { icon: "◈", title: "Knowledge Loss", desc: "Digital twins encode expertise.", impact: "50% training reduction", color: "#e85d04" },
            { icon: "⊡", title: "Supply Chain", desc: "Multi-agent systems.", impact: "15-25% inventory optimization", color: "#e85d04" },
            { icon: "⚡", title: "Energy", desc: "Physics-informed neural networks.", impact: "10-20% consumption reduction", color: "#e85d04" },
            { icon: "❐", title: "Complexity", desc: "GenAI for design.", impact: "Batch-size-one economics", color: "#e85d04" },
            { icon: "◬", title: "Safety", desc: "Computer vision hazard recognition.", impact: "30-50% incident reduction", color: "#e85d04" },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "16px",
                padding: "1.75rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                cursor: "default",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
              }}
            >
              <span style={{ fontSize: "22px", color: card.color, lineHeight: 1 }}>{card.icon}</span>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#050505", margin: 0 }}>{card.title}</h4>
              <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.55)", margin: 0, lineHeight: 1.5 }}>
                {card.desc}{" "}
                <span style={{ fontWeight: 700, color: "#050505" }}>Impact: {card.impact}.</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
