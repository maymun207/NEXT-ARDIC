#!/usr/bin/env bash
# ==============================================================================
# scripts/setup-template.sh — Next.js Enterprise Starter Setup Wizard
# ==============================================================================
#
# Interactive setup script that replaces template placeholders with your
# project-specific values in one command.
#
# USAGE:
#   chmod +x scripts/setup-template.sh
#   ./scripts/setup-template.sh
#
# WHAT IT DOES:
#   1. Prompts for your project/company config
#   2. Replaces YOUR_COMPANY_NAME, yourdomain.com etc. across all config files
#   3. Copies .env.example → .env.local
#   4. Updates dependabot.yml with your timezone
#   5. Runs npm install
#   6. Optionally initializes a fresh git repository
#
# REQUIREMENTS: bash, sed, npm
# ==============================================================================

set -e  # Exit immediately on any error

# ── Color helpers ────────────────────────────────────────────────────────────
BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
RESET="\033[0m"

echo ""
echo -e "${BOLD}${BLUE}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${BLUE}║   Next.js Enterprise Starter — Setup Wizard                 ║${RESET}"
echo -e "${BOLD}${BLUE}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "${YELLOW}Answer a few questions and we'll configure the template for you.${RESET}"
echo ""

# ── Step 1: Collect configuration ───────────────────────────────────────────
echo -e "${BOLD}Step 1: Project Identity${RESET}"
echo ""

read -r -p "Company / Project name (e.g. Acme Corp): " COMPANY_NAME
if [[ -z "$COMPANY_NAME" ]]; then
  echo "ERROR: Company name is required." && exit 1
fi

read -r -p "Primary domain WITHOUT https:// (e.g. acmecorp.com): " DOMAIN
if [[ -z "$DOMAIN" ]]; then
  echo "ERROR: Domain is required." && exit 1
fi
SITE_URL="https://${DOMAIN}"

read -r -p "One-line site description (for meta tags): " DESCRIPTION
if [[ -z "$DESCRIPTION" ]]; then
  DESCRIPTION="Enterprise software solutions from ${COMPANY_NAME}."
fi

echo ""
echo -e "${BOLD}Step 2: Optional Localization${RESET}"
echo ""

read -r -p "Your timezone for Dependabot (e.g. America/New_York) [Europe/London]: " TIMEZONE
TIMEZONE=${TIMEZONE:-"Europe/London"}

echo ""
echo -e "${BOLD}Step 3: Optional Git Setup${RESET}"
echo ""

read -r -p "Re-initialize git repository? (removes old history) [y/N]: " REINIT_GIT
REINIT_GIT=$(echo "$REINIT_GIT" | tr '[:upper:]' '[:lower:]')

# ── Step 2: Replace placeholders in config files ────────────────────────────
echo ""
echo -e "${BOLD}${BLUE}Applying your configuration...${RESET}"
echo ""

# Helper: portable sed in-place (works on both macOS and GNU/Linux)
# On macOS, gnu-sed is required OR use '' as backup extension with BSD sed.
sedi() {
  if sed --version 2>/dev/null | grep -q GNU; then
    # GNU sed (Linux, Homebrew gsed)
    sed -i "$@"
  else
    # BSD sed (macOS default)
    sed -i '' "$@"
  fi
}

# Replace YOUR_COMPANY_NAME in markdown, json, and key config files
echo "  Replacing YOUR_COMPANY_NAME → ${COMPANY_NAME}..."
find . -not -path './node_modules/*' -not -path './.git/*' -not -path './.next/*' \
  \( -name "*.json" -o -name "*.md" -o -name "*.ts" -o -name "*.tsx" \) \
  -exec grep -l "YOUR_COMPANY_NAME" {} \; | while IFS= read -r file; do
    sedi "s/YOUR_COMPANY_NAME/${COMPANY_NAME}/g" "$file"
    echo "    ✓ $file"
done

# Replace yourdomain.com with the real domain
echo "  Replacing yourdomain.com → ${DOMAIN}..."
find . -not -path './node_modules/*' -not -path './.git/*' -not -path './.next/*' \
  \( -name "*.json" -o -name "*.md" -o -name "*.ts" -o -name "*.tsx" -o -name ".env*" \) \
  -exec grep -l "yourdomain.com" {} \; | while IFS= read -r file; do
    sedi "s|yourdomain.com|${DOMAIN}|g" "$file"
    echo "    ✓ $file"
done

# Replace SECURITY.md contact email placeholder
echo "  Updating SECURITY.md contact email..."
sedi "s/security@yourdomain.com/security@${DOMAIN}/g" SECURITY.md

# Update dependabot.yml timezone
echo "  Updating dependabot.yml timezone → ${TIMEZONE}..."
sedi "s|Europe/London|${TIMEZONE}|g" .github/dependabot.yml

# ── Step 3: Create .env.local ────────────────────────────────────────────────
echo ""
echo "  Creating .env.local from .env.example..."
if [[ -f ".env.local" ]]; then
  echo "  .env.local already exists — skipping (won't overwrite your secrets)."
else
  cp .env.example .env.local
  # Pre-fill site identity vars in the newly created .env.local
  sedi "s|NEXT_PUBLIC_SITE_NAME=Your Company Name|NEXT_PUBLIC_SITE_NAME=${COMPANY_NAME}|g" .env.local
  sedi "s|NEXT_PUBLIC_SITE_URL=https://yourdomain.com|NEXT_PUBLIC_SITE_URL=${SITE_URL}|g" .env.local
  sedi "s|NEXT_PUBLIC_SITE_DESCRIPTION=Your compelling site tagline or meta description here.|NEXT_PUBLIC_SITE_DESCRIPTION=${DESCRIPTION}|g" .env.local
  echo "  ✓ .env.local created — fill in your Supabase, SMTP, and Turnstile credentials."
fi

# ── Step 4: npm install ───────────────────────────────────────────────────────
echo ""
echo "  Installing dependencies (npm install)..."
npm install
echo "  ✓ Dependencies installed."

# ── Step 5: Optional git re-init ─────────────────────────────────────────────
if [[ "$REINIT_GIT" == "y" ]]; then
  echo ""
  echo "  Re-initializing git repository..."
  rm -rf .git
  git init
  git add -A
  git commit -m "chore: initialize from next-enterprise-starter template"
  echo "  ✓ Git repository initialized with a clean first commit."
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}╔══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║   Setup Complete! Your next steps:                          ║${RESET}"
echo -e "${BOLD}${GREEN}╠══════════════════════════════════════════════════════════════╣${RESET}"
echo -e "${BOLD}${GREEN}║                                                              ║${RESET}"
echo -e "${BOLD}${GREEN}║  1. Edit .env.local — add your Supabase & SMTP credentials  ║${RESET}"
echo -e "${BOLD}${GREEN}║  2. Edit src/app/globals.css — swap in your brand colors     ║${RESET}"
echo -e "${BOLD}${GREEN}║  3. Edit src/lib/dictionaries/en.json — update copy/content ║${RESET}"
echo -e "${BOLD}${GREEN}║  4. npm run dev — start the local development server         ║${RESET}"
echo -e "${BOLD}${GREEN}║  5. Read TEMPLATE_CUSTOMIZATION.md for full details          ║${RESET}"
echo -e "${BOLD}${GREEN}║                                                              ║${RESET}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════════════════════════╝${RESET}"
echo ""
