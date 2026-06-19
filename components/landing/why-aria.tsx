import { LayoutPanelTop, Hand, Brain, Palette, BarChart3, Link2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const CAPABILITIES = [
  {
    icon: LayoutPanelTop,
    title: "Visual hierarchy problems",
    description:
      "Unclear reading order, buried CTAs, and structural confusion that disorients screen-magnifier and low-vision users — invisible to DOM scanners, visible in pixels.",
  },
  {
    icon: Hand,
    title: "Touch target sizing",
    description:
      "Interactive elements measured from their rendered pixel dimensions. Rules can't know if a button's padding makes it large enough; GPT-4o can.",
  },
  {
    icon: Brain,
    title: "Cognitive complexity",
    description:
      "Dense text walls, inconsistent layouts, and unpredictable patterns that raise the cognitive bar for users with ADHD, dyslexia, or processing differences.",
  },
  {
    icon: Palette,
    title: "Color as sole signal",
    description:
      "Error states, status indicators, and data encoded only in color. Caught visually — both the element and the surrounding context matter.",
  },
  {
    icon: BarChart3,
    title: "Contrast over backgrounds",
    description:
      "Text rendered over gradients, images, or layered colors where computed contrast ratios don't tell the full story. GPT-4o evaluates the actual composite.",
  },
  {
    icon: Link2,
    title: "Ambiguous interactive cues",
    description:
      "Hover-dependent affordances, non-obvious clickable areas, and missing focus indicators that a DOM walk can't surface without seeing the rendered output.",
  },
];

export function WhyAria() {
  return (
    <section className="bg-[#070c1a] py-32" id="why-aria">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center mb-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Beyond automated rules
          </p>
          <h2 className="font-heading text-4xl text-white sm:text-5xl">
            What Aria finds that others miss
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/45">
            The barriers that require visual reasoning — the kind only a human evaluator or a
            vision model can catch.
          </p>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="glass-card flex gap-5 p-7 h-full">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
