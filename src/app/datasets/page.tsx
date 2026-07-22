import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { datasets } from "@/data/datasets";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Datasets",
  description: "Open datasets and benchmark artifacts supporting reproducible research and enterprise AI implementation.",
  canonical: "/datasets",
  keywords: ["datasets", "open data", "benchmark datasets"],
});

export default function DatasetsPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Datasets" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={datasets.eyebrow}
          title={datasets.title}
          description={datasets.description}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {datasets.items.map((item) => (
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
