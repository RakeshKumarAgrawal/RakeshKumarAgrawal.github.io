"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { CertificationRecord } from "@/components/certifications/types";

type CertificationCardProps = {
  certification: CertificationRecord;
};

export default function CertificationCard({ certification }: CertificationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `certification-panel-${certification.id}`;

  return (
    <motion.article
      layout
      className="group"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="space-y-4 p-5 transition duration-300 group-hover:border-primary/40 group-hover:bg-white/[0.07]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-xs font-semibold tracking-[0.18em] text-primary">
              {certification.logo}
            </span>
            <div className="space-y-1">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{certification.title}</h3>
              <p className="text-sm text-muted">{certification.provider}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{certification.issueDate}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {certification.featured ? (
              <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">Featured</Badge>
            ) : null}
            <Badge>{certification.status}</Badge>
          </div>
        </div>

        <p className="text-sm leading-7 text-muted">{certification.description}</p>

        <div className="flex flex-wrap gap-2">
          {certification.skills.map((skill) => (
            <Badge key={`${certification.id}-${skill}`}>{skill}</Badge>
          ))}
        </div>

        <div className="grid gap-3 rounded-2xl border border-border/70 bg-surface/60 p-4 sm:grid-cols-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Category
            <span className="ml-2 text-foreground">{certification.category}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Subcategory
            <span className="ml-2 text-foreground">{certification.subcategory}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Digital Badge
            <span className="ml-2 text-foreground">{certification.badge ? "Yes" : "No"}</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Credential ID
            <span className="ml-2 text-foreground">{certification.credentialId ?? "Not Available"}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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

          {certification.verificationUrl ? (
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary/40"
            >
              Verify
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              id={panelId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3 border-t border-border/70 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Related technologies</p>
                <div className="flex flex-wrap gap-2">
                  {certification.relatedTechnologies.map((technology) => (
                    <Badge key={`${certification.id}-${technology}`}>{technology}</Badge>
                  ))}
                </div>

                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Active
                  <span className="ml-2 text-foreground">{certification.active ? "Yes" : "No"}</span>
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </motion.article>
  );
}
