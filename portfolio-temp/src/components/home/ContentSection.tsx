import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import type { AuditMetadata } from "@/data/sources";

type ContentItem = {
  title: string;
  description: string;
  meta?: readonly string[];
  href?: string;
  linkLabel?: string;
  openInNewTab?: boolean;
  source?: string;
  sourceName?: string;
  sourceURL?: string;
  verified?: boolean;
  lastVerified?: string;
  identifierType?: string;
  identifier?: string;
  authors?: readonly string[];
  publicationType?: string;
  journal?: string;
  conference?: string;
  publicationDate?: string;
  repository?: string;
  version?: string;
  externalLinks?: readonly string[];
  audit?: AuditMetadata;
};

export type ContentSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ContentItem[];
};

type ContentSectionProps = {
  data: ContentSectionData;
  id: string;
};

export default function ContentSection({ data, id }: ContentSectionProps) {
  return (
    <section id={id} className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle eyebrow={data.eyebrow} title={data.title} description={data.description} />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <Card className="h-full space-y-4 p-6">
                <div className="space-y-3">
                  <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                    {data.eyebrow}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-muted">{item.description}</p>

                {item.href ? (
                  <a
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noreferrer" : undefined}
                    className="inline-flex text-sm font-medium text-primary transition hover:text-primary/80"
                  >
                    {item.linkLabel ?? "View Source"}
                  </a>
                ) : null}

                {item.identifier ? (
                  <p className="text-xs leading-5 text-muted">
                    {item.identifierType}: {item.identifier}
                  </p>
                ) : null}

                {item.meta?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {item.meta.map((meta) => (
                      <span
                        key={`${item.title}-${meta}`}
                        className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                      >
                        {meta}
                      </span>
                    ))}
                  </div>
                ) : null}

                {item.sourceURL ? (
                  <p className="text-xs leading-5 text-muted">
                    Source: {item.sourceName ?? item.source ?? "verified record"} ·{" "}
                    <a
                      href={item.sourceURL}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noreferrer" : undefined}
                      className="text-primary transition hover:text-primary/80"
                    >
                      {item.sourceURL}
                    </a>
                    {item.lastVerified ? ` · verified ${item.lastVerified}` : ""}
                  </p>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}