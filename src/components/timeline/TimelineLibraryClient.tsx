"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TimelineEntryCard from "@/components/timeline/TimelineEntryCard";
import Card from "@/components/ui/Card";
import type { TimelineEntry, TimelineFilterCategory } from "@/data/timelineLibrary";

type TimelineLibraryClientProps = {
  entries: readonly TimelineEntry[];
  filters: readonly TimelineFilterCategory[];
};

const allFilter = "All" as const;

export default function TimelineLibraryClient({ entries, filters }: TimelineLibraryClientProps) {
  const [activeFilter, setActiveFilter] = useState<TimelineFilterCategory | typeof allFilter>(allFilter);

  const filteredEntries = useMemo(() => {
    const scoped =
      activeFilter === allFilter
        ? entries
        : entries.filter((entry) => entry.category === activeFilter);

    return [...scoped].sort((a, b) => b.date.localeCompare(a.date));
  }, [activeFilter, entries]);

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Filter timeline</p>
        <div className="flex flex-wrap gap-2">
          {[allFilter, ...filters].map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  isActive
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border/80 bg-white/5 text-foreground hover:border-primary/40 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <TimelineEntryCard entry={entry} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
