import { datasets } from "./datasets";
import { frameworksLibrary } from "./frameworksLibrary";
import { publicationsLibrary } from "./publicationsLibrary";
import { projects } from "./projects";
import { software } from "./software";
import rawTimelineLibrary from "./timelineLibrary.json";

export type TimelineFilterCategory =
  | "Research"
  | "Publications"
  | "Datasets"
  | "Projects"
  | "Professional Service";

export type TimelineEntryStatus =
  | "Active"
  | "Released"
  | "Published"
  | "Accepted"
  | "Under Review"
  | "Preprint"
  | "Manuscript"
  | "Planned";

type TimelineEntryRecord = {
  id: string;
  title: string;
  category: TimelineFilterCategory;
  milestoneType: string;
  date: string;
  status: TimelineEntryStatus;
  summary: string;
  details: string[];
  relatedFrameworkSlugs: string[];
  relatedPublicationSlugs: string[];
  relatedDatasetTitles: string[];
  relatedProjectTitles: string[];
  relatedRepositoryNames: string[];
};

type TimelineLibraryRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  filterOptions: TimelineFilterCategory[];
  entries: TimelineEntryRecord[];
};

type IndexableItem = {
  title: string;
  href?: string;
  description?: string;
};

export type TimelineLinkedItem = {
  title: string;
  href?: string;
  description?: string;
};

export type TimelineEntry = {
  id: string;
  title: string;
  category: TimelineFilterCategory;
  milestoneType: string;
  date: string;
  status: TimelineEntryStatus;
  summary: string;
  details: string[];
  frameworks: TimelineLinkedItem[];
  publications: TimelineLinkedItem[];
  datasets: TimelineLinkedItem[];
  projects: TimelineLinkedItem[];
  repositories: TimelineLinkedItem[];
};

const data = rawTimelineLibrary as TimelineLibraryRecord;

const createIndex = (items: readonly IndexableItem[]) =>
  new Map(
    items.map((item) => [
      item.title,
      {
        title: item.title,
        href: item.href,
        description: item.description,
      },
    ]),
  );

const frameworksIndex = new Map(
  frameworksLibrary.map((framework) => [
    framework.slug,
    {
      title: framework.title,
      href: `/frameworks/${framework.slug}`,
      description: framework.overview,
    },
  ]),
);

const publicationsIndex = new Map(
  publicationsLibrary.map((publication) => [
    publication.slug,
    {
      title: publication.title,
      href: `/publications/${publication.slug}`,
      description: publication.abstract,
    },
  ]),
);

const datasetsIndex = createIndex(datasets.items);
const projectsIndex = createIndex(projects.items);
const repositoriesIndex = createIndex(software.items);

const resolveBySlug = (slugs: readonly string[], index: Map<string, TimelineLinkedItem>) =>
  slugs.map((slug) => {
    const item = index.get(slug);

    if (item) {
      return item;
    }

    return { title: slug };
  });

const resolveByTitle = (titles: readonly string[], index: Map<string, TimelineLinkedItem>) =>
  titles.map((title) => {
    const item = index.get(title);

    if (item) {
      return item;
    }

    return { title };
  });

export const timelineHero = data.hero;
export const timelineFilters = data.filterOptions;

export const timelineEntries: TimelineEntry[] = data.entries.map((entry) => ({
  id: entry.id,
  title: entry.title,
  category: entry.category,
  milestoneType: entry.milestoneType,
  date: entry.date,
  status: entry.status,
  summary: entry.summary,
  details: entry.details,
  frameworks: resolveBySlug(entry.relatedFrameworkSlugs, frameworksIndex),
  publications: resolveBySlug(entry.relatedPublicationSlugs, publicationsIndex),
  datasets: resolveByTitle(entry.relatedDatasetTitles, datasetsIndex),
  projects: resolveByTitle(entry.relatedProjectTitles, projectsIndex),
  repositories: resolveByTitle(entry.relatedRepositoryNames, repositoriesIndex),
}));
