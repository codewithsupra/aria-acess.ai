import { ScanLine, Eye, LayoutDashboard } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    icon: ScanLine,
    number: "01",
    title: "Automated WCAG Analysis",
    description:
      "axe-core runs against the live DOM and flags structural violations — missing alt text, ARIA misuse, landmark issues, invalid semantics — mapped to exact WCAG 2.2 success criteria.",
  },
  {
    icon: Eye,
    number: "02",
    title: "Visual AI Review",
    description:
      "GPT-4o receives a full-page screenshot and reasons about what a human evaluator would notice: touch target sizing, visual hierarchy, color-only cues, and contrast over complex backgrounds.",
  },
  {
    icon: LayoutDashboard,
    number: "03",
    title: "Unified Intelligence",
    description:
      "Both engines report to a single accessibility score with issues grouped by severity. Every finding includes a description, affected element, and a suggested fix.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#050816] py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            How it works
          </p>
          <h2 className="font-heading text-4xl text-white sm:text-5xl">
            Two engines, one report
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/45">
            Paste a URL. Both engines run automatically and the results arrive together.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, number, title, description }, i) => (
            <Reveal key={title} delay={i * 0.12}>
              <div className="glass-card group relative overflow-hidden p-8 h-full">
                {/* Watermark */}
                <span
                  className="pointer-events-none absolute right-5 top-3 select-none text-7xl font-black tabular-nums text-white/[0.04]"
                  aria-hidden="true"
                >
                  {number}
                </span>

                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/15">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
