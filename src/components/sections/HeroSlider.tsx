"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface SlideData {
  id: number;
  badge?: string;
  headline: string;
  subheadline: string;
  ctaPrimary?: { label: string; href: string };
  footerText?: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  bgColor: string;
  imageScale?: number;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    headline: "INTELLIGENCE INTEGRATED",
    subheadline: "Artificial Intelligence of Things",
    footerText: "ARDICTECH 2026",
    image: "/images/H1.jpeg",
    imageAlt: "ARDIC Intelligence Integrated — AIoT Platform",
    accentColor: "#8b5cf6",
    bgColor: "#ffffff",
    imageScale: 0.75,
  },
  {
    id: 1,
    badge: "Manufacturing Intelligence",
    headline: "The Digital Transformation for Manufacturing",
    subheadline:
      "At the center of every high-performing plant is a pulse of data. We provide the AI-native core that pumps real-time insights across your floor.",
    ctaPrimary: {
      label: "See our Demo",
      href: "https://www.ardic.ai/virtual-factory-demo",
    },
    image: "/images/H2-Digital tr .jpeg",
    imageAlt: "Digital Transformation for Manufacturing — industrial intelligence",
    accentColor: "#4a8fdb",
    bgColor: "#ffffff",
  },
  {
    id: 2,
    badge: "Enterprise AI",
    headline: "Enterprise Agentic AI Platform",
    subheadline:
      "Your Data. Your Rules. Your AI. A comprehensive, secure architecture that transforms raw enterprise data into high-value production applications without compromising sovereignty.",
    ctaPrimary: { label: "AI Assessment", href: "#contact" },
    image: "/images/hero3 .jpeg",
    imageAlt: "Enterprise Agentic AI Platform — secure data sovereignty",
    accentColor: "#7c3aed",
    bgColor: "#ffffff",
    imageScale: 0.95,
  },
];

const AUTO_ADVANCE_MS = 6000;

type Direction = "next" | "prev";
type SlideState = "active" | "entering" | "exiting" | "hidden";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>("next");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback(
    (dir: Direction) => {
      if (isTransitioning) return;
      setDirection(dir);
      setIsTransitioning(true);
      setCurrent((c) => {
        setPrev(c);
        return dir === "next"
          ? (c + 1) % SLIDES.length
          : (c - 1 + SLIDES.length) % SLIDES.length;
      });
      setTimeout(() => {
        setPrev(null);
        setIsTransitioning(false);
      }, 550);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev = useCallback(() => navigate("prev"), [navigate]);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning || idx === current) return;
      const dir: Direction =
        idx > current || (idx === 0 && current === SLIDES.length - 1)
          ? "next"
          : "prev";
      setDirection(dir);
      setIsTransitioning(true);
      setPrev(current);
      setCurrent(idx);
      setTimeout(() => {
        setPrev(null);
        setIsTransitioning(false);
      }, 550);
    },
    [isTransitioning, current]
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const getSlideState = (idx: number): SlideState => {
    if (idx === current) return isTransitioning ? "entering" : "active";
    if (idx === prev) return "exiting";
    return "hidden";
  };

  const getTransform = (state: SlideState): string => {
    if (state === "active") return "translateX(0%)";
    if (state === "entering")
      return direction === "next" ? "translateX(110%)" : "translateX(-110%)";
    if (state === "exiting")
      return direction === "next" ? "translateX(-110%)" : "translateX(110%)";
    return direction === "next" ? "translateX(120%)" : "translateX(-120%)";
  };

  const slide = SLIDES[current];

  return (
    <section
      id="hero"
      lang="en"
      className="relative pt-16 flex flex-col justify-start bg-black"
      style={{ overflowX: "hidden" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel"
    >
      {/* Subtle ambient bg lines */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1400 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 400 Q350 200 700 400 Q1050 600 1400 400"
            stroke="#1a4d3a"
            strokeWidth="1.5"
          />
          <path
            d="M0 600 Q400 300 800 500 Q1100 650 1400 420"
            stroke="#00c4a0"
            strokeWidth="0.8"
          />
          <path
            d="M100 100 Q500 350 900 150 Q1200 0 1400 250"
            stroke="#8b5cf6"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <div
        className="relative z-10 w-full pb-0 px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "5vh" }}
      >
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#a0a098]">
            <span className="h-px w-8 bg-[#00c4a0]" />
            ARDICTECH AIoT SERVICES
            <span className="h-px w-8 bg-[#00c4a0]" />
          </span>
        </div>

        {/* Slide stage */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: "1200px", minHeight: "460px", overflow: "visible" }}
        >
          {SLIDES.map((s, idx) => {
            const state = getSlideState(idx);
            const isVisible = state !== "hidden";

            return (
              <div
                key={s.id}
                className="absolute inset-0"
                style={{
                  transform: getTransform(state),
                  transition:
                    isTransitioning || state === "active"
                      ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)"
                      : "none",
                  zIndex:
                    state === "entering"
                      ? 20
                      : state === "exiting"
                      ? 10
                      : state === "active"
                      ? 15
                      : 0,
                  visibility: isVisible ? "visible" : "hidden",
                  pointerEvents: state === "active" ? "auto" : "none",
                }}
              >
                {/* Hover lift wrapper */}
                <div
                  className="h-full w-full"
                  style={{
                    transformOrigin: "center center",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    willChange: "transform",
                  }}
                  onMouseEnter={(e) => {
                    if (state !== "active") return;
                    e.currentTarget.style.transform =
                      "scale(1.04) translateY(-8px)";
                    const card = e.currentTarget.querySelector(
                      ".slide-card"
                    ) as HTMLElement;
                    if (card)
                      card.style.boxShadow =
                        "0 40px 100px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    const card = e.currentTarget.querySelector(
                      ".slide-card"
                    ) as HTMLElement;
                    if (card)
                      card.style.boxShadow =
                        "0 16px 60px rgba(0,0,0,0.18)";
                  }}
                >
                  <div
                    className="slide-card rounded-3xl overflow-hidden h-full mx-1"
                    style={{
                      boxShadow: "0 16px 60px rgba(0,0,0,0.18)",
                      transition: "box-shadow 0.4s ease",
                    }}
                  >
                    {/* Split: image LEFT (white) | content RIGHT (dark) */}
                    <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] h-full min-h-[440px]">

                      {/* LEFT — image panel */}
                      <div
                        className="relative flex items-center justify-center p-8 lg:p-10"
                        style={{ background: s.bgColor, minHeight: "280px" }}
                      >
                        <div 
                          className="relative w-full h-[300px] lg:h-[360px]"
                          style={s.imageScale ? { transform: `scale(${s.imageScale})` } : undefined}
                        >
                          <Image
                            src={s.image}
                            alt={s.imageAlt}
                            fill
                            className="object-contain"
                            priority={idx === 0}
                          />
                        </div>
                      </div>

                      {/* RIGHT — text content (dark) */}
                      <div
                        className="flex flex-col justify-center p-6 lg:p-8"
                        style={{ background: "#0a0a0a" }}
                      >
                        {/* Badge — optional */}
                        {s.badge && (
                          <div className="self-start mb-3">
                            <div
                              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                              style={{
                                borderColor: `${s.accentColor}40`,
                                color: s.accentColor,
                                background: `${s.accentColor}12`,
                              }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: s.accentColor }}
                              />
                              {s.badge}
                            </div>
                          </div>
                        )}

                        {/* Headline */}
                        <h1
                          className="text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2"
                          style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                          {s.headline}
                        </h1>

                        {/* Accent divider */}
                        <div
                          className="w-10 h-0.5 mb-3 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${s.accentColor}, #c8a96e)`,
                          }}
                        />

                        {/* Subheadline */}
                        <p
                          className="text-[#a0a098] leading-relaxed mb-4 text-base max-w-md"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {s.subheadline}
                        </p>

                        {/* CTA — optional */}
                        {s.ctaPrimary?.label && (
                          <div className="flex items-center gap-2 mt-4">
                            <a
                              href={s.ctaPrimary.href}
                              target={
                                s.ctaPrimary.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                s.ctaPrimary.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5"
                              style={{
                                background: "transparent",
                                border: "1.5px solid rgba(255,255,255,0.25)",
                                whiteSpace: "nowrap",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.border = `1.5px solid ${s.accentColor}`;
                                e.currentTarget.style.color = s.accentColor;
                                e.currentTarget.style.boxShadow = `0 0 16px ${s.accentColor}35`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.border =
                                  "1.5px solid rgba(255,255,255,0.25)";
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              {s.ctaPrimary.label}
                              <svg
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </a>
                          </div>
                        )}

                        {/* Footer text — e.g. "ARDICTECH 2026" on slide 1 */}
                        {s.footerText && (
                          <p
                            className="mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.2em]"
                            style={{
                              color: "rgba(255,255,255,0.25)",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {s.footerText}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation: ← dots → counter */}
        <div
          className="flex items-center justify-center gap-4 mt-5 mx-auto"
          style={{ maxWidth: "1200px" }}
        >
          <button
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.25)",
            }}
            aria-label="Previous slide"
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "1.5px solid #4a8fdb";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(74,143,219,0.2)";
              (
                e.currentTarget.querySelector("svg") as unknown as HTMLElement
              ).style.color = "#4a8fdb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border =
                "1.5px solid rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "none";
              (
                e.currentTarget.querySelector("svg") as unknown as HTMLElement
              ).style.color = "white";
            }}
          >
            <svg
              className="h-3.5 w-3.5"
              style={{ color: "white" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "7px",
                  background:
                    i === current
                      ? slide.accentColor
                      : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.25)",
            }}
            aria-label="Next slide"
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "1.5px solid #4a8fdb";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(74,143,219,0.2)";
              (
                e.currentTarget.querySelector("svg") as unknown as HTMLElement
              ).style.color = "#4a8fdb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border =
                "1.5px solid rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "none";
              (
                e.currentTarget.querySelector("svg") as unknown as HTMLElement
              ).style.color = "white";
            }}
          >
            <svg
              className="h-3.5 w-3.5"
              style={{ color: "white" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <span
            className="text-xs text-[#a0a098]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {current + 1} / {SLIDES.length}
          </span>
        </div>

        {/* Progress bar */}
        {!isPaused && (
          <div className="mt-5 mx-auto" style={{ maxWidth: "1200px" }}>
            <div className="h-0.5 bg-transparent rounded-full overflow-hidden mx-1">
              <div
                key={`prog-${current}`}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${slide.accentColor}, #c8a96e)`,
                  animation: `hero-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                }}
              />
            </div>
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
