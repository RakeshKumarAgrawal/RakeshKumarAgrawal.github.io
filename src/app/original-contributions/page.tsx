import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import OriginalContributionCard from "@/components/original-contributions/OriginalContributionCard";
import OriginalContributionsHero from "@/components/original-contributions/OriginalContributionsHero";
import {
  originalContributions,
  originalContributionsHero,
} from "@/data/originalContributions";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Original Contributions",
  description:
    "Flagship archive of original research and engineering contributions with linked publications, datasets, and GitHub repositories.",
  canonical: "/original-contributions",
  keywords: ["original contributions", "research", "engineering"],
});

export default function OriginalContributionsPage() {
  return (
    <SectionPageLayout
      breadcrumbs={[
        { label: "Home", href: "/#home" },
        { label: "Original Contributions" },
      ]}
    >
      <OriginalContributionsHero
        eyebrow={originalContributionsHero.eyebrow}
        title={originalContributionsHero.title}
        description={originalContributionsHero.description}
        supportingText={originalContributionsHero.supportingText}
      />

      <div className="space-y-4">
        {originalContributions.map((contribution) => (
          <OriginalContributionCard key={contribution.slug} contribution={contribution} />
        ))}
      </div>
    </SectionPageLayout>
  );
}
