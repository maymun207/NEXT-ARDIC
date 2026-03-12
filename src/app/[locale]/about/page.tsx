/**
 * ============================================================================
 * src/app/[locale]/about/page.tsx — About Us Placeholder Page
 * ============================================================================
 *
 * Placeholder page for the "About Us" section.
 * Replace this with your own About content by creating a custom component
 * and adding matching dictionary keys to en.json / tr.json.
 *
 * The page renders a minimal "coming soon" message using only universal
 * dictionary keys that exist in every valid locale dictionary.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Link from "next/link";

/** Props provided by Next.js dynamic [locale] route segment. */
interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
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
      {/* Page heading — uses the existing nav.about key from the dictionary. */}
      <h1 className="text-4xl font-bold text-white mb-4">{dict.nav.about}</h1>

      {/* Placeholder description text. */}
      <p className="text-neutral-400 text-lg mb-8 max-w-xl">
        This page is under construction. Check back soon for more information
        about us.
      </p>

      {/* Link back to the homepage. */}
      <Link href={`/${locale}`} className="text-accent hover:underline text-sm">
        ← Back to Home
      </Link>
    </main>
  );
}
