/**
 * ============================================================================
 * GET /api/contacts — All contact form submissions
 * ============================================================================
 *
 * Returns every row from the `contacts` table joined with the parent
 * visitor's fingerprint, newest first (by submitted_at).
 * ============================================================================
 */

const { supabase } = require("./_lib/supabase");

module.exports = async function handler(_req, res) {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*, visitors(fingerprint)")
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Contacts query failed:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};
