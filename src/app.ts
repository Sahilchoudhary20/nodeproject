// Imports
import express from "express";
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";
import { findLargestHolding, allocationPercentages } from "./portfolio/portfolioPerformance";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: Date.now(),
        version: "1.0.0"
    });
});

app.get("/api/v1/portfolio/performance", (req, res) => {
 
    const initialInvestment = Number(req.query.initial ?? 10000);
    const currentValue = Number(req.query.current ?? 12000);
    const result = calculatePortfolioPerformance({ initialInvestment, currentValue });
    res.json(result);
});

app.get("/api/v1/portfolio/largest-holding", (_req, res) => {
  
    const sample = [
        { name: "house", value: 150000 },
        { name: "stocks", value: 25000 },
        { name: "bonds", value: 5000 }
    ];
    const largest = findLargestHolding(sample);
    res.json({ largest });
});

app.get("/api/v1/portfolio/allocation", (_req, res) => {
    const sample = [
        { name: "stocks", value: 5000 },
        { name: "bonds", value: 5000 }
    ];
    const allocation = allocationPercentages(sample);
    res.json({ allocation });
});

export default app;
