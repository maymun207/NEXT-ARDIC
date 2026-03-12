/**
 * ============================================================================
 * GET /api/stats — Aggregate counts for all analytics tables
 * ============================================================================
 *
 * Returns summary counts for visitors, visits, contacts, chat_messages,
 * and newsletter_subscribers so the dashboard can render summary cards
 * without fetching full row sets.
 *
 * Runs all five count queries in parallel for speed.
 * ============================================================================
 */

const { supabase } = require("./_lib/supabase");

module.exports = async function handler(_req, res) {
  try {
    /* Run all five count queries in parallel for speed */
    const [visitors, visits, contacts, chatMessages, newsletter] =
      await Promise.all([
        supabase.from("visitors").select("*", { count: "exact", head: true }),
        supabase.from("visits").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase
          .from("chat_messages")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("newsletter_subscribers")
          .select("*", { count: "exact", head: true }),
      ]);

    res.json({
      visitors: visitors.count ?? 0,
      visits: visits.count ?? 0,
      contacts: contacts.count ?? 0,
      chatMessages: chatMessages.count ?? 0,
      newsletter: newsletter.count ?? 0,
    });
  } catch (err) {
    /* Surface a meaningful error to the client */
    console.error("Stats query failed:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
