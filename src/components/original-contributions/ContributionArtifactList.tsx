import Card from "@/components/ui/Card";

import type { LinkedArtifact } from "@/data/originalContributions";

type ContributionArtifactListProps = {
  title: string;
  items: readonly LinkedArtifact[];
  emptyLabel: string;
};

export default function ContributionArtifactList({ title, items, emptyLabel }: ContributionArtifactListProps) {
  return (
    <Card className="h-full space-y-4 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">{title}</h3>
      {items.length ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`${title}-${item.title}`} className="rounded-2xl border border-border/70 bg-white/5 p-3">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              {item.description ? <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p> : null}
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-2 inline-flex text-sm font-medium text-primary transition hover:text-primary/80"
                  target="_blank"
                  rel="noreferrer"
                >
                  View source
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-7 text-muted">{emptyLabel}</p>
      )}
    </Card>
  );
}
