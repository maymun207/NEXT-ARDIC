#!/usr/bin/env bash
# ============================================================================
# purge-sensitive-files.sh
# ============================================================================
#
# Permanently removes .agent/ and supabase-schema.sql from ALL git history
# using git-filter-repo. This is a DESTRUCTIVE operation — once executed,
# every collaborator must delete their local clone and re-clone.
#
# Usage:
#   chmod +x scripts/purge-sensitive-files.sh
#   ./scripts/purge-sensitive-files.sh
#
# Prerequisites:
#   - Python 3 and pip
#   - git-filter-repo (installed automatically if missing)
#
# ============================================================================

set -euo pipefail

# ── Colours for output ─────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Colour

echo -e "${YELLOW}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${YELLOW}║  CompanyTech — Sensitive File History Purge                   ║${NC}"
echo -e "${YELLOW}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ── Step 1: Check for git-filter-repo ──────────────────────────────────────
if ! command -v git-filter-repo &> /dev/null; then
    echo -e "${YELLOW}[INFO]${NC} git-filter-repo not found. Installing via pip..."
    pip install git-filter-repo
    echo -e "${GREEN}[OK]${NC} git-filter-repo installed."
else
    echo -e "${GREEN}[OK]${NC} git-filter-repo is already installed."
fi

echo ""

# ── Step 2: Purge .agent/ directory from all history ───────────────────────
echo -e "${YELLOW}[PURGE]${NC} Removing .agent/ from ALL commits..."
git filter-repo --path .agent/ --invert-paths --force
echo -e "${GREEN}[DONE]${NC} .agent/ purged from history."

echo ""

# ── Step 3: Purge supabase-schema.sql from all history ─────────────────────
echo -e "${YELLOW}[PURGE]${NC} Removing supabase-schema.sql from ALL commits..."
git filter-repo --path supabase-schema.sql --invert-paths --force
echo -e "${GREEN}[DONE]${NC} supabase-schema.sql purged from history."

echo ""

# ── Step 4: Re-add the remote origin ──────────────────────────────────────
# git-filter-repo removes remotes for safety — we must re-add it.
echo -e "${YELLOW}[FIX]${NC} Re-adding remote origin..."
git remote add origin https://github.com/maymun207/CompanyTech-website.git 2>/dev/null || \
    git remote set-url origin https://github.com/maymun207/CompanyTech-website.git
echo -e "${GREEN}[DONE]${NC} Remote origin restored."

echo ""

# ── Step 5: Force-push the rewritten history ───────────────────────────────
echo -e "${YELLOW}[PUSH]${NC} Force-pushing rewritten history to origin..."
git push origin --force --all
echo -e "${GREEN}[DONE]${NC} Force-push complete."

echo ""

# ── Warnings ───────────────────────────────────────────────────────────────
echo -e "${RED}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║  ⚠  WARNING — REQUIRED ACTIONS FOR ALL COLLABORATORS       ║${NC}"
echo -e "${RED}╠══════════════════════════════════════════════════════════════╣${NC}"
echo -e "${RED}║  Every collaborator MUST:                                   ║${NC}"
echo -e "${RED}║    1. Delete their local clone                              ║${NC}"
echo -e "${RED}║    2. Re-clone the repository from scratch                  ║${NC}"
echo -e "${RED}║                                                             ║${NC}"
echo -e "${RED}║  Pulling into an existing clone WILL corrupt history.       ║${NC}"
echo -e "${RED}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}[NOTE]${NC} Vercel will automatically redeploy after the force-push."
echo -e "${GREEN}       This is expected and normal — the build will succeed${NC}"
echo -e "${GREEN}       because no source code was changed, only history.${NC}"
echo ""
echo -e "${GREEN}✅  Purge complete. Repository history is clean.${NC}"
