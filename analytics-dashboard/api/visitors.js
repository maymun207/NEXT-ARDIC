/**
 * ============================================================================
 * GET /api/visitors — All visitor records
 * ============================================================================
 *
 * Returns every row from the `visitors` table, newest first (by last_seen_at).
 * ============================================================================
 */

const { supabase } = require("./_lib/supabase");

module.exports = async function handler(_req, res) {
  try {
    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("last_seen_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Visitors query failed:", err);
    res.status(500).json({ error: "Failed to fetch visitors" });
  }
};
