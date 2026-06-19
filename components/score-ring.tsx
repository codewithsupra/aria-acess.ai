import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  className?: string;
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600 dark:text-green-500";
  if (score >= 50) return "text-amber-500 dark:text-amber-400";
  return "text-red-600 dark:text-red-500";
}

function scoreStroke(score: number): string {
  if (score >= 80) return "stroke-green-500 dark:stroke-green-500";
  if (score >= 50) return "stroke-amber-500 dark:stroke-amber-400";
  return "stroke-red-600 dark:stroke-red-500";
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Good";
  if (score >= 50) return "Fair";
  return "Poor";
}

export function ScoreRing({ score, size = 140, className }: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      role="img"
      aria-label={`Accessibility score: ${clamped} out of 100. ${scoreLabel(clamped)}.`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "fill-none transition-[stroke-dashoffset] duration-700",
            scoreStroke(clamped)
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-3xl font-bold tabular-nums", scoreColor(clamped))}>
          {clamped}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {scoreLabel(clamped)}
        </span>
      </div>
    </div>
  );
}
