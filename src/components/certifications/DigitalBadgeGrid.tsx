import { ExternalLink } from "lucide-react";

import Card from "@/components/ui/Card";
import type { DigitalBadgeRecord } from "@/components/certifications/types";

type DigitalBadgeGridProps = {
  badges: DigitalBadgeRecord[];
};

export default function DigitalBadgeGrid({ badges }: DigitalBadgeGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {badges.map((badge) => (
        <Card key={badge.id} className="space-y-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xs font-semibold tracking-[0.18em] text-primary">
            {badge.image}
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{badge.name}</h3>
            <p className="text-sm text-muted">{badge.issuer}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{badge.category}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{badge.issueDate}</p>
          </div>
          <a
            href={badge.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary/40"
          >
            Verify
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </Card>
      ))}
    </div>
  );
}
