"use client";

import { useState } from "react";
import Image from "next/image";
import { useProductModal } from "@/context/ProductModalContext";

export default function DigitalTransformationPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { openProduct } = useProductModal();

  return (
    <section
      style={{
        background: "#e4e4e9",
        fontFamily: "'Inter', sans-serif",
        padding: "8vh 4%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      {/* ── HERO BANNER (Full Bleed Layout mimicking Hero Slide 1) ── */}
      <div 
        style={{ 
          position: "relative",
          width: "100%", 
          minHeight: "75vh", // Increased height to allow image to scale up massively
          display: "flex",
          alignItems: "flex-start", // Moved text to the top
          paddingTop: "6vh", // Spacing from the top
          marginBottom: "4rem",
          overflow: "visible"
        }}
      >
        {/* Right Side: Massive Absolute Image */}
        <div style={{ 
          position: "absolute", 
          top: "0", 
          bottom: "0", 
          right: "0", 
          width: "85%", // Expanded width to let image take over the screen
          zIndex: 0,
          mixBlendMode: "darken"
        }}>
          <Image
            src="/images/DigiFac3.jpeg"
            alt="Digital Architecture"
            fill
            priority
            unoptimized={true}
            style={{ 
              objectFit: "contain", 
              objectPosition: "right center"
            }}
          />
          {/* Edge fade to hide sharp cuts on all sides */}
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 5,
            background: `
              linear-gradient(to top, #e4e4e9 0%, transparent 15%),
              linear-gradient(to bottom, #e4e4e9 0%, transparent 15%),
              linear-gradient(to left, #e4e4e9 0%, transparent 15%),
              linear-gradient(to right, #e4e4e9 0%, transparent 5%)
            `
          }}></div>
        </div>

        {/* Left Side: Text Content */}
        <div style={{ 
          position: "relative", 
          zIndex: 10, 
          width: "92%", 
          maxWidth: "1400px", 
          margin: "0 auto" 
        }}>
          {/* Text wrapper without the white glow, to blend cleanly into the background */}
          <div style={{ 
            maxWidth: "600px", 
            padding: "4rem 4rem 4rem 0", 
            marginTop: "-4rem", 
            marginBottom: "-4rem"
          }}> 
            <div style={{ maxWidth: "600px" }}> {/* Relaxed width to fit the longer line */}
              <h2
                lang="en"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#050505",
                  fontFamily: "'DM Serif Display', serif",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                  textTransform: "uppercase"
                }}
              >
                AI-POWERED<br/> DIGITAL TRANSFORMATION <br/>FOR MANUFACTURING
              </h2>
              <p style={{ 
                color: "#050505", 
                fontSize: "18px", 
                fontWeight: 600,
                marginBottom: "1rem" 
              }}>
                Manufacturing Intelligence
              </p>
              <p style={{ 
                color: "#333333", 
                fontSize: "16px", 
                lineHeight: 1.7, 
                margin: 0,
                fontWeight: 500 
              }}>
                From a silent factory floor <br />to a fully connected, AI-guided operation.<br /> IoT-Ignite captures the data, <br />ArMES orchestrates production, <br />PilarOS and Modiverse manage <br />the digital layer, <br />and ArAI with CWF bring <br />conversational intelligence <br />to every decision.
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* ── BEFORE/AFTER SLIDER ── */}
      <div style={{ width: "92%", maxWidth: "1400px", margin: "2rem auto", position: "relative" }}>
        
        {/* Helper Labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", padding: "0 1rem" }}>
          <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.15em", color: "#050505" }}>🏭 BASE FACTORY</span>
          <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.15em", color: "#0ab9e6" }}>DIGITIZED FACTORY ⚡</span>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1.87 / 1"
          }}
        >
          {/* Composite wrapper for images */}
          <div style={{ position: "absolute", inset: 0 }}>
            {/* AFTER IMAGE (Background) */}
            <div style={{ position: "absolute", inset: 0 }}>
              <Image
                src="/images/after.jpeg"
                alt="Digitized Factory — After Transformation"
                fill
                priority
                unoptimized={true}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>

            {/* BEFORE IMAGE (Clipped by slider position) */}
            <div 
              style={{ 
                position: "absolute", 
                inset: 0, 
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
            >
              <Image
                src="/images/before.jpeg"
                alt="Base Factory — Before Digitization"
                fill
                priority
                unoptimized={true}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
          </div>

          {/* Edge fade to hide sharp cuts on all sides */}
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 5,
            background: `
              linear-gradient(to top, #e4e4e9 0%, transparent 3%),
              linear-gradient(to bottom, #e4e4e9 0%, transparent 6%),
              linear-gradient(to left, #e4e4e9 0%, transparent 2%),
              linear-gradient(to right, #e4e4e9 0%, transparent 2%)
            `
          }}></div>

          {/* SLIDER LINE & HANDLE */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: "4px",
              backgroundColor: "#ffffff",
              transform: "translateX(-50%)",
              boxShadow: "0 0 16px rgba(0,0,0,0.4)",
              pointerEvents: "none",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Slider Handle */}
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 0 0 2px #0ab9e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}>
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: "7px solid #0ab9e6" }} />
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "7px solid #0ab9e6" }} />
            </div>
          </div>

          {/* INVISIBLE RANGE INPUT FOR INTERACTION */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "ew-resize",
              zIndex: 20
            }}
          />
        </div>
      </div>

      {/* ── PRODUCT PILL BAR WITH TOOLTIPS ── */}
      <div style={{ position: "relative", marginTop: "-1rem", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "16px",
            padding: "0.85rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
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
                  color: hoveredProduct === item ? "#0ab9e6" : "#050505",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s"
                }}
                onMouseEnter={() => setHoveredProduct(item)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => {
                  const map: Record<string, string> = {
                    "PilarOS & AFEX": "pilaros",
                    "Modiverse": "modiverse",
                    "IoT-Ignite": "iot-ignite",
                    "ArMES": "armes",
                    "ArAI": "arai",
                    "CWF": "cwf"
                  };
                  if (map[item]) openProduct(map[item]);
                }}
              >
                {item}
              </button>
              {idx < arr.length - 1 && (
                <div style={{ width: "1px", height: "1.2rem", background: "rgba(0,0,0,0.12)" }} />
              )}
            </div>
          ))}
        </div>
        
        {/* Tooltip Description */}
        <div style={{ 
          marginTop: "1.5rem", 
          height: "24px", // Fixed height to prevent layout shift
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <p style={{
            fontSize: "15px",
            color: "#666",
            fontWeight: 500,
            opacity: hoveredProduct ? 1 : 0,
            transform: hoveredProduct ? "translateY(0)" : "translateY(-5px)",
            transition: "all 0.3s ease",
            margin: 0,
            textAlign: "center"
          }}>
            {hoveredProduct === "PilarOS & AFEX" && "Securely manages edge devices and digital signage across the floor."}
            {hoveredProduct === "Modiverse" && "Centralized endpoint and remote device management platform."}
            {hoveredProduct === "IoT-Ignite" && "Captures real-time edge data from legacy machines."}
            {hoveredProduct === "ArMES" && "Orchestrates production, job orders, and real-time tracking."}
            {hoveredProduct === "ArAI" && "Brings Generative AI to enterprise data."}
            {hoveredProduct === "CWF" && "Conversational intelligence for every level of the operation."}
          </p>
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
