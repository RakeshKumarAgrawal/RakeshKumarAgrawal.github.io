import type { Metadata } from "next";

import FrameworkCard from "@/components/frameworks/FrameworkCard";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { frameworksLibrary, frameworksLibraryHero } from "@/data/frameworksLibrary";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Framework Library",
  description: "Library of enterprise AI and architecture frameworks with linked publications, datasets, and repositories.",
  canonical: "/frameworks",
  keywords: ["frameworks", "enterprise ai", "architecture"],
});

export default function FrameworksPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Frameworks" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={frameworksLibraryHero.eyebrow}
          title={frameworksLibraryHero.title}
          description={frameworksLibraryHero.description}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {frameworksLibrary.map((framework) => (
          <FrameworkCard key={framework.slug} framework={framework} />
        ))}
      </div>
    </SectionPageLayout>
  );
}
