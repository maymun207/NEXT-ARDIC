"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Dictionary } from "@/types";

interface Slide {
  id: number;
  image: string;
  imageAlt: string;
  badge?: string;
  headline: string;
  subheadline: string;
  ctaPrimary?: { label: string; href: string };
  chipText?: string;          // bottom-right dark chip (slides 2 & 3)
  footerText?: string;        // slide 1 only
  accentColor: string;
  layout: "bottom" | "glass-card" | "horizontal-top";
  cardSide?: "left" | "right"; // glass-card position: left=top-left float, right=right-center float
  imagePosition?: string; // e.g. "45% center" to shift image
  imageScale?: number; // zoom in/out effect
}

const AUTO_ADVANCE_MS = 6000;

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const h = dict.heroSlider;

  const SLIDES: Slide[] = [
    {
      id: 0,
      layout: "bottom",
      image: "/images/H1.jpeg",
      imageAlt: "ARDIC — Intelligence Integrated, AIoT Platform",
      headline: h.slide1.headline,
      subheadline: h.slide1.subheadline,
      accentColor: "#8b5cf6",
    },
    {
      id: 1,
      layout: "glass-card",
      image: "/images/H2-Digital tr .jpeg",
      imageAlt: "Digital Transformation for Manufacturing",
      badge: "Manufacturing Intelligence",
      headline: h.slide2.headline,
      subheadline: h.slide2.subheadline,
      ctaPrimary: {
        label: "See our Demo",
        href: "https://www.ardic.ai/virtual-factory-demo",
      },
      chipText: "Turn static operations into intelligent systems.",
      accentColor: "#3b6cb7",
      cardSide: "left",
    },
    {
      id: 2,
      layout: "horizontal-top",
      image: "/images/hero3 .jpeg",
      imageAlt: "Enterprise Agentic AI Platform — secure data sovereignty",
      badge: "Enterprise AI",
      headline: h.slide3.headline,
      subheadline: h.slide3.subheadline,
      accentColor: "#6d28d9",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      if (transitioning) return;
      setDir(direction);
      setTransitioning(true);
      setCurrent((c) => {
        setPrev(c);
        return direction === "next"
          ? (c + 1) % SLIDES.length
          : (c - 1 + SLIDES.length) % SLIDES.length;
      });
      setTimeout(() => { setPrev(null); setTransitioning(false); }, 700);
    },
    [transitioning]
  );

  const goNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev = useCallback(() => navigate("prev"), [navigate]);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return;
      setDir(idx > current ? "next" : "prev");
      setTransitioning(true);
      setPrev(current);
      setCurrent(idx);
      setTimeout(() => { setPrev(null); setTransitioning(false); }, 700);
    },
    [transitioning, current]
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, paused, goNext]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const getTransform = (idx: number) => {
    if (idx === current) return "translateX(0)";
    if (idx === prev) return dir === "next" ? "translateX(-100%)" : "translateX(100%)";
    return dir === "next" ? "translateX(100%)" : "translateX(-100%)";
  };

  const getTransition = (idx: number) =>
    idx === current || idx === prev
      ? "transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)"
      : "none";

  const slide = SLIDES[current];

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-white"
      style={{ height: "75vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide area — starts below the fixed 64px header */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: "64px" }}>
      {/* ── Slides ── */}
      {SLIDES.map((s, idx) => {
        const isActive = idx === current;
        const isVisible = idx === current || idx === prev;

        return (
          <div
            key={s.id}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{
              transform: getTransform(idx),
              transition: getTransition(idx),
              visibility: isVisible ? "visible" : "hidden",
              zIndex: isActive ? 10 : idx === prev ? 5 : 0,
            }}
          >
            {/* ── Full-bleed image (all slides) ── */}
            <div
              className="absolute inset-0"
              style={{
                transform: s.imageScale ? `scale(${s.imageScale})` : "none",
                transformOrigin: "center center"
              }}
            >
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                className="object-contain"
                style={s.imagePosition ? { objectPosition: s.imagePosition } : {}}
                priority={idx === 0}
                sizes="100vw"
              />
            </div>

            {/* ════════════════════════════════════════
                LAYOUT A — "bottom" (Slide 1)
                White gradient from bottom + bottom text
                ════════════════════════════════════════ */}
            {s.layout === "bottom" && (
              <>
                {/* Top-left fade — only covers top half so bottom-left image stays visible */}
                <div
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{
                    width: "55%",
                    height: "55%",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.97) 20%, rgba(255,255,255,0.75) 50%, transparent 80%)",
                  }}
                />
                {/* Text block — top-left */}
                <div
                  className="hero-text-bottom absolute top-0 left-0 flex flex-col items-start text-left"
                  style={{
                    paddingTop: "clamp(2rem, 5vh, 4rem)",
                    paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
                    maxWidth: "clamp(280px, 42%, 520px)",
                  }}
                >
                  <h1
                    className="font-bold leading-tight mb-3"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "clamp(2rem, 4.5vw, 4.2rem)",
                      color: "#0f0f0e",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.headline}
                  </h1>
                  <div
                    className="mb-4 rounded-full"
                    style={{
                      width: "44px", height: "3px",
                      background: `linear-gradient(90deg, ${s.accentColor}, ${s.accentColor}55)`,
                    }}
                  />
                  <p
                    className="mb-6 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(1rem, 1.6vw, 1.45rem)",
                      color: "#111",
                      fontWeight: 600,
                    }}
                  >
                    {s.subheadline}
                  </p>
                  {s.footerText && (
                    <p
                      className="text-xs font-semibold uppercase"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.22em",
                        color: "rgba(0,0,0,0.25)",
                      }}
                    >
                      {s.footerText}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* ════════════════════════════════════════
                LAYOUT B — "glass-card" (Slides 2 & 3)
                Full-bleed image + top-left frosted glass
                card + bottom-right chip
                ════════════════════════════════════════ */}
            {s.layout === "glass-card" && (
              <>
                {/* ── Glass card — position depends on cardSide ── */}
                <div
                  className="hero-glass-panel absolute"
                  style={
                    s.cardSide === "right"
                      ? {
                          right: "clamp(1.5rem, 4vw, 3.5rem)",
                          top: "clamp(1rem, 3vh, 2.5rem)", /* Matches left card */
                          width: "clamp(260px, 38%, 420px)",
                          background: "rgba(255, 255, 255, 0.55)",
                          backdropFilter: "blur(28px)",
                          WebkitBackdropFilter: "blur(28px)",
                          border: "1px solid rgba(255,255,255,0.65)",
                          borderRadius: "20px",
                          padding: "clamp(1.4rem, 3.5vh, 2.2rem) clamp(1.4rem, 2.8vw, 2.2rem)",
                          boxShadow: "0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                        }
                      : {
                          // left = top-left floating card (reference image style)
                          top: "clamp(1rem, 3vh, 2.5rem)",
                          left: "clamp(1.5rem, 4vw, 3.5rem)",
                          width: "clamp(260px, 40%, 440px)",
                          background: "rgba(255, 255, 255, 0.55)",
                          backdropFilter: "blur(28px)",
                          WebkitBackdropFilter: "blur(28px)",
                          border: "1px solid rgba(255,255,255,0.65)",
                          borderRadius: "20px",
                          padding: "clamp(1.4rem, 3.5vh, 2.2rem) clamp(1.4rem, 2.8vw, 2.2rem)",
                          boxShadow: "0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                        }
                  }
                >
                  {/* Badge */}
                  {s.badge && (
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        borderColor: `${s.accentColor}35`,
                        color: s.accentColor,
                        background: `${s.accentColor}0d`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: s.accentColor }}
                      />
                      {s.badge}
                    </div>
                  )}

                  {/* Headline */}
                  <h1
                    className="font-bold leading-tight mb-3"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
                      color: "#0b0b0b",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.headline}
                  </h1>

                  {/* Accent rule */}
                  <div
                    className="mb-4 rounded-full"
                    style={{
                      width: "40px", height: "2.5px",
                      background: `linear-gradient(90deg, ${s.accentColor}, ${s.accentColor}50)`,
                    }}
                  />

                  {/* Subheadline */}
                  <p
                    className="leading-relaxed mb-5"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.82rem, 1.15vw, 0.95rem)",
                      color: "#3a3a38",
                      lineHeight: 1.65,
                    }}
                  >
                    {s.subheadline}
                  </p>

                  {/* CTA */}
                  {s.ctaPrimary?.label && (
                    <a
                      href={s.ctaPrimary.href}
                      target={s.ctaPrimary.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.ctaPrimary.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg font-bold uppercase tracking-widest transition-all duration-200 self-start"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        padding: "0.6rem 1.4rem",
                        border: `1.5px solid ${s.accentColor}`,
                        color: s.accentColor,
                        background: "transparent",
                        letterSpacing: "0.1em",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = s.accentColor;
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = `0 8px 20px ${s.accentColor}35`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = s.accentColor;
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {s.ctaPrimary.label}
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* ── Dark chip — bottom right ── */}
                {s.chipText && (
                  <div
                    className="hero-chip absolute"
                    style={{
                      bottom: "clamp(4.5rem, 9vh, 7rem)",
                      right: "clamp(1.2rem, 3vw, 3rem)",
                      background: `${s.accentColor}ee`,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: "#ffffff",
                      borderRadius: "10px",
                      padding: "0.7rem 1.2rem",
                      fontSize: "0.75rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      maxWidth: "280px",
                      boxShadow: `0 4px 20px ${s.accentColor}40`,
                      border: "1px solid rgba(255,255,255,0.2)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.chipText}
                  </div>
                )}
              </>
            )}

            {/* ════════════════════════════════════════
                LAYOUT C — "horizontal-top"
                Full-bleed image + wide horizontal
                frosted glass bar at the top
                ════════════════════════════════════════ */}
            {s.layout === "horizontal-top" && (
              <div
                className="hero-horiz-card absolute inset-x-0"
                style={{
                  top: "clamp(1rem, 3vh, 2.5rem)",
                  margin: "0 clamp(1.5rem, 4vw, 3.5rem)",
                  background: "rgba(255, 255, 255, 0.82)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: "20px",
                  padding: "clamp(1.2rem, 2.5vh, 1.8rem) clamp(1.5rem, 3vw, 2.5rem)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                }}
              >
                {/* LEFT — badge + headline */}
                <div style={{ flex: "0 0 auto", maxWidth: "42%" }}>
                  {s.badge && (
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        borderColor: `${s.accentColor}35`,
                        color: s.accentColor,
                        background: `${s.accentColor}0d`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: s.accentColor }}
                      />
                      {s.badge}
                    </div>
                  )}
                  <h1
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "clamp(1.5rem, 2.6vw, 2.6rem)",
                      fontWeight: 700,
                      color: "#0b0b0b",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      margin: 0,
                    }}
                  >
                    {s.headline}
                  </h1>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    alignSelf: "stretch",
                    background: `linear-gradient(to bottom, transparent, ${s.accentColor}40, transparent)`,
                    flexShrink: 0,
                  }}
                />

                {/* RIGHT — subheadline + CTA */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
                      color: "#3a3a38",
                      lineHeight: 1.65,
                      marginBottom: s.ctaPrimary ? "1rem" : 0,
                    }}
                  >
                    {s.subheadline}
                  </p>
                  {s.ctaPrimary?.label && (
                    <a
                      href={s.ctaPrimary.href}
                      target={s.ctaPrimary.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.ctaPrimary.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg font-bold uppercase tracking-widest transition-all duration-200"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.7rem",
                        padding: "0.55rem 1.3rem",
                        border: `1.5px solid ${s.accentColor}`,
                        color: s.accentColor,
                        background: "transparent",
                        letterSpacing: "0.1em",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = s.accentColor;
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = s.accentColor;
                      }}
                    >
                      {s.ctaPrimary.label}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Navigation — bottom center ── */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center gap-4"
        style={{ paddingBottom: "28px" }}
      >
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: "38px", height: "38px",
            border: "1.5px solid rgba(0,0,0,0.15)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            color: "#333",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = slide.accentColor;
            e.currentTarget.style.color = slide.accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
            e.currentTarget.style.color = "#333";
          }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: "6px",
                width: i === current ? "28px" : "6px",
                background: i === current ? slide.accentColor : "rgba(0,0,0,0.2)",
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Next slide"
          className="flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: "38px", height: "38px",
            border: "1.5px solid rgba(0,0,0,0.15)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            color: "#333",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = slide.accentColor;
            e.currentTarget.style.color = slide.accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
            e.currentTarget.style.color = "#333";
          }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Progress bar ── */}
      {!paused && (
        <div
          className="absolute bottom-0 inset-x-0 z-20"
          style={{ height: "2px", background: "rgba(0,0,0,0.06)" }}
        >
          <div
            key={`prog-${current}`}
            className="h-full"
            style={{
              background: `linear-gradient(90deg, ${slide.accentColor}, ${slide.accentColor}77)`,
              animation: `hero-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes hero-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Mobile responsive ── */
        @media (max-width: 767px) {
          /* Glass card: full width, bottom on mobile */
          .hero-glass-panel {
            right: 0 !important;
            left: 0 !important;
            top: auto !important;
            bottom: 3.5rem !important;
            transform: none !important;
            width: calc(100% - 2rem) !important;
            margin: 0 1rem !important;
            border-radius: 16px !important;
          }
          /* Chip: hidden on mobile */
          .hero-chip {
            display: none !important;
          }
          /* Slide 1 top-left text — go full width on mobile */
          .hero-text-bottom {
            max-width: 100% !important;
            padding-left: 1.25rem !important;
            padding-top: 1.5rem !important;
          }
        }
      `}</style>
      </div>{/* end slide-container */}
    </section>
  );
}
