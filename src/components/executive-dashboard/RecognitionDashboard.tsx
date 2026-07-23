import DashboardCard from "@/components/executive-dashboard/DashboardCard";
import type { DashboardLinkedCard } from "@/data/executiveDashboard";

type RecognitionDashboardProps = {
  cards: DashboardLinkedCard[];
};

export default function RecognitionDashboard({ cards }: RecognitionDashboardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <DashboardCard key={card.id} title={card.title} description={card.description} href={card.href} chips={card.chips} />
      ))}
    </div>
  );
}
