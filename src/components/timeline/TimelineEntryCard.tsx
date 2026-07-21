"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { TimelineEntry } from "@/data/timelineLibrary";

import TimelineArtifactList from "./TimelineArtifactList";

type TimelineEntryCardProps = {
  entry: TimelineEntry;
};

const panelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

export default function TimelineEntryCard({ entry }: TimelineEntryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `timeline-entry-panel-${entry.id}`;

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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {entry.milestoneType} · {entry.date}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/40 hover:bg-white/10"
            aria-expanded={expanded}
            aria-controls={panelId}
          >
            {expanded ? "Collapse" : "Expand"}
            <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm leading-7 text-muted">{entry.summary}</p>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key={panelId}
              id={panelId}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 border-t border-border/70 pt-4">
                <ul className="space-y-2">
                  {entry.details.map((item) => (
                    <li key={item} className="text-sm leading-7 text-muted">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="grid gap-3 lg:grid-cols-3">
                  <TimelineArtifactList title="Frameworks" items={entry.frameworks} emptyLabel="No linked frameworks." />
                  <TimelineArtifactList title="Publications" items={entry.publications} emptyLabel="No linked publications." />
                  <TimelineArtifactList title="Datasets" items={entry.datasets} emptyLabel="No linked datasets." />
                  <TimelineArtifactList title="Projects" items={entry.projects} emptyLabel="No linked projects." />
                  <TimelineArtifactList title="GitHub" items={entry.repositories} emptyLabel="No linked repositories." />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </motion.article>
  );
}
