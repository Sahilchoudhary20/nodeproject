import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
  it("should report profit when currentValue > initialInvestment", () => {
    const r = calculatePortfolioPerformance({ initialInvestment: 1000, currentValue: 1500 });
    expect(r.profitOrLoss).toBe(500);
    expect(r.percentageChange).toBeCloseTo(50);
    expect(r.performanceSummary).toMatch(/gained|profit/i);
  });

  it("should report loss when currentValue < initialInvestment", () => {
    const r = calculatePortfolioPerformance({ initialInvestment: 2000, currentValue: 1500 });
    expect(r.profitOrLoss).toBe(-500);
    expect(r.percentageChange).toBeCloseTo(-25);
    expect(r.performanceSummary).toMatch(/loss/i);
  });

  it("should report neutral when equal", () => {
    const r = calculatePortfolioPerformance({ initialInvestment: 1000, currentValue: 1000 });
    expect(r.profitOrLoss).toBe(0);
    expect(r.percentageChange).toBeCloseTo(0);
    expect(r.performanceSummary).toMatch(/No change/i);
  });
});
