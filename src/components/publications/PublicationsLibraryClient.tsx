"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import PublicationCard from "@/components/publications/PublicationCard";
import Card from "@/components/ui/Card";
import type {
  PublicationCategory,
  PublicationLibraryItem,
  PublicationSortValue,
  PublicationStatus,
} from "@/data/publicationsLibrary";

type SortOption = {
  value: PublicationSortValue;
  label: string;
};

type PublicationsLibraryClientProps = {
  items: readonly PublicationLibraryItem[];
  categories: readonly PublicationCategory[];
  statuses: readonly PublicationStatus[];
  sortOptions: readonly SortOption[];
};

const sortItems = (items: PublicationLibraryItem[], sortBy: PublicationSortValue) => {
  const sorted = [...items];

  if (sortBy === "newest") {
    return sorted.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate));
  }

  if (sortBy === "oldest") {
    return sorted.sort((a, b) => a.publicationDate.localeCompare(b.publicationDate));
  }

  if (sortBy === "title-asc") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === "title-desc") {
    return sorted.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (sortBy === "category") {
    return sorted.sort((a, b) => a.category.localeCompare(b.category));
  }

  return sorted.sort((a, b) => a.status.localeCompare(b.status));
};

export default function PublicationsLibraryClient({
  items,
  categories,
  statuses,
  sortOptions,
}: PublicationsLibraryClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PublicationCategory | "All">("All");
  const [status, setStatus] = useState<PublicationStatus | "All">("All");
  const [sortBy, setSortBy] = useState<PublicationSortValue>("newest");

  const filteredAndSorted = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const statusMatch = status === "All" || item.status === status;
      const queryMatch =
        !normalized ||
        [
          item.title,
          item.abstract,
          item.publication,
          item.category,
          item.status,
          ...item.authors,
          ...item.keywords,
          item.citation,
          item.doi ?? "",
          ...item.githubRepositories.map((artifact) => artifact.title),
          ...item.relatedFrameworks.map((artifact) => artifact.title),
          ...item.relatedDatasets.map((artifact) => artifact.title),
          ...item.relatedProjects.map((artifact) => artifact.title),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      return categoryMatch && statusMatch && queryMatch;
    });

    return sortItems(filtered, sortBy);
  }, [category, items, query, sortBy, status]);

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40 lg:col-span-2">
            <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, abstract, authors, DOI, citation, keywords, and related artifacts"
              aria-label="Search publications"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-sm text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em]">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as PublicationCategory | "All")}
              aria-label="Filter by category"
              className="w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="All" className="bg-surface text-foreground">
                All
              </option>
              {categories.map((value) => (
                <option key={value} value={value} className="bg-surface text-foreground">
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-sm text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em]">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as PublicationStatus | "All")}
              aria-label="Filter by status"
              className="w-full bg-transparent text-sm text-foreground outline-none"
            >
              <option value="All" className="bg-surface text-foreground">
                All
              </option>
              {statuses.map((value) => (
                <option key={value} value={value} className="bg-surface text-foreground">
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-sm text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40 lg:col-span-2">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.24em]">Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as PublicationSortValue)}
              aria-label="Sort publications"
              className="w-full bg-transparent text-sm text-foreground outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-surface text-foreground">
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      {filteredAndSorted.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredAndSorted.map((item) => (
            <PublicationCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <p className="text-sm leading-7 text-muted">
            No publications match the current filters. Try resetting category/status or broadening your search.
          </p>
        </Card>
      )}
    </div>
  );
}
