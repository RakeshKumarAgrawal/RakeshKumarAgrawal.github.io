import type { Metadata } from "next";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Research and engineering projects with verifiable public source references.",
  canonical: "/projects",
  keywords: ["projects", "research projects", "engineering projects"],
});

export default function ProjectsPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Projects" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.items.map((item) => (
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
