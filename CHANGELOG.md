# Changelog

All notable changes will be documented here.
Format: [Semantic Versioning](https://semver.org)

## [1.0.0] - 2026-03-05

### Added

- Initial production release
- Bilingual EN/TR Next.js 15 website
- ROI calculator
- Contact form with Formspree
- HTTP security headers
- CAPTCHA protection (Cloudflare Turnstile)
- Sentry error monitoring
- Vercel Analytics and Speed Insights
- Cookie consent banner (KVKK/GDPR)
- Newsletter double opt-in
- CWF AI chatbot (Google Gemini)
- Analytics dashboard (standalone Express app)
- Health check API endpoint

### Security

- Repository set to private
- Removed sensitive files from git history
- Supabase RLS policies hardened
- PII scrubbing in Sentry (cookies, auth headers stripped)
- IP addresses hashed in consent logs (KVKK compliance)
