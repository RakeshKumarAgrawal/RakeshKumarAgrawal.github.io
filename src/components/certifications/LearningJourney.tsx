import { motion } from "framer-motion";

import Card from "@/components/ui/Card";
import type { LearningStage } from "@/components/certifications/types";

type LearningJourneyProps = {
  stages: LearningStage[];
};

export default function LearningJourney({ stages }: LearningJourneyProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.04 }}
        >
          <Card className="h-full space-y-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{stage.title}</p>
            <p className="text-sm leading-7 text-muted">{stage.description}</p>
            <div className="flex flex-wrap gap-2">
              {stage.focus.map((focus) => (
                <span key={`${stage.id}-${focus}`} className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted">
                  {focus}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
