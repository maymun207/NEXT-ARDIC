"use client";

import type { Dictionary, Locale } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Users,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";

interface CareersProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Careers({ dict, locale }: CareersProps) {
  const careers = (dict as any).careers;

  /* Hooks must be called unconditionally — before any early return */
  const [fileName, setFileName] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!careers) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(
      `Career Application – ${fullName}${position ? ` – ${position}` : ""}`,
    );
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nPosition: ${position || "Open Application"}\n\nMessage:\n${message || "N/A"}\n\n---\nPlease attach your CV/Resume to this email before sending.`,
    );

    window.open(
      `mailto:info@CompanyTech.com?subject=${subject}&body=${body}`,
      "_self",
    );
    setFormSubmitted(true);
  };

  const highlights = [
    { icon: Briefcase, color: "text-accent" },
    { icon: Users, color: "text-[#E879F9]" },
    { icon: Sparkles, color: "text-[#34D399]" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back + Close */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-4 py-2 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          ← Back
        </Link>
      </div>
      <div className="fixed top-6 right-6 z-50">
        <Link
          href={`/${locale}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </Link>
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,209,255,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-accent/10 text-accent border border-accent/20 mb-6">
              {careers.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {careers.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-light max-w-3xl mx-auto leading-relaxed">
              {careers.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {careers.highlights.map((item: any, i: number) => {
            const Icon = highlights[i]?.icon || Briefcase;
            const color = highlights[i]?.color || "text-accent";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/2 p-8 text-center hover:border-white/20 transition-all"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${color} mx-auto mb-5`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application Form */}
      <section className="px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              {careers.formTitle}
            </h2>
            <p className="text-neutral-400 font-light text-center mb-10 text-sm">
              {careers.formSubtitle}
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-accent/20 bg-accent/5 p-12 text-center"
              >
                <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {careers.success}
                </h3>
                <p className="text-neutral-400 font-light text-sm">
                  {careers.successSub}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {careers.fields.fullName}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all"
                    placeholder={careers.fields.fullName}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {careers.fields.email}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all"
                    placeholder={careers.fields.email}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {careers.fields.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all"
                    placeholder={careers.fields.phone}
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {careers.fields.position}
                  </label>
                  <input
                    type="text"
                    name="position"
                    className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all"
                    placeholder={careers.fields.positionPlaceholder}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    {careers.fields.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                    placeholder={careers.fields.messagePlaceholder}
                  />
                </div>

                {/* Note about attaching CV */}
                <div className="rounded-xl border border-white/10 bg-white/2 px-5 py-4 text-sm text-neutral-400">
                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p>{careers.fields.cvNote}</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {careers.submit}
                </Button>

                <p className="text-xs text-neutral-600 text-center">
                  {careers.privacy}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
