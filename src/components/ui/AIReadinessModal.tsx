"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface AIReadinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  {
    id: "data-collection",
    question: "How is your operational data currently collected?",
    options: [
      { label: "Manually (Spreadsheets, Clipboards, End-of-shift reports)", value: "manual", score: 1 },
      { label: "Automated but Siloed (Different systems that don't talk)", value: "siloed", score: 2 },
      { label: "Fully Integrated & Real-Time (Unified data pipeline)", value: "integrated", score: 3 },
    ],
  },
  {
    id: "maintenance",
    question: "How would you describe your current maintenance strategy?",
    options: [
      { label: "Reactive (Run-to-failure)", value: "reactive", score: 1 },
      { label: "Preventive (Calendar/Usage-based schedules)", value: "preventive", score: 2 },
      { label: "Predictive/AI-Driven (Condition-based real-time alerts)", value: "predictive", score: 3 },
    ],
  },
  {
    id: "visibility",
    question: "Do you have centralized, real-time visibility into your production metrics?",
    options: [
      { label: "No (We rely on historical reporting)", value: "no", score: 1 },
      { label: "Partially (Some lines or facilities only)", value: "partial", score: 2 },
      { label: "Yes (Multi-site, unified digital twin visibility)", value: "yes", score: 3 },
    ],
  },
  {
    id: "workforce",
    question: "Is your workforce equipped with mobile access to machine telemetry and alerts?",
    options: [
      { label: "No (Tied to physical terminals or HMIs)", value: "no", score: 1 },
      { label: "In Pilot Phase (Testing on a small scale)", value: "pilot", score: 2 },
      { label: "Yes, Enterprise-wide (Mobile, WhatsApp, ARDY Copilot)", value: "yes", score: 3 },
    ],
  },
];

export function AIReadinessModal({ isOpen, onClose }: AIReadinessModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentStep(0);
      setAnswers({});
      setIsCalculating(false);
      setShowResult(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) window.addEventListener("keydown", handleEsc);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSelectOption = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setShowResult(true);
      }, 2000);
    }
  };

  const calculateTotalScore = () => {
    const total = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    const maxPossibile = QUESTIONS.length * 3;
    const percentage = Math.round((total / maxPossibile) * 100);

    if (percentage <= 45) return { maturity: "Foundational", text: "You have massive opportunities to modernize your data stack. Start with Pillar 1." };
    if (percentage <= 75) return { maturity: "Intermediate", text: "You have a solid base. Now it's time to layer in AI and predictive analytics." };
    return { maturity: "Advanced", text: "You are highly mature! Let's focus on autonomous operations and continuous optimization." };
  };

  if (!mounted) return null;

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
            style={{
              position: "relative",
              width: "90%",
              maxWidth: "600px",
              background: "#ffffff",
              borderRadius: "24px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "1.5rem 2rem",
              background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, fontFamily: "'DM Serif Display', serif", letterSpacing: "0.02em" }}>
                  AI Readiness Assessment
                </h3>
                {!isCalculating && !showResult && (
                  <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif" }}>
                    Step {currentStep + 1} of {QUESTIONS.length}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  color: "#fff",
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
            </div>

            {/* Progress Bar */}
            {!isCalculating && !showResult && (
              <div style={{ width: "100%", height: "4px", background: "rgba(0,0,0,0.05)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
                  style={{ height: "100%", background: "#438ca8" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Content Area */}
            <div style={{ padding: "2.5rem 2rem", minHeight: "350px", position: "relative" }}>
              
              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="calculating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minHeight: "270px"
                    }}
                  >
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: "4px solid rgba(0,0,0,0.05)",
                      borderTopColor: "#438ca8",
                      animation: "spin 1s linear infinite",
                      marginBottom: "1.5rem"
                    }} />
                    <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
                      Analyzing Data Infrastructure...
                    </h4>
                    <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.95rem" }}>Generating your readiness profile</p>
                    <style dangerouslySetInnerHTML={{__html: `
                      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    `}} />
                  </motion.div>
                ) : showResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center" }}
                  >
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(67, 140, 168, 0.1)",
                      color: "#438ca8",
                      padding: "0.5rem 1rem",
                      borderRadius: "999px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "1.5rem"
                    }}>
                      Assessment Complete
                    </div>
                    
                    <h2 style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "2.5rem",
                      margin: "0 0 0.5rem",
                      color: "#050505"
                    }}>
                      {calculateTotalScore().maturity} <span style={{color: "#438ca8"}}>Maturity</span>
                    </h2>
                    
                    <p style={{
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      color: "rgba(0,0,0,0.6)",
                      marginBottom: "2.5rem"
                    }}>
                      {calculateTotalScore().text}
                    </p>

                    <div style={{
                      background: "#f9f9fa",
                      padding: "2rem",
                      borderRadius: "16px",
                      border: "1px solid rgba(0,0,0,0.05)"
                    }}>
                      <h4 style={{ margin: "0 0 1rem", fontSize: "1.1rem", fontFamily: "'Inter', sans-serif" }}>Get Your Detailed Deployment Roadmap</h4>
                      <input 
                        type="email" 
                        placeholder="Enter your work email" 
                        style={{
                          width: "100%",
                          padding: "1rem 1.25rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(0,0,0,0.1)",
                          fontSize: "1rem",
                          marginBottom: "1rem",
                          outline: "none",
                        }}
                        onFocus={(e) => e.target.style.borderColor = "#438ca8"}
                        onBlur={(e) => e.target.style.borderColor = "rgba(0,0,0,0.1)"}
                      />
                      <button style={{
                        width: "100%",
                        padding: "1rem",
                        background: "#050505",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#222"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#050505"}
                      onClick={onClose}
                      >
                        VIEW FULL REPORT
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.8rem",
                      lineHeight: 1.3,
                      color: "#050505",
                      marginBottom: "2rem"
                    }}>
                      {QUESTIONS[currentStep].question}
                    </h2>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {QUESTIONS[currentStep].options.map((opt, idx) => {
                        const isSelected = answers[QUESTIONS[currentStep].id] === opt.score;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(QUESTIONS[currentStep].id, opt.score)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              padding: "1.25rem 1.5rem",
                              background: isSelected ? "rgba(67, 140, 168, 0.08)" : "#ffffff",
                              border: `1.5px solid ${isSelected ? "#438ca8" : "rgba(0,0,0,0.08)"}`,
                              borderRadius: "12px",
                              textAlign: "left",
                              cursor: "pointer",
                              transition: "all 0.2s",
                              transform: isSelected ? "scale(0.99)" : "scale(1)",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                            }}
                          >
                            <span style={{ 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              width: "24px", 
                              height: "24px", 
                              borderRadius: "50%", 
                              border: `2px solid ${isSelected ? "#438ca8" : "rgba(0,0,0,0.2)"}`,
                              marginRight: "1rem",
                              flexShrink: 0
                            }}>
                              {isSelected && <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#438ca8" }} />}
                            </span>
                            <span style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "1rem",
                              lineHeight: 1.4,
                              color: isSelected ? "#050505" : "rgba(0,0,0,0.7)",
                              fontWeight: isSelected ? 600 : 400
                            }}>
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
