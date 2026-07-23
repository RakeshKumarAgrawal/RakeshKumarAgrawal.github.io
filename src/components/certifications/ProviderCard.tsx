import Card from "@/components/ui/Card";

type ProviderCardProps = {
  provider: string;
  totalCertifications: number;
  categories: string[];
};

export default function ProviderCard({ provider, totalCertifications, categories }: ProviderCardProps) {
  return (
    <Card className="space-y-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07]">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 px-3 text-xs font-semibold tracking-[0.2em] text-primary">
          {provider.slice(0, 6).toUpperCase()}
        </div>
        <p className="font-display text-3xl font-semibold tracking-tight text-foreground">{totalCertifications}</p>
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{provider}</h3>
        <p className="mt-1 text-sm text-muted">{categories.length} categories represented</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={`${provider}-${category}`} className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted">
            {category}
          </span>
        ))}
      </div>
    </Card>
  );
}
