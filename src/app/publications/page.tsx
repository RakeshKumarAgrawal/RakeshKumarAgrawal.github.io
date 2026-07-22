import type { Metadata } from "next";

import ResearchCollaborationCTA from "@/components/research/ResearchCollaborationCTA";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import PublicationsLibraryClient from "@/components/publications/PublicationsLibraryClient";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  publicationCategories,
  publicationsLibrary,
  publicationsLibraryHero,
  publicationSortOptions,
  publicationStatusOptions,
} from "@/data/publicationsLibrary";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Publications Library",
  description:
    "Modern publications library with search, filtering, sorting, and cross-linked research artifacts.",
  canonical: "/publications",
  keywords: ["publications", "research", "doi", "library"],
});

export default function PublicationsPage() {
  return (
    <SectionPageLayout
      breadcrumbs={[
        { label: "Home", href: "/#home" },
        { label: "Publications" },
      ]}
    >
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={publicationsLibraryHero.eyebrow}
          title={publicationsLibraryHero.title}
          description={publicationsLibraryHero.description}
        />
      </Card>

      <PublicationsLibraryClient
        items={publicationsLibrary}
        categories={publicationCategories}
        statuses={publicationStatusOptions}
        sortOptions={publicationSortOptions}
      />
      <ResearchCollaborationCTA />
    </SectionPageLayout>
  );
}
