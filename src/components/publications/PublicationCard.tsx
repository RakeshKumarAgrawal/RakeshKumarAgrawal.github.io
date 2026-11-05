import { ExternalLink } from "lucide-react";
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
          {item.featured ? (
            <Badge className="border-accent/30 bg-accent/10 text-[0.65rem] tracking-[0.18em] text-accent">
              Featured Journal Article
            </Badge>
          ) : null}
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
          <span className="font-semibold text-foreground">
            {item.category === "Professional Articles" ? "Publisher:" : "Publication:"}
          </span>{" "}
          {item.publication}
        </p>
        <p>
          <span className="font-semibold text-foreground">Publication date:</span> {item.publicationDate}
        </p>
        <p>
          <span className="font-semibold text-foreground">Authors:</span> {item.authors.join(", ")}
        </p>
        {item.doi ? (
          <p className="break-words">
            <span className="font-semibold text-foreground">DOI:</span>{" "}
            <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
              {item.doi}
            </a>
          </p>
        ) : null}
        {item.frameworkConceptualization ? (
          <p className="font-medium text-foreground">{item.frameworkConceptualization}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {item.keywords.slice(0, 4).map((keyword) => (
          <Badge key={`${item.slug}-${keyword}`}>{keyword}</Badge>
        ))}
      </div>

      {item.relatedResearchLinks.length ? (
        <div className="space-y-2 text-sm text-muted">
          <p className="font-semibold text-foreground">Related research</p>
          {item.relatedResearchLinks.map((research) => (
            research.href?.startsWith("https://") ? (
              <a
                key={`${item.slug}-${research.title}`}
                href={research.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary transition hover:text-primary/80"
              >
                {research.title}
              </a>
            ) : (
              <Link
                key={`${item.slug}-${research.title}`}
                href={research.href ?? "/research"}
                className="block text-primary transition hover:text-primary/80"
              >
                {research.title}
              </Link>
            )
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/publications/${item.slug}`}
          className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
        >
          Publication details
        </Link>
        {item.articleUrl ? (
          <a
            href={item.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read full article on ${item.publication} (opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/15"
          >
            Read Full Article
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </Card>
  );
}
