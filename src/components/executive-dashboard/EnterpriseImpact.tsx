import DashboardCard from "@/components/executive-dashboard/DashboardCard";
import type { DashboardLinkedCard } from "@/data/executiveDashboard";

type EnterpriseImpactProps = {
  cards: DashboardLinkedCard[];
};

export default function EnterpriseImpact({ cards }: EnterpriseImpactProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <DashboardCard key={card.id} title={card.title} description={card.description} href={card.href} chips={card.chips} />
      ))}
    </div>
  );
}
