import { datasets } from "./datasets";
import rawPublicationsLibrary from "./publicationsLibrary.json";
import { projects } from "./projects";
import { software } from "./software";
import { createTitleIndex, resolveLinkedByTitle } from "@/lib/data/linking";

export type PublicationCategory =
  | "Journal Articles"
  | "Conference Papers"
  | "Book Chapters"
  | "White Papers"
  | "Technical Reports"
  | "Professional Articles"
  | "Newsletter Editions";

export type PublicationStatus = "Published" | "Accepted" | "Under Review" | "Preprint" | "Manuscript";

export type PublicationSortValue = "newest" | "oldest" | "title-asc" | "title-desc" | "category" | "status";

type PublicationRecord = {
  slug: string;
  title: string;
  category: PublicationCategory;
  status: PublicationStatus;
  abstract: string;
  authors: string[];
  publication: string;
  publicationDate: string;
  doi: string | null;
  citation: string;
  bibtex: string;
  keywords: string[];
  githubRepositoryNames: string[];
  relatedFrameworkTitles: string[];
  relatedDatasetTitles: string[];
  relatedProjectTitles: string[];
};

type PublicationSortOption = {
  value: PublicationSortValue;
  label: string;
};

type PublicationsLibraryRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  categories: PublicationCategory[];
  statusOptions: PublicationStatus[];
  sortOptions: PublicationSortOption[];
  publications: PublicationRecord[];
};

export type LinkedPublicationArtifact = {
  title: string;
  href?: string;
  description?: string;
};

export type PublicationLibraryItem = {
  slug: string;
  title: string;
  category: PublicationCategory;
  status: PublicationStatus;
  abstract: string;
  authors: string[];
  publication: string;
  publicationDate: string;
  doi: string | null;
  citation: string;
  bibtex: string;
  keywords: string[];
  githubRepositories: LinkedPublicationArtifact[];
  relatedFrameworks: LinkedPublicationArtifact[];
  relatedDatasets: LinkedPublicationArtifact[];
  relatedProjects: LinkedPublicationArtifact[];
};

const data = rawPublicationsLibrary as PublicationsLibraryRecord;

const repositoryIndex = createTitleIndex(software.items);
const datasetIndex = createTitleIndex(datasets.items);
const projectIndex = createTitleIndex(projects.items);

export const publicationsLibraryHero = data.hero;
export const publicationCategories = data.categories;
export const publicationStatusOptions = data.statusOptions;
export const publicationSortOptions = data.sortOptions;

export const publicationsLibrary: PublicationLibraryItem[] = data.publications.map((item) => ({
  slug: item.slug,
  title: item.title,
  category: item.category,
  status: item.status,
  abstract: item.abstract,
  authors: item.authors,
  publication: item.publication,
  publicationDate: item.publicationDate,
  doi: item.doi,
  citation: item.citation,
  bibtex: item.bibtex,
  keywords: item.keywords,
  githubRepositories: resolveLinkedByTitle(item.githubRepositoryNames, repositoryIndex),
  relatedFrameworks: resolveLinkedByTitle(item.relatedFrameworkTitles, projectIndex),
  relatedDatasets: resolveLinkedByTitle(item.relatedDatasetTitles, datasetIndex),
  relatedProjects: resolveLinkedByTitle(item.relatedProjectTitles, projectIndex),
}));

const publicationBySlug = new Map(publicationsLibrary.map((item) => [item.slug, item]));

export const getPublicationBySlug = (slug: string) => publicationBySlug.get(slug);
