import { certifications } from "./certifications";
import rawDashboardMetrics from "./dashboardMetrics.json";
import { datasets } from "./datasets";
import { frameworksLibrary } from "./frameworksLibrary";
import { memberships } from "./memberships";
import { peerReviews } from "./peerReviews";
import { publicationsLibrary } from "./publicationsLibrary";
import { researchDomains } from "./researchDomains";
import { software } from "./software";

export type DashboardMetricSource =
  | "researchDomains"
  | "publications"
  | "frameworks"
  | "datasets"
  | "repositories"
  | "technicalArticles"
  | "newsletterEditions"
  | "peerReviews"
  | "professionalMemberships"
  | "professionalCertifications";

type DashboardMetricRecord = {
  id: string;
  title: string;
  description: string;
  source: DashboardMetricSource;
  href: string;
  trend: number[];
};

type DashboardMetricsRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  trendWindowLabel: string;
  metrics: DashboardMetricRecord[];
};

export type DashboardMetric = {
  id: string;
  title: string;
  description: string;
  value: number;
  href: string;
  trend: number[];
};

const data = rawDashboardMetrics as DashboardMetricsRecord;

const computeMetricValue = (source: DashboardMetricSource) => {
  if (source === "researchDomains") {
    return researchDomains.length;
  }

  if (source === "publications") {
    return publicationsLibrary.length;
  }

  if (source === "frameworks") {
    return frameworksLibrary.length;
  }

  if (source === "datasets") {
    return datasets.items.length;
  }

  if (source === "repositories") {
    return software.items.length;
  }

  if (source === "technicalArticles") {
    return publicationsLibrary.filter((item) => item.category === "Professional Articles").length;
  }

  if (source === "newsletterEditions") {
    return publicationsLibrary.filter((item) => item.category === "Newsletter Editions").length;
  }

  if (source === "peerReviews") {
    return peerReviews.stats.totalReviews;
  }

  if (source === "professionalMemberships") {
    return memberships.items.length;
  }

  return certifications.items.length;
};

export const dashboardHero = data.hero;
export const dashboardTrendWindowLabel = data.trendWindowLabel;

export const dashboardMetrics: DashboardMetric[] = data.metrics.map((metric) => ({
  id: metric.id,
  title: metric.title,
  description: metric.description,
  value: computeMetricValue(metric.source),
  href: metric.href,
  trend: metric.trend,
}));
