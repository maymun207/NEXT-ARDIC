/**
 * ============================================================================
 * GET /api/chat-messages — All Temel chat messages
 * ============================================================================
 *
 * Returns every row from the `chat_messages` table joined with the parent
 * visitor's fingerprint, newest first (by sent_at).
 * ============================================================================
 */

const { supabase } = require("./_lib/supabase");

module.exports = async function handler(_req, res) {
  try {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*, visitors(fingerprint)")
      .order("sent_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Chat messages query failed:", err);
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
};
