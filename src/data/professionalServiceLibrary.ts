import rawProfessionalServiceLibrary from "./professionalServiceLibrary.json";

export type ServiceCategory =
  | "Professional Memberships"
  | "IEEE Activities"
  | "IETE Activities"
  | "Editorial Activities"
  | "Peer Review"
  | "Technical Leadership"
  | "Conference Service"
  | "Mentoring"
  | "Volunteer Activities";

export type ServiceStatus =
  | "Active"
  | "Published"
  | "In Progress"
  | "Planned"
  | "Completed";

type StatisticRecord = {
  label: string;
  value: string;
  description: string;
};

type ServiceCategoryRecord = {
  slug: string;
  title: ServiceCategory;
  description: string;
  highlights: string[];
};

type ServiceTimelineEntryRecord = {
  id: string;
  title: string;
  category: ServiceCategory;
  date: string;
  status: ServiceStatus;
  summary: string;
  details: string[];
};

type ProfessionalServiceLibraryRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  statistics: StatisticRecord[];
  categories: ServiceCategoryRecord[];
  timelineEntries: ServiceTimelineEntryRecord[];
};

export type ServiceStatistic = {
  label: string;
  value: string;
  description: string;
};

export type ServiceCategoryCard = {
  slug: string;
  title: ServiceCategory;
  description: string;
  highlights: string[];
};

export type ServiceTimelineEntry = {
  id: string;
  title: string;
  category: ServiceCategory;
  date: string;
  status: ServiceStatus;
  summary: string;
  details: string[];
};

const data = rawProfessionalServiceLibrary as ProfessionalServiceLibraryRecord;

export const professionalServiceHero = data.hero;
export const professionalServiceStatistics: ServiceStatistic[] = data.statistics;
export const professionalServiceCategories: ServiceCategoryCard[] = data.categories;
export const professionalServiceTimelineEntries: ServiceTimelineEntry[] = data.timelineEntries;

export const professionalServiceFilters: ServiceCategory[] = [
  ...new Set(data.timelineEntries.map((entry) => entry.category)),
];
