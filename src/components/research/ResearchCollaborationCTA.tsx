import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { topmateProfile } from "@/data/profileLinks";

export default function ResearchCollaborationCTA() {
  return (
    <Card className="space-y-4 p-5 sm:p-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Interested in collaborating?</h2>
        <p className="text-sm leading-7 text-muted sm:text-base">
          Let&apos;s discuss research collaborations, enterprise AI strategy, platform engineering, open science initiatives, or speaking opportunities.
        </p>
      </div>
      <Button
        href={topmateProfile.href}
        target={topmateProfile.target}
        rel={topmateProfile.rel}
        ariaLabel={topmateProfile.ariaLabel}
      >
        Book a Meeting
      </Button>
    </Card>
  );
}
