# CompanyTech Website - Implementation Plan

**Status:** ~85% Complete | **Remaining Work:** ~4 hours | **Launch Ready:** After critical fixes

---

## 📊 Project Overview

Enterprise B2B marketing website for CompanyTech's AI-powered manufacturing digital transformation platform. Built with Next.js 16, targeting Manufacturing CXOs and IT Directors.

**Primary Goal:** Generate 10+ qualified demo requests per month

**Tech Stack:**

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4.x
- Formspree (forms)
- Vercel (deployment)
- Bilingual (EN/TR)

---

## 1. PROJECT STRUCTURE

### Complete Folder/File Tree

```text
CompanyTech-website/
│
├── 📁 src/
│   │
│   ├── 📁 app/                           # Next.js App Router
│   │   ├── 📁 [locale]/                  # Dynamic locale routing
│   │   │   ├── layout.tsx               ✅ Server Component - Locale layout with metadata
│   │   │   ├── page.tsx                 ✅ Server Component - Homepage (all sections)
│   │   │   └── not-found.tsx            ✅ Server Component - 404 page
│   │   ├── layout.tsx                    ✅ Server Component - Root layout (fonts, global styles)
│   │   ├── globals.css                   ✅ Tailwind + custom design tokens
│   │   ├── robots.ts                     ✅ Dynamic robots.txt generation
│   │   └── sitemap.ts                    ✅ Dynamic sitemap.xml generation
│   │
│   ├── 📁 components/
│   │   │
│   │   ├── 📁 sections/                  # Organisms - Page sections
│   │   │   ├── HeroSection.tsx          ✅ Server Component - Above fold hero
│   │   │   ├── PlatformOverview.tsx     ✅ Server Component - 4-layer architecture
│   │   │   ├── CaseStudy.tsx            ✅ Server Component - Client success story
│   │   │   ├── RoiCalculator.tsx        ✅ Client Component - Interactive calculator
│   │   │   ├── FeaturesGrid.tsx         ✅ Server Component - 8 feature cards
│   │   │   ├── TechStack.tsx            ✅ Server Component - Technology overview
│   │   │   ├── Testimonials.tsx         ✅ Server Component - Customer quotes
│   │   │   └── ContactForm.tsx          ✅ Client Component - Demo request form
│   │   │
│   │   ├── 📁 layout/                    # Organisms - Structural
│   │   │   ├── Header.tsx               ✅ Server Component - Navigation + language switcher
│   │   │   ├── Footer.tsx               ✅ Server Component - Links, legal, social
│   │   │   ├── FooterNewsletter.tsx     ✅ Client Component - Newsletter signup
│   │   │   └── SkipToContent.tsx        ✅ Server Component - Accessibility link
│   │   │
│   │   └── 📁 ui/                        # Atoms & Molecules - Reusable
│   │       ├── Button.tsx               ✅ Server Component - CTA/link button
│   │       ├── FormField.tsx            ✅ Client Component - Input/select/textarea
│   │       ├── Slider.tsx               ✅ Client Component - Range input for ROI
│   │       ├── SectionWrapper.tsx       ✅ Server Component - Consistent spacing
│   │       ├── SectionHeading.tsx       ✅ Server Component - Title + subtitle pattern
│   │       ├── FeatureCard.tsx          ✅ Server Component - Feature display
│   │       ├── MetricCard.tsx           ✅ Server Component - Stat display
│   │       ├── TestimonialCard.tsx      ✅ Server Component - Quote card
│   │       └── Badge.tsx                ✅ Server Component - Label/tag
│   │
│   ├── 📁 lib/                           # Business logic & utilities
│   │   ├── 📁 dictionaries/              # i18n content
│   │   │   ├── en.json                  ✅ English copy (all sections)
│   │   │   └── tr.json                  ✅ Turkish copy (all sections)
│   │   ├── 📁 i18n/
│   │   │   ├── config.ts                ✅ Locale configuration
│   │   │   └── dictionaries.ts          ✅ Dictionary loader utility
│   │   ├── constants.ts                  ✅ Global constants (social links, nav)
│   │   ├── roi-calculator.ts             ✅ ROI calculation logic + types
│   │   └── structured-data.ts            ✅ SEO schema generation
│   │
│   ├── 📁 types/
│   │   └── index.ts                      ✅ TypeScript interfaces (Dictionary, Locale, etc.)
│   │
│   └── middleware.ts                     ❌ TO ADD - Root URL redirect
│
├── 📁 docs/
│   ├── prd.md                            ✅ Product requirements document
│   └── IMPLEMENTATION_PLAN.md            ✅ This file
│
├── 📁 public/                            ⚠️  Placeholder images (need real assets)
│   └── (images will go here)
│
├── .gitignore                            ✅ Node, Next.js, .env protection
├── package.json                          ✅ Dependencies locked
├── tsconfig.json                         ✅ Strict TypeScript config
├── next.config.ts                        ✅ Next.js configuration
├── postcss.config.mjs                    ✅ PostCSS for Tailwind
├── eslint.config.mjs                     ✅ ESLint flat config
├── README.md                             ✅ Project documentation
├── .env.example                          ❌ TO ADD - Environment variable template
└── .env.local                            ❌ TO ADD - Local environment variables
```

### Status Legend

- ✅ **Implemented & Production-Ready**
- ⚠️ **Exists but Needs Enhancement**
- ❌ **Missing - Required for Launch**

---

## 2. COMPONENT ARCHITECTURE

### Atomic Design Classification

#### **Atoms** (Basic UI elements)

**Button.tsx** — Server Component (default)

- Variants: `primary`, `secondary`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Props: `href` (link), `onClick` (button), `variant`, `size`, `className`, `children`

**Badge.tsx** — Server Component

- Simple label/tag component
- Used for certifications, technology tags

**Slider.tsx** — Client Component (`"use client"`)

- Range input with custom styling
- Props: `min`, `max`, `step`, `value`, `onChange`, `formatValue`
- Used in: ROI Calculator

#### **Molecules** (Combinations of atoms)

**FormField.tsx** — Client Component (`"use client"`)

- Input + label + error message
- Supports: text, email, tel, date, select, textarea
- Props: `label`, `name`, `type`, `required`, `error`, `value`, `onChange`, `options`

**SectionHeading.tsx** — Server Component

- Title + subtitle pattern
- Props: `title`, `subtitle`, `light` (for dark backgrounds)

**FeatureCard.tsx** — Server Component

- Icon + title + description
- Props: `title`, `description`, `icon` (Lucide component)

**MetricCard.tsx** — Server Component

- Large value + label
- Props: `value`, `label`
- Used in: Case Study metrics

**TestimonialCard.tsx** — Server Component

- Quote + author + role + company
- Props: `quote`, `name`, `role`, `company`

#### **Organisms** (Complete sections)

**HeroSection.tsx** — Server Component

- Headline + subheadline + 2 CTAs + trust indicators
- Full viewport height, gradient background
- Props: `dict` (Dictionary)

**PlatformOverview.tsx** — Server Component

- Section heading + 4 platform layers
- Each layer: name, tagline, description, benefits
- Props: `dict` (Dictionary)

**CaseStudy.tsx** — Server Component

- Company info + challenge + solution + 4 metrics + quote + CTA
- Props: `dict` (Dictionary)
- **STATUS:** ❌ Needs anonymization (remove "Kale Group")

**RoiCalculator.tsx** — Client Component (`"use client"`)

- 4 input sliders + real-time calculation + results display + CTA
- Uses `useState` for input management
- Props: `dict` (Dictionary)
- **STATUS:** ❌ Needs disclaimer added

**FeaturesGrid.tsx** — Server Component

- Section heading + 8 feature cards in responsive grid
- Props: `dict` (Dictionary)

**TechStack.tsx** — Server Component

- Section heading + 4 technology layers + certifications + CTA
- Props: `dict` (Dictionary)

**Testimonials.tsx** — Server Component

- Section heading + 4 testimonial cards
- Props: `dict` (Dictionary)
- **STATUS:** ❌ Needs anonymization (remove personal names)

**ContactForm.tsx** — Client Component (`"use client"`)

- Multi-field form + validation + Formspree submission + states
- Uses `useState` for form data, errors, submission status
- Honeypot spam prevention
- Props: `dict` (Dictionary)
- **STATUS:** ❌ Needs env variable for Formspree endpoint

### Server vs Client Components Decision Matrix

| Component            | Type       | Reason                                       |
| -------------------- | ---------- | -------------------------------------------- |
| HeroSection          | Server     | Static content, no interactivity             |
| PlatformOverview     | Server     | Static content, no interactivity             |
| CaseStudy            | Server     | Static content, no interactivity             |
| **RoiCalculator**    | **Client** | Interactive sliders, real-time calculations  |
| FeaturesGrid         | Server     | Static content, no interactivity             |
| TechStack            | Server     | Static content, no interactivity             |
| Testimonials         | Server     | Static content (no carousel JS needed)       |
| **ContactForm**      | **Client** | Form state, validation, submission           |
| Header               | Server     | Static navigation (language switch via link) |
| Footer               | Server     | Static links                                 |
| **FooterNewsletter** | **Client** | Form state management                        |
| Button               | Server     | Links don't need JS (onClick optional)       |
| **FormField**        | **Client** | Controlled inputs with onChange              |
| **Slider**           | **Client** | Range input with state                       |
| All other UI         | Server     | No interactivity needed                      |

**Key principle:** Default to Server Components. Only use `"use client"` for:

- Form inputs with state
- Interactive controls (sliders, toggles)
- Real-time calculations

---

## 3. IMPLEMENTATION PHASES

### ✅ Phase 1: Project Setup (COMPLETED)

**Duration:** ~2 hours

```bash
✅ Next.js 16 project initialized
✅ TypeScript configured (strict mode)
✅ Tailwind CSS 4 installed and configured
✅ ESLint with next/core-web-vitals
✅ Git repository initialized
✅ Folder structure created
```

**Complexity:** ⭐ Low (boilerplate)

---

### ✅ Phase 2: Design System & i18n Foundation (COMPLETED)

**Duration:** ~4 hours

```typescript
✅ Custom color tokens in globals.css
✅ Font integration (Inter, Source Sans 3)
✅ Locale configuration (en, tr)
✅ Dictionary structure (en.json, tr.json)
✅ Type definitions (Dictionary, Locale)
```

**Complexity:** ⭐⭐ Medium (design decisions + i18n architecture)

---

### ✅ Phase 3: Core UI Components (COMPLETED)

**Duration:** ~6 hours

```typescript
✅ Button (3 variants, 3 sizes)
✅ FormField (5 input types + select + textarea)
✅ Slider (custom range input)
✅ SectionWrapper (consistent spacing)
✅ SectionHeading (title + subtitle pattern)
✅ FeatureCard, MetricCard, TestimonialCard, Badge
```

**Complexity:** ⭐⭐ Medium (consistent API design)

---

### ✅ Phase 4: Layout Components (COMPLETED)

**Duration:** ~4 hours

```typescript
✅ Header with navigation + language switcher
✅ Footer with all sections
✅ FooterNewsletter (separate client component)
✅ SkipToContent (accessibility)
```

**Complexity:** ⭐⭐ Medium (responsive navigation)

---

### ✅ Phase 5: Static Page Sections (COMPLETED)

**Duration:** ~8 hours

```typescript
✅ HeroSection
✅ PlatformOverview
✅ CaseStudy
✅ FeaturesGrid
✅ TechStack
✅ Testimonials
```

**Complexity:** ⭐⭐⭐ Medium-High (content organization)

---

### ✅ Phase 6: Interactive Features (COMPLETED)

**Duration:** ~6 hours

```typescript
✅ RoiCalculator (4 sliders, real-time math)
✅ ContactForm (9 fields, validation, Formspree)
```

**Complexity:** ⭐⭐⭐⭐ High (state management, business logic)

---

### ✅ Phase 7: SEO & Metadata (COMPLETED)

**Duration:** ~3 hours

```typescript
✅ Dynamic metadata per locale
✅ OpenGraph tags
✅ Structured data (Organization, LocalBusiness)
✅ Sitemap.xml & Robots.txt
```

**Complexity:** ⭐⭐ Medium (SEO best practices)

---

### ⚠️ Phase 8: Content Population (COMPLETED with Caveats)

**Duration:** ~6 hours

```json
✅ All copy written in EN + TR
❌ Case study needs anonymization
❌ Testimonials need anonymization
❌ CWF messaging needs benefits rewrite
```

**Complexity:** ⭐⭐⭐ Medium-High (B2B enterprise copywriting)

---

### ❌ Phase 9: Environment Configuration (NOT DONE)

**Duration:** ~1 hour

```bash
❌ Create .env.example template
❌ Create .env.local for local development
❌ Update constants.ts to read from env
❌ Update .gitignore
```

**Complexity:** ⭐ Low (standard Next.js pattern)

---

### ❌ Phase 10: Critical Fixes (NOT DONE)

**Duration:** ~3 hours

```typescript
❌ Anonymize case study (remove "Kale Group")
❌ Anonymize testimonials (remove names)
❌ Rewrite CWF messaging (benefits-focused)
❌ Add ROI calculator disclaimer
❌ Add middleware for root URL redirect
```

**Complexity:** ⭐⭐ Medium (content editing + middleware)

---

### **Total Implementation Time:**

- **Already Invested:** ~39 hours
- **Remaining Work:** ~4 hours
- **Total:** ~43 hours

---

## 4. DATA FLOW

### A. Form Submission Flow

```text
User fills form
    ↓
Client-side validation (email format, required fields)
    ↓
Submit to Formspree (POST request)
    ↓
Formspree checks honeypot field
    ↓
Formspree sends email to sales@CompanyTech.com.tr
    ↓
Formspree sends auto-reply to user
    ↓
Success message displayed to user
```

**Spam prevention:**

- Honeypot field (invisible to humans, bots fill it)
- Client-side email validation
- Formspree's built-in spam filtering

---

### B. Language Switching Flow

```text
User visits site
    ↓
URL path checked: /en or /tr?
    ↓
Load corresponding dictionary (en.json or tr.json)
    ↓
Server renders page with localized content
    ↓
User clicks language switcher
    ↓
Navigate to /en or /tr (full page reload)
    ↓
New dictionary loaded, page re-rendered
```

**Key points:**

- Server-side rendering (no hydration delay)
- Static generation (both locales pre-rendered)
- No client state (just navigation)

---

### C. ROI Calculator Real-Time Calculation

```text
User moves slider
    ↓
onChange handler fires
    ↓
setInputs updates React state
    ↓
Component re-renders
    ↓
calculateRoi function runs with new inputs
    ↓
Results display updates immediately
```

**Performance:** O(1) calculation, no performance issues

---

## 5. CONTENT STRATEGY

### Content Status

| Section           | English | Turkish | Status                  |
| ----------------- | ------- | ------- | ----------------------- |
| Meta              | ✅      | ✅      | Ready                   |
| Navigation        | ✅      | ✅      | Ready                   |
| Hero              | ✅      | ✅      | Ready                   |
| Platform Overview | ✅      | ✅      | Ready                   |
| **Case Study**    | ⚠️      | ⚠️      | **Needs anonymization** |
| ROI Calculator    | ✅      | ✅      | **Needs disclaimer**    |
| Features          | ✅      | ✅      | Ready                   |
| Tech Stack        | ✅      | ✅      | Ready                   |
| **Testimonials**  | ⚠️      | ⚠️      | **Needs anonymization** |
| Contact Form      | ✅      | ✅      | Ready                   |
| Footer            | ✅      | ✅      | Ready                   |

### Assets Needed (Not Blocking Launch)

| Asset                  | Purpose              | Format         | Status                  |
| ---------------------- | -------------------- | -------------- | ----------------------- |
| Hero Background        | Visual interest      | 1920×1080 WebP | ⚠️ Gradient placeholder |
| Platform Diagram       | Explain architecture | SVG/PNG        | ⚠️ Text only            |
| Case Study Screenshots | Before/after         | PNG            | ❌ Not provided         |
| Company Logos          | Testimonials         | SVG            | ❌ Not provided         |
| Demo Video             | Overview CTA         | YouTube        | ❌ Not provided         |
| Case Study PDF         | Download             | PDF            | ❌ Not created          |
| Favicon                | Browser tab          | ICO/PNG        | ❌ Default              |
| OG Image               | Social sharing       | 1200×630 PNG   | ❌ Not created          |

**Approach:** Launch with functional placeholders, iterate with real assets

---

## 6. CRITICAL FIXES REQUIRED FOR LAUNCH

### Priority 1: Legal Compliance

#### 1. Anonymize Case Study

- **Files:** `src/lib/dictionaries/en.json`, `src/lib/dictionaries/tr.json`
- **Action:** Replace "Kale Group" → "Leading European Ceramics Manufacturer"
- **Also:** "Kale Grubu" → "Önde Gelen Avrupa Seramik Üreticisi" (TR)
- **Why:** No permission to use client name

#### 2. Anonymize Testimonials

- **Files:** Same dictionaries
- **Action:** Remove personal names or use generic titles
- **Example:** "Ahmet Yilmaz" → "Senior Manufacturing Director"

### Priority 2: Messaging Optimization

#### 3. Rewrite CWF Messaging

- **Files:** Platform overview section in both dictionaries
- **Current:** Feature-focused ("query factory data using natural language")
- **Target:** Benefits-focused ("Reduce decision time from hours to seconds")
- **Apply to:** All 4 platform layers

### Priority 3: Infrastructure

#### 4. Environment Variable Setup

- **Create:** `.env.example` with template
- **Create:** `.env.local` (git-ignored)
- **Update:** `src/lib/constants.ts` to read from `process.env`
- **Update:** `.gitignore` to protect `.env.local`

#### 5. Add Root URL Redirect

- **Create:** `src/middleware.ts`
- **Logic:** Detect browser language, redirect `/` to `/en` or `/tr`

### Priority 4: Trust Building

#### 6. Add ROI Calculator Disclaimer

- **File:** `src/components/sections/RoiCalculator.tsx`
- **Add:** Note about industry averages
- **Also:** Add to dictionaries for i18n support

---

## 7. DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] All critical fixes completed (anonymization, env vars, middleware)
- [ ] `npm run build` succeeds without errors
- [ ] No console errors in browser (dev mode)
- [ ] Test both `/en` and `/tr` routes
- [ ] Test root `/` redirect
- [ ] Test contact form submission (with test Formspree ID)
- [ ] Verify no "Kale" references anywhere

### Vercel Deployment

1. **Push to GitHub**
   - Ensure `.env.local` is NOT committed
   - Verify `.gitignore` is working

2. **Connect Vercel**
   - Import repository
   - Framework: Next.js (auto-detected)

3. **Environment Variables**
   - Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
   - Value: `https://formspree.io/f/[YOUR_ID]`

4. **Deploy**
   - Automatic on push to main

5. **Verify Production**
   - Test root URL redirect
   - Test form submission
   - Check Lighthouse scores
   - Verify no "Kale" references

6. **Custom Domain**
   - Add `CompanyTech.com.tr` in Vercel settings
   - Update DNS records (A/CNAME)
   - Verify SSL certificate

### Post-Launch

- [ ] Monitor form submissions in Formspree
- [ ] Check Vercel analytics (if Pro tier)
- [ ] Set up Google Analytics 4 (when ready)
- [ ] Replace placeholder images with real assets
- [ ] Create legal pages (Privacy, Terms, Cookies)

---

## 8. FUTURE ENHANCEMENTS (Post-MVP)

### Week 1

- Add Google Analytics 4 tracking
- Create basic legal pages (templates)
- Set up newsletter integration (Mailchimp/ConvertKit)

### Month 1

- Replace placeholder images with professional photos
- Create case study PDF download
- Add demo video embed
- Optimize images (WebP conversion)

### Month 2

- A/B test different headlines/CTAs
- Add blog/resources section
- Create additional case studies
- Implement marketing automation

### Month 3+

- Add live chat widget
- Create interactive platform demo
- Build customer portal (if needed)
- Expand to additional languages

---

## 9. TECHNICAL DECISIONS & RATIONALE

### Why Next.js 16?

- ✅ Best-in-class performance (Edge runtime, RSC)
- ✅ SEO excellence (SSR, static generation)
- ✅ Built-in i18n routing with App Router
- ✅ Vercel deployment = zero config

### Why Tailwind CSS 4?

- ✅ Rapid development with utility classes
- ✅ Consistent design system
- ✅ Tiny production bundle (~15-20KB)
- ✅ No CSS naming conflicts

### Why Formspree?

- ✅ Zero backend complexity
- ✅ 50 free submissions/month (10+ demos target)
- ✅ Email notifications built-in
- ✅ GDPR compliant

### Why Vercel?

- ✅ Optimized for Next.js (built by same team)
- ✅ Edge Network = global performance
- ✅ Preview deployments on every PR
- ✅ Free tier sufficient for MVP

### Why Server Components Default?

- ✅ Better performance (less JS sent to client)
- ✅ SEO benefits (content in initial HTML)
- ✅ Simpler data fetching (no useEffect)
- ✅ Only use Client Components when necessary

---

## 10. CONTACT & SUPPORT

**Project Repository:** [GitHub URL]
**Documentation:** See `README.md` for quick start
**PRD:** See `docs/prd.md` for product requirements
**Questions:** [Contact info]

---

**Last Updated:** February 1, 2026
**Document Version:** 1.0
**Project Status:** 85% Complete, Ready for Critical Fixes
