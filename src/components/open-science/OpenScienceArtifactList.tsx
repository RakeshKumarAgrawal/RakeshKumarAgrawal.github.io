import Card from "@/components/ui/Card";

import type { OpenScienceLinkedItem } from "@/data/openScienceProfiles";

type OpenScienceArtifactListProps = {
  title: string;
  items: readonly OpenScienceLinkedItem[];
  emptyLabel: string;
};

const isInternalRoute = (href: string) => href.startsWith("/");

export default function OpenScienceArtifactList({ title, items, emptyLabel }: OpenScienceArtifactListProps) {
  return (
    <Card className="h-full space-y-4 p-4">
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{title}</h4>
      {items.length ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={`${title}-${item.title}`} className="rounded-xl border border-border/70 bg-white/5 p-3">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              {item.description ? <p className="mt-2 text-xs leading-6 text-muted">{item.description}</p> : null}
              {item.href ? (
                <a
                  href={item.href}
                  target={isInternalRoute(item.href) ? undefined : "_blank"}
                  rel={isInternalRoute(item.href) ? undefined : "noreferrer"}
                  className="mt-2 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-primary/80"
                >
                  Open
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-muted">{emptyLabel}</p>
      )}
    </Card>
  );
}
