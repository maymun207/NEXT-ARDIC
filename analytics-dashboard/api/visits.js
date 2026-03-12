/**
 * ============================================================================
 * GET /api/visits — All visit records with visitor fingerprint
 * ============================================================================
 *
 * Returns every row from the `visits` table joined with the parent
 * visitor's fingerprint, newest first (by visited_at).
 * ============================================================================
 */

const { supabase } = require("./_lib/supabase");

module.exports = async function handler(_req, res) {
  try {
    const { data, error } = await supabase
      .from("visits")
      .select("*, visitors(fingerprint)")
      .order("visited_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Visits query failed:", err);
    res.status(500).json({ error: "Failed to fetch visits" });
  }
};
