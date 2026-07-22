import type { DashboardMetric } from "@/data/dashboardMetrics";

import DashboardCard from "./DashboardCard";

type DashboardGridProps = {
  metrics: readonly DashboardMetric[];
  ariaLabel?: string;
};

export default function DashboardGrid({ metrics, ariaLabel = "Impact metrics" }: DashboardGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4" role="region" aria-label={ariaLabel}>
      {metrics.map((metric) => (
        <DashboardCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
