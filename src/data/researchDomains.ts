import { datasets } from "./datasets";
import { projects } from "./projects";
import { publications } from "./publications";
import rawResearchDomains from "./researchDomains.json";
import { software } from "./software";
import { createTitleIndex, resolveLinkedByTitle } from "@/lib/data/linking";

export type ResearchStatus = "Active" | "In Development" | "Planned";

type ResearchDomainRecord = {
  slug: string;
  title: string;
  summary: string;
  relatedPublicationTitles: string[];
  relatedRepositoryNames: string[];
  relatedDatasetTitles: string[];
  relatedFrameworkTitles: string[];
  researchStatus: ResearchStatus;
  futureWork: string[];
  keywords: string[];
};

export type RelatedResearchItem = {
  title: string;
  href?: string;
  description?: string;
};

export type ResearchDomain = {
  slug: string;
  title: string;
  summary: string;
  relatedPublications: RelatedResearchItem[];
  relatedRepositories: RelatedResearchItem[];
  relatedDatasets: RelatedResearchItem[];
  relatedFrameworks: RelatedResearchItem[];
  researchStatus: ResearchStatus;
  futureWork: string[];
  keywords: string[];
};

const researchDomainRecords = rawResearchDomains as ResearchDomainRecord[];

const publicationIndex = createTitleIndex(publications.items);
const repositoryIndex = createTitleIndex(software.items);
const datasetIndex = createTitleIndex(datasets.items);
const frameworkIndex = createTitleIndex(projects.items);

export const researchDomains: ResearchDomain[] = researchDomainRecords.map((record) => ({
  slug: record.slug,
  title: record.title,
  summary: record.summary,
  relatedPublications: resolveLinkedByTitle(record.relatedPublicationTitles, publicationIndex),
  relatedRepositories: resolveLinkedByTitle(record.relatedRepositoryNames, repositoryIndex),
  relatedDatasets: resolveLinkedByTitle(record.relatedDatasetTitles, datasetIndex),
  relatedFrameworks: resolveLinkedByTitle(record.relatedFrameworkTitles, frameworkIndex),
  researchStatus: record.researchStatus,
  futureWork: record.futureWork,
  keywords: record.keywords,
}));

const researchDomainMap = new Map(researchDomains.map((domain) => [domain.slug, domain]));

export const researchHubMetadata = {
  eyebrow: "Research Hub",
  title: "Research domains and evidence pathways",
  description:
    "A central research catalog organized by domain with publication, repository, dataset, and framework linkages.",
} as const;

export const researchStatuses: ResearchStatus[] = [
  ...new Set(researchDomains.map((domain) => domain.researchStatus)),
];

export const getResearchDomainBySlug = (slug: string) => researchDomainMap.get(slug);
