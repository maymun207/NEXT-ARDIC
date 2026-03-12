import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 * Uses SUPABASE_SERVICE_ROLE_KEY — NEVER expose to the browser.
 * Import this ONLY in API routes (server-side).
 */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
    supabaseUrl && supabaseKey
        ? createClient(supabaseUrl, supabaseKey, {
              auth: { persistSession: false },
          })
        : null;

/**
 * Helper: returns true if Supabase is configured.
 * All callers should gate DB operations behind this check
 * so the app works even without Supabase credentials.
 */
export function isSupabaseConfigured(): boolean {
    return supabase !== null;
}
