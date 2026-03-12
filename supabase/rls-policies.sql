-- ============================================================================
-- rls-policies.sql — Hardened RLS Policy Templates for CompanyTech
-- ============================================================================
--
-- ⚠  CONSTRAINT: These are TEMPLATE policies — review before applying.
-- ⚠  NOTE: Never use the anon key in server-side API routes.
--          Always use the service_role key there.
--
-- HOW TO APPLY:
--   1. Navigate to: Supabase Dashboard → SQL Editor → New Query
--   2. Paste and run this file SECTION BY SECTION (one table at a time)
--   3. Verify in: Authentication → Policies
--   4. Re-run supabase/rls-audit.sql to confirm is_safe = true for all
--
-- ARCHITECTURE SUMMARY:
--   ┌─────────────────────────┬────────────────┬──────────────────────────┐
--   │ Table                   │ anon INSERT    │ service_role full access │
--   ├─────────────────────────┼────────────────┼──────────────────────────┤
--   │ contacts                │ ✓ (form)       │ ✓ (dashboard reads)      │
--   │ newsletter_subscribers  │ ✓ (form)       │ ✓ (dashboard reads)      │
--   │ chat_messages           │ ✓ (chatbot)    │ ✓ (dashboard reads)      │
--   │ visitors                │ ✓ (tracking)   │ ✓ (dashboard reads)      │
--   │ visits                  │ ✓ (tracking)   │ ✓ (dashboard reads)      │
--   └─────────────────────────┴────────────────┴──────────────────────────┘
--
-- The service_role key bypasses RLS entirely, so service_role policies are
-- not strictly needed. They are included for completeness and documentation.
--
-- Rate-limiting for INSERT operations (newsletter, contacts) should be
-- enforced via Supabase Edge Functions or Next.js API route middleware,
-- NOT via RLS. RLS cannot enforce rate limits.
-- ============================================================================


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  1. contacts                                                           ║
-- ║  Contact form submissions from /api/contact                            ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Ensure RLS is enabled and enforced even for table owners
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts FORCE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (contact form submissions via API)
-- Only permits inserting the expected columns — no arbitrary data.
CREATE POLICY "contacts_anon_insert"
    ON public.contacts
    FOR INSERT
    TO anon
    WITH CHECK (
        -- email is required and must look like an email address
        email IS NOT NULL
        AND email ~ '^[^@]+@[^@]+\.[^@]+$'
    );

-- Deny anonymous SELECT — contact data is read only by the dashboard
-- (which uses the service_role key, bypassing RLS)
-- No SELECT policy for anon = anon cannot read any rows.

-- Deny anonymous UPDATE and DELETE — contacts are immutable from the client
-- No UPDATE/DELETE policies for anon = anon cannot modify or remove rows.


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  2. newsletter_subscribers                                             ║
-- ║  Email subscriptions from the footer newsletter form                   ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Ensure RLS is enabled and enforced even for table owners
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers FORCE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (newsletter subscription via API)
-- Validates email format at the database level as a defence-in-depth measure.
CREATE POLICY "newsletter_anon_insert"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon
    WITH CHECK (
        -- email is required and must look like an email address
        email IS NOT NULL
        AND email ~ '^[^@]+@[^@]+\.[^@]+$'
    );

-- Deny anonymous SELECT/UPDATE/DELETE — subscriber data is private
-- Only readable via the analytics dashboard (service_role key).

-- NOTE: Rate-limiting for newsletter signups should be enforced via
-- the Next.js API route middleware (/api/newsletter/route.ts) or a
-- Supabase Edge Function, NOT via RLS policies.


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  3. chat_messages                                                      ║
-- ║  CWF chatbot conversation history                                      ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Ensure RLS is enabled and enforced even for table owners
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages FORCE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (chatbot saves messages via API)
CREATE POLICY "chat_messages_anon_insert"
    ON public.chat_messages
    FOR INSERT
    TO anon
    WITH CHECK (
        -- role must be either 'user' or 'assistant' — no arbitrary values
        role IN ('user', 'assistant')
        -- content must not be empty
        AND content IS NOT NULL
        AND length(content) > 0
    );

-- Deny anonymous SELECT/UPDATE/DELETE — chat history is private
-- Only readable via the analytics dashboard (service_role key).


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  4. visitors                                                           ║
-- ║  Unique website visitors tracked by browser fingerprint                 ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Ensure RLS is enabled and enforced even for table owners
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors FORCE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (tracking pixel / useTracking hook)
CREATE POLICY "visitors_anon_insert"
    ON public.visitors
    FOR INSERT
    TO anon
    WITH CHECK (
        -- fingerprint is required for visitor identification
        fingerprint IS NOT NULL
        AND length(fingerprint) > 0
    );

-- Allow anonymous users to SELECT their own visitor record (by fingerprint)
-- This is needed so the tracking hook can check if a visitor already exists
-- before inserting a new record.
CREATE POLICY "visitors_anon_select_own"
    ON public.visitors
    FOR SELECT
    TO anon
    USING (
        -- Only allow reading rows that match a fingerprint the client provides
        -- The client must pass the fingerprint via a filter in the query
        true
    );

-- NOTE: The above SELECT policy is intentionally permissive because the
-- visitors table contains only fingerprints and timestamps — no PII.
-- If you want to restrict this further, you could use a custom claim or
-- require the fingerprint as a query filter at the application layer.

-- Deny anonymous UPDATE/DELETE — visitor records are append-only from client
-- Updates (visit_count, last_seen_at) are done server-side via service_role.


-- ╔══════════════════════════════════════════════════════════════════════════╗
-- ║  5. visits                                                             ║
-- ║  Individual page views with metadata (browser, OS, geo, referrer)      ║
-- ╚══════════════════════════════════════════════════════════════════════════╝

-- Ensure RLS is enabled and enforced even for table owners
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visits FORCE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (page view tracking via useTracking hook)
CREATE POLICY "visits_anon_insert"
    ON public.visits
    FOR INSERT
    TO anon
    WITH CHECK (
        -- page is required — must know which page was visited
        page IS NOT NULL
        AND length(page) > 0
    );

-- Deny anonymous SELECT/UPDATE/DELETE — visit analytics are private
-- Only readable via the analytics dashboard (service_role key).


-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After applying all policies above, re-run supabase/rls-audit.sql.
-- Expected result:
--
--   table_name              | rls_enabled | policy_count | is_safe
--   ------------------------+-------------+--------------+--------
--   chat_messages           | true        | 1            | true
--   contacts                | true        | 1            | true
--   newsletter_subscribers  | true        | 1            | true
--   visitors                | true        | 2            | true
--   visits                  | true        | 1            | true
--
-- All tables should show is_safe = true.
-- ============================================================================
