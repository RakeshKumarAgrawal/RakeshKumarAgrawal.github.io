"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Card from "@/components/ui/Card";
import type { ExecutiveFilter, ExecutiveTimelineItem } from "@/data/executiveDashboard";

type CareerTimelineProps = {
  items: ExecutiveTimelineItem[];
  activeFilter: ExecutiveFilter;
};

export default function CareerTimeline({ items, activeFilter }: CareerTimelineProps) {
  const [yearFilter, setYearFilter] = useState("All");

  const years = useMemo(
    () => Array.from(new Set(items.map((item) => item.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a)),
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter = activeFilter === "All" || item.filter === activeFilter;
      const matchesYear = yearFilter === "All" || item.date.startsWith(yearFilter);
      return matchesFilter && matchesYear;
    });
  }, [activeFilter, items, yearFilter]);

  return (
    <div className="space-y-4">
      <Card className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Filter by year</p>
        <div className="flex flex-wrap gap-2">
          {["All", ...years].map((year) => {
            const active = year === yearFilter;
            return (
              <button
                key={year}
                type="button"
                onClick={() => setYearFilter(year)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  active
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="space-y-4">
        {filteredItems.map((entry) => (
          <article key={entry.id} className="relative pl-8 sm:pl-10">
            <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
            <span className="absolute left-[5px] top-9 h-[calc(100%-1rem)] w-px bg-border/80" aria-hidden="true" />
            <Card className="space-y-2 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{entry.date}</p>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{entry.title}</h3>
              <p className="text-sm text-muted">{entry.domain}</p>
              <p className="text-sm leading-7 text-muted">{entry.description}</p>
              <Link
                href={entry.href}
                className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
              >
                View Details
              </Link>
            </Card>
          </article>
        ))}
      </div>
    </div>
  );
}
