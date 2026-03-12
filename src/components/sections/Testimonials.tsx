// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";

interface TestimonialsProps {
  dict: Dictionary;
}

export default function Testimonials({ dict }: TestimonialsProps) {
  const { testimonials } = dict;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.items.length;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        title={testimonials.title}
        subtitle={testimonials.subtitle}
      />

      <div
        className="relative mt-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.items.map((item) => (
              <div key={item.name} className="w-full shrink-0 px-4">
                <div className="mx-auto max-w-2xl">
                  <TestimonialCard
                    quote={item.quote}
                    name={item.name}
                    role={item.role}
                    company={item.company}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-neutral-50"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-700" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-neutral-50"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-neutral-700" />
        </button>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.items.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-secondary"
                  : "w-2.5 bg-neutral-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
