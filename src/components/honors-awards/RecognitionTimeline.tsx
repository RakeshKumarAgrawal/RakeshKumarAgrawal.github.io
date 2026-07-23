import { motion } from "framer-motion";

import Card from "@/components/ui/Card";
import type { RecognitionRecord } from "@/components/honors-awards/types";

type RecognitionTimelineProps = {
  recognitions: RecognitionRecord[];
};

export default function RecognitionTimeline({ recognitions }: RecognitionTimelineProps) {
  return (
    <div className="space-y-4">
      {recognitions.map((entry, index) => (
        <motion.article
          key={entry.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.02 }}
          className="relative pl-8 sm:pl-10"
        >
          <span className="absolute left-0 top-6 h-3 w-3 rounded-full border border-primary/50 bg-primary" aria-hidden="true" />
          <span className="absolute left-[5px] top-9 h-[calc(100%-1rem)] w-px bg-border/80" aria-hidden="true" />

          <Card className="space-y-2 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{entry.issueDate.slice(0, 4)}</p>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{entry.title}</h3>
            <p className="text-sm text-muted">{entry.organization}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Category
              <span className="ml-2 text-foreground">{entry.category}</span>
            </p>
            <p className="text-sm leading-7 text-muted">{entry.description}</p>
          </Card>
        </motion.article>
      ))}
    </div>
  );
}
