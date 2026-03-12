/**
 * Data Protection / GDPR Policy Page
 *
 * Placeholder page for the CompanyTech GDPR & data protection policy.
 * This page supplements the privacy policy with specific GDPR compliance
 * details required for European operations.
 * Content should be replaced with the actual data protection policy
 * reviewed and approved by legal counsel before production launch.
 *
 * Route: /[locale]/data-protection
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Page component props — receives the dynamic locale parameter */
export default async function DataProtectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  /* Resolve the locale from the dynamic route segment */
  const { locale } = await params;

  /* Load the locale-specific dictionary; 404 if locale is invalid */
  const dict = await getDictionary(locale);
  if (!dict) notFound();

  /* Determine the page title based on available dictionary keys */
  const pageTitle =
    locale === "tr"
      ? "Veri Koruma & KVKK Politikası"
      : "Data Protection & GDPR Policy";

  return (
    <main
      id="main-content"
      className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Page heading */}
      <h1 className="mb-8 text-4xl font-bold text-white">{pageTitle}</h1>

      {/* Placeholder notice — replace with actual GDPR policy content */}
      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-8 text-neutral-300">
        <p className="mb-4 text-lg">This page is under construction.</p>
        <p className="text-sm text-neutral-400">
          Our data protection and GDPR compliance policy will be published here
          before launch. For questions about your data rights, please contact us
          at{" "}
          <a
            href="mailto:info@CompanyTech.com"
            className="text-secondary underline hover:text-white"
          >
            info@CompanyTech.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
