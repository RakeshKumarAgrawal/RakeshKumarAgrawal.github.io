import { datasets } from "./datasets";
import { frameworksLibrary } from "./frameworksLibrary";
import { professionalServiceCategories, professionalServiceTimelineEntries } from "./professionalServiceLibrary";
import { projects } from "./projects";
import { publicationsLibrary } from "./publicationsLibrary";
import { researchDomains } from "./researchDomains";
import { timelineEntries } from "./timelineLibrary";

export type GlobalSearchCategory =
  | "Research"
  | "Frameworks"
  | "Datasets"
  | "Projects"
  | "Publications"
  | "Newsletters"
  | "Professional Service"
  | "Timeline"
  | "Knowledge Graph";

export type GlobalSearchEntry = {
  id: string;
  title: string;
  description: string;
  category: GlobalSearchCategory;
  href: string;
  keywords: string[];
};

const researchEntries: GlobalSearchEntry[] = researchDomains.map((item) => ({
  id: `research-${item.slug}`,
  title: item.title,
  description: item.summary,
  category: "Research",
  href: `/research/${item.slug}`,
  keywords: [item.researchStatus, ...item.keywords],
}));

const frameworkEntries: GlobalSearchEntry[] = frameworksLibrary.map((item) => ({
  id: `framework-${item.slug}`,
  title: item.title,
  description: item.overview,
  category: "Frameworks",
  href: `/frameworks/${item.slug}`,
  keywords: [item.status, ...item.technicalStack, ...item.components],
}));

const datasetEntries: GlobalSearchEntry[] = datasets.items.map((item, index) => ({
  id: `dataset-${index}-${item.title}`,
  title: item.title,
  description: item.description,
  category: "Datasets",
  href: item.href ?? "/open-science",
  keywords: item.meta ? [...item.meta] : [],
}));

const projectEntries: GlobalSearchEntry[] = projects.items.map((item, index) => ({
  id: `project-${index}-${item.title}`,
  title: item.title,
  description: item.description,
  category: "Projects",
  href: item.href ?? "/#projects",
  keywords: item.meta ? [...item.meta] : [],
}));

const publicationEntries: GlobalSearchEntry[] = publicationsLibrary
  .filter((item) => item.category !== "Newsletter Editions")
  .map((item) => ({
    id: `publication-${item.slug}`,
    title: item.title,
    description: item.abstract,
    category: "Publications",
    href: `/publications/${item.slug}`,
    keywords: [item.category, item.status, ...item.keywords, ...item.authors],
  }));

const newsletterEntries: GlobalSearchEntry[] = publicationsLibrary
  .filter((item) => item.category === "Newsletter Editions")
  .map((item) => ({
    id: `newsletter-${item.slug}`,
    title: item.title,
    description: item.abstract,
    category: "Newsletters",
    href: `/publications/${item.slug}`,
    keywords: [item.category, item.status, ...item.keywords],
  }));

const professionalServiceEntries: GlobalSearchEntry[] = [
  ...professionalServiceCategories.map((item) => ({
    id: `service-category-${item.slug}`,
    title: item.title,
    description: item.description,
    category: "Professional Service" as const,
    href: "/professional-service",
    keywords: item.highlights,
  })),
  ...professionalServiceTimelineEntries.map((item) => ({
    id: `service-timeline-${item.id}`,
    title: item.title,
    description: item.summary,
    category: "Professional Service" as const,
    href: "/professional-service",
    keywords: [item.category, item.status, ...item.details],
  })),
];

const timelineSearchEntries: GlobalSearchEntry[] = timelineEntries.map((item) => ({
  id: `timeline-${item.id}`,
  title: item.title,
  description: item.summary,
  category: "Timeline",
  href: "/timeline",
  keywords: [item.category, item.status, item.milestoneType, ...item.details],
}));

const knowledgeGraphEntries: GlobalSearchEntry[] = [
  {
    id: "knowledge-graph-overview",
    title: "Research Ecosystem Knowledge Graph",
    description:
      "Interactive force-directed network connecting research domains, frameworks, projects, publications, datasets, repositories, open science profiles, and professional service.",
    category: "Knowledge Graph",
    href: "/knowledge-graph",
    keywords: ["network", "graph", "research ecosystem", "zoom", "pan", "expand", "collapse"],
  },
];

const profilePagesEntries: GlobalSearchEntry[] = [
  {
    id: "profile-about-page",
    title: "About Page",
    description: "Professional biography, research interests, memberships, and research areas with integrated portrait.",
    category: "Research",
    href: "/about",
    keywords: ["about", "biography", "research interests", "memberships"],
  },
  {
    id: "profile-contact-page",
    title: "Contact Page",
    description: "Verified contact channels with professional profile image and research context.",
    category: "Professional Service",
    href: "/contact",
    keywords: ["contact", "email", "location", "profile"],
  },
  {
    id: "profile-media-page",
    title: "Media Page",
    description: "Professional media biography and profile portrait for public context.",
    category: "Research",
    href: "/media",
    keywords: ["media", "biography", "public profile"],
  },
];

export const globalSearchEntries: GlobalSearchEntry[] = [
  ...researchEntries,
  ...frameworkEntries,
  ...datasetEntries,
  ...projectEntries,
  ...publicationEntries,
  ...newsletterEntries,
  ...professionalServiceEntries,
  ...timelineSearchEntries,
  ...knowledgeGraphEntries,
  ...profilePagesEntries,
];
