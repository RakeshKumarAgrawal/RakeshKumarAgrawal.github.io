import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import ResearchHubClient from "@/components/research/ResearchHubClient";
import SectionTitle from "@/components/ui/SectionTitle";
import { researchDomains, researchHubMetadata } from "@/data/researchDomains";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research Hub",
  description:
    "Central hub for research domains with related publications, repositories, datasets, frameworks, status, and future work.",
  canonical: "/research",
  keywords: ["research", "domains", "frameworks", "datasets", "publications"],
});

export default function ResearchHubPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Research" }]}>
      <SectionTitle
        eyebrow={researchHubMetadata.eyebrow}
        title={researchHubMetadata.title}
        description={researchHubMetadata.description}
      />
      <ResearchHubClient domains={researchDomains} />
    </SectionPageLayout>
  );
}
