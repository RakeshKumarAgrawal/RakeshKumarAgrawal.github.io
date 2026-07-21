import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

import type { ResearchDomain } from "@/data/researchDomains";

const summarizeTitles = (titles: readonly string[]) => {
  if (!titles.length) {
    return "None linked yet";
  }

  if (titles.length <= 2) {
    return titles.join("; ");
  }

  const firstTwo = titles.slice(0, 2).join("; ");
  return `${firstTwo}; +${titles.length - 2} more`;
};

type ResearchDomainCardProps = {
  domain: ResearchDomain;
};

export default function ResearchDomainCard({ domain }: ResearchDomainCardProps) {
  return (
    <Card className="h-full space-y-4 p-6">
      <div className="space-y-3">
        <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
          {domain.researchStatus}
        </Badge>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{domain.title}</h2>
      </div>

      <p className="text-sm leading-7 text-muted">{domain.summary}</p>

      <div className="space-y-2 text-sm text-muted">
        <p><span className="font-semibold text-foreground">Related publications:</span> {summarizeTitles(domain.relatedPublications.map((item) => item.title))}</p>
        <p><span className="font-semibold text-foreground">Related GitHub repositories:</span> {summarizeTitles(domain.relatedRepositories.map((item) => item.title))}</p>
        <p><span className="font-semibold text-foreground">Related datasets:</span> {summarizeTitles(domain.relatedDatasets.map((item) => item.title))}</p>
        <p><span className="font-semibold text-foreground">Related frameworks:</span> {summarizeTitles(domain.relatedFrameworks.map((item) => item.title))}</p>
      </div>

      <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/60 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Future work</h3>
        <p className="text-sm leading-6 text-muted">{domain.futureWork[0] ?? "Scope definition in progress."}</p>
      </div>

      <Link
        href={`/research/${domain.slug}`}
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
      >
        Explore domain
      </Link>
    </Card>
  );
}
