// Pure helpers used by the /api/scan route. Kept free of I/O so they can be unit-tested.

export type Severity = "critical" | "serious" | "moderate" | "minor";
export interface HasSeverity {
  severity: string;
}

export const SEVERITY_RANK: Record<string, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  minor: 3,
};

export const SEVERITY_DEDUCTIONS: Record<string, number> = {
  critical: 15,
  serious: 8,
  moderate: 3,
  minor: 1,
};

/**
 * Blocks URLs that point at the scanner's own network: loopback, RFC 1918
 * ranges, link-local (incl. the 169.254.169.254 cloud metadata endpoint),
 * and private/link-local IPv6. Unparseable URLs are treated as unsafe.
 */
export function isPrivateUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    const h = hostname.replace(/^\[|\]$/g, "").toLowerCase();
    if (h === "localhost" || h.endsWith(".localhost")) return true;
    if (h === "::1" || h === "::") return true;
    if (/^f[cd][0-9a-f]{2}:/.test(h) || /^fe[89ab][0-9a-f]:/.test(h)) return true; // fc00::/7, fe80::/10
    // IPv4-mapped IPv6: WHATWG URL normalises [::ffff:127.0.0.1] to [::ffff:7f00:1].
    let v4Text = h;
    const mappedDotted = h.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    const mappedHex = h.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
    if (mappedDotted) v4Text = mappedDotted[1];
    else if (mappedHex) {
      const hi = parseInt(mappedHex[1], 16);
      const lo = parseInt(mappedHex[2], 16);
      v4Text = `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`;
    }
    const v4 = v4Text.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if (v4) {
      const [a, b] = [Number(v4[1]), Number(v4[2])];
      if (a === 127 || a === 10 || a === 0) return true;
      if (a === 172 && b >= 16 && b <= 31) return true;
      if (a === 192 && b === 168) return true;
      if (a === 169 && b === 254) return true;
      if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
    }
    return false;
  } catch {
    return true;
  }
}

export function isLoadError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /net::|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_REFUSED|TimeoutError|Navigation timeout|ERR_ADDRESS_UNREACHABLE/i.test(
    msg
  );
}

export function calculateScore(issues: HasSeverity[]): number {
  const deduction = issues.reduce(
    (sum, issue) => sum + (SEVERITY_DEDUCTIONS[issue.severity] ?? 0),
    0
  );
  return Math.max(0, 100 - deduction);
}

export function sortBySeverity<T extends HasSeverity>(issues: T[]): T[] {
  return [...issues].sort(
    (a, b) => (SEVERITY_RANK[a.severity] ?? 4) - (SEVERITY_RANK[b.severity] ?? 4)
  );
}

export function countBySeverity(issues: HasSeverity[]): Record<Severity, number> {
  return {
    critical: issues.filter((i) => i.severity === "critical").length,
    serious: issues.filter((i) => i.severity === "serious").length,
    moderate: issues.filter((i) => i.severity === "moderate").length,
    minor: issues.filter((i) => i.severity === "minor").length,
  };
}
