import type { Locale } from "@/types";
import type { Dictionary } from "@/types";
import en from "@/lib/dictionaries/en.json";
import tr from "@/lib/dictionaries/tr.json";
import { isValidLocale } from "@/lib/i18n/config";

const dictionaries: Record<Locale, Dictionary> = { en, tr };

export async function getDictionary(locale: string): Promise<Dictionary | null> {
  if (!isValidLocale(locale)) return null;
  return dictionaries[locale];
}
