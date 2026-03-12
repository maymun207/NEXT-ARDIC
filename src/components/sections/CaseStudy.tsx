// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
import { ArrowRight, Quote } from "lucide-react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import MetricCard from "@/components/ui/MetricCard";
import Button from "@/components/ui/Button";

interface CaseStudyProps {
  dict: Dictionary;
}

export default function CaseStudy({ dict }: CaseStudyProps) {
  const { caseStudy } = dict;

  return (
    <SectionWrapper id="case-study" className="bg-black">
      <SectionHeading
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        light
      />

      {/* Metrics grid */}
      <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {caseStudy.metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            value={metric.value}
            label={metric.label}
          />
        ))}
      </div>

      {/* Challenge / Solution */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 hover:border-red-900/40 transition-colors">
          <h3 className="font-heading text-lg font-bold text-red-500 uppercase tracking-widest">
            Challenge
          </h3>
          <p className="mt-4 leading-relaxed text-neutral-400 font-light">
            {caseStudy.challenge}
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 hover:border-accent/40 transition-colors">
          <h3 className="font-heading text-lg font-bold text-accent uppercase tracking-widest">
            Solution
          </h3>
          <p className="mt-4 leading-relaxed text-neutral-400 font-light">
            {caseStudy.solution}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-12 rounded-3xl bg-neutral-900/60 border border-white/5 p-8 text-white md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Quote className="h-32 w-32" />
        </div>
        <Quote className="mb-6 h-8 w-8 text-accent" />
        <blockquote className="text-xl leading-relaxed italic md:text-2xl font-light text-neutral-200">
          &ldquo;{caseStudy.quote.text}&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-linear-to-tr from-accent to-accent-dark" />
          <div>
            <div className="font-heading font-bold text-white uppercase tracking-wider">
              {caseStudy.quote.author}
            </div>
            <div className="text-sm text-accent/60 font-mono">
              {caseStudy.quote.role}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button variant="primary" size="lg" href="#">
          {caseStudy.cta}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </SectionWrapper>
  );
}
