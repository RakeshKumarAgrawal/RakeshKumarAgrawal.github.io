import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { homeContent } from "@/data/homeContent";
import { memberships } from "@/data/memberships";
import { profile } from "@/data/profile";
import { researchAreas } from "@/data/researchAreas";

export default function AboutPreview() {
  return (
    <section id="about" className="py-6 sm:py-8">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow={homeContent.about.eyebrow}
            title={homeContent.about.title}
            description={profile.biography}
            action={<Button href="#experience" variant="secondary">{homeContent.about.actionLabel}</Button>}
          />
        </Reveal>

        <Reveal>
          <Card className="p-6 sm:p-7">
            <div className="grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
              <div className="flex justify-center lg:justify-start">
                <ProfessionalPortrait
                  size="section"
                  loading="lazy"
                  ariaLabel="Professional profile portrait on About section"
                />
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Biography</h3>
                  <p className="text-sm leading-7 text-muted">{profile.biography}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/55 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Research Interests</h4>
                    <p className="text-sm leading-7 text-muted">{profile.keywords.join(" · ")}</p>
                  </div>

                  <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/55 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Professional Summary</h4>
                    <p className="text-sm leading-7 text-muted">{profile.summary}</p>
                  </div>

                  <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/55 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Professional Memberships</h4>
                    <ul className="space-y-1.5">
                      {memberships.items.slice(0, 4).map((item) => (
                        <li key={`${item.organization}-${item.role}`} className="text-sm leading-6 text-muted">
                          {item.organization} · {item.role}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/55 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Research Areas</h4>
                    <ul className="space-y-1.5">
                      {researchAreas.items.map((item) => (
                        <li key={item.title} className="text-sm leading-6 text-muted">
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}