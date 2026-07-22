import { certifications } from "./certifications";
import rawDashboardMetrics from "./dashboardMetrics.json";
import { datasets } from "./datasets";
import { executiveProfile } from "./executiveProfile";
import { frameworksLibrary } from "./frameworksLibrary";
import { memberships } from "./memberships";
import { peerReviews } from "./peerReviews";
import { professionalServiceTimelineEntries } from "./professionalServiceLibrary";
import { projects } from "./projects";
import { publicationsLibrary } from "./publicationsLibrary";
import { researchDomains } from "./researchDomains";
import { software } from "./software";

export type DashboardMetricSource =
  | "researchPublications"
  | "frameworks"
  | "researchDatasets"
  | "openSourceProjects"
  | "githubRepositories"
  | "professionalMemberships"
  | "peerReviewActivities"
  | "editorialActivities"
  | "technicalArticles"
  | "newsletterEditions"
  | "professionalCertifications"
  | "yearsOfExperience";

export type DashboardFilterGroup =
  | "Research"
  | "Frameworks"
  | "Datasets"
  | "Projects"
  | "Professional Service";

type DashboardMetricRecord = {
  id: string;
  title: string;
  description: string;
  source: DashboardMetricSource;
  href: string;
  icon: string;
  filterGroup: DashboardFilterGroup;
  trend: number[];
};

type DashboardMetricsRecord = {
  homeSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
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
  icon: string;
  filterGroup: DashboardFilterGroup;
  trend: number[];
};

export type DashboardDistributionItem = {
  label: string;
  value: number;
};

const data = rawDashboardMetrics as DashboardMetricsRecord;

const toDistribution = (values: string[]): DashboardDistributionItem[] => {
  const map = values.reduce((accumulator, value) => {
    accumulator.set(value, (accumulator.get(value) ?? 0) + 1);
    return accumulator;
  }, new Map<string, number>());

  return [...map.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
};

const computeMetricValue = (source: DashboardMetricSource) => {
  if (source === "researchPublications") {
    return publicationsLibrary.length;
  }

  if (source === "frameworks") {
    return frameworksLibrary.length;
  }

  if (source === "researchDatasets") {
    return datasets.items.length;
  }

  if (source === "openSourceProjects") {
    return projects.items.length;
  }

  if (source === "githubRepositories") {
    return software.items.length;
  }

  if (source === "professionalMemberships") {
    return memberships.items.length;
  }

  if (source === "peerReviewActivities") {
    return peerReviews.stats.totalReviews;
  }

  if (source === "editorialActivities") {
    return professionalServiceTimelineEntries.filter((entry) => entry.category === "Editorial Activities").length;
  }

  if (source === "technicalArticles") {
    return publicationsLibrary.filter((item) => item.category === "Professional Articles").length;
  }

  if (source === "newsletterEditions") {
    return publicationsLibrary.filter((item) => item.category === "Newsletter Editions").length;
  }

  if (source === "professionalCertifications") {
    return certifications.items.length;
  }

  return Number.parseInt(executiveProfile.experienceLabel, 10) || 0;
};

export const dashboardHomeSection = data.homeSection;
export const dashboardHero = data.hero;
export const dashboardTrendWindowLabel = data.trendWindowLabel;

export const dashboardFilterGroups: DashboardFilterGroup[] = [
  "Research",
  "Frameworks",
  "Datasets",
  "Projects",
  "Professional Service",
];

export const dashboardMetrics: DashboardMetric[] = data.metrics.map((metric) => ({
  id: metric.id,
  title: metric.title,
  description: metric.description,
  value: computeMetricValue(metric.source),
  href: metric.href,
  icon: metric.icon,
  filterGroup: metric.filterGroup,
  trend: metric.trend,
}));

export const researchAreaDistribution: DashboardDistributionItem[] = researchDomains.map((domain) => ({
  label: domain.title,
  value:
    domain.relatedPublications.length +
    domain.relatedRepositories.length +
    domain.relatedDatasets.length +
    domain.relatedFrameworks.length,
}));

export const publicationCategoryDistribution: DashboardDistributionItem[] = toDistribution(
  publicationsLibrary.map((item) => item.category),
);

export const frameworkDistribution: DashboardDistributionItem[] = toDistribution(
  frameworksLibrary.map((framework) => framework.status),
);

export const projectCategoryDistribution: DashboardDistributionItem[] = toDistribution(
  projects.items.map((project) => project.meta?.[0] ?? "Unspecified"),
);

export const technologyStackDistribution: DashboardDistributionItem[] = toDistribution(
  frameworksLibrary.flatMap((framework) => framework.technicalStack),
).slice(0, 8);
