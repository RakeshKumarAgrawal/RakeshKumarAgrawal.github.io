"use client";

import { useMemo, useState } from "react";

import DashboardMetricCard from "@/components/dashboard/DashboardMetricCard";
import Card from "@/components/ui/Card";
import type { DashboardFilterGroup, DashboardMetric } from "@/data/dashboardMetrics";

type DashboardMetricGridClientProps = {
  metrics: readonly DashboardMetric[];
  trendWindowLabel: string;
  enableFilters?: boolean;
};

const allFilter = "All" as const;

export default function DashboardMetricGridClient({
  metrics,
  trendWindowLabel,
  enableFilters = true,
}: DashboardMetricGridClientProps) {
  const [activeFilter, setActiveFilter] = useState<DashboardFilterGroup | typeof allFilter>(allFilter);

  const filters = useMemo(() => {
    const values = [...new Set(metrics.map((metric) => metric.filterGroup))];
    return [allFilter, ...values];
  }, [metrics]);

  const filteredMetrics = useMemo(() => {
    if (activeFilter === allFilter) {
      return metrics;
    }

    return metrics.filter((metric) => metric.filterGroup === activeFilter);
  }, [activeFilter, metrics]);

  return (
    <div className="space-y-5">
      {enableFilters ? (
        <Card className="space-y-4 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Filter Metrics</p>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Dashboard metric filters">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  role="tab"
                  aria-selected={isActive}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" role="region" aria-label="Dashboard metrics">
        {filteredMetrics.map((metric) => (
          <DashboardMetricCard key={metric.id} metric={metric} trendWindowLabel={trendWindowLabel} />
        ))}
      </div>
    </div>
  );
}
