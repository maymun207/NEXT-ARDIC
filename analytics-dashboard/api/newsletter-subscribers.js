/**
 * ============================================================================
 * GET /api/newsletter-subscribers — All newsletter subscriptions
 * ============================================================================
 *
 * Returns every row from the `newsletter_subscribers` table,
 * newest first (by subscribed_at).
 * ============================================================================
 */

const { supabase } = require("./_lib/supabase");

module.exports = async function handler(_req, res) {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Newsletter subscribers query failed:", err);
    res.status(500).json({ error: "Failed to fetch newsletter subscribers" });
  }
};
