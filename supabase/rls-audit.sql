-- ============================================================================
-- rls-audit.sql — Row Level Security Audit Query
-- ============================================================================
--
-- Lists all tables in the public schema, whether RLS is enabled, the number
-- of policies attached, and a safety assessment.
--
-- HOW TO RUN:
--   1. Open Supabase Dashboard → SQL Editor → New Query
--   2. Paste this entire file
--   3. Click "Run"
--
-- INTERPRETATION:
--   is_safe = TRUE  → RLS is enabled AND at least one policy exists
--   is_safe = FALSE → Either RLS is disabled, or RLS is on but no policies
--                      exist (fully locked — only service_role can access)
--
-- A table with rls_enabled = true AND policy_count = 0 is NOT publicly
-- accessible, but it also cannot be reached by the anon key. This is safe
-- but may block legitimate client-side operations.
-- ============================================================================

SELECT
    t.tablename                                    AS table_name,
    t.rowsecurity                                  AS rls_enabled,
    COALESCE(p.policy_count, 0)                    AS policy_count,
    CASE
        WHEN t.rowsecurity = true
         AND COALESCE(p.policy_count, 0) > 0
        THEN true
        ELSE false
    END                                            AS is_safe
FROM pg_tables t
LEFT JOIN (
    -- Count policies per table (grouped by schema + table)
    SELECT
        schemaname,
        tablename,
        COUNT(*) AS policy_count
    FROM pg_policies
    GROUP BY schemaname, tablename
) p
    ON  t.schemaname = p.schemaname
    AND t.tablename  = p.tablename
WHERE t.schemaname = 'public'
ORDER BY t.tablename;
