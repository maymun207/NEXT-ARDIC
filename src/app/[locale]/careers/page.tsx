/**
 * ============================================================================
 * src/app/[locale]/careers/page.tsx — Careers Placeholder Page
 * ============================================================================
 *
 * Placeholder page for the "Careers" section.
 * Replace this with your own Careers content by creating a custom component
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

export default async function CareersPage({ params }: PageProps) {
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
      {/* Page heading — uses the existing footer.links.careers key. */}
      <h1 className="text-4xl font-bold text-white mb-4">
        {dict.footer.links.careers}
      </h1>

      {/* Placeholder description text. */}
      <p className="text-neutral-400 text-lg mb-8 max-w-xl">
        We&apos;re not hiring at the moment, but check back soon for open
        positions.
      </p>

      {/* Link back to the homepage. */}
      <Link href={`/${locale}`} className="text-accent hover:underline text-sm">
        ← Back to Home
      </Link>
    </main>
  );
}
