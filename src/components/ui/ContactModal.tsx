"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle,
  Building2,
  User,
  Mail,
  Phone,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CONTACT_API_ENDPOINT } from "@/lib/constants";
import { getFingerprint } from "@/hooks/useTracking";
import { Params } from "@/lib/Params";

interface ContactModalDict {
  title: string;
  subtitle: string;
  fields: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    assessmentCall: string;
    message: string;
  };
  submit: string;
  required: string;
  optional: string;
  success: string;
  successSub: string;
  error: string;
  privacy: string;
}

interface ContactModalProps {
  dict: ContactModalDict;
}

export default function ContactModal({ dict }: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    assessmentCall: false,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  /** Turnstile CAPTCHA token — set when the challenge is completed */
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  /** Whether the Turnstile widget has successfully loaded and is ready */
  const [turnstileReady, setTurnstileReady] = useState(false);

  // Listen for custom event to open
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-contact-form", open);
    return () => window.removeEventListener("open-contact-form", open);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* resetAndClose defined BEFORE any effect that references it, so ESLint
     doesn't flag "accessed before declaration" (react-hooks/immutability). */
  const resetAndClose = () => {
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      assessmentCall: false,
      message: "",
    });
    setErrors({});
    setStatus("idle");
    setTurnstileToken(null);
    setIsOpen(false);
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") resetAndClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = dict.required;
    if (!formData.contactName.trim()) newErrors.contactName = dict.required;
    if (!formData.email.trim()) newErrors.email = dict.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "Contact Request — CompanyTech",
          _replyto: formData.email,
          "Company Name": formData.companyName,
          "Contact Person": formData.contactName,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          "Assessment Call Requested": formData.assessmentCall ? "Yes" : "No",
          Notes: formData.message || "No notes",
          _gotcha: "",
          fingerprint: getFingerprint(),
          turnstileToken,
        }),
      });
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex items-center justify-center p-4"
        onClick={resetAndClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {status === "success" ? (
            /* Success State */
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {dict.success}
              </h3>
              <p className="text-neutral-400 font-light mb-8">
                {dict.successSub}
              </p>
              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-full bg-accent text-black font-bold text-sm tracking-wider uppercase hover:bg-accent-light transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="p-8 md:p-10" noValidate>
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {dict.title}
                </h3>
                <p className="text-neutral-400 text-sm font-light">
                  {dict.subtitle}
                </p>
              </div>

              {status === "error" && (
                <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300">
                  {dict.error}
                </div>
              )}

              <div className="space-y-5">
                {/* Company Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
                    <Building2 className="h-4 w-4 text-accent" />
                    {dict.fields.companyName}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-white/5 border ${errors.companyName ? "border-red-500/50" : "border-white/10"} px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all`}
                    placeholder="Acme Manufacturing Inc."
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Contact Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
                    <User className="h-4 w-4 text-accent" />
                    {dict.fields.contactName}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-white/5 border ${errors.contactName ? "border-red-500/50" : "border-white/10"} px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.contactName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
                    <Mail className="h-4 w-4 text-accent" />
                    {dict.fields.email} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-white/5 border ${errors.email ? "border-red-500/50" : "border-white/10"} px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all`}
                    placeholder="john@acme.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
                    <Phone className="h-4 w-4 text-neutral-500" />
                    {dict.fields.phone}{" "}
                    <span className="text-neutral-600 text-xs">
                      ({dict.optional})
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                    placeholder="+90 555 123 4567"
                  />
                </div>

                {/* Assessment Call Checkbox */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
                  <input
                    type="checkbox"
                    id="assessmentCall"
                    name="assessmentCall"
                    checked={formData.assessmentCall}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent/30 cursor-pointer accent-accent"
                  />
                  <label
                    htmlFor="assessmentCall"
                    className="flex items-center gap-2 text-sm font-medium text-neutral-300 cursor-pointer"
                  >
                    <PhoneCall className="h-4 w-4 text-accent" />
                    {dict.fields.assessmentCall}
                  </label>
                </div>

                {/* Notes (Optional) */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
                    <MessageSquare className="h-4 w-4 text-neutral-500" />
                    {dict.fields.message}{" "}
                    <span className="text-neutral-600 text-xs">
                      ({dict.optional})
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                    placeholder="Tell us about your challenges or what you'd like to discuss..."
                  />
                </div>
              </div>

              {/* Privacy Note */}
              <p className="mt-5 text-xs text-neutral-600">{dict.privacy}</p>

              {/* Cloudflare Turnstile CAPTCHA Widget */}
              {Params.turnstile.siteKey && (
                <div className="mt-4 flex justify-center">
                  <Turnstile
                    siteKey={Params.turnstile.siteKey}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setTurnstileReady(true);
                    }}
                    onError={() => {
                      /* Turnstile failed (e.g. localhost, domain mismatch) */
                      /* Allow form submission without captcha in this case */
                      setTurnstileToken(null);
                      setTurnstileReady(false);
                    }}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: "dark", size: "normal" }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  status === "submitting" || (turnstileReady && !turnstileToken)
                }
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-light text-black font-bold text-sm tracking-wider uppercase py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {dict.submit}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
