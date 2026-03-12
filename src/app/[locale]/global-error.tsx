/**
 * ============================================================================
 * global-error.tsx — Root-Level Error Boundary
 * ============================================================================
 *
 * This component catches errors that escape ALL other error boundaries,
 * including the root layout itself. It MUST include its own <html> and
 * <body> tags because the root layout may have failed to render.
 *
 * The error is captured by Sentry for monitoring.
 *
 * IMPORTANT: This is a CLIENT component — it runs in the browser.
 * ============================================================================
 */

"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * Global error boundary — last resort for uncaught errors.
 *
 * @param error - The error object thrown during rendering
 * @param reset - Function to re-render the root segment
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  /*
   * Report the error to Sentry immediately.
   * Global errors are the most critical — they indicate the entire
   * application failed to render.
   */
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "480px", padding: "2rem" }}>
          {/* ── Error icon ── */}
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
            aria-hidden="true"
          >
            ⚠️
          </div>

          {/* ── Title ── */}
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Something went wrong
          </h1>

          {/* ── Description ── */}
          <p
            style={{
              color: "#a3a3a3",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            A critical error occurred. Our team has been automatically notified.
          </p>

          {/* ── Reset button ── */}
          <button
            onClick={reset}
            style={{
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>

          {/* ── Error digest for support ── */}
          {error.digest && (
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "#525252",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
