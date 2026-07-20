import { ArrowRight, FileText, Sparkles } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-14 sm:pt-18 lg:pt-22">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-white/6 text-[0.66rem] tracking-[0.32em] text-accent">
                Enterprise portfolio
              </Badge>

              <div className="space-y-4">
                <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {profile.name}
                </p>

                <div className="space-y-2 border-l border-border/70 pl-5 sm:pl-6">
                  {profile.roles.map((role) => (
                    <p
                      key={role}
                      className="font-display text-xl font-medium tracking-tight text-foreground/90 sm:text-2xl lg:text-[2rem]"
                    >
                      {role}
                    </p>
                  ))}
                </div>
              </div>

              <p className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {profile.title}
              </p>

              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {profile.summary}
              </p>

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                Source: <a href={profile.sourceURL} className="text-primary transition hover:text-primary/80">{profile.sourceName}</a>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="#research" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Research
              </Button>
              <Button href="#projects" variant="secondary">
                Projects
              </Button>
              <Button href="#contact" variant="ghost" leftIcon={<FileText className="h-4 w-4" />}>
                Verified contact
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {profile.roles.map((item, index) => (
                <Card key={item} className="flex h-full flex-col justify-between space-y-6 p-5">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                      Profile {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {item}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-accent" aria-label="Rated five out of five stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={`${item}-${starIndex}`} className="text-lg leading-none">
                        ★
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/15 blur-3xl" />
            <Card className="relative overflow-hidden p-7 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Operating profile</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{profile.title}</h2>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="space-y-4 rounded-3xl border border-border/70 bg-surface-strong/80 p-5">
                  <p className="text-sm font-semibold text-foreground">Verified record summary</p>
                  <ul className="space-y-3 text-sm leading-6 text-muted">
                    <li>Large-scale IT operations across banking and healthcare domains.</li>
                    <li>Practical applications of AI, including intelligent healthcare and predictive analytics.</li>
                    <li>Reliability, ethics, and human-in-the-loop decision support.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Reveal>
        </Reveal>
      </Container>
    </section>
  );
}