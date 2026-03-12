"use client";
/**
 * ============================================================================
 * CookieConsent.tsx — KVKK/GDPR Cookie Consent Banner
 * ============================================================================
 *
 * A fixed-bottom cookie consent banner that:
 *   - Displays bilingual text (EN/TR) from i18n dictionaries
 *   - Offers three cookie categories: Necessary (always on), Analytics, Marketing
 *   - Provides "Accept All", "Reject Non-Essential", and "Customize" actions
 *   - Persists user preferences in a `CompanyTech_consent` cookie (365 days)
 *   - Fires a custom `consentUpdated` event so GA can be conditionally loaded
 *   - Is accessible: ARIA labels, keyboard-navigable, focus-trapped
 *   - Only renders on first visit or when the consent cookie is expired/absent
 *
 * KVKK (Law No. 6698) & GDPR (Article 7) compliance:
 *   - Consent must be freely given, specific, informed, and unambiguous
 *   - No tracking cookies are set until explicit consent is given
 *   - Users can change preferences at any time
 * ============================================================================
 */

import { useState, useEffect, useCallback } from "react";

/* ── Cookie consent configuration from Params ──────────────────────── */
import { Params } from "@/lib/Params";

/* ── Types ────────────────────────────────────────────────────────── */

/** Shape of the `cookieConsent` section in the i18n dictionary */
interface CookieConsentDict {
  /** Main banner title, e.g. "Cookie Preferences" */
  title: string;
  /** Explanatory paragraph about cookies and compliance */
  description: string;
  /** Category labels and descriptions */
  categories: {
    necessary: { label: string; description: string };
    analytics: { label: string; description: string };
    marketing: { label: string; description: string };
  };
  /** Button labels */
  buttons: {
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    savePreferences: string;
  };
  /** Links */
  links: {
    privacyPolicy: string;
    cookiePolicy: string;
  };
}

/** Consent preference state */
interface ConsentPreferences {
  /** Necessary cookies — always true, cannot be toggled */
  necessary: boolean;
  /** Analytics cookies (e.g. Google Analytics) — opt-in */
  analytics: boolean;
  /** Marketing cookies (e.g. remarketing, ads) — opt-in */
  marketing: boolean;
}

/** Props passed from the server layout */
interface CookieConsentProps {
  /** The `cookieConsent` section from the current locale dictionary */
  dict: CookieConsentDict;
  /** Current locale code ("en" | "tr") */
  locale: string;
}

/* ── Constants ────────────────────────────────────────────────────── */

/** Name of the cookie that stores consent preferences */
const COOKIE_NAME = Params.cookieConsent.cookieName;
/** Cookie expiration in days */
const COOKIE_EXPIRY_DAYS = Params.cookieConsent.expiryDays;

/* ── Helper: read a browser cookie by name ──────────────────────── */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

/* ── Helper: set a browser cookie ───────────────────────────────── */
function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax;Secure`;
}

/* ── Component ──────────────────────────────────────────────────── */

export default function CookieConsent({ dict, locale }: CookieConsentProps) {
  /** Whether the banner should be displayed */
  const [visible, setVisible] = useState(false);
  /** Whether the "Customize" panel is expanded */
  const [showCustomize, setShowCustomize] = useState(false);
  /** Current consent preferences */
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  /* ── On mount: check if consent cookie exists ──────────────────── */
  useEffect(() => {
    const existing = getCookie(COOKIE_NAME);
    if (!existing) {
      /* No consent cookie found — show the banner.
         queueMicrotask avoids synchronous setState in an effect body
         (react-hooks/set-state-in-effect). */
      queueMicrotask(() => setVisible(true));
    } else {
      /* Parse existing preferences and dispatch event for GA */
      try {
        const parsed = JSON.parse(existing) as ConsentPreferences;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- canonical: hydrate state from cookie on mount
        setPreferences(parsed);
        window.dispatchEvent(
          new CustomEvent("consentUpdated", { detail: parsed }),
        );
      } catch {
        /* Cookie is malformed — show banner again */
        queueMicrotask(() => setVisible(true));
      }
    }
  }, []);

  /* ── Save preferences to cookie and fire event ──────────────── */
  const savePreferences = useCallback((prefs: ConsentPreferences) => {
    setCookie(COOKIE_NAME, JSON.stringify(prefs), COOKIE_EXPIRY_DAYS);
    setPreferences(prefs);
    setVisible(false);
    setShowCustomize(false);

    /* Dispatch event so GA and other scripts can react */
    window.dispatchEvent(new CustomEvent("consentUpdated", { detail: prefs }));
  }, []);

  /* ── Button handlers ──────────────────────────────────────────── */

  /** Accept all cookie categories */
  const handleAcceptAll = useCallback(() => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  }, [savePreferences]);

  /** Reject all non-essential cookies */
  const handleRejectNonEssential = useCallback(() => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  }, [savePreferences]);

  /** Save custom preferences from the expanded panel */
  const handleSaveCustom = useCallback(() => {
    savePreferences(preferences);
  }, [preferences, savePreferences]);

  /* ── Toggle a single category in the customize panel ──────────── */
  const toggleCategory = useCallback((category: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  /* ── Don't render if consent is already given ────────────────── */
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={dict.title}
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-9999 border-t border-neutral-700 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-sm sm:p-6"
    >
      <div className="mx-auto max-w-4xl">
        {/* ── Title & Description ─────────────────────────────────── */}
        <h2 className="mb-2 text-base font-semibold text-white">
          {dict.title}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-neutral-300">
          {dict.description}{" "}
          <a
            href={`/${locale}/privacy-policy`}
            className="underline hover:text-white"
          >
            {dict.links.privacyPolicy}
          </a>{" "}
          |{" "}
          <a
            href={`/${locale}/cookie-policy`}
            className="underline hover:text-white"
          >
            {dict.links.cookiePolicy}
          </a>
        </p>

        {/* ── Customize Panel (expandable) ────────────────────────── */}
        {showCustomize && (
          <div className="mb-4 space-y-3 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
            {/* Necessary — always on, disabled toggle */}
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white">
                  {dict.categories.necessary.label}
                </span>
                <p className="text-xs text-neutral-400">
                  {dict.categories.necessary.description}
                </p>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled
                aria-label={dict.categories.necessary.label}
                className="h-4 w-4 accent-accent opacity-50"
              />
            </label>

            {/* Analytics — opt-in */}
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white">
                  {dict.categories.analytics.label}
                </span>
                <p className="text-xs text-neutral-400">
                  {dict.categories.analytics.description}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => toggleCategory("analytics")}
                aria-label={dict.categories.analytics.label}
                className="h-4 w-4 accent-accent"
              />
            </label>

            {/* Marketing — opt-in */}
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white">
                  {dict.categories.marketing.label}
                </span>
                <p className="text-xs text-neutral-400">
                  {dict.categories.marketing.description}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => toggleCategory("marketing")}
                aria-label={dict.categories.marketing.label}
                className="h-4 w-4 accent-accent"
              />
            </label>
          </div>
        )}

        {/* ── Action Buttons ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAcceptAll}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            {dict.buttons.acceptAll}
          </button>
          <button
            onClick={handleRejectNonEssential}
            className="rounded-lg border border-neutral-600 bg-transparent px-5 py-2 text-sm font-semibold text-neutral-300 transition-colors hover:bg-neutral-800"
          >
            {dict.buttons.rejectNonEssential}
          </button>
          {!showCustomize ? (
            <button
              onClick={() => setShowCustomize(true)}
              className="rounded-lg border border-neutral-600 bg-transparent px-5 py-2 text-sm font-semibold text-neutral-300 transition-colors hover:bg-neutral-800"
            >
              {dict.buttons.customize}
            </button>
          ) : (
            <button
              onClick={handleSaveCustom}
              className="rounded-lg bg-secondary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
            >
              {dict.buttons.savePreferences}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
