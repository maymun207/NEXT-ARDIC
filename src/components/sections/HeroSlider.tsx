"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface SlideData {
  id: number;
  badge: string;
  headline: string;
  taglines?: string[];
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  image: string;
  imageAlt: string;
  accentColor: string;
  bgColor: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    badge: "The Digital Mycelium of Industry",
    headline: "AIoT - Intelligence Integrated",
    subheadline:
      "At ARDIC, we bring nature's most advanced network structure together with industrial intelligence to build decentralized, living, and learning ecosystems.",
    ctaPrimary: { label: "Explore the Ecosystem", href: "#products" },
    ctaSecondary: { label: "See the Demo", href: "https://www.ardic.ai/virtual-factory-demo" },
    image: "/images/Slide1N.jpeg",
    imageAlt: "Digital Mycelium of Industry — layered platform architecture",
    accentColor: "#4a8fdb",
    bgColor: "#0a0a0a",
  },
  {
    id: 1,
    badge: "Manufacturing Intelligence",
    headline: "What if Machines Could Understand Their Own Data?",
    taglines: [
      "Intelligence is emerging",
      "But It's Fragmented",
      "What is Missing?",
    ],
    subheadline:
      "Bridge the gap between raw industrial data and manufacturing intelligence.",
    ctaPrimary: { label: "Calculate Your ROI", href: "#roi" },
    ctaSecondary: { label: "Case Studies", href: "#case-studies" },
    image: "/images/slide 2 .jpeg",
    imageAlt: "Sentient Factory — AI-powered manufacturing intelligence",
    accentColor: "#c8a96e",
    bgColor: "#0a0a0a",
  },
  {
    id: 2,
    badge: "The Full Platform Stack",
    headline: "The Ecosystem Stack",
    subheadline:
      "Five integrated layers — from secure hardware to sentient AI. Every layer built, owned, and orchestrated by ARDICTECH.",
    ctaPrimary: { label: "Explore the Stack", href: "#products" },
    ctaSecondary: { label: "Our Products", href: "#technologies" },
    image: "/images/Slide3.jpeg",
    imageAlt: "ARDICTECH Ecosystem Stack — 5 integrated platform layers",
    accentColor: "#1a4d3a",
    bgColor: "#0a0a0a",
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
  const [showMyceliumCard, setShowMyceliumCard] = useState(false);
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
      const dir: Direction = idx > current || (idx === 0 && current === SLIDES.length - 1) ? "next" : "prev";
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
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, goNext]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Determine each slide's animation state
  const getSlideState = (idx: number): SlideState => {
    if (idx === current) return isTransitioning ? "entering" : "active";
    if (idx === prev) return "exiting";
    return "hidden";
  };

  const getTransform = (state: SlideState): string => {
    if (state === "active") return "translateX(0%)";
    if (state === "entering") return direction === "next" ? "translateX(110%)" : "translateX(-110%)";
    if (state === "exiting") return direction === "next" ? "translateX(-110%)" : "translateX(110%)";
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

      {/* Subtle bg lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1400 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M0 400 Q350 200 700 400 Q1050 600 1400 400" stroke="#1a4d3a" strokeWidth="1.5"/>
          <path d="M0 600 Q400 300 800 500 Q1100 650 1400 420" stroke="#00c4a0" strokeWidth="0.8"/>
          <path d="M100 100 Q500 350 900 150 Q1200 0 1400 250" stroke="#c8a96e" strokeWidth="0.8"/>
        </svg>
      </div>

      <div className="relative z-10 w-full pb-0 px-4 sm:px-6 lg:px-8" style={{ paddingTop: "5vh" }}>
        {/* Label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#a0a098]">
            <span className="h-px w-8 bg-[#00c4a0]" />
            ARDICTECH AIoT SERVICES
            <span className="h-px w-8 bg-[#00c4a0]" />
          </span>
        </div>

        {/* Slide stage — overflow-visible so hover scale is not clipped */}
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
                  transition: isTransitioning || state === "active" ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)" : "none",
                  zIndex: state === "entering" ? 20 : state === "exiting" ? 10 : state === "active" ? 15 : 0,
                  visibility: isVisible ? "visible" : "hidden",
                  pointerEvents: state === "active" ? "auto" : "none",
                }}
              >
                {/* The slide card — hover lifts and scales via direct DOM */}
                <div
                  className="h-full w-full"
                  style={{
                    transformOrigin: "center center",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    willChange: "transform",
                  }}
                  onMouseEnter={(e) => {
                    if (state !== "active") return;
                    e.currentTarget.style.transform = "scale(1.06) translateY(-10px)";
                    const card = e.currentTarget.querySelector(".slide-card") as HTMLElement;
                    if (card) card.style.boxShadow = "0 40px 120px rgba(26,77,58,0.28)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                    const card = e.currentTarget.querySelector(".slide-card") as HTMLElement;
                    if (card) card.style.boxShadow = "0 16px 60px rgba(26,77,58,0.12)";
                  }}
                >
                  <div
                    className="slide-card rounded-3xl overflow-hidden h-full mx-1"
                    style={{
                      boxShadow: "0 16px 60px rgba(26,77,58,0.12)",
                      transition: "box-shadow 0.4s ease",
                    }}
                  >
                    {/* Split: image LEFT | content RIGHT */}
                    <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] h-full min-h-[440px]">

                      {/* LEFT — image panel */}
                      {idx === 2 ? (
                        /* Slide 3: full-bleed panel, no padding, image fills height */
                        <div
                          className="relative"
                          style={{ background: s.bgColor, minHeight: "440px" }}
                        >
                          {/* Image: full-height, left-aligned so top=0% matches image top */}
                          <div className="absolute" style={{ left: "10%", right: "40%", top: 0, bottom: 0 }}>
                            <Image
                              src={s.image}
                              alt={s.imageAlt}
                              fill
                              className="object-contain object-left"
                            />
                          </div>

                          {/* Layer labels — right 40% of panel, top% = image position */}
                          <div
                            className="absolute top-0 right-0 bottom-0 pointer-events-none"
                            style={{ width: "42%" }}
                          >
                            {[
                              { layer: "Sentient AI",           product: "CWF",        top: "26%" },
                              { layer: "Operational Execution",  product: "ArMES",      top: "42%" },
                              { layer: "Edge & Connectivity",   product: "IoT-Ignite",  top: "56%" },
                              { layer: "MDM",                   product: "MODIVERSE",   top: "68%" },
                              { layer: "Secure Hardware",       product: "PILAROS",     top: "82%" },
                            ].map(({ layer, product, top }) => (
                              <div
                                key={product}
                                className="absolute flex items-center gap-2"
                                style={{ top, transform: "translateY(-50%)" }}
                              >
                                <div className="h-px w-5 flex-shrink-0" style={{ background: "rgba(255,255,255,0.45)" }} />
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.9)", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
                                  {layer}{" "}
                                  <strong style={{ color: "#ffffff", fontWeight: 700 }}>({product})</strong>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Other slides: centered image with padding */
                        <div
                          className="relative flex items-center justify-center p-8 lg:p-10"
                          style={{ background: s.bgColor, minHeight: "280px" }}
                        >
                          <div className="relative w-full h-[300px] lg:h-[360px]">
                            <Image
                              src={s.image}
                              alt={s.imageAlt}
                              fill
                              className="object-contain"
                              priority={idx === 0}
                            />
                          </div>
                        </div>
                      )}

                      {/* RIGHT — content */}
                      <div className="flex flex-col justify-center p-6 lg:p-8" style={{ background: "#0a0a0a" }}>
                        {/* Badge — with mycelium tooltip for slide 0 */}
                        <div className="relative self-start mb-3">
                          <div
                            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest cursor-help"
                            style={{
                              borderColor: `${s.accentColor}40`,
                              color: s.accentColor,
                              background: `${s.accentColor}10`,
                            }}
                            onMouseEnter={() => idx === 0 && setShowMyceliumCard(true)}
                            onMouseLeave={() => setShowMyceliumCard(false)}
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.accentColor }} />
                            {s.badge}
                          </div>

                          {/* Mycelium explanation card — only for slide 0 */}
                          {idx === 0 && showMyceliumCard && (
                            <div
                              className="absolute left-0 top-full mt-3 z-50 w-80 rounded-2xl border border-[#4a8fdb]/20 shadow-2xl"
                              style={{
                                background: "rgba(255,255,255,0.97)",
                                backdropFilter: "blur(12px)",
                                animation: "fadeInCard 0.2s ease",
                              }}
                              onMouseEnter={() => setShowMyceliumCard(true)}
                              onMouseLeave={() => setShowMyceliumCard(false)}
                            >
                              {/* Card header */}
                              <div className="px-5 pt-5 pb-3 border-b border-[#f0f0f0]">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">🍄</span>
                                  <span className="text-xs font-bold uppercase tracking-widest text-[#4a8fdb]">What is Digital Mycelium?</span>
                                </div>
                              </div>
                              {/* Card body — scrollable so nothing is clipped */}
                              <div className="px-5 py-4 space-y-3" style={{ maxHeight: "260px", overflowY: "auto" }}>
                                <p className="text-[13px] text-[#3a3a38] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                  In nature, <strong>mycelium</strong> is the vast underground fungal network that silently connects trees and plants — sharing nutrients, distress signals, and resources across an entire forest ecosystem.
                                </p>
                                <p className="text-[13px] text-[#3a3a38] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                  ARDICTECH's <strong>Digital Mycelium of Industry</strong> mirrors this: an invisible intelligence layer that connects machines, sensors, data streams, and decisions across your factory floor.
                                </p>
                                <p className="text-[13px] text-[#505048] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                                  Just as mycelium enables a forest to act as one living organism — ARDICTECH enables your factory to <em>sense, think, and respond</em> as one, in real time.
                                </p>
                              </div>
                              {/* Bottom tag */}
                              <div className="px-5 pb-4">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#4a8fdb] bg-[#4a8fdb]/8 px-3 py-1 rounded-full">
                                  <span className="h-1 w-1 rounded-full bg-[#4a8fdb]" />
                                  Industrial AI since 2008
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <h1
                          className="text-2xl md:text-3xl xl:text-4xl font-bold text-white leading-tight mb-2"
                          style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                          {s.headline}
                        </h1>

                        <div
                          className="w-10 h-0.5 mb-3 rounded-full"
                          style={{ background: `linear-gradient(90deg, ${s.accentColor}, #c8a96e)` }}
                        />

                        {/* Taglines — only for slides that have them */}
                        {s.taglines && s.taglines.length > 0 && (
                          <div className="mb-3 space-y-0.5">
                            {s.taglines.map((line, i) => (
                              <p
                                key={i}
                                className="text-white font-semibold text-sm leading-relaxed"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        )}

                        <p
                          className="text-[#a0a098] leading-relaxed mb-4 text-sm max-w-md"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {s.subheadline}
                        </p>

                        {/* CTAs row — left-aligned in content panel */}
                        <div className="flex items-center gap-2 mt-4">
                          <a
                            href={s.ctaPrimary.href}
                            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5"
                            style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}
                            onMouseEnter={e => {
                              e.currentTarget.style.border = "1.5px solid #4a8fdb";
                              e.currentTarget.style.color = "#4a8fdb";
                              e.currentTarget.style.boxShadow = "0 0 12px rgba(74,143,219,0.25)";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.25)";
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {s.ctaPrimary.label}
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                          <a
                            href={s.ctaSecondary.href}
                            target={s.ctaSecondary.href.startsWith("http") ? "_blank" : undefined}
                            rel={s.ctaSecondary.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5"
                            style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}
                            onMouseEnter={e => {
                              e.currentTarget.style.border = "1.5px solid #4a8fdb";
                              e.currentTarget.style.color = "#4a8fdb";
                              e.currentTarget.style.boxShadow = "0 0 12px rgba(74,143,219,0.25)";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.25)";
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            {s.ctaSecondary.label}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Below-card nav: ← dots → counter — centered */}
        <div className="flex items-center justify-center gap-4 mt-5 mx-auto" style={{ maxWidth: "1200px" }}>
          <button
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)" }}
            aria-label="Previous slide"
            onMouseEnter={e => {
              e.currentTarget.style.border = "1.5px solid #4a8fdb";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(74,143,219,0.2)";
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = "#4a8fdb";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.25)";
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
                  background: i === current ? slide.accentColor : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)" }}
            aria-label="Next slide"
            onMouseEnter={e => {
              e.currentTarget.style.border = "1.5px solid #4a8fdb";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(74,143,219,0.2)";
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = "#4a8fdb";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.25)";
              e.currentTarget.style.boxShadow = "none";
              (e.currentTarget.querySelector("svg") as unknown as HTMLElement).style.color = "white";
            }}
          >
            <svg className="h-3.5 w-3.5" style={{ color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <span className="text-xs text-[#a0a098]" style={{ fontFamily: "'Inter', sans-serif" }}>
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
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
