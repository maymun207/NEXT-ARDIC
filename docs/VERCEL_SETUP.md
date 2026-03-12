# Vercel Deployment Setup Guide

> Last updated: 2026-03-05

Step-by-step instructions for deploying the CompanyTech website to Vercel.

---

## Prerequisites

- A [Vercel account](https://vercel.com) linked to the GitHub organization (`maymun207`)
- The repository `maymun207/CompanyTech-website` accessible from Vercel
- All third-party service credentials ready (see sections below)

---

## 1. Import the Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select **Import Git Repository**
3. Choose `maymun207/CompanyTech-website`
4. Framework Preset: **Next.js** (auto-detected)
5. Root Directory: `.` (default)
6. Click **Deploy** — the first build will fail until env vars are set

---

## 2. Configure Environment Variables

Navigate to: **Vercel Dashboard → Project → Settings → Environment Variables**

Add each variable below. Use the **Environment** checkboxes to control where
each variable is available (Production, Preview, Development).

### Supabase

| Variable                        | Value                           | Environments                   | Notes                       |
| ------------------------------- | ------------------------------- | ------------------------------ | --------------------------- |
| `SUPABASE_URL`                  | `https://<project>.supabase.co` | All                            | Server-side Supabase URL    |
| `SUPABASE_SERVICE_ROLE_KEY`     | `eyJhbG...` (JWT)               | **Production only**, Encrypted | Bypasses RLS — NEVER expose |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://<project>.supabase.co` | All                            | Client-side Supabase URL    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` (JWT)               | All                            | Public anon key (safe)      |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` must be set as **Encrypted** and
> **Production-only**. It must NOT start with `NEXT_PUBLIC_`.

### SMTP (Email)

| Variable        | Value                   | Environments   | Notes                     |
| --------------- | ----------------------- | -------------- | ------------------------- |
| `SMTP_HOST`     | `mail.Companyh.com`     | All            | SMTP server hostname      |
| `SMTP_PORT`     | `587`                   | All            | TLS port                  |
| `SMTP_SECURE`   | `false`                 | All            | false for STARTTLS (587)  |
| `SMTP_USER`     | `web.info@Companyh.com` | All            | SMTP username             |
| `SMTP_PASS`     | `(password)`            | All, Encrypted | SMTP password             |
| `SMTP_FROM`     | `web.info@Companyh.com` | All            | Sender address            |
| `CONTACT_EMAIL` | `web.info@Companyh.com` | All            | Recipient for form emails |

### Cloudflare Turnstile (CAPTCHA)

| Variable                         | Value       | Environments   | Notes                    |
| -------------------------------- | ----------- | -------------- | ------------------------ |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAA...` | All            | Client widget key (safe) |
| `TURNSTILE_SECRET_KEY`           | `0x4AAA...` | All, Encrypted | Server verification key  |

### Formspree (Contact Form Proxy)

| Variable             | Value                              | Environments | Notes            |
| -------------------- | ---------------------------------- | ------------ | ---------------- |
| `FORMSPREE_ENDPOINT` | `https://formspree.io/f/<form_id>` | All          | Server-side only |

### Google Gemini (CWF Chat)

| Variable         | Value       | Environments   | Notes                |
| ---------------- | ----------- | -------------- | -------------------- |
| `GEMINI_API_KEY` | `AIzaSy...` | All, Encrypted | Google AI Studio key |

### Google Drive (Knowledge Base)

| Variable                 | Value       | Environments | Notes         |
| ------------------------ | ----------- | ------------ | ------------- |
| `GOOGLE_DRIVE_FOLDER_ID` | `1zQFw9...` | All          | PDF folder ID |

### Newsletter & Site URL

| Variable               | Value                        | Environments | Notes                       |
| ---------------------- | ---------------------------- | ------------ | --------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://CompanyTech.com.tr` | All          | Used in confirmation emails |

### Analytics (Optional)

| Variable                        | Value        | Environments    | Notes                    |
| ------------------------------- | ------------ | --------------- | ------------------------ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXX` | Production only | Consent-gated via banner |

### Error Monitoring (Optional — Future)

| Variable                 | Value                   | Environments        | Notes             |
| ------------------------ | ----------------------- | ------------------- | ----------------- |
| `NEXT_PUBLIC_SENTRY_DSN` | `https://...sentry.io/` | Production, Preview | To be added later |

---

## 3. Node.js Version

The project pins Node.js via `package.json` `engines`:

```json
"engines": {
  "node": ">=20.0.0 <22.0.0",
  "npm": ">=9.0.0"
}
```

Vercel will automatically use Node.js 20.x based on this field.
No manual Node.js version configuration is needed in Vercel settings.

---

## 4. Build Settings

The defaults are correct for Next.js App Router:

| Setting          | Value         |
| ---------------- | ------------- |
| Build Command    | `next build`  |
| Output Directory | `.next`       |
| Install Command  | `npm install` |

No `vercel.json` `functions` block is needed — the `package.json` `engines`
field handles Node.js version selection.

---

## 5. Domain Configuration

1. Go to **Settings → Domains**
2. Add `CompanyTech.com.tr` and `www.CompanyTech.com.tr`
3. Configure DNS at your registrar:
   - `A` record → Vercel IP (shown in dashboard)
   - `CNAME` for `www` → `cname.vercel-dns.com`
4. SSL is automatically provisioned by Vercel

---

## 6. Deployment Branches

| Branch      | Vercel Environment | Auto-deploy |
| ----------- | ------------------ | ----------- |
| `main`      | Production         | ✓           |
| `develop`   | Preview            | ✓           |
| PR branches | Preview            | ✓           |

---

## 7. Post-Deployment Verification

After the first successful deploy:

1. **Contact form** — Submit a test entry, verify SMTP email + Supabase row
2. **Newsletter** — Subscribe, verify confirmation email, click confirm link
3. **CWF chatbot** — Open chat, ask a question, verify Gemini response
4. **Cookie consent** — Clear cookies, reload, verify banner appears
5. **Turnstile** — Ensure CAPTCHA widget renders on the contact form
6. **Analytics dashboard** — Run locally (`cd analytics-dashboard && npm start`), verify data appears

---

## 8. Troubleshooting

| Symptom                             | Likely Cause                             | Fix                                      |
| ----------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Build fails with runtime error      | `functions.runtime` in `vercel.json`     | Remove `functions` block (already done)  |
| Contact form "Something went wrong" | SMTP vars missing or wrong               | Check `SMTP_HOST`, `SMTP_PASS` in Vercel |
| Turnstile widget not showing        | Missing `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Add to Vercel env vars                   |
| Newsletter "Failed"                 | Missing `SUPABASE_URL`                   | Add all Supabase env vars                |
| CWF chat empty                      | Missing `GEMINI_API_KEY`                 | Add to Vercel env vars                   |
| 500 on `/api/track`                 | Supabase not configured                  | Silently succeeds — check logs           |
