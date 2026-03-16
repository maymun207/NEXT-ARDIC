import type { Dictionary } from "@/types";

interface NetworkFlowProps {
  dict: Dictionary;
}

export default function NetworkFlow({ dict }: NetworkFlowProps) {
  const section = (dict as any).networkFlow;
  if (!section) return null;

  return (
    <section id="how-it-works" className="py-24 bg-[#1a4d3a] overflow-hidden relative">
      {/* Background mycelium SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 1200 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M0 250 Q200 100 400 250 Q600 400 800 250 Q1000 100 1200 250" className="mycelium-thread" style={{ animationDelay: "0s" }} />
        <path d="M0 350 Q300 150 600 300 Q900 450 1200 200" className="mycelium-thread" style={{ animationDelay: "1s" }} />
        <path d="M100 50 Q400 300 700 100 Q900 0 1100 200" className="mycelium-thread" style={{ animationDelay: "1.5s" }} />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            {section.title}
          </h2>
          <div className="w-12 h-0.5 bg-[#00c4a0] mx-auto mb-4" />
          <p className="text-[#c8a96e] text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
            {section.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#00c4a0] to-[#c8a96e] z-0" />

          {section.steps?.map((step: any, idx: number) => (
            <div
              key={idx}
              className="relative z-10 text-center"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Step number */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00c4a0] bg-[#0f2e22] animate-node-glow">
                <span className="text-xl font-bold text-[#00c4a0]">{step.number}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {step.title}
              </h3>

              {/* Platform badge */}
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#c8a96e] bg-[#c8a96e]/10 px-3 py-1 rounded-full">
                {step.platform}
              </span>

              {/* Description */}
              <p className="text-[#ffffff]/70 text-sm leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
