/**
 * ============================================================================
 * src/app/[locale]/case-studies/raw-materials-factory/page.tsx
 * ============================================================================
 *
 * Placeholder for the Raw Materials Factory case study.
 * Replace this with your own case study content.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Link from "next/link";

/** Props provided by Next.js dynamic [locale] route segment. */
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RawMaterialsPage({ params }: PageProps) {
  /* Await and extract the locale from the route parameters. */
  const { locale } = await params;

  /* Load the locale-specific dictionary server-side. */
  const dict = await getDictionary(locale);

  /* Guard: if the dictionary could not be loaded, return a 404 page. */
  if (!dict) notFound();

  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24"
    >
      {/* Page heading. */}
      <h1 className="text-4xl font-bold text-white mb-4">
        Case Study: Coming Soon
      </h1>

      {/* Placeholder description text. */}
      <p className="text-neutral-400 text-lg mb-8 max-w-xl">
        This case study page is under construction.
      </p>

      {/* Link back to case studies listing. */}
      <Link
        href={`/${locale}/case-studies`}
        className="text-accent hover:underline text-sm"
      >
        ← Back to Case Studies
      </Link>
    </main>
  );
}
