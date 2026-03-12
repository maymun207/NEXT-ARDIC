"use client";

/**
 * Fully coded ArMES Digital Passport Flow Diagram
 * Replaces the static JPEG to support locale-aware text.
 * Layout: [Raw Mat] → [Production] → [Quality Gating] → [Finished Good]
 *              ↑ Digital Passport (top center) ↑
 *         Orchestration (btm left)   Traceability (btm right)
 */

interface ArMESDigitalPassportDiagramProps {
  locale?: string;
}

export default function ArMESDigitalPassportDiagram({
  locale,
}: ArMESDigitalPassportDiagramProps) {
  const isTr = locale === "tr";

  const labels = {
    digitalPassport: isTr ? "Dijital Pasaport" : "Digital Passport",
    rawMaterial: isTr ? "Hammadde" : "Raw Material",
    production: isTr ? "Üretim:" : "Production:",
    productionSub: isTr ? "Dijital Reçete Kontrolü" : "Digital Recipe Control",
    qualityGating: isTr ? "Kalite Kapısı:" : "Quality Gating:",
    qualityGatingSub: isTr ? "Labla Entegre Kontrol" : "Lab-Integrated Gating",
    finishedGood: isTr ? "Mamul Ürün:" : "Finished Good:",
    finishedGoodSub: isTr
      ? "Birim Düzeyinde İzlenebilirlik"
      : "Unit-Level Traceability",
    orchestration: isTr ? "Orkestrasyon:" : "Orchestration:",
    orchestrationDesc: isTr
      ? "ERP'den sipariş çeker, durumu canlı geri gönderir."
      : "Pulls orders from ERP, sends live status back.",
    traceability: isTr ? "İzlenebilirlik:" : "Traceability:",
    traceabilityDesc: isTr
      ? "Dijital Ürün Pasaportu uyumluluğu için birim düzeyinde takip."
      : "Unit-level tracking for Digital Product Passport compliance.",
  };

  const stages = [
    { icon: "🏭", title: labels.rawMaterial, sub: null },
    { icon: "📋", title: labels.production, sub: labels.productionSub },
    { icon: "🛡️", title: labels.qualityGating, sub: labels.qualityGatingSub },
    { icon: "📦", title: labels.finishedGood, sub: labels.finishedGoodSub },
  ];

  return (
    <div className="relative w-full aspect-16/10 bg-[#0a0a14] rounded-2xl border border-white/10 overflow-hidden select-none p-4 sm:p-6 md:p-8">
      {/* Circuit background */}
      <div
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage: `
                        linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)
                    `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-purple-500/8 rounded-full blur-[80px]" />

      {/* Digital Passport header */}
      <div className="relative flex justify-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-purple-400/30 bg-purple-900/20 backdrop-blur-sm">
          <div className="text-lg sm:text-2xl">📱</div>
          <span className="text-white font-bold text-sm sm:text-lg tracking-wider">
            {labels.digitalPassport}
          </span>
        </div>
      </div>

      {/* Connection line from passport to stages */}
      <div className="relative flex justify-center mb-2 sm:mb-4">
        <div className="w-px h-4 sm:h-6 bg-linear-to-b from-purple-400/60 to-transparent" />
      </div>

      {/* Stage cards row */}
      <div className="relative flex items-stretch justify-between gap-2 sm:gap-4 mb-4 sm:mb-8 px-1">
        {stages.map((stage, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            {/* Connector line between stages */}
            {i < stages.length - 1 && (
              <div className="absolute top-1/2 -right-1 sm:-right-2 w-2 sm:w-4 h-px bg-linear-to-r from-purple-400/60 to-accent/40 z-10" />
            )}

            <div className="w-full p-2 sm:p-4 rounded-xl border border-white/10 bg-white/3 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 border border-purple-400/20 flex items-center justify-center mb-2 sm:mb-3 text-base sm:text-2xl">
                {stage.icon}
              </div>

              {/* Title */}
              <p className="text-white font-bold text-[9px] sm:text-xs md:text-sm leading-tight">
                {stage.title}
              </p>

              {/* Subtitle */}
              {stage.sub && (
                <p className="text-neutral-400 text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 leading-tight">
                  {stage.sub}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom descriptions */}
      <div className="relative flex justify-between gap-4 sm:gap-8 px-1">
        {/* Orchestration */}
        <div className="flex-1">
          <p className="text-white text-[9px] sm:text-xs md:text-sm leading-relaxed">
            <span className="font-bold">{labels.orchestration}</span>{" "}
            <span className="text-neutral-400">{labels.orchestrationDesc}</span>
          </p>
        </div>

        {/* Traceability */}
        <div className="flex-1 text-right">
          <p className="text-white text-[9px] sm:text-xs md:text-sm leading-relaxed">
            <span className="font-bold">{labels.traceability}</span>{" "}
            <span className="text-neutral-400">{labels.traceabilityDesc}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
