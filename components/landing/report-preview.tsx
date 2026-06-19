import { OctagonAlert, TriangleAlert, CircleAlert, Info } from "lucide-react";
import { ScoreRing } from "@/components/score-ring";
import { Reveal } from "@/components/motion/reveal";

const SAMPLE_ISSUES = [
  { severity: "critical", label: "Critical", count: 3, icon: OctagonAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  { severity: "serious", label: "Serious", count: 7, icon: TriangleAlert, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { severity: "moderate", label: "Moderate", count: 12, icon: CircleAlert, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { severity: "minor", label: "Minor", count: 4, icon: Info, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20" },
];

const SAMPLE_FINDINGS = [
  { source: "axe", label: "Automated", badge: "bg-blue-500/20 text-blue-300", title: "Image missing alt attribute", desc: "7 <img> elements have no alt text — screen readers will skip them." },
  { source: "ai-vision", label: "AI Vision", badge: "bg-purple-500/20 text-purple-300", title: "Insufficient touch target size", desc: "Primary CTA button is 28×28 px — WCAG 2.5.5 requires 44×44 px minimum." },
  { source: "axe", label: "Automated", badge: "bg-blue-500/20 text-blue-300", title: "Heading order skips level", desc: "<h1> followed directly by <h3> — assistive tech users lose document structure." },
];

export function ReportPreview() {
  return (
    <section className="bg-[#070c1a] py-32" id="report">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            The report
          </p>
          <h2 className="font-heading text-4xl text-white sm:text-5xl">
            Every scan delivers a full picture
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/45">
            A sample of what your accessibility report looks like — score, severity breakdown, and
            per-issue fix guidance.
          </p>
        </Reveal>

        {/* Sample report frame */}
        <Reveal delay={0.1} className="mt-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d1117]">
          {/* Header bar */}
          <div className="flex flex-col items-start gap-6 border-b border-white/[0.06] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:gap-8">
            <ScoreRing score={62} size={120} />
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Sample report · example.com</p>
                <h3 className="mt-1 text-xl font-semibold text-white">Accessibility Score: 62 / 100</h3>
                <p className="mt-0.5 text-sm text-white/40">26 issues found across 2 analysis engines</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SAMPLE_ISSUES.map(({ severity, label, count, icon: Icon, color, bg, border }) => (
                  <div key={severity} className={`flex items-center gap-2 rounded-xl border ${border} ${bg} px-3 py-2`}>
                    <Icon className={`size-4 shrink-0 ${color}`} aria-hidden="true" />
                    <div>
                      <p className={`text-xs font-semibold ${color}`}>{count}</p>
                      <p className="text-[10px] text-white/40">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample findings */}
          <div className="divide-y divide-white/[0.05] p-6 space-y-0">
            {SAMPLE_FINDINGS.map((f, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${f.badge}`}>{f.label}</span>
                  <h4 className="text-sm font-medium text-white">{f.title}</h4>
                </div>
                <p className="text-xs leading-relaxed text-white/40">{f.desc}</p>
              </div>
            ))}
            <div className="pt-4 text-center">
              <p className="text-xs text-white/25">+ 23 more issues in the full report</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
