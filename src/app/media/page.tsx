import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { media } from "@/data/media";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Media",
  description: "Professional media and biography context for public communication and interviews.",
  canonical: "/media",
  keywords: ["media", "biography", "public profile"],
});

export default function MediaPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Media" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={media.eyebrow}
          title={media.title}
          description={media.description}
        />
      </Card>

      <Card className="p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <ProfessionalPortrait size="section" loading="lazy" ariaLabel="Professional portrait on Media page" />
          </div>
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Biography</h2>
            <p className="text-sm leading-7 text-muted">{profile.biography}</p>
          </div>
        </div>
      </Card>
    </SectionPageLayout>
  );
}
