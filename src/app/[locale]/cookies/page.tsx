/**
 * ============================================================================
 * /[locale]/cookies — Redirect Page
 * ============================================================================
 *
 * The site footer dynamically builds legal-link URLs from the JSON dictionary
 * key names (e.g. `footer.legalLinks.cookies` → `/${locale}/cookies`).
 *
 * The full cookie policy content lives at `/${locale}/cookie-policy`.
 *
 * This page performs a permanent (308) server-side redirect so that any
 * bookmark or link to `/en/cookies` or `/tr/cookies` transparently forwards
 * visitors to the correct policy page.
 * ============================================================================
 */

import { redirect } from "next/navigation";

/**
 * Redirect `/[locale]/cookies` → `/[locale]/cookie-policy` permanently.
 *
 * @param params - dynamic route params containing the active locale segment.
 */
export default async function CookiesRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  /* Await async params (Next.js 15+ pattern) */
  const { locale } = await params;

  /* 308 Permanent Redirect — preserves method for any POST links */
  redirect(`/${locale}/cookie-policy`);
}
