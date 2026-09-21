import { scanPage, type NormalizedIssue } from "@/lib/scanner/scan-page";
import { analyzeScreenshot, type AIIssue } from "@/lib/ai/analyze-screenshot";
import {
  isPrivateUrl,
  isLoadError,
  calculateScore,
  sortBySeverity,
  countBySeverity,
} from "@/lib/scan-utils";

export const maxDuration = 60;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

type Issue = NormalizedIssue | AIIssue;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT_MAX) {
      return Response.json(
        { error: "Rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }
    entry.count++;
  } else {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  let url: string;

  try {
    const body = await request.json();
    url = body?.url;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!url || typeof url !== "string") {
    return Response.json({ error: "url is required." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL." }, { status: 400 });
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return Response.json(
      { error: "URL must start with http:// or https://." },
      { status: 400 }
    );
  }

  if (isPrivateUrl(url)) {
    return Response.json(
      { error: "Scanning private or local addresses is not allowed." },
      { status: 400 }
    );
  }

  let axeIssues: NormalizedIssue[];
  let screenshot: Buffer;

  try {
    ({ axeIssues, screenshot } = await scanPage(url));
  } catch (err) {
    console.error("Scan error:", err);
    if (isLoadError(err)) {
      return Response.json(
        { error: "Could not load this URL. Please check it's accessible." },
        { status: 422 }
      );
    }
    return Response.json(
      { error: "Scan failed. Please try again." },
      { status: 500 }
    );
  }

  let aiIssues: AIIssue[];
  try {
    aiIssues = await analyzeScreenshot(screenshot);
  } catch (err) {
    console.error("AI analysis error:", err);
    aiIssues = [];
  }

  const allIssues: Issue[] = sortBySeverity<Issue>([...axeIssues, ...aiIssues]);
  const score = calculateScore(allIssues);
  const issuesBySeverity = countBySeverity(allIssues);

  return Response.json({
    url,
    score,
    totalIssues: allIssues.length,
    issuesBySeverity,
    issues: allIssues,
    scannedAt: new Date().toISOString(),
  });
}
