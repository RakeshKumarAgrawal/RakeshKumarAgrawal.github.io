import Link from "next/link";

import Card from "@/components/ui/Card";
import type { DashboardMetric } from "@/data/dashboardMetrics";

import MiniTrendChart from "./MiniTrendChart";

type DashboardMetricCardProps = {
  metric: DashboardMetric;
  trendWindowLabel: string;
};

export default function DashboardMetricCard({ metric, trendWindowLabel }: DashboardMetricCardProps) {
  return (
    <Card className="h-full space-y-4 p-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{metric.title}</p>
        <p className="font-display text-3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
      </div>

      <p className="text-sm leading-7 text-muted">{metric.description}</p>

      <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/60 p-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">{trendWindowLabel}</p>
        <MiniTrendChart values={metric.trend} />
      </div>

      <Link
        href={metric.href}
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
      >
        Open details
      </Link>
    </Card>
  );
}
