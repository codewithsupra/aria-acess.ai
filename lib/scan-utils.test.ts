import { describe, it, expect } from "vitest";
import {
  isPrivateUrl,
  isLoadError,
  calculateScore,
  sortBySeverity,
  countBySeverity,
} from "./scan-utils";

describe("isPrivateUrl", () => {
  it.each([
    "http://localhost:3000",
    "http://app.localhost",
    "http://127.0.0.1",
    "http://10.1.2.3",
    "http://172.16.0.1",
    "http://172.31.255.255",
    "http://192.168.1.1",
    "http://0.0.0.0",
    "http://169.254.169.254/latest/meta-data/", // cloud metadata endpoint
    "http://100.64.0.1",
    "http://[::1]",
    "http://[fd00::1]",
    "http://[fe80::1]",
    "http://[::ffff:127.0.0.1]",
    "http://[::ffff:a9fe:a9fe]", // 169.254.169.254, IPv4-mapped
  ])("blocks internal address %s", (url) => {
    expect(isPrivateUrl(url)).toBe(true);
  });

  it.each([
    "https://example.com",
    "https://github.com/codewithsupra",
    "http://172.32.0.1",
    "http://8.8.8.8",
    "http://[2606:4700::1111]",
  ])("allows public address %s", (url) => {
    expect(isPrivateUrl(url)).toBe(false);
  });

  it("treats unparseable input as unsafe", () => {
    expect(isPrivateUrl("not a url")).toBe(true);
  });
});

describe("isLoadError", () => {
  it("recognises browser navigation failures", () => {
    expect(isLoadError(new Error("net::ERR_NAME_NOT_RESOLVED at https://x.invalid"))).toBe(true);
    expect(isLoadError(new Error("Navigation timeout of 30000 ms exceeded"))).toBe(true);
  });
  it("does not treat other errors as load errors", () => {
    expect(isLoadError(new Error("OpenAI 500"))).toBe(false);
  });
});

describe("calculateScore", () => {
  it("is 100 with no issues", () => {
    expect(calculateScore([])).toBe(100);
  });
  it("deducts 15/8/3/1 by severity", () => {
    const issues = [
      { severity: "critical" },
      { severity: "serious" },
      { severity: "moderate" },
      { severity: "minor" },
    ];
    expect(calculateScore(issues)).toBe(100 - 15 - 8 - 3 - 1);
  });
  it("never goes below zero", () => {
    expect(calculateScore(Array(10).fill({ severity: "critical" }))).toBe(0);
  });
  it("ignores unknown severities", () => {
    expect(calculateScore([{ severity: "cosmetic" }])).toBe(100);
  });
});

describe("sortBySeverity", () => {
  it("orders critical first and unknown last, without mutating input", () => {
    const input = [
      { severity: "minor", id: 1 },
      { severity: "weird", id: 2 },
      { severity: "critical", id: 3 },
      { severity: "serious", id: 4 },
    ];
    const out = sortBySeverity(input);
    expect(out.map((i) => i.id)).toEqual([3, 4, 1, 2]);
    expect(input[0].id).toBe(1);
  });
});

describe("countBySeverity", () => {
  it("counts each bucket", () => {
    expect(
      countBySeverity([
        { severity: "critical" },
        { severity: "critical" },
        { severity: "minor" },
      ])
    ).toEqual({ critical: 2, serious: 0, moderate: 0, minor: 1 });
  });
});
