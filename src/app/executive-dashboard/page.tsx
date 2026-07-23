import type { Metadata } from "next";
import dynamic from "next/dynamic";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { executiveHeader } from "@/data/executiveDashboard";
import { createPageMetadata } from "@/lib/seo";

const ExecutiveDashboard = dynamic(() => import("@/components/executive-dashboard/ExecutiveDashboard"));

export const metadata: Metadata = createPageMetadata({
  title: "Executive Career Dashboard",
  description:
    "A consolidated view of research, engineering leadership, professional recognition, enterprise innovation, technical expertise, and contributions to the global technology community.",
  canonical: "/executive-dashboard",
  keywords: ["executive dashboard", "career dashboard", "research impact", "professional portfolio"],
});

export default function ExecutiveDashboardPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Executive Career Dashboard" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Executive Command Center"
          title={executiveHeader.title}
          description={executiveHeader.subtitle}
        />
      </Card>

      <ExecutiveDashboard />
    </SectionPageLayout>
  );
}
