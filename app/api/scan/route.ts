import { scanPage, type NormalizedIssue } from "@/lib/scanner/scan-page";
import { analyzeScreenshot, type AIIssue } from "@/lib/ai/analyze-screenshot";

export const maxDuration = 60;

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

type Issue = NormalizedIssue | AIIssue;

const SEVERITY_RANK: Record<string, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3,
};

const SEVERITY_DEDUCTIONS: Record<string, number> = {
  critical: 15,
  serious: 8,
  moderate: 3,
  minor: 1,
};

function isPrivateUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    const h = hostname.replace(/^\[|\]$/g, "");
    if (h === "localhost" || h === "::1") return true;
    const ipv4 = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if (ipv4) {
      const [, a, b, c] = ipv4.map(Number);
      if (a === 127 || a === 10 || a === 0) return true;
      if (a === 172 && b >= 16 && b <= 31) return true;
      if (a === 192 && b === 168) return true;
    }
    return false;
  } catch {
    return true;
  }
}

function isLoadError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /net::|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_REFUSED|TimeoutError|Navigation timeout|ERR_ADDRESS_UNREACHABLE/i.test(
    msg
  );
}

function calculateScore(issues: Issue[]): number {
  const deduction = issues.reduce(
    (sum, issue) => sum + (SEVERITY_DEDUCTIONS[issue.severity] ?? 0),
    0
  );
  return Math.max(0, 100 - deduction);
}

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

  const allIssues: Issue[] = [...axeIssues, ...aiIssues].sort(
    (a, b) =>
      (SEVERITY_RANK[a.severity] ?? 4) - (SEVERITY_RANK[b.severity] ?? 4)
  );

  const score = calculateScore(allIssues);

  const issuesBySeverity = {
    critical: allIssues.filter((i) => i.severity === "critical").length,
    serious: allIssues.filter((i) => i.severity === "serious").length,
    moderate: allIssues.filter((i) => i.severity === "moderate").length,
    minor: allIssues.filter((i) => i.severity === "minor").length,
  };

  return Response.json({
    url,
    score,
    totalIssues: allIssues.length,
    issuesBySeverity,
    issues: allIssues,
    scannedAt: new Date().toISOString(),
  });
}
