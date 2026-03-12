// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/types";
import Button from "@/components/ui/Button";

interface HeroCarouselProps {
  dict: Dictionary;
}

export default function HeroCarousel({ dict }: HeroCarouselProps) {
  const { hero } = dict;
  const slides = hero.slides || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [slides.length, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentSlide, isTransitioning],
  );

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Carousel"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={
              slide.id === "chat-with-factory"
                ? { transform: "scale(0.7) translateX(38%)" }
                : slide.id === "sentient-factory"
                  ? { transform: "scale(0.7) translateX(23%)" }
                  : slide.id === "intelligent-manufacturing"
                    ? { transform: "scale(0.7) translateX(23%)" }
                    : undefined
            }
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            {/* Gradient Overlay - stronger on mobile for readability */}
            <div
              className={`absolute inset-0 ${
                slide.id === "chat-with-factory"
                  ? "bg-linear-to-r from-black/95 from-0% via-black/85 via-50% to-black/50 sm:via-black/70 sm:via-35% sm:to-transparent sm:to-50%"
                  : "bg-linear-to-r from-black/95 from-0% via-black/90 via-60% to-black/70 sm:via-black/65 sm:via-50% sm:to-transparent"
              }`}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 sm:pt-[17%] lg:px-8">
            <div className="max-w-3xl">
              {/* Headline */}
              <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {slide.headline}
              </h1>

              {/* Subheadline */}
              {slide.subheadline && (
                <p className="mt-3 text-xl font-semibold text-accent sm:mt-4 sm:text-3xl whitespace-pre-line">
                  {slide.subheadline}
                </p>
              )}

              {/* Description */}
              {slide.description && (
                <p className="mt-4 text-sm leading-relaxed text-neutral-200 sm:mt-6 sm:text-lg lg:text-xl whitespace-pre-line">
                  {slide.description}
                </p>
              )}

              {/* CTAs - Moved into flow to prevent overlap */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-Company-chat"))
                  }
                >
                  {slide.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {slide.ctaSecondary && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("coming-soon"))
                    }
                  >
                    {slide.ctaSecondary}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Moved to bottom right to prevent text overlap */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-8 z-30 flex items-center gap-6 sm:left-12 lg:left-16">
          {/* Slide Counter */}
          <div className="hidden items-center gap-4 text-white/40 font-mono text-xs tracking-[0.2em] sm:flex">
            <span className="text-white font-bold">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-px bg-white/20" />
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="group rounded-full border border-white/10 bg-white/5 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-accent/50 disabled:opacity-50"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="group rounded-full border border-white/10 bg-white/5 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-accent/50 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Pause indicator (optional, subtle) */}
      {isPaused && slides.length > 1 && (
        <div className="absolute right-8 top-8 z-30 rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
          Paused
        </div>
      )}
    </section>
  );
}
