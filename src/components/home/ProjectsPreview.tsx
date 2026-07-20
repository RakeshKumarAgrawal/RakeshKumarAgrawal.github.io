import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";

export default function ProjectsPreview() {
  return (
    <section id="projects" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={projects.eyebrow}
            title={projects.title}
            description={projects.description}
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <Card className="group h-full space-y-5 p-6 transition duration-300 hover:border-primary/35 hover:bg-surface-strong/85">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                    Program {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted">{item.description}</p>
                </div>
                {((item as { meta?: readonly string[] }).meta)?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {((item as { meta?: readonly string[] }).meta ?? []).map((meta) => (
                      <span
                        key={`${item.title}-${meta}`}
                        className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                      >
                        {meta}
                      </span>
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