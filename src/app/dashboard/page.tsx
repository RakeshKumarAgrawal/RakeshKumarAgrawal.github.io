import type { Metadata } from "next";
import dynamic from "next/dynamic";

import DashboardMetricGridClient from "@/components/dashboard/DashboardMetricGridClient";
import DashboardSummaryPanel from "@/components/dashboard/DashboardSummaryPanel";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { executiveProfile } from "@/data/executiveProfile";
import { openScienceProfiles } from "@/data/openScienceProfiles";
import { professionalServiceTimelineEntries } from "@/data/professionalServiceLibrary";
import {
  dashboardHero,
  dashboardMetrics,
  dashboardTrendWindowLabel,
  frameworkDistribution,
  projectCategoryDistribution,
  publicationCategoryDistribution,
  researchAreaDistribution,
  technologyStackDistribution,
} from "@/data/dashboardMetrics";
import { createPageMetadata } from "@/lib/seo";

const DashboardCharts = dynamic(() => import("@/components/dashboard/DashboardCharts"), {
  loading: () => (
    <Card className="p-6 sm:p-7">
      <p className="text-sm leading-7 text-muted">Loading dashboard visualizations...</p>
    </Card>
  ),
});

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description:
    "Executive dashboard summarizing research domains, publications, frameworks, datasets, repositories, and professional indicators.",
  canonical: "/dashboard",
  keywords: ["dashboard", "metrics", "research"],
});

export default function DashboardPage() {
  const researchMetrics = dashboardMetrics.filter((metric) => metric.filterGroup === "Research");
  const frameworkMetrics = dashboardMetrics.filter((metric) => metric.filterGroup === "Frameworks");
  const datasetMetrics = dashboardMetrics.filter((metric) => metric.filterGroup === "Datasets");
  const projectMetrics = dashboardMetrics.filter((metric) => metric.filterGroup === "Projects");
  const professionalServiceMetrics = dashboardMetrics.filter((metric) => metric.filterGroup === "Professional Service");

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

      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Professional Overview"
          title="Executive profile context"
          description={executiveProfile.professionalSummary}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 text-sm text-muted">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Title</p>
            <p className="mt-2 font-medium text-foreground">{executiveProfile.title}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 text-sm text-muted">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Experience</p>
            <p className="mt-2 font-medium text-foreground">{executiveProfile.experienceLabel}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 text-sm text-muted">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Open Science Profiles</p>
            <p className="mt-2 font-medium text-foreground">{openScienceProfiles.length}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Research Metrics"
          title="Cross-portfolio KPI snapshot"
          description="Filter by research, frameworks, datasets, projects, and professional service to review impact dimensions."
        />
        <DashboardMetricGridClient metrics={dashboardMetrics} trendWindowLabel={dashboardTrendWindowLabel} enableFilters />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-4 p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Publication Metrics</h2>
          <p className="text-sm text-muted">Focused indicators for research publication outputs.</p>
          <DashboardMetricGridClient metrics={researchMetrics} trendWindowLabel={dashboardTrendWindowLabel} enableFilters={false} />
        </Card>

        <Card className="space-y-4 p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Framework Metrics</h2>
          <p className="text-sm text-muted">Framework and architecture library footprint.</p>
          <DashboardMetricGridClient metrics={frameworkMetrics} trendWindowLabel={dashboardTrendWindowLabel} enableFilters={false} />
        </Card>

        <Card className="space-y-4 p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Dataset Metrics</h2>
          <p className="text-sm text-muted">Open science and dataset indicators.</p>
          <DashboardMetricGridClient metrics={datasetMetrics} trendWindowLabel={dashboardTrendWindowLabel} enableFilters={false} />
        </Card>

        <Card className="space-y-4 p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Project & GitHub Metrics</h2>
          <p className="text-sm text-muted">Open-source and implementation pathways.</p>
          <DashboardMetricGridClient metrics={projectMetrics} trendWindowLabel={dashboardTrendWindowLabel} enableFilters={false} />
        </Card>

        <Card className="space-y-4 p-5 sm:p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Professional Service</h2>
          <p className="text-sm text-muted">Membership, review, editorial, certification, and experience indicators.</p>
          <DashboardMetricGridClient metrics={professionalServiceMetrics} trendWindowLabel={dashboardTrendWindowLabel} enableFilters={false} />
        </Card>
      </div>

      <DashboardCharts
        researchArea={researchAreaDistribution}
        publicationCategories={publicationCategoryDistribution}
        frameworkDistribution={frameworkDistribution}
        projectCategories={projectCategoryDistribution}
        technologyStack={technologyStackDistribution}
      />

      <Card className="space-y-5 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Technical Leadership"
          title="Leadership trajectory"
          description="Technical leadership, governance stewardship, and mentoring lanes from the configured executive profile."
        />
        <ul className="space-y-2">
          {executiveProfile.leadership.map((item) => (
            <li key={item} className="text-sm leading-7 text-muted">
              <span className="mr-1.5 text-primary" aria-hidden="true">•</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-5 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Research Timeline"
          title="Professional and service milestones"
          description="Latest timeline entries from professional service records."
        />
        <ol className="space-y-3">
          {professionalServiceTimelineEntries.slice(0, 8).map((entry) => (
            <li key={entry.id} className="rounded-2xl border border-border/70 bg-surface/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{entry.date} · {entry.category}</p>
              <p className="mt-1 font-medium text-foreground">{entry.title}</p>
              <p className="mt-1 text-sm text-muted">{entry.summary}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="space-y-5 p-6 sm:p-7">
        <SectionTitle
          eyebrow="GitHub Activity"
          title="Open engineering footprint"
          description="GitHub-related metrics are tracked above; use project and repository cards for direct code artifact navigation."
        />
      </Card>
    </SectionPageLayout>
  );
}
