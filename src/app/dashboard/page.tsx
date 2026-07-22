import type { Metadata } from "next";

import CategorySection from "@/components/dashboard/CategorySection";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import ImpactSummary from "@/components/dashboard/ImpactSummary";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  dashboardHero,
  dashboardMetrics,
  dashboardMetricsByCategory,
  type DashboardMetricCategory,
} from "@/data/dashboardMetrics";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description:
    "Executive KPI dashboard summarizing research outputs, engineering initiatives, professional leadership, and open science contributions.",
  canonical: "/dashboard",
  keywords: ["dashboard", "kpi", "research impact", "professional impact"],
});

const categoryDescriptions: Record<DashboardMetricCategory, string> = {
  "Research Output": "Publication, article, and newsletter indicators reflecting research communication and scholarly output.",
  "Engineering Execution": "Project, original contribution, and repository indicators reflecting implementation scale and technical execution.",
  "Research Architecture": "Framework-level indicators that track enterprise architecture and reusable model design pathways.",
  "Professional Leadership": "Memberships, peer review, and certifications reflecting professional standing and leadership footprint.",
  "Open Science": "Dataset and profile connectivity indicators that strengthen reproducibility and open collaboration.",
};

const categoryOrder: DashboardMetricCategory[] = [
  "Research Output",
  "Engineering Execution",
  "Research Architecture",
  "Professional Leadership",
  "Open Science",
];

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

      <ImpactSummary metrics={dashboardMetrics} />

      <CategorySection
        title="All Impact Metrics"
        description="Executive overview of all tracked impact indicators with direct navigation to detailed sources."
        metrics={dashboardMetrics}
      />

      {categoryOrder.map((category) => {
        const metrics = dashboardMetricsByCategory.get(category) ?? [];
        if (!metrics.length) {
          return null;
        }

        return (
          <CategorySection
            key={category}
            title={category}
            description={categoryDescriptions[category]}
            metrics={metrics}
          />
        );
      })}

      <Card className="space-y-4 p-6 sm:p-7">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Portfolio KPI Matrix</h2>
        <p className="text-sm leading-7 text-muted sm:text-base">
          KPI cards are dynamically rendered from centralized metric configuration and linked data sources for maintainable updates.
        </p>
        <DashboardGrid metrics={dashboardMetrics} ariaLabel="Portfolio KPI matrix" />
      </Card>
    </SectionPageLayout>
  );
}
