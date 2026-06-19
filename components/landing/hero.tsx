import { ArrowDown } from "lucide-react";
import { ScanForm } from "@/components/scan-form";
import { HeroPreview } from "@/components/landing/hero-preview";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#050816]"
      aria-label="Hero — scan any website for accessibility issues"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow — top center */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[900px] rounded-full opacity-25 blur-[140px]"
        style={{ background: "oklch(0.511 0.232 276.97)" }}
        aria-hidden="true"
      />

      {/* Radial glow — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "oklch(0.45 0.22 300)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — headline + form */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full bg-[oklch(0.511_0.232_276.97)]"
                aria-hidden="true"
              />
              axe-core · GPT-4o Vision · WCAG 2.2
            </div>

            <h1 className="font-heading text-5xl leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl">
              Accessibility testing{" "}
              <em className="not-italic" style={{ fontStyle: "italic" }}>
                that sees
              </em>{" "}
              <span
                className="bg-linear-to-r from-[oklch(0.72_0.14_277)] to-[oklch(0.62_0.20_295)] bg-clip-text text-transparent"
              >
                like a human.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-white/45">
              Two analysis engines run on every scan — automated WCAG rule checks plus GPT-4o
              visual reasoning over a real screenshot. Catch what scanners alone can&apos;t see.
            </p>

            {/* Real scan form — logic untouched */}
            <div className="mt-10 w-full">
              <ScanForm />
            </div>

            {/* Secondary CTA */}
            <a
              href="#how-it-works"
              className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm text-white/35 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <ArrowDown className="size-3.5" aria-hidden="true" />
              See how it works
            </a>
          </div>

          {/* RIGHT — animated preview */}
          <div className="hidden lg:block">
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
