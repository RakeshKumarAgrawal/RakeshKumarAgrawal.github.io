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

const amazonUrl = "https://www.amazon.com/dp/B0HCCR1V4H";

const categories = ["Artificial Intelligence", "Machine Learning", "Generative AI", "AI Agents"];

const highlights = [
  "Artificial Intelligence",
  "Machine Learning",
  "Generative AI",
  "ChatGPT",
  "AI Agents",
  "Prompt Engineering",
  "Real-world Applications",
  "Responsible AI",
  "Future of Intelligent Systems",
];

const metrics = [
  { label: "Published Books", value: "1" },
  { label: "Book Series", value: "1" },
  { label: "Current Volume", value: "Book 1" },
  { label: "Publisher", value: "Amazon KDP" },
  { label: "Status", value: "Published" },
];

const plannedBooks = [
  { volume: "Book 2", title: "Enterprise AI for Professionals" },
  { volume: "Book 3", title: "Enterprise AI Architecture" },
  { volume: "Book 4", title: "Enterprise AI Governance" },
  { volume: "Book 5", title: "Enterprise AI Assurance" },
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
  title: "From Zero to AI: An Easy Beginner's Guide to Artificial Intelligence, Machine Learning, Generative AI, ChatGPT, AI Agents, and the Future of Intelligent Systems",
  description:
    "From Zero to AI by Rakesh Kumar Agrawal is a beginner-friendly guide to Artificial Intelligence, Machine Learning, Generative AI, ChatGPT, AI Agents, and intelligent systems.",
  canonical: "/books",
  keywords: ["From Zero to AI", "artificial intelligence", "machine learning", "generative AI", "ChatGPT", "AI agents", "responsible AI"],
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
                src="/images/books/from-zero-to-ai.jpg"
                alt="Cover of From Zero to AI"
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
                  From Zero to AI: An Easy Beginner&apos;s Guide to Artificial Intelligence, Machine Learning, Generative AI, ChatGPT, AI Agents, and the Future of Intelligent Systems
                </h1>
                <p className="text-sm text-muted">The Enterprise AI Learning Series · Book 1</p>
                <p className="text-sm font-medium text-foreground">Rakesh Kumar Agrawal</p>
                <p className="text-sm text-muted">Amazon Kindle Direct Publishing</p>
              </div>
              <p className="text-sm leading-7 text-muted sm:text-base">
                From Zero to AI is a beginner-friendly guide that introduces readers to the foundations of Artificial Intelligence, Machine Learning, Generative AI, ChatGPT, AI Agents, and modern intelligent systems. Combining practical explanations with real-world examples, the book helps students, professionals, and technology enthusiasts understand how AI is transforming industries while building a strong foundation for future learning.
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
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Future books timeline">
        <SectionTitle eyebrow="Book Series Timeline" title="Enterprise AI Learning Series" description="Published and planned volumes in a practical learning series for artificial intelligence and enterprise AI." />
        <div className="space-y-4">
          <div className="relative pl-8 sm:pl-10">
            <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
            <span className="absolute left-[5px] top-9 h-[calc(100%+1rem)] w-px bg-border/80" aria-hidden="true" />
            <Card className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div className="space-y-2">
                <Badge className="border-primary/20 bg-primary/10 text-primary">Published</Badge>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Book 1</p>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">From Zero to AI</h3>
              </div>
              <Button href={amazonUrl} target="_blank" rel="noreferrer" size="sm">View on Amazon</Button>
            </Card>
          </div>
          {plannedBooks.map((book) => (
            <div key={book.volume} className="relative pl-8 sm:pl-10">
              <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-border bg-surface" aria-hidden="true" />
              <span className="absolute left-[5px] top-9 h-[calc(100%+1rem)] w-px bg-border/80 last:hidden" aria-hidden="true" />
              <Card className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
                <div className="space-y-2">
                  <Badge>Planned</Badge>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{book.volume}</p>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{book.title}</h3>
                </div>
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