import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ExternalLink,
  FileText,
  Landmark,
  Layers3,
  Network,
  Newspaper,
  SearchCheck,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

import NewsletterMetricCard from "@/components/publications/NewsletterMetricCard";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { executiveProfile } from "@/data/executiveProfile";
import {
  archiveStatistics,
  authorityMetrics,
  ecosystemConnections,
  latestNewsletterEdition,
  NEWSLETTER_HOME,
  newsletterEditions,
  newsletterMetrics,
  newsletterPortal,
  newsletterTopics,
  researchConnections,
  researchImpact,
} from "@/data/newsletterPortal";
import { topmateProfile } from "@/data/profileLinks";

const pageUrl = "https://rakeshkumaragrawal.github.io/publications/linkedin-newsletter-authority-record/";
const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

const impactIcons = [SearchCheck, Boxes, FileText, Landmark, ShieldCheck, CheckCircle2, Layers3, Sparkles];
const connectionIcons = [Layers3, BookOpen, FileText, BrainCircuit, ShieldCheck, Network, Sparkles, SiGithub, SearchCheck];

function MetricGrid({ metrics, label }: { metrics: readonly { label: string; value: number | string; suffix?: string }[]; label: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label={label}>
      {metrics.map((metric) => (
        <NewsletterMetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}

export default function NewsletterPortal() {
  return (
    <div className="space-y-10 lg:space-y-12">
      <Reveal>
        <Card className="overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {newsletterPortal.badges.map((badge) => (
                  <Badge key={badge} className="border-primary/20 bg-primary/10 text-primary">{badge}</Badge>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Official Publication Series</p>
                <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {newsletterPortal.title}
                </h1>
                <p className="font-display text-xl font-medium tracking-tight text-primary sm:text-2xl">{newsletterPortal.subtitle}</p>
                <p className="max-w-4xl text-sm leading-7 text-muted sm:text-base">{newsletterPortal.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={latestNewsletterEdition?.linkedinUrl ?? NEWSLETTER_HOME} target="_blank" rel="noopener noreferrer" rightIcon={<ExternalLink className="h-4 w-4" />} ariaLabel={`Open Edition ${latestNewsletterEdition?.edition ?? "latest"} of the Enterprise Intelligence Lab newsletter on LinkedIn`}>
                  Read Latest Edition
                </Button>
                <Button href={NEWSLETTER_HOME} target="_blank" rel="noopener noreferrer" variant="secondary" leftIcon={<FaLinkedin className="h-4 w-4" />}>
                  View LinkedIn Newsletter
                </Button>
                <Button href="/publications" variant="ghost">Back to Publications</Button>
              </div>
            </div>

            <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-surface/60 p-7 sm:min-h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" aria-hidden="true" />
              <div className="relative flex h-full min-h-60 flex-col justify-between gap-8">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary" aria-hidden="true">
                  <Newspaper className="h-6 w-6" />
                </span>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Enterprise Intelligence Lab</p>
                  <p className="font-display text-2xl font-semibold tracking-tight text-foreground">Research communication for enterprise technology leaders.</p>
                  <p className="text-sm leading-7 text-muted">Applied research · Architecture · Governance · Assurance · Open Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>

      <section className="space-y-5" aria-labelledby="authority-dashboard-title">
        <SectionTitle eyebrow="Newsletter Authority Dashboard" title="Publication Authority at a Glance" description="Live indicators derived from the verified newsletter collection and its LinkedIn authority record." />
        <div id="authority-dashboard-title"><MetricGrid metrics={authorityMetrics} label="Newsletter authority metrics" /></div>
      </section>

      <section className="space-y-5" aria-labelledby="featured-edition-title">
        <SectionTitle eyebrow="Featured Latest Edition" title="Latest Enterprise AI Briefing" description="The newest verified edition and its direct connections to the broader research portfolio." />
        <div id="featured-edition-title">
          {latestNewsletterEdition ? (
            <Reveal>
              <Card className="overflow-hidden p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="flex min-h-64 items-end rounded-3xl border border-border/70 bg-gradient-to-br from-primary/15 via-surface to-accent/10 p-6">
                    <div className="space-y-2">
                      <Badge>Enterprise Intelligence Lab</Badge>
                      <p className="font-display text-xl font-semibold text-foreground">Edition #{latestNewsletterEdition.edition}</p>
                      <p className="text-sm text-muted">{latestNewsletterEdition.publicationDate}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">{latestNewsletterEdition.title}</h2>
                    <p className="text-sm leading-7 text-muted">{latestNewsletterEdition.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Latest Published Edition</Badge>
                      {latestNewsletterEdition.topics.map((topic) => <Badge key={topic}>{topic}</Badge>)}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button href={latestNewsletterEdition.linkedinUrl} target="_blank" rel="noopener noreferrer">Read Latest Edition</Button>
                      <Button href={NEWSLETTER_HOME} target="_blank" rel="noopener noreferrer" variant="secondary" leftIcon={<FaLinkedin className="h-4 w-4" />}>View Newsletter Home</Button>
                      <Button href={shareUrl} target="_blank" rel="noopener noreferrer" variant="ghost" leftIcon={<Share2 className="h-4 w-4" />}>Share</Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[...latestNewsletterEdition.relatedPublications, ...latestNewsletterEdition.relatedFrameworks, ...latestNewsletterEdition.relatedBooks, ...latestNewsletterEdition.relatedRepositories].map((item) => (
                        <Link key={`${item.label}-${item.href}`} href={item.href} className="rounded-2xl border border-border/70 bg-white/5 p-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10">{item.label}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="newsletter-archive-title">
        <SectionTitle eyebrow="Complete Newsletter Archive" title="Enterprise Intelligence Lab Editions" description="A structured publication archive populated exclusively from verified edition-level LinkedIn records." />
        <div id="newsletter-archive-title" className="space-y-5">
          <MetricGrid metrics={archiveStatistics} label="Newsletter archive statistics" />
            <div className="grid gap-4 lg:grid-cols-2">
              {newsletterEditions.map((edition, index) => (
                <Reveal key={edition.linkedinUrl} delay={index * 0.04}>
                  <Card className="h-full space-y-5 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
                    <div className="flex flex-wrap items-center justify-between gap-2"><Badge>Edition #{edition.edition}</Badge><span className="text-xs text-muted">{edition.publicationDate}</span></div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{edition.title}</h3>
                    {edition.summary ? <p className="text-sm leading-7 text-muted">{edition.summary}</p> : null}
                    <div className="flex flex-wrap gap-2"><Badge>{edition.category}</Badge>{edition.topics.map((topic) => <Badge key={topic}>{topic}</Badge>)}</div>
                    <div className="flex flex-wrap gap-3"><Button href={edition.linkedinUrl} target="_blank" rel="noopener noreferrer" size="sm">Read Edition</Button><Button href={edition.relatedPublications[0]?.href ?? "/research"} variant="secondary" size="sm">Related Research</Button></div>
                  </Card>
                </Reveal>
              ))}
            </div>
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="topic-coverage-title">
        <SectionTitle eyebrow="Enterprise AI Topic Coverage" title="Research and Engineering Domains" description="The recurring subject map for the Enterprise Intelligence Lab publication series." />
        <Card className="p-6 sm:p-7" >
          <div id="topic-coverage-title" className="flex flex-wrap gap-3">
            {newsletterTopics.map((topic) => (
              <span key={topic} className="rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary">{topic}</span>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-5" aria-labelledby="research-connections-title">
        <SectionTitle eyebrow="Research Connections" title="From Newsletter Insight to Research Artifact" description="Direct pathways from public thought leadership into frameworks, publications, benchmarks, books, and open implementation work." />
        <div id="research-connections-title" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {researchConnections.map((connection, index) => {
            const Icon = connectionIcons[index] ?? Network;
            return (
              <Reveal key={connection.title} delay={index * 0.04}>
                <Link href={connection.href} className="group block h-full rounded-3xl border border-border/70 bg-surface/80 p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">{connection.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{connection.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="research-impact-title">
        <SectionTitle eyebrow="Why This Newsletter Matters" title="Research Impact" description="A publication program designed to make Enterprise AI research useful, reusable, responsible, and accessible." />
        <div id="research-impact-title" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {researchImpact.map((item, index) => {
            const Icon = impactIcons[index] ?? Sparkles;
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <Card className="h-full space-y-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted">{item.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="publication-timeline-title">
        <SectionTitle eyebrow="Publication Timeline" title="Edition History" description="Newest-first chronology generated directly from verified newsletter edition records." />
        <div id="publication-timeline-title">
            <ol className="space-y-4">
              {[...newsletterEditions].sort((first, second) => second.edition - first.edition).map((edition, index) => (
                <Reveal key={`timeline-${edition.linkedinUrl}`} delay={index * 0.04}>
                  <li className="relative pl-8 sm:pl-10"><span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" /><span className="absolute left-[5px] top-9 h-[calc(100%+1rem)] w-px bg-border/80" aria-hidden="true" /><Card className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6"><div className="space-y-2"><div className="flex flex-wrap gap-2"><Badge>Edition #{edition.edition}</Badge><Badge>{edition.publicationDate}</Badge></div><h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{edition.title}</h3><p className="text-sm leading-7 text-muted">{edition.topics.join(" · ")}</p></div><Button href={edition.linkedinUrl} target="_blank" rel="noopener noreferrer" size="sm" leftIcon={<FaLinkedin className="h-4 w-4" />}>Read Edition</Button></Card></li>
                </Reveal>
              ))}
            </ol>
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="newsletter-metrics-title">
        <SectionTitle eyebrow="Newsletter Metrics" title="Publication and Research Signals" description="Edition, topic, reading-time, and cross-reference metrics computed from the newsletter archive." />
        <div id="newsletter-metrics-title"><MetricGrid metrics={newsletterMetrics} label="Newsletter publication metrics" /></div>
      </section>

      <section className="space-y-5" aria-labelledby="ecosystem-title">
        <SectionTitle eyebrow="Enterprise Intelligence Lab Ecosystem" title="Connected Research Publication System" description="The newsletter operates as a public communication layer across the wider research, engineering, service, and publication portfolio." />
        <Card className="p-6 sm:p-7">
          <div id="ecosystem-title" className="grid gap-3 md:grid-cols-[1fr_auto_1fr] lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
            {ecosystemConnections.map((item, index) => (
              <div key={item.title} className="contents">
                <Link href={item.href} className="flex min-h-20 items-center justify-center rounded-2xl border border-border/70 bg-surface/55 p-4 text-center text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-white/[0.07]">{item.title}</Link>
                {index < ecosystemConnections.length - 1 ? <span className="flex justify-center text-primary" aria-hidden="true"><ArrowDown className="h-4 w-4 md:hidden" /><ArrowRight className="hidden h-4 w-4 md:block" /></span> : null}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section aria-labelledby="newsletter-author-title">
        <Reveal>
          <Card className="overflow-hidden p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
              <ProfessionalPortrait size="section" ariaLabel="Rakesh Kumar Agrawal, author of the Enterprise Intelligence Lab Newsletter" />
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Author and Researcher</p>
                  <h2 id="newsletter-author-title" className="font-display text-3xl font-semibold tracking-tight text-foreground">{executiveProfile.name}</h2>
                  <p className="text-base font-medium text-primary">{executiveProfile.title}</p>
                </div>
                <div className="flex flex-wrap gap-2"><Badge>IEEE Senior Member</Badge><Badge>IETE Fellow</Badge><Badge>{executiveProfile.experienceLabel}</Badge></div>
                <p className="max-w-4xl text-sm leading-7 text-muted">{executiveProfile.professionalSummary}</p>
                <div className="flex flex-wrap gap-2">
                  {executiveProfile.links.map((link) => (
                    <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10">{link.label}</a>
                  ))}
                  <a href={NEWSLETTER_HOME} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10">Newsletter Home</a>
                </div>
                <Button href={topmateProfile.href} target={topmateProfile.target} rel={topmateProfile.rel} ariaLabel={topmateProfile.ariaLabel}>Book a Meeting</Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
