import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { FrameworkLibraryItem } from "@/data/frameworksLibrary";

type FrameworkCardProps = {
  framework: FrameworkLibraryItem;
};

export default function FrameworkCard({ framework }: FrameworkCardProps) {
  return (
    <Card className="h-full space-y-4 p-6">
      <div className="space-y-3">
        <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
          {framework.status}
        </Badge>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{framework.title}</h2>
      </div>

      <p className="text-sm leading-7 text-muted">{framework.overview}</p>

      <div className="space-y-2 text-sm text-muted">
        <p>
          <span className="font-semibold text-foreground">Problem addressed:</span> {framework.problemAddressed}
        </p>
        <p>
          <span className="font-semibold text-foreground">Core components:</span> {framework.components.length}
        </p>
      </div>

      <Link
        href={`/frameworks/${framework.slug}`}
        className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
      >
        Explore framework
      </Link>
    </Card>
  );
}
