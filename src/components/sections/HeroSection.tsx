"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Dictionary } from "@/types";

interface Slide {
  id: number;
  image: string;
  imageAlt: string;
  objectFit?: "cover" | "contain";
  overlay?: string;
  layout?: "default" | "centered";
  headline: string;
  subheadline: string;
  taglines?: string[];
  features?: string[];
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  accentColor: string;
}


const AUTO_ADVANCE_MS = 6000;

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const h = dict.heroSlider;

  const SLIDES: Slide[] = [
    {
      id: 0,
      image: "/images/LOGO AI ARDIC.jpeg",
      imageAlt: "ARDIC AI Logo",
      objectFit: "contain",
      overlay: "rgba(0,0,0,0.58)",
      layout: "centered",
      headline: h.slide1.headline,
      subheadline: h.slide1.subheadline,
      accentColor: "#4a8fdb",
    },
    {
      id: 1,
      image: "/images/Heart of Factory .jpeg",
      imageAlt: "Heart of Factory",
      objectFit: "contain",
      headline: h.slide2.headline,
      subheadline: h.slide2.subheadline,
      features: [h.slide2.feature1, h.slide2.feature2],
      accentColor: "#c8a96e",
    },
    {
      id: 2,
      image: "/images/Transformation Bridge .jpeg",
      imageAlt: "Transformation Bridge",
      headline: h.slide3.headline,
      subheadline: h.slide3.subheadline,
      accentColor: "#00c4a0",
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
      setTimeout(() => { setPrev(null); setTransitioning(false); }, 600);
    },
    [transitioning]
  );

  const goNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev = useCallback(() => navigate("prev"), [navigate]);
  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return;
      const d = idx > current ? "next" : "prev";
      setDir(d);
      setTransitioning(true);
      setPrev(current);
      setCurrent(idx);
      setTimeout(() => { setPrev(null); setTransitioning(false); }, 600);
    },
    [transitioning, current]
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [current, paused, goNext]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goNext, goPrev]);

  const slide = SLIDES[current];

  const getTransform = (idx: number) => {
    if (idx === current) return "translateX(0%)";
    if (idx === prev) return dir === "next" ? "translateX(-100%)" : "translateX(100%)";
    return dir === "next" ? "translateX(100%)" : "translateX(-100%)";
  };
  const getTransition = (idx: number) =>
    idx === current || idx === prev ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none";

  return (
    <section
      id="hero"
      lang="en"
      aria-label="Hero"
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: "100vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-screen">
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
              {/* Background — always full-bleed; centered slides use object-contain */}
              {s.image ? (
                <div className="absolute inset-0">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    style={{
                      objectFit: s.objectFit ?? "cover",
                      objectPosition: "center",
                      mixBlendMode: s.layout === "centered" ? "screen" : "normal",
                    }}
                    priority={idx === 0}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: s.overlay ?? "linear-gradient(to right, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.3) 100%)",
                    }}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[#0a0a0a]" />
              )}

              {/* ── CENTERED layout: text centered over the full-bleed image ── */}
              {s.layout === "centered" && (
                <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-[15%]">
                  {s.headline && (
                    <h1
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      {s.headline}
                    </h1>
                  )}
                  {s.subheadline && (
                    <p
                      className="text-xl sm:text-2xl lg:text-3xl font-light"
                      style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}
                    >
                      {s.subheadline}
                    </p>
                  )}
                </div>
              )}

              {/* ── DEFAULT layout ───────────────────────────────────── */}
              {s.layout !== "centered" && (
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 sm:px-16 lg:px-28 max-w-3xl">
                    <div className="w-12 h-0.5 mb-6 rounded-full" style={{ background: s.accentColor }} />
                    {s.headline && (
                      <h1
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
                        style={{ fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.01em" }}
                      >
                        {s.headline}
                      </h1>
                    )}
                    {s.taglines && s.taglines.length > 0 && (
                      <div className="mb-4 space-y-1">
                        {s.taglines.map((line, i) => (
                          <p key={i} className="text-white font-semibold text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                    {s.subheadline && (
                      <p
                        className="text-lg sm:text-xl font-light leading-relaxed mb-6"
                        style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)", letterSpacing: "0.02em" }}
                      >
                        {s.subheadline}
                      </p>
                    )}
                    {s.features && s.features.length > 0 && (
                      <div className="mb-8 space-y-3 max-w-xs">
                        {s.features.filter((_,i) => i > 0).map((feat, i) => (
                          <div
                            key={i}
                            className="rounded-xl px-5 py-4"
                            style={{
                              border: "1px solid rgba(255,255,255,0.2)",
                              background: "rgba(255,255,255,0.05)",
                              backdropFilter: "blur(8px)",
                              fontFamily: "'Inter', sans-serif",
                              color: "rgba(255,255,255,0.9)",
                              fontSize: "0.875rem",
                              fontWeight: "400",
                              lineHeight: "1.6",
                            }}
                          >
                            {feat}
                          </div>
                        ))}
                      </div>
                    )}
                    {(s.ctaPrimary || s.ctaSecondary) && (
                      <div className="flex flex-wrap gap-4">
                        {s.ctaPrimary && (
                          <a
                            href={s.ctaPrimary.href}
                            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5"
                            style={{ border: `1.5px solid ${s.accentColor}` }}
                            onMouseEnter={e => { e.currentTarget.style.background = s.accentColor; e.currentTarget.style.boxShadow = `0 0 24px ${s.accentColor}55`; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
                          >
                            {s.ctaPrimary.label}
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                        {s.ctaSecondary && (
                          <a
                            href={s.ctaSecondary.href}
                            target={s.ctaSecondary.href.startsWith("http") ? "_blank" : undefined}
                            rel={s.ctaSecondary.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5"
                            style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                          >
                            {s.ctaSecondary.label}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Feature[0] — text sits on the factory plate bottom-right ── */}
              {s.layout !== "centered" && s.features && s.features[0] && (
                <div
                  className="absolute"
                  style={{
                    bottom: "26%",
                    left: "31%",
                    width: "38%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 2.5rem",
                    zIndex: 20,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "#d4b578",
                      fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
                      fontWeight: "600",
                      lineHeight: "1.5",
                      letterSpacing: "0.02em",
                      textAlign: "center",
                    }}
                  >
                    {s.features[0]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom nav ──────────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-20">
        <div className="flex items-center gap-5">
          <button
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
            aria-label="Previous slide"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = slide.accentColor;
              e.currentTarget.style.boxShadow = `0 0 12px ${slide.accentColor}55`;
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = slide.accentColor;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.boxShadow = "none";
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = "white";
            }}
          >
            <svg className="h-3.5 w-3.5" style={{ color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "7px",
                  background: i === current ? slide.accentColor : "rgba(255,255,255,0.35)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
            aria-label="Next slide"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = slide.accentColor;
              e.currentTarget.style.boxShadow = `0 0 12px ${slide.accentColor}55`;
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = slide.accentColor;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.boxShadow = "none";
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = "white";
            }}
          >
            <svg className="h-3.5 w-3.5" style={{ color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <span className="text-xs text-white/40 ml-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            {current + 1} / {SLIDES.length}
          </span>
        </div>

        {!paused && (
          <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
            <div
              key={`prog-${current}`}
              className="h-full rounded-full"
              style={{ background: slide.accentColor, animation: `hero-progress ${AUTO_ADVANCE_MS}ms linear forwards` }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes hero-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
