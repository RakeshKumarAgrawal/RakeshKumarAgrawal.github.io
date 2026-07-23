"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import Card from "@/components/ui/Card";
import type { CertificationRecord } from "@/components/certifications/types";

type CertificationTimelineProps = {
  certifications: CertificationRecord[];
};

export default function CertificationTimeline({ certifications }: CertificationTimelineProps) {
  const years = useMemo(() => {
    const values = Array.from(new Set(certifications.map((item) => item.issueDate.slice(0, 4))));
    return values.sort((a, b) => b.localeCompare(a));
  }, [certifications]);

  const [activeYear, setActiveYear] = useState<string>("All");

  const entries = useMemo(() => {
    const scoped = activeYear === "All" ? certifications : certifications.filter((item) => item.issueDate.startsWith(activeYear));
    return [...scoped].sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  }, [activeYear, certifications]);

  return (
    <div className="space-y-5">
      <Card className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Filter by year</p>
        <div className="flex flex-wrap gap-2">
          {["All", ...years].map((year) => {
            const active = activeYear === year;

            return (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
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
        {entries.map((entry) => (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative pl-8 sm:pl-10"
          >
            <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
            <span className="absolute left-[5px] top-9 h-[calc(100%-1rem)] w-px bg-border/80" aria-hidden="true" />
            <Card className="space-y-2 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{entry.issueDate}</p>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{entry.title}</h3>
              <p className="text-sm text-muted">{entry.provider}</p>
              <p className="text-sm leading-7 text-muted">{entry.description}</p>
            </Card>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
