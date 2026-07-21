import Card from "@/components/ui/Card";

import type { ServiceStatistic } from "@/data/professionalServiceLibrary";

type ProfessionalServiceStatCardProps = {
  stat: ServiceStatistic;
};

export default function ProfessionalServiceStatCard({ stat }: ProfessionalServiceStatCardProps) {
  return (
    <Card className="space-y-3 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{stat.label}</p>
      <p className="font-display text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
      <p className="text-sm leading-7 text-muted">{stat.description}</p>
    </Card>
  );
}
