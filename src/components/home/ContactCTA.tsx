import { ArrowRight } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import Reveal from "@/components/ui/Reveal";
import { externalProfiles } from "@/data/externalProfiles";
import { homeContent } from "@/data/homeContent";
import { profile } from "@/data/profile";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-8 pb-20 sm:py-10 sm:pb-24">
      <Container>
        <Reveal>
          <Card className="overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className="space-y-5">
                <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">{homeContent.contact.badge}</Badge>
                <div className="space-y-3">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {homeContent.contact.title}
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
                    {homeContent.contact.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.verifiedEmails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="rounded-full border border-border/70 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-border/70 bg-surface/55 p-5">
                <div className="flex items-center gap-4">
                  <ProfessionalPortrait
                    size="compact"
                    loading="lazy"
                    ariaLabel="Professional profile portrait near contact information"
                  />
                  <div className="space-y-1">
                    <p className="font-display text-lg font-semibold tracking-tight text-foreground">{profile.name}</p>
                    <p className="text-sm text-muted">{profile.roles[0]}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{profile.organization}</p>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-muted">
                  <p><span className="font-semibold text-foreground">Research Focus:</span> {profile.keywords.join(" · ")}</p>
                  <p><span className="font-semibold text-foreground">Location:</span> {profile.country}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {externalProfiles.items.slice(0, 4).map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noreferrer" : undefined}
                      className="rounded-full border border-border/70 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted transition hover:border-primary/30 hover:text-primary"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href="#projects" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    {homeContent.contact.primaryAction}
                  </Button>
                  <Button href="#external-profiles" variant="secondary">
                    {homeContent.contact.secondaryAction}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {externalProfiles.items.slice(0, 3).map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noreferrer" : undefined}
                  className="rounded-full border border-border/70 bg-white/5 px-4 py-2 text-sm font-medium text-muted transition hover:border-primary/30 hover:text-primary"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}