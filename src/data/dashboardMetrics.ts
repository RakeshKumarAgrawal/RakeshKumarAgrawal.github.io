import { certifications } from "./certifications";
import rawDashboardMetrics from "./dashboardMetrics.json";
import { datasets } from "./datasets";
import { frameworksLibrary } from "./frameworksLibrary";
import { memberships } from "./memberships";
import { openScienceProfiles } from "./openScienceProfiles";
import { originalContributions } from "./originalContributions";
import { peerReviews } from "./peerReviews";
import { professionalServiceTimelineEntries } from "./professionalServiceLibrary";
import { projects } from "./projects";
import { publicationsLibrary } from "./publicationsLibrary";
import { researchDomains } from "./researchDomains";
import { scholarlyProfiles } from "./scholarlyProfiles";
import { software } from "./software";
import { dataciteProfile } from "@/lib/dataciteProfile";

export type DashboardMetricSource =
  | "dataciteWorks"
  | "dataciteCitations"
  | "scholarlyProfiles"
  | "dataciteDownloads"
  | "researchPublications"
  | "researchProjects"
  | "originalContributions"
  | "frameworks"
  | "researchDatasets"
  | "githubRepositories"
  | "professionalMemberships"
  | "peerReviewActivities"
  | "editorialActivities"
  | "technicalArticles"
  | "newsletterEditions"
  | "professionalCertifications"
  | "openScienceProfiles";

export type DashboardSynchronizationSource =
  | (typeof scholarlyProfiles)[number]["synchronizationName"]
  | "GitHub"
  | "LinkedIn Newsletter (edition metadata only)"
  | "Amazon KDP (book metadata only)";

export type ExcludedDashboardMetricType =
  | "Views"
  | "Impressions"
  | "Page Visits"
  | "Social Analytics"
  | "Website Analytics"
  | "Platform-specific popularity metrics";

export type DashboardMetricCategory =
  | "Research Metrics"
  | "Professional Metrics"
  | "Research Outputs"
  | "Open Science";

export type DashboardFilterGroup =
  | "Research"
  | "Frameworks"
  | "Datasets"
  | "Projects"
  | "Professional Service";

type DashboardMetricRecord = {
  id: string;
  title: string;
  value?: number;
  description: string;
  icon: string;
  route: string;
  category: DashboardMetricCategory;
  lastUpdated: string;
  source: DashboardMetricSource;
  breakdown?: string[];
  display?: "verified-platform-list";
  footer?: string;
  actionLabel?: string;
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
  researchMetrics: {
    works: number | null;
    citations: number | null;
    downloads: number | null;
  };
  trendWindowLabel: string;
  metrics: DashboardMetricRecord[];
};

export type DashboardMetricBreakdown = {
  label: string;
  value: number;
};

export type DashboardMetric = {
  id: string;
  title: string;
  description: string;
  value: number | null;
  icon: string;
  route: string;
  href: string;
  category: DashboardMetricCategory;
  filterGroup: DashboardFilterGroup;
  lastUpdated: string;
  source: DashboardMetricSource;
  breakdown: DashboardMetricBreakdown[];
  trend: number[];
  display?: "verified-platform-list";
  footer?: string;
  actionLabel?: string;
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

const publicationCountByCategory = (category: string) =>
  publicationsLibrary.filter((item) => item.category === category).length;

const matchAny = (value: string, patterns: readonly RegExp[]) =>
  patterns.some((pattern) => pattern.test(value));

const projectClassifiers = {
  "Enterprise AI": [/enterprise ai/i, /enterprise intelligence/i, /agentic/i],
  "Platform Engineering": [/platform/i, /framework/i, /architecture/i, /llmops/i],
  "Healthcare AI": [/healthcare/i, /bio/i, /life science/i],
  "Cloud Engineering": [/cloud/i, /aws/i, /azure/i],
} as const;

const projectBreakdownCounts = projects.items.reduce(
  (accumulator, project) => {
    const text = `${project.title} ${project.description} ${(project.meta ?? []).join(" ")}`;

    (Object.keys(projectClassifiers) as Array<keyof typeof projectClassifiers>).forEach((label) => {
      if (matchAny(text, projectClassifiers[label])) {
        accumulator.set(label, (accumulator.get(label) ?? 0) + 1);
      }
    });

    return accumulator;
  },
  new Map<string, number>(),
);

const certificationLabels = {
  Cloud: ["Cloud"],
  AI: ["AI"],
  "Project Management": ["Project Management"],
  Professional: ["Professional Certifications"],
} as const;

const certificationBreakdownCounts = new Map<string, number>(
  Object.entries(certificationLabels).map(([label, matchTitles]) => [
    label,
    certifications.items.filter((item) => (matchTitles as readonly string[]).includes(item.title)).length,
  ]),
);

const openScienceProfileCountByTitle = new Map<string, number>(
  openScienceProfiles.map((profile) => [profile.title, 1]),
);

const featuredRepositoryCount = software.items.filter((item) =>
  (item.meta ?? []).some((meta) => ["Portfolio", "Research", "Benchmark", "Framework"].includes(meta)),
).length;

const dashboardCategoryToFilterGroup: Record<DashboardMetricCategory, DashboardFilterGroup> = {
  "Research Metrics": "Research",
  "Professional Metrics": "Professional Service",
  "Research Outputs": "Projects",
  "Open Science": "Datasets",
};

const buildBreakdown = (metric: DashboardMetricRecord): DashboardMetricBreakdown[] => {
  if (metric.source === "scholarlyProfiles") {
    return scholarlyProfiles.map((profile) => ({ label: profile.name, value: 1 }));
  }

  if (!metric.breakdown?.length) {
    return [];
  }

  if (metric.source === "researchPublications") {
    const map = new Map<string, number>([
      ["Journal Articles", publicationCountByCategory("Journal Articles")],
      ["Conference Papers", publicationCountByCategory("Conference Papers")],
      ["Book Chapters", publicationCountByCategory("Book Chapters")],
      ["White Papers", publicationCountByCategory("White Papers")],
      ["Technical Reports", publicationCountByCategory("Technical Reports")],
    ]);

    return metric.breakdown.map((label) => ({ label, value: map.get(label) ?? 0 }));
  }

  if (metric.source === "researchProjects") {
    return metric.breakdown.map((label) => ({ label, value: projectBreakdownCounts.get(label) ?? 0 }));
  }

  if (metric.source === "githubRepositories") {
    const map = new Map<string, number>([
      ["Public repositories", software.items.length],
      ["Featured repositories", featuredRepositoryCount],
    ]);

    return metric.breakdown.map((label) => ({ label, value: map.get(label) ?? 0 }));
  }

  if (metric.source === "professionalMemberships") {
    const map = new Map<string, number>([
      [
        "IEEE Senior Member",
        memberships.items.filter(
          (item) => item.organization.includes("IEEE") && item.role.toLowerCase().includes("senior"),
        ).length,
      ],
      [
        "IETE Fellow",
        memberships.items.filter(
          (item) =>
            item.organization.includes("Institution of Electronics and Telecommunication Engineers") &&
            item.role.toLowerCase().includes("fellow"),
        ).length,
      ],
      ["Other Professional Organizations", memberships.items.length],
    ]);

    return metric.breakdown.map((label) => ({ label, value: map.get(label) ?? 0 }));
  }

  if (metric.source === "peerReviewActivities") {
    const map = new Map<string, number>([
      ["Journals", 0],
      ["Conferences", 0],
      [
        "Editorial Activities",
        professionalServiceTimelineEntries.filter((entry) => entry.category === "Editorial Activities").length,
      ],
    ]);

    return metric.breakdown.map((label) => ({ label, value: map.get(label) ?? 0 }));
  }

  if (metric.source === "technicalArticles") {
    return metric.breakdown.map((label) => ({ label, value: publicationCountByCategory(label) }));
  }

  if (metric.source === "newsletterEditions") {
    return metric.breakdown.map((label) => ({ label, value: publicationCountByCategory(label) }));
  }

  if (metric.source === "professionalCertifications") {
    return metric.breakdown.map((label) => ({ label, value: certificationBreakdownCounts.get(label) ?? 0 }));
  }

  if (metric.source === "openScienceProfiles") {
    return metric.breakdown.map((label) => ({ label, value: openScienceProfileCountByTitle.get(label) ?? 0 }));
  }

  if (metric.source === "originalContributions") {
    const map = new Map<string, number>(originalContributions.map((item) => [item.title, 1]));
    return metric.breakdown.map((label) => ({ label, value: map.get(label) ?? 0 }));
  }

  return metric.breakdown.map((label) => ({ label, value: 0 }));
};

const computeMetricValue = (source: DashboardMetricSource): number | null => {
  if (source === "dataciteWorks") {
    return dataciteProfile.researchMetrics.works;
  }

  if (source === "dataciteCitations") {
    return dataciteProfile.researchMetrics.citations;
  }

  if (source === "scholarlyProfiles") {
    return scholarlyProfiles.length;
  }

  if (source === "dataciteDownloads") {
    return dataciteProfile.researchMetrics.downloads;
  }

  if (source === "researchPublications") {
    return publicationsLibrary.length;
  }

  if (source === "researchProjects") {
    return projects.items.length;
  }

  if (source === "originalContributions") {
    return originalContributions.length;
  }

  if (source === "frameworks") {
    return frameworksLibrary.length;
  }

  if (source === "researchDatasets") {
    return datasets.items.length;
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
    return publicationCountByCategory("Professional Articles");
  }

  if (source === "newsletterEditions") {
    return publicationCountByCategory("Newsletter Editions");
  }

  if (source === "professionalCertifications") {
    return certifications.items.length;
  }

  return openScienceProfiles.length;
};

export const dashboardHomeSection = data.homeSection;
export const dashboardHero = data.hero;
export const dashboardTrendWindowLabel = data.trendWindowLabel;
export const dashboardResearchMetrics = {
  ...data.researchMetrics,
  scholarlyProfiles: scholarlyProfiles.length,
};
export const dashboardSynchronizationModel: {
  authoritativeSources: DashboardSynchronizationSource[];
  excludedMetricTypes: ExcludedDashboardMetricType[];
} = {
  authoritativeSources: [
    ...scholarlyProfiles.map((profile) => profile.synchronizationName),
    "GitHub",
    "LinkedIn Newsletter (edition metadata only)",
    "Amazon KDP (book metadata only)",
  ],
  excludedMetricTypes: [
    "Views",
    "Impressions",
    "Page Visits",
    "Social Analytics",
    "Website Analytics",
    "Platform-specific popularity metrics",
  ],
};

export const dashboardMetrics: DashboardMetric[] = data.metrics.map((metric) => {
  const value = computeMetricValue(metric.source);
  const breakdown = buildBreakdown(metric);

  return {
    id: metric.id,
    title: metric.title,
    description: metric.description,
    value,
    icon: metric.icon,
    route: metric.route,
    href: metric.route,
    category: metric.category,
    filterGroup: dashboardCategoryToFilterGroup[metric.category],
    lastUpdated: metric.lastUpdated,
    source: metric.source,
    breakdown,
    trend: breakdown.map((item) => item.value),
    display: metric.display,
    footer: metric.footer,
    actionLabel: metric.actionLabel,
  };
});

export const dashboardMetricsByCategory = dashboardMetrics.reduce(
  (accumulator, metric) => {
    const bucket = accumulator.get(metric.category) ?? [];
    bucket.push(metric);
    accumulator.set(metric.category, bucket);
    return accumulator;
  },
  new Map<DashboardMetricCategory, DashboardMetric[]>(),
);

export const dashboardFilterGroups: DashboardFilterGroup[] = [
  "Research",
  "Frameworks",
  "Datasets",
  "Projects",
  "Professional Service",
];

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
  projects.items.flatMap((project) => project.meta?.[0] ?? "Unspecified"),
);

export const technologyStackDistribution: DashboardDistributionItem[] = toDistribution(
  frameworksLibrary.flatMap((framework) => framework.technicalStack),
).slice(0, 8);
