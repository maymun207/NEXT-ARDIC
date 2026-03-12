"use client";

import { useState } from "react";
import { getFingerprint } from "@/hooks/useTracking";

interface FooterNewsletterProps {
  title: string;
  placeholder: string;
  subscribe: string;
  gdpr: string;
  locale?: string;
}

export default function FooterNewsletter({
  title,
  placeholder,
  subscribe,
  gdpr,
  locale,
}: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fingerprint: getFingerprint(), locale }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
      setEmail("");
      setAgreed(false);
    } catch {
      setError(
        locale === "tr"
          ? "Bir hata oluştu. Lütfen tekrar deneyin."
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-accent/10 p-4 text-sm text-accent-dark">
        {locale === "tr"
          ? "Abone olduğunuz için teşekkürler!"
          : "Thank you for subscribing!"}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-secondary focus:ring-1 focus:ring-secondary"
        />
        <button
          type="submit"
          disabled={!agreed || loading}
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark disabled:opacity-50"
        >
          {loading
            ? locale === "tr"
              ? "Gönderiliyor..."
              : "Sending..."
            : subscribe}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <label className="mt-2 flex items-start gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 accent-secondary"
        />
        {gdpr}
      </label>
    </form>
  );
}
