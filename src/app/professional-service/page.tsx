import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import ProfessionalServiceCategoryCard from "@/components/professional-service/ProfessionalServiceCategoryCard";
import ProfessionalServiceStatCard from "@/components/professional-service/ProfessionalServiceStatCard";
import ProfessionalServiceTimelineClient from "@/components/professional-service/ProfessionalServiceTimelineClient";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  professionalServiceCategories,
  professionalServiceFilters,
  professionalServiceHero,
  professionalServiceStatistics,
  professionalServiceTimelineEntries,
} from "@/data/professionalServiceLibrary";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Service",
  description:
    "Professional service library with memberships, standards activities, review, leadership, mentoring, volunteer milestones, and timeline view.",
  canonical: "/professional-service",
  keywords: ["professional service", "ieee", "review", "leadership"],
});

export default function ProfessionalServicePage() {
  return (
    <SectionPageLayout
      breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Professional Service" }]}
    >
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={professionalServiceHero.eyebrow}
          title={professionalServiceHero.title}
          description={professionalServiceHero.description}
        />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {professionalServiceStatistics.map((stat) => (
          <ProfessionalServiceStatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {professionalServiceCategories.map((category) => (
          <ProfessionalServiceCategoryCard key={category.slug} category={category} />
        ))}
      </div>

      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Timeline"
          title="Professional Service Timeline"
          description="Expandable milestones across memberships, standards activities, peer review, leadership, mentoring, and volunteer service."
        />
        <ProfessionalServiceTimelineClient
          entries={professionalServiceTimelineEntries}
          filters={professionalServiceFilters}
        />
      </Card>
    </SectionPageLayout>
  );
}
