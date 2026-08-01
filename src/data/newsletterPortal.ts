import { newsletter } from "@/data/newsletter";

export type NewsletterEdition = {
  title: string;
  edition: number;
  publicationDate: string;
  summary: string;
  topics: string[];
  readingTime: number;
  linkedinUrl: string;
  featured: boolean;
  category: string;
  relatedFrameworks: Array<{ label: string; href: string }>;
  relatedPublications: Array<{ label: string; href: string }>;
  relatedBooks: Array<{ label: string; href: string }>;
  relatedRepositories: Array<{ label: string; href: string }>;
  relatedDatasets: Array<{ label: string; href: string }>;
};

export const newsletterTopics = [
  "Enterprise AI",
  "Enterprise AI Assurance™",
  "Enterprise AI Operating Model",
  "AI Governance",
  "Responsible AI",
  "Agentic AI",
  "Enterprise AI Agents",
  "AI Observability",
  "LLMOps",
  "Platform Engineering",
  "Enterprise Architecture",
  "Knowledge Engineering",
  "Cloud AI",
  "AI Control Plane",
  "Enterprise Digital Twins",
  "Open Science",
  "Benchmarking",
  "Applied AI",
  "Research Engineering",
] as const;

// Add only publicly verified LinkedIn editions. The authority record currently exposes no edition-level URLs.
export const newsletterEditions: NewsletterEdition[] = [];

export const newsletterPortal = {
  title: "Enterprise Intelligence Lab Newsletter",
  subtitle: "Enterprise AI Thought Leadership & Applied Research Series",
  description:
    "The Enterprise Intelligence Lab Newsletter is my official publication series exploring Enterprise Artificial Intelligence, AI Governance, Platform Engineering, Enterprise Architecture, AI Assurance, Responsible AI, and Digital Transformation. Each edition translates applied research into practical guidance for technology leaders, architects, researchers, and engineering professionals.",
  archiveUrl: newsletter.archiveURL,
  frequency: "Weekly",
  establishedYear: 2026,
  badges: ["LinkedIn Newsletter", "Enterprise Intelligence Lab", "Original Content", "Weekly Publication"],
} as const;

export const researchConnections = [
  { title: "Frameworks", description: "Reusable enterprise architectures and governed implementation models.", href: "/frameworks" },
  { title: "Books", description: "Long-form technical learning and Enterprise AI guidance.", href: "/books" },
  { title: "Peer-reviewed Publications", description: "Scholarly outputs, reports, and evidence-backed research.", href: "/publications" },
  { title: "BQEB Research", description: "Benchmark data and forecasting research for applied AI evaluation.", href: "/publications/bqeb-forecastbench-benchmarking-ai-models" },
  { title: "Enterprise AI Assurance™", description: "Research pathways for trustworthy AI controls and evidence.", href: "/research/responsible-ai" },
  { title: "Enterprise Digital Brain", description: "Institutional memory, contextual reasoning, and execution architecture.", href: "/frameworks/enterprise-digital-brain" },
  { title: "Original Contributions", description: "Original systems, benchmarks, control planes, and reference architectures.", href: "/original-contributions" },
  { title: "GitHub Projects", description: "Open implementation assets and public engineering repositories.", href: "/github" },
  { title: "Research Portfolio", description: "Integrated view of active Enterprise AI research domains.", href: "/research" },
] as const;

export const researchImpact = [
  { title: "Research to Practice", description: "Translates applied research into guidance that can inform real enterprise delivery." },
  { title: "Reusable Methodologies", description: "Shares repeatable Enterprise AI methods for architecture, governance, and operations." },
  { title: "Original Frameworks", description: "Documents original frameworks and the reasoning behind their design choices." },
  { title: "Academia and Industry", description: "Connects scholarly inquiry with the constraints and opportunities of production systems." },
  { title: "Trustworthy Adoption", description: "Supports measurable, governed, and responsible adoption of Artificial Intelligence." },
  { title: "Responsible Engineering", description: "Promotes assurance, oversight, transparency, and safety throughout the AI lifecycle." },
  { title: "Architecture Guidance", description: "Provides practical direction for platforms, control planes, knowledge systems, and LLMOps." },
  { title: "Open Science", description: "Connects public communication with reproducible research, datasets, benchmarks, and repositories." },
] as const;

export const ecosystemConnections = [
  { title: "Newsletter", href: "/publications/linkedin-newsletter-authority-record" },
  { title: "Books", href: "/books" },
  { title: "Frameworks", href: "/frameworks" },
  { title: "Publications", href: "/publications" },
  { title: "Projects", href: "/projects" },
  { title: "Professional Service", href: "/professional-service" },
  { title: "Professional Memberships", href: "/about" },
  { title: "Original Contributions", href: "/original-contributions" },
  { title: "Executive Dashboard", href: "/executive-dashboard" },
] as const;

export const latestNewsletterEdition =
  newsletterEditions.find((edition) => edition.featured) ??
  [...newsletterEditions].sort((first, second) => second.publicationDate.localeCompare(first.publicationDate))[0] ??
  null;

const distinctEditionTopics = new Set(newsletterEditions.flatMap((edition) => edition.topics));
const averageReadingTime = newsletterEditions.length
  ? Math.round(newsletterEditions.reduce((total, edition) => total + edition.readingTime, 0) / newsletterEditions.length)
  : null;
const frameworkReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedFrameworks.length, 0);
const publicationReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedPublications.length, 0);
const bookReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedBooks.length, 0);
const datasetReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedDatasets.length, 0);
const repositoryReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedRepositories.length, 0);

export const authorityMetrics = [
  { label: "Published Editions", value: newsletterEditions.length, suffix: " verified" },
  { label: "Publication Frequency", value: newsletterPortal.frequency },
  { label: "Enterprise AI Topics", value: newsletterTopics.length, suffix: "+" },
  { label: "Years Active", value: Math.max(new Date().getFullYear() - newsletterPortal.establishedYear + 1, 1), suffix: "+" },
  { label: "Research Series", value: 1 },
  { label: "Original Articles", value: newsletterEditions.length, suffix: " verified" },
  { label: "LinkedIn Publication", value: "Authority source" },
  { label: "Open Access", value: "LinkedIn" },
] as const;

export const newsletterMetrics = [
  { label: "Total Editions", value: newsletterEditions.length, suffix: " verified" },
  { label: "Enterprise Topics Covered", value: distinctEditionTopics.size },
  { label: "Average Reading Time", value: averageReadingTime ?? "Not available", suffix: averageReadingTime ? " min" : undefined },
  { label: "Publication Frequency", value: newsletterPortal.frequency },
  { label: "LinkedIn Publication", value: "Authority source" },
  { label: "Research Articles", value: newsletterEditions.length },
  { label: "Framework References", value: frameworkReferenceCount },
  { label: "Books Referenced", value: bookReferenceCount },
  { label: "Datasets Referenced", value: datasetReferenceCount },
  { label: "GitHub Repositories Linked", value: repositoryReferenceCount },
  { label: "Open Science Resources", value: publicationReferenceCount + datasetReferenceCount + repositoryReferenceCount },
] as const;
