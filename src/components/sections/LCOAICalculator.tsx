'use client';

import { useState, useEffect, useMemo } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Provider {
  id: string;
  provider: string;
  model: string;
  inputPer1M: number;
  outputPer1M: number;
  blendedPer1K: number;
  tier: string;
}

interface PriceData {
  last_verified: string;
  source: string;
  status: string;
  providers: Provider[];
  freshness?: 'live' | 'stale' | 'outdated';
  days_since_verified?: number;
}

// ── Fallback prices (always available, never fails) ───────────────────────────
const FALLBACK_PRICES: PriceData = {
  last_verified: '2026-04-10',
  source: 'cached',
  status: 'fallback',
  freshness: 'live',
  providers: [
    { id: 'gpt4o',         provider: 'OpenAI',    model: 'GPT-4o',           inputPer1M: 2.50,  outputPer1M: 10.00, blendedPer1K: 0.00625,   tier: 'premium' },
    { id: 'gpt4o_mini',    provider: 'OpenAI',    model: 'GPT-4o mini',      inputPer1M: 0.15,  outputPer1M: 0.60,  blendedPer1K: 0.000375,  tier: 'budget'  },
    { id: 'claude_sonnet', provider: 'Anthropic', model: 'Claude Sonnet 4.6',inputPer1M: 3.00,  outputPer1M: 15.00, blendedPer1K: 0.009,     tier: 'premium' },
    { id: 'claude_haiku',  provider: 'Anthropic', model: 'Claude Haiku 4.5', inputPer1M: 1.00,  outputPer1M: 5.00,  blendedPer1K: 0.003,     tier: 'mid'     },
    { id: 'gemini_25_pro', provider: 'Google',    model: 'Gemini 2.5 Pro',   inputPer1M: 1.25,  outputPer1M: 10.00, blendedPer1K: 0.005625,  tier: 'premium' },
    { id: 'gemini_25_flash',provider:'Google',    model: 'Gemini 2.5 Flash', inputPer1M: 0.30,  outputPer1M: 2.50,  blendedPer1K: 0.0014,    tier: 'mid'     },
    { id: 'gemini_20_flash',provider:'Google',    model: 'Gemini 2.0 Flash', inputPer1M: 0.10,  outputPer1M: 0.40,  blendedPer1K: 0.00025,   tier: 'budget'  },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt$ = (n: number, decimals = 0) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const fmtShort$ = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000)    return `$${(n / 1_000).toFixed(1)}K`;
  return fmt$(n, 0);
};

const fmtInference = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
};

const PROVIDER_COLORS: Record<string, string> = {
  OpenAI:    '#10a37f',
  Anthropic: '#d97706',
  Google:    '#1a73e8',
};

// ── Slider Component (with click-to-edit value badge) ────────────────────────
function Slider({
  label, value, min, max, step, onChange, formatValue, sublabel, rawValue, breakEven, leftLabel,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; formatValue: (v: number) => string;
  sublabel?: string; rawValue?: (v: number) => string;
  breakEven?: number;
  leftLabel?: string; // overrides the min value label at bottom-left
}) {
  const [hovered, setHovered]   = useState(false);
  const [dragging, setDragging] = useState(false);
  const [editing, setEditing]   = useState(false);
  const [editText, setEditText] = useState('');

  const pct    = ((value - min) / (max - min)) * 100;
  const active = hovered || dragging;

  const startEdit = () => {
    setEditText(rawValue ? rawValue(value) : String(value));
    setEditing(true);
  };

  const commitEdit = () => {
    const parsed = parseFloat(editText.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      // Round to nearest step
      const stepped = Math.round(clamped / step) * step;
      onChange(stepped);
    }
    setEditing(false);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: '1.1rem',
        padding: '0.75rem 0.85rem',
        borderRadius: '12px',
        background: active ? 'rgba(14,165,233,0.04)' : 'transparent',
        border: active ? '1px solid rgba(14,165,233,0.18)' : '1px solid transparent',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Label + value badge row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '5px' }}>
          {label}
          <span style={{ fontSize: '11px', color: '#94a3b8', opacity: active ? 1 : 0, transition: 'opacity 0.2s' }}>↔ drag</span>
        </label>

        {/* Click-to-edit value badge */}
        {editing ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '2px',
            padding: '2px 6px 2px 10px',
            background: 'rgba(2,132,199,0.08)',
            border: '2px solid #0284c7',
            borderRadius: '999px',
          }}>
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditing(false); }}
              style={{
                width: '72px', border: 'none', outline: 'none', background: 'transparent',
                fontSize: '13px', fontWeight: 800, color: '#0284c7', textAlign: 'right',
              }}
            />
            <span style={{ fontSize: '10px', color: '#0284c7', fontWeight: 600 }}>↵</span>
          </div>
        ) : (
          <div
            onClick={startEdit}
            title="Click to type an exact value"
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '3px 10px',
              background: active ? 'rgba(2,132,199,0.1)' : '#f1f5f9',
              border: active ? '1.5px solid rgba(2,132,199,0.4)' : '1.5px solid #e2e8f0',
              borderRadius: '999px',
              cursor: 'text',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: active ? '#0284c7' : '#334155' }}>
              {formatValue(value)}
            </span>
            {/* Pencil icon — always visible to signal editability */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={active ? '#0284c7' : '#94a3b8'} strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'all 0.2s', flexShrink: 0 }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
        )}
      </div>

      {sublabel && <div style={{ fontSize: '10.5px', color: '#94a3b8', marginBottom: '0.5rem' }}>{sublabel}</div>}

      {/* Track + thumb */}
      <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
        {/* Break-even zone coloring */}
        {(() => {
          if (!breakEven) return (
            <div style={{ position: 'absolute', left: 0, right: 0, height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`,
                background: active ? 'linear-gradient(90deg, #38bdf8, #0284c7)' : 'linear-gradient(90deg, #93c5fd, #60a5fa)',
                borderRadius: '999px', transition: 'width 0.1s, background 0.2s',
              }} />
            </div>
          );

          const beyondRange = breakEven > max;
          const bePct = beyondRange ? 100 : Math.max(0, Math.min(100, ((breakEven - min) / (max - min)) * 100));
          const aboveBreakEven = !beyondRange && value >= breakEven;

          return (
            <div style={{ position: 'absolute', left: 0, right: 0, height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'visible' }}>
              {/* Red/orange zone — entire track if break-even is off-chart */}
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                width: beyondRange ? `${pct}%` : `${Math.min(bePct, pct)}%`,
                background: beyondRange
                  ? 'linear-gradient(90deg, #fca5a5, #f97316)'
                  : aboveBreakEven ? '#fde68a' : 'linear-gradient(90deg, #fca5a5, #f97316)',
                borderRadius: '999px 0 0 999px',
                transition: 'width 0.1s',
              }} />
              {/* Blue winning zone */}
              {!beyondRange && aboveBreakEven && (
                <div style={{
                  position: 'absolute', left: `${bePct}%`, top: 0, height: '100%',
                  width: `${pct - bePct}%`,
                  background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
                  transition: 'width 0.1s, left 0.1s',
                }} />
              )}
              {/* Break-even marker line (only if within range) */}
              {!beyondRange && (
                <div style={{
                  position: 'absolute', left: `${bePct}%`,
                  top: '-5px', bottom: '-5px', width: '2px',
                  background: '#f59e0b', transform: 'translateX(-50%)',
                  zIndex: 5, borderRadius: '1px',
                  boxShadow: '0 0 4px rgba(245,158,11,0.5)',
                }} />
              )}
              {/* Off-chart indicator at right edge when break-even > max */}
              {beyondRange && (
                <div style={{
                  position: 'absolute', right: '-2px', top: '-22px',
                  background: '#ef4444', color: '#fff',
                  fontSize: '9px', fontWeight: 800, padding: '2px 5px',
                  borderRadius: '4px', whiteSpace: 'nowrap',
                  zIndex: 6, letterSpacing: '0.02em',
                }}>
                  → {fmtInference(breakEven)} needed
                </div>
              )}
            </div>
          );
        })()}
        {/* Visible thumb */}
        <div style={{
          position: 'absolute', left: `calc(${pct}% - 10px)`,
          width: '20px', height: '20px', background: '#fff',
          border: `2.5px solid ${active ? '#0284c7' : '#93c5fd'}`,
          borderRadius: '50%',
          boxShadow: active ? '0 0 0 4px rgba(14,165,233,0.15), 0 2px 8px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.1)',
          transition: 'border-color 0.2s, box-shadow 0.2s, left 0.08s',
          pointerEvents: 'none', zIndex: 2,
        }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'grab', height: '20px', zIndex: 3 }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '10px', color: breakEven ? '#f59e0b' : '#cbd5e1', fontWeight: breakEven ? 700 : 400 }}>
          {leftLabel ?? formatValue(min)}
        </span>
        <span style={{ fontSize: '10px', color: '#cbd5e1' }}>{formatValue(max)}</span>
      </div>

      {/* Break-even status badge — always shown when breakEven is set */}
      {breakEven && (
        <div style={{
          marginTop: '0.5rem', padding: '5px 10px', borderRadius: '8px',
          fontSize: '11px', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: '5px',
          background: (breakEven <= max && value >= breakEven) ? '#f0fdf4' : '#fff7ed',
          border: (breakEven <= max && value >= breakEven) ? '1px solid #86efac' : '1px solid #fed7aa',
          color: (breakEven <= max && value >= breakEven) ? '#15803d' : '#9a3412',
          transition: 'all 0.3s',
        }}>
          <span>{(breakEven <= max && value >= breakEven) ? '✅' : '⚠️'}</span>
          {breakEven > max
            ? `This provider needs ${fmtInference(breakEven)}/month to justify self-hosting — beyond this slider's range`
            : value >= breakEven
            ? `ARDIC is cost-effective at ${formatValue(value)} — saving vs cloud API`
            : `Increase to ${fmtInference(breakEven)} for ARDIC to be cost-effective with this provider`
          }
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function LCOAICalculator() {
  const [priceData, setPriceData] = useState<PriceData>(FALLBACK_PRICES);
  const [loadState, setLoadState] = useState<'loading' | 'live' | 'fallback'>('loading');

  // ── Inputs ──────────────────────────────────────────────────────────────────
  const [selectedProviderId, setSelectedProviderId] = useState('claude_sonnet');
  const [monthlyInferences, setMonthlyInferences] = useState(2_000_000);
  const [avgTokens, setAvgTokens] = useState(1_000);
  const [hardwareCAPEX, setHardwareCAPEX] = useState(80_000);
  const [amortizationMonths, setAmortizationMonths] = useState(36);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState(333);
  const [opsTeamCost, setOpsTeamCost] = useState(500);
  const [burstPercent, setBurstPercent] = useState(15);

  // ── Fetch live prices ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/ai-prices')
      .then((r) => r.json())
      .then((data: PriceData) => {
        if (data.providers?.length) {
          setPriceData(data);
          setLoadState('live');
        } else {
          setLoadState('fallback');
        }
      })
      .catch(() => setLoadState('fallback'));
  }, []);

  const selectedProvider = useMemo(
    () => priceData.providers.find((p) => p.id === selectedProviderId) ?? priceData.providers[0],
    [priceData, selectedProviderId],
  );

  // ── Calculations ─────────────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const blended = selectedProvider?.blendedPer1K ?? 0.00625;

    // Current: all cloud API
    const currentMonthly = (monthlyInferences * avgTokens / 1000) * blended;
    const currentLCOAI   = currentMonthly / monthlyInferences;

    // ARDIC hybrid
    const capexMonthly    = hardwareCAPEX / amortizationMonths;
    const burstInferences = monthlyInferences * (burstPercent / 100);
    const burstCost       = (burstInferences * avgTokens / 1000) * blended;
    const ardicMonthly    = capexMonthly + monthlyMaintenance + opsTeamCost + burstCost;
    const ardicLCOAI      = ardicMonthly / monthlyInferences;

    const monthlySavings  = Math.max(0, currentMonthly - ardicMonthly);
    const annualSavings   = monthlySavings * 12;
    const reductionPct    = currentLCOAI > 0 ? Math.max(0, ((currentLCOAI - ardicLCOAI) / currentLCOAI) * 100) : 0;
    const breakEvenMonths = monthlySavings > 0 ? hardwareCAPEX / monthlySavings : Infinity;

    // Volume crossover: inferences/month where ARDIC total cost = Cloud API cost
    // Solving: N × blended = fixedCosts + N × burstPct × blended
    // → N = fixedCosts / (blended × (1 - burstPct))
    const fixedArdicCosts = hardwareCAPEX / amortizationMonths + monthlyMaintenance + opsTeamCost;
    const blendedPerInference = blended * avgTokens / 1000;
    const crossoverN = blendedPerInference > 0
      ? Math.round(fixedArdicCosts / (blendedPerInference * (1 - burstPercent / 100)))
      : Infinity;

    return { currentMonthly, currentLCOAI, ardicMonthly, ardicLCOAI, monthlySavings, annualSavings, reductionPct, breakEvenMonths, crossoverN };
  }, [selectedProvider, monthlyInferences, avgTokens, hardwareCAPEX, amortizationMonths, monthlyMaintenance, opsTeamCost, burstPercent]);

  // ── Freshness badge ──────────────────────────────────────────────────────────
  const freshness = priceData.freshness ?? 'live';
  const freshnessMap: Record<string, { color: string; bg: string; border: string; icon: string; label: string }> = {
    live:     { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: '🟢', label: `Prices verified: ${priceData.last_verified}` },
    stale:    { color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: '🟡', label: `Prices last verified: ${priceData.last_verified} — may have changed` },
    outdated: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: '🔴', label: `Prices from ${priceData.last_verified} — please verify` },
    fallback: { color: '#6366f1', bg: '#f0f0ff', border: '#c7d2fe', icon: '🔵', label: `Cached prices (${priceData.last_verified}) — network unavailable` },
  };
  const freshnessConfig = freshnessMap[loadState === 'loading' ? 'live' : freshness]
    ?? freshnessMap['live'];

  const providerColor = PROVIDER_COLORS[selectedProvider?.provider ?? 'OpenAI'] ?? '#0284c7';

  return (
    <section
      id="lcoai-calculator"
      style={{
        background: 'linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #f8fafc 100%)',
        borderTop: '1px solid rgba(14,165,233,0.1)',
        padding: '5rem 4%',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 900,
              color: '#0f172a',
              fontFamily: "'DM Serif Display', serif",
              margin: 0,
              lineHeight: 1.15,
            }}>
              LCOAI™ Cost Calculator
            </h2>
            {/* Freshness badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px',
              background: freshnessConfig.bg,
              border: `1px solid ${freshnessConfig.border}`,
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 600,
              color: freshnessConfig.color,
              whiteSpace: 'nowrap',
            }}>
              <span>{freshnessConfig.icon}</span>
              <span>{freshnessConfig.label}</span>
            </div>
          </div>
          <p style={{ fontSize: '15px', color: '#475569', maxWidth: '700px', lineHeight: 1.6, margin: 0 }}>
            Compare your current all-cloud AI spend against ARDIC&apos;s self-hosted hybrid model.
            See exactly how much you could save — and when you break even.
          </p>
        </div>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Inputs ── */}
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(14,165,233,0.15)',
            borderRadius: '20px',
            padding: '1.75rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
              Your Current Setup
            </h3>

            {/* Provider selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                AI Provider
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {priceData.providers.map((p) => {
                  const isSelected = p.id === selectedProviderId;
                  const pColor = PROVIDER_COLORS[p.provider] ?? '#64748b';
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProviderId(p.id)}
                      style={{
                        padding: '0.5rem 0.6rem',
                        background: isSelected ? `${pColor}15` : 'rgba(248,250,252,0.8)',
                        border: isSelected ? `1.5px solid ${pColor}60` : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '10px', fontWeight: 700, color: pColor, marginBottom: '1px' }}>{p.provider}</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? '#0f172a' : '#64748b' }}>{p.model}</div>
                      <div style={{ fontSize: '9.5px', color: isSelected ? pColor : '#94a3b8', marginTop: '2px' }}>
                        ${(p.blendedPer1K * 1000).toFixed(3)}/M tokens
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Slider
              label="Monthly Inferences"
              value={monthlyInferences}
              min={600_000} max={10_000_000} step={100_000}
              onChange={setMonthlyInferences}
              formatValue={fmtInference}
              leftLabel={
                calc.crossoverN < Infinity
                  ? `⚖ ROI threshold (${selectedProvider?.model}): ${fmtInference(calc.crossoverN)}`
                  : `${selectedProvider?.model}: break-even cannot be calculated`
              }
              breakEven={calc.crossoverN < Infinity ? calc.crossoverN : undefined}
            />

            <Slider
              label="Avg Tokens per Inference"
              value={avgTokens}
              min={200} max={4_000} step={100}
              onChange={setAvgTokens}
              formatValue={(v) => `${v.toLocaleString()} tokens`}
              sublabel="Combined input + output"
            />

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 1.25rem 0' }}>
                ARDIC Hybrid Setup
              </h3>

              <Slider
                label="Hardware CAPEX (one-time)"
                value={hardwareCAPEX}
                min={20_000} max={300_000} step={5_000}
                onChange={setHardwareCAPEX}
                formatValue={(v) => fmtShort$(v)}
                sublabel="e.g. Lenovo ThinkSystem SR680a V3 = $80K"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                {/* Amortization dropdown */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Amortization
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={amortizationMonths}
                      onChange={(e) => setAmortizationMonths(Number(e.target.value))}
                      style={{
                        width: '100%', padding: '0.5rem 2rem 0.5rem 0.75rem',
                        borderRadius: '10px',
                        border: '1.5px solid #c7d8e8',
                        fontSize: '12px', fontWeight: 700, color: '#0f172a',
                        background: '#f8faff',
                        cursor: 'pointer',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        outline: 'none',
                      }}
                    >
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                    </select>
                    {/* Chevron icon */}
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Ops team cost input */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Ops Team /mo
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    border: '1.5px solid #c7d8e8',
                    borderRadius: '10px',
                    padding: '0.5rem 0.75rem',
                    background: '#f8faff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                    onFocus={() => {}}
                  >
                    {/* $ prefix */}
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0284c7', flexShrink: 0 }}>$</span>
                    <input
                      type="number" value={opsTeamCost} min={0} max={10000} step={100}
                      onChange={(e) => setOpsTeamCost(Number(e.target.value))}
                      style={{
                        width: '100%', border: 'none', outline: 'none',
                        fontSize: '12px', fontWeight: 700, color: '#0f172a',
                        background: 'transparent',
                      }}
                    />
                    {/* Pencil icon */}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <Slider
                label="Cloud Burst Overflow"
                value={burstPercent}
                min={0} max={50} step={5}
                onChange={setBurstPercent}
                formatValue={(v) => `${v}%`}
                sublabel="% of traffic routed to cloud API during peaks"
              />
            </div>
          </div>

          {/* ── RIGHT: Results ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* LCOAI comparison cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Current */}
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #fff8f0, #fffbf5)',
                border: '1.5px solid #fed7aa',
                borderRadius: '16px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Current ({selectedProvider?.model})
                </div>
                <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900, color: '#d97706', lineHeight: 1 }}>
                  ${calc.currentLCOAI.toFixed(5)}
                </div>
                <div style={{ fontSize: '11px', color: '#78350f', marginTop: '4px' }}>per inference</div>
                <div style={{ marginTop: '0.75rem', fontSize: '12px', color: '#92400e', fontWeight: 600 }}>
                  {fmtShort$(calc.currentMonthly)} / month
                </div>
              </div>

              {/* ARDIC */}
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                border: '1.5px solid #7dd3fc',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(14,165,233,0.1)',
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  ARDIC Hybrid
                </div>
                <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900, color: '#0284c7', lineHeight: 1 }}>
                  ${calc.ardicLCOAI.toFixed(5)}
                </div>
                <div style={{ fontSize: '11px', color: '#0369a1', marginTop: '4px' }}>per inference</div>
                <div style={{ marginTop: '0.75rem', fontSize: '12px', color: '#0369a1', fontWeight: 600 }}>
                  {fmtShort$(calc.ardicMonthly)} / month
                </div>
              </div>
            </div>

            {/* Savings banner */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
              border: '1.5px solid #86efac',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '140px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual Savings</div>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#15803d', lineHeight: 1 }}>
                  {fmtShort$(calc.annualSavings)}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '12px', color: '#166534' }}>
                  <span style={{ fontWeight: 700 }}>{fmt$(calc.monthlySavings, 0)}</span>
                  <span style={{ color: '#4ade80', marginLeft: '4px' }}>saved / month</span>
                </div>
                <div style={{ fontSize: '12px', color: '#166534' }}>
                  Break-even in{' '}
                  <span style={{ fontWeight: 700 }}>
                    {calc.breakEvenMonths === Infinity ? 'N/A' : `${calc.breakEvenMonths.toFixed(1)} months`}
                  </span>
                </div>
              </div>
            </div>

            {/* Cost reduction bar */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(14,165,233,0.12)',
              borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Cost Reduction</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0284c7' }}>{calc.reductionPct.toFixed(1)}%</span>
              </div>
              <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(calc.reductionPct, 100)}%`,
                  background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
                  borderRadius: '999px',
                  transition: 'width 0.5s ease',
                  boxShadow: '0 2px 8px rgba(14,165,233,0.3)',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: '#94a3b8' }}>
                <span>Cloud API baseline</span>
                <span>ARDIC Hybrid</span>
              </div>
            </div>

            {/* Cost breakdown table */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(14,165,233,0.12)',
              borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ARDIC Monthly Cost Breakdown
              </div>
              {[
                { label: `Hardware amortization (${amortizationMonths}mo)`, value: hardwareCAPEX / amortizationMonths, color: '#7c3aed' },
                { label: 'Infrastructure maintenance', value: monthlyMaintenance, color: '#0284c7' },
                { label: 'Ops team cost', value: opsTeamCost, color: '#0e7490' },
                { label: `Cloud burst (${burstPercent}% overflow)`, value: calc.ardicMonthly - (hardwareCAPEX / amortizationMonths) - monthlyMaintenance - opsTeamCost, color: '#d97706' },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #f8fafc' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '11.5px', color: '#475569' }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{fmt$(row.value, 0)}/mo</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Total</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#0284c7' }}>{fmt$(calc.ardicMonthly, 0)}/mo</span>
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{ fontSize: '10.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              * All values in USD. Provider prices sourced from <strong>openrouter.ai</strong> and verified on {priceData.last_verified}.
              Hardware costs are indicative based on Lenovo ThinkSystem SR680a V3 specifications.
              Contact ARDIC for a tailored infrastructure and ROI assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
