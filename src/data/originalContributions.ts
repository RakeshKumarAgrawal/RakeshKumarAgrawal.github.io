import { datasets } from "./datasets";
import rawOriginalContributions from "./originalContributions.json";
import { publications } from "./publications";
import { software } from "./software";
import { createTitleIndex, resolveLinkedByTitle } from "@/lib/data/linking";

export type ContributionStatus = "Active" | "In Development" | "Planned";

type ContributionTimelineEntryRecord = {
  phase: string;
  period: string;
  milestone: string;
};

type OriginalContributionRecord = {
  slug: string;
  title: string;
  researchStatus: ContributionStatus;
  overview: string;
  researchProblem: string;
  motivation: string;
  architecture: string;
  technicalInnovation: string;
  researchContributions: string[];
  relatedPublicationTitles: string[];
  relatedDatasetTitles: string[];
  relatedRepositoryNames: string[];
  imagePlaceholders: string[];
  timeline: ContributionTimelineEntryRecord[];
  futureResearch: string[];
};

type OriginalContributionsPageRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    supportingText: string;
  };
  contributions: OriginalContributionRecord[];
};

export type LinkedArtifact = {
  title: string;
  href?: string;
  description?: string;
};

export type ContributionTimelineEntry = {
  phase: string;
  period: string;
  milestone: string;
};

export type OriginalContribution = {
  slug: string;
  title: string;
  researchStatus: ContributionStatus;
  overview: string;
  researchProblem: string;
  motivation: string;
  architecture: string;
  technicalInnovation: string;
  researchContributions: string[];
  publications: LinkedArtifact[];
  datasets: LinkedArtifact[];
  repositories: LinkedArtifact[];
  imagePlaceholders: string[];
  timeline: ContributionTimelineEntry[];
  futureResearch: string[];
};

const data = rawOriginalContributions as OriginalContributionsPageRecord;

const publicationIndex = createTitleIndex(publications.items);
const datasetIndex = createTitleIndex(datasets.items);
const repositoryIndex = createTitleIndex(software.items);

export const originalContributionsHero = data.hero;

export const originalContributions: OriginalContribution[] = data.contributions.map((item) => ({
  slug: item.slug,
  title: item.title,
  researchStatus: item.researchStatus,
  overview: item.overview,
  researchProblem: item.researchProblem,
  motivation: item.motivation,
  architecture: item.architecture,
  technicalInnovation: item.technicalInnovation,
  researchContributions: item.researchContributions,
  publications: resolveLinkedByTitle(item.relatedPublicationTitles, publicationIndex),
  datasets: resolveLinkedByTitle(item.relatedDatasetTitles, datasetIndex),
  repositories: resolveLinkedByTitle(item.relatedRepositoryNames, repositoryIndex),
  imagePlaceholders: item.imagePlaceholders,
  timeline: item.timeline,
  futureResearch: item.futureResearch,
}));
