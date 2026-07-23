"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Card from "@/components/ui/Card";
import type { UnifiedSearchEntry } from "@/data/executiveDashboard";

type UnifiedSearchProps = {
  entries: UnifiedSearchEntry[];
};

export default function UnifiedSearch({ entries }: UnifiedSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.category))).sort((a, b) => a.localeCompare(b)),
    [entries],
  );

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries
      .filter((entry) => {
        const matchesCategory = category === "All" || entry.category === category;
        if (!matchesCategory) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const text = `${entry.title} ${entry.description} ${entry.category} ${entry.keywords.join(" ")}`.toLowerCase();
        return text.includes(normalizedQuery);
      })
      .slice(0, 16);
  }, [category, entries, query]);

  return (
    <div className="space-y-4">
      <Card className="space-y-4 p-5">
        <label className="space-y-2 block">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Unified Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search publications, projects, research, frameworks, certifications, awards, articles, newsletters, service, and datasets"
            className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/40"
          />
        </label>

        <label className="space-y-2 block">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-2xl border border-border/80 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            {["All", ...categories].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {results.map((result) => (
          <Card key={result.id} className="space-y-2 p-4 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{result.category}</p>
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{result.title}</h3>
            <p className="text-sm text-muted">{result.description}</p>
            <Link
              href={result.href}
              className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
