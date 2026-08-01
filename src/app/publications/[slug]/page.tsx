import type { Metadata } from "next";
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

            <Card className="space-y-5 p-6 sm:p-7">
              <div className="flex flex-wrap gap-2">
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

              <PublicationDetailSection title="Publication">
                <p>{publication.publication}</p>
              </PublicationDetailSection>

              <PublicationDetailSection title="Status">
                <p>{publication.status}</p>
              </PublicationDetailSection>

              <PublicationDetailSection title="DOI">
                {doiUrl ? (
                  <a href={doiUrl} target="_blank" rel="noreferrer" className="text-primary transition hover:text-primary/80">
                    {publication.doi}
                  </a>
                ) : (
                  <p>Not available</p>
                )}
              </PublicationDetailSection>

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
