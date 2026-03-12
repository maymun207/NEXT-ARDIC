// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import dynamic from "next/dynamic";
import type { Dictionary, Locale } from "@/types";
import { useTracking } from "@/hooks/useTracking";

const ChatWidget = dynamic(() => import("@/components/ui/ChatWidget"), {
  ssr: false,
});

interface ChatWidgetWrapperProps {
  dict: Dictionary;
  locale: Locale;
}

export default function ChatWidgetWrapper({
  dict,
  locale,
}: ChatWidgetWrapperProps) {
  // Track page views — runs on every navigation
  useTracking(locale);

  const labels = dict.chatAgent;
  return <ChatWidget locale={locale} labels={labels} />;
}
