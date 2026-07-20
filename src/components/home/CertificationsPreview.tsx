import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { certifications } from "@/data/certifications";

export default function CertificationsPreview() {
  return (
    <section id="credentials" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={certifications.eyebrow}
            title={certifications.title}
            description={certifications.description}
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {certifications.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <Card className="h-full space-y-4 p-6">
                <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">
                  Credential {String(index + 1).padStart(2, "0")}
                </Badge>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="text-sm leading-7 text-muted">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}