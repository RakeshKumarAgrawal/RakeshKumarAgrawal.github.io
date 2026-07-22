import Card from "@/components/ui/Card";
import type { DashboardDistributionItem } from "@/data/dashboardMetrics";

type DashboardChartsProps = {
  researchArea: readonly DashboardDistributionItem[];
  publicationCategories: readonly DashboardDistributionItem[];
  frameworkDistribution: readonly DashboardDistributionItem[];
  projectCategories: readonly DashboardDistributionItem[];
  technologyStack: readonly DashboardDistributionItem[];
};

function DistributionCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly DashboardDistributionItem[];
}) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <Card className="space-y-4 p-5 sm:p-6">
      <div className="space-y-1">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted">{description}</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={`${title}-${item.label}`} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary/80 to-accent/80"
                style={{ width: `${Math.max((item.value / max) * 100, 6)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function DashboardCharts({
  researchArea,
  publicationCategories,
  frameworkDistribution,
  projectCategories,
  technologyStack,
}: DashboardChartsProps) {
  return (
    <section className="space-y-4" aria-label="Dashboard visualizations">
      <div className="grid gap-4 lg:grid-cols-2">
        <DistributionCard
          title="Research Areas"
          description="Distribution of linked research artifacts by domain."
          items={researchArea}
        />
        <DistributionCard
          title="Publication Categories"
          description="Distribution of publication types in the library."
          items={publicationCategories}
        />
        <DistributionCard
          title="Framework Distribution"
          description="Distribution of framework maturity states."
          items={frameworkDistribution}
        />
        <DistributionCard
          title="Project Categories"
          description="Distribution of project category labels."
          items={projectCategories}
        />
        <DistributionCard
          title="Technology Stack"
          description="Most frequent framework technology labels."
          items={technologyStack}
        />
        <Card className="space-y-3 p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">Repository Languages</h3>
          <p className="text-sm leading-7 text-muted">
            Placeholder: language-level repository metadata is not yet available in the current configured data layer.
          </p>
          {/* TODO: Populate repository language distribution when repository language metadata is available. */}
        </Card>
      </div>
    </section>
  );
}
