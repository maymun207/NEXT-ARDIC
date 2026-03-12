/**
 * Terms of Service Page
 *
 * Placeholder page for the CompanyTech terms of service.
 * This page is linked from the site footer under "Legal" links.
 * Content should be replaced with the actual terms of service
 * reviewed and approved by legal counsel before production launch.
 *
 * Route: /[locale]/terms
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Page component props — receives the dynamic locale parameter */
export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  /* Resolve the locale from the dynamic route segment */
  const { locale } = await params;

  /* Load the locale-specific dictionary; 404 if locale is invalid */
  const dict = await getDictionary(locale);
  if (!dict) notFound();

  return (
    <main
      id="main-content"
      className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Page heading */}
      <h1 className="mb-8 text-4xl font-bold text-white">
        {dict.footer.legalLinks.terms}
      </h1>

      {/* Placeholder notice — replace with actual terms content */}
      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-8 text-neutral-300">
        <p className="mb-4 text-lg">This page is under construction.</p>
        <p className="text-sm text-neutral-400">
          Our terms of service will be published here before launch. For
          questions, please contact us at{" "}
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
