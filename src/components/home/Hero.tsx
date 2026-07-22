import { ArrowRight, FileText, Sparkles } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import Reveal from "@/components/ui/Reveal";
import { executiveProfile } from "@/data/executiveProfile";
import { homeContent } from "@/data/homeContent";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-14 sm:pt-18 lg:pt-22">
      <Container className="space-y-10 lg:space-y-12">
        <Reveal className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="flex justify-center lg:hidden">
              <ProfessionalPortrait
                size="section"
                loading="lazy"
                ariaLabel="Professional profile image for hero introduction"
              />
            </div>

            <div className="space-y-6">
              <Badge className="bg-white/6 text-[0.66rem] tracking-[0.32em] text-accent">
                {homeContent.hero.badge}
              </Badge>

              <div className="space-y-4">
                <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {profile.name}
                </p>

                <p className="font-display text-2xl font-medium tracking-tight text-foreground/90 sm:text-3xl lg:text-[2.1rem]">
                  {executiveProfile.title}
                </p>
              </div>

              <p className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {profile.title}
              </p>

              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {profile.summary}
              </p>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Research interests</p>
                <div className="flex flex-wrap gap-2">
                  {executiveProfile.researchAreas.slice(0, 8).map((interest) => (
                    <span key={interest} className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs font-medium text-muted">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                {homeContent.hero.sourceLabel}: <a href={profile.sourceURL} className="text-primary transition hover:text-primary/80">{profile.sourceName}</a>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/research" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Research
              </Button>
              <Button href="/publications" variant="secondary">
                Publications
              </Button>
              <Button href="/#original-contributions-preview" variant="secondary">
                Projects
              </Button>
              <Button href="https://github.com/RakeshKumarAgrawal" target="_blank" rel="noreferrer" variant="secondary">
                GitHub
              </Button>
              <Button href="/contact" variant="ghost" leftIcon={<FileText className="h-4 w-4" />}>
                Contact
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {executiveProfile.technicalExpertise.slice(0, 3).map((item) => (
                <Card key={item} className="h-full space-y-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Technical focus</p>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">{item}</h3>
                </Card>
              ))}
            </div>
          </div>

          <Reveal delay={0.12} className="order-1 relative space-y-6 lg:order-2">
            <div className="hidden justify-center lg:flex">
              <ProfessionalPortrait
                size="hero"
                loading="lazy"
                ariaLabel="Professional profile image displayed beside introduction"
              />
            </div>

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
                  <p className="text-sm font-semibold text-foreground">{homeContent.hero.summaryTitle}</p>
                  <ul className="space-y-3 text-sm leading-6 text-muted">
                    {homeContent.hero.summaryPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
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