"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const FINGERPRINT_KEY = "CompanyTech-fp";

/**
 * Get or create a persistent visitor fingerprint (UUID) in localStorage.
 */
export function getFingerprint(): string {
    if (typeof window === "undefined") return "";

    let fp = localStorage.getItem(FINGERPRINT_KEY);
    if (!fp) {
        fp = (typeof crypto.randomUUID === "function")
            ? crypto.randomUUID()
            : ("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }));
        localStorage.setItem(FINGERPRINT_KEY, fp);
    }
    return fp;
}

/**
 * Hook: tracks page views by sending visitor data to /api/track.
 * Call once from the root layout client wrapper.
 */
export function useTracking(locale: string) {
    const pathname = usePathname();
    const lastTracked = useRef<string>("");

    useEffect(() => {
        // Deduplicate: don't re-track identical pathname
        if (pathname === lastTracked.current) return;
        lastTracked.current = pathname ?? "";

        const fingerprint = getFingerprint();
        if (!fingerprint) return;

        // Fire-and-forget — don't block rendering
        fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fingerprint,
                page: pathname,
                locale,
                referrer: document.referrer || null,
            }),
        }).catch(() => {
            // Silently ignore tracking failures
        });
    }, [pathname, locale]);
}
