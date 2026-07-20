import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { skills } from "@/data/skills";

export default function SkillsPreview() {
  return (
    <section id="skills" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={skills.eyebrow}
            title={skills.title}
            description={skills.description}
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skills.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <Card className="flex h-full flex-col justify-between space-y-6 p-6 transition duration-300 hover:border-primary/35 hover:bg-surface-strong/85">
                <div className="space-y-3">
                  <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                    Skill {String(index + 1).padStart(2, "0")}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-accent" aria-label="Rated five out of five stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={`${item.title}-${starIndex}`} className="text-lg leading-none">
                      ★
                    </span>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}