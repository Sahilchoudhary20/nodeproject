
export interface PerformanceResult {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export interface Asset {
  name: string;
  value: number;
}

export function calculatePortfolioPerformance({
  initialInvestment = 10000,
  currentValue = 12000
}: {
  initialInvestment?: number;
  currentValue?: number;
}): PerformanceResult {

  const profitOrLoss = currentValue - initialInvestment;

  // avoid divide-by-zero by using (initialInvestment || 1)
  const percentageChange = (profitOrLoss / (initialInvestment || 1)) * 100;

  // produce summary WITHOUT using if statement
  // using logical short-circuiting and fallback
  const gainMsg = `The portfolio has gained with a profit of $${profitOrLoss.toFixed(2)} (${percentageChange.toFixed(2)}%).`;
  const neutralMsg = `No change in portfolio value.`;
  const lossMsg = `The portfolio has a loss of $${Math.abs(profitOrLoss).toFixed(2)} (${percentageChange.toFixed(2)}%).`;

  // choose message using arithmetic -> index mapping
  // signIndex: -1 => loss, 0 => neutral, 1 => gain -> convert to 0..2
  const signIndex = Math.min(2, Math.max(0, Math.sign(percentageChange) + 1));
  const messages = [lossMsg, neutralMsg, gainMsg];

  const performanceSummary = messages[signIndex];

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary
  };
}

// Find the largest holding (returns Asset | null), implemented without if-statements
export function findLargestHolding(assets: Asset[]): Asset | null {
  // reduce returns null for empty list
  const largest = assets.reduce<Asset | null>((acc, asset) =>
    (acc === null ? asset : (asset.value > acc.value ? asset : acc)), null);
  return largest;
}

// Allocation percentages: returns array of { name, percentage } — no if-statements
export function allocationPercentages(assets: Asset[]): { name: string; percentage: number }[] {
  const total = assets.reduce((s, a) => s + a.value, 0) || 0;
  const result = assets.map(a => ({
    name: a.name,
    percentage: total === 0 ? 0 : (a.value / total) * 100
  }));
  return result;
}
