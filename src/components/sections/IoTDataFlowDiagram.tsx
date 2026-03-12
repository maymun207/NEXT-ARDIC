"use client";

/**
 * Fully coded IoT Data Flow Diagram
 * Replaces the static PNG to support locale-aware text.
 * Layout: [Nodes/Things] → [Edge Computing / Gateway] → [Cloud]
 */

interface IoTDataFlowDiagramProps {
    locale?: string;
}

export default function IoTDataFlowDiagram({ locale }: IoTDataFlowDiagramProps) {
    const isTr = locale === "tr";

    const labels = {
        nodesTitle: isTr ? "Düğümler/Cihazlar" : "Nodes/Things",
        edgeTitle: isTr ? "Uç Hesaplama" : "Edge Computing",
        gateway: isTr ? "Ağ Geçidi" : "Gateway",
        cloud: isTr ? "Bulut" : "Cloud",
        pressureSensor: isTr ? "Basınç Sensörü" : "Pressure Sensor",
        temperature: isTr ? "Sıcaklık" : "Temperature",
        vibration: isTr ? "Titreşim" : "Vibration",
        heavyMotors: isTr ? "Ağır Motorlar" : "Heavy Motors",
    };

    return (
        <div className="relative w-full aspect-[4/3] bg-[#080810] rounded-2xl border border-white/10 overflow-hidden select-none p-4 sm:p-6 md:p-8">
            {/* Circuit background pattern */}
            <div className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,209,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,209,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[60px]" />

            {/* Column headers */}
            <div className="relative flex items-start justify-between mb-4 sm:mb-6 px-2">
                <h3 className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wider w-[30%]">
                    {labels.nodesTitle}
                </h3>
                <h3 className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wider w-[30%] text-center">
                    {labels.edgeTitle}
                </h3>
                <h3 className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wider w-[20%] text-center" />
            </div>

            {/* Main flow layout */}
            <div className="relative flex items-center justify-between gap-2 sm:gap-4 h-[calc(100%-3rem)]">

                {/* ─── Column 1: Nodes/Things ─── */}
                <div className="relative flex flex-col items-center justify-center gap-3 sm:gap-4 w-[28%] h-full py-4 border border-accent/20 rounded-2xl bg-black/40">
                    {/* Sensor items */}
                    {[
                        { icon: "💡", label: labels.pressureSensor },
                        { icon: "🌡️", label: labels.temperature },
                        { icon: "〰️", label: labels.vibration },
                    ].map((sensor, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4">
                            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-sm sm:text-base shrink-0">
                                {sensor.icon}
                            </div>
                            <span className="text-white text-[10px] sm:text-xs font-medium leading-tight">
                                {sensor.label}
                            </span>
                        </div>
                    ))}

                    {/* Heavy Motors at bottom */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 mt-2">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-sm sm:text-base shrink-0">
                            ⚙️
                        </div>
                        <span className="text-white text-[10px] sm:text-xs font-medium leading-tight">
                            {labels.heavyMotors}
                        </span>
                    </div>
                </div>

                {/* ─── Arrow 1: Nodes → Edge ─── */}
                <div className="flex items-center shrink-0">
                    <svg width="40" height="24" viewBox="0 0 40 24" className="text-accent w-8 sm:w-10">
                        <defs>
                            <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <rect x="0" y="9" width="28" height="6" rx="3" fill="url(#arrowGrad1)" />
                        <polygon points="28,4 40,12 28,20" fill="currentColor" />
                    </svg>
                </div>

                {/* ─── Column 2: Edge Computing / Gateway ─── */}
                <div className="relative flex flex-col items-center justify-center gap-3 sm:gap-4 w-[26%] h-full py-4">
                    {/* Gateway title */}
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-accent/40 bg-accent/10">
                        <span className="text-accent font-bold text-[11px] sm:text-sm tracking-wider">
                            {labels.gateway}
                        </span>
                    </div>

                    {/* IoT-Ignite Agent box */}
                    <div className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-white/20 bg-[#111828]">
                        <p className="text-white text-[10px] sm:text-xs font-bold text-center leading-tight">
                            IoT-Ignite<br />Agent
                        </p>
                    </div>

                    {/* IoT-Ignite API box */}
                    <div className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-white/20 bg-[#111828]">
                        <p className="text-white text-[10px] sm:text-xs font-bold text-center leading-tight">
                            IoT-Ignite<br />API
                        </p>
                    </div>
                </div>

                {/* ─── Arrow 2: Edge → Cloud ─── */}
                <div className="flex items-center shrink-0">
                    <svg width="40" height="24" viewBox="0 0 40 24" className="text-purple-400 w-8 sm:w-10">
                        <defs>
                            <linearGradient id="arrowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <rect x="0" y="9" width="28" height="6" rx="3" fill="url(#arrowGrad2)" />
                        <polygon points="28,4 40,12 28,20" fill="currentColor" />
                    </svg>
                </div>

                {/* ─── Column 3: Cloud ─── */}
                <div className="relative flex flex-col items-center justify-center w-[22%]">
                    {/* Cloud icon with glow */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-[30px] scale-150" />
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-purple-400/40 bg-purple-900/20 flex items-center justify-center">
                            <div className="text-3xl sm:text-5xl">🌐</div>
                        </div>
                    </div>

                    <p className="mt-3 text-white font-bold text-xs sm:text-sm tracking-wider text-center">
                        {labels.cloud}
                    </p>
                </div>
            </div>
        </div>
    );
}
