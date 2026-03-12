-- ============================================================================
-- consent_logs — KVKK/GDPR Consent Audit Log
-- ============================================================================
--
-- Stores every cookie consent decision for compliance audit purposes.
-- IP addresses are stored as SHA-256 hashes — KVKK considers raw IPs
-- as sensitive personal data, so we never store them in plain text.
--
-- This table is append-only (INSERT). No UPDATE or DELETE is needed
-- for audit logs — each new consent action creates a new row.
-- ============================================================================

CREATE TABLE IF NOT EXISTS consent_logs (
    -- Unique identifier for each consent event
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Timestamp when consent was given or changed
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- SHA-256 hash of the visitor's IP address (never store raw IPs)
    ip_hash TEXT,

    -- Type of consent action taken by the user
    -- "accepted_all": User clicked "Accept All"
    -- "rejected":     User clicked "Reject Non-Essential"
    -- "custom":       User customized their preferences
    consent_type TEXT,

    -- Whether analytics cookies were consented to
    analytics_consent BOOLEAN,

    -- Whether marketing cookies were consented to
    marketing_consent BOOLEAN,

    -- SHA-256 hash of User-Agent string (for audit, hashed for privacy)
    user_agent_hash TEXT
);

-- Enable Row Level Security on consent_logs
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (no SELECT for anon — data is admin-only)
CREATE POLICY "allow_anon_insert"
    ON consent_logs
    FOR INSERT
    TO anon
    WITH CHECK (true);
