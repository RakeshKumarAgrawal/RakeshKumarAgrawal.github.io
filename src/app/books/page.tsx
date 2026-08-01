import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ExternalLink } from "lucide-react";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { topmateProfile } from "@/data/profileLinks";
import { createPageMetadata } from "@/lib/seo";

const amazonUrl = "https://a.co/d/005afKP6";

const categories = ["Artificial Intelligence", "Enterprise AI", "Agentic AI", "AI Governance"];

const highlights = [
  "Constitutional AI",
  "Agentic AI",
  "Enterprise AI Governance",
  "Responsible AI",
  "AI Assurance",
  "AI Safety",
  "Enterprise Architecture",
  "Practical Implementation",
];

const metrics = [
  { label: "Published Books", value: "1" },
  { label: "Book Chapters", value: "0", note: "Placeholder" },
  { label: "Research Topics", value: "8+" },
  { label: "Available Worldwide", value: "Amazon" },
  { label: "Publication Status", value: "Published" },
];

const plannedBooks = [
  "Enterprise AI Assurance\u2122",
  "Enterprise AI Incident\u2122",
  "Enterprise AI Operating Model",
  "Enterprise Digital Brain",
  "Enterprise AI Governance",
];

const researchConnections = [
  { label: "Book", href: "/books" },
  { label: "Research Papers", href: "/publications" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Datasets", href: "/datasets" },
  { label: "Enterprise AI Blueprints", href: "/original-contributions" },
  { label: "Open Source", href: "/github" },
];

export const metadata: Metadata = createPageMetadata({
  title: "Books",
  description:
    "Published books and technical contributions by Rakesh Kumar Agrawal covering Enterprise AI, Constitutional AI, Agentic AI, AI Governance, and Responsible Artificial Intelligence.",
  canonical: "/books",
  keywords: ["books", "enterprise AI", "constitutional AI", "agentic AI", "AI governance", "responsible AI"],
});

export default function BooksPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Books" }]}>
      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Research Contributions"
          title="Books & Book Chapters"
          description="Published books, scholarly contributions, technical writing, and future book projects."
        />
      </Card>

      <Reveal>
        <Card className="overflow-hidden p-6 sm:p-7">
          <div className="grid gap-8 md:grid-cols-[15rem_1fr] lg:gap-10">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-60 overflow-hidden rounded-2xl border border-border/70 bg-surface md:mx-0">
              <Image
                src="/images/books/book-cover.jpg"
                alt="Cover of Constitutional Agentic AI"
                fill
                priority
                sizes="(max-width: 768px) 240px, 240px"
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="border-primary/20 bg-primary/10 text-primary">Featured Book</Badge>
                <Badge>Published</Badge>
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Constitutional Agentic AI
                </h1>
                <p className="text-sm font-medium text-foreground">Rakesh Kumar Agrawal</p>
                <p className="text-sm text-muted">Amazon Kindle Direct Publishing</p>
              </div>
              <p className="text-sm leading-7 text-muted sm:text-base">
                Constitutional Agentic AI presents a practical approach for designing trustworthy autonomous AI systems through constitutional governance, policy-driven decision making, safety constraints, and enterprise-scale AI assurance. The book bridges research concepts with real-world enterprise implementation for responsible AI deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => <Badge key={category}>{category}</Badge>)}
              </div>
              <Button href={amazonUrl} target="_blank" rel="noreferrer" rightIcon={<ExternalLink className="h-4 w-4" />}>
                View on Amazon
              </Button>
            </div>
          </div>
        </Card>
      </Reveal>

      <section className="space-y-5" aria-label="Book highlights">
        <SectionTitle eyebrow="Book Highlights" title="Core Themes and Practical Coverage" description="Research-led topics connecting autonomous AI design, governance, assurance, and implementation." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <Reveal key={highlight} delay={index * 0.04}>
              <Card className="flex h-full items-center gap-3 p-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">{highlight}</h3>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Book metrics dashboard">
        <SectionTitle eyebrow="Book Metrics Dashboard" title="Publishing Portfolio at a Glance" description="Current publishing status and the research scope represented by the book portfolio." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => (
            <Card key={metric.label} className="h-full space-y-3 p-5">
              <p className="font-display text-3xl font-semibold tracking-tight text-foreground">{metric.value}</p>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{metric.label}</h3>
              {metric.note ? <p className="text-xs text-muted">{metric.note}</p> : null}
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Future books timeline">
        <SectionTitle eyebrow="Future Books Timeline" title="Published and Planned Work" description="A continuing technical writing program focused on enterprise AI systems and governance." />
        <div className="space-y-4">
          <div className="relative pl-8 sm:pl-10">
            <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
            <span className="absolute left-[5px] top-9 h-[calc(100%+1rem)] w-px bg-border/80" aria-hidden="true" />
            <Card className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div className="space-y-2">
                <Badge className="border-primary/20 bg-primary/10 text-primary">Published</Badge>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">Constitutional Agentic AI</h3>
              </div>
              <Button href={amazonUrl} target="_blank" rel="noreferrer" size="sm">View on Amazon</Button>
            </Card>
          </div>
          {plannedBooks.map((title) => (
            <div key={title} className="relative pl-8 sm:pl-10">
              <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-border bg-surface" aria-hidden="true" />
              <span className="absolute left-[5px] top-9 h-[calc(100%+1rem)] w-px bg-border/80 last:hidden" aria-hidden="true" />
              <Card className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
                <div className="space-y-2">
                  <Badge>Planned</Badge>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                </div>
                <Badge className="border-primary/20 bg-primary/10 text-primary">In Progress</Badge>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Research connection">
        <SectionTitle eyebrow="Research Connection" title="How this Book Connects to My Research" description="A connected path from long-form synthesis to evidence, reusable systems, implementation assets, and open engineering." />
        <Card className="p-6 sm:p-7">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {researchConnections.map((connection, index) => (
              <div key={connection.label} className="contents">
                <Link href={connection.href} className="flex min-h-20 items-center justify-center rounded-2xl border border-border/70 bg-surface/55 p-4 text-center text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-white/[0.07]">
                  {connection.label}
                </Link>
                {index < researchConnections.length - 1 ? (
                  <span className="flex justify-center text-primary" aria-hidden="true">
                    <ArrowDown className="h-5 w-5 lg:hidden" />
                    <ArrowRight className="hidden h-5 w-5 lg:block" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card className="space-y-5 p-6 sm:p-7">
        <SectionTitle eyebrow="Explore the Work" title="Continue Through the Research Portfolio" description="Read the book, review the supporting research, or connect for a professional discussion." />
        <div className="flex flex-wrap gap-3">
          <Button href={amazonUrl} target="_blank" rel="noreferrer" rightIcon={<ExternalLink className="h-4 w-4" />}>View on Amazon</Button>
          <Button href="/publications" variant="secondary">View Publications</Button>
          <Button href="/research" variant="secondary">View Research</Button>
          <Button href="/contact" variant="secondary">Contact</Button>
          <Button href={topmateProfile.href} target={topmateProfile.target} rel={topmateProfile.rel} ariaLabel={topmateProfile.ariaLabel}>Book a Meeting</Button>
        </div>
      </Card>
    </SectionPageLayout>
  );
}