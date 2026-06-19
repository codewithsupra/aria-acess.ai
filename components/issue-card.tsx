"use client";

import { useState } from "react";
import { ChevronRight, OctagonAlert, TriangleAlert, CircleAlert, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Issue } from "@/lib/types";

interface IssueCardProps {
  issue: Issue;
}

const SEVERITY_STYLES: Record<string, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300",
  serious: "bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300",
  moderate: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
  minor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

const SEVERITY_BORDER: Record<string, string> = {
  critical: "border-l-red-500",
  serious: "border-l-orange-500",
  moderate: "border-l-amber-500",
  minor: "border-l-zinc-400",
};

const SEVERITY_ICONS: Record<string, React.ElementType> = {
  critical: OctagonAlert,
  serious: TriangleAlert,
  moderate: CircleAlert,
  minor: Info,
};

const SOURCE_STYLES: Record<string, string> = {
  axe: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
  "ai-vision": "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
};

export function IssueCard({ issue }: IssueCardProps) {
  const [fixOpen, setFixOpen] = useState(false);

  const severityStyle = SEVERITY_STYLES[issue.severity] ?? SEVERITY_STYLES.minor;
  const borderStyle = SEVERITY_BORDER[issue.severity] ?? SEVERITY_BORDER.minor;
  const sourceStyle = SOURCE_STYLES[issue.source] ?? SOURCE_STYLES.axe;
  const sourceLabel = issue.source === "ai-vision" ? "AI Vision" : "Automated";
  const SeverityIcon = SEVERITY_ICONS[issue.severity] ?? Info;

  return (
    <Card className={cn("border-l-4", borderStyle)}>
      <CardContent className="space-y-3 p-5">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
              severityStyle
            )}
          >
            <SeverityIcon className="size-3" aria-hidden="true" />
            {issue.severity}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
              sourceStyle
            )}
          >
            {sourceLabel}
          </span>
          {issue.category ? (
            <span className="text-xs text-muted-foreground">{issue.category}</span>
          ) : null}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {issue.title}
        </h3>

        {/* Description */}
        {issue.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{issue.description}</p>
        ) : null}

        {/* Element */}
        {issue.element ? (
          <div className="flex items-center gap-1.5 text-sm">
            <span className="shrink-0 font-medium text-foreground">Element:</span>
            <code className="max-w-[40ch] truncate rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              {issue.element}
            </code>
          </div>
        ) : null}

        {/* Expandable fix */}
        {issue.fix ? (
          <div>
            <button
              type="button"
              onClick={() => setFixOpen((o) => !o)}
              aria-expanded={fixOpen}
              className="flex cursor-pointer items-center gap-1 rounded text-sm font-medium text-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <ChevronRight
                className={cn(
                  "size-3.5 transition-transform duration-150",
                  fixOpen && "rotate-90"
                )}
                aria-hidden="true"
              />
              Suggested fix
            </button>
            {fixOpen ? (
              <div className="mt-2 rounded-md bg-muted/60 p-3 text-xs font-mono leading-relaxed whitespace-pre-wrap text-muted-foreground">
                {issue.fix}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* WCAG links */}
        {issue.wcagCriteria.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">WCAG:</span>
            {issue.wcagCriteria.map((criterion) => (
              <a
                key={criterion}
                href="https://www.w3.org/WAI/WCAG22/Understanding/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WCAG ${criterion} (opens in new tab)`}
                className="inline-flex items-center rounded-md border bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-medium text-secondary-foreground transition-colors hover:bg-secondary/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {criterion}
              </a>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
