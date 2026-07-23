import MetricCard from "@/components/executive-dashboard/MetricCard";
import type { ExecutiveMetric } from "@/data/executiveDashboard";

type ExecutiveKPIsProps = {
  metrics: ExecutiveMetric[];
};

export default function ExecutiveKPIs({ metrics }: ExecutiveKPIsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
