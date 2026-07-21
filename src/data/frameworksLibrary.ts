import { datasets } from "./datasets";
import rawFrameworksLibrary from "./frameworksLibrary.json";
import { publications } from "./publications";
import { software } from "./software";
import { createTitleIndex, resolveLinkedByTitle } from "@/lib/data/linking";

export type FrameworkStatus = "Active" | "In Development" | "Planned";

type FrameworkRecord = {
  slug: string;
  title: string;
  status: FrameworkStatus;
  overview: string;
  problemAddressed: string;
  architecture: string;
  components: string[];
  technicalStack: string[];
  architecturePlaceholders: string[];
  roadmap: string[];
  implementation: string[];
  futureEnhancements: string[];
  relatedPublicationTitles: string[];
  relatedDatasetTitles: string[];
  relatedRepositoryNames: string[];
};

type FrameworksLibraryRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  frameworks: FrameworkRecord[];
};

export type LinkedFrameworkArtifact = {
  title: string;
  href?: string;
  description?: string;
};

export type FrameworkLibraryItem = {
  slug: string;
  title: string;
  status: FrameworkStatus;
  overview: string;
  problemAddressed: string;
  architecture: string;
  components: string[];
  technicalStack: string[];
  architecturePlaceholders: string[];
  roadmap: string[];
  implementation: string[];
  futureEnhancements: string[];
  publications: LinkedFrameworkArtifact[];
  datasets: LinkedFrameworkArtifact[];
  repositories: LinkedFrameworkArtifact[];
};

const data = rawFrameworksLibrary as FrameworksLibraryRecord;

const publicationIndex = createTitleIndex(publications.items);
const datasetIndex = createTitleIndex(datasets.items);
const repositoryIndex = createTitleIndex(software.items);

export const frameworksLibraryHero = data.hero;

export const frameworksLibrary: FrameworkLibraryItem[] = data.frameworks.map((item) => ({
  slug: item.slug,
  title: item.title,
  status: item.status,
  overview: item.overview,
  problemAddressed: item.problemAddressed,
  architecture: item.architecture,
  components: item.components,
  technicalStack: item.technicalStack,
  architecturePlaceholders: item.architecturePlaceholders,
  roadmap: item.roadmap,
  implementation: item.implementation,
  futureEnhancements: item.futureEnhancements,
  publications: resolveLinkedByTitle(item.relatedPublicationTitles, publicationIndex),
  datasets: resolveLinkedByTitle(item.relatedDatasetTitles, datasetIndex),
  repositories: resolveLinkedByTitle(item.relatedRepositoryNames, repositoryIndex),
}));

const frameworksBySlug = new Map(frameworksLibrary.map((framework) => [framework.slug, framework]));

export const getFrameworkBySlug = (slug: string) => frameworksBySlug.get(slug);
