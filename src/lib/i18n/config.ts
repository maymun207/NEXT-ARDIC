import type { Locale } from "@/types";

export const defaultLocale: Locale = "tr";
export const locales: Locale[] = ["en", "tr"];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
