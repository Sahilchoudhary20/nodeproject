import request from "supertest";
import app from "../src/app";

describe("Health endpoint", () => {
  it("returns OK with uptime, timestamp and version", async () => {
    const res = await request(app).get("/api/v1/health").expect(200);
    expect(res.body.status).toBe("OK");
    expect(typeof res.body.uptime).toBe("number");
    expect(typeof res.body.timestamp).toBe("number");
    expect(typeof res.body.version).toBe("string");
  });
});
