import { X, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const ROWS = [
  { capability: "Structural HTML/ARIA violations", traditional: true, aria: true },
  { capability: "Color contrast failures", traditional: true, aria: true },
  { capability: "Missing alt text (DOM)", traditional: true, aria: true },
  { capability: "Keyboard focus order", traditional: true, aria: true },
  { capability: "Visual touch target sizing", traditional: false, aria: true },
  { capability: "Color-only information conveyance", traditional: false, aria: true },
  { capability: "Visual hierarchy problems", traditional: false, aria: true },
  { capability: "Cognitive complexity & layout issues", traditional: false, aria: true },
  { capability: "Contrast over gradients / images", traditional: false, aria: true },
  { capability: "Inconsistent interaction patterns", traditional: false, aria: true },
];

export function Comparison() {
  return (
    <section className="bg-[#070c1a] py-32" id="comparison">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            The gap
          </p>
          <h2 className="font-heading text-4xl text-white sm:text-5xl">
            What rule-based scanners miss
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/45">
            Traditional scanners analyze the DOM. Aria analyzes the DOM <em>and</em> the visual experience.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_120px_120px] border-b border-white/[0.08] bg-white/[0.02] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              <span>Capability</span>
              <span className="text-center">Traditional</span>
              <span className="text-center text-indigo-400">Aria</span>
            </div>

            {/* Rows */}
            {ROWS.map(({ capability, traditional, aria }, i) => (
              <div
                key={capability}
                className={`grid grid-cols-[1fr_120px_120px] items-center px-6 py-4 text-sm ${
                  i % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"
                } border-b border-white/[0.04] last:border-0`}
              >
                <span className={traditional ? "text-white/60" : "font-medium text-white/80"}>
                  {capability}
                </span>
                <div className="flex justify-center">
                  {traditional ? (
                    <Check className="size-4 text-white/40" aria-label="Supported" />
                  ) : (
                    <X className="size-4 text-red-500/50" aria-label="Not supported" />
                  )}
                </div>
                <div className="flex justify-center">
                  {aria ? (
                    <Check className="size-4 text-indigo-400" aria-label="Supported" />
                  ) : (
                    <X className="size-4 text-red-500/50" aria-label="Not supported" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
