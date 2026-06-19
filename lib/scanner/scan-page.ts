import fs from "fs";
import path from "path";
import type { Result } from "axe-core";
import { getBrowser } from "./browser";

export interface NormalizedIssue {
  source: "axe";
  severity: string;
  category: string;
  title: string;
  description: string;
  element: string;
  fix: string;
  wcagCriteria: string[];
}

function serializeTarget(target: (string | string[])[]): string {
  return target
    .map((t) => (Array.isArray(t) ? t.join(" >>> ") : t))
    .join(", ");
}

function extractFix(failureSummary: string | undefined): string {
  if (!failureSummary) return "";
  const match = failureSummary.match(
    /Fix (?:any|all) of the following:\s*([\s\S]*)/
  );
  return match ? match[1].trim() : failureSummary.trim();
}

export async function scanPage(
  url: string
): Promise<{ axeIssues: NormalizedIssue[]; screenshot: Buffer }> {
  const axeSource = fs.readFileSync(
    path.join(process.cwd(), "node_modules/axe-core/axe.min.js"),
    "utf-8"
  );

  const browser = await getBrowser();
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

    const violations: Result[] = await page.evaluate((src: string) => {
      // eslint-disable-next-line no-new-func
      new Function(src)();
      // @ts-expect-error — axe is injected into page context at runtime
      return axe.run().then((results) => results.violations);
    }, axeSource);

    const axeIssues: NormalizedIssue[] = violations.map((v) => {
      const firstNode = v.nodes[0];
      return {
        source: "axe" as const,
        severity: v.impact ?? "minor",
        category: v.id,
        title: v.help,
        description: firstNode?.failureSummary
          ? `${v.description}. ${firstNode.failureSummary}`
          : v.description,
        element: firstNode
          ? serializeTarget(firstNode.target as (string | string[])[])
          : "",
        fix: extractFix(firstNode?.failureSummary),
        wcagCriteria: v.tags.filter((t) => t.startsWith("wcag")),
      };
    });

    const screenshotData = await page.screenshot({
      type: "png",
      fullPage: true,
    });
    const screenshot = Buffer.from(screenshotData);

    return { axeIssues, screenshot };
  } catch (err) {
    throw new Error(
      `Page scan failed for ${url}: ${err instanceof Error ? err.message : String(err)}`
    );
  } finally {
    await browser.close();
  }
}
