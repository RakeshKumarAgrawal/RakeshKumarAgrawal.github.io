import type { Metadata } from "next";

import RecognitionWorkspace from "@/components/honors-awards/RecognitionWorkspace";
import type { HonorsAwardsDataset } from "@/components/honors-awards/types";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import honorsAwardsData from "@/data/honorsAwards.json";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Honors & Awards",
  description:
    "Recognition received for professional excellence, technical leadership, enterprise innovation, research contributions, community engagement, and continuous professional development throughout my career.",
  canonical: "/honors-awards",
  keywords: [
    "honors",
    "awards",
    "recognition",
    "leadership",
    "professional fellowships",
    "industry awards",
  ],
});

export default function HonorsAwardsPage() {
  const dataset = honorsAwardsData as HonorsAwardsDataset;

  return (
    <SectionPageLayout
      breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Honors & Awards" }]}
    >
      <Card className="space-y-6 overflow-hidden p-6 sm:p-7">
        <SectionTitle
          eyebrow={dataset.page.eyebrow}
          title={dataset.page.title}
          description={dataset.page.subtitle}
        />
      </Card>

      <RecognitionWorkspace dataset={dataset} />
    </SectionPageLayout>
  );
}
