import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { employment } from "@/data/employment";

export default function ExperienceTimeline() {
  const [currentRole, ...previousRoles] = employment.items;

  return (
    <section id="experience" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={employment.eyebrow}
            title={employment.title}
            description={employment.description}
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <Card className="space-y-5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                Current Role
              </p>
              <div className="space-y-3">
                <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  {currentRole.period}
                </p>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {currentRole.role}
                </h3>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
                  {currentRole.organization}
                </p>
              </div>
              <a href={currentRole.url} className="inline-flex text-sm font-medium text-primary transition hover:text-primary/80">
                Source
              </a>
            </Card>
          </Reveal>

          <div className="relative space-y-4 pl-4 before:absolute before:bottom-6 before:left-6 before:top-6 before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-accent/40 before:to-transparent sm:pl-8">
            {previousRoles.map((item, index) => (
              <Reveal key={item.organization} delay={index * 0.08}>
                <div className="relative pl-8 sm:pl-12">
                  <span className="absolute left-0 top-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 bg-background">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(56,189,248,0.12)]" />
                  </span>
                  <Card className="space-y-3 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                      Previous Role
                    </p>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {item.role}
                    </h3>
                    <p className="max-w-3xl text-sm leading-7 text-muted">
                      {item.organization} · {item.period}
                    </p>
                    {item.url ? (
                      <a href={item.url} className="inline-flex text-sm font-medium text-primary transition hover:text-primary/80">
                        Source
                      </a>
                    ) : null}
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}