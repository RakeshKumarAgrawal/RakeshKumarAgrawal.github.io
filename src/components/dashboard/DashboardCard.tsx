import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Database,
  Download,
  FileText,
  FolderGit2,
  Globe2,
  Layers3,
  Network,
  Newspaper,
  PenSquare,
  Quote,
  Rocket,
  Users,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { DashboardMetric } from "@/data/dashboardMetrics";
import { scholarlyProfiles } from "@/data/scholarlyProfiles";

import MetricCounter from "./MetricCounter";

type DashboardCardProps = {
  metric: DashboardMetric;
};

const iconMap = {
  award: Award,
  book: BookOpen,
  "check-circle": CheckCircle2,
  database: Database,
  download: Download,
  "file-text": FileText,
  github: FolderGit2,
  globe: Globe2,
  layers: Layers3,
  network: Network,
  newspaper: Newspaper,
  "pen-square": PenSquare,
  quote: Quote,
  rocket: Rocket,
  users: Users,
} as const;

export default function DashboardCard({ metric }: DashboardCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] ?? Layers3;

  const progressItems = metric.breakdown.slice(0, 3);
  const maxProgress = Math.max(...progressItems.map((item) => item.value), 1);

  return (
    <Card className="h-full space-y-4 rounded-3xl border-border/70 bg-gradient-to-b from-surface/80 to-surface/45 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{metric.title}</p>
          <p className="font-display text-4xl font-semibold tracking-tight text-foreground">
            {metric.display === "verified-platform-list" ? (
              <>{scholarlyProfiles.length} Verified Research Profiles</>
            ) : (
              <MetricCounter value={metric.value} />
            )}
          </p>
        </div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <p className="text-sm leading-7 text-muted">{metric.description}</p>

      {metric.display === "verified-platform-list" ? (
        <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/55 p-3" aria-label={`Verified platforms for ${metric.title}`}>
          <ul className="grid gap-2 text-xs text-muted sm:grid-cols-2">
            {scholarlyProfiles.map((profile) => (
              <li key={profile.id} className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                <span>{profile.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : progressItems.length ? (
        <div className="space-y-2 rounded-2xl border border-border/70 bg-surface/55 p-3" aria-label={`Breakdown for ${metric.title}`}>
          {progressItems.map((item) => (
            <div key={`${metric.id}-${item.label}`} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-primary/80 to-accent/80"
                  style={{ width: `${Math.max((item.value / maxProgress) * 100, 5)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className={metric.display === "verified-platform-list" ? "flex flex-col items-start gap-3" : "flex items-center justify-between"}>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {metric.footer ?? `Updated ${metric.lastUpdated}`}
        </p>
        <Link
          href={metric.route}
          className={`inline-flex rounded-full border border-border/80 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-white/10 ${
            metric.display === "verified-platform-list" ? "w-full justify-center sm:w-auto" : ""
          }`}
          aria-label={`View details for ${metric.title}`}
        >
          {metric.actionLabel ?? "View Details"}
        </Link>
      </div>
    </Card>
  );
}
