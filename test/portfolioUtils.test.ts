import { findLargestHolding, allocationPercentages } from "../src/portfolio/portfolioPerformance";

describe("findLargestHolding", () => {
  it("returns largest asset", () => {
    const assets = [{ name: "a", value: 10 }, { name: "b", value: 30 }, { name: "c", value: 20 }];
    const largest = findLargestHolding(assets);
    expect(largest?.name).toBe("b");
  });

  it("returns null for empty array", () => {
    const largest = findLargestHolding([]);
    expect(largest).toBeNull();
  });

  it("handles ties (returns one of tied)", () => {
    const assets = [{ name: "a", value: 20 }, { name: "b", value: 20 }];
    const largest = findLargestHolding(assets);
    expect(largest?.value).toBe(20);
  });
});

describe("allocationPercentages", () => {
  it("even distribution", () => {
    const assets = [{ name: "s", value: 50 }, { name: "b", value: 50 }];
    const alloc = allocationPercentages(assets);
    expect(alloc.find(a => a.name === "s")!.percentage).toBeCloseTo(50);
    expect(alloc.find(a => a.name === "b")!.percentage).toBeCloseTo(50);
  });

  it("uneven distribution", () => {
    const assets = [{ name: "s", value: 30 }, { name: "b", value: 70 }];
    const alloc = allocationPercentages(assets);
    expect(alloc.find(a => a.name === "s")!.percentage).toBeCloseTo(30);
    expect(alloc.find(a => a.name === "b")!.percentage).toBeCloseTo(70);
  });

  it("empty array -> empty result", () => {
    const alloc = allocationPercentages([]);
    expect(alloc).toEqual([]);
  });
});
