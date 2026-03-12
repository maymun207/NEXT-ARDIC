import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-neutral-900/40 border border-white/5 p-8 lg:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <Quote className="h-24 w-24" />
      </div>
      <Quote className="mb-6 h-10 w-10 text-accent/40 group-hover:text-accent/80 transition-colors" />
      <blockquote className="flex-1 text-xl leading-relaxed text-neutral-200 font-light italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-8 border-t border-white/5 pt-6">
        <div className="font-heading text-lg font-bold text-white uppercase tracking-wider">{name}</div>
        <div className="text-sm text-accent/60 font-mono mt-1">
          {role} @ {company}
        </div>
      </div>
    </div>
  );
}
