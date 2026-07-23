import Link from "next/link";

import Card from "@/components/ui/Card";

type QuickAccessProps = {
  links: Array<{ id: string; label: string; href: string; external?: boolean }>;
};

export default function QuickAccess({ links }: QuickAccessProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {links.map((item) => (
        <Card key={item.id} className="p-0">
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl px-5 py-4 text-sm font-semibold tracking-[0.08em] text-foreground transition hover:bg-white/10"
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.href}
              className="block rounded-3xl px-5 py-4 text-sm font-semibold tracking-[0.08em] text-foreground transition hover:bg-white/10"
            >
              {item.label}
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
