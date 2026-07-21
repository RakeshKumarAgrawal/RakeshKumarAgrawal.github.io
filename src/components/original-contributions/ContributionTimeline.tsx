import Card from "@/components/ui/Card";

import type { ContributionTimelineEntry } from "@/data/originalContributions";

type ContributionTimelineProps = {
  entries: readonly ContributionTimelineEntry[];
};

export default function ContributionTimeline({ entries }: ContributionTimelineProps) {
  return (
    <Card className="space-y-4 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Timeline</h3>
      <ol className="space-y-3">
        {entries.map((entry) => (
          <li key={`${entry.phase}-${entry.period}`} className="rounded-2xl border border-border/70 bg-white/5 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{entry.period}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{entry.phase}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{entry.milestone}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
