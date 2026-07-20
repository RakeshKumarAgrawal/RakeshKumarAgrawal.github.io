import { ArrowRight } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { externalProfiles } from "@/data/externalProfiles";
import { profile } from "@/data/profile";

export default function ContactCTA() {
  return (
    <section id="contact" className="py-8 pb-20 sm:py-10 sm:pb-24">
      <Container>
        <Reveal>
          <Card className="overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_auto] lg:items-end">
              <div className="space-y-5">
                <Badge className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.24em] text-primary">Contact</Badge>
                <div className="space-y-3">
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Verified contact channels
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
                    Public email addresses and profile links surfaced in the verified source set.
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

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button href="#projects" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Review verified work
                </Button>
                <Button href="#external-profiles" variant="secondary">
                  View profile links
                </Button>
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