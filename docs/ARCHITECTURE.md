# CompanyTech Backend Architecture

> Last updated: 2026-03-05

## System Overview

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                         INTERNET / BROWSER                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────────────────┐            │
│  │  Visitor (EN) │  │  Visitor (TR) │  │  Admin (localhost)   │            │
│  └───────┬───────┘  └───────┬───────┘  └──────────┬───────────┘            │
└──────────┼──────────────────┼─────────────────────┼────────────────────────┘
           │                  │                     │
     HTTPS │            HTTPS │              HTTP   │ :4000
           ▼                  ▼                     ▼
┌──────────────────────────────────┐   ┌──────────────────────────┐
│       Vercel Edge Network        │   │  analytics-dashboard/    │
│  ┌────────────────────────────┐  │   │  (Express 4 + static UI) │
│  │   Next.js 15 App Router   │  │   │  Reads parent .env.local │
│  │   (Node.js 20.x runtime)  │  │   │  Uses service_role key   │
│  ├────────────────────────────┤  │   └────────────┬─────────────┘
│  │  /api/track      POST     │  │                 │
│  │  /api/contact    POST     │  │                 │
│  │  /api/newsletter POST     │  │                 │
│  │  /api/newsletter/confirm  │  │                 │
│  │  /api/chat       POST     │  │                 │
│  ├────────────────────────────┤  │                 │
│  │  /[locale]/...   SSG/SSR  │  │                 │
│  │  /en  /tr                 │  │                 │
│  └────────────┬───────────────┘  │                 │
└───────────────┼──────────────────┘                 │
                │                                     │
    ┌───────────┼─────────────────────────────────────┼───────┐
    │           ▼              SUPABASE               ▼       │
    │  ┌──────────────────────────────────────────────────┐   │
    │  │  PostgreSQL (RLS-enabled)                        │   │
    │  │  ┌─────────────────────┐  ┌───────────────────┐  │   │
    │  │  │ visitors            │  │ contacts          │  │   │
    │  │  │ visits              │  │ chat_messages     │  │   │
    │  │  │ newsletter_subs     │  │ consent_logs      │  │   │
    │  │  └─────────────────────┘  └───────────────────┘  │   │
    │  └──────────────────────────────────────────────────┘   │
    └─────────────────────────────────────────────────────────┘
                │
    ┌───────────┼──────────────────────────────────────────────┐
    │           ▼           EXTERNAL SERVICES                  │
    │  ┌────────────────┐  ┌────────────┐  ┌────────────────┐ │
    │  │ SMTP           │  │ Cloudflare │  │ Formspree      │ │
    │  │ (mail.Companyh)  │  │ Turnstile  │  │ (contact proxy)│ │
    │  └────────────────┘  └────────────┘  └────────────────┘ │
    │  ┌────────────────┐  ┌────────────┐                     │
    │  │ Google Gemini  │  │ Google     │                     │
    │  │ (CWF Chat AI)  │  │ Drive      │                     │
    │  └────────────────┘  └────────────┘                     │
    └──────────────────────────────────────────────────────────┘
```

---

## 1. Frontend — Next.js 15 on Vercel

| Aspect         | Detail                                                                |
| -------------- | --------------------------------------------------------------------- |
| Framework      | Next.js 15, App Router                                                |
| Runtime        | Node.js 20.x (pinned in `package.json` engines)                       |
| Styling        | Tailwind CSS                                                          |
| i18n           | File-based dictionaries (`en.json`, `tr.json`)                        |
| Routing        | `/[locale]/...` → `/en`, `/tr`                                        |
| Deployment     | Vercel (auto-deploy from `main` branch)                               |
| CI/CD          | GitHub Actions (`.github/workflows/ci.yml`)                           |
| CAPTCHA        | Cloudflare Turnstile (widget + server verification)                   |
| Cookie Consent | KVKK/GDPR banner (`CookieConsent.tsx`) → `CompanyTech_consent` cookie |

---

## 2. API Routes (Server-Side, Vercel Functions)

All routes live in `src/app/api/` and run as Vercel Serverless Functions.

### `POST /api/track`

**Purpose:** Anonymous visitor tracking via browser fingerprinting.

- Upserts into `visitors` table (fingerprint-based dedup)
- Inserts page view into `visits` table with browser, OS, geo, referrer
- Uses Vercel headers (`x-vercel-ip-country`, `x-vercel-ip-city`) for geo
- Silent failure — never breaks the client

### `POST /api/contact`

**Purpose:** Contact form submission handler.

1. Rate limiting (3 per IP per 15 min, in-memory)
2. Cloudflare Turnstile CAPTCHA verification
3. Server-side field validation
4. Supabase insert into `contacts` (captured BEFORE email)
5. SMTP notification to CompanyTech team via `EmailService`
6. Fire-and-forget Formspree forwarding

### `POST /api/newsletter`

**Purpose:** Newsletter subscription with double opt-in (KVKK/GDPR).

1. Email validation + rate limiting (1 per email per 24h)
2. Generate UUID confirmation token
3. Upsert into `newsletter_subscribers` with `status = "pending"`
4. Send bilingual confirmation email with click-to-confirm link
5. Send notification to CompanyTech team

### `GET /api/newsletter/confirm`

**Purpose:** Email confirmation handler for double opt-in.

- Validates token → updates `status` to `"confirmed"` → redirects to homepage
- Clears the confirmation token from the database

### `POST /api/chat`

**Purpose:** CWF (Chat With Factory) AI chatbot.

- Google Gemini API with streaming responses
- Context-aware system prompt (page content, calculator state, locale)
- PDF knowledge base loading from Google Drive
- Chat message logging to `chat_messages` table
- Rate limiting (15 requests per minute per IP)

---

## 3. Database — Supabase (PostgreSQL)

### Connection Strategy

| Context              | Client                 | Key Used                    |
| -------------------- | ---------------------- | --------------------------- |
| API routes (Next.js) | `src/lib/supabase.ts`  | `SUPABASE_SERVICE_ROLE_KEY` |
| Analytics dashboard  | Express `server.js`    | `SUPABASE_SERVICE_ROLE_KEY` |
| Browser (tracking)   | Via `/api/track` proxy | Never exposed               |

> **Security note:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and must
> NEVER be exposed to the client. All browser interactions go through
> server-side API routes.

### Tables

| Table                    | Purpose                             | RLS | anon INSERT | anon SELECT |
| ------------------------ | ----------------------------------- | --- | ----------- | ----------- |
| `visitors`               | Unique visitors by fingerprint      | ✓   | ✓           | ✓ (own)     |
| `visits`                 | Per-page views with metadata        | ✓   | ✓           | ✗           |
| `contacts`               | Contact form submissions            | ✓   | ✓           | ✗           |
| `chat_messages`          | CWF chatbot conversation logs       | ✓   | ✓           | ✗           |
| `newsletter_subscribers` | Email subscriptions (double opt-in) | ✓   | ✓           | ✗           |
| `consent_logs`           | Cookie consent audit trail (KVKK)   | ✓   | ✓           | ✗           |

### Schema Files (`supabase/`)

| File                | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `rls-policies.sql`  | Hardened RLS policy templates for all tables  |
| `rls-audit.sql`     | Verification query — checks `is_safe` for all |
| `seed.example.sql`  | Anonymized example data for local development |
| `consent-table.sql` | Migration SQL for `consent_logs` table        |

---

## 4. Analytics Dashboard — Standalone Express App

| Aspect      | Detail                                                      |
| ----------- | ----------------------------------------------------------- |
| Location    | `analytics-dashboard/`                                      |
| Framework   | Express 4 + static HTML/CSS/JS                              |
| Port        | `4000` (configurable via `DASHBOARD_PORT`)                  |
| Auth        | None (local only — NOT exposed to internet)                 |
| Data source | Supabase via `service_role` key (reads parent `.env.local`) |

### API Endpoints

| Route                             | Source Table                 |
| --------------------------------- | ---------------------------- |
| `GET /api/stats`                  | All tables (counts)          |
| `GET /api/visitors`               | `visitors`                   |
| `GET /api/visits`                 | `visits` + `visitors`        |
| `GET /api/contacts`               | `contacts` + `visitors`      |
| `GET /api/chat-messages`          | `chat_messages` + `visitors` |
| `GET /api/newsletter-subscribers` | `newsletter_subscribers`     |

### Running Locally

```bash
cd analytics-dashboard
npm install        # first time only
npm start          # → http://localhost:4000
```

> **Important:** The dashboard reads `../.env.local` for Supabase credentials.
> Ensure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.

---

## 5. External Services

### Email — SMTP (Nodemailer)

- **Server:** Configured in `Params.ts` → `smtp.*` block
- **Used by:** `/api/contact` and `/api/newsletter` routes
- **Class:** `src/lib/EmailService.ts` (singleton)

### CAPTCHA — Cloudflare Turnstile

- **Widget:** Client-side `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Verification:** Server-side `TURNSTILE_SECRET_KEY` via `siteverify` API
- **Used by:** `/api/contact` route only

### Contact Proxy — Formspree

- **Server-side only:** `FORMSPREE_ENDPOINT`
- **Flow:** Contact API → fire-and-forget POST to Formspree (backup storage)

### AI — Google Gemini

- **Model:** Loaded via `@google/generative-ai` SDK
- **Key:** `GEMINI_API_KEY` (server-side only)
- **Used by:** `/api/chat` route (CWF chatbot)

### Document Storage — Google Drive

- **Key:** `GOOGLE_DRIVE_FOLDER_ID`
- **Used by:** `/api/chat` route (loads PDF knowledge base files)

### Analytics — Google Analytics 4 (Consent-Gated)

- **Key:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)
- **Gated by:** `CookieConsent.tsx` → `consentUpdated` event
- **Only fires if:** User accepts analytics cookies

---

## 6. i18n Architecture

```text
src/lib/dictionaries/
├── en.json         # English dictionary (~1200 lines)
└── tr.json         # Turkish dictionary (~1200 lines)
```

- URL-based routing: `/en/...`, `/tr/...`
- Server-side dictionary loading in `src/app/[locale]/layout.tsx`
- TypeScript type safety via `Dictionary` interface in `src/types/index.ts`

---

## 7. Security Summary

| Layer                | Mechanism                                        |
| -------------------- | ------------------------------------------------ |
| **CAPTCHA**          | Cloudflare Turnstile (contact form only)         |
| **Rate Limiting**    | In-memory per-IP / per-email (API routes)        |
| **RLS**              | All 6 tables have INSERT-only for `anon`         |
| **Service Key**      | Never sent to client; used only in API routes    |
| **Cookie Consent**   | KVKK/GDPR banner, consent-gated analytics        |
| **Double Opt-In**    | Newsletter requires email confirmation           |
| **IP Handling**      | Raw IPs never stored in consent_logs (SHA-256)   |
| **Env Vars**         | Sensitive keys use non-`NEXT_PUBLIC_` prefix     |
| **Dependency Audit** | GitHub Actions CI + Dependabot                   |
| **Vulnerability**    | `SECURITY.md` with responsible disclosure policy |
