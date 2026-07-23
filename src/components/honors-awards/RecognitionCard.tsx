"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { RecognitionRecord } from "@/components/honors-awards/types";

type RecognitionCardProps = {
  recognition: RecognitionRecord;
};

export default function RecognitionCard({ recognition }: RecognitionCardProps) {
  return (
    <article>
      <Card className="space-y-4 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-xs font-semibold tracking-[0.18em] text-primary">
              {recognition.logo}
            </span>
            <div className="space-y-1">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{recognition.title}</h3>
              <p className="text-sm text-muted">{recognition.organization}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{recognition.issueDate}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {recognition.featured ? (
              <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">Featured</Badge>
            ) : null}
            <Badge>{recognition.status}</Badge>
          </div>
        </div>

        <p className="text-sm leading-7 text-muted">{recognition.description}</p>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface/60">
          <div className="relative h-36 w-full sm:h-44">
            <Image
              src={recognition.image}
              alt={`${recognition.title} supporting visual`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-border/70 bg-surface/60 p-4 sm:grid-cols-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Category
            <span className="ml-2 text-foreground">{recognition.category}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Organization
            <span className="ml-2 text-foreground">{recognition.organization}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Year
            <span className="ml-2 text-foreground">{recognition.issueDate.slice(0, 4)}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Record Order
            <span className="ml-2 text-foreground">{recognition.displayOrder}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {recognition.tags.map((tag) => (
            <Badge key={`${recognition.id}-${tag}`}>{tag}</Badge>
          ))}
        </div>

        <a
          href={recognition.verificationUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary/40"
        >
          Verify
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </Card>
    </article>
  );
}
