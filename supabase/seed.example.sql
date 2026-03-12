-- ============================================================================
-- seed.example.sql — Anonymized Example Data Structure
-- ============================================================================
--
-- This file shows the table structure and example seed data for local
-- development. It does NOT contain real production data.
--
-- Usage:
--   Copy this file and customise for your local environment:
--     cp seed.example.sql seed.sql
--
-- NOTE: seed.sql is gitignored. Never commit real data to the repository.
-- ============================================================================

-- ── Visitors ────────────────────────────────────────────────────────────────
-- Tracks unique website visitors via browser fingerprinting.
INSERT INTO visitors (id, fingerprint, visit_count, first_seen_at, last_seen_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'example-fingerprint-abc123', 3, now() - interval '7 days', now()),
  ('00000000-0000-0000-0000-000000000002', 'example-fingerprint-def456', 1, now() - interval '1 day',  now());

-- ── Visits ──────────────────────────────────────────────────────────────────
-- Records each page view with metadata (browser, OS, geo, referrer).
INSERT INTO visits (visitor_id, page, locale, browser, os, country, city, ip, referrer)
VALUES
  ('00000000-0000-0000-0000-000000000001', '/', 'en', 'Chrome', 'macOS', 'US', 'New York', '0.0.0.0', NULL),
  ('00000000-0000-0000-0000-000000000001', '/about', 'en', 'Chrome', 'macOS', 'US', 'New York', '0.0.0.0', 'https://google.com'),
  ('00000000-0000-0000-0000-000000000002', '/', 'tr', 'Safari', 'iOS', 'TR', 'Istanbul', '0.0.0.0', NULL);

-- ── Contacts ────────────────────────────────────────────────────────────────
-- Stores contact form submissions.
INSERT INTO contacts (visitor_id, email, name, company, message)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'user@example.com', 'Jane Doe', 'Example Corp', 'I would like a demo.');

-- ── Chat Messages ───────────────────────────────────────────────────────────
-- Stores CWF chatbot conversation history.
INSERT INTO chat_messages (visitor_id, role, content, page, locale, session_id)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'user',      'How does your factory simulation work?', '/', 'en', 'session-example-001'),
  ('00000000-0000-0000-0000-000000000001', 'assistant',  'Our Virtual Factory uses a digital twin...', '/', 'en', 'session-example-001');

-- ── Newsletter Subscribers ──────────────────────────────────────────────────
-- Stores email subscriptions from the footer newsletter form.
INSERT INTO newsletter_subscribers (email, locale)
VALUES
  ('subscriber@example.com', 'en');
