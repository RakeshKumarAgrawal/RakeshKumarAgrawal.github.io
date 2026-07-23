import Card from "@/components/ui/Card";
import type { DashboardMetric } from "@/data/dashboardMetrics";

type DashboardSummaryPanelProps = {
  metrics: readonly DashboardMetric[];
};

export default function DashboardSummaryPanel({ metrics }: DashboardSummaryPanelProps) {
  const total = metrics.reduce((accumulator, metric) => accumulator + (metric.value ?? 0), 0);
  const highVelocity = metrics.filter((metric) => {
    if (metric.trend.length < 2) {
      return false;
    }

    return metric.trend[metric.trend.length - 1] > metric.trend[metric.trend.length - 2];
  }).length;

  return (
    <Card className="space-y-4 p-6 sm:p-7">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Executive Snapshot
      </h2>
      <p className="text-sm leading-7 text-muted sm:text-base">
        Aggregate tracked indicators: {total}. Growth observed in {highVelocity} of {metrics.length} monitored dimensions.
      </p>
      <p className="text-sm leading-7 text-muted sm:text-base">
        This dashboard is optimized for quick portfolio health reviews and directional trend monitoring across research, frameworks, and professional service.
      </p>
    </Card>
  );
}
