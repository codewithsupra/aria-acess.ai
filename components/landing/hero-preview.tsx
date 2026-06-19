"use client";

import { motion, useReducedMotion } from "motion/react";

const CALLOUTS = [
  {
    id: "touch",
    label: "Touch target too small",
    severity: "critical",
    color: "bg-red-500",
    border: "border-red-500/50",
    top: "20%",
    left: "8%",
  },
  {
    id: "color",
    label: "Color-only information",
    severity: "serious",
    color: "bg-orange-500",
    border: "border-orange-500/50",
    top: "44%",
    right: "6%",
  },
  {
    id: "hierarchy",
    label: "Weak visual hierarchy",
    severity: "moderate",
    color: "bg-amber-500",
    border: "border-amber-500/50",
    top: "65%",
    left: "12%",
  },
  {
    id: "contrast",
    label: "Low contrast text",
    severity: "serious",
    color: "bg-orange-500",
    border: "border-orange-500/50",
    top: "80%",
    right: "10%",
  },
];

export function HeroPreview() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative w-full select-none" aria-hidden="true">
      {/* Browser chrome */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-green-500/70" />
          <div className="mx-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-[10px] text-white/30">
            example.com
          </div>
        </div>

        {/* Page mockup */}
        <div className="relative h-64 overflow-hidden bg-[#111827] sm:h-80">
          {/* Fake page skeleton */}
          <div className="p-6 space-y-4">
            <div className="h-4 w-2/3 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/6" />
            <div className="h-3 w-5/6 rounded bg-white/6" />
            <div className="mt-6 flex gap-3">
              <div className="h-8 w-20 rounded-md bg-indigo-500/40" />
              <div className="h-8 w-16 rounded-md bg-white/8" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-white/5" />
              ))}
            </div>
          </div>

          {/* AI overlay callouts */}
          {CALLOUTS.map((c, i) => (
            <motion.div
              key={c.id}
              className="absolute"
              style={{ top: c.top, left: c.left, right: c.right }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldReduce ? 0.1 : 0.4,
                delay: shouldReduce ? 0 : 0.6 + i * 0.25,
                ease: "easeOut",
              }}
            >
              <div
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 backdrop-blur-sm ${c.border} bg-[#0d1117]/80`}
              >
                <span className={`size-1.5 shrink-0 rounded-full ${c.color}`} />
                <span className="whitespace-nowrap text-[10px] font-medium text-white/80">
                  {c.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Scanning sweep line */}
          <motion.div
            className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-indigo-400/60 to-transparent"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{
              duration: shouldReduce ? 0 : 3.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.5,
            }}
          />
        </div>
      </div>

      {/* AI badge */}
      <motion.div
        className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d1117]/95 px-3 py-2 shadow-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduce ? 0 : 1.4, duration: 0.4 }}
      >
        <span className="size-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[11px] font-medium text-white/70">AI Vision analyzing…</span>
      </motion.div>
    </div>
  );
}
