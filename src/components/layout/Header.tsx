/**
 * ============================================================================
 * src/components/layout/Header.tsx — Site Header / Navigation
 * ============================================================================
 *
 * Client-side header component with scroll-aware styling, desktop nav links,
 * a language switcher, and a mobile hamburger menu.
 *
 * HOW TO CUSTOMIZE:
 *   1. navItems: Update the `label` keys to match your dictionary nav keys
 *      and `href` targets to match your page section IDs or routes.
 *   2. Logo: The logo image is located at `/public/images/logo.png`.
 *   3. The language switcher (EN/TR) is built-in. To add a third locale,
 *      update the otherLocale logic and the SUPPORTED_LOCALES constant.
 *
 * DEPENDENCIES:
 *   - dict.site.name — from the active locale dictionary
 *   - dict.site.tagline — tagline shown under the logo
 *   - dict.nav.* — all navigation link labels
 * ============================================================================
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import type { Dictionary, Locale } from "@/types";
import Button from "@/components/ui/Button";

/** Props accepted by the Header component. */
interface HeaderProps {
  /** The full locale dictionary — used for all navigation text. */
  dict: Dictionary;
  /** Current active locale (e.g. "en" or "tr"). */
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  /* Controls whether the mobile side-drawer is open. */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Set to true after the user scrolls 10px — triggers the frosted header style. */
  const [scrolled, setScrolled] = useState(false);

  /* Listen to the scroll position for the frosted-glass effect on scroll. */
  useEffect(() => {
    /* Passive listener so it doesn't block paint. */
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Navigation items for the main desktop + mobile menu.
   * TODO: Update href values to match your section IDs in page.tsx.
   * The `label` is a key path into the dict.nav object for i18n text.
   */
  const navItems = [
    { label: dict.nav.solution, href: `/${locale}#features` },
    { label: dict.nav.caseStudies, href: `/${locale}#stats` },
    { label: dict.nav.roi, href: `/${locale}#cta` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}#contact` },
  ];

  /**
   * Handles clicks on anchor-link nav items.
   * If already on the homepage, scrolls smoothly without a full page reload.
   * If on a different page, navigates to the homepage with the hash.
   */
  const handleHashNavClick = (href: string, e: React.MouseEvent) => {
    /* Check if the user is already on the locale home page. */
    const isHomepage =
      window.location.pathname === `/${locale}` ||
      window.location.pathname === `/${locale}/`;

    /* Extract the hash fragment (e.g., "#contact"). */
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const hash = href.substring(hashIndex + 1);
      e.preventDefault();
      if (isHomepage) {
        /* Smooth-scroll to the target section element by ID. */
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", `/${locale}#${hash}`);
        }
      } else {
        /* Navigate to homepage with the hash — scroll will happen on load. */
        window.location.assign(`/${locale}#${hash}`);
      }
    }
  };

  /* The other locale for the language switcher link. */
  const otherLocale: Locale = locale === "en" ? "tr" : "en";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? /* Frosted-glass style when user has scrolled */
            "bg-black/80 border-b border-white/10 backdrop-blur-md"
          : /* Fully transparent when at the top of the page */
            "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* ── Logo & Company Name ──────────────────────────────────────────── */}
        <a href={`/${locale}`} className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/images/logo.png"
              alt={dict.site.name}
              width={48}
              height={48}
              className="h-full w-full object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            {/* Company name — reads from the dictionary (dict.site.name) */}
            <span
              className={`font-heading text-xl font-bold leading-tight transition-colors ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
              {dict.site.name}
            </span>
            {/* Tagline — reads from the dictionary (dict.site.tagline) */}
            <span
              className={`text-[11px] font-medium leading-tight transition-colors ${
                scrolled ? "text-neutral-400" : "text-white/90"
              }`}
            >
              {dict.site.tagline}
            </span>
          </div>
        </a>

        {/* ── Desktop Navigation ───────────────────────────────────────────── */}
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleHashNavClick(item.href, e)}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? "text-neutral-300" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Language switcher — links to the same page in the other locale. */}
          <a
            href={`/${otherLocale}`}
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent ${
              scrolled ? "text-neutral-300" : "text-white"
            }`}
            aria-label={`Switch to ${otherLocale === "en" ? "English" : "Turkish"}`}
          >
            <Globe className="h-4 w-4" />
            {otherLocale.toUpperCase()}
          </a>

          {/* CTA Button — links to the contact section */}
          <Button
            href={`/${locale}#contact`}
            onClick={(e: React.MouseEvent) =>
              handleHashNavClick(`/${locale}#contact`, e)
            }
            size="sm"
          >
            {dict.nav.bookDemo}
          </Button>
        </div>

        {/* ── Mobile Hamburger Toggle ──────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden ${scrolled ? "text-white" : "text-white"}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            /* Close (X) icon when menu is open */
            <X className="h-6 w-6" />
          ) : (
            /* Hamburger icon when menu is closed */
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-black/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {/* Render each nav item as a full-width block link */}
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  handleHashNavClick(item.href, e);
                  /* Close the mobile menu after navigation */
                  setMobileOpen(false);
                }}
                className="block rounded-lg px-4 py-3 text-base font-medium text-neutral-300 hover:bg-white/5 hover:text-accent"
              >
                {item.label}
              </a>
            ))}

            {/* Language switcher in the mobile menu */}
            <a
              href={`/${otherLocale}`}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-neutral-300 hover:bg-white/5"
            >
              <Globe className="h-4 w-4" />
              {otherLocale === "en" ? "English" : "Türkçe"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
