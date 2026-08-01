"use client";

import { useMemo, useState } from "react";

import CareerTimeline from "@/components/executive-dashboard/CareerTimeline";
import EnterpriseImpact from "@/components/executive-dashboard/EnterpriseImpact";
import ExecutiveKPIs from "@/components/executive-dashboard/ExecutiveKPIs";
import ExecutiveSummary from "@/components/executive-dashboard/ExecutiveSummary";
import OpenScienceDashboard from "@/components/executive-dashboard/OpenScienceDashboard";
import ProfessionalExcellence from "@/components/executive-dashboard/ProfessionalExcellence";
import QuickAccess from "@/components/executive-dashboard/QuickAccess";
import RecognitionDashboard from "@/components/executive-dashboard/RecognitionDashboard";
import ResearchImpact from "@/components/executive-dashboard/ResearchImpact";
import TechnicalSkillsDashboard from "@/components/executive-dashboard/TechnicalSkillsDashboard";
import UnifiedSearch from "@/components/executive-dashboard/UnifiedSearch";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  executiveFilters,
  executiveMetrics,
  executiveOverview,
  executiveSignals,
  executiveTimeline,
  enterpriseImpactCards,
  openScienceCards,
  professionalExcellenceCards,
  quickAccessLinks,
  recognitionCards,
  researchImpactCards,
  technicalSkills,
  unifiedSearchEntries,
  type ExecutiveFilter,
} from "@/data/executiveDashboard";

export default function ExecutiveDashboard() {
  const [activeFilter, setActiveFilter] = useState<ExecutiveFilter>("All");

  const filteredMetrics = useMemo(
    () => executiveMetrics.filter((metric) => activeFilter === "All" || metric.filter === activeFilter),
    [activeFilter],
  );

  const filteredTimeline = useMemo(
    () => executiveTimeline.filter((entry) => activeFilter === "All" || entry.filter === activeFilter),
    [activeFilter],
  );

  const filteredSkills = useMemo(() => {
    if (activeFilter === "All") {
      return technicalSkills;
    }

    if (activeFilter === "Artificial Intelligence") {
      return technicalSkills.filter((item) => /ai|llm|observability|automation/i.test(item.skill));
    }

    if (activeFilter === "Cloud") {
      return technicalSkills.filter((item) => /cloud|aws|azure|gcp/i.test(item.skill));
    }

    if (activeFilter === "Engineering") {
      return technicalSkills.filter((item) => /platform|sre|devsecops|architecture|data engineering/i.test(item.skill));
    }

    return technicalSkills;
  }, [activeFilter]);

  return (
    <div className="space-y-8 sm:space-y-10">
      <section id="executive-overview" className="space-y-5" aria-label="Executive overview">
        <SectionTitle
          eyebrow="Executive Overview"
          title="Executive Summary"
          description="A strategic profile snapshot covering career journey, leadership scope, research direction, and mission alignment."
        />
        <ExecutiveSummary items={executiveOverview} />
      </section>

      <section id="executive-filtering" className="space-y-3" aria-label="Dashboard filters">
        <Card className="space-y-4 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Filters</p>
          <div className="flex flex-wrap gap-2">
            {executiveFilters.map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    active
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="border-primary/20 bg-primary/10 text-primary">Metrics: {filteredMetrics.length}</Badge>
            <Badge>Timeline Entries: {filteredTimeline.length}</Badge>
            <Badge>Skills: {filteredSkills.length}</Badge>
            <Badge>Open Profiles: {executiveSignals.openIdentityCount}</Badge>
          </div>
        </Card>
      </section>

      <section id="executive-kpis" className="space-y-5" aria-label="Executive KPI dashboard">
        <SectionTitle
          eyebrow="Executive KPI Dashboard"
          title="Portfolio Intelligence Metrics"
          description="Animated KPI cards with progress indicators and drill-down links to dedicated detail pages."
        />
        <ExecutiveKPIs metrics={filteredMetrics} />
      </section>

      <section id="research-impact" className="space-y-5" aria-label="Research impact">
        <SectionTitle
          eyebrow="Research Impact"
          title="Research Signal Aggregation"
          description="Connected view of publications, original contributions, frameworks, datasets, projects, and citation metrics."
        />
        <ResearchImpact
          cards={researchImpactCards}
          metrics={{
            works: executiveSignals.works,
            citations: executiveSignals.citations,
            scholarlyProfiles: executiveSignals.scholarlyProfiles,
            downloads: executiveSignals.downloads,
          }}
        />
      </section>

      <section id="professional-excellence" className="space-y-5" aria-label="Professional excellence">
        <SectionTitle
          eyebrow="Professional Excellence"
          title="Credentials, Service, and Community Contributions"
          description="Unified aggregation of certifications, memberships, service timelines, editorial activity, and peer-review indicators."
        />
        <ProfessionalExcellence cards={professionalExcellenceCards} />
      </section>

      <section id="honors-recognition" className="space-y-5" aria-label="Honors and recognition">
        <SectionTitle
          eyebrow="Honors & Recognition"
          title="Recognition Dashboard"
          description="Executive summary of honors, awards, fellowships, memberships, and innovation recognition."
        />
        <RecognitionDashboard cards={recognitionCards} />
      </section>

      <section id="open-science" className="space-y-5" aria-label="Open science profiles">
        <SectionTitle
          eyebrow="Open Science"
          title="Global Research Identity"
          description="Connected scholarly and professional profiles spanning ORCID, Scholar networks, repositories, and data commons."
        />
        <OpenScienceDashboard cards={openScienceCards} />
      </section>

      <section id="technical-expertise" className="space-y-5" aria-label="Technical expertise">
        <SectionTitle
          eyebrow="Technical Expertise"
          title="Skills Intelligence Dashboard"
          description="Skill-level view connecting expertise areas with supporting certifications and related research domains."
        />
        <TechnicalSkillsDashboard skills={filteredSkills} />
      </section>

      <section id="career-timeline" className="space-y-5" aria-label="Career timeline">
        <SectionTitle
          eyebrow="Career Timeline"
          title="Unified Professional Timeline"
          description="A consolidated timeline combining career, research, awards, memberships, certifications, projects, publications, and milestones."
        />
        <CareerTimeline items={filteredTimeline} activeFilter={activeFilter} />
      </section>

      <section id="enterprise-impact" className="space-y-5" aria-label="Enterprise impact">
        <SectionTitle
          eyebrow="Enterprise Impact"
          title="Executive Impact Domains"
          description="Portfolio-wide impact indicators across enterprise AI, cloud transformation, innovation, leadership, and open engineering."
        />
        <EnterpriseImpact cards={enterpriseImpactCards} />
      </section>

      <section id="quick-access" className="space-y-5" aria-label="Quick access links">
        <SectionTitle
          eyebrow="Quick Access"
          title="Command Center Navigation"
          description="Fast entry points to every major page in the portfolio experience."
        />
        <QuickAccess links={quickAccessLinks} />
      </section>

      <section id="global-search" className="space-y-5" aria-label="Global search">
        <SectionTitle
          eyebrow="Global Search"
          title="Unified Discovery"
          description="Search across publications, projects, research, frameworks, certifications, awards, articles, newsletters, service, and datasets."
        />
        <UnifiedSearch entries={unifiedSearchEntries} />
      </section>
    </div>
  );
}
