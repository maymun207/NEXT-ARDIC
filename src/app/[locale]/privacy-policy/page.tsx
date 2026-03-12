/**
 * ============================================================================
 * src/app/[locale]/privacy-policy/page.tsx — Privacy Policy Placeholder
 * ============================================================================
 *
 * Placeholder page for the Privacy Policy.
 * Replace this with your actual privacy policy content reviewed by legal counsel.
 *
 * To customise:
 *   1. Add a `privacyPage` key to your dictionaries (en.json / tr.json).
 *   2. Create or update a PrivacyPolicy section component that reads it.
 *   3. Import that component here.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import Link from "next/link";

/** Dynamic metadata — locale-aware title and description. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  /* Await async params (Next.js 15+ pattern). */
  const { locale } = await params;

  /* Return locale-appropriate meta tags. */
  return {
    title:
      locale === "tr"
        ? "Gizlilik Politikası | YOUR_COMPANY_NAME"
        : "Privacy Policy | YOUR_COMPANY_NAME",
    description:
      locale === "tr"
        ? "Kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu öğrenin."
        : "Learn how we collect, use, and protect your personal data.",
  };
}

/** Props provided by Next.js dynamic [locale] route segment. */
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
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
        {dict.footer.legalLinks["privacy-policy"]}
      </h1>

      {/* Placeholder notice — replace with actual privacy policy content. */}
      <div className="rounded-lg border border-neutral-700 bg-neutral-800/50 p-8 text-neutral-300">
        <p className="mb-4 text-lg">This page is under construction.</p>
        <p className="text-sm text-neutral-400">
          Our privacy policy will be published here before launch. For
          questions, please{" "}
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
