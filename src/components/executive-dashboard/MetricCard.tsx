"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  FolderGit2,
  Globe,
  Handshake,
  Layers3,
  Mic,
  Network,
  Newspaper,
  PenSquare,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { ExecutiveMetric } from "@/data/executiveDashboard";

type MetricCardProps = {
  metric: ExecutiveMetric;
};

const iconMap = {
  activity: Activity,
  award: Award,
  badge: BadgeCheck,
  book: BookOpen,
  calendar: CalendarDays,
  "check-circle": CheckCircle2,
  database: Database,
  "file-text": FileText,
  github: FolderGit2,
  globe: Globe,
  handshake: Handshake,
  layers: Layers3,
  mic: Mic,
  network: Network,
  newspaper: Newspaper,
  "pen-square": PenSquare,
  rocket: Rocket,
  sparkles: Sparkles,
  "trending-up": TrendingUp,
  users: Users,
} as const;

function AnimatedValue({ value }: { value: number }) {
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

export default function MetricCard({ metric }: MetricCardProps) {
  const Icon = useMemo(() => iconMap[metric.icon as keyof typeof iconMap] ?? Award, [metric.icon]);

  return (
    <Card className="h-full space-y-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{metric.title}</p>
          <p className="font-display text-3xl font-semibold tracking-tight text-foreground" aria-live="polite">
            <AnimatedValue value={metric.value} />
          </p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="text-sm leading-7 text-muted">{metric.description}</p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
          <span>Progress Indicator</span>
          <span>{metric.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.max(metric.progress, 6)}%` }} />
        </div>
      </div>

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
