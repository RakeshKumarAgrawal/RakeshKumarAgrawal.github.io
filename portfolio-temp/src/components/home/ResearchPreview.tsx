import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { research } from "@/data/research";

export default function ResearchPreview() {
  return (
    <section id="research" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={research.eyebrow}
            title={research.title}
            description={research.description}
            action={<Button href="#projects" variant="secondary">Map research to execution</Button>}
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {research.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <Card className="h-full space-y-4 p-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Research theme</p>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                </div>

                <p className="text-sm leading-7 text-muted">{item.description}</p>

                {((item as { meta?: readonly string[] }).meta)?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {((item as { meta?: readonly string[] }).meta ?? []).map((tag) => (
                      <Badge key={tag} className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}