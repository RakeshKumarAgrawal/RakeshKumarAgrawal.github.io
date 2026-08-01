"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import Card from "@/components/ui/Card";

type NewsletterMetricCardProps = {
  label: string;
  value: number | string;
  suffix?: string;
};

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 700;
    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplayValue(Math.round(value * (1 - Math.pow(1 - progress, 3))));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{displayValue}</>;
}

export default function NewsletterMetricCard({ label, value, suffix = "" }: NewsletterMetricCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card className="h-full space-y-3 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
      <p className="font-display text-3xl font-semibold tracking-tight text-foreground" aria-live="polite">
        {typeof value === "number" && !shouldReduceMotion ? <AnimatedNumber value={value} /> : value}{suffix}
      </p>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
    </Card>
  );
}
