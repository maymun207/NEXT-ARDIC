"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface SubServiceData {
  id: string;
  title: string;
  modalTitle?: string;
  tagline: string;
  modalTagline?: string;
  description: string;
  bullets: string[];
  accent: string;
  buttons?: string[];
  image?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  imagePadding?: string;
  imageBlend?: boolean;
  imageScale?: number;
  imageTranslateY?: string;
  imageHideTopText?: boolean;
}

interface SubServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: SubServiceData | null;
}

export function SubServiceModal({ isOpen, onClose, service }: SubServiceModalProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen || expandedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expandedImage) setExpandedImage(null);
        else onClose();
      }
    };
    
    if (isOpen) window.addEventListener("keydown", handleEsc);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!service || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col md:flex-row shadow-2xl relative w-[95%] md:w-[90%] max-w-[1000px] h-[85vh] md:h-[600px] bg-[#050505] rounded-[24px] md:rounded-[32px] overflow-hidden"
          >
            {/* ── LEFT SIDE: IMAGE ── */}
            {service.image && (
              <div className="w-full md:w-[45%] h-[200px] md:h-full relative flex-shrink-0 bg-[#050505]">
                <Image
                   src={service.image}
                   alt={service.title}
                   fill
                   style={{ 
                     objectFit: service.imageFit || "contain", 
                     objectPosition: service.imagePosition || "center",
                     padding: service.imagePadding || "1rem",
                     transform: `scale(${service.imageScale || 1}) translateY(${service.imageTranslateY || "0"})`
                   }}
                />
                
                {service.imageHideTopText && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "15%",
                    background: "#050505",
                    zIndex: 5
                  }} />
                )}
                
                {service.imageBlend !== false && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(5,5,5,1) 100%)",
                    pointerEvents: "none"
                  }} />
                )}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  boxShadow: "inset 0 0 40px rgba(5,5,5,0.8)",
                  pointerEvents: "none"
                }} />
                
                {/* ── IMAGE EXPAND BUTTON ── */}
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedImage(service.image!); }}
                  style={{
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "1.5rem",
                    zIndex: 20,
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    cursor: "pointer",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = service.accent;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  title="Expand Image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* ── RIGHT SIDE: CONTENT ── */}
            <div className={`w-full ${service.image ? "md:w-[55%]" : ""} flex flex-col h-full relative bg-[#ffffff] rounded-t-[32px] md:rounded-t-none md:rounded-l-[32px] shadow-[-20px_0_50px_rgba(0,0,0,0.9)] border-t md:border-t-0 md:border-l border-black/10 z-10 overflow-hidden`}>
              
              {/* Close Button (Absolute Top Right) */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  zIndex: 50,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div style={{
                padding: "2rem 2.5rem",
                background: `linear-gradient(135deg, #050505 0%, #1a1a1a 100%)`,
                color: "#ffffff",
                flexShrink: 0
              }}>
                <span style={{ 
                  display: "inline-block",
                  padding: "0.35rem 0.85rem", 
                  background: `${service.accent}30`, 
                  color: service.accent,
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  marginBottom: "1rem"
                }}>
                  PLATFORM CAPABILITY
                </span>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem", fontWeight: 700, fontFamily: "'DM Serif Display', serif", lineHeight: 1.15, paddingRight: "2rem" }}>
                  {service.modalTitle || service.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", fontFamily: "'Inter', sans-serif" }}>
                  {service.modalTagline || service.tagline}
                </p>
              </div>

              {/* Scrollable Body */}
              <div style={{ padding: "2.5rem", overflowY: "auto", fontFamily: "'Inter', sans-serif", flex: 1, background: "#ffffff" }}>
                <p style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "rgba(0,0,0,0.75)",
                  marginBottom: "2rem"
                }}>
                  {service.description}
                </p>

                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#050505", marginBottom: "1rem" }}>
                  Core Features
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {service.bullets.map((b, bi) => (
                    <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                      <span style={{ 
                        flexShrink: 0, marginTop: "0.45rem", width: "8px", height: "8px", 
                        borderRadius: "50%", background: service.accent, boxShadow: `0 0 8px ${service.accent}80`
                      }} />
                      <span style={{ color: "rgba(0,0,0,0.8)", fontSize: "1rem", lineHeight: 1.5, fontWeight: 500 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies / Associated Products */}
                {service.buttons && service.buttons.length > 0 && (
                  <div style={{
                    background: "#f9f9fa",
                    padding: "1.5rem",
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.05)",
                    marginTop: "2rem",
                  }}>
                    <h4 style={{ margin: "0 0 1rem", fontSize: "0.9rem", fontWeight: 700, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Powered By
                    </h4>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {service.buttons.map((btnText: string) => (
                        <span key={btnText} style={{
                          padding: "0.5rem 1rem", 
                          background: `${service.accent}12`, 
                          border: `1px solid ${service.accent}25`,
                          borderRadius: "8px", 
                          color: service.accent, 
                          fontSize: "0.8rem", 
                          fontWeight: 800, 
                          letterSpacing: "0.08em"
                        }}>
                          {btnText}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer CTA */}
              <div style={{
                padding: "1.5rem 2.5rem",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                justifyContent: "flex-end",
                background: "#fafafa",
                flexShrink: 0
              }}>
                <button 
                  onClick={onClose}
                  style={{
                    padding: "0.85rem 2rem",
                    background: "#050505",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = service.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#050505";
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* ── EXPANDED IMAGE OVERLAY ── */}
          <AnimatePresence>
            {expandedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedImage(null)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 99999, // Way above everything
                  background: "rgba(0,0,0,0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "zoom-out"
                }}
              >
                <button
                  onClick={() => setExpandedImage(null)}
                  style={{
                    position: "absolute",
                    top: "2vw",
                    right: "2vw",
                    zIndex: 100000,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div style={{ position: "relative", width: "90vw", height: "90vh" }}>
                  <Image
                    src={expandedImage}
                    alt="Expanded view"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
