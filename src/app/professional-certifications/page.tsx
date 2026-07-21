import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { certifications } from "@/data/certifications";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Certifications",
  description: "Credential and certification categories with room for expansion into detailed certification records.",
  canonical: "/professional-certifications",
  keywords: ["certifications", "credentials", "professional"],
});

export default function ProfessionalCertificationsPage() {
  return (
    <SectionPageLayout
      breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Professional Certifications" }]}
    >
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={certifications.eyebrow}
          title={certifications.title}
          description={certifications.description}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {certifications.items.map((item) => (
          <Card key={item.title} className="space-y-4 p-5">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
            <p className="text-sm leading-7 text-muted">{item.description}</p>
            {item.meta?.length ? (
              <div className="flex flex-wrap gap-2">
                {item.meta.map((meta) => (
                  <Badge key={`${item.title}-${meta}`}>{meta}</Badge>
                ))}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </SectionPageLayout>
  );
}
