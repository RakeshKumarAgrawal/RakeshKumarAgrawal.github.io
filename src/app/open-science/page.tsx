import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import OpenScienceProfileCard from "@/components/open-science/OpenScienceProfileCard";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import ResearchCollaborationCTA from "@/components/research/ResearchCollaborationCTA";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  openScienceCommitment,
  openScienceHero,
  openScienceProfiles,
} from "@/data/openScienceProfiles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Open Science",
  description:
    "Unified library of open research profiles with cross-linked publications and datasets.",
  canonical: "/open-science",
  keywords: ["open science", "profiles", "datasets", "publications"],
});

export default function OpenSciencePage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Open Science" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={openScienceHero.eyebrow}
          title={openScienceHero.title}
          description={openScienceHero.description}
        />
      </Card>

      <Card className="space-y-5 p-6 sm:p-7">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {openScienceCommitment.title}
        </h2>
        <p className="text-sm leading-7 text-muted sm:text-base">{openScienceCommitment.description}</p>
        <ul className="space-y-2">
          {openScienceCommitment.principles.map((principle) => (
            <li key={principle} className="text-sm leading-7 text-muted">
              {principle}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:items-center sm:justify-start sm:text-left">
        <ProfessionalPortrait
          size="compact"
          loading="lazy"
          ariaLabel="Professional profile portrait above open science external profiles"
        />
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Profile Context</p>
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">Verified Open Science Identity</p>
          <p className="text-sm leading-6 text-muted">External research profiles below are connected to the same professional identity and research portfolio.</p>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {openScienceProfiles.map((profile) => (
          <OpenScienceProfileCard key={profile.slug} profile={profile} />
        ))}
      </div>

      <ResearchCollaborationCTA />
    </SectionPageLayout>
  );
}
