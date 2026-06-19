"use client";

import { useState } from "react";
import { OctagonAlert, TriangleAlert, CircleAlert, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScoreRing } from "@/components/score-ring";
import { IssueCard } from "@/components/issue-card";
import { cn } from "@/lib/utils";
import type { ScanResult } from "@/lib/types";

interface ScanResultsProps {
  result: ScanResult;
}

const SEVERITY_META = [
  { key: "critical" as const, label: "Critical", icon: OctagonAlert, dot: "bg-red-500" },
  { key: "serious" as const, label: "Serious", icon: TriangleAlert, dot: "bg-orange-500" },
  { key: "moderate" as const, label: "Moderate", icon: CircleAlert, dot: "bg-amber-500" },
  { key: "minor" as const, label: "Minor", icon: Info, dot: "bg-zinc-400" },
];

type TabValue = "all" | "axe" | "ai-vision";

export function ScanResults({ result }: ScanResultsProps) {
  const [tab, setTab] = useState<TabValue>("all");

  const scannedAt = new Date(result.scannedAt).toLocaleString();
  const axeCount = result.issues.filter((i) => i.source === "axe").length;
  const aiCount = result.issues.filter((i) => i.source === "ai-vision").length;

  const filtered =
    tab === "all"
      ? result.issues
      : result.issues.filter((i) => i.source === (tab === "axe" ? "axe" : "ai-vision"));

  return (
    <section aria-label="Scan results" className="w-full space-y-6">
      {/* Score header */}
      <Card>
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start sm:gap-8">
          <ScoreRing score={result.score} />
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-foreground">Accessibility Score</h2>
              <p className="mt-0.5 break-all text-sm text-muted-foreground">{result.url}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {result.totalIssues} {result.totalIssues === 1 ? "issue" : "issues"} found · scanned{" "}
              {scannedAt}
            </p>
            <Separator />
            <dl className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
              {SEVERITY_META.map(({ key, label, icon: Icon, dot }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <Icon
                    className={cn(
                      "size-3.5",
                      key === "critical" && "text-red-500",
                      key === "serious" && "text-orange-500",
                      key === "moderate" && "text-amber-500",
                      key === "minor" && "text-zinc-400"
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn("size-2 rounded-full", dot)} aria-hidden="true" />
                  <dt className="text-sm text-muted-foreground">{label}:</dt>
                  <dd className="text-sm font-semibold tabular-nums text-foreground">
                    {result.issuesBySeverity[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </CardContent>
      </Card>

      {/* Issues */}
      {result.totalIssues === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <p className="text-lg font-semibold text-foreground">No issues found 🎉</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Aria didn&apos;t detect any accessibility problems on this page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as TabValue)}
          >
            <TabsList>
              <TabsTrigger value="all">All ({result.totalIssues})</TabsTrigger>
              <TabsTrigger value="axe">Automated ({axeCount})</TabsTrigger>
              <TabsTrigger value="ai-vision">AI Vision ({aiCount})</TabsTrigger>
            </TabsList>

            {(["all", "axe", "ai-vision"] as TabValue[]).map((t) => (
              <TabsContent key={t} value={t} className="mt-4">
                {filtered.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No{" "}
                    {t === "axe"
                      ? "automated"
                      : t === "ai-vision"
                        ? "AI Vision"
                        : ""}{" "}
                    issues found.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {filtered.map((issue, i) => (
                      <li key={`${issue.source}-${issue.category}-${i}`}>
                        <IssueCard issue={issue} />
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </section>
  );
}
