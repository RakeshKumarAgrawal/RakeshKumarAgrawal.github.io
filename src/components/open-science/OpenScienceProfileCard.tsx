import Card from "@/components/ui/Card";

import type { OpenScienceProfile } from "@/data/openScienceProfiles";

import OpenScienceArtifactList from "./OpenScienceArtifactList";

type OpenScienceProfileCardProps = {
  profile: OpenScienceProfile;
};

const logoToneClass: Record<OpenScienceProfile["logoTone"], string> = {
  scholar: "border-blue-300/40 bg-blue-500/20 text-blue-100",
  orcid: "border-emerald-300/40 bg-emerald-500/20 text-emerald-100",
  researchgate: "border-cyan-300/40 bg-cyan-500/20 text-cyan-100",
  zenodo: "border-indigo-300/40 bg-indigo-500/20 text-indigo-100",
  dataverse: "border-amber-300/40 bg-amber-500/20 text-amber-100",
  ieee: "border-sky-300/40 bg-sky-500/20 text-sky-100",
  github: "border-slate-300/40 bg-slate-500/20 text-slate-100",
  lab: "border-violet-300/40 bg-violet-500/20 text-violet-100",
};

export default function OpenScienceProfileCard({ profile }: OpenScienceProfileCardProps) {
  return (
    <Card className="space-y-5 p-6">
      <div className="flex items-start gap-4">
        <span
          className={`inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border text-xs font-semibold uppercase tracking-[0.2em] ${logoToneClass[profile.logoTone]}`}
          aria-hidden="true"
        >
          {profile.logoText}
        </span>

        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{profile.title}</h3>
          <p className="text-sm leading-7 text-muted">{profile.description}</p>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-border/70 bg-surface/60 p-4">
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Research Focus</h4>
        <p className="text-sm leading-7 text-muted">{profile.researchFocus}</p>
      </div>

      <div className="space-y-3 rounded-2xl border border-dashed border-border/80 bg-background/40 p-4">
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Latest Activity Placeholder</h4>
        <p className="text-sm leading-7 text-muted">{profile.latestActivityPlaceholder}</p>
      </div>

      <a
        href={profile.profileUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
      >
        Visit Profile
      </a>

      <div className="grid gap-3 lg:grid-cols-2">
        <OpenScienceArtifactList
          title="Cross-linked Publications"
          items={profile.relatedPublications}
          emptyLabel="No linked publications for this profile yet."
        />
        <OpenScienceArtifactList
          title="Cross-linked Datasets"
          items={profile.relatedDatasets}
          emptyLabel="No linked datasets for this profile yet."
        />
      </div>
    </Card>
  );
}
