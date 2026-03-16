"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/types";

interface HeroProps {
  dict: Dictionary;
  locale: string;
}

export default function MycelliumHero({ dict, locale }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const NODES = 28;
    const nodes = Array.from({ length: NODES }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw threads between nearby nodes
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          if (dist < maxDist) {
            const alpha = ((1 - dist / maxDist) * 0.4);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            // Organic bezier curve
            const mx = (nodes[i].x + nodes[j].x) / 2 + Math.sin(t + i) * 12;
            const my = (nodes[i].y + nodes[j].y) / 2 + Math.cos(t + j) * 12;
            ctx.quadraticCurveTo(mx, my, nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(200, 169, 110, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const glowAlpha = 0.5 + 0.5 * Math.sin(t * 1.5 + n.pulse);
        // Glow ring
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grd.addColorStop(0, `rgba(0, 196, 160, ${glowAlpha * 0.35})`);
        grd.addColorStop(1, "rgba(0, 196, 160, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 ? `rgba(0, 196, 160, ${0.6 + glowAlpha * 0.4})` : `rgba(200, 169, 110, 0.7)`;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const hero = (dict as any).hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafaf8]"
    >
      {/* Mycelium canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(250,250,248,0) 0%, rgba(250,250,248,0.6) 70%, rgba(250,250,248,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#00c4a0]/30 bg-white/80 px-4 py-1.5 text-sm font-medium text-[#1a4d3a] backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="h-2 w-2 rounded-full bg-[#00c4a0] animate-node-glow" />
          {hero?.badge || "Industrial AI Since 2012"}
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold text-[#1c2b2b] leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.15s", fontFamily: "'DM Serif Display', serif" }}
        >
          {hero?.headline || "The Digital Mycelium of Industry"}
        </h1>

        {/* Accent line */}
        <div className="accent-line mx-auto" style={{ animationDelay: "0.25s" }} />

        {/* Sub-headline */}
        <p
          className="text-lg md:text-xl text-[#505048] max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed"
          style={{ animationDelay: "0.3s", fontFamily: "'Inter', sans-serif" }}
        >
          {hero?.subheadline ||
            "The invisible intelligence connecting your machines, data, and decisions."}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href={`/${locale}#products`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a4d3a] px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-[#256b51] transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            {hero?.ctaPrimary || "Explore the Network"}
          </a>
          <a
            href="https://www.ardic.ai/virtual-factory-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1a4d3a]/30 bg-white/80 px-8 py-3.5 text-sm font-semibold text-[#1a4d3a] backdrop-blur-sm hover:bg-white hover:border-[#00c4a0] transition-all duration-200 hover:-translate-y-0.5"
          >
            {hero?.ctaSecondary || "See the Demo"}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-[#a0a098] animate-float" style={{ animationDelay: "0.6s" }}>
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3v14M4 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
