/**
 * ============================================================================
 * Analytics Dashboard — Express Server
 * ============================================================================
 *
 * A standalone Express server that:
 *   1. Connects to the CompanyTech Supabase project using environment variables.
 *   2. Exposes JSON API routes for each analytics table (visitors, visits,
 *      contacts, chat_messages) plus a summary stats endpoint.
 *   3. Serves the static dashboard UI from the `public/` directory.
 *
 * Environment variables are loaded from the parent project's `.env.local`
 * via `dotenv` with an explicit `path` override.
 *
 * Default port: 4000 (configurable via DASHBOARD_PORT env var).
 * ============================================================================
 */

const path = require("path");

/* ── Load the parent project's .env.local so we pick up Supabase creds ──── */
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

/* ── Configuration (all sourced from env — nothing hard-coded) ──────────── */
const CONFIG = {
  /** Port the dashboard server listens on */
  port: parseInt(process.env.DASHBOARD_PORT || "4000", 10),

  /** Supabase project URL */
  supabaseUrl: process.env.SUPABASE_URL,

  /** Supabase service-role key (server-side only — never sent to the browser) */
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

/* ── Validate required env vars before proceeding ───────────────────────── */
if (!CONFIG.supabaseUrl || !CONFIG.supabaseKey) {
  console.error(
    "❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

/* ── Initialise the Supabase client (service-role for full read access) ── */
const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);

/* ── Create the Express application ─────────────────────────────────────── */
const app = express();

/* Serve static assets (HTML / CSS / JS) from the public directory */
app.use(express.static(path.join(__dirname, "public")));

/* ────────────────────────────────────────────────────────────────────────── */
/*  API Routes                                                              */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * GET /api/stats
 * Returns aggregate counts for all four analytics tables so the dashboard
 * can render summary cards without fetching full row sets.
 */
app.get("/api/stats", async (_req, res) => {
  try {
    /* Run all five count queries in parallel for speed */
    const [visitors, visits, contacts, chatMessages, newsletter] = await Promise.all([
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
});

/**
 * GET /api/visitors
 * Returns every row from the `visitors` table, newest first.
 */
app.get("/api/visitors", async (_req, res) => {
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
});

/**
 * GET /api/visits
 * Returns every row from the `visits` table joined with the parent
 * visitor's fingerprint, newest first.
 */
app.get("/api/visits", async (_req, res) => {
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
});

/**
 * GET /api/contacts
 * Returns every row from the `contacts` table, newest first.
 */
app.get("/api/contacts", async (_req, res) => {
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
});

/**
 * GET /api/chat-messages
 * Returns every row from the `chat_messages` table, newest first.
 */
app.get("/api/chat-messages", async (_req, res) => {
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
});

/**
 * GET /api/newsletter-subscribers
 * Returns every row from the `newsletter_subscribers` table, newest first.
 */
app.get("/api/newsletter-subscribers", async (_req, res) => {
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
});

/* ──────────────────────────────────────────────────────────────────────────*/
/*  Start the server                                                        */
/* ────────────────────────────────────────────────────────────────────────── */
app.listen(CONFIG.port, () => {
  console.log(`\n🚀  Analytics Dashboard running at http://localhost:${CONFIG.port}\n`);
});
