#!/usr/bin/env bash
# ============================================================================
# export-schema-local.sh
# ============================================================================
#
# Exports the current Supabase database schema to a local, gitignored file.
# The output is saved to .local/schema-YYYYMMDD.sql and NEVER committed.
#
# Usage:
#   chmod +x scripts/export-schema-local.sh
#   ./scripts/export-schema-local.sh
#
# Prerequisites:
#   - Supabase CLI installed (brew install supabase/tap/supabase)
#   - SUPABASE_DB_URL set in .env.local or environment
#
# ============================================================================

set -euo pipefail

# ── Colours for output ─────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Colour

# ── Resolve project root (one level up from scripts/) ─────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# ── Load .env.local if it exists ───────────────────────────────────────────
ENV_FILE="$PROJECT_ROOT/.env.local"
if [[ -f "$ENV_FILE" ]]; then
    # Export only SUPABASE_DB_URL from .env.local (ignore comments and blanks)
    export "$(grep '^SUPABASE_DB_URL=' "$ENV_FILE" | head -1)"
fi

# ── Check that SUPABASE_DB_URL is set ──────────────────────────────────────
if [[ -z "${SUPABASE_DB_URL:-}" ]]; then
    echo -e "${RED}[ERROR]${NC} SUPABASE_DB_URL is not set."
    echo ""
    echo "  Add it to .env.local:"
    echo "    SUPABASE_DB_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"
    echo ""
    exit 1
fi

# ── Create .local/ directory if it doesn't exist ───────────────────────────
LOCAL_DIR="$PROJECT_ROOT/.local"
mkdir -p "$LOCAL_DIR"

# ── Add .local/ to .gitignore if not already present ───────────────────────
GITIGNORE="$PROJECT_ROOT/.gitignore"
if ! grep -q '\.local/' "$GITIGNORE" 2>/dev/null; then
    echo "" >> "$GITIGNORE"
    echo "# Local schema dumps (never commit)" >> "$GITIGNORE"
    echo ".local/" >> "$GITIGNORE"
    echo -e "${GREEN}[OK]${NC} Added .local/ to .gitignore"
fi

# ── Export the schema ──────────────────────────────────────────────────────
DATE_STAMP=$(date +%Y%m%d)
OUTPUT_FILE="$LOCAL_DIR/schema-${DATE_STAMP}.sql"

echo -e "${YELLOW}[EXPORT]${NC} Dumping schema to ${OUTPUT_FILE}..."
supabase db dump --db-url "$SUPABASE_DB_URL" -f "$OUTPUT_FILE"

echo ""
echo -e "${GREEN}✅  Schema exported successfully${NC}"
echo -e "    File: ${OUTPUT_FILE}"
echo ""
echo -e "${YELLOW}⚠  REMINDER: This file is gitignored. Do NOT commit it.${NC}"
