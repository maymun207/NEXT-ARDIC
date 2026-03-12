"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Factory,
  Activity,
  Rocket,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  Zap,
  Search,
  Settings,
  RefreshCw,
} from "lucide-react";
import {
  defaultInputs,
  calculateROI,
  formatCurrency,
  formatCurrencyFull,
  formatPercent,
  type ROIInputs,
  type ROIResults,
  type LossCategory,
} from "@/lib/roiCalculations";

// ── Exchange Rate Hook ──

interface ExchangeRateState {
  rate: number | null;
  currencyCode: string;
  currencySymbol: string;
  countryName: string;
  updatedAt: Date | null;
  loading: boolean;
  error: boolean;
}

function useExchangeRate() {
  const [state, setState] = useState<ExchangeRateState>({
    rate: null,
    currencyCode: "",
    currencySymbol: "",
    countryName: "",
    updatedAt: null,
    loading: true,
    error: false,
  });

  const fetch = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      // 1. Detect user country/currency — try two geo APIs
      let currency = "USD";
      let country = "";
      try {
        const geoRes = await window.fetch("https://freeipapi.com/api/json");
        const geo = await geoRes.json();
        currency = geo.currencyCode || "USD";
        country = geo.countryName || "";
      } catch {
        // silent fallback — we'll try ipapi as secondary
        try {
          const geoRes2 = await window.fetch("https://ipapi.co/json/");
          const geo2 = await geoRes2.json();
          currency = geo2.currency || "USD";
          country = geo2.country_name || "";
        } catch {
          /* give up on geo, default USD */
        }
      }

      // 2. Fetch exchange rates (USD base)
      const rateRes = await window.fetch(
        "https://open.er-api.com/v6/latest/USD",
      );
      const rateData = await rateRes.json();
      const rate: number = rateData.rates?.[currency] ?? 1;

      // 3. Get symbol using browser Intl
      let symbol = currency;
      try {
        symbol =
          (1)
            .toLocaleString("en", {
              style: "currency",
              currency,
              minimumFractionDigits: 0,
            })
            .replace(/[\d\s.,]/g, "")
            .trim() || currency;
      } catch {
        /* leave as code */
      }

      setState({
        rate,
        currencyCode: currency,
        currencySymbol: symbol,
        countryName: country,
        updatedAt: new Date(),
        loading: false,
        error: false,
      });
    } catch {
      setState((s) => ({ ...s, loading: false, error: true }));
    }
  }, []);

  useEffect(() => {
    /* Kick off the initial fetch when the component mounts.
       The void return satisfies set-state-in-effect because
       the async callback manages its own state transitions. */
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setState is async inside fetch(), not synchronous in this effect
    void fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
}

// ── Exchange Rate Banner ──

function ExchangeRateBanner() {
  const {
    rate,
    currencyCode,
    currencySymbol,
    countryName,
    updatedAt,
    loading,
    error,
    refetch,
  } = useExchangeRate();

  /* useMemo instead of inline Date.now() — avoids react-hooks/purity
     flagging an impure function call during render. Re-computes
     whenever updatedAt changes (i.e. after a refetch). */
  const minutesAgo = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/purity -- intentionally impure: computes elapsed time from last fetch
      updatedAt ? Math.floor((Date.now() - updatedAt.getTime()) / 60000) : null,
    [updatedAt],
  );

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs text-neutral-500 mb-8 animate-pulse">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        Detecting your currency…
      </div>
    );
  }

  if (error || !rate) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs text-neutral-500 mb-8">
        <span>💱</span>
        <span>
          Exchange rate unavailable — all figures in USD. Check{" "}
          <a
            href="https://xe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-neutral-300"
          >
            xe.com
          </a>{" "}
          for your local rate.
        </span>
        <button
          onClick={refetch}
          title="Retry"
          className="ml-auto hover:text-neutral-300 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // If they're in a USD country, just confirm
  if (currencyCode === "USD") {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs text-neutral-400 mb-8">
        <span>💵</span>
        <span>
          All figures are in <span className="font-bold text-white">USD</span>
          {countryName ? ` · ${countryName}` : ""}
        </span>
        <button
          onClick={refetch}
          title="Refresh"
          className="ml-auto hover:text-neutral-300 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-accent/20 bg-accent/5 text-xs mb-8">
      <span className="text-base">💱</span>
      <span className="text-neutral-300">
        Exchange rate:{" "}
        <span className="font-bold text-white">
          1 USD = {currencySymbol}
          {rate.toFixed(2)} {currencyCode}
        </span>
        {countryName ? (
          <span className="text-neutral-500"> · {countryName}</span>
        ) : null}
        {minutesAgo !== null && (
          <span className="text-neutral-600 ml-2">
            (updated {minutesAgo === 0 ? "just now" : `${minutesAgo}m ago`})
          </span>
        )}
      </span>
      <button
        onClick={refetch}
        title="Refresh rate"
        className="ml-auto text-neutral-500 hover:text-accent transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Inline Salary Input ──

function SalaryInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const start = () => {
    setText(String(value));
    setEditing(true);
  };
  const commit = () => {
    setEditing(false);
    const n = parseFloat(text.replace(/[^0-9.]/g, ""));
    if (!isNaN(n) && n > 0) onChange(Math.round(n));
  };

  return (
    <div className="flex items-center gap-2 mt-2 text-xs">
      <span className="text-neutral-500">{label}:</span>
      {editing ? (
        <div className="flex items-center gap-1">
          <span className="text-neutral-400">$</span>
          <input
            autoFocus
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="w-28 text-right text-xs font-bold text-accent bg-neutral-800 border border-accent/40 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-accent/50"
          />
          <span className="text-neutral-500">/yr</span>
        </div>
      ) : (
        <button
          onClick={start}
          title="Click to edit annual salary"
          className="font-bold text-accent/80 hover:text-accent hover:underline underline-offset-2 transition-all tabular-nums"
        >
          ${value.toLocaleString()}/yr
        </button>
      )}
    </div>
  );
}

// ── Slider Input Component ──

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = "number",
  suffix = "",
  prefix = "",
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format?: "number" | "currency" | "percent";
  suffix?: string;
  prefix?: string;
  hint?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const displayValue = () => {
    if (format === "currency") return formatCurrencyFull(value);
    if (format === "percent") return `${(value * 100).toFixed(1)}%`;
    return `${prefix}${value.toLocaleString()}${suffix}`;
  };

  const startEdit = () => {
    if (format === "currency") {
      setEditText(String(value));
    } else if (format === "percent") {
      setEditText(String(+(value * 100).toFixed(2)));
    } else {
      setEditText(String(value));
    }
    setEditing(true);
  };

  const commitEdit = () => {
    setEditing(false);
    const raw = editText.replace(/[^0-9.\-]/g, "");
    let num = parseFloat(raw);
    if (isNaN(num)) return;
    if (format === "percent") num = num / 100;
    num = Math.max(min, Math.min(max, num));
    onChange(num);
  };

  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-neutral-300 font-medium">{label}</label>
        {editing ? (
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="w-32 text-right text-sm font-bold text-accent bg-neutral-800 border border-accent/40 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-accent/50"
          />
        ) : (
          <button
            onClick={startEdit}
            title="Click to type exact value"
            className="text-sm font-bold text-accent tabular-nums cursor-pointer hover:underline hover:underline-offset-2 transition-all"
          >
            {displayValue()}
          </button>
        )}
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-neutral-800
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,209,255,0.6)]
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
            [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-[0_0_20px_rgba(0,209,255,0.8)]"
          style={{
            background: `linear-gradient(to right, rgba(0,209,255,0.5) 0%, rgba(0,209,255,0.5) ${pct}%, rgb(38,38,38) ${pct}%, rgb(38,38,38) 100%)`,
          }}
        />
      </div>
      {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </div>
  );
}

// ── Step definitions ──

const steps = [
  { id: 0, label: "Company", icon: Factory },
  { id: 1, label: "Performance", icon: Activity },
  { id: 2, label: "Deployment", icon: Rocket },
  { id: 3, label: "Results", icon: BarChart3 },
];

// ── Loss Bar ──

function LossBar({
  category,
  total,
  color,
  icon: Icon,
  delay,
  lowLabel = "Low",
  highLabel = "High",
}: {
  category: LossCategory;
  total: number;
  color: string;
  icon: React.ElementType;
  delay: number;
  lowLabel?: string;
  highLabel?: string;
}) {
  const pct = total > 0 ? (category.midpoint / total) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-medium text-neutral-300">
            {category.name}
          </span>
        </div>
        <span className="text-sm font-bold text-white tabular-nums">
          {formatCurrency(category.midpoint)}
        </span>
      </div>
      <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${color}80, ${color})`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-neutral-500">
          {lowLabel}: {formatCurrency(category.subtotalLow)}
        </span>
        <span className="text-xs text-neutral-500">
          {highLabel}: {formatCurrency(category.subtotalHigh)}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main Component ──

export default function ROICalculator({ locale }: { locale?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<ROIInputs>(defaultInputs);
  const isTr = locale === "tr";

  // ── Translation map ──
  const t = isTr
    ? {
        badge: "ROI Hesaplayıcı",
        title: "Gizli Kayıplarınızı",
        titleHighlight: "Hesaplayın",
        subtitle:
          "McKinsey, Deloitte ve Dünya Ekonomik Forumu endüstri karşılaştırmalarına dayalıdır. Girdileri operasyonunuza göre ayarlayın.",
        steps: ["Şirket", "Performans", "Uygulama", "Sonuçlar"],
        back: "Geri",
        next: "İleri",
        estimatedLoss: "Tahmini kayıp:",
        getDetailedAnalysis: "Detaylı Analiz Alın",
        // Step 0
        companyProfile: "Şirket Profili",
        companyDesc: "Üretim operasyonunuzun ölçeğini tanımlayın.",
        annualRevenue: "Yıllık Üretim Geliri",
        numFactories: "Fabrika Sayısı",
        numMachines: "Makine / Ekipman Sayısı",
        annualEnergyCosts: "Yıllık Enerji Maliyetleri",
        annualRawMaterial: "Yıllık Hammadde Harcaması",
        avgInventory: "Ortalama Stok Değeri",
        minRevenue: "Minimum 50M$",
        productionLines: "üretim hattı (otomatik hesaplanır)",
        totalAcrossFactories: "Tüm fabrikalardaki toplam",
        avgOnHand: "Eldeki ortalama stok",
        // Step 1
        perfMetrics: "Performans & Maliyet Metrikleri",
        perfDesc: "Mevcut operasyonel performans ve maliyet parametreleri.",
        avgOEE: "Ortalama OEE",
        oeeHint: "Genel oran · Tipik: %40–85",
        unplannedDowntime: "Plansız Duruş Oranı",
        downtimeHint: "Yıllık planlı sürenin %'si · Tipik: %2–15",
        scrapRate: "Hurda / Hata Oranı",
        scrapHint: "Yıllık üretilen birimlerin %'si · Tipik: %1–10",
        customerReturn: "Müşteri İade Oranı",
        returnHint: "Yıllık gelir/satılan birimlerin %'si · Tipik: %0,1–3",
        downtimeCost: "Saat Başı Duruş Maliyeti",
        downtimeCostHint: "Saat başı · kayıp üretim + işçilik maliyeti",
        emergencyCalls: "Acil Bakım Çağrıları",
        emergencyHint: "Yıllık · plansız tamir olayları",
        qualityInspectors: "Kalite Kontrolörleri",
        inspectorHint: "kişi (kadro) · tam zamanlı eşdeğerleri",
        supervisors: "Yöneticiler / Müdürler",
        supervisorHint: "kişi (kadro) · üretim liderlik ekibi",
        annualSalary: "Kişi başı yıllık maaş (USD)",
        perYear: "/yıl",
        editSalary: "Yıllık maaşı düzenlemek için tıklayın",
        // Step 2
        deploymentTitle: "Uygulama & Değer Yakalama Oranları",
        deploymentDesc: "Aşamalı dağıtım planı ve beklenen değer yakalama.",
        year1Deploy: "Yıl 1: Dağıtılacak Fabrika",
        year2Deploy: "Yıl 2: Toplam Dağıtılan Fabrika",
        year3Deploy: "Yıl 3: Toplam Dağıtılan Fabrika",
        year1Capture: "Yıl 1 Yakalama Oranı",
        year2Capture: "Yıl 2 Yakalama Oranı",
        year3Capture: "Yıl 3 Yakalama Oranı",
        povPilot: "POV + İlk pilot",
        enterpriseScale: "Kurumsal ölçeklendirme",
        fullDeployment: "Tam dağıtım",
        investmentModel: "Yatırım Modeli",
        standard: "Standart",
        custom: "Özel",
        standardModel: "Standart yatırım modeli:",
        year1: "Yıl 1",
        year2: "Yıl 2",
        year3: "Yıl 3",
        povPilotShort: "POV + Pilot",
        optimization: "Optimizasyon",
        factories: "fabrika",
        year1Investment: "Yıl 1 Yatırımı",
        year2Investment: "Yıl 2 Yatırımı",
        year3Investment: "Yıl 3 Yatırımı",
        // Step 3
        totalLoss: "Toplam Adreslenebilir Kayıp",
        range: "Aralık",
        cumulativeROI: "3 Yıllık Kümülatif ROI",
        net: "Net",
        paybackPeriod: "Geri Ödeme Süresi",
        mo: "ay",
        investment: "Yatırım",
        lossBreakdown: "Adreslenebilir Kayıp Dağılımı",
        financialSummary: "3 Yıllık Finansal Özet",
        yearCol: "Yıl",
        investmentCol: "Yatırım",
        savingsCol: "Tasarruf",
        netCol: "Net",
        cumROI: "Küm. ROI",
        total: "Toplam",
        methodology:
          '* Tüm tahminlere %30 muhafazakâr "gerçeklik indirimi" uygulanmıştır. McKinsey, Deloitte, Aberdeen Group, WEF ve ARC Advisory karşılaştırmalarına dayalıdır.',
        low: "Düşük",
        high: "Yüksek",
        // Exchange rate
        detectingCurrency: "Para biriminiz algılanıyor…",
        exchangeUnavailable:
          "Döviz kuru bulunamadı — tüm rakamlar USD cinsindendir.",
        allFiguresUSD: "Tüm rakamlar",
        usd: "USD",
        exchangeRate: "Döviz kuru:",
        justNow: "az önce",
        mAgo: "dk önce",
        updated: "güncellendi",
        typical: "Tipik:",
      }
    : {
        badge: "ROI Calculator",
        title: "Calculate Your",
        titleHighlight: "Hidden Losses",
        subtitle:
          "Based on industry benchmarks from McKinsey, Deloitte, and the World Economic Forum. Adjust inputs to match your operation.",
        steps: ["Company", "Performance", "Deployment", "Results"],
        back: "Back",
        next: "Next",
        estimatedLoss: "Estimated loss:",
        getDetailedAnalysis: "Get Detailed Analysis",
        companyProfile: "Company Profile",
        companyDesc: "Define your manufacturing operation\u0027s scale.",
        annualRevenue: "Annual Manufacturing Revenue",
        numFactories: "Number of Factories",
        numMachines: "Number of Machines / Equipment",
        annualEnergyCosts: "Annual Energy Costs",
        annualRawMaterial: "Annual Raw Material Spend",
        avgInventory: "Average Inventory Value",
        minRevenue: "Minimum $50M",
        productionLines: "production lines (auto-calculated)",
        totalAcrossFactories: "Total across all factories",
        avgOnHand: "Average on-hand inventory",
        perfMetrics: "Performance & Cost Metrics",
        perfDesc: "Current operational performance and cost parameters.",
        avgOEE: "Average OEE",
        oeeHint: "Overall ratio · Typical: 40–85%",
        unplannedDowntime: "Unplanned Downtime Rate",
        downtimeHint: "% of annual scheduled time · Typical: 2–15%",
        scrapRate: "Scrap / Defect Rate",
        scrapHint: "% of annual units produced · Typical: 1–10%",
        customerReturn: "Customer Return Rate",
        returnHint: "% of annual revenue/units sold · Typical: 0.1–3%",
        downtimeCost: "Downtime Cost per Hour",
        downtimeCostHint: "Per hour · lost production + labor cost",
        emergencyCalls: "Emergency Maintenance Calls",
        emergencyHint: "Per year · unplanned repair incidents",
        qualityInspectors: "Quality Inspectors",
        inspectorHint: "people (headcount) · full-time equivalents",
        supervisors: "Supervisors / Managers",
        supervisorHint: "people (headcount) · production leadership team",
        annualSalary: "Annual salary per person (USD)",
        perYear: "/yr",
        editSalary: "Click to edit annual salary",
        deploymentTitle: "Deployment & Capture Rates",
        deploymentDesc: "Phased rollout plan and expected value capture.",
        year1Deploy: "Year 1: Factories to Deploy",
        year2Deploy: "Year 2: Total Factories Deployed",
        year3Deploy: "Year 3: Total Factories Deployed",
        year1Capture: "Year 1 Capture Rate",
        year2Capture: "Year 2 Capture Rate",
        year3Capture: "Year 3 Capture Rate",
        povPilot: "POV + Initial pilot",
        enterpriseScale: "Enterprise scale-out",
        fullDeployment: "Full deployment",
        investmentModel: "Investment Model",
        standard: "Standard",
        custom: "Custom",
        standardModel: "Standard investment model:",
        year1: "Year 1",
        year2: "Year 2",
        year3: "Year 3",
        povPilotShort: "POV + Pilot",
        optimization: "Optimization",
        factories: "factories",
        year1Investment: "Year 1 Investment",
        year2Investment: "Year 2 Investment",
        year3Investment: "Year 3 Investment",
        totalLoss: "Total Addressable Loss",
        range: "Range",
        cumulativeROI: "3-Year Cumulative ROI",
        net: "Net",
        paybackPeriod: "Payback Period",
        mo: "mo",
        investment: "Investment",
        lossBreakdown: "Addressable Loss Breakdown",
        financialSummary: "3-Year Financial Summary",
        yearCol: "Year",
        investmentCol: "Investment",
        savingsCol: "Savings",
        netCol: "Net",
        cumROI: "Cum. ROI",
        total: "Total",
        methodology:
          '* All estimates apply a 30% conservative "reality discount." Based on benchmarks from McKinsey, Deloitte, Aberdeen Group, WEF, and ARC Advisory.',
        low: "Low",
        high: "High",
        detectingCurrency: "Detecting your currency…",
        exchangeUnavailable: "Exchange rate unavailable — all figures in USD.",
        allFiguresUSD: "All figures are in",
        usd: "USD",
        exchangeRate: "Exchange rate:",
        justNow: "just now",
        mAgo: "m ago",
        updated: "updated",
        typical: "Typical:",
      };

  // Make steps locale-aware
  const localizedSteps = [
    { id: 0, label: t.steps[0], icon: Factory },
    { id: 1, label: t.steps[1], icon: Activity },
    { id: 2, label: t.steps[2], icon: Rocket },
    { id: 3, label: t.steps[3], icon: BarChart3 },
  ];

  const updateField = useCallback(
    <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
      setInputs((prev) => {
        const next = { ...prev, [key]: value };

        // When total factories changes, clamp all year deployments
        if (key === "numFactories") {
          const cap = value as number;
          next.year1Factories = Math.min(prev.year1Factories, cap);
          next.year2Factories = Math.min(prev.year2Factories, cap);
          next.year3Factories = Math.min(prev.year3Factories, cap);
        }

        // Enforce Year1 ≤ Year2 ≤ Year3
        if (key === "year1Factories") {
          const v = value as number;
          if (next.year2Factories < v) next.year2Factories = v;
          if (next.year3Factories < v) next.year3Factories = v;
        }
        if (key === "year2Factories") {
          const v = value as number;
          if (next.year3Factories < v) next.year3Factories = v;
        }

        return next;
      });
    },
    [],
  );

  const results: ROIResults = useMemo(() => calculateROI(inputs), [inputs]);

  // Broadcast calculator state to Temel so it can see the viewer's live numbers
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("roi-calculator-state", {
          detail: {
            // Key inputs
            annualRevenue: inputs.annualRevenue,
            numFactories: inputs.numFactories,
            numMachines: inputs.numMachines,
            averageOEE: inputs.averageOEE,
            unplannedDowntimeRate: inputs.unplannedDowntimeRate,
            scrapDefectRate: inputs.scrapDefectRate,
            downtimeCostPerHour: inputs.downtimeCostPerHour,
            emergencyMaintenanceCalls: inputs.emergencyMaintenanceCalls,
            annualEnergyCosts: inputs.annualEnergyCosts,
            annualRawMaterialSpend: inputs.annualRawMaterialSpend,
            averageInventoryValue: inputs.averageInventoryValue,
            year1Factories: inputs.year1Factories,
            year2Factories: inputs.year2Factories,
            year3Factories: inputs.year3Factories,
            year1CaptureRate: inputs.year1CaptureRate,
            year2CaptureRate: inputs.year2CaptureRate,
            year3CaptureRate: inputs.year3CaptureRate,
            investmentModel: inputs.investmentModel,
            // Computed results
            totalAddressableLoss: results.midpoint,
            darkDataLoss: results.darkData.midpoint,
            reactiveMaintenanceLoss: results.reactiveMaintenance.midpoint,
            qualityEscapesLoss: results.qualityEscapes.midpoint,
            decisionLatencyLoss: results.decisionLatency.midpoint,
            cumulativeROI: results.cumulativeROI,
            paybackMonths: results.paybackMonths,
            totalInvestment: results.totalInvestment,
            totalSavings: results.totalSavings,
          },
        }),
      );
    }, 800); // debounce — don't fire on every slider tick
    return () => clearTimeout(timer);
  }, [inputs, results]);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <section
      id="roi-calculator"
      className="relative bg-[#020202] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[200px] z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <Calculator className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
              {t.badge}
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t.title} <span className="text-accent">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {localizedSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_15px_rgba(0,209,255,0.2)]"
                      : isDone
                        ? "bg-accent/10 text-accent/60 border border-accent/20"
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight
                    className={`w-4 h-4 mx-1 ${i < currentStep ? "text-accent/40" : "text-neutral-700"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card Container */}
        <div className="rounded-2xl border border-neutral-800 bg-linear-to-br from-neutral-900/80 to-black/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {/* ═══ STEP 0: COMPANY PROFILE ═══ */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-12"
              >
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <Factory className="w-6 h-6 text-accent" />
                  {t.companyProfile}
                </h3>
                <p className="text-neutral-400 mb-8">{t.companyDesc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <SliderInput
                    label={t.annualRevenue}
                    value={inputs.annualRevenue}
                    onChange={(v) => updateField("annualRevenue", v)}
                    min={50_000_000}
                    max={5_000_000_000}
                    step={10_000_000}
                    format="currency"
                    hint={t.minRevenue}
                  />
                  <SliderInput
                    label={t.numFactories}
                    value={inputs.numFactories}
                    onChange={(v) => updateField("numFactories", v)}
                    min={1}
                    max={50}
                    step={1}
                    hint={`${inputs.numFactories * 4} ${t.productionLines}`}
                  />
                  <SliderInput
                    label={t.numMachines}
                    value={inputs.numMachines}
                    onChange={(v) => updateField("numMachines", v)}
                    min={10}
                    max={2000}
                    step={10}
                    hint={t.totalAcrossFactories}
                  />
                  <SliderInput
                    label={t.annualEnergyCosts}
                    value={inputs.annualEnergyCosts}
                    onChange={(v) => updateField("annualEnergyCosts", v)}
                    min={500_000}
                    max={100_000_000}
                    step={500_000}
                    format="currency"
                  />
                  <SliderInput
                    label={t.annualRawMaterial}
                    value={inputs.annualRawMaterialSpend}
                    onChange={(v) => updateField("annualRawMaterialSpend", v)}
                    min={10_000_000}
                    max={2_000_000_000}
                    step={5_000_000}
                    format="currency"
                  />
                  <SliderInput
                    label={t.avgInventory}
                    value={inputs.averageInventoryValue}
                    onChange={(v) => updateField("averageInventoryValue", v)}
                    min={1_000_000}
                    max={500_000_000}
                    step={1_000_000}
                    format="currency"
                    hint={t.avgOnHand}
                  />
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 1: PERFORMANCE METRICS ═══ */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-12"
              >
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-accent" />
                  {t.perfMetrics}
                </h3>
                <p className="text-neutral-400 mb-8">{t.perfDesc}</p>

                {/* Exchange Rate Banner */}
                <ExchangeRateBanner />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <SliderInput
                    label={t.avgOEE}
                    value={inputs.averageOEE}
                    onChange={(v) => updateField("averageOEE", v)}
                    min={0.3}
                    max={0.95}
                    step={0.01}
                    format="percent"
                    hint={t.oeeHint}
                  />
                  <SliderInput
                    label={t.unplannedDowntime}
                    value={inputs.unplannedDowntimeRate}
                    onChange={(v) => updateField("unplannedDowntimeRate", v)}
                    min={0.01}
                    max={0.15}
                    step={0.005}
                    format="percent"
                    hint={t.downtimeHint}
                  />
                  <SliderInput
                    label={t.scrapRate}
                    value={inputs.scrapDefectRate}
                    onChange={(v) => updateField("scrapDefectRate", v)}
                    min={0.005}
                    max={0.1}
                    step={0.005}
                    format="percent"
                    hint={t.scrapHint}
                  />
                  <SliderInput
                    label={t.customerReturn}
                    value={inputs.customerReturnRate}
                    onChange={(v) => updateField("customerReturnRate", v)}
                    min={0.001}
                    max={0.03}
                    step={0.0005}
                    format="percent"
                    hint={t.returnHint}
                  />
                  <SliderInput
                    label={t.downtimeCost}
                    value={inputs.downtimeCostPerHour}
                    onChange={(v) => updateField("downtimeCostPerHour", v)}
                    min={500}
                    max={50_000}
                    step={500}
                    format="currency"
                    hint={t.downtimeCostHint}
                  />
                  <SliderInput
                    label={t.emergencyCalls}
                    value={inputs.emergencyMaintenanceCalls}
                    onChange={(v) =>
                      updateField("emergencyMaintenanceCalls", v)
                    }
                    min={10}
                    max={1000}
                    step={10}
                    hint={t.emergencyHint}
                  />

                  {/* Quality Inspectors — with editable annual salary */}
                  <div>
                    <SliderInput
                      label={t.qualityInspectors}
                      value={inputs.qualityInspectorCount}
                      onChange={(v) => updateField("qualityInspectorCount", v)}
                      min={1}
                      max={200}
                      step={1}
                      hint={`${inputs.qualityInspectorCount} ${t.inspectorHint}`}
                    />
                    <SalaryInput
                      label={t.annualSalary}
                      value={inputs.qualityInspectorAnnualSalary}
                      onChange={(v) =>
                        updateField("qualityInspectorAnnualSalary", v)
                      }
                    />
                  </div>

                  {/* Supervisors / Managers — with editable annual salary */}
                  <div>
                    <SliderInput
                      label={t.supervisors}
                      value={inputs.supervisorCount}
                      onChange={(v) => updateField("supervisorCount", v)}
                      min={5}
                      max={500}
                      step={5}
                      hint={`${inputs.supervisorCount} ${t.supervisorHint}`}
                    />
                    <SalaryInput
                      label={t.annualSalary}
                      value={inputs.supervisorAnnualSalary}
                      onChange={(v) => updateField("supervisorAnnualSalary", v)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 2: DEPLOYMENT SCOPE ═══ */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-12"
              >
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-accent" />
                  {t.deploymentTitle}
                </h3>
                <p className="text-neutral-400 mb-8">{t.deploymentDesc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  <SliderInput
                    label={t.year1Deploy}
                    value={inputs.year1Factories}
                    onChange={(v) => updateField("year1Factories", v)}
                    min={1}
                    max={inputs.numFactories}
                    step={1}
                    hint={t.povPilot}
                  />
                  <SliderInput
                    label={t.year2Deploy}
                    value={inputs.year2Factories}
                    onChange={(v) => updateField("year2Factories", v)}
                    min={1}
                    max={inputs.numFactories}
                    step={1}
                    hint={t.enterpriseScale}
                  />
                  <SliderInput
                    label={t.year3Deploy}
                    value={inputs.year3Factories}
                    onChange={(v) => updateField("year3Factories", v)}
                    min={1}
                    max={inputs.numFactories}
                    step={1}
                    hint={t.fullDeployment}
                  />
                  <SliderInput
                    label={t.year1Capture}
                    value={inputs.year1CaptureRate}
                    onChange={(v) => updateField("year1CaptureRate", v)}
                    min={0.1}
                    max={0.4}
                    step={0.05}
                    format="percent"
                    hint={`${t.typical} 15-35%`}
                  />
                  <SliderInput
                    label={t.year2Capture}
                    value={inputs.year2CaptureRate}
                    onChange={(v) => updateField("year2CaptureRate", v)}
                    min={0.3}
                    max={0.75}
                    step={0.05}
                    format="percent"
                    hint={`${t.typical} 45-65%`}
                  />
                  <SliderInput
                    label={t.year3Capture}
                    value={inputs.year3CaptureRate}
                    onChange={(v) => updateField("year3CaptureRate", v)}
                    min={0.4}
                    max={0.85}
                    step={0.05}
                    format="percent"
                    hint={`${t.typical} 55-75%`}
                  />
                </div>

                {/* Investment Model Toggle */}
                <div className="mt-10 pt-8 border-t border-neutral-800">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-accent" />
                    {t.investmentModel}
                  </h4>
                  <div className="flex gap-4 mb-6">
                    {(["Standard", "Custom"] as const).map((model) => (
                      <button
                        key={model}
                        onClick={() => updateField("investmentModel", model)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          inputs.investmentModel === model
                            ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_15px_rgba(0,209,255,0.2)]"
                            : "bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700"
                        }`}
                      >
                        {model === "Standard" ? t.standard : t.custom}
                      </button>
                    ))}
                  </div>

                  {inputs.investmentModel === "Standard" ? (
                    <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                      <p className="text-sm text-neutral-400 mb-3">
                        {t.standardModel}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider">
                            {t.year1}
                          </p>
                          <p className="text-lg font-bold text-white mt-1">
                            $500K
                          </p>
                          <p className="text-xs text-neutral-500">
                            {t.povPilotShort}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider">
                            {t.year2}
                          </p>
                          <p className="text-lg font-bold text-white mt-1">
                            {formatCurrency(inputs.year2Factories * 500_000)}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {inputs.year2Factories} {t.factories} × $500K
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider">
                            {t.year3}
                          </p>
                          <p className="text-lg font-bold text-white mt-1">
                            $700K
                          </p>
                          <p className="text-xs text-neutral-500">
                            {t.optimization}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <SliderInput
                        label={t.year1Investment}
                        value={inputs.customYear1}
                        onChange={(v) => updateField("customYear1", v)}
                        min={0}
                        max={5_000_000}
                        step={50_000}
                        format="currency"
                      />
                      <SliderInput
                        label={t.year2Investment}
                        value={inputs.customYear2}
                        onChange={(v) => updateField("customYear2", v)}
                        min={0}
                        max={20_000_000}
                        step={100_000}
                        format="currency"
                      />
                      <SliderInput
                        label={t.year3Investment}
                        value={inputs.customYear3}
                        onChange={(v) => updateField("customYear3", v)}
                        min={0}
                        max={5_000_000}
                        step={50_000}
                        format="currency"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 3: RESULTS ═══ */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-12"
              >
                {/* Three Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-red-500/30 bg-linear-to-br from-red-500/10 to-transparent p-6 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-xs tracking-[0.2em] text-red-300/80 uppercase font-bold mb-2">
                      {t.totalLoss}
                    </p>
                    <p className="text-4xl lg:text-5xl font-black text-white">
                      {formatCurrency(results.midpoint)}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      {t.range}: {formatCurrency(results.finalLossLow)} –{" "}
                      {formatCurrency(results.finalLossHigh)}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/10 to-transparent p-6 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <TrendingUp className="w-8 h-8 text-emerald-400" />
                    </div>
                    <p className="text-xs tracking-[0.2em] text-emerald-300/80 uppercase font-bold mb-2">
                      {t.cumulativeROI}
                    </p>
                    <p className="text-4xl lg:text-5xl font-black text-white">
                      {formatPercent(results.cumulativeROI)}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      {t.net}:{" "}
                      {formatCurrency(
                        results.totalSavings - results.totalInvestment,
                      )}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-accent/30 bg-linear-to-br from-accent/10 to-transparent p-6 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <Clock className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-xs tracking-[0.2em] text-accent/80 uppercase font-bold mb-2">
                      {t.paybackPeriod}
                    </p>
                    <p className="text-4xl lg:text-5xl font-black text-white">
                      {results.paybackMonths.toFixed(0)}
                      <span className="text-2xl text-neutral-400 ml-1">
                        {t.mo}
                      </span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      {t.investment}: {formatCurrency(results.totalInvestment)}
                    </p>
                  </motion.div>
                </div>

                {/* Loss Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-accent" />
                      {t.lossBreakdown}
                    </h4>
                    <div className="space-y-6">
                      <LossBar
                        category={results.darkData}
                        total={results.midpoint}
                        color="#f43f5e"
                        icon={Search}
                        delay={0.1}
                        lowLabel={t.low}
                        highLabel={t.high}
                      />
                      <LossBar
                        category={results.reactiveMaintenance}
                        total={results.midpoint}
                        color="#f59e0b"
                        icon={Settings}
                        delay={0.2}
                        lowLabel={t.low}
                        highLabel={t.high}
                      />
                      <LossBar
                        category={results.qualityEscapes}
                        total={results.midpoint}
                        color="#8b5cf6"
                        icon={AlertTriangle}
                        delay={0.3}
                        lowLabel={t.low}
                        highLabel={t.high}
                      />
                      <LossBar
                        category={results.decisionLatency}
                        total={results.midpoint}
                        color="#06b6d4"
                        icon={Zap}
                        delay={0.4}
                        lowLabel={t.low}
                        highLabel={t.high}
                      />
                    </div>
                  </div>

                  {/* 3-Year Financial Table */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-accent" />
                      {t.financialSummary}
                    </h4>
                    <div className="overflow-hidden rounded-xl border border-neutral-800">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-neutral-800/50 text-neutral-400">
                            <th className="px-4 py-3 text-left font-medium">
                              {t.yearCol}
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                              {t.investmentCol}
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                              {t.savingsCol}
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                              {t.netCol}
                            </th>
                            <th className="px-4 py-3 text-right font-medium">
                              {t.cumROI}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.years.map((yr, i) => (
                            <motion.tr
                              key={yr.year}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="border-t border-neutral-800/50 hover:bg-neutral-800/30 transition-colors"
                            >
                              <td className="px-4 py-3 font-bold text-white">
                                {t.yearCol} {yr.year}
                              </td>
                              <td className="px-4 py-3 text-right text-red-400 tabular-nums">
                                {formatCurrency(yr.investment)}
                              </td>
                              <td className="px-4 py-3 text-right text-emerald-400 tabular-nums">
                                {formatCurrency(yr.savings)}
                              </td>
                              <td
                                className={`px-4 py-3 text-right font-bold tabular-nums ${yr.netBenefit >= 0 ? "text-emerald-400" : "text-red-400"}`}
                              >
                                {formatCurrency(yr.netBenefit)}
                              </td>
                              <td
                                className={`px-4 py-3 text-right font-bold tabular-nums ${yr.cumulativeROI >= 0 ? "text-accent" : "text-red-400"}`}
                              >
                                {formatPercent(yr.cumulativeROI)}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-accent/30 bg-accent/5">
                            <td className="px-4 py-3 font-bold text-accent">
                              {t.total}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-red-400 tabular-nums">
                              {formatCurrency(results.totalInvestment)}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-emerald-400 tabular-nums">
                              {formatCurrency(results.totalSavings)}
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-black tabular-nums ${results.totalSavings - results.totalInvestment >= 0 ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {formatCurrency(
                                results.totalSavings - results.totalInvestment,
                              )}
                            </td>
                            <td className="px-4 py-3 text-right font-black text-accent tabular-nums">
                              {formatPercent(results.cumulativeROI)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Methodology note */}
                    <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
                      {t.methodology}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between px-8 py-6 border-t border-neutral-800 bg-black/30">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase
                bg-neutral-900 text-neutral-400 border border-neutral-800 transition-all cursor-pointer
                hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.back}
            </button>

            {/* Live preview ticker */}
            {currentStep < 3 && (
              <div className="hidden md:flex items-center gap-3 text-sm">
                <span className="text-neutral-500">{t.estimatedLoss}</span>
                <span className="text-xl font-black text-accent">
                  {formatCurrency(results.midpoint)}
                </span>
              </div>
            )}

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase
                  bg-accent/20 text-accent border border-accent/40 shadow-[0_0_15px_rgba(0,209,255,0.2)]
                  hover:bg-accent/30 hover:shadow-[0_0_25px_rgba(0,209,255,0.3)] transition-all cursor-pointer"
              >
                {t.next}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold tracking-wider uppercase
                  bg-accent/20 text-accent border border-accent/40 shadow-[0_0_15px_rgba(0,209,255,0.2)]
                  hover:bg-accent/30 hover:shadow-[0_0_25px_rgba(0,209,255,0.3)] transition-all cursor-pointer"
              >
                {t.getDetailedAnalysis}
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
