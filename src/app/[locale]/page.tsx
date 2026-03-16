import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types";
import HeroSlider from "@/components/sections/HeroSlider";
import ProductsGrid from "@/components/sections/ProductsGrid";
import NetworkFlow from "@/components/sections/NetworkFlow";
import TechPlatforms from "@/components/sections/TechPlatforms";
import SentientFactory from "@/components/sections/SentientFactory";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import FactoryTreeSection from "@/components/sections/FactoryTreeSection";
import HeroFollowSection from "@/components/sections/HeroFollowSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  if (!dict) {
    return (
      <main className="min-h-screen flex items-center justify-center text-[#1c2b2b]">
        Page not found.
      </main>
    );
  }

  return (
    <main>
      {/* ── Hero — 3-slide peek carousel ───────────────────────────────── */}
      <HeroSlider />

      {/* ── Hero Follow — 2-panel sticky image section after hero ────────── */}
      <HeroFollowSection />

      {/* ── Factory Tree — commented out; HeroFollowSection now covers this ──
      <FactoryTreeSection />
      ── */}

      {/* ── Products & Services — 5 glassmorphism product cards ────────── */}
      <ProductsGrid dict={dict} locale={locale} />

      {/* ── How It Works — Collect → Contextualize → Converse ──────────── */}
      <NetworkFlow dict={dict} />

      {/* ── Technologies & Platforms — 6 color-coded tech nodes ─────────── */}
      <TechPlatforms dict={dict} locale={locale} />

      {/* ── The Sentient Factory — Operational Ensō visual ──────────────── */}
      <SentientFactory dict={dict} />

      {/* ── Stats — 4 key proof metrics ─────────────────────────────────── */}
      <StatsSection dict={dict} />

      {/* ── CTA — Full-width conversion banner ──────────────────────────── */}
      <CTASection dict={dict} />

      {/* ── Contact — Form wired to /api/contact ────────────────────────── */}
      <ContactSection dict={dict} />
    </main>
  );
}
