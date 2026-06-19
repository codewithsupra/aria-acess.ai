"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  { label: "Navigating to URL", duration: 800 },
  { label: "Analyzing DOM structure", duration: 900 },
  { label: "Running WCAG rule checks", duration: 1100 },
  { label: "Capturing full-page screenshot", duration: 700 },
  { label: "Sending to GPT-4o Vision", duration: 1000 },
  { label: "Generating accessibility report", duration: 600 },
];

export function ScanDemo() {
  const [activeStep, setActiveStep] = useState(-1);
  const [done, setDone] = useState<boolean[]>(new Array(STEPS.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    let stepIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const runStep = () => {
      if (stepIndex >= STEPS.length) return;
      setActiveStep(stepIndex);

      const delay = shouldReduce ? 50 : STEPS[stepIndex].duration;
      timeout = setTimeout(() => {
        setDone((prev) => {
          const next = [...prev];
          next[stepIndex] = true;
          return next;
        });
        stepIndex++;
        setTimeout(runStep, shouldReduce ? 50 : 200);
      }, delay);
    };

    const start = setTimeout(runStep, shouldReduce ? 0 : 400);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [isInView, shouldReduce]);

  return (
    <section className="bg-[#050816] py-32" id="scan-demo">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
            Under the hood
          </p>
          <h2 className="font-heading text-4xl text-white sm:text-5xl">
            What happens during a scan
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/45">
            Both engines run in parallel — results arrive in under 30 seconds.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-16 mx-auto max-w-lg">
          <div ref={containerRef} className="glass-card p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-white/60">Scan pipeline</span>
              {done.every(Boolean) && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  Complete
                </span>
              )}
            </div>

            <ol className="space-y-4">
              {STEPS.map((step, i) => {
                const isActive = activeStep === i && !done[i];
                const isDone = done[i];
                const isPending = activeStep < i;

                return (
                  <motion.li
                    key={step.label}
                    className="flex items-center gap-3"
                    animate={{ opacity: isPending ? 0.3 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative flex size-5 shrink-0 items-center justify-center">
                      {isDone ? (
                        <CheckCircle2 className="size-4 text-green-400" aria-hidden="true" />
                      ) : isActive ? (
                        <Loader2 className="size-4 animate-spin text-indigo-400" aria-hidden="true" />
                      ) : (
                        <span className="size-1.5 rounded-full bg-white/20" aria-hidden="true" />
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors duration-200 ${
                        isDone
                          ? "text-white/60 line-through"
                          : isActive
                            ? "font-medium text-white"
                            : "text-white/30"
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
