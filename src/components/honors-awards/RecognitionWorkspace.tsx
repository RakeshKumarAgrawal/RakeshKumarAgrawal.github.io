"use client";

import { useMemo, useState } from "react";

import CareerImpact from "@/components/honors-awards/CareerImpact";
import FeaturedRecognition from "@/components/honors-awards/FeaturedRecognition";
import RecognitionCard from "@/components/honors-awards/RecognitionCard";
import RecognitionDashboard from "@/components/honors-awards/RecognitionDashboard";
import RecognitionFilters from "@/components/honors-awards/RecognitionFilters";
import RecognitionSearch from "@/components/honors-awards/RecognitionSearch";
import RecognitionTimeline from "@/components/honors-awards/RecognitionTimeline";
import type { HonorsAwardsDataset, RecognitionMetric, RecognitionRecord } from "@/components/honors-awards/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

type RecognitionWorkspaceProps = {
  dataset: HonorsAwardsDataset;
};

const byDateDesc = (left: RecognitionRecord, right: RecognitionRecord) => right.issueDate.localeCompare(left.issueDate);

const focusMatchers: Record<string, RegExp> = {
  Employer: /employer|organization/i,
  "Professional Society": /ieee|iete|society|professional/i,
  Research: /research|academic|physics|paper|conference/i,
  Leadership: /leadership|senior member|fellow/i,
  Innovation: /innovation/i,
};

const metricMatchers = {
  fellowships: /fellow/i,
  seniorMemberships: /senior member/i,
  employerRecognition: /employer/i,
  industryAwards: /industry|technical excellence|professional society|badge/i,
  communityRecognition: /community|service|appreciation/i,
  leadershipRecognition: /leadership|fellow|senior member/i,
  careerMilestones: /milestone|career|nsep|competition/i,
} as const;

export default function RecognitionWorkspace({ dataset }: RecognitionWorkspaceProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeYear, setActiveYear] = useState("All");
  const [activeOrganization, setActiveOrganization] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFocus, setActiveFocus] = useState("All");

  const years = useMemo(
    () => Array.from(new Set(dataset.recognitions.map((item) => item.issueDate.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
    [dataset.recognitions],
  );

  const organizations = useMemo(
    () => Array.from(new Set(dataset.recognitions.map((item) => item.organization))).sort((a, b) => a.localeCompare(b)),
    [dataset.recognitions],
  );

  const filteredRecognitions = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return dataset.recognitions.filter((recognition) => {
      const matchesYear = activeYear === "All" || recognition.issueDate.startsWith(activeYear);
      const matchesOrganization = activeOrganization === "All" || recognition.organization === activeOrganization;
      const matchesCategory = activeCategory === "All" || recognition.category === activeCategory;

      const searchable = `${recognition.title} ${recognition.organization} ${recognition.category} ${recognition.description} ${recognition.issueDate.slice(0, 4)} ${recognition.tags.join(" ")}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchable.includes(normalizedSearch);

      const matchesFocus =
        activeFocus === "All" ||
        focusMatchers[activeFocus]?.test(
          `${recognition.title} ${recognition.organization} ${recognition.category} ${recognition.description} ${recognition.tags.join(" ")}`,
        );

      return matchesYear && matchesOrganization && matchesCategory && matchesSearch && matchesFocus;
    });
  }, [activeYear, activeOrganization, activeCategory, activeFocus, dataset.recognitions, searchValue]);

  const featuredRecognitions = useMemo(
    () => filteredRecognitions.filter((item) => item.featured).sort((a, b) => a.displayOrder - b.displayOrder),
    [filteredRecognitions],
  );

  const timelineEntries = useMemo(() => [...filteredRecognitions].sort(byDateDesc), [filteredRecognitions]);

  const byCategory = useMemo(() => {
    return dataset.categories.map((category) => ({
      category,
      items: filteredRecognitions
        .filter((recognition) => recognition.category === category)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    }));
  }, [dataset.categories, filteredRecognitions]);

  const metrics = useMemo<RecognitionMetric[]>(() => {
    const counterText = (item: RecognitionRecord) =>
      `${item.title} ${item.organization} ${item.category} ${item.description} ${item.tags.join(" ")}`;

    const countBy = (matcher: RegExp) => filteredRecognitions.filter((item) => matcher.test(counterText(item))).length;

    return [
      {
        id: "total-honors-awards",
        title: "Total Honors & Awards",
        description: "Total recognitions currently represented in the executive recognition repository.",
        value: filteredRecognitions.length,
        icon: "award",
        href: "#recognition-categories",
      },
      {
        id: "professional-fellowships",
        title: "Professional Fellowships",
        description: "Recognitions associated with formal fellowship distinctions.",
        value: countBy(metricMatchers.fellowships),
        icon: "fellowship",
        href: "#recognition-categories",
      },
      {
        id: "senior-memberships",
        title: "Senior Memberships",
        description: "Senior membership recognitions in global professional societies.",
        value: countBy(metricMatchers.seniorMemberships),
        icon: "membership",
        href: "#recognition-categories",
      },
      {
        id: "employer-recognition",
        title: "Employer Recognition",
        description: "Employer-issued recognitions for performance, impact, and delivery excellence.",
        value: countBy(metricMatchers.employerRecognition),
        icon: "employer",
        href: "#recognition-categories",
      },
      {
        id: "industry-awards",
        title: "Industry Awards",
        description: "Industry-facing and professional-body recognitions.",
        value: countBy(metricMatchers.industryAwards),
        icon: "industry",
        href: "#featured-recognition",
      },
      {
        id: "community-recognition",
        title: "Community Recognition",
        description: "Community service, appreciation, and collaborative engagement recognitions.",
        value: countBy(metricMatchers.communityRecognition),
        icon: "community",
        href: "#career-impact",
      },
      {
        id: "leadership-recognition",
        title: "Leadership Recognition",
        description: "Recognitions highlighting technical and organizational leadership.",
        value: countBy(metricMatchers.leadershipRecognition),
        icon: "leadership",
        href: "#career-impact",
      },
      {
        id: "career-milestones",
        title: "Career Milestones",
        description: "Milestone recognitions reflecting progression and long-term professional impact.",
        value: countBy(metricMatchers.careerMilestones),
        icon: "milestone",
        href: "#recognition-timeline",
      },
    ];
  }, [filteredRecognitions]);

  return (
    <div className="space-y-8 sm:space-y-10">
      <section id="executive-dashboard" className="space-y-5" aria-label="Executive recognition dashboard">
        <SectionTitle
          eyebrow="Executive Dashboard"
          title="Recognition Intelligence"
          description="Premium KPIs, dynamic filters, and data-driven recognition evidence mapped to career achievements."
        />
        <RecognitionDashboard metrics={metrics} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr,1.3fr]" aria-label="Recognition search and filters">
        <Card className="space-y-4 p-5">
          <SectionTitle
            eyebrow="Recognition Discovery"
            title="Search Honors & Awards"
            description="Search by award, organization, category, or year to explore recognition records quickly."
          />
          <RecognitionSearch value={searchValue} onChange={setSearchValue} />

          <div className="flex flex-wrap gap-2">
            <Badge className="border-primary/20 bg-primary/10 text-primary">Records: {filteredRecognitions.length}</Badge>
            <Badge>Featured: {featuredRecognitions.length}</Badge>
            <Badge>Templates: {dataset.futureRecognitionTemplates.length}</Badge>
          </div>
        </Card>

        <RecognitionFilters
          years={years}
          organizations={organizations}
          categories={dataset.categories}
          activeYear={activeYear}
          activeOrganization={activeOrganization}
          activeCategory={activeCategory}
          activeFocus={activeFocus}
          onYearChange={setActiveYear}
          onOrganizationChange={setActiveOrganization}
          onCategoryChange={setActiveCategory}
          onFocusChange={setActiveFocus}
        />
      </section>

      <section id="featured-recognition" className="space-y-5" aria-label="Featured recognition">
        <SectionTitle
          eyebrow="Featured Recognition"
          title="Major Professional Distinctions"
          description="Highlighted recognitions across professional societies, employer awards, and academic milestones."
        />
        <FeaturedRecognition recognitions={featuredRecognitions} />
      </section>

      <section id="recognition-timeline" className="space-y-5" aria-label="Recognition timeline">
        <SectionTitle
          eyebrow="Timeline"
          title="Professional Recognition Timeline"
          description="Chronological view of recognitions, newest first, with category and organization context."
        />
        <RecognitionTimeline recognitions={timelineEntries} />
      </section>

      <section id="recognition-categories" className="space-y-5" aria-label="Recognition categories">
        <SectionTitle
          eyebrow="Award Categories"
          title="Expandable Recognition Repository"
          description="Each category expands into full recognition cards with verifiable evidence and metadata."
        />

        <div className="space-y-4">
          {byCategory.map(({ category, items }) => (
            <details
              key={category}
              className="group overflow-hidden rounded-3xl border border-border/70 bg-surface/70"
              open={items.length > 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{category}</h3>
                  <p className="text-sm text-muted">{items.length} recognition record(s)</p>
                </div>
                <span className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted transition group-open:border-primary/40 group-open:text-primary">
                  Expand
                </span>
              </summary>

              <div className="grid gap-4 border-t border-border/70 p-4 sm:p-5 lg:grid-cols-2">
                {items.length ? (
                  items.map((recognition) => <RecognitionCard key={recognition.id} recognition={recognition} />)
                ) : (
                  <Card className="p-5 lg:col-span-2">
                    <p className="text-sm text-muted">No records in this category for the current filters.</p>
                  </Card>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="career-impact" className="space-y-5" aria-label="Executive career impact">
        <SectionTitle
          eyebrow="Career Impact"
          title="Executive Career Impact"
          description="Recognition evidence mapped to leadership, innovation, enterprise outcomes, and professional growth."
        />
        <CareerImpact recognitions={filteredRecognitions} />
      </section>
    </div>
  );
}
