"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  FolderGit2,
  Layers3,
  Network,
  Newspaper,
  PenSquare,
  Rocket,
  Users,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { DashboardMetric } from "@/data/dashboardMetrics";

import MiniTrendChart from "./MiniTrendChart";

type DashboardMetricCardProps = {
  metric: DashboardMetric;
  trendWindowLabel: string;
};

const iconMap = {
  book: BookOpen,
  network: Network,
  database: Database,
  rocket: Rocket,
  github: FolderGit2,
  users: Users,
  "check-circle": CheckCircle2,
  "pen-square": PenSquare,
  "file-text": FileText,
  newspaper: Newspaper,
  award: Award,
  calendar: CalendarDays,
} as const;

function CountUpValue({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{displayValue}</>;
}

export default function DashboardMetricCard({ metric, trendWindowLabel }: DashboardMetricCardProps) {
  const Icon = useMemo(() => iconMap[metric.icon as keyof typeof iconMap] ?? Layers3, [metric.icon]);

  return (
    <Card className="h-full space-y-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.title}</p>
          <p className="font-display text-3xl font-semibold tracking-tight text-foreground" aria-live="polite">
            <CountUpValue value={metric.value} />
          </p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="text-sm leading-7 text-muted">{metric.description}</p>

      <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/60 p-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">{trendWindowLabel}</p>
        <MiniTrendChart values={metric.trend} />
      </div>

      <Link
        href={metric.href}
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
        aria-label={`Open details for ${metric.title}`}
      >
        Open details
      </Link>
    </Card>
  );
}
