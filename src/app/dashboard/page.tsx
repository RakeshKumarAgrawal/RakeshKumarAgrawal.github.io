import type { Metadata } from "next";

import DashboardMetricCard from "@/components/dashboard/DashboardMetricCard";
import DashboardSummaryPanel from "@/components/dashboard/DashboardSummaryPanel";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { dashboardHero, dashboardMetrics, dashboardTrendWindowLabel } from "@/data/dashboardMetrics";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description:
    "Executive dashboard summarizing research domains, publications, frameworks, datasets, repositories, and professional indicators.",
  canonical: "/dashboard",
  keywords: ["dashboard", "metrics", "research"],
});

export default function DashboardPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Dashboard" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={dashboardHero.eyebrow}
          title={dashboardHero.title}
          description={dashboardHero.description}
        />
      </Card>

      <DashboardSummaryPanel metrics={dashboardMetrics} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardMetrics.map((metric) => (
          <DashboardMetricCard
            key={metric.id}
            metric={metric}
            trendWindowLabel={dashboardTrendWindowLabel}
          />
        ))}
      </div>
    </SectionPageLayout>
  );
}
