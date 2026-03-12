// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { Dictionary } from "@/types";

const ContactModal = dynamic(() => import("@/components/ui/ContactModal"), {
  ssr: false,
});

export default function ContactModalWrapper({ dict }: { dict: Dictionary }) {
  // Handle pending events from cross-page navigation (e.g. clicking Contact from About page)
  useEffect(() => {
    const pending = sessionStorage.getItem("pending-event");
    if (pending) {
      sessionStorage.removeItem("pending-event");
      // Retry with increasing delay to handle dynamic imports
      const delays = [500, 1000, 1500];
      delays.forEach((ms) => {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent(pending));
        }, ms);
      });
    }
  }, []);

  return <ContactModal dict={dict.contactModal} />;
}
