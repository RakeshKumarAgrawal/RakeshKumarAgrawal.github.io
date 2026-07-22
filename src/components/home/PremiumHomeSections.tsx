import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import DashboardMetricCard from "@/components/dashboard/DashboardMetricCard";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { dashboardMetrics, dashboardTrendWindowLabel } from "@/data/dashboardMetrics";
import { memberships } from "@/data/memberships";
import { originalContributions } from "@/data/originalContributions";
import { publicationsLibrary } from "@/data/publicationsLibrary";
import { researchDomains } from "@/data/researchDomains";
import { software } from "@/data/software";

const featuredResearchDomainSlugs = [
  "enterprise-ai",
  "enterprise-ai-governance",
  "platform-engineering",
  "knowledge-systems",
  "cloud-computing",
  "responsible-ai",
  "healthcare-ai",
  "decision-intelligence",
  "llmops",
  "ai-observability",
] as const;

const featuredResearchDomains = featuredResearchDomainSlugs
  .map((slug) => researchDomains.find((domain) => domain.slug === slug))
  .filter((domain): domain is (typeof researchDomains)[number] => Boolean(domain));

const latestPublications = [...publicationsLibrary]
  .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate))
  .slice(0, 4);

const featuredContributions = originalContributions.slice(0, 7);
const highlightMetrics = dashboardMetrics.slice(0, 6);
const membershipHighlights = memberships.items.slice(0, 6);
const githubActivity = software.items;

export default function PremiumHomeSections() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section id="professional-highlights" className="py-6 sm:py-8">
        <Container className="space-y-10 lg:space-y-12">
          <Reveal>
            <SectionTitle
              eyebrow="Professional Highlights"
              title="Executive research and engineering footprint"
              description="A concise view of research output, technical architecture work, open artifacts, and professional contributions across enterprise AI and platform engineering."
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {highlightMetrics.map((metric, index) => (
              <Reveal key={metric.id} delay={index * 0.04}>
                <DashboardMetricCard metric={metric} trendWindowLabel={dashboardTrendWindowLabel} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="research-domains" className="py-6 sm:py-8">
        <Container className="space-y-10 lg:space-y-12">
          <Reveal>
            <SectionTitle
              eyebrow="Research Domains"
              title="Domain-oriented research architecture"
              description="Each domain links to projects, frameworks, publications, and datasets to preserve traceability between ideas, implementations, and evidence."
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {featuredResearchDomains.map((domain, index) => (
              <Reveal key={domain.slug} delay={index * 0.03}>
                <Card className="h-full space-y-4 p-5 sm:p-6">
                  <div className="space-y-2">
                    <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.2em] text-primary">
                      {domain.researchStatus}
                    </Badge>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{domain.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-muted">{domain.summary}</p>
                  <div className="grid gap-2 text-sm text-muted sm:grid-cols-2">
                    <p><span className="font-semibold text-foreground">Projects:</span> {domain.relatedRepositories.length}</p>
                    <p><span className="font-semibold text-foreground">Frameworks:</span> {domain.relatedFrameworks.length}</p>
                    <p><span className="font-semibold text-foreground">Publications:</span> {domain.relatedPublications.length}</p>
                    <p><span className="font-semibold text-foreground">Datasets:</span> {domain.relatedDatasets.length}</p>
                  </div>
                  <Link href={`/research/${domain.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                    Explore domain
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="latest-publications" className="py-6 sm:py-8">
        <Container className="space-y-10 lg:space-y-12">
          <Reveal>
            <SectionTitle
              eyebrow="Latest Publications"
              title="Recent research outputs"
              description="Selected recent publications with direct access to abstract context, DOI-backed records, citations, and linked technical artifacts."
              action={
                <Link href="/publications" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                  View full library
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {latestPublications.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.04}>
                <Card className="h-full space-y-4 p-5 sm:p-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{item.category}</Badge>
                      <Badge>{item.status}</Badge>
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{item.publicationDate}</p>
                  </div>
                  <p className="text-sm leading-7 text-muted">{item.abstract}</p>
                  <p className="text-xs text-muted">
                    DOI: {item.doi ?? "Not assigned"}
                  </p>
                  <Link href={`/publications/${item.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                    Read publication details
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="original-contributions-preview" className="py-6 sm:py-8">
        <Container className="space-y-10 lg:space-y-12">
          <Reveal>
            <SectionTitle
              eyebrow="Original Contributions"
              title="Flagship frameworks and research systems"
              description="Core contribution portfolio spanning enterprise architecture, governance frameworks, benchmark datasets, and operational maturity models."
              action={
                <Link href="/original-contributions" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                  View full showcase
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-2">
            {featuredContributions.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.03}>
                <Card className="h-full space-y-4 p-5 sm:p-6">
                  <div className="space-y-2">
                    <Badge>{item.researchStatus}</Badge>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-muted">{item.overview}</p>
                  <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Problem solved</p>
                    <p className="text-sm leading-6 text-muted">{item.researchProblem}</p>
                  </div>
                  <p className="text-sm leading-6 text-muted"><span className="font-semibold text-foreground">Innovation:</span> {item.technicalInnovation}</p>
                  <Link href="/original-contributions" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                    Open contribution details
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="professional-memberships" className="py-6 sm:py-8">
        <Container className="space-y-10 lg:space-y-12">
          <Reveal>
            <SectionTitle
              eyebrow="Professional Memberships"
              title="Institutional and professional engagement"
              description="Professional memberships and roles aligned to research standards, peer review, and technical community contributions."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {membershipHighlights.map((item, index) => (
              <Reveal key={`${item.organization}-${item.role}`} delay={index * 0.05}>
                <Card className="h-full space-y-3 p-5 sm:p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{item.organization}</h3>
                  <p className="text-sm font-medium text-foreground">{item.role}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.period}</p>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                      View source
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="github-activity" className="py-6 sm:py-8">
        <Container className="space-y-10 lg:space-y-12">
          <Reveal>
            <SectionTitle
              eyebrow="GitHub Activity"
              title="Public repositories and open technical artifacts"
              description="Open repositories that back this portfolio, research outputs, and architecture references for enterprise AI and engineering systems."
            />
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-3">
            {githubActivity.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <Card className="h-full space-y-4 p-5 sm:p-6">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.meta?.map((meta) => (
                      <span key={`${item.title}-${meta}`} className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-medium text-muted">
                        {meta}
                      </span>
                    ))}
                  </div>
                  <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary/80">
                    Open repository
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
