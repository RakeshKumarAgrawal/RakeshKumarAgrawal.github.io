export const NEWSLETTER_HOME =
  "https://www.linkedin.com/newsletters/enterprise-intelligence-lab-7462839222043828224/";
export const LATEST_EDITION =
  "https://www.linkedin.com/pulse/enterprise-ai-security-protecting-autonomous-rakesh-agrawal-vgxpc/";

export type NewsletterEdition = {
  title: string;
  edition: number;
  publicationDate: string;
  summary: string;
  topics: string[];
  readingTime: number | null;
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
  "Enterprise AI Security Architecture",
  "AI Agent Security",
  "AI Identity Security",
  "AI Data Protection",
  "Model Security",
  "Prompt and Context Security",
  "Runtime AI Security",
  "Tool and API Security",
  "AI Security Governance",
  "AI Security Maturity Model",
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

export const newsletterEditions: NewsletterEdition[] = [
  {
    title: "Enterprise AI Security: Protecting the Autonomous AI Enterprise",
    edition: 8,
    publicationDate: "2026-08-03",
    summary:
      "As enterprises move toward autonomous AI systems, security must evolve beyond traditional application protection. This edition explores how organizations can secure AI agents, models, data, prompts, tools, and autonomous workflows through a comprehensive Enterprise AI Security framework.",
    topics: [
      "Enterprise AI Security Architecture",
      "AI Agent Security",
      "AI Identity Security",
      "AI Data Protection",
      "Model Security",
      "Prompt and Context Security",
      "Runtime AI Security",
      "Tool and API Security",
      "AI Security Governance",
      "AI Security Maturity Model",
    ],
    readingTime: null,
    linkedinUrl: LATEST_EDITION,
    featured: true,
    category: "Enterprise AI Security",
    relatedFrameworks: [
      { label: "Enterprise AI Control Plane", href: "/frameworks/enterprise-ai-control-plane" },
      { label: "Enterprise AI Assurance™", href: "/research/responsible-ai" },
      { label: "AI Observability", href: "/research/ai-observability" },
      { label: "LLMOps", href: "/research/llmops" },
    ],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "Enterprise AI Assurance: Building Trustworthy AI Systems at Scale",
    edition: 7,
    publicationDate: "2026-07-27",
    summary:
      "Explores Enterprise AI Assurance as a practical framework for building reliable, trustworthy, secure, governed, and production-ready AI systems. The edition connects governance, observability, evaluation, risk management, and operational excellence into a unified enterprise assurance strategy.",
    topics: ["Enterprise AI Assurance™", "AI Governance", "Responsible AI"],
    readingTime: null,
    linkedinUrl: LATEST_EDITION,
    featured: false,
    category: "Enterprise AI Assurance",
    relatedFrameworks: [{ label: "Enterprise AI Governance Framework", href: "/frameworks/enterprise-ai-governance-framework" }],
    relatedPublications: [],
    relatedBooks: [{ label: "From Zero to AI", href: "/books" }],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "The Enterprise AI Control Plane",
    edition: 6,
    publicationDate: "2026-07-20",
    summary: "",
    topics: ["AI Control Plane", "Enterprise AI Agents", "AI Governance"],
    readingTime: null,
    linkedinUrl: "https://www.linkedin.com/pulse/enterprise-ai-control-plane-why-agent-governance-must-rakesh-agrawal-vajcc",
    featured: false,
    category: "AI Control Plane",
    relatedFrameworks: [{ label: "Enterprise AI Control Plane", href: "/frameworks/enterprise-ai-control-plane" }],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "AI Observability: Measuring What Matters in Enterprise AI",
    edition: 5,
    publicationDate: "2026-07-13",
    summary: "",
    topics: ["AI Observability", "Enterprise AI"],
    readingTime: null,
    linkedinUrl: "https://www.linkedin.com/pulse/ai-observability-measuring-what-matters-enterprise-rakesh-agrawal-p1u4c",
    featured: false,
    category: "AI Observability",
    relatedFrameworks: [],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "LLMOps: The Missing Layer Between AI Innovation and Enterprise Production",
    edition: 4,
    publicationDate: "2026-07-06",
    summary: "",
    topics: ["LLMOps", "Platform Engineering"],
    readingTime: null,
    linkedinUrl: "https://www.linkedin.com/pulse/llmops-missing-layer-between-ai-innovation-enterprise-rakesh-agrawal-p3fac",
    featured: false,
    category: "LLMOps",
    relatedFrameworks: [],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "The Enterprise AI Operating Model",
    edition: 3,
    publicationDate: "2026-06-29",
    summary: "",
    topics: ["Enterprise AI Operating Model", "Enterprise Architecture"],
    readingTime: null,
    linkedinUrl: "https://www.linkedin.com/pulse/enterprise-ai-operating-model-why-most-projects-fail-how-agrawal-3kulc",
    featured: false,
    category: "Enterprise AI Operating Model",
    relatedFrameworks: [],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "The Rise of Enterprise AI Agents: From Chatbots to Autonomous Digital Workers",
    edition: 2,
    publicationDate: "2026-06-22",
    summary: "",
    topics: ["Enterprise AI Agents", "Agentic AI"],
    readingTime: null,
    linkedinUrl: "https://www.linkedin.com/pulse/rise-enterprise-ai-agents-from-chatbots-autonomous-digital-agrawal-hlywc",
    featured: false,
    category: "Enterprise AI Agents",
    relatedFrameworks: [],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
  {
    title: "Beyond the Hype: Building the Blueprint for True Enterprise Intelligence",
    edition: 1,
    publicationDate: "2026-06-15",
    summary: "",
    topics: ["Enterprise AI", "Enterprise Architecture"],
    readingTime: null,
    linkedinUrl: "https://www.linkedin.com/pulse/beyond-hype-building-blueprint-true-enterprise-rakesh-agrawal-idqdc",
    featured: false,
    category: "Enterprise Intelligence",
    relatedFrameworks: [],
    relatedPublications: [],
    relatedBooks: [],
    relatedRepositories: [],
    relatedDatasets: [],
  },
];

export const newsletterPortal = {
  title: "Enterprise Intelligence Lab Newsletter",
  subtitle: "Enterprise AI Thought Leadership & Applied Research Series",
  description:
    "The Enterprise Intelligence Lab Newsletter is my official publication series exploring Enterprise Artificial Intelligence, AI Governance, Platform Engineering, Enterprise Architecture, AI Assurance, Responsible AI, and Digital Transformation. Each edition translates applied research into practical guidance for technology leaders, architects, researchers, and engineering professionals.",
  archiveUrl: NEWSLETTER_HOME,
  frequency: "Monthly",
  establishedYear: 2026,
  badges: ["LinkedIn Newsletter", "Enterprise Intelligence Lab", "Original Content", "Monthly Research Publication"],
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
const verifiedReadingTimes = newsletterEditions.flatMap((edition) =>
  edition.readingTime === null ? [] : [edition.readingTime],
);
const averageReadingTime = verifiedReadingTimes.length
  ? Math.round(verifiedReadingTimes.reduce((total, readingTime) => total + readingTime, 0) / verifiedReadingTimes.length)
  : null;
const frameworkReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedFrameworks.length, 0);
const publicationReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedPublications.length, 0);
const bookReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedBooks.length, 0);
const datasetReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedDatasets.length, 0);
const repositoryReferenceCount = newsletterEditions.reduce((total, edition) => total + edition.relatedRepositories.length, 0);

export const authorityMetrics = [
  { label: "Published Editions", value: newsletterEditions.length },
  { label: "Publication Frequency", value: newsletterPortal.frequency },
  { label: "Enterprise AI Topics", value: newsletterTopics.length, suffix: "+" },
  { label: "Years Active", value: Math.max(new Date().getFullYear() - newsletterPortal.establishedYear + 1, 1), suffix: "+" },
  { label: "Research Series", value: 1 },
  { label: "Original Articles", value: newsletterEditions.length },
  { label: "LinkedIn Publication", value: "Authority source" },
  { label: "Open Access", value: "LinkedIn" },
] as const;

export const newsletterMetrics = [
  { label: "Total Editions", value: newsletterEditions.length },
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

export const archiveStatistics = [
  { label: "Total Published Editions", value: newsletterEditions.length },
  { label: "Latest Edition", value: `#${latestNewsletterEdition?.edition ?? newsletterEditions.length}` },
  { label: "Publication Frequency", value: newsletterPortal.frequency },
  { label: "Series", value: "Enterprise Intelligence Lab" },
  { label: "Research Focus", value: "Enterprise AI" },
] as const;
