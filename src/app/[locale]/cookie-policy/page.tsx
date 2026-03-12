/**
 * ============================================================================
 * src/app/[locale]/cookie-policy/page.tsx — Cookie Policy Placeholder
 * ============================================================================
 *
 * Placeholder page for the Cookie Policy.
 * Replace this with your actual cookie policy content reviewed by legal counsel.
 *
 * To customise:
 *   1. Add a `cookiePage` key to your dictionaries (en.json / tr.json).
 *   2. Create or update a CookiePolicy section component that reads it.
 *   3. Import that component here.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import Link from "next/link";

/** Static metadata — displayed in browser tab and search results. */
export const metadata: Metadata = {
  title: "Cookie Policy | YOUR_COMPANY_NAME",
  description:
    "Learn how we use cookies on our website, including the types of cookies, their purpose, and how you can manage your preferences.",
};

/** Props provided by Next.js dynamic [locale] route segment. */
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CookiePolicyPage({ params }: PageProps) {
  /* Await and extract the locale from the route parameters. */
  const { locale } = await params;

  /* Load the locale-specific dictionary server-side. */
  const dict = await getDictionary(locale);

  /* Guard: if the dictionary could not be loaded, return a 404 page. */
  if (!dict) notFound();

  return (
    <main
      id="main-content"
      className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Page heading — uses the existing footer.legalLinks key. */}
      <h1 className="mb-8 text-4xl font-bold text-white">
        {dict.footer.legalLinks["cookie-policy"]}
      </h1>

      {/* Placeholder notice — replace with actual cookie policy content. */}
      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-8 text-neutral-300">
        <p className="mb-4 text-lg">This page is under construction.</p>
        <p className="text-sm text-neutral-400">
          Our cookie policy will be published here before launch. For questions,
          please{" "}
          <Link
            href={`/${locale}`}
            className="text-accent underline hover:text-white"
          >
            contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
