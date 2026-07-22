import Card from "@/components/ui/Card";
import type { DashboardMetric } from "@/data/dashboardMetrics";

type ImpactSummaryProps = {
  metrics: readonly DashboardMetric[];
};

export default function ImpactSummary({ metrics }: ImpactSummaryProps) {
  const totalIndicators = metrics.length;
  const aggregateValue = metrics.reduce((accumulator, metric) => accumulator + metric.value, 0);
  const topCategory = metrics.reduce(
    (accumulator, metric) => {
      const current = accumulator.get(metric.category) ?? 0;
      accumulator.set(metric.category, current + metric.value);
      return accumulator;
    },
    new Map<string, number>(),
  );

  const leadingCategory = [...topCategory.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Research Output";

  return (
    <Card className="space-y-5 rounded-3xl border-border/70 bg-gradient-to-b from-surface/80 to-surface/50 p-6 sm:p-7">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Executive Impact Summary</h2>
      <p className="text-sm leading-7 text-muted sm:text-base">
        This dashboard consolidates {totalIndicators} strategic KPIs with an aggregate tracked contribution value of {aggregateValue} across research, engineering, leadership, and open science workstreams.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Tracked KPIs</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{totalIndicators}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Aggregate Value</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{aggregateValue}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Leading Category</p>
          <p className="mt-2 text-sm font-semibold text-foreground">{leadingCategory}</p>
        </div>
      </div>
    </Card>
  );
}
