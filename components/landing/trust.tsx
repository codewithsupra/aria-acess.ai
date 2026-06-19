import { Reveal } from "@/components/motion/reveal";

const TRUST_ITEMS = [
  { label: "Powered by GPT-4o Vision", sub: "OpenAI" },
  { label: "axe-core engine", sub: "Industry standard" },
  { label: "WCAG 2.2 criteria", sub: "Full coverage" },
  { label: "Real screenshot", sub: "Not a simulation" },
  { label: "Two analysis layers", sub: "Rules + AI vision" },
  { label: "Zero data stored", sub: "Scan, read, done" },
];

export function Trust() {
  return (
    <div className="border-y border-white/[0.06] bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {TRUST_ITEMS.map(({ label, sub }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-indigo-500/70" aria-hidden="true" />
                <span className="text-sm text-white/50">
                  <span className="font-medium text-white/75">{label}</span>
                  {" · "}
                  <span className="text-white/35">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
