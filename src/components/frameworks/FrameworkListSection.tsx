import Card from "@/components/ui/Card";

type FrameworkListSectionProps = {
  title: string;
  items: readonly string[];
};

export default function FrameworkListSection({ title, items }: FrameworkListSectionProps) {
  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-7 text-muted">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
