import Card from "@/components/ui/Card";

import type { ServiceCategoryCard } from "@/data/professionalServiceLibrary";

type ProfessionalServiceCategoryCardProps = {
  category: ServiceCategoryCard;
};

export default function ProfessionalServiceCategoryCard({ category }: ProfessionalServiceCategoryCardProps) {
  return (
    <Card className="space-y-4 p-5">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">{category.title}</h3>
      <p className="text-sm leading-7 text-muted">{category.description}</p>

      <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Highlights</p>
        <ul className="space-y-2">
          {category.highlights.map((item) => (
            <li key={`${category.slug}-${item}`} className="text-sm leading-7 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
