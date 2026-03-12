/**
 * ============================================================================
 * src/app/[locale]/case-studies/page.tsx — Case Studies Placeholder Page
 * ============================================================================
 *
 * Placeholder page for the "Case Studies" listing.
 * Replace this with your own content by creating a custom component
 * and adding matching dictionary keys to en.json / tr.json.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Link from "next/link";

/** Props provided by Next.js dynamic [locale] route segment. */
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CaseStudiesPage({ params }: PageProps) {
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
      {/* Page heading — uses the existing nav.caseStudies key. */}
      <h1 className="text-4xl font-bold text-white mb-4">
        {dict.nav.caseStudies}
      </h1>

      {/* Placeholder description text. */}
      <p className="text-neutral-400 text-lg mb-8 max-w-xl">
        Case studies are coming soon. Stay tuned for real-world success stories.
      </p>

      {/* Link back to the homepage. */}
      <Link href={`/${locale}`} className="text-accent hover:underline text-sm">
        ← Back to Home
      </Link>
    </main>
  );
}
