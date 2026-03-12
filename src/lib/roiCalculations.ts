// ─────────────────────────────────────────────────────────────
// Enterprise ROI Calculation Engine
// Replicates a standard multi-category operational loss model.
//
// HOW TO CUSTOMIZE FOR YOUR INDUSTRY:
//   1. Update the category names (e.g., "Dark Data Loss" → your term)
//   2. Adjust the multiplier coefficients in each loss category block
//   3. Change defaultInputs below to match your typical client profile
//   4. If you don't need all 4 categories, remove the ones not applicable
//
// The calculation structure (4 loss categories, 3-year financials, payback)
// is industry-agnostic and reusable for any B2B ROI calculator.
// ─────────────────────────────────────────────────────────────

export interface ROIInputs {
    // Section A: Company Profile
    companyName: string;
    industrySector: string;
    annualRevenue: number;        // B7
    numFactories: number;         // B8
    numMachines: number;          // B10
    annualEnergyCosts: number;    // B11
    annualRawMaterialSpend: number; // B12

    // Section B: Performance Metrics
    averageOEE: number;           // B15 (0-1)
    unplannedDowntimeRate: number; // B16 (0-1)
    scrapDefectRate: number;      // B17 (0-1)
    customerReturnRate: number;   // B18 (0-1)
    averageInventoryValue: number; // B19
    emergencyMaintenanceCalls: number; // B20

    // Section C: Cost Parameters
    manufacturingCOGS: number;    // B23 (0-1)
    downtimeCostPerHour: number;  // B24
    emergencyRepairPremium: number; // B25
    hourlyLaborRate: number;      // B26
    qualityInspectorCount: number; // B27
    qualityInspectorAnnualSalary: number; // annual fully-loaded salary USD
    supervisorCount: number;      // B28
    supervisorAnnualSalary: number; // annual fully-loaded salary USD
    inventoryCarryingCostRate: number; // B29

    // Section D: Deployment Scope
    year1Factories: number;       // B32
    year2Factories: number;       // B33
    year3Factories: number;       // B34

    // Section E: Investment Model
    investmentModel: "Standard" | "Custom";
    customYear1: number;
    customYear2: number;
    customYear3: number;

    // Section F: Target Capture Rates
    year1CaptureRate: number;     // B43
    year2CaptureRate: number;     // B44
    year3CaptureRate: number;     // B45
}

export const defaultInputs: ROIInputs = {
    companyName: "",
    // TODO: Update this to the most common industry sector for your clients
    industrySector: "General Manufacturing",
    annualRevenue: 500_000_000,
    numFactories: 12,
    numMachines: 300,
    annualEnergyCosts: 20_000_000,
    annualRawMaterialSpend: 200_000_000,

    averageOEE: 0.65,
    unplannedDowntimeRate: 0.05,
    scrapDefectRate: 0.04,
    customerReturnRate: 0.0075,
    averageInventoryValue: 100_000_000,
    emergencyMaintenanceCalls: 200,

    manufacturingCOGS: 0.65,
    downtimeCostPerHour: 5000,
    emergencyRepairPremium: 8000,
    hourlyLaborRate: 60,
    qualityInspectorCount: 50,
    qualityInspectorAnnualSalary: 120_000,
    supervisorCount: 100,
    supervisorAnnualSalary: 80_000,
    inventoryCarryingCostRate: 0.25,

    year1Factories: 2,
    year2Factories: 12,
    year3Factories: 12,

    investmentModel: "Standard",
    customYear1: 500_000,
    customYear2: 6_000_000,
    customYear3: 700_000,

    year1CaptureRate: 0.25,
    year2CaptureRate: 0.55,
    year3CaptureRate: 0.65,
};

// ── Loss Category Results ──

export interface LossCategory {
    name: string;
    components: { name: string; low: number; high: number }[];
    subtotalLow: number;
    subtotalHigh: number;
    midpoint: number;
}

export interface ROIResults {
    // Loss breakdown
    darkData: LossCategory;
    reactiveMaintenance: LossCategory;
    qualityEscapes: LossCategory;
    decisionLatency: LossCategory;

    // Totals
    rawTotalLow: number;
    rawTotalHigh: number;
    discountRate: number;
    finalLossLow: number;
    finalLossHigh: number;
    midpoint: number;

    // 3-year financials
    years: YearResult[];
    totalInvestment: number;
    totalSavings: number;
    cumulativeROI: number;
    paybackMonths: number;
}

export interface YearResult {
    year: number;
    investment: number;
    savings: number;
    netBenefit: number;
    cumulativeInvestment: number;
    cumulativeSavings: number;
    cumulativeROI: number;
}

// ── Calculation Engine ──

export function calculateROI(inputs: ROIInputs): ROIResults {
    const i = inputs;
    const numLines = i.numFactories * 4; // auto-calculated

    // ═══════════════════════════════════════════
    // CATEGORY 1: DARK DATA LOSS
    // ═══════════════════════════════════════════
    const darkDataComponents = [
        {
            name: "Unmonitored Process Variables",
            low: i.annualRevenue * (1 - i.averageOEE) * 0.15 * 0.85,
            high: i.annualRevenue * (1 - i.averageOEE) * 0.15 * 1.15,
        },
        {
            name: "Energy Waste (Invisible Peaks)",
            low: i.annualEnergyCosts * 0.18 * 0.75,
            high: i.annualEnergyCosts * 0.18 * 1.25,
        },
        {
            name: "Yield Losses (Undetected Drift)",
            low: i.annualRevenue * i.manufacturingCOGS * 0.03 * 0.8,
            high: i.annualRevenue * i.manufacturingCOGS * 0.03 * 1.2,
        },
        {
            name: "Unreported Micro-Stoppages",
            low: numLines * 800 * i.downtimeCostPerHour * 0.05 * 0.9,
            high: numLines * 800 * i.downtimeCostPerHour * 0.05 * 1.1,
        },
    ];

    const darkData: LossCategory = {
        name: "Dark Data Loss",
        components: darkDataComponents,
        subtotalLow: darkDataComponents.reduce((s, c) => s + c.low, 0),
        subtotalHigh: darkDataComponents.reduce((s, c) => s + c.high, 0),
        midpoint: 0,
    };
    darkData.midpoint = (darkData.subtotalLow + darkData.subtotalHigh) / 2;

    // ═══════════════════════════════════════════
    // CATEGORY 2: REACTIVE MAINTENANCE
    // ═══════════════════════════════════════════
    const reactiveMaintenanceComponents = [
        {
            name: "Emergency Breakdown Costs",
            low: i.emergencyMaintenanceCalls * i.emergencyRepairPremium * 0.85,
            high: i.emergencyMaintenanceCalls * i.emergencyRepairPremium * 1.15,
        },
        {
            name: "Lost Production (Unplanned Downtime)",
            low: i.numMachines * i.unplannedDowntimeRate * 8760 * i.downtimeCostPerHour * 0.01 * 0.8,
            high: i.numMachines * i.unplannedDowntimeRate * 8760 * i.downtimeCostPerHour * 0.01 * 1.2,
        },
        {
            name: "Spare Parts Overstocking",
            low: i.numMachines * 2000 * 0.25 * 0.9,
            high: i.numMachines * 2000 * 0.25 * 1.1,
        },
        {
            name: "Overtime Labor for Catch-Up",
            low: i.emergencyMaintenanceCalls * 16 * i.hourlyLaborRate * 1.5 * 0.9,
            high: i.emergencyMaintenanceCalls * 16 * i.hourlyLaborRate * 1.5 * 1.1,
        },
    ];

    const reactiveMaintenance: LossCategory = {
        name: "Reactive Maintenance",
        components: reactiveMaintenanceComponents,
        subtotalLow: reactiveMaintenanceComponents.reduce((s, c) => s + c.low, 0),
        subtotalHigh: reactiveMaintenanceComponents.reduce((s, c) => s + c.high, 0),
        midpoint: 0,
    };
    reactiveMaintenance.midpoint = (reactiveMaintenance.subtotalLow + reactiveMaintenance.subtotalHigh) / 2;

    // ═══════════════════════════════════════════
    // CATEGORY 3: QUALITY ESCAPES
    // ═══════════════════════════════════════════
    const qualityEscapesComponents = [
        {
            name: "Internal Scrap & Waste",
            low: i.annualRevenue * i.manufacturingCOGS * i.scrapDefectRate * 0.5 * 0.85,
            high: i.annualRevenue * i.manufacturingCOGS * i.scrapDefectRate * 0.5 * 1.15,
        },
        {
            name: "Customer Returns/Warranty",
            low: i.annualRevenue * i.customerReturnRate * 0.4 * 0.6 * 0.85,
            high: i.annualRevenue * i.customerReturnRate * 0.4 * 0.6 * 1.2,
        },
        {
            name: "Rework Labor",
            low: i.annualRevenue * 0.08 * 0.2 * 0.5 * 0.9,
            high: i.annualRevenue * 0.08 * 0.2 * 0.5 * 1.1,
        },
        {
            name: "Reputation/Premium Loss",
            low: i.annualRevenue * 0.02 * 0.5 * 0.5,
            high: i.annualRevenue * 0.02 * 0.5 * 1.5,
        },
        {
            name: "Quality Inspection Labor Reduction",
            low: i.qualityInspectorCount * i.qualityInspectorAnnualSalary * 0.3,
            high: i.qualityInspectorCount * i.qualityInspectorAnnualSalary * 0.3 * 1.2,
        },
    ];

    const qualityEscapes: LossCategory = {
        name: "Quality Escapes",
        components: qualityEscapesComponents,
        subtotalLow: qualityEscapesComponents.reduce((s, c) => s + c.low, 0),
        subtotalHigh: qualityEscapesComponents.reduce((s, c) => s + c.high, 0),
        midpoint: 0,
    };
    qualityEscapes.midpoint = (qualityEscapes.subtotalLow + qualityEscapes.subtotalHigh) / 2;

    // ═══════════════════════════════════════════
    // CATEGORY 4: DECISION LATENCY
    // ═══════════════════════════════════════════
    const decisionLatencyComponents = [
        {
            name: "Inventory Carrying Costs",
            low: i.averageInventoryValue * i.inventoryCarryingCostRate * 0.125 * 0.8,
            high: i.averageInventoryValue * i.inventoryCarryingCostRate * 0.125 * 1.2,
        },
        {
            name: "Production Schedule Inefficiency",
            low: 1_800_000 * 0.9,
            high: 1_800_000 * 1.1,
        },
        {
            name: "Raw Material Waste",
            low: i.annualRawMaterialSpend * 0.06 * 0.4 * 0.85,
            high: i.annualRawMaterialSpend * 0.06 * 0.4 * 1.15,
        },
        {
            name: "Labor Productivity (Manual Reporting)",
            low: i.supervisorCount * i.supervisorAnnualSalary * 0.25 * 0.5,
            high: i.supervisorCount * i.supervisorAnnualSalary * 0.25 * 0.5 * 1.1,
        },
        {
            name: "Lost Sales from Stockouts",
            low: i.annualRevenue * 0.04 * 0.4 * 0.3 * 0.85,
            high: i.annualRevenue * 0.04 * 0.4 * 0.3 * 1.15,
        },
    ];

    const decisionLatency: LossCategory = {
        name: "Decision Latency",
        components: decisionLatencyComponents,
        subtotalLow: decisionLatencyComponents.reduce((s, c) => s + c.low, 0),
        subtotalHigh: decisionLatencyComponents.reduce((s, c) => s + c.high, 0),
        midpoint: 0,
    };
    decisionLatency.midpoint = (decisionLatency.subtotalLow + decisionLatency.subtotalHigh) / 2;

    // ═══════════════════════════════════════════
    // TOTALS
    // ═══════════════════════════════════════════
    const rawTotalLow = darkData.subtotalLow + reactiveMaintenance.subtotalLow + qualityEscapes.subtotalLow + decisionLatency.subtotalLow;
    const rawTotalHigh = darkData.subtotalHigh + reactiveMaintenance.subtotalHigh + qualityEscapes.subtotalHigh + decisionLatency.subtotalHigh;
    const discountRate = 0.3;
    const finalLossLow = rawTotalLow * (1 - discountRate);
    const finalLossHigh = rawTotalHigh * (1 - discountRate);
    const midpoint = (finalLossLow + finalLossHigh) / 2;

    // ═══════════════════════════════════════════
    // 3-YEAR FINANCIALS
    // ═══════════════════════════════════════════
    const year3Factories = i.year3Factories;

    // Investment
    const inv1 = i.investmentModel === "Standard" ? 500_000 : i.customYear1;
    const inv2 = i.investmentModel === "Standard" ? i.year2Factories * 500_000 : i.customYear2;
    const inv3 = i.investmentModel === "Standard" ? 700_000 : i.customYear3;

    // Savings (guard against division by zero)
    const factoryRatio = i.numFactories > 0 ? i.year1Factories / i.numFactories : 0;
    const sav1 = midpoint * factoryRatio * i.year1CaptureRate;
    const factoryRatio2 = i.numFactories > 0 ? i.year2Factories / i.numFactories : 0;
    const factoryRatio3 = i.numFactories > 0 ? i.year3Factories / i.numFactories : 0;
    const sav2 = midpoint * factoryRatio2 * i.year2CaptureRate;
    const sav3 = midpoint * factoryRatio3 * i.year3CaptureRate;

    const years: YearResult[] = [];
    let cumInv = 0;
    let cumSav = 0;

    [[1, inv1, sav1], [2, inv2, sav2], [3, inv3, sav3]].forEach(([yr, inv, sav]) => {
        cumInv += inv as number;
        cumSav += sav as number;
        years.push({
            year: yr as number,
            investment: inv as number,
            savings: sav as number,
            netBenefit: (sav as number) - (inv as number),
            cumulativeInvestment: cumInv,
            cumulativeSavings: cumSav,
            cumulativeROI: cumInv > 0 ? (cumSav - cumInv) / cumInv : 0,
        });
    });

    const totalInvestment = cumInv;
    const totalSavings = cumSav;
    const cumulativeROI = totalInvestment > 0 ? (totalSavings - totalInvestment) / totalInvestment : 0;

    // Payback: how many months until cumulative savings recover the TOTAL 3-year investment.
    // This is the business-meaningful question: "when do I get my full commitment back?"
    // Savings accrue linearly within each year; we scan month by month (per year tranche).
    const totalCommittedInvestment = inv1 + inv2 + inv3;
    let paybackMonths = 36; // default: not recovered within 3 years
    {
        let runningSav = 0;
        const yearlySavings = [sav1, sav2, sav3];
        let found = false;
        for (let y = 0; y < yearlySavings.length && !found; y++) {
            const ySav = yearlySavings[y];
            const stillNeeded = totalCommittedInvestment - runningSav;
            if (ySav > 0 && ySav >= stillNeeded) {
                // Recovery happens within this year
                paybackMonths = y * 12 + (stillNeeded / ySav) * 12;
                found = true;
            }
            runningSav += ySav;
        }
    }

    return {
        darkData,
        reactiveMaintenance,
        qualityEscapes,
        decisionLatency,
        rawTotalLow,
        rawTotalHigh,
        discountRate,
        finalLossLow,
        finalLossHigh,
        midpoint,
        years,
        totalInvestment,
        totalSavings,
        cumulativeROI,
        paybackMonths,
    };
}

// ── Formatting Helpers ──

export function formatCurrency(value: number): string {
    if (Math.abs(value) >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(1)}B`;
    }
    if (Math.abs(value) >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
}

export function formatCurrencyFull(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatPercent(value: number): string {
    return `${(value * 100).toFixed(0)}%`;
}
