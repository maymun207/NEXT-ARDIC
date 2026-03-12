/**
 * ============================================================================
 * error.tsx — Locale-Level Error Boundary
 * ============================================================================
 *
 * This component catches rendering errors within the [locale] segment.
 * It displays a user-friendly bilingual error message and a "Try Again"
 * button. The error is also captured by Sentry for monitoring.
 *
 * IMPORTANT: This is a CLIENT component — it runs in the browser.
 * ============================================================================
 */

"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { useParams } from "next/navigation";

/**
 * Bilingual error messages for EN and TR locales.
 * Stored here instead of dictionaries because this component must render
 * even when dictionary loading itself fails.
 */
const errorMessages = {
  en: {
    title: "Something went wrong",
    description:
      "An unexpected error occurred. Our team has been notified and is working to fix it.",
    retry: "Try Again",
  },
  tr: {
    title: "Bir hata oluştu",
    description:
      "Beklenmeyen bir hata meydana geldi. Ekibimiz bilgilendirildi ve düzeltme üzerinde çalışıyor.",
    retry: "Tekrar Dene",
  },
} as const;

/**
 * Error boundary component for the [locale] segment.
 *
 * @param error - The error object thrown during rendering
 * @param reset - Function to re-render the segment and attempt recovery
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();

  /* Determine the current locale for bilingual messages */
  const locale = (params?.locale as string) === "tr" ? "tr" : "en";
  const msg = errorMessages[locale];

  /*
   * Report the error to Sentry when this boundary catches it.
   * This ensures every caught error is tracked in the monitoring
   * dashboard, even if the user clicks "Try Again" immediately.
   */
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
    >
      {/* ── Error icon ── */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
        <svg
          className="h-8 w-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      {/* ── Title ── */}
      <h1 className="mb-3 text-2xl font-bold text-white">{msg.title}</h1>

      {/* ── Description ── */}
      <p className="mb-8 max-w-md text-neutral-400">{msg.description}</p>

      {/* ── Reset button ── */}
      <button
        onClick={reset}
        className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
      >
        {msg.retry}
      </button>

      {/* ── Error digest (for support reference) ── */}
      {error.digest && (
        <p className="mt-4 text-xs text-neutral-600">
          Error ID: {error.digest}
        </p>
      )}
    </main>
  );
}
