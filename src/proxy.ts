/**
 * ============================================================================
 * middleware.ts — Next.js Edge Middleware
 * ============================================================================
 *
 * Runs at the edge before every matched request. Currently handles:
 *   1. Root URL (/) → redirect to /en or /tr based on Accept-Language
 *
 * SECURITY NOTE — CSP Nonce (future enhancement):
 *   To implement per-request CSP nonces for inline scripts:
 *   1. Generate a nonce: const nonce = crypto.randomUUID()
 *   2. Set a request header: requestHeaders.set('x-nonce', nonce)
 *   3. Update the CSP header to include: script-src 'nonce-${nonce}'
 *   4. Pass the nonce to <Script> components via the nonce prop
 *   This is not yet implemented because the site currently has no
 *   inline scripts that require nonce-based CSP.
 *
 * TODO: Implement CSP nonce when inline scripts are added to the site.
 * ============================================================================
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Edge middleware function — runs before every matched request.
 *
 * @param request - The incoming HTTP request object
 * @returns NextResponse — either a redirect (for /) or passthrough
 */
export function proxy(request: NextRequest) {
  /* Extract the pathname from the incoming request URL */
  const pathname = request.nextUrl.pathname;

  /* ── Root URL Locale Redirect ──────────────────────────────────────── */
  /* Detects the browser's preferred language from the Accept-Language   */
  /* header and redirects / to either /en or /tr accordingly.            */
  if (pathname === '/') {
    /* Read the Accept-Language header (empty string as fallback) */
    const acceptLanguage = request.headers.get('accept-language') || '';

    /* Check if Turkish ('tr') appears anywhere in the header value */
    const prefersTurkish = acceptLanguage.toLowerCase().includes('tr');

    /* Select the appropriate locale based on browser preference */
    const locale = prefersTurkish ? 'tr' : 'en';

    /* 302 redirect to the localised root page */
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  /* ── Passthrough ───────────────────────────────────────────────────── */
  /* All other matched routes proceed without modification.              */
  return NextResponse.next();
}

/* ── Matcher Configuration ─────────────────────────────────────────────── */
/* Only run this middleware on the exact root path '/'.                    */
/* API routes, static files, and locale paths are not matched.            */
export const config = {
  matcher: '/',
};
