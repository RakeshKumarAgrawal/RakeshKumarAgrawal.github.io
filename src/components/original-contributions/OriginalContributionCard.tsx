import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

import type { OriginalContribution } from "@/data/originalContributions";

import ContributionArtifactList from "./ContributionArtifactList";
import ContributionTimeline from "./ContributionTimeline";

type OriginalContributionCardProps = {
  contribution: OriginalContribution;
};

type DetailSection = {
  label: string;
  content: string;
};

const renderDetailSections = (sections: readonly DetailSection[]) => (
  <div className="grid gap-4 lg:grid-cols-2">
    {sections.map((section) => (
      <Card key={section.label} className="space-y-3 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">{section.label}</h3>
        <p className="text-sm leading-7 text-muted">{section.content}</p>
      </Card>
    ))}
  </div>
);

export default function OriginalContributionCard({ contribution }: OriginalContributionCardProps) {
  const detailSections: DetailSection[] = [
    { label: "Overview", content: contribution.overview },
    { label: "Research Problem", content: contribution.researchProblem },
    { label: "Motivation", content: contribution.motivation },
    { label: "Architecture", content: contribution.architecture },
    { label: "Technical Innovation", content: contribution.technicalInnovation },
  ];

  return (
    <details className="group rounded-3xl border border-border/70 bg-surface/80 p-5 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl">
      <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
            {contribution.researchStatus}
          </Badge>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {contribution.title}
          </h2>
        </div>
        <span className="inline-flex rounded-full border border-border/80 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition group-open:border-primary/40 group-open:text-foreground">
          Expand
        </span>
      </summary>

      <div className="mt-6 space-y-5">
        {renderDetailSections(detailSections)}

        <Card className="space-y-4 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Research Contributions</h3>
          <ul className="space-y-2">
            {contribution.researchContributions.map((item) => (
              <li key={item} className="text-sm leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <ContributionArtifactList
            title="Publications"
            items={contribution.publications}
            emptyLabel="No linked publications available in the current verified index."
          />
          <ContributionArtifactList
            title="Datasets"
            items={contribution.datasets}
            emptyLabel="No linked datasets available in the current verified index."
          />
          <ContributionArtifactList
            title="GitHub Repositories"
            items={contribution.repositories}
            emptyLabel="No linked repositories available in the current verified index."
          />
        </div>

        <Card className="space-y-4 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Images Placeholder</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {contribution.imagePlaceholders.map((placeholder) => (
              <div
                key={placeholder}
                className="rounded-2xl border border-dashed border-border/80 bg-background/40 p-4 text-sm text-muted"
              >
                {placeholder}
              </div>
            ))}
          </div>
        </Card>

        <ContributionTimeline entries={contribution.timeline} />

        <Card className="space-y-4 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Future Research</h3>
          <ul className="space-y-2">
            {contribution.futureResearch.map((item) => (
              <li key={item} className="text-sm leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </details>
  );
}
