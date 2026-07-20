import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { statistics } from "@/data/statistics";

export default function StatisticsPreview() {
  return (
    <section id="statistics" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={statistics.eyebrow}
            title={statistics.title}
            description={statistics.description}
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistics.items.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <Card className="h-full space-y-4 p-6">
                <div className="flex items-end justify-between gap-4">
                  <p className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {item.value}
                  </p>
                  <span className="mb-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(56,189,248,0.14)]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-7 text-muted">{item.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}