import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { profile } from "@/data/profile";
import { employment } from "@/data/employment";

export default function AboutPreview() {
  return (
    <section id="about" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="About"
            title="Verified public profile"
            description={profile.biography}
            action={<Button href="#experience" variant="secondary">See experience</Button>}
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {employment.items.map((item, index) => (
            <Reveal key={item.organization} delay={index * 0.08}>
              <Card className="h-full space-y-4 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{item.organization}</h3>
                <p className="text-sm leading-7 text-muted">{item.role}</p>
                <p className="text-xs leading-6 text-muted">{item.period} · {item.location}</p>
                <a href={item.url} className="inline-flex text-sm font-medium text-primary transition hover:text-primary/80">
                  Source
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}