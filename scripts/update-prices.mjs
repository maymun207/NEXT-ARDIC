#!/usr/bin/env node
/**
 * update-prices.mjs
 * Fetches current AI model pricing from OpenRouter public API,
 * maps to our tracked provider list, and updates src/data/prices.json.
 * Run by GitHub Actions on the 1st of each month.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRICES_PATH = join(__dirname, '../src/data/prices.json');
const OPENROUTER_API = 'https://openrouter.ai/api/v1/models';

// Map: our provider ID → OpenRouter model ID (primary + fallbacks)
const MODEL_LOOKUP = {
  gpt4o:        ['openai/gpt-4o'],
  gpt4o_mini:   ['openai/gpt-4o-mini'],
  claude_sonnet: ['anthropic/claude-sonnet-4-5', 'anthropic/claude-3-5-sonnet', 'anthropic/claude-sonnet-4'],
  claude_haiku:  ['anthropic/claude-haiku-4-5',  'anthropic/claude-3-5-haiku',  'anthropic/claude-haiku-4'],
  gemini_25_pro:   ['google/gemini-2.5-pro-preview', 'google/gemini-2.5-pro'],
  gemini_25_flash: ['google/gemini-2.5-flash-preview', 'google/gemini-2.5-flash'],
  gemini_20_flash: ['google/gemini-2.0-flash-001', 'google/gemini-2.0-flash'],
};

async function main() {
  console.log('📡 Fetching current model prices from OpenRouter...');

  let openrouterModels = [];
  try {
    const res = await fetch(OPENROUTER_API, {
      headers: { 'HTTP-Referer': 'https://ardictech.com', 'X-Title': 'ARDIC Price Updater' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    openrouterModels = data.data || [];
    console.log(`✅ Retrieved ${openrouterModels.length} models from OpenRouter`);
  } catch (err) {
    console.error('❌ Failed to fetch from OpenRouter:', err.message);
    console.log('⚠️  Keeping existing prices unchanged, updating last_verified date only');
    const existing = JSON.parse(readFileSync(PRICES_PATH, 'utf8'));
    existing.last_verified = new Date().toISOString().split('T')[0];
    existing.status = 'fallback';
    existing.source = 'cached (openrouter.ai unreachable)';
    writeFileSync(PRICES_PATH, JSON.stringify(existing, null, 2));
    process.exit(0);
  }

  // Build a quick lookup map from OpenRouter response
  const orMap = {};
  for (const m of openrouterModels) {
    if (m.id && m.pricing) orMap[m.id] = m.pricing;
  }

  // Load current prices.json
  const current = JSON.parse(readFileSync(PRICES_PATH, 'utf8'));
  let updatedCount = 0;
  let unchangedCount = 0;

  for (const provider of current.providers) {
    const candidates = MODEL_LOOKUP[provider.id] || [];
    let found = null;

    for (const candidateId of candidates) {
      if (orMap[candidateId]) {
        found = { id: candidateId, pricing: orMap[candidateId] };
        break;
      }
    }

    if (!found) {
      console.log(`  ⚠️  ${provider.model}: not found on OpenRouter, keeping existing price`);
      unchangedCount++;
      continue;
    }

    // OpenRouter pricing is in $ per token — convert to $ per 1M tokens
    const inputPer1M  = parseFloat(found.pricing.prompt)      * 1_000_000;
    const outputPer1M = parseFloat(found.pricing.completion)  * 1_000_000;
    const blendedPer1K = (inputPer1M + outputPer1M) / 2 / 1000;

    const inputChanged  = Math.abs(inputPer1M  - provider.inputPer1M)  > 0.001;
    const outputChanged = Math.abs(outputPer1M - provider.outputPer1M) > 0.001;

    if (inputChanged || outputChanged) {
      console.log(`  🔄 ${provider.model}: $${provider.inputPer1M}/$${provider.outputPer1M} → $${inputPer1M.toFixed(4)}/$${outputPer1M.toFixed(4)} per 1M`);
      provider.inputPer1M     = Math.round(inputPer1M  * 10000) / 10000;
      provider.outputPer1M    = Math.round(outputPer1M * 10000) / 10000;
      provider.blendedPer1K   = Math.round(blendedPer1K * 1000000) / 1000000;
      provider.openrouter_id  = found.id;
      updatedCount++;
    } else {
      console.log(`  ✅ ${provider.model}: unchanged`);
      unchangedCount++;
    }
  }

  current.last_verified = new Date().toISOString().split('T')[0];
  current.source = 'openrouter.ai';
  current.status = 'live';

  writeFileSync(PRICES_PATH, JSON.stringify(current, null, 2));
  console.log(`\n✅ Done — ${updatedCount} updated, ${unchangedCount} unchanged`);
  console.log(`📅 last_verified set to: ${current.last_verified}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
