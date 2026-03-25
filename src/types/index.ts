/**
 * ============================================================================
 * src/types/index.ts — Global TypeScript Type Definitions
 * ============================================================================
 *
 * Defines the core types used across the application.
 *
 * KEY TYPES:
 *   - Locale         → Union of supported locale codes (e.g. "en" | "tr")
 *   - Dictionary     → Shape of the i18n locale dictionary (en.json / tr.json)
 *
 * HOW TO CUSTOMIZE:
 *   1. To add a new locale: add it to the Locale union AND add a new 
 *      dictionary file in src/lib/dictionaries/<locale>.json.
 *   2. To add new dictionary keys: extend the relevant Dictionary section
 *      AND add the key to BOTH en.json and tr.json (the i18n test enforces parity).
 *
 * NOTE: The Dictionary type must always match the structure of en.json / tr.json.
 * The i18n test (src/__tests__/lib/i18n.test.ts) validates this at runtime.
 * ============================================================================
 */

/** Union of all supported locale codes. Add new locales here and in middleware. */
export type Locale = "en" | "tr";

/**
 * Full shape of the locale dictionary loaded from en.json / tr.json.
 * Every key and nested key in this interface must exist in both dictionary files.
 *
 * IMPORTANT: Keep this in sync with src/lib/dictionaries/en.json.
 * The i18n parity test will fail if they diverge.
 */
export interface Dictionary {
  /** Page-level HTML <title> and meta description tags. */
  meta: {
    /** <title> tag content — should include the site name and main keyword. */
    title: string;
    /** Meta description — 120–160 chars for best SEO. */
    description: string;
  };

  /** Core site identity fields used in the header, footer, and structured data. */
  site: {
    /** The company/product name (e.g. "ACME Corp"). Replaces YOUR_COMPANY_NAME. */
    name: string;
    /** Short tagline shown under the logo in the header. */
    tagline: string;
    /** One-sentence description used in structured data and Open Graph. */
    description: string;
    /** Canonical URL (e.g. "https://yourdomain.com"). Used in sitemap/structured data. */
    url: string;
  };

  /** Navigation link text for the Header component. */
  nav: {
    /** "Our Solution" — links to #features */
    solution: string;
    /** "Case Studies" — links to #stats */
    caseStudies: string;
    /** "Features" — links to #features */
    features: string;
    /** "ROI Calculator" — can link to a dedicated page */
    roi: string;
    /** "About Us" — links to /about */
    about: string;
    /** "Contact Us" — links to #contact */
    contact: string;
    /** Primary CTA button in the header */
    bookDemo: string;
  };

  /** Content for the HeroSection component. */
  hero: {
    /** Optional pill badge above the headline (e.g. "Enterprise-Grade from Day One"). */
    badge?: string;
    /** Main h1 headline — the most important message on the page. */
    headline: string;
    /** Supporting subheadline paragraph below the headline. */
    subheadline: string;
    /** Primary CTA button label (e.g. "Book a Demo"). */
    ctaPrimary: string;
    /** Secondary CTA button label (e.g. "Learn More"). */
    ctaSecondary: string;
  };

  heroSlider: {
    slide1: { headline: string; subheadline: string };
    slide2: { headline: string; subheadline: string; feature1: string; feature2: string };
    slide3: { headline: string; subheadline: string };
  };

  /** Content for the FeaturesSection component. */
  features: {
    /** Section h2 heading. */
    title: string;
    /** Section subheading paragraph. */
    subtitle: string;
    /**
     * Array of feature cards. Each card maps to one grid cell.
     * icon: must be a key in the ICON_MAP in FeaturesSection.tsx (e.g. "Zap").
     */
    items: {
      /** Lucide icon name string. See ICON_MAP in FeaturesSection.tsx. */
      icon: string;
      /** Feature card title. */
      title: string;
      /** Feature card description (1–2 sentences). */
      description: string;
    }[];
  };

  /** Content for the StatsSection component. */
  stats: {
    /** Optional section title above the metrics band. */
    title?: string;
    /** Array of metric items (typically 4 for a 4-column band). */
    items: {
      /** The quantified value (e.g. "40%", "500+", "$2M"). */
      value: string;
      /** Short label below the value (e.g. "Average Efficiency Gain"). */
      label: string;
      /** Optional sublabel (e.g. "In the first 90 days"). */
      sublabel?: string;
    }[];
  };

  /** Content for the CTASection component. */
  cta: {
    /** Bold CTA headline. */
    headline: string;
    /** Optional supporting subtitle below the headline. */
    subtitle?: string;
    /** Primary button label. */
    button: string;
  };

  /** Content for the ContactSection component and /api/contact route. */
  contact: {
    /** Section h2 heading. */
    title: string;
    /** Section subheading paragraph. */
    subtitle: string;
    /** Form field labels. */
    fields: {
      /** "Full Name" field label */
      fullName: string;
      /** "Business Email" field label */
      email: string;
      /** "Company Name" field label */
      company: string;
      /** "Phone Number" field label */
      phone: string;
      /** "Message" textarea label */
      message: string;
    };
    /** Submit button label when idle. */
    submit: string;
    /** Success message shown after a successful API response. */
    success: string;
    /** Error message shown after a failed API request. */
    error: string;
    /** Submit button label while the request is in-flight. */
    sending: string;
    /** GDPR privacy notice shown below the form. */
    privacy: string;
  };

  /** Content for the newsletter subscription form in the footer. */
  newsletter: {
    /** Section title. */
    title: string;
    /** Email input placeholder text. */
    placeholder: string;
    /** Subscribe button label. */
    subscribe: string;
    /** Success message after opt-in. */
    success: string;
    /** Error message after a failed subscription attempt. */
    error: string;
    /** GDPR consent checkbox label. */
    consent: string;
  };

  /** Content for the Footer component. */
  footer: {
    /** Short tagline below the company name. */
    tagline: string;
    /** Optional location string (e.g. "New York, USA"). Remove MapPin if not needed. */
    location?: string;
    /** "Quick Links" column heading. */
    quickLinks: string;
    /** "Legal" column heading. */
    legal: string;
    /** Quick links dictionary — key = route suffix, value = label. */
    links: {
      about: string;
      platform: string;
      caseStudies: string;
      contact: string;
      careers: string;
    };
    /**
     * Legal links dictionary — key = route path, value = label.
     * The key becomes the href: /<locale>/<key>
     * Example: { "privacy-policy": "Privacy Policy" }
     */
    legalLinks: Record<string, string>;
    /** Newsletter widget in the footer column. */
    newsletter: {
      title: string;
      placeholder: string;
      subscribe: string;
      gdpr: string;
    };
    /** Copyright line at the bottom. */
    copyright: string;
  };

  /** Content for the GDPR Cookie Consent banner (src/components/ui/CookieConsent.tsx). */
  cookieConsent: {
    /** Banner title. */
    title: string;
    /** Banner description explaining the cookie policy. */
    description: string;
    /** Per-category toggle labels and descriptions. */
    categories: {
      necessary: { label: string; description: string };
      analytics: { label: string; description: string };
      marketing: { label: string; description: string };
    };
    /** Button labels. */
    buttons: {
      acceptAll: string;
      rejectNonEssential: string;
      customize: string;
      savePreferences: string;
    };
    /** Footer links inside the banner. */
    links: {
      privacyPolicy: string;
      cookiePolicy: string;
    };
  };

  /** Error page content for 404 and 500 pages. */
  errors: {
    /** 404 Not Found page. */
    notFound: {
      title: string;
      description: string;
      back: string;
    };
    /** 500 Server Error page. */
    serverError: {
      title: string;
      description: string;
      reset: string;
    };
  };

  /**
   * Cookie Policy page content (src/app/[locale]/cookie-policy/page.tsx).
   * Optional — include only if you have a cookie-policy page.
   */
  cookiePage?: {
    badge: string;
    title: string;
    lastUpdated: string;
    ctaText: string;
    ctaBack: string;
    privacyLink: string;
    privacyHref: string;
    sections: {
      heading: string;
      body: string;
    }[];
  };

  /**
   * Privacy Policy page content (src/app/[locale]/privacy-policy/page.tsx).
   * Optional — include only if you have a privacy-policy page.
   */
  privacyPage?: {
    badge: string;
    title: string;
    lastUpdated: string;
    ctaText: string;
    ctaBack: string;
    cookieLink: string;
    cookieHref: string;
    sections: {
      heading: string;
      body: string;
    }[];
  };

  /** Labels for the floating AI chat assistant (src/components/ui/ChatWidget.tsx). */
  chatAgent: {
    /** Panel and button title (e.g. "AI Assistant"). */
    title: string;
    /** Subtitle shown in the open panel header (e.g. "Online · Powered by AI"). */
    subtitle: string;
    /** Textarea placeholder text. */
    placeholder: string;
    /** Send button label. */
    send: string;
    /** Default opening greeting message from the assistant. */
    greeting: string;
    /** Text shown while waiting for an AI response. */
    thinking: string;
    /** Error message displayed when the API call fails. */
    error: string;
    /** Footer attribution text inside the panel. */
    poweredBy: string;
  };
}
