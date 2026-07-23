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
import { dataciteProfile, toDisplayMetricValue } from "@/lib/dataciteProfile";
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

      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="DataCite Commons"
          title="Research Profile"
          description={dataciteProfile.profileSummary}
        />

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Works</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">{toDisplayMetricValue(dataciteProfile.researchMetrics.works)}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Citations</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">{toDisplayMetricValue(dataciteProfile.researchMetrics.citations)}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Views</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">{toDisplayMetricValue(dataciteProfile.researchMetrics.views)}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-surface/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Downloads</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">{toDisplayMetricValue(dataciteProfile.researchMetrics.downloads)}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-border/70 bg-surface/60 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Other Identifiers</h3>
            <ul className="space-y-2 text-sm text-muted">
              {dataciteProfile.otherIdentifiers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 rounded-2xl border border-border/70 bg-surface/60 p-4 lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">External Profiles</h3>
            <div className="flex flex-wrap gap-2">
              {dataciteProfile.externalProfiles.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border/70 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted transition hover:border-primary/30 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-border/70 bg-surface/60 p-4 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Professional Links</h3>
            <div className="flex flex-wrap gap-2">
              {dataciteProfile.professionalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border/70 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted transition hover:border-primary/30 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={dataciteProfile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
              >
                DataCite Commons Profile
              </a>
            </div>
          </div>
        </div>
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
