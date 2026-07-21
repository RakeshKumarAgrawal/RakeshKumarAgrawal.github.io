import Card from "@/components/ui/Card";

type FrameworkArchitecturePlaceholderProps = {
  title: string;
  nodes: readonly string[];
};

export default function FrameworkArchitecturePlaceholder({
  title,
  nodes,
}: FrameworkArchitecturePlaceholderProps) {
  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">{title}</h2>

      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-surface to-accent/10 p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.2),transparent_60%)]" />

        <div className="relative grid gap-3 md:grid-cols-2">
          {nodes.map((node, index) => (
            <div
              key={`${node}-${index}`}
              className="rounded-xl border border-white/15 bg-background/55 px-3 py-3 text-sm font-medium text-foreground backdrop-blur"
            >
              <div className="mb-1 text-[0.65rem] uppercase tracking-[0.2em] text-primary">Layer {index + 1}</div>
              <div>{node}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
