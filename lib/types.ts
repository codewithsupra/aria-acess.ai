export type Severity = "critical" | "serious" | "moderate" | "minor";

export interface Issue {
  source: "axe" | "ai-vision";
  severity: string;
  category: string;
  title: string;
  description: string;
  element: string;
  fix: string;
  wcagCriteria: string[];
}

export interface ScanResult {
  url: string;
  score: number;
  totalIssues: number;
  issuesBySeverity: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
  issues: Issue[];
  scannedAt: string;
}
