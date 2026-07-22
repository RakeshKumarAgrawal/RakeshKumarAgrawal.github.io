import type { DashboardMetric } from "@/data/dashboardMetrics";

import Card from "@/components/ui/Card";

import DashboardGrid from "./DashboardGrid";

type CategorySectionProps = {
  title: string;
  description: string;
  metrics: readonly DashboardMetric[];
};

export default function CategorySection({ title, description, metrics }: CategorySectionProps) {
  return (
    <section className="space-y-4" aria-label={title}>
      <Card className="space-y-2 p-5 sm:p-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm leading-7 text-muted">{description}</p>
      </Card>
      <DashboardGrid metrics={metrics} ariaLabel={`${title} metrics`} />
    </section>
  );
}
