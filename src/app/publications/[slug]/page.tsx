import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PublicationArtifactList from "@/components/publications/PublicationArtifactList";
import PublicationDetailSection from "@/components/publications/PublicationDetailSection";
import NewsletterPortal from "@/components/publications/NewsletterPortal";
import ResearchBreadcrumbs from "@/components/research/ResearchBreadcrumbs";
import ResearchCollaborationCTA from "@/components/research/ResearchCollaborationCTA";
import SectionPageLayout from "@/components/layout/SectionPageLayout";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import {
  getPublicationBySlug,
  publicationsLibrary,
} from "@/data/publicationsLibrary";
import { newsletterEditions, newsletterPortal } from "@/data/newsletterPortal";
import { createPageMetadata, siteConfig } from "@/lib/seo";

const newsletterAuthoritySlug = "linkedin-newsletter-authority-record";
const newsletterDescription =
  "Enterprise Intelligence Lab Newsletter: an ongoing LinkedIn publication series connecting Enterprise AI, AI governance, assurance, architecture, platform engineering, responsible AI, and applied research.";

type PublicationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publicationsLibrary.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === newsletterAuthoritySlug) {
    return createPageMetadata({
      title: "Enterprise Intelligence Lab Newsletter",
      description: newsletterDescription,
      canonical: `/publications/${newsletterAuthoritySlug}`,
      keywords: [
        "Enterprise Intelligence Lab Newsletter",
        "Enterprise AI",
        "AI governance",
        "AI assurance",
        "platform engineering",
        "responsible AI",
        "LinkedIn newsletter",
      ],
    });
  }

  const publication = getPublicationBySlug(slug);

  if (!publication) {
    return {
      title: "Publication",
    };
  }

  if (publication.scholarlyMetadata) {
    return {
      title: publication.title,
      description: publication.abstract,
      keywords: publication.keywords,
      alternates: {
        canonical: `/publications/${publication.slug}`,
      },
      openGraph: {
        type: "article",
        url: `${siteConfig.url}/publications/${publication.slug}/`,
        title: publication.title,
        description: publication.abstract,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        publishedTime: publication.publicationDate,
        authors: publication.authors,
      },
      twitter: {
        card: "summary_large_image",
        title: publication.title,
        description: publication.abstract,
      },
    };
  }

  if (publication.category === "Professional Articles" && publication.articleUrl) {
    return {
      title: publication.title,
      description: publication.abstract,
      keywords: publication.keywords,
      alternates: {
        canonical: `/publications/${publication.slug}`,
      },
      openGraph: {
        type: "article",
        url: `${siteConfig.url}/publications/${publication.slug}/`,
        title: publication.title,
        description: publication.abstract,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        publishedTime: publication.publicationDate,
        authors: publication.authors,
      },
      twitter: {
        card: "summary",
        title: publication.title,
        description: publication.abstract,
      },
    };
  }

  return {
    title: publication.title,
    description: publication.abstract,
    alternates: {
      canonical: `/publications/${publication.slug}`,
    },
  };
}

export default async function PublicationDetailPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  if (slug === newsletterAuthoritySlug) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Periodical",
      name: newsletterPortal.title,
      alternateName: newsletterPortal.subtitle,
      description: newsletterDescription,
      url: `${siteConfig.url}/publications/${newsletterAuthoritySlug}/`,
      sameAs: newsletterPortal.archiveUrl,
      isAccessibleForFree: true,
      publisher: {
        "@type": "Organization",
        name: "Enterprise Intelligence Lab",
        url: "https://www.enterpriseintelligencelab.com/",
      },
      author: {
        "@type": "Person",
        name: "Rakesh Kumar Agrawal",
        url: siteConfig.url,
        sameAs: [
          "https://www.linkedin.com/in/rakeshkumaragrawal/",
          "https://orcid.org/0009-0009-7113-5539",
          "https://github.com/RakeshKumarAgrawal",
        ],
      },
      hasPart: newsletterEditions.map((edition) => ({
        "@type": "Article",
        headline: edition.title,
        datePublished: edition.publicationDate,
        url: edition.linkedinUrl,
      })),
    };

    return (
      <SectionPageLayout
        breadcrumbs={[
          { label: "Home", href: "/#home" },
          { label: "Publications", href: "/publications" },
          { label: newsletterPortal.title },
        ]}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <NewsletterPortal />
      </SectionPageLayout>
    );
  }

  const doiUrl = publication.doi ? `https://doi.org/${publication.doi}` : null;
  const scholarlyMetadata = publication.scholarlyMetadata;
  const structuredData = scholarlyMetadata && publication.articleUrl
    ? {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "@id": `${siteConfig.url}/publications/${publication.slug}/`,
        headline: publication.title,
        name: publication.title,
        description: publication.abstract,
        datePublished: publication.publicationDate,
        url: publication.articleUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/publications/${publication.slug}/`,
        },
        author: publication.authors.map((name) => ({
          "@type": "Person",
          name,
        })),
        publisher: {
          "@type": "Organization",
          name: scholarlyMetadata.publisher,
        },
        isPartOf: {
          "@type": "Periodical",
          name: scholarlyMetadata.journalName,
          volumeNumber: scholarlyMetadata.volume,
          issueNumber: scholarlyMetadata.issue,
        },
        publicationIssue: {
          "@type": "PublicationIssue",
          issueNumber: scholarlyMetadata.issue,
          name: scholarlyMetadata.issueTitle,
        },
        ...(scholarlyMetadata.articleNumber
          ? { pagination: scholarlyMetadata.articleNumber }
          : {}),
        identifier: doiUrl,
        sameAs: publication.articleUrl,
        keywords: publication.keywords,
      }
    : publication.category === "Professional Articles" && publication.articleUrl
      ? {
          "@context": "https://schema.org",
          "@type": publication.publication === "Medium" ? "BlogPosting" : "Article",
          "@id": `${siteConfig.url}/publications/${publication.slug}/`,
          headline: publication.title,
          name: publication.title,
          description: publication.abstract,
          datePublished: publication.publicationDate,
          url: publication.articleUrl,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/publications/${publication.slug}/`,
          },
          author: publication.authors.map((name) => ({
            "@type": "Person",
            name,
          })),
          publisher: {
            "@type": "Organization",
            name: publication.publication,
          },
          keywords: publication.keywords,
          inLanguage: "en",
        }
    : null;

  return (
    <>
      <Navbar />
      <main id="content" className="flex flex-1 flex-col pb-10">
        <section className="py-10 sm:py-12">
          <Container className="space-y-8 lg:space-y-10">
            <ResearchBreadcrumbs
              items={[
                { label: "Home", href: "/#home" },
                { label: "Publications", href: "/publications" },
                { label: publication.title },
              ]}
            />

            {structuredData ? (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
              />
            ) : null}

            <Card className="space-y-5 p-6 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {publication.featured ? (
                  <Badge className="border-accent/30 bg-accent/10 text-[0.65rem] tracking-[0.18em] text-accent">
                    Featured Journal Article
                  </Badge>
                ) : null}
                <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                  {publication.category}
                </Badge>
                <Badge>{publication.status}</Badge>
              </div>

              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {publication.title}
              </h1>

              <p className="text-sm leading-7 text-muted sm:text-base">
                Publication date: {publication.publicationDate}
              </p>
              {publication.frameworkConceptualization ? (
                <p className="text-sm font-medium leading-7 text-foreground">
                  {publication.frameworkConceptualization}
                </p>
              ) : null}
              {publication.articleUrl ? (
                <a
                  href={publication.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read full article on ${publication.publication} (opens in a new tab)`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/15"
                >
                  Read Full Article
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <PublicationDetailSection title="Abstract">
                <p>{publication.abstract}</p>
              </PublicationDetailSection>

              <PublicationDetailSection title="Authors">
                <ul className="space-y-1">
                  {publication.authors.map((author) => (
                    <li key={author}>{author}</li>
                  ))}
                </ul>
              </PublicationDetailSection>

              <PublicationDetailSection
                title={publication.category === "Professional Articles" ? "Publisher" : "Publication"}
              >
                <p>
                  {publication.publication}
                  {doiUrl ? (
                    <>
                      {" "}
                      <a href={doiUrl} target="_blank" rel="noreferrer" className="text-primary transition hover:text-primary/80">
                        DOI: {publication.doi}
                      </a>
                    </>
                  ) : null}
                </p>
              </PublicationDetailSection>

              <PublicationDetailSection title="Status">
                <p>{publication.status}</p>
              </PublicationDetailSection>

              {doiUrl ? (
                <PublicationDetailSection title="DOI">
                  <a href={doiUrl} target="_blank" rel="noopener noreferrer" className="text-primary transition hover:text-primary/80">
                    {publication.doi}
                  </a>
                </PublicationDetailSection>
              ) : null}

              <PublicationDetailSection title="Citation">
                <p>{publication.citation}</p>
              </PublicationDetailSection>

              <PublicationDetailSection title="BibTeX">
                <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-2xl border border-border/70 bg-white/5 p-3 text-xs leading-6 text-muted">
                  {publication.bibtex}
                </pre>
              </PublicationDetailSection>

              <PublicationDetailSection title="Keywords">
                <div className="flex flex-wrap gap-2">
                  {publication.keywords.map((keyword) => (
                    <Badge key={`${publication.slug}-${keyword}`}>{keyword}</Badge>
                  ))}
                </div>
              </PublicationDetailSection>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {publication.relatedResearchLinks.length ? (
                <PublicationDetailSection title="Related research">
                  <ul className="space-y-2">
                    {publication.relatedResearchLinks.map((research) => (
                      <li key={`${publication.slug}-${research.title}`}>
                        {research.href?.startsWith("https://") ? (
                          <a
                            href={research.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary transition hover:text-primary/80"
                          >
                            {research.title}
                          </a>
                        ) : (
                          <Link
                            href={research.href ?? "/research"}
                            className="text-primary transition hover:text-primary/80"
                          >
                            {research.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </PublicationDetailSection>
              ) : null}
              <PublicationArtifactList
                title="GitHub Repository"
                items={publication.githubRepositories}
                emptyLabel="No linked repositories for this publication."
              />
              <PublicationArtifactList
                title="Related Frameworks"
                items={publication.relatedFrameworks}
                emptyLabel="No linked frameworks for this publication."
              />
              <PublicationArtifactList
                title="Related Datasets"
                items={publication.relatedDatasets}
                emptyLabel="No linked datasets for this publication."
              />
              <PublicationArtifactList
                title="Related Projects"
                items={publication.relatedProjects}
                emptyLabel="No linked projects for this publication."
              />
            </div>

            <ResearchCollaborationCTA />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
