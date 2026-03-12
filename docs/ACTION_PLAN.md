# CompanyTech Website - Quick Action Plan

**Based on:** Comprehensive Project Analysis  
**Date:** February 1, 2026  
**Priority:** Fix critical issues before launch

---

## 🚨 Priority 1: Critical Fixes (Must Do Before Launch)

### 1. Content Anonymization ⚠️ LEGAL RISK

**Files:** `src/lib/dictionaries/en.json`, `src/lib/dictionaries/tr.json`

**Actions:**

- [ ] Replace "Kale Group" → "Leading European Ceramics Manufacturer" (EN)
- [ ] Replace "Kale Grubu" → "Önde Gelen Avrupa Seramik Üreticisi" (TR)
- [ ] Remove personal names from testimonials
- [ ] Replace with generic titles (e.g., "Senior Manufacturing Director")

**Time:** 1 hour

---

### 2. Add Error Boundaries ⚠️ UX RISK

**File:** `src/components/ErrorBoundary.tsx` (new)

**Actions:**

- [ ] Create ErrorBoundary component
- [ ] Wrap main page sections
- [ ] Add fallback UI with error message
- [ ] Log errors to monitoring service (future)

**Time:** 1 hour

**Code:**

```typescript
// src/components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2>Something went wrong</h2>
          <p>Please refresh the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

### 3. Add Security Headers ⚠️ SECURITY RISK

**File:** `next.config.ts`

**Actions:**

- [ ] Add security headers configuration
- [ ] Configure Content Security Policy
- [ ] Test headers with securityheaders.com

**Time:** 1 hour

**Code:**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

---

### 4. Environment Variable Validation ⚠️ STABILITY RISK

**File:** `src/lib/env.ts` (new)

**Actions:**

- [ ] Create env validation utility
- [ ] Validate at build time
- [ ] Provide clear error messages

**Time:** 30 minutes

**Code:**

```typescript
// src/lib/env.ts
const requiredEnvVars = ["NEXT_PUBLIC_FORMSPREE_ENDPOINT"] as const;

export function validateEnv() {
  if (typeof window !== "undefined") return; // Client-side skip

  const missing = requiredEnvVars.filter(
    (key) => !process.env[key] || process.env[key]?.includes("YOUR_"),
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing or invalid required environment variables:\n${missing.join("\n")}\n\n` +
        `Please check your .env.local file.`,
    );
  }
}

// Call in next.config.ts or middleware
```

---

### 5. Set Up Testing Framework ⚠️ QUALITY RISK

**Files:** Multiple new test files

**Actions:**

- [ ] Install testing dependencies
- [ ] Configure Jest
- [ ] Add critical path tests
- [ ] Set up CI test runner

**Time:** 4 hours

**Commands:**

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @types/jest
```

**Priority Tests:**

1. ROI calculator logic
2. Form validation
3. Dictionary loading
4. Currency formatting

---

## ⚡ Priority 2: Important Improvements (Do Soon)

### 6. Performance Optimizations

**Files:** `src/components/sections/RoiCalculator.tsx`, `src/app/[locale]/page.tsx`

**Actions:**

- [ ] Add `useMemo` to ROI calculator
- [ ] Lazy load below-fold sections
- [ ] Add bundle analyzer

**Time:** 2 hours

---

### 7. Accessibility Fixes

**Files:** `src/components/layout/Header.tsx`, `src/components/sections/ContactForm.tsx`, `src/app/globals.css`

**Actions:**

- [ ] Fix secondary color contrast
- [ ] Add focus trap to mobile menu
- [ ] Add ESC key handler
- [ ] Improve form error announcements

**Time:** 2 hours

---

### 8. SEO Enhancements

**Files:** `src/app/[locale]/layout.tsx`, `src/lib/structured-data.ts`

**Actions:**

- [ ] Add Twitter Cards
- [ ] Add WebSite schema
- [ ] Complete structured data

**Time:** 1 hour

---

### 9. Code Quality

**Files:** Multiple

**Actions:**

- [ ] Add Prettier config
- [ ] Fix hard-coded "Sending..." text
- [ ] Add JSDoc comments to key functions

**Time:** 3 hours

---

## 📋 Quick Checklist

### Before Launch

- [ ] All Priority 1 items completed
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] Test both `/en` and `/tr` routes
- [ ] Test form submission
- [ ] Verify no "Kale" references
- [ ] Check security headers
- [ ] Test on mobile devices

### Post-Launch Monitoring

- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor form submissions
- [ ] Check Lighthouse scores
- [ ] Review analytics data

---

## 🎯 Estimated Timeline

**Week 1:**

- Day 1-2: Priority 1 fixes (7.5 hours)
- Day 3-4: Priority 2 items (8 hours)
- Day 5: Testing & QA

**Total:** ~15.5 hours of focused work

---

## 📝 Notes

- All Priority 1 items are **blockers** for production launch
- Priority 2 items can be done post-launch but should be scheduled soon
- Testing framework is critical for long-term maintainability
- Security headers are essential for production security

---

**Last Updated:** February 1, 2026
