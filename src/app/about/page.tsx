import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import ExecutiveProfileCard from "@/components/profile/ExecutiveProfileCard";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { executiveProfile } from "@/data/executiveProfile";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description: "Professional profile with biography, summary, memberships, and research areas.",
  canonical: "/about",
  keywords: ["about", "biography", "research interests", "memberships"],
});

export default function AboutPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "About" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="About"
          title="Professional Profile"
          description="Executive and academic profile surface integrating biography, focus areas, and verified professional context."
        />
      </Card>

      <ExecutiveProfileCard />

      <Card className="p-6 sm:p-7">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Professional Biography</h2>
            <p className="text-sm leading-7 text-muted">{executiveProfile.professionalSummary}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Research Philosophy</h2>
            <p className="text-sm leading-7 text-muted">{executiveProfile.researchPhilosophy}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Technical Expertise</h2>
            <ul className="space-y-1.5">
              {executiveProfile.technicalExpertise.map((item) => (
                <li key={item} className="text-sm leading-7 text-muted">
                  <span className="mr-1.5 text-primary" aria-hidden="true">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Career Timeline</h2>
            <ol className="space-y-3">
              {executiveProfile.careerTimeline.map((item) => (
                <li key={`${item.organization}-${item.role}`} className="rounded-2xl border border-border/70 bg-surface/55 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{item.period}</p>
                  <p className="mt-1 font-medium text-foreground">{item.role}</p>
                  <p className="text-sm text-muted">{item.organization}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Card>
    </SectionPageLayout>
  );
}
