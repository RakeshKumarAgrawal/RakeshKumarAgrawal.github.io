"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import ResearchDomainCard from "@/components/research/ResearchDomainCard";
import Card from "@/components/ui/Card";

import type { ResearchDomain } from "@/data/researchDomains";

type ResearchHubClientProps = {
  domains: readonly ResearchDomain[];
};

export default function ResearchHubClient({ domains }: ResearchHubClientProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const statusOptions = useMemo(
    () => ["All", ...new Set(domains.map((domain) => domain.researchStatus))],
    [domains],
  );

  const filteredDomains = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return domains.filter((domain) => {
      const statusMatch = status === "All" || domain.researchStatus === status;
      const queryMatch =
        !normalizedQuery ||
        [
          domain.title,
          domain.summary,
          domain.researchStatus,
          ...domain.keywords,
          ...domain.relatedPublications.map((item) => item.title),
          ...domain.relatedRepositories.map((item) => item.title),
          ...domain.relatedDatasets.map((item) => item.title),
          ...domain.relatedFrameworks.map((item) => item.title),
          ...domain.futureWork,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return statusMatch && queryMatch;
    });
  }, [domains, query, status]);

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.8fr_0.9fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
            <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search domains, publications, repositories, datasets, frameworks, and future work"
              aria-label="Search research domains"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-sm text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em]">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
              aria-label="Filter by research status"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option} className="bg-surface text-foreground">
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      {filteredDomains.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredDomains.map((domain) => (
            <ResearchDomainCard key={domain.slug} domain={domain} />
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <p className="text-sm leading-7 text-muted">
            No research domains match the current filters. Try a broader keyword or reset status to All.
          </p>
        </Card>
      )}
    </div>
  );
}
