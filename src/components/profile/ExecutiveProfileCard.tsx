import {
  BookOpenText,
  Building2,
  ExternalLink,
  Fingerprint,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

import Button from "@/components/ui/Button";
import ProfessionalPortrait from "@/components/profile/ProfessionalPortrait";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { topmateProfile } from "@/data/profileLinks";
import {
  executiveProfile,
  type ExecutiveProfileConfig,
  type ExecutiveProfileLink,
  type ExecutiveProfileLinkKey,
} from "@/data/executiveProfile";

type ExecutiveProfileCardVariant = "default" | "compact";

type ExecutiveProfileCardProps = {
  config?: ExecutiveProfileConfig;
  variant?: ExecutiveProfileCardVariant;
  className?: string;
};

const iconMap: Record<ExecutiveProfileLinkKey, React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  "google-scholar": BookOpenText,
  orcid: Fingerprint,
  researchgate: Microscope,
  zenodo: ShieldCheck,
  "enterprise-intelligence-lab": Building2,
};

const isInternalHref = (href: string) => href.startsWith("/");

function ProfileLinkIcon({ link }: { link: ExecutiveProfileLink }) {
  const Icon = iconMap[link.key];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      title={link.label}
      aria-label={`Open ${link.label} profile`}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/75 bg-white/5 text-muted transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{link.label}</span>
    </a>
  );
}

export default function ExecutiveProfileCard({
  config = executiveProfile,
  variant = "default",
  className,
}: ExecutiveProfileCardProps) {
  const compact = variant === "compact";

  return (
    <Card className={cn("overflow-hidden p-6 sm:p-7", className)}>
      <article
        className={cn(
          "grid gap-6",
          compact
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start",
        )}
        aria-label="Executive profile card"
      >
        <div className={cn("flex justify-center", compact ? "sm:justify-start" : "lg:justify-start")}>
          <ProfessionalPortrait
            size={compact ? "compact" : "hero"}
            loading="lazy"
            ariaLabel="Professional portrait of Rakesh Kumar Agrawal"
          />
        </div>

        <div className={cn("space-y-5", compact ? "text-left" : "text-center sm:text-left")}>
          <div className="space-y-3">
            <div className={cn("flex flex-wrap items-center gap-2", compact ? "justify-start" : "justify-center sm:justify-start")}>
              {config.memberships.map((membership) => (
                <Badge key={membership} className="border-primary/20 bg-primary/10 text-[0.65rem] tracking-[0.2em] text-primary">
                  {membership}
                </Badge>
              ))}
              <Badge>{config.experienceLabel}</Badge>
            </div>

            <div>
              <h2 className={cn("font-display font-semibold tracking-tight text-foreground", compact ? "text-2xl" : "text-3xl sm:text-4xl")}>
                {config.name}
              </h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-muted">{config.title}</p>
            </div>
          </div>

          {!compact ? (
            <p className="text-sm leading-7 text-muted">{config.professionalSummary}</p>
          ) : null}

          <div className="space-y-2">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-muted", compact ? "text-left" : "text-center sm:text-left")}>Research Areas</p>
            <ul className={cn("grid gap-1.5", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
              {config.researchAreas.map((item) => (
                <li key={item} className="text-sm leading-6 text-muted">
                  <span className="mr-1.5 text-primary" aria-hidden="true">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={cn("flex flex-wrap gap-2", compact ? "justify-start" : "justify-center sm:justify-start")}>
            {config.actions.map((action) => {
              if (isInternalHref(action.href) && !action.external) {
                return (
                  <Button
                    key={action.label}
                    href={action.href}
                    variant="secondary"
                    size="sm"
                    aria-label={action.label}
                  >
                    {action.label}
                  </Button>
                );
              }

              return (
                <Button
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  size="sm"
                  rightIcon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
                  aria-label={action.label}
                >
                  {action.label}
                </Button>
              );
            })}
            <Button
              href={topmateProfile.href}
              target={topmateProfile.target}
              rel={topmateProfile.rel}
              variant="secondary"
              size="sm"
              rightIcon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
              ariaLabel={topmateProfile.ariaLabel}
            >
              Book Time
            </Button>
          </div>

          <div className="space-y-2">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-muted", compact ? "text-left" : "text-center sm:text-left")}>Professional Links</p>
            <div className={cn("flex flex-wrap gap-2", compact ? "justify-start" : "justify-center sm:justify-start")}>
              {config.links.map((link) => (
                <ProfileLinkIcon key={link.key} link={link} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Card>
  );
}
