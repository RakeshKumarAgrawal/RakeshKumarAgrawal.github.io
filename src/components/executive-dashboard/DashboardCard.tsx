import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

type DashboardCardProps = {
  title: string;
  description: string;
  href: string;
  chips?: string[];
  external?: boolean;
};

export default function DashboardCard({ title, description, href, chips = [], external = false }: DashboardCardProps) {
  return (
    <Card className="space-y-4 p-5 transition duration-300 hover:border-primary/40 hover:bg-white/[0.07]">
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="text-sm leading-7 text-muted">{description}</p>

      {chips.length ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge key={`${title}-${chip}`}>{chip}</Badge>
          ))}
        </div>
      ) : null}

      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
        >
          View Details
        </a>
      ) : (
        <Link
          href={href}
          className="inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10"
        >
          View Details
        </Link>
      )}
    </Card>
  );
}
