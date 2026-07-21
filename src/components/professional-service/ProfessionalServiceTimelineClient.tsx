"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { ServiceCategory, ServiceTimelineEntry } from "@/data/professionalServiceLibrary";

type ProfessionalServiceTimelineClientProps = {
  entries: readonly ServiceTimelineEntry[];
  filters: readonly ServiceCategory[];
};

type TimelineCardProps = {
  entry: ServiceTimelineEntry;
};

function TimelineCard({ entry }: TimelineCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article layout className="relative pl-8 sm:pl-10">
      <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
      <span className="absolute left-[5px] top-9 h-[calc(100%-1rem)] w-px bg-border/80" aria-hidden="true" />

      <Card className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                {entry.category}
              </Badge>
              <Badge>{entry.status}</Badge>
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{entry.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{entry.date}</p>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/40 hover:bg-white/10"
            aria-expanded={expanded}
          >
            {expanded ? "Collapse" : "Expand"}
            <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm leading-7 text-muted">{entry.summary}</p>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="service-entry-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-2 border-t border-border/70 pt-4">
                {entry.details.map((detail) => (
                  <p key={`${entry.id}-${detail}`} className="text-sm leading-7 text-muted">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </motion.article>
  );
}

const allFilter = "All" as const;

export default function ProfessionalServiceTimelineClient({ entries, filters }: ProfessionalServiceTimelineClientProps) {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory | typeof allFilter>(allFilter);

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
              <TimelineCard entry={entry} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
