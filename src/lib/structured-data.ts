/**
 * ============================================================================
 * src/lib/structured-data.ts — Schema.org JSON-LD Structured Data
 * ============================================================================
 *
 * Generates JSON-LD structured data objects for search engine optimization.
 * These are embedded as <script type="application/ld+json"> tags in the
 * <head> of every page via src/app/[locale]/layout.tsx.
 *
 * HOW TO CUSTOMIZE:
 *   1. Set NEXT_PUBLIC_SITE_NAME and NEXT_PUBLIC_SITE_URL in your .env.local.
 *   2. Update the telephone, address, and sameAs social links below.
 *   3. Remove getLocalBusinessSchema() if you don't have a physical location.
 *
 * Schema.org reference: https://schema.org/Organization
 * ============================================================================
 */

/** The canonical site URL, read from the environment variable. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

/** The company/brand name, read from the environment variable. */
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Your Company Name";

/** The site description, read from the environment variable. */
const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "Enterprise software solutions for modern businesses.";

/**
 * Generates the Organization schema for high-level SEO signals.
 * Applied to every page — helps Google understand your brand.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    /* The official registered company name */
    name: SITE_NAME,
    /* Canonical URL of the website — must match your Vercel domain */
    url: SITE_URL,
    /* Logo image served from /public/images/logo.png */
    logo: `${SITE_URL}/images/logo.png`,
    /* Short description of what the company does */
    description: SITE_DESCRIPTION,
    /* TODO: Add your social profile URLs. Remove entries you don't use. */
    sameAs: [
      /* TODO: "https://linkedin.com/company/YOUR_COMPANY" */
      /* TODO: "https://twitter.com/YOUR_HANDLE" */
    ],
  };
}

/**
 * Generates the LocalBusiness schema for companies with a physical address.
 * If you are a fully remote/online business, you can safely remove this
 * function and its call in src/app/[locale]/layout.tsx.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    /* The official registered company name */
    name: SITE_NAME,
    /* Canonical URL */
    url: SITE_URL,
    /* TODO: Replace with your company phone number in E.164 format */
    telephone: "+1-XXX-XXX-XXXX",
    /* TODO: Replace with your company's registered address */
    address: {
      "@type": "PostalAddress",
      /* TODO: "streetAddress": "123 Example Street" */
      /* TODO: "addressLocality": "Your City" */
      /* TODO: "addressRegion": "Your State/Province" */
      /* TODO: "postalCode": "00000" */
      /* TODO: "addressCountry": "US" */
      addressLocality: "YOUR_CITY",
      addressCountry: "YOUR_COUNTRY_CODE",
    },
    /* TODO: Update your opening hours */
    openingHours: "Mo-Fr 09:00-18:00",
    /* Price range indicator: $, $$, $$$, $$$$ */
    priceRange: "$$$$",
  };
}
