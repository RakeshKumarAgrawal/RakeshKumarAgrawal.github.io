"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Crown,
  GraduationCap,
  Handshake,
  Lightbulb,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { RecognitionMetric } from "@/components/honors-awards/types";

type RecognitionStatsProps = {
  metric: RecognitionMetric;
};

const iconMap = {
  award: Award,
  fellowship: Crown,
  membership: BadgeCheck,
  employer: Building2,
  industry: BriefcaseBusiness,
  community: Handshake,
  leadership: GraduationCap,
  milestone: Lightbulb,
} as const;

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

export default function RecognitionStats({ metric }: RecognitionStatsProps) {
  const Icon = useMemo(() => iconMap[metric.icon as keyof typeof iconMap] ?? Award, [metric.icon]);

  return (
    <Card className="h-full space-y-4 overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{metric.title}</p>
          <p className="font-display text-3xl font-semibold tracking-tight text-foreground" aria-live="polite">
            <AnimatedCounter value={metric.value} />
          </p>
        </div>
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="text-sm leading-7 text-muted">{metric.description}</p>

      <Link
        href={metric.href}
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
        aria-label={`View details for ${metric.title}`}
      >
        View Details
      </Link>
    </Card>
  );
}
