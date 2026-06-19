import { Eye, AlertTriangle, Users, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const ANNOTATIONS = [
  { id: "a1", label: "Touch target", detail: "28×28px — too small", color: "border-red-500/60 text-red-400", top: "18%", left: "10%" },
  { id: "a2", label: "Color only", detail: "Red border conveys error", color: "border-orange-500/60 text-orange-400", top: "48%", right: "8%" },
  { id: "a3", label: "Hierarchy", detail: "H1 → H3 skip", color: "border-amber-500/60 text-amber-400", top: "72%", left: "15%" },
];

export function AiVision() {
  return (
    <section className="bg-[#050816] py-32" id="ai-vision">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            AI Vision layer
          </p>
          <h2 className="font-heading text-4xl text-white sm:text-5xl">
            AI sees what rules can&apos;t
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/45">
            A real screenshot is sent to GPT-4o — not a description, the actual pixels. It reasons
            about the visual experience the way a human evaluator would.
          </p>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Annotated screenshot mockup */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1117]" aria-hidden="true">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <span className="size-2 rounded-full bg-red-500/60" />
                <span className="size-2 rounded-full bg-amber-400/60" />
                <span className="size-2 rounded-full bg-green-500/60" />
                <span className="ml-3 text-[10px] text-white/25">Captured screenshot · example.com/checkout</span>
              </div>

              {/* Page mockup with annotation overlays */}
              <div className="relative h-72 bg-[#111827] p-6">
                {/* Skeleton content */}
                <div className="space-y-3">
                  <div className="h-5 w-1/2 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-white/6" />
                  <div className="h-3 w-4/5 rounded bg-white/6" />
                  <div className="mt-5 flex gap-2">
                    <div className="h-7 w-16 rounded bg-indigo-500/40" />
                    <div className="h-7 w-12 rounded bg-white/8" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-lg bg-white/5" />
                    <div className="h-20 rounded-lg bg-white/5" />
                  </div>
                </div>

                {/* Annotation pins */}
                {ANNOTATIONS.map((a) => (
                  <div
                    key={a.id}
                    className="absolute"
                    style={{ top: a.top, left: a.left, right: a.right }}
                  >
                    <div className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-medium backdrop-blur-sm bg-[#0d1117]/85 ${a.color}`}>
                      <span>{a.label}:</span>
                      <span className="opacity-70">{a.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Issue detail */}
          <Reveal direction="left" delay={0.15}>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                    <Eye className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400">AI Vision finding</p>
                    <h3 className="text-base font-semibold text-white">Touch target too small</h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white/80">Severity: Critical</p>
                      <p className="text-white/45">The primary action button is 28×28 px. WCAG 2.5.5 requires at minimum 44×44 px for interactive controls.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white/80">Who is affected</p>
                      <p className="text-white/45">Users with motor impairments, tremors, or those using touch devices with limited precision.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-green-400" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white/80">Suggested fix</p>
                      <p className="text-white/45">Increase button dimensions to at least 44×44 px, or add <code className="rounded bg-white/8 px-1 text-[10px]">min-h-[44px] min-w-[44px]</code> with appropriate padding.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/25 px-1">
                This kind of finding — measured from pixel dimensions in a real screenshot — cannot be produced by DOM-only rule-based scanners.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
