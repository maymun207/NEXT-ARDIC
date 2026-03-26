"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import type { Dictionary, Locale } from "@/types";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export default function Header({ dict, locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const nav = (dict as any).nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navItems: NavItem[] = [
    {
      label: nav?.about || "About ARDIC",
      children: [
        { label: nav?.aboutUs || "About Us", href: `/${locale}/about` },
        { label: nav?.history || "History", href: `/${locale}/about#history` },
      ],
    },
    {
      label: nav?.products || "Products & Services",
      children: [
        { label: nav?.modiverse || "Modiverse", href: `/${locale}/products/modiverse` },
        { label: nav?.armes || "ArMES", href: `/${locale}/products/armes` },
        { label: nav?.digitalTransformation || "Digital Transformation", href: `/${locale}/products/digital-transformation` },
        { label: nav?.cwf || "CWF: Data Intelligence", href: `/${locale}/products/cwf` },
        { label: nav?.coe || "Center of Excellence", href: `/${locale}/products/coe` },
      ],
    },
    {
      label: nav?.technologies || "Technologies & Platforms",
      children: [
        { label: nav?.arcloud || "ArCloud", href: `/${locale}/technologies/arcloud` },
        { label: nav?.iotIgnite || "IoT-Ignite", href: `/${locale}/technologies/iot-ignite` },
        { label: nav?.arai || "ArAI", href: `/${locale}/technologies/arai` },
        { label: nav?.blockchain || "Blockchain", href: `/${locale}/technologies/blockchain` },
        { label: nav?.aricaas || "ArICAAAS", href: `/${locale}/technologies/aricaas` },
        { label: nav?.pilaros || "PilarOS / AFEX", href: `/${locale}/technologies/pilaros` },
      ],
    },
    {
      label: nav?.projects || "Projects",
      children: [
        { label: nav?.grantProjects || "Grant Projects", href: `/${locale}/projects/grants` },
        { label: nav?.caseStudies || "Case Studies", href: `/${locale}/case-studies` },
      ],
    },
  ];

  const otherLocale: Locale = locale === "en" ? "tr" : "en";

  const textColor = scrolled ? "text-[#1c2b2b]" : "text-white";
  const headerBg = scrolled
    ? "bg-white/95 border-b border-[#e8e8e0] backdrop-blur-md shadow-sm"
    : "bg-transparent";

  return (
    <header ref={headerRef} className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center gap-3 shrink-0">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src="/images/Logo Social Transparent.png"
              alt="ARDICTECH"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              style={{ mixBlendMode: scrolled ? "normal" : "screen" }}
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <span
              className="font-bold text-lg leading-tight"
              style={{ fontFamily: "'DM Serif Display', serif", color: scrolled ? "#1a4d3a" : "white" }}
            >
              ARDICTECH
            </span>
            <span className="text-[10px] font-bold leading-tight tracking-wide" style={{ color: "#4a8fdb" }}>
              Engineering Resilience
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? "hover:bg-[#1a4d3a]/5 hover:text-[#1a4d3a]" : "hover:bg-white/10"} ${textColor}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {openDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-1 min-w-[220px] rounded-xl border border-[#e8e8e0] bg-white shadow-xl py-2 z-50"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#505048] hover:bg-[#1a4d3a]/5 hover:text-[#1a4d3a] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#1a4d3a]/5 hover:text-[#1a4d3a] ${textColor}`}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          {/* Language switcher */}
          <a
            href={`/${otherLocale}`}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled ? "hover:bg-[#1a4d3a]/5 hover:text-[#1a4d3a]" : "hover:bg-white/10"} ${textColor}`}
            aria-label={`Switch to ${otherLocale === "en" ? "English" : "Turkish"}`}
          >
            <Globe className="h-4 w-4" />
            {otherLocale.toUpperCase()}
          </a>

          {/* CTA Button */}
          <a
            href={`/${locale}#contact`}
            className="ml-2 inline-flex items-center justify-center rounded-full bg-[#1a4d3a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#256b51] transition-all duration-200 hover:shadow-md"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {nav?.bookDemo || "Book a Demo"}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#1a4d3a]"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#e8e8e0] bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#c8a96e]">
                  {item.label}
                </div>
                {item.children?.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-6 py-2.5 text-sm text-[#505048] hover:bg-[#1a4d3a]/5 hover:text-[#1a4d3a] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            ))}

            <a
              href={`/${otherLocale}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#505048] hover:bg-[#1a4d3a]/5"
            >
              <Globe className="h-4 w-4" />
              {otherLocale === "en" ? "English" : "Türkçe"}
            </a>

            <a
              href={`/${locale}#contact`}
              onClick={() => setMobileOpen(false)}
              className="block mt-2 text-center rounded-full bg-[#1a4d3a] px-5 py-2.5 text-sm font-semibold text-white"
            >
              {nav?.bookDemo || "Book a Demo"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
