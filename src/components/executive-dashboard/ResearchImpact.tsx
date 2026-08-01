import DashboardCard from "@/components/executive-dashboard/DashboardCard";
import Card from "@/components/ui/Card";
import type { DashboardLinkedCard } from "@/data/executiveDashboard";

type ResearchImpactProps = {
  cards: DashboardLinkedCard[];
  metrics: {
    works: number;
    citations: number;
    scholarlyProfiles: number;
    downloads: number;
  };
};

export default function ResearchImpact({ cards, metrics }: ResearchImpactProps) {
  const metricRows = [
    { label: "Works", value: metrics.works },
    { label: "Citations", value: metrics.citations },
    { label: "Scholarly Profiles", value: metrics.scholarlyProfiles },
    { label: "Downloads", value: metrics.downloads },
  ];

  const maxValue = Math.max(...metricRows.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      <Card className="space-y-4 p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">Citation Metrics</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metricRows.map((item) => (
            <div key={item.label} className="space-y-2 rounded-2xl border border-border/70 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{item.label}</p>
              <p className="font-display text-2xl font-semibold tracking-tight text-foreground">{item.value}</p>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.max((item.value / maxValue) * 100, 6)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <DashboardCard key={card.id} title={card.title} description={card.description} href={card.href} chips={card.chips} />
        ))}
      </div>
    </div>
  );
}
