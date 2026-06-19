export default function ScanResultsLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="animate-pulse space-y-6">
        {/* Score header skeleton */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* Score ring placeholder */}
            <div className="size-[140px] shrink-0 rounded-full bg-muted" />

            <div className="flex-1 space-y-3 w-full">
              <div className="h-5 w-40 rounded-md bg-muted" />
              <div className="h-3 w-64 rounded-md bg-muted" />
              <div className="h-px w-full bg-border" />
              {/* Severity counts */}
              <div className="flex flex-wrap gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="size-3.5 rounded-sm bg-muted" />
                    <div className="h-3 w-16 rounded-md bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab bar skeleton */}
        <div className="flex gap-2">
          {[80, 96, 88].map((w, i) => (
            <div key={i} className="h-9 rounded-lg bg-muted" style={{ width: w }} />
          ))}
        </div>

        {/* Issue card skeletons */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border border-l-4 border-l-muted bg-card p-5 space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-md bg-muted" />
              <div className="h-5 w-20 rounded-md bg-muted" />
            </div>
            <div className="h-4 w-3/4 rounded-md bg-muted" />
            <div className="h-3 w-full rounded-md bg-muted" />
            <div className="h-3 w-5/6 rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
