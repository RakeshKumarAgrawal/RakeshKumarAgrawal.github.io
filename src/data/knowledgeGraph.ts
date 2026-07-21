import { datasets } from "./datasets";
import { externalProfiles } from "./externalProfiles";
import { frameworksLibrary } from "./frameworksLibrary";
import baseKnowledgeGraphData from "./knowledgeGraph.json";
import { openScienceProfiles } from "./openScienceProfiles";
import {
  professionalServiceCategories,
  professionalServiceTimelineEntries,
} from "./professionalServiceLibrary";
import { projects } from "./projects";
import { publicationsLibrary } from "./publicationsLibrary";
import { researchDomains } from "./researchDomains";
import { software } from "./software";

export type KnowledgeGraphCategory =
  | "Ecosystem Hub"
  | "Research Domains"
  | "Frameworks"
  | "Projects"
  | "Publications"
  | "Datasets"
  | "GitHub Repositories"
  | "Enterprise Intelligence Lab"
  | "Open Science Profiles"
  | "Professional Service";

export type KnowledgeGraphNode = {
  id: string;
  label: string;
  category: KnowledgeGraphCategory;
  description: string;
  href?: string;
  external?: boolean;
  futureWork?: string[];
  keywords?: string[];
};

export type KnowledgeGraphLink = {
  source: string;
  target: string;
  relation: string;
};

export type KnowledgeGraphData = {
  meta: {
    title: string;
    description: string;
    version: string;
  };
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
};

const categoryHubIds = {
  research: "cat-research-domains",
  frameworks: "cat-frameworks",
  projects: "cat-projects",
  publications: "cat-publications",
  datasets: "cat-datasets",
  repositories: "cat-github-repositories",
  openScience: "cat-open-science-profiles",
  professionalService: "cat-professional-service",
} as const;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[™]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toNodeId = (prefix: string, label: string) => `${prefix}-${slugify(label)}`;

const nodeMap = new Map<string, KnowledgeGraphNode>();
const linkMap = new Map<string, KnowledgeGraphLink>();
const titleToNodeId = new Map<string, string>();

const addNode = (node: KnowledgeGraphNode) => {
  if (nodeMap.has(node.id)) {
    return;
  }

  nodeMap.set(node.id, node);
  titleToNodeId.set(node.label, node.id);
};

const addLink = (source: string, target: string, relation: string) => {
  if (!nodeMap.has(source) || !nodeMap.has(target)) {
    return;
  }

  const [a, b] = source < target ? [source, target] : [target, source];
  const key = `${a}|${b}|${relation}`;

  if (linkMap.has(key)) {
    return;
  }

  linkMap.set(key, { source, target, relation });
};

const data = baseKnowledgeGraphData as KnowledgeGraphData;

data.nodes.forEach((node) => addNode(node));
data.links.forEach((link) => addLink(link.source, link.target, link.relation));

researchDomains.forEach((domain) => {
  const id = toNodeId("research-domain", domain.title);

  addNode({
    id,
    label: domain.title,
    category: "Research Domains",
    description: domain.summary,
    href: `/research/${domain.slug}`,
    futureWork: domain.futureWork,
    keywords: domain.keywords,
  });

  addLink(categoryHubIds.research, id, "includes");
});

frameworksLibrary.forEach((framework) => {
  const id = toNodeId("framework", framework.title);

  addNode({
    id,
    label: framework.title,
    category: "Frameworks",
    description: framework.overview,
    href: `/frameworks/${framework.slug}`,
    futureWork: framework.futureEnhancements,
    keywords: framework.technicalStack,
  });

  addLink(categoryHubIds.frameworks, id, "includes");
});

projects.items.forEach((project) => {
  const id = toNodeId("project", project.title);

  addNode({
    id,
    label: project.title,
    category: "Projects",
    description: project.description,
    href: project.href,
    external: true,
    keywords: project.meta ? [...project.meta] : [],
  });

  addLink(categoryHubIds.projects, id, "includes");
});

publicationsLibrary.forEach((publication) => {
  const id = toNodeId("publication", publication.title);

  addNode({
    id,
    label: publication.title,
    category: "Publications",
    description: publication.abstract,
    href: `/publications/${publication.slug}`,
    keywords: publication.keywords,
  });

  addLink(categoryHubIds.publications, id, "includes");
});

datasets.items.forEach((dataset) => {
  const id = toNodeId("dataset", dataset.title);

  addNode({
    id,
    label: dataset.title,
    category: "Datasets",
    description: dataset.description,
    href: dataset.href,
    external: true,
    keywords: dataset.meta ? [...dataset.meta] : [],
  });

  addLink(categoryHubIds.datasets, id, "includes");
});

software.items.forEach((repository) => {
  const id = toNodeId("repository", repository.title);

  addNode({
    id,
    label: repository.title,
    category: "GitHub Repositories",
    description: repository.description,
    href: repository.href,
    external: true,
    keywords: repository.meta ? [...repository.meta] : [],
  });

  addLink(categoryHubIds.repositories, id, "includes");
});

openScienceProfiles.forEach((profile) => {
  const id = toNodeId("open-science", profile.title);

  addNode({
    id,
    label: profile.title,
    category: "Open Science Profiles",
    description: profile.description,
    href: profile.profileUrl,
    external: true,
    keywords: [profile.researchFocus],
  });

  addLink(categoryHubIds.openScience, id, "includes");

  if (profile.title === "Enterprise Intelligence Lab") {
    addLink("enterprise-intelligence-lab-core", id, "represented-by");
  }
});

professionalServiceCategories.forEach((service) => {
  const id = toNodeId("service", service.title);

  addNode({
    id,
    label: service.title,
    category: "Professional Service",
    description: service.description,
    href: "/professional-service",
    keywords: service.highlights,
  });

  addLink(categoryHubIds.professionalService, id, "includes");
});

professionalServiceTimelineEntries.forEach((entry) => {
  const serviceId = toNodeId("service", entry.category);
  const publicationId = titleToNodeId.get(entry.title);

  if (serviceId) {
    addLink(serviceId, categoryHubIds.professionalService, "contributes-to");
  }

  if (publicationId) {
    addLink(serviceId, publicationId, "service-output");
  }
});

const linkByTitle = (fromTitle: string, relatedTitles: readonly string[], relation: string) => {
  const fromId = titleToNodeId.get(fromTitle);

  if (!fromId) {
    return;
  }

  relatedTitles.forEach((title) => {
    const targetId = titleToNodeId.get(title);

    if (targetId) {
      addLink(fromId, targetId, relation);
      return;
    }

    const fallbackId =
      titleToNodeId.get(title) ??
      titleToNodeId.get(title.replace("™", "")) ??
      titleToNodeId.get(title.replace(/\s+/g, " ").trim());

    if (fallbackId) {
      addLink(fromId, fallbackId, relation);
    }
  });
};

researchDomains.forEach((domain) => {
  linkByTitle(
    domain.title,
    domain.relatedPublications.map((item) => item.title),
    "supports",
  );
  linkByTitle(
    domain.title,
    domain.relatedRepositories.map((item) => item.title),
    "implemented-by",
  );
  linkByTitle(
    domain.title,
    domain.relatedDatasets.map((item) => item.title),
    "validated-by",
  );
  linkByTitle(
    domain.title,
    domain.relatedFrameworks.map((item) => item.title),
    "operationalized-by",
  );
});

frameworksLibrary.forEach((framework) => {
  linkByTitle(
    framework.title,
    framework.publications.map((item) => item.title),
    "documented-in",
  );
  linkByTitle(
    framework.title,
    framework.datasets.map((item) => item.title),
    "benchmarked-with",
  );
  linkByTitle(
    framework.title,
    framework.repositories.map((item) => item.title),
    "implemented-by",
  );
});

publicationsLibrary.forEach((publication) => {
  linkByTitle(
    publication.title,
    publication.githubRepositories.map((item) => item.title),
    "implemented-by",
  );
  linkByTitle(
    publication.title,
    publication.relatedDatasets.map((item) => item.title),
    "uses-dataset",
  );
  linkByTitle(
    publication.title,
    publication.relatedProjects.map((item) => item.title),
    "extends-project",
  );
  linkByTitle(
    publication.title,
    publication.relatedFrameworks.map((item) => item.title),
    "references-framework",
  );
});

openScienceProfiles.forEach((profile) => {
  linkByTitle(
    profile.title,
    profile.relatedPublications.map((item) => item.title),
    "showcases",
  );
  linkByTitle(
    profile.title,
    profile.relatedDatasets.map((item) => item.title),
    "hosts-data",
  );

  const githubProfileId = titleToNodeId.get("GitHub");
  const profileId = titleToNodeId.get(profile.title);

  if (profile.title === "GitHub" && githubProfileId && profileId) {
    addLink(githubProfileId, profileId, "identity");
  }
});

const labProfile = externalProfiles.items.find((item) => item.title === "Enterprise Intelligence Lab");
if (labProfile) {
  const labProfileId = titleToNodeId.get("Enterprise Intelligence Lab");
  if (labProfileId) {
    addLink("enterprise-intelligence-lab-core", labProfileId, "identity");
  }
}

export const knowledgeGraphData: KnowledgeGraphData = {
  meta: data.meta,
  nodes: [...nodeMap.values()],
  links: [...linkMap.values()],
};

export const knowledgeGraphCategories: readonly KnowledgeGraphCategory[] = [
  "Research Domains",
  "Frameworks",
  "Projects",
  "Publications",
  "Datasets",
  "GitHub Repositories",
  "Enterprise Intelligence Lab",
  "Open Science Profiles",
  "Professional Service",
];

export const knowledgeGraphNodesById = new Map(knowledgeGraphData.nodes.map((node) => [node.id, node]));
