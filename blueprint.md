# CompanyTech Website — Project Blueprint

> AI-powered digital-transformation platform website for **CompanyTech** (Istanbul, TR).
> Live at **<https://CompanyTech.com.tr>**

---

## 1. Tech Stack

| Layer           | Technology                                                      | Version    |
| --------------- | --------------------------------------------------------------- | ---------- |
| **Framework**   | Next.js (App Router)                                            | 16.1       |
| **UI Library**  | React                                                           | 19.2       |
| **Language**    | TypeScript (strict)                                             | 5.9        |
| **Styling**     | Tailwind CSS v4 + PostCSS (`@tailwindcss/postcss`)              | 4.1        |
| **Animations**  | Framer Motion                                                   | 12.31      |
| **Icons**       | Lucide React                                                    | 0.563      |
| **AI / Chat**   | Google Generative AI SDK (`@google/generative-ai`)              | 0.24       |
| **Google APIs** | `googleapis` (Drive loader for knowledge base)                  | 171.4      |
| **Email**       | Nodemailer (SMTP → Gmail)                                       | 8.0        |
| **PDF**         | react-pdf + unpdf                                               | 10.4 / 1.4 |
| **Fonts**       | Inter (headings), Source Sans 3 (body) — via `next/font/google` | —          |
| **Deployment**  | **Vercel** (project `CompanyTech-website`)                      | —          |

### Key Dev Dependencies

- `eslint` 9.39 + `eslint-config-next` 16.1
- `dotenv` 17.3, `@types/node`, `@types/react`, `@types/nodemailer`

---

## 2. Directory Structure

```text
CompanyWEB/
└── CompanyTech-website/              ← project root
    ├── public/                      ← static assets (favicon, images, PDFs, XLSX)
    │   ├── images/
    │   └── EnsoFolder/
    ├── src/
    │   ├── app/
    │   │   ├── globals.css          ← Tailwind v4 @theme tokens & base styles
    │   │   ├── layout.tsx           ← Root layout (Google Fonts setup)
    │   │   ├── robots.ts            ← robots.txt generation
    │   │   ├── sitemap.ts           ← sitemap.xml generation
    │   │   ├── [locale]/            ← i18n routing (en | tr)
    │   │   │   ├── layout.tsx       ← Locale layout (Header, Footer, ChatWidget, SEO schema)
    │   │   │   ├── page.tsx         ← Home page
    │   │   │   ├── not-found.tsx
    │   │   │   ├── about/
    │   │   │   ├── careers/
    │   │   │   └── case-studies/
    │   │   │       ├── page.tsx                  ← listing
    │   │   │       ├── raw-materials-factory/    ← case study 1
    │   │   │       └── ceramic-tile-production/  ← case study 2
    │   │   └── api/
    │   │       ├── chat/route.ts    ← AI chat endpoint (Gemini)
    │   │       └── contact/route.ts ← Contact / CV form endpoint (Nodemailer)
    │   ├── components/
    │   │   ├── layout/              ← 7 files: Header, Footer, ChatWidgetWrapper, etc.
    │   │   ├── sections/            ← 31 files: page-level section components
    │   │   │   └── (ROICalculator, HeroCarousel, CaseStudy*, Careers, ContactForm, …)
    │   │   └── ui/                  ← 13 files: reusable primitives
    │   │       └── (Button, Badge, ChatWidget, ContactModal, Slider, WorkshopModal, …)
    │   ├── lib/
    │   │   ├── i18n/
    │   │   │   ├── config.ts        ← locales: ["en","tr"], default: "tr"
    │   │   │   └── dictionaries.ts  ← lazy loader for JSON dictionaries
    │   │   ├── dictionaries/
    │   │   │   ├── en.json          ← ~48 KB
    │   │   │   └── tr.json          ← ~51 KB
    │   │   ├── EmailService.ts      ← Nodemailer singleton
    │   │   ├── roiCalculations.ts   ← ROI business logic (~16 KB)
    │   │   ├── roi-calculator.ts    ← ROI helper types
    │   │   ├── structured-data.ts   ← JSON-LD (Organization + LocalBusiness)
    │   │   ├── google-drive-loader.ts ← Loads docs from Google Drive for ARDI
    │   │   ├── constants.ts
    │   │   ├── Params.ts
    │   │   └── utils.ts
    │   ├── ai/
    │   │   ├── persona.md           ← ARDI chatbot persona definition
    │   │   ├── knowledge-base.md    ← ARDI master knowledge base
    │   │   ├── knowledge/           ← 6 topic-specific KB files (01–06)
    │   │   └── docs/                ← Runtime-loaded documents
    │   ├── middleware.ts            ← Root "/" → "/en" or "/tr" redirect
    │   └── types/
    │       └── index.ts             ← Shared TS types (Locale, Dictionary, etc.)
    ├── scripts/
    │   ├── test-smtp.ts
    │   └── verify-smtp-system.ts
    ├── docs/                        ← Project documentation
    │   ├── prd.md, TODO.md, ACTION_PLAN.md, IMPLEMENTATION_PLAN.md, …
    └── config files (see §3–§5)
```

---

## 3. Linting & Code Quality

### ESLint

- **Config format**: ESLint 9 flat config (`eslint.config.mjs`)
- **Extends**: `eslint-config-next` (spreads as `[...nextConfig]`)
- **No custom rules** — relies entirely on the Next.js recommended rule set
- **Lint script**: `npm run lint` → runs `eslint src/`

### TypeScript

| Option             | Value     |
| ------------------ | --------- |
| `strict`           | `true`    |
| `target`           | ES2017    |
| `module`           | ESNext    |
| `moduleResolution` | bundler   |
| `jsx`              | react-jsx |
| `incremental`      | `true`    |
| `isolatedModules`  | `true`    |
| `noEmit`           | `true`    |

- **Path alias**: `@/*` → `./src/*`
- **Excludes**: `node_modules`, `scripts`
- **Next.js plugin** loaded via `plugins: [{ name: "next" }]`

---

## 4. Styling Architecture

- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`
- **PostCSS plugin**: `@tailwindcss/postcss` (configured in `postcss.config.mjs`)
- **Design tokens** defined in `@theme` block:

| Token               | Value                 |
| ------------------- | --------------------- |
| `--color-primary`   | `#1E3A8A` (dark blue) |
| `--color-secondary` | `#F97316` (orange)    |
| `--color-accent`    | `#00D1FF` (cyan)      |
| `--font-heading`    | Inter                 |
| `--font-body`       | Source Sans 3         |
| Background          | `#000000` (dark mode) |

---

## 5. Deployment & Infrastructure

### Vercel

- Project ID: `prj_4ngH3GULUUBHWKxFJ0oxpXKtWUcq`
- Project name: `CompanyTech-website`
- Domain: `CompanyTech.com.tr`

### Docker

> **No Docker configuration exists in this project.** The application is deployed exclusively via Vercel's serverless platform.

### Environment Variables (`.env.example`)

| Variable                                  | Purpose                             |
| ----------------------------------------- | ----------------------------------- |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Gmail SMTP connection               |
| `SMTP_USER` / `SMTP_PASS`                 | SMTP authentication                 |
| `SMTP_FROM` / `CONTACT_EMAIL`             | Sender / recipient for contact form |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`           | Google Analytics (optional)         |

Additional secrets (not in `.env.example` but gitignored):

- Google Service Account JSON (`src/ai/*.json`) for Drive API access

### SEO

- Dynamic `robots.ts` and `sitemap.ts` at app root
- JSON-LD structured data (Organization + LocalBusiness) injected in locale layout
- OpenGraph metadata generated per locale from dictionary files
- Hreflang alternates for `en` ↔ `tr`

---

## 6. Internationalization (i18n)

| Setting           | Value                                                |
| ----------------- | ---------------------------------------------------- |
| Supported locales | `en`, `tr`                                           |
| Default locale    | `tr`                                                 |
| Strategy          | File-system routing (`/[locale]/…`)                  |
| Detection         | `Accept-Language` header via middleware              |
| Dictionary files  | `src/lib/dictionaries/{en,tr}.json` (~48–51 KB each) |
| Loading           | Lazy `import()` in `dictionaries.ts`                 |

---

## 7. AI Chat Agent (ARDI)

- **Model**: Google Gemini via `@google/generative-ai`
- **Persona**: Defined in `src/ai/persona.md`
- **Knowledge base**: Master file + 6 topic-specific files in `src/ai/knowledge/`
- **Google Drive integration**: `src/lib/google-drive-loader.ts` — loads runtime docs
- **API endpoint**: `POST /api/chat`
