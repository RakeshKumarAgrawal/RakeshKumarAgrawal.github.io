import Card from "@/components/ui/Card";
import type { ExecutiveOverviewItem } from "@/data/executiveDashboard";

type ExecutiveSummaryProps = {
  items: ExecutiveOverviewItem[];
};

export default function ExecutiveSummary({ items }: ExecutiveSummaryProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <Card key={item.label} className="space-y-2 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{item.label}</p>
          <p className="text-sm leading-7 text-foreground/90">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
