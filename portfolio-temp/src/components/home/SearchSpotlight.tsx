import { Search } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { search } from "@/data/search";

export default function SearchSpotlight() {
  return (
    <section id="search" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={search.eyebrow}
            title={search.title}
            description={search.description}
          />
        </Reveal>

        <Reveal>
          <Card className="space-y-5 p-6 sm:p-7">
            <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-4 text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
              <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <input
                type="search"
                readOnly
                value={search.placeholder}
                aria-label={search.placeholder}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {search.scopes.map((scope) => (
                <Badge key={scope} className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                  {scope}
                </Badge>
              ))}
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}