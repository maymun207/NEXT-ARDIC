# TODO - CompanyTech Website Launch Checklist

**Project Status:** 85% Complete | **Remaining:** ~4 hours of work  
**Target Launch:** After completing all Critical items  
**Last Updated:** February 1, 2026

---

## 🔴 CRITICAL - Must Complete Before Launch

### Legal & Compliance (HIGHEST PRIORITY)

- [ ] **Anonymize Case Study - English**
  - **File:** `src/lib/dictionaries/en.json`
  - **Action:** Replace "Kale Group" → "Leading European Ceramics Manufacturer"
  - **Lines:** ~76-93 (caseStudy section)
  - **Also check:** Testimonials section for any Kale references
  - **Time:** 15 min
  - **Risk:** LEGAL LIABILITY if launched with unauthorized client name

- [ ] **Anonymize Case Study - Turkish**
  - **File:** `src/lib/dictionaries/tr.json`
  - **Action:** Replace "Kale Grubu" → "Önde Gelen Avrupa Seramik Üreticisi"
  - **Lines:** ~76-93 (caseStudy section)
  - **Time:** 15 min
  - **Risk:** Same as above

- [ ] **Anonymize Testimonials - English**
  - **File:** `src/lib/dictionaries/en.json`
  - **Action:** Remove/anonymize personal names
  - **Example:** "Ahmet Yilmaz" → "Senior Manufacturing Director" or remove name entirely
  - **Lines:** ~183-207 (testimonials section)
  - **Time:** 10 min

- [ ] **Anonymize Testimonials - Turkish**
  - **File:** `src/lib/dictionaries/tr.json`
  - **Action:** Same as English version
  - **Lines:** ~183-207 (testimonials section)
  - **Time:** 10 min

- [ ] **Verify No "Kale" References Remain**
  - **Action:** Search entire codebase for "Kale" and "Ahmet"
  - **Command:** `grep -r "Kale" src/lib/dictionaries/`
  - **Expected:** 0 results
  - **Time:** 5 min

**Total Critical Legal Time:** ~55 minutes

---

### Messaging Optimization (HIGH PRIORITY)

- [ ] **Rewrite CWF (Chat With Your Factory) Description**
  - **File:** `src/lib/dictionaries/en.json`
  - **Location:** Platform overview → CWF layer
  - **Current:** Feature-focused ("query factory data using natural language")
  - **Target:** Benefits-focused ("Reduce decision time from hours to seconds")
  - **New Copy:** "Get instant answers to critical production questions in seconds, not hours. Ask 'Why is Line 3 down?' or 'Show me quality trends' and receive actionable insights—no dashboards, no delays."
  - **Time:** 20 min

- [ ] **Rewrite CWF Benefits - English**
  - **Same file:** Update 3 benefits to be outcome-focused
  - **New Benefits:**
    - "Reduce decision time from hours to seconds"
    - "Empower non-technical managers with data access"
    - "Eliminate dashboard navigation complexity"
  - **Time:** 10 min

- [ ] **Rewrite CWF - Turkish Version**
  - **File:** `src/lib/dictionaries/tr.json`
  - **Action:** Translate new English copy to Turkish
  - **Time:** 20 min

- [ ] **Review All 4 Platform Layers for Benefits Focus**
  - **Files:** Both EN and TR dictionaries
  - **Layers:** IoT-IGNITE, ArMES, ArAI, CWF
  - **Check:** Do descriptions emphasize business value over features?
  - **Time:** 15 min

**Total Messaging Time:** ~65 minutes

---

### Infrastructure Setup (HIGH PRIORITY)

- [ ] **Create .env.example Template**
  - **File:** `.env.example` (root directory)
  - **Content:**

    ```env
    # Form Submission
    # Get your form ID from https://formspree.io after creating an account
    NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

    # Analytics (Optional - add when ready)
    # NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

    # Deployment
    # NODE_ENV=production
    ```

  - **Time:** 5 min

- [ ] **Update .gitignore for .env.local**
  - **File:** `.gitignore`
  - **Action:** Add explicit `.env.local` entry if not present
  - **Verify:** `.env*.local` already exists (should be line 19)
  - **Time:** 2 min

- [ ] **Update constants.ts for Environment Variables**
  - **File:** `src/lib/constants.ts`
  - **Current:** `export const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";`
  - **New:**
    ```typescript
    export const FORMSPREE_ENDPOINT =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
      "https://formspree.io/f/YOUR_FORM_ID"; // Fallback for dev
    ```
  - **Time:** 3 min

- [ ] **Create .env.local for Local Development**
  - **File:** `.env.local` (root directory, git-ignored)
  - **Content:** Copy from `.env.example`, add actual values
  - **Note:** This file is personal, not committed to git
  - **Time:** 2 min

**Total Infrastructure Time:** ~12 minutes

---

### User Experience (HIGH PRIORITY)

- [ ] **Create Middleware for Root URL Redirect**
  - **File:** `src/middleware.ts` (NEW FILE)
  - **Purpose:** Redirect `/` to `/en` or `/tr` based on browser language
  - **Code:**

    ```typescript
    import { NextResponse } from "next/server";
    import type { NextRequest } from "next/server";

    export function middleware(request: NextRequest) {
      const pathname = request.nextUrl.pathname;

      // Handle root URL redirect
      if (pathname === "/") {
        // Detect browser language
        const acceptLanguage = request.headers.get("accept-language") || "";
        const prefersTurkish = acceptLanguage.toLowerCase().includes("tr");

        const locale = prefersTurkish ? "tr" : "en";
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }

      return NextResponse.next();
    }

    export const config = {
      matcher: "/",
    };
    ```

  - **Time:** 10 min

- [ ] **Test Root URL Redirect**
  - **Action:** Start dev server, visit `http://localhost:3000/`
  - **Expected:** Automatically redirects to `/en` or `/tr`
  - **Test both:** Change browser language settings
  - **Time:** 5 min

**Total UX Time:** ~15 minutes

---

### Trust & Credibility (MEDIUM PRIORITY)

- [ ] **Add ROI Calculator Disclaimer - Component**
  - **File:** `src/components/sections/RoiCalculator.tsx`
  - **Location:** After results display, before CTA button
  - **Code:**
    ```tsx
    <p className="mt-4 text-xs text-neutral-400 text-center">
      {dict.roi.disclaimer}
    </p>
    ```
  - **Time:** 5 min

- [ ] **Add ROI Disclaimer Copy - English**
  - **File:** `src/lib/dictionaries/en.json`
  - **Location:** Inside `roi` object
  - **Add:**
    ```json
    "disclaimer": "* Estimates based on industry averages from manufacturing clients. Actual results vary by facility, implementation scope, and operational maturity."
    ```
  - **Time:** 3 min

- [ ] **Add ROI Disclaimer Copy - Turkish**
  - **File:** `src/lib/dictionaries/tr.json`
  - **Location:** Inside `roi` object
  - **Translation:**
    ```json
    "disclaimer": "* Tahminler üretim müşterilerinden elde edilen sektör ortalamalarına dayanmaktadır. Gerçek sonuçlar tesis, uygulama kapsamı ve operasyonel olgunluğa göre değişir."
    ```
  - **Time:** 5 min

**Total Trust Time:** ~13 minutes

---

## 🔴 CRITICAL TOTAL TIME: ~3 hours

**Breakdown:**

- Legal/Compliance: 55 min
- Messaging: 65 min
- Infrastructure: 12 min
- UX (Middleware): 15 min
- Trust (Disclaimer): 13 min

---

## 🟡 IMPORTANT - Post-Launch Week 1

### External Services Setup

- [ ] **Create Formspree Account**
  - **URL:** https://formspree.io
  - **Action:** Sign up for free account
  - **Time:** 5 min

- [ ] **Create Formspree Form**
  - **Action:** Create new form in Formspree dashboard
  - **Settings:**
    - Name: "CompanyTech Demo Requests"
    - Email: sales@CompanyTech.com.tr
    - Enable spam filtering
  - **Time:** 5 min

- [ ] **Get Formspree Form ID**
  - **Action:** Copy form ID from URL
  - **Format:** `https://formspree.io/f/xyzabc123`
  - **Save:** Form ID is `xyzabc123`
  - **Time:** 2 min

- [ ] **Add Formspree ID to .env.local**
  - **File:** `.env.local`
  - **Update:** `NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xyzabc123`
  - **Time:** 1 min

- [ ] **Test Form Submission Locally**
  - **Action:** Restart dev server, fill out contact form, submit
  - **Expected:** Email received at sales@CompanyTech.com.tr
  - **Verify:** Success message displays on screen
  - **Time:** 10 min

**Total External Services:** ~23 minutes

---

### Deployment Preparation

- [ ] **Run Production Build Test**
  - **Command:** `npm run build`
  - **Expected:** Build completes without errors
  - **Check:** No TypeScript errors, no build warnings
  - **Time:** 5 min

- [ ] **Test Production Build Locally**
  - **Command:** `npm run start` (after build)
  - **Test:** Visit both `/en` and `/tr` routes
  - **Verify:** All functionality works in production mode
  - **Time:** 10 min

- [ ] **Run Lighthouse Audit**
  - **Tool:** Chrome DevTools → Lighthouse
  - **Target Scores:**
    - Performance: >90
    - Accessibility: >95
    - SEO: >95
  - **Action:** Fix any issues below target
  - **Time:** 15 min

- [ ] **Push to GitHub**
  - **Command:** `git add . && git commit -m "feat: complete critical launch fixes" && git push`
  - **Verify:** `.env.local` is NOT in the commit
  - **Time:** 5 min

**Total Deployment Prep:** ~35 minutes

---

### Vercel Deployment

- [ ] **Connect Repository to Vercel**
  - **URL:** https://vercel.com
  - **Action:** Import GitHub repository
  - **Framework:** Next.js (auto-detected)
  - **Time:** 5 min

- [ ] **Add Environment Variables in Vercel**
  - **Location:** Project Settings → Environment Variables
  - **Add:**
    - Key: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
    - Value: `https://formspree.io/f/[YOUR_ACTUAL_ID]`
  - **Scope:** Production, Preview, Development
  - **Time:** 3 min

- [ ] **Deploy to Production**
  - **Action:** Push to main branch (auto-deploys)
  - **Monitor:** Build logs in Vercel dashboard
  - **Time:** 5 min (build time)

- [ ] **Verify Production Deployment**
  - **URL:** Provided by Vercel (e.g., CompanyTech.vercel.app)
  - **Test Checklist:**
    - [ ] Root URL redirects to language
    - [ ] Both `/en` and `/tr` work
    - [ ] Contact form submits successfully
    - [ ] No "Kale" references visible
    - [ ] ROI calculator works
    - [ ] All navigation links work
  - **Time:** 10 min

- [ ] **Add Custom Domain**
  - **Domain:** CompanyTech.com.tr
  - **Action:** Add in Vercel settings
  - **DNS:** Update A/CNAME records (Vercel provides instructions)
  - **SSL:** Auto-generated by Vercel
  - **Time:** 15 min (+ DNS propagation wait)

**Total Vercel Deployment:** ~38 minutes

---

## 🟡 IMPORTANT TOTAL TIME: ~1.5 hours

---

## 🟢 NICE-TO-HAVE - Iterative Improvements

### Content Assets (Non-Blocking)

- [ ] **Hero Background Image**
  - **Format:** 1920×1080 WebP with PNG fallback
  - **Source:** Professional factory floor photo
  - **Location:** `public/images/hero-bg.webp`
  - **Update:** `src/components/sections/HeroSection.tsx`
  - **Priority:** Medium
  - **Time:** 30 min (sourcing + implementation)

- [ ] **Platform Architecture Diagram**
  - **Format:** SVG (scalable) or high-res PNG
  - **Content:** Visual representation of 4-layer stack
  - **Location:** `public/images/platform-architecture.svg`
  - **Update:** `src/components/sections/PlatformOverview.tsx`
  - **Priority:** Medium
  - **Time:** 2 hours (design + implementation)

- [ ] **Case Study Screenshots**
  - **Format:** PNG optimized, ~800px wide
  - **Content:** Before/after CWF interface (anonymized)
  - **Location:** `public/images/case-study-*.png`
  - **Update:** `src/components/sections/CaseStudy.tsx`
  - **Priority:** Low
  - **Time:** 1 hour (sourcing + optimization)

- [ ] **Company Logos for Testimonials**
  - **Format:** SVG preferred (PNG as fallback)
  - **Logos:** Generic industry logos or remove if anonymized
  - **Location:** `public/images/logos/`
  - **Priority:** Low
  - **Time:** 30 min

- [ ] **Favicon & App Icons**
  - **Sizes:** 16×16, 32×32, 180×180, 192×192
  - **Source:** CompanyTech logo
  - **Location:** `public/favicon.ico` and `public/icons/`
  - **Update:** `src/app/layout.tsx` metadata
  - **Priority:** Medium
  - **Time:** 20 min

- [ ] **Open Graph Image**
  - **Size:** 1200×630 PNG
  - **Content:** Brand + headline
  - **Location:** `public/images/og-image.png`
  - **Update:** Metadata in `src/app/[locale]/layout.tsx`
  - **Priority:** Medium (for social sharing)
  - **Time:** 30 min

**Total Assets:** ~5 hours (can be done in parallel with launch)

---

### Legal & Compliance Pages

- [ ] **Privacy Policy Page**
  - **File:** `src/app/[locale]/privacy/page.tsx` (NEW)
  - **Content:** GDPR-compliant privacy policy
  - **Template:** Use standard template, customize for CompanyTech
  - **Priority:** High (linked in footer)
  - **Time:** 2 hours (legal review recommended)

- [ ] **Terms of Service Page**
  - **File:** `src/app/[locale]/terms/page.tsx` (NEW)
  - **Content:** Website usage terms
  - **Priority:** High (linked in footer)
  - **Time:** 1.5 hours

- [ ] **Cookie Policy Page**
  - **File:** `src/app/[locale]/cookies/page.tsx` (NEW)
  - **Content:** Cookie usage disclosure
  - **Priority:** Medium (GDPR requirement)
  - **Time:** 1 hour

**Total Legal Pages:** ~4.5 hours

---

### Analytics & Tracking (Deferred per User Request)

- [ ] **Google Analytics 4 Setup**
  - **Action:** Create GA4 property
  - **Get:** Measurement ID (G-XXXXXXXXXX)
  - **Priority:** Deferred to post-launch
  - **Time:** 15 min

- [ ] **Create Analytics Helper Library**
  - **File:** `src/lib/analytics.ts` (NEW)
  - **Functions:** `pageview()`, `event()`
  - **Priority:** Deferred
  - **Time:** 20 min

- [ ] **Add GA4 Scripts to Layout**
  - **File:** `src/app/[locale]/layout.tsx`
  - **Add:** Google Tag Manager scripts
  - **Priority:** Deferred
  - **Time:** 10 min

- [ ] **Implement Event Tracking**
  - **Components:** HeroSection, RoiCalculator, ContactForm
  - **Events:** CTA clicks, calculator interactions, form submissions
  - **Priority:** Deferred
  - **Time:** 30 min

**Total Analytics:** ~1.25 hours (DEFERRED)

---

### Rich Media

- [ ] **Demo Video**
  - **Platform:** YouTube (embed)
  - **Duration:** 2 minutes
  - **Content:** Platform overview and CWF demo
  - **Action:** Once video ready, add URL to `src/components/sections/HeroSection.tsx`
  - **Priority:** Low
  - **Time:** 10 min (implementation only, video production separate)

- [ ] **Case Study PDF**
  - **Content:** Full case study with detailed metrics
  - **Format:** PDF with CompanyTech branding
  - **Location:** `public/downloads/case-study.pdf`
  - **Link:** Update CTA in `src/components/sections/CaseStudy.tsx`
  - **Priority:** Low
  - **Time:** 3 hours (content writing + design)

**Total Rich Media:** ~3 hours (external production not counted)

---

## 📊 SUMMARY

### Time Estimates

| Priority        | Category                         | Time       |
| --------------- | -------------------------------- | ---------- |
| 🔴 Critical     | Legal, Messaging, Infrastructure | ~3 hours   |
| 🟡 Important    | Services, Deployment             | ~1.5 hours |
| 🟢 Nice-to-Have | Assets, Legal Pages, Media       | ~12+ hours |

### Launch Readiness

**To launch MVP:**

- Complete all 🔴 Critical items (~3 hours)
- Complete all 🟡 Important items (~1.5 hours)
- **Total:** ~4.5 hours of focused work

**Post-launch polish:**

- 🟢 Nice-to-Have items can be completed iteratively
- Not blocking for initial launch
- Improves user experience and trust over time

---

## ✅ COMPLETION TRACKING

As you complete items, mark them with `[x]` in the checkbox:

```markdown
- [x] Anonymize Case Study - English ✅ DONE
```

---

## 🚨 BLOCKERS & RISKS

### Current Blockers

- None (all work is internal)

### Potential Risks

1. **Formspree free tier (50/month)** — Low risk, upgrade available
2. **DNS propagation delay** — Can take 24-48 hours for custom domain
3. **Legal page templates** — May need professional legal review

### Dependencies

1. **Middleware requires Next.js 16** ✅ Already on 16.1.6
2. **Environment variables require Vercel account** ✅ User confirmed Vercel
3. **Form requires Formspree account** ⏸️ To be created

---

## 📞 QUESTIONS TO RESOLVE

- [ ] Who will provide final approval for anonymized copy?
- [ ] Do we have access to professional factory photos?
- [ ] Is there an existing demo video or should we use placeholder?
- [ ] Should legal pages be reviewed by attorney before launch?

---

**Last Updated:** February 1, 2026  
**Maintained By:** Development Team  
**Review Frequency:** Daily during critical phase, weekly post-launch
