import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  bookPortfolioMetrics,
  formatBookTitle,
  formatPublicationDate,
  latestPublishedBook,
  publishedBooks,
} from "@/data/books";
import { topmateProfile } from "@/data/profileLinks";
import { createPageMetadata, siteConfig } from "@/lib/seo";

const researchThemes = [...new Set(publishedBooks.flatMap((book) => book.topics))];

export const metadata: Metadata = createPageMetadata({
  title: "Books and Research Publications",
  description:
    "Published books by Rakesh Kumar Agrawal spanning artificial intelligence, intelligent energy systems, machine learning, and applied research frameworks.",
  canonical: "/books",
  keywords: researchThemes,
});

const bookStructuredData = publishedBooks.map((book) => ({
  "@context": "https://schema.org",
  "@type": "Book",
  name: formatBookTitle(book),
  author: { "@type": "Person", name: "Rakesh Kumar Agrawal", url: siteConfig.url },
  datePublished: book.publicationDate,
  publisher: { "@type": "Organization", name: book.publisher },
  image: `${siteConfig.url}${book.coverImage}`,
  description: book.description,
  url: book.amazonUrl,
  isPartOf: { "@type": "BookSeries", name: book.series },
  bookEdition: book.volume,
  keywords: book.topics.join(", "),
}));

export default function BooksPage() {
  return (
    <SectionPageLayout breadcrumbs={[{ label: "Home", href: "/#home" }, { label: "Books" }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookStructuredData) }} />

      <Card className="space-y-6 p-6 sm:p-7">
        <SectionTitle
          eyebrow="Research Contributions"
          title="Books & Book Chapters"
          description="A publication portfolio connecting accessible technical education with research-led frameworks for artificial intelligence and future energy systems."
        />
      </Card>

      <section className="space-y-5" aria-label="Publication statistics">
        <SectionTitle eyebrow="Publication Statistics" title="Publishing Portfolio at a Glance" description="Automatically calculated from the published books collection." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookPortfolioMetrics.map((metric) => (
            <Card key={metric.label} className="h-full space-y-3 p-5">
              <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{metric.value}</p>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{metric.label}</h2>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Featured latest release">
        <SectionTitle eyebrow="Featured Latest Release" title="Newest Published Book" description="The latest release is selected automatically by publication date." />
        <Reveal>
          <Card className="overflow-hidden p-6 sm:p-7">
            <div className="grid gap-8 md:grid-cols-[15rem_1fr] lg:gap-10">
              <div className="relative mx-auto aspect-[2/3] w-full max-w-60 overflow-hidden rounded-2xl border border-border/70 bg-surface md:mx-0">
                <Image src={latestPublishedBook.coverImage} alt={`Cover of ${formatBookTitle(latestPublishedBook)}`} fill priority sizes="(max-width: 768px) 240px, 240px" className="object-cover" />
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2"><Badge className="border-primary/20 bg-primary/10 text-primary">Latest Release</Badge><Badge>{latestPublishedBook.status}</Badge></div>
                <div className="space-y-2">
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{formatBookTitle(latestPublishedBook)}</h1>
                  <p className="text-sm text-muted">{latestPublishedBook.series} · {latestPublishedBook.volume}</p>
                  <p className="text-sm font-medium text-foreground">Rakesh Kumar Agrawal</p>
                  <p className="text-sm text-muted">{latestPublishedBook.publisher} · {formatPublicationDate(latestPublishedBook.publicationDate)}</p>
                </div>
                <p className="text-sm leading-7 text-muted sm:text-base">{latestPublishedBook.description}</p>
                <div className="flex flex-wrap gap-2">{latestPublishedBook.topics.map((topic) => <Badge key={topic}>{topic}</Badge>)}</div>
                <Button href={latestPublishedBook.amazonUrl} target="_blank" rel="noreferrer" rightIcon={<ExternalLink className="h-4 w-4" />}>View on Amazon</Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="space-y-5" aria-label="Published books">
        <SectionTitle eyebrow="Published Books" title="Complete Book Collection" description="Published titles ordered from newest to oldest." />
        <div className="grid gap-4 lg:grid-cols-2">
          {publishedBooks.map((book, index) => (
            <Reveal key={book.id} delay={index * 0.04}>
              <div id={book.id} className="h-full scroll-mt-24">
                <Card className="grid h-full gap-5 p-5 sm:grid-cols-[8rem_1fr] sm:p-6">
                <div className="relative mx-auto aspect-[2/3] w-32 overflow-hidden rounded-2xl border border-border/70 bg-surface sm:mx-0">
                  <Image src={book.coverImage} alt={`Cover of ${formatBookTitle(book)}`} fill sizes="128px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-col space-y-4">
                  <div className="flex flex-wrap gap-2"><Badge>{book.status}</Badge></div>
                  <div className="space-y-2">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{formatBookTitle(book)}</h2>
                    <p className="text-sm text-muted">{book.publisher}</p>
                  </div>
                  <p className="text-sm leading-7 text-muted">{book.description}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-1">
                    <Button href={book.amazonUrl} target="_blank" rel="noreferrer" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>Amazon</Button>
                    <Button href={`#timeline-${book.id}`} variant="secondary" size="sm">Learn More</Button>
                  </div>
                </div>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Book series timeline">
        <SectionTitle eyebrow="Book Series Timeline" title="Publication Timeline" description="Published titles ordered by publication date, newest first." />
        <div className="space-y-4">
          {publishedBooks.map((book, index) => (
            <div id={`timeline-${book.id}`} key={book.id} className="relative scroll-mt-24 pl-8 sm:pl-10">
              <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
              {index < publishedBooks.length - 1 ? <span className="absolute left-[5px] top-9 h-[calc(100%+1rem)] w-px bg-border/80" aria-hidden="true" /> : null}
              <Card className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2"><Badge>{book.status}</Badge><Badge>{book.volume}</Badge></div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{formatPublicationDate(book.publicationDate)}</p>
                  <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{formatBookTitle(book)}</h2>
                  <p className="text-sm text-muted">{book.series}</p>
                </div>
                <Button href={book.amazonUrl} target="_blank" rel="noreferrer" size="sm">View on Amazon</Button>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5" aria-label="Research themes">
        <SectionTitle eyebrow="Research Themes" title="Topics Across the Book Portfolio" description="Research and practice areas represented across all published titles." />
        <Card className="p-6 sm:p-7"><div className="flex flex-wrap gap-2">{researchThemes.map((theme) => <Badge key={theme}>{theme}</Badge>)}</div></Card>
      </section>

      <section className="space-y-5" aria-label="Related publications and research">
        <SectionTitle eyebrow="Related Publications" title="Research Connections" description="Data-driven links from each book to supporting research, frameworks, datasets, projects, and newsletter editions." />
        <div className="grid gap-4 lg:grid-cols-2">
          {publishedBooks.map((book) => (
            <Card key={book.id} className="space-y-5 p-5 sm:p-6">
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{book.title}</h2>
              <div className="flex flex-wrap gap-2">
                {book.connections?.map((connection) => <Button key={`${book.id}-${connection.type}`} href={connection.href} variant="secondary" size="sm">{connection.label}</Button>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Card className="space-y-5 p-6 sm:p-7">
        <SectionTitle eyebrow="Explore the Work" title="Continue Through the Research Portfolio" description="Read the latest book, review supporting research, or connect for a professional discussion." />
        <div className="flex flex-wrap gap-3">
          <Button href={latestPublishedBook.amazonUrl} target="_blank" rel="noreferrer" rightIcon={<ExternalLink className="h-4 w-4" />}>View Latest on Amazon</Button>
          <Button href="/publications" variant="secondary">View Publications</Button>
          <Button href="/research" variant="secondary">View Research</Button>
          <Button href="/contact" variant="secondary">Contact</Button>
          <Button href={topmateProfile.href} target={topmateProfile.target} rel={topmateProfile.rel} ariaLabel={topmateProfile.ariaLabel}>Book a Meeting</Button>
        </div>
      </Card>
    </SectionPageLayout>
  );
}