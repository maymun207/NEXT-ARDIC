import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types";

import HeroSection from "@/components/sections/HeroSection";
import ProductsGrid from "@/components/sections/ProductsGrid";
import NetworkFlow from "@/components/sections/NetworkFlow";
import TechPlatforms from "@/components/sections/TechPlatforms";
import SentientFactory from "@/components/sections/SentientFactory";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import FactoryTreeSection from "@/components/sections/FactoryTreeSection";
import HeroFollowSection from "@/components/sections/HeroFollowSection";
import Pillar1Page from "@/components/sections/Pillar1Page";
import Pillar2Page from "@/components/sections/Pillar2Page";
import Pillar3Page from "@/components/sections/Pillar3Page";
import DigitalTransformationPage from "@/components/sections/DigitalTransformationPage";
import EnterpriseAIPlatformPage from "@/components/sections/EnterpriseAIPlatformPage";
import AIExecutionPage from "@/components/sections/AIExecutionPage";
import LCOAICalculator from "@/components/sections/LCOAICalculator";
import LastSilentWorld from "@/components/sections/LastSilentWorld";
import GlassCardsTransition from "@/components/sections/GlassCardsTransition";
import MapOfTechnology from "@/components/sections/MapOfTechnology";

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
      {/* ── Hero ── */}
      <HeroSection dict={dict} />

      {/* ── The Last Silent World — AIoT introduction ── */}
      <LastSilentWorld />

      {/* ── Glass Cards — dark transition band ── */}
      <GlassCardsTransition />

      {/* ── Hero Follow — 2-panel sticky image section after hero ────────── */}
      <HeroFollowSection />

      {/* ── Building the Digital Foundation — Pillar 1 sticky sidebar ── */}
      <Pillar1Page />

      {/* ── Activate AI-Driven Intelligence — Pillar 2 sticky sidebar ── */}
      <Pillar2Page />

      {/* ── Orchestrate & Operate — Pillar 3 full background glass layout ── */}
      <Pillar3Page />

      {/* ── Map of Our Technology ── */}
      <MapOfTechnology />

      {/* ── Digital Transformation For Manufacturing ── */}
      <DigitalTransformationPage />

      {/* ── Factory Tree — commented out; HeroFollowSection now covers this ──
      <FactoryTreeSection />
      ── */}

      {/* ── Enterprise AI Platform ──
      <EnterpriseAIPlatformPage /> 
      ── */}

      {/* ── AI Execution Strategies ── 
      <AIExecutionPage /> 
      ── */}

      {/* ── LCOAI Calculator — inline cost comparison panel ── 
      <LCOAICalculator /> 
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
