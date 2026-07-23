import DashboardMetric from "@/components/certifications/DashboardMetric";
import type { CertificationMetric } from "@/components/certifications/types";

type CertificationDashboardProps = {
  metrics: CertificationMetric[];
};

export default function CertificationDashboard({ metrics }: CertificationDashboardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <DashboardMetric key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
