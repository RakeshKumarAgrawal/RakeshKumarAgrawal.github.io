import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { software } from "@/data/software";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "GitHub",
  description: "Public repository footprint for research and engineering artifacts.",
  canonical: "/github",
  keywords: ["github", "repositories", "open source"],
});

export default function GitHubPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "GitHub" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={software.eyebrow}
          title={software.title}
          description={software.description}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {software.items.map((item) => (
          <Card key={item.title} className="space-y-4 p-5 sm:p-6">
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
            <p className="text-sm leading-7 text-muted">{item.description}</p>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
            >
              {item.linkLabel}
            </a>
          </Card>
        ))}
      </div>
    </SectionPageLayout>
  );
}
