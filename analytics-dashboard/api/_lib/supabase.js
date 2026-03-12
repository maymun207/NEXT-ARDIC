/**
 * ============================================================================
 * Supabase Client — Shared serverless function helper
 * ============================================================================
 *
 * Creates and exports a single Supabase client instance using the
 * SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.
 *
 * Used by all API serverless functions in the analytics dashboard.
 * The service-role key provides full read access to analytics tables.
 * ============================================================================
 */

const { createClient } = require("@supabase/supabase-js");

/** Supabase project URL — set via Vercel environment variables */
const supabaseUrl = process.env.SUPABASE_URL;

/** Supabase service-role key — server-side only, never sent to the browser */
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/* Validate required env vars — return a clear error if missing */
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
  );
}

/** The shared Supabase client for all serverless API functions */
const supabase = createClient(supabaseUrl || "", supabaseKey || "");

module.exports = { supabase };
