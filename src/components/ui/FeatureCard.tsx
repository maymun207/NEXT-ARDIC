import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-500 hover:border-accent/40 hover:bg-neutral-900/60 hover:-translate-y-1 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/5 text-accent border border-accent/20 transition-all duration-500 group-hover:bg-accent group-hover:text-black">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-bold text-white transition-colors">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-400 font-light transition-colors group-hover:text-neutral-300">{description}</p>
    </div>
  );
}
