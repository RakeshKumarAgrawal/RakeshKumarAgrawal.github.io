import type { Metadata } from "next";

import CertificationWorkspace from "@/components/certifications/CertificationWorkspace";
import type { CertificationsDataset } from "@/components/certifications/types";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import certificationsData from "@/data/certifications.json";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Certifications & Digital Credentials",
  description:
    "A curated portfolio of globally recognized certifications, digital badges, and continuous learning achievements across Artificial Intelligence, Cloud Computing, Platform Engineering, DevSecOps, Site Reliability Engineering, Project Management, Enterprise Architecture, and Emerging Technologies.",
  canonical: "/professional-certifications",
  keywords: ["certifications", "credentials", "digital badges", "professional development", "continuous learning"],
});

export default function ProfessionalCertificationsPage() {
  const dataset = certificationsData as CertificationsDataset;

  return (
    <SectionPageLayout
      breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Professional Certifications" }]}
    >
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={dataset.page.eyebrow}
          title={dataset.page.title}
          description={dataset.page.subtitle}
        />
      </Card>

      <CertificationWorkspace dataset={dataset} />
    </SectionPageLayout>
  );
}
