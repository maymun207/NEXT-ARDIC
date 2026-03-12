// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface CWFConversationProps {
  dict: Dictionary;
  locale?: string;
}

export default function CWFConversation({
  dict,
  locale,
}: CWFConversationProps) {
  const { cwf } = dict.architectureDetails;
  const [isExpanded, setIsExpanded] = useState(false);
  const cwfLayer = dict.platform.layers.find((l) => l.id === "cwf");
  const isTr = locale === "tr";

  return (
    <SectionWrapper
      id="cwf-conversation"
      dark
      className="bg-[#020202] py-28! sm:py-32! overflow-hidden relative"
    >
      {/* Dynamic background particles/glows matches Layer 3 */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10 animate-pulse" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold tracking-[0.2em] uppercase">
                {cwfLayer
                  ? `${cwfLayer.number}: ${cwfLayer.metaphor}`
                  : "LAYER 4: THE VOICE"}
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
              {cwf.title.split("|").map((line: string, i: number) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="text-xl text-accent/80 font-medium mb-8 italic tracking-wide">
              {cwf.tagline}
            </p>

            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12 max-w-2xl">
              {cwf.description}
            </p>

            <div className="space-y-6">
              {cwf.points.map((point: any, i: number) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <p className="text-lg leading-relaxed">
                    <span className="font-bold text-[#E879F9]">
                      {point.title}:
                    </span>{" "}
                    <span className="text-neutral-300 font-light">
                      {point.description}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* CWF Ecosystem */}
            <div className="mt-12 pt-10 border-t border-white/10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {cwf.ecosystemTitle}
              </h3>
              <p className="text-neutral-400 font-light text-lg mb-8">
                {cwf.ecosystemDescription}
              </p>
              <Button
                onClick={() => setIsExpanded(true)}
                variant="primary"
                size="lg"
              >
                <Maximize2 className="mr-3 h-5 w-5" />
                {cwf.architectureCta || "Mimarimiz"}
              </Button>
            </div>
          </motion.div>

          {/* Image Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-end"
          >
            {/* Tablet Image - Expand on Hover */}
            <div className="relative w-full lg:w-[115%] max-w-none z-10 mt-16 mr-0 lg:-mr-16 hover:z-60 hover:scale-110 transition-all duration-500 cursor-zoom-in">
              <div className="aspect-4/3 relative">
                <Image
                  src={
                    isTr
                      ? "/images/cwf-conversation-v2-tr.png"
                      : "/images/cwf-conversation-v2.jpg"
                  }
                  alt="CWF: Chat With Your Factory Interface"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {/* Mobile Image - Expand on Hover */}
            <div className="relative w-[88%] -mt-12 mr-auto ml-[3%] md:ml-0 md:-mr-12 z-20 rotate-12 hover:z-60 hover:scale-110 transition-all duration-500 origin-center drop-shadow-2xl cursor-zoom-in">
              <div className="aspect-3/4 relative">
                <Image
                  src={
                    isTr
                      ? "/images/cwf-mobile-tr.png"
                      : "/images/cwf-mobile.jpg"
                  }
                  alt="CWF Mobile Interface"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute top-1/2 -left-10 w-40 h-40 bg-[#E879F9]/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[60px] -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Architecture Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setIsExpanded(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-110"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-[95vw] mt-12 mb-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-2/1 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,209,255,0.2)] bg-[#050505]">
                <Image
                  src="/images/CFW Architecture 2 .jpg"
                  alt="CWF Ecosystem Architecture Diagram"
                  fill
                  priority
                  quality={100}
                  className="object-contain"
                />
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-accent text-lg md:text-2xl font-bold tracking-[0.3em] uppercase">
                  {cwf.ecosystemTitle}
                </h3>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="h-px w-8 md:w-16 bg-accent/30" />
                  <p className="text-neutral-400 text-xs md:text-sm tracking-widest font-light">
                    {cwf.ecosystemDescription}
                  </p>
                  <div className="h-px w-8 md:w-16 bg-accent/30" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </SectionWrapper>
  );
}
