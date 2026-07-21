import type { Metadata } from "next";

import KnowledgeGraphExplorer from "@/components/knowledge-graph/KnowledgeGraphExplorer";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Knowledge Graph",
  description:
    "Interactive force-directed graph visualizing the complete research ecosystem across domains, frameworks, publications, datasets, repositories, open science profiles, and professional service.",
  canonical: "/knowledge-graph",
  keywords: ["knowledge graph", "research ecosystem", "network visualization"],
});

export default function KnowledgeGraphPage() {
  return (
    <SectionPageLayout
      breadcrumbs={[
        { label: "Home", href: "/#home" },
        { label: "Research", href: "/research" },
        { label: "Knowledge Graph" },
      ]}
    >
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Knowledge Graph"
          title="Centerpiece ecosystem graph for research intelligence"
          description="Explore the complete map of research domains, frameworks, projects, publications, datasets, repositories, Enterprise Intelligence Lab, open science profiles, and professional service. Use filters, zoom/pan, and expand/collapse interactions to traverse context at every scale."
        />
      </Card>

      <KnowledgeGraphExplorer />
    </SectionPageLayout>
  );
}
