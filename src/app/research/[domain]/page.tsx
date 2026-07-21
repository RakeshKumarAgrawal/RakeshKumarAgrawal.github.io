import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ResearchBreadcrumbs from "@/components/research/ResearchBreadcrumbs";
import ResearchReferenceList from "@/components/research/ResearchReferenceList";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import { getResearchDomainBySlug, researchDomains } from "@/data/researchDomains";

type DomainPageProps = {
  params: Promise<{
    domain: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchDomains.map((domain) => ({
    domain: domain.slug,
  }));
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const { domain } = await params;
  const domainRecord = getResearchDomainBySlug(domain);

  if (!domainRecord) {
    return {
      title: "Research Domain",
    };
  }

  return {
    title: `${domainRecord.title} Research`,
    description: domainRecord.summary,
    alternates: {
      canonical: `/research/${domainRecord.slug}`,
    },
  };
}

export default async function ResearchDomainPage({ params }: DomainPageProps) {
  const { domain } = await params;
  const domainRecord = getResearchDomainBySlug(domain);

  if (!domainRecord) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="content" className="flex flex-1 flex-col pb-10">
        <section className="py-10 sm:py-12">
          <Container className="space-y-8 lg:space-y-10">
            <ResearchBreadcrumbs
              items={[
                { label: "Home", href: "/#home" },
                { label: "Research", href: "/research" },
                { label: domainRecord.title },
              ]}
            />

            <Card className="space-y-6 p-6 sm:p-7">
              <div className="space-y-3">
                <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                  {domainRecord.researchStatus}
                </Badge>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {domainRecord.title}
                </h1>
              </div>

              <p className="max-w-4xl text-base leading-7 text-muted sm:text-lg">{domainRecord.summary}</p>

              <div className="space-y-3 rounded-2xl border border-border/70 bg-surface/60 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Future work</h2>
                <ul className="space-y-2">
                  {domainRecord.futureWork.map((item) => (
                    <li key={item} className="text-sm leading-6 text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {domainRecord.keywords.map((keyword) => (
                  <Badge key={keyword}>{keyword}</Badge>
                ))}
              </div>

              <Link
                href="/research"
                className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
              >
                Back to research hub
              </Link>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <ResearchReferenceList
                title="Related Publications"
                items={domainRecord.relatedPublications}
                emptyLabel="No publications linked for this domain yet."
              />
              <ResearchReferenceList
                title="Related GitHub Repositories"
                items={domainRecord.relatedRepositories}
                emptyLabel="No repositories linked for this domain yet."
              />
              <ResearchReferenceList
                title="Related Datasets"
                items={domainRecord.relatedDatasets}
                emptyLabel="No datasets linked for this domain yet."
              />
              <ResearchReferenceList
                title="Related Frameworks"
                items={domainRecord.relatedFrameworks}
                emptyLabel="No frameworks linked for this domain yet."
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
