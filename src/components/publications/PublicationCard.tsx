import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { PublicationLibraryItem } from "@/data/publicationsLibrary";

type PublicationCardProps = {
  item: PublicationLibraryItem;
};

export default function PublicationCard({ item }: PublicationCardProps) {
  return (
    <Card className="h-full space-y-4 p-6">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
            {item.category}
          </Badge>
          <Badge>{item.status}</Badge>
        </div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{item.title}</h2>
      </div>

      <p className="text-sm leading-7 text-muted">{item.abstract}</p>

      <div className="space-y-2 text-sm text-muted">
        <p>
          <span className="font-semibold text-foreground">Publication:</span> {item.publication}
        </p>
        <p>
          <span className="font-semibold text-foreground">Authors:</span> {item.authors.join(", ")}
        </p>
        <p>
          <span className="font-semibold text-foreground">DOI:</span> {item.doi ?? "Not available"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {item.keywords.slice(0, 4).map((keyword) => (
          <Badge key={`${item.slug}-${keyword}`}>{keyword}</Badge>
        ))}
      </div>

      <Link
        href={`/publications/${item.slug}`}
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
      >
        Open publication
      </Link>
    </Card>
  );
}
