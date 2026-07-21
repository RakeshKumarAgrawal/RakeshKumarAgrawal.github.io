import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import TimelineLibraryClient from "@/components/timeline/TimelineLibraryClient";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { timelineEntries, timelineFilters, timelineHero } from "@/data/timelineLibrary";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Timeline",
  description:
    "Interactive timeline for research, frameworks, datasets, publications, and professional service milestones.",
  canonical: "/timeline",
  keywords: ["timeline", "milestones", "research", "service"],
});

export default function TimelinePage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Timeline" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={timelineHero.eyebrow}
          title={timelineHero.title}
          description={timelineHero.description}
        />
      </Card>

      <TimelineLibraryClient entries={timelineEntries} filters={timelineFilters} />
    </SectionPageLayout>
  );
}
