import {
    calculateROI,
    defaultInputs,
    formatCurrency,
    formatCurrencyFull,
    formatPercent,
    type ROIInputs,
} from "@/lib/roiCalculations";

/* ── Enterprise ROI Calculator Tests ────────────────────────────────── */

describe("roiCalculations (enterprise)", () => {
    /** Default inputs should produce valid, positive results */
    it("produces valid results with default inputs", () => {
        const result = calculateROI(defaultInputs);

        /* All loss categories should have positive midpoints */
        expect(result.darkData.midpoint).toBeGreaterThan(0);
        expect(result.reactiveMaintenance.midpoint).toBeGreaterThan(0);
        expect(result.qualityEscapes.midpoint).toBeGreaterThan(0);
        expect(result.decisionLatency.midpoint).toBeGreaterThan(0);

        /* Total losses should be positive */
        expect(result.midpoint).toBeGreaterThan(0);
        expect(result.finalLossLow).toBeGreaterThan(0);
        expect(result.finalLossHigh).toBeGreaterThan(0);

        /* Low should always be <= high */
        expect(result.finalLossLow).toBeLessThanOrEqual(result.finalLossHigh);
    });

    /** 3-year financials should have 3 year entries */
    it("returns exactly 3 year results", () => {
        const result = calculateROI(defaultInputs);

        expect(result.years).toHaveLength(3);
        expect(result.years[0].year).toBe(1);
        expect(result.years[1].year).toBe(2);
        expect(result.years[2].year).toBe(3);
    });

    /** Cumulative values should increase over time */
    it("cumulative investment and savings increase year over year", () => {
        const result = calculateROI(defaultInputs);

        for (let i = 1; i < result.years.length; i++) {
            expect(result.years[i].cumulativeInvestment).toBeGreaterThanOrEqual(
                result.years[i - 1].cumulativeInvestment
            );
            expect(result.years[i].cumulativeSavings).toBeGreaterThanOrEqual(
                result.years[i - 1].cumulativeSavings
            );
        }
    });

    /** Payback months should be positive and within 36 months for defaults */
    it("payback months is within reasonable range for defaults", () => {
        const result = calculateROI(defaultInputs);

        expect(result.paybackMonths).toBeGreaterThan(0);
        expect(result.paybackMonths).toBeLessThanOrEqual(36);
    });

    /** Zero revenue should not cause division errors */
    it("handles zero revenue gracefully", () => {
        const zeroInputs: ROIInputs = {
            ...defaultInputs,
            annualRevenue: 0,
            numFactories: 0,
            numMachines: 0,
        };

        const result = calculateROI(zeroInputs);

        expect(Number.isFinite(result.midpoint)).toBe(true);
        expect(Number.isFinite(result.paybackMonths)).toBe(true);
    });

    /** Discount rate should always be applied (30%) */
    it("applies 30% discount rate correctly", () => {
        const result = calculateROI(defaultInputs);

        expect(result.discountRate).toBe(0.3);
        /* finalLoss = rawTotal * (1 - 0.3) = rawTotal * 0.7 */
        expect(result.finalLossLow).toBeCloseTo(result.rawTotalLow * 0.7, 0);
        expect(result.finalLossHigh).toBeCloseTo(result.rawTotalHigh * 0.7, 0);
    });
});

/* ── Formatting Helper Tests ────────────────────────────────────────── */

describe("formatting helpers", () => {
    /** formatCurrency should abbreviate large numbers */
    it("abbreviates billions correctly", () => {
        expect(formatCurrency(2_500_000_000)).toBe("$2.5B");
    });

    it("abbreviates millions correctly", () => {
        expect(formatCurrency(1_500_000)).toBe("$1.5M");
    });

    it("abbreviates thousands correctly", () => {
        expect(formatCurrency(5_000)).toBe("$5K");
    });

    it("formats small values without abbreviation", () => {
        expect(formatCurrency(42)).toBe("$42");
    });

    /** formatCurrencyFull should use Intl.NumberFormat */
    it("formats full currency with commas", () => {
        const formatted = formatCurrencyFull(1234567);
        expect(formatted).toContain("$");
        expect(formatted).toContain("1,234,567");
    });

    /** formatPercent should multiply by 100 */
    it("formats percentages correctly", () => {
        expect(formatPercent(0.65)).toBe("65%");
        expect(formatPercent(1.0)).toBe("100%");
        expect(formatPercent(0)).toBe("0%");
    });
});
