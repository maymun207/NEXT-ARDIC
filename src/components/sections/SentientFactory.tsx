"use client";

import type { Dictionary } from "@/types";

interface SentientFactoryProps {
  dict: Dictionary;
}

export default function SentientFactory({ dict }: SentientFactoryProps) {
  const section = (dict as any).sentientFactory;
  if (!section) return null;

  return (
    <section id="sentient-factory" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2
              className="section-heading text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {section.title}
            </h2>
            <p className="text-[#c8a96e] italic text-lg mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
              {section.subtitle}
            </p>
            <div className="accent-line" />
            <p className="text-[#505048] leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              {section.body}
            </p>
            <a
              href="https://www.ardic.ai/virtual-factory-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a4d3a] px-7 py-3 text-sm font-semibold text-white hover:bg-[#256b51] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              {section.cta}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Operational Ensō visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72">
              {/* Outer ring — rotating slowly */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 288 288"
                fill="none"
                style={{ animation: "enso-spin 20s linear infinite" }}
                aria-hidden="true"
              >
                <circle
                  cx="144" cy="144" r="130"
                  stroke="url(#ensoGrad)"
                  strokeWidth="2"
                  strokeDasharray="20 8"
                  opacity="0.4"
                />
                <defs>
                  <linearGradient id="ensoGrad" x1="0" y1="0" x2="288" y2="288">
                    <stop offset="0%" stopColor="#00c4a0" />
                    <stop offset="100%" stopColor="#c8a96e" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Middle ring */}
              <svg
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
                viewBox="0 0 224 224"
                fill="none"
                style={{ animation: "enso-spin 12s linear infinite reverse" }}
                aria-hidden="true"
              >
                <circle cx="112" cy="112" r="100" stroke="#1a4d3a" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
              </svg>

              {/* Center glow orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#1a4d3a] to-[#0f2e22] flex items-center justify-center shadow-2xl animate-node-glow">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>
                      ∞
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-[#00c4a0] font-semibold">
                      Operational<br />Ensō
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting data nodes */}
              {["Collect", "Analyze", "Act", "Learn"].map((label, i) => {
                const angle = (i / 4) * Math.PI * 2;
                const x = 50 + 38 * Math.cos(angle);
                const y = 50 + 38 * Math.sin(angle);
                return (
                  <div
                    key={label}
                    className="absolute text-[10px] font-semibold text-[#1a4d3a] bg-white border border-[#00c4a0]/30 rounded-full px-2 py-0.5 shadow-sm"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes enso-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
