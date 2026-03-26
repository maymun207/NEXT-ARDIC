import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
} from "@/lib/structured-data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/layout/SkipToContent";
import CookieConsent from "@/components/ui/CookieConsent";
import ChatWidgetWrapper from "@/components/layout/ChatWidgetWrapper";
import CursorTracker from "@/components/dev/CursorTracker";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);
  if (!dict) return {};

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        tr: "/tr",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      /* Site name is pulled from the dictionary so it updates with locale */
      siteName: dict.site.name,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  if (!dict) notFound();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}"`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getOrganizationSchema(),
            getLocalBusinessSchema(),
          ]),
        }}
      />
      <SkipToContent />
      <Header dict={dict} locale={locale as Locale} />
      {children}
      <Footer dict={dict} locale={locale as Locale} />
      {/* CookieConsent: GDPR/privacy compliance banner — required for all EU visitors */}
      <CookieConsent dict={dict.cookieConsent} locale={locale} />
      {/* ChatWidgetWrapper: floating AI assistant chat panel — visible on all pages */}
      <ChatWidgetWrapper dict={dict} locale={locale as Locale} />
      {/* DEV ONLY: cursor coordinate tracker — remove before shipping */}
      {process.env.NODE_ENV === "development" && <CursorTracker />}
    </>
  );
}
