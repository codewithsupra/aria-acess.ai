"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const shouldReduce = useReducedMotion();

  const initial = shouldReduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
        x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
      };

  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: shouldReduce ? 0.15 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
