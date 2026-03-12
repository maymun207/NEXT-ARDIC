/**
 * ============================================================================
 * /[locale]/privacy — Redirect Page
 * ============================================================================
 *
 * The site footer dynamically builds legal-link URLs from the JSON dictionary
 * key names (e.g. `footer.legalLinks.privacy` → `/${locale}/privacy`).
 *
 * The full privacy policy content lives at `/${locale}/privacy-policy`.
 *
 * This page performs a permanent (308) server-side redirect so that any
 * bookmark or link to `/en/privacy` or `/tr/privacy` transparently forwards
 * visitors to the correct policy page.
 * ============================================================================
 */

import { redirect } from "next/navigation";

/**
 * Redirect `/[locale]/privacy` → `/[locale]/privacy-policy` permanently.
 *
 * @param params - dynamic route params containing the active locale segment.
 */
export default async function PrivacyRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  /* Await async params (Next.js 15+ pattern) */
  const { locale } = await params;

  /* 308 Permanent Redirect — preserves method for any POST links */
  redirect(`/${locale}/privacy-policy`);
}
