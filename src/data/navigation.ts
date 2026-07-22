import { topmateProfile } from "@/data/profileLinks";

export type NavigationChild = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

export type NavigationGroup = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
  children?: readonly NavigationChild[];
};

export const navigation: readonly NavigationGroup[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Research Hub", href: "/research" },
      { label: "Publications Library", href: "/publications" },
      { label: "Framework Library", href: "/frameworks" },
      { label: "Open Science", href: "/open-science" },
      { label: "Original Contributions", href: "/original-contributions" },
      { label: "Enterprise AI", href: "/research/enterprise-ai" },
      { label: "Enterprise AI Governance", href: "/research/enterprise-ai-governance" },
      { label: "Platform Engineering", href: "/research/platform-engineering" },
      { label: "Cloud Computing", href: "/research/cloud-computing" },
      { label: "Knowledge Systems", href: "/research/knowledge-systems" },
      { label: "Healthcare AI", href: "/research/healthcare-ai" },
      { label: "Decision Intelligence", href: "/research/decision-intelligence" },
      { label: "Responsible AI", href: "/research/responsible-ai" },
      { label: "Agentic AI", href: "/research/agentic-ai" },
      { label: "AI Observability", href: "/research/ai-observability" },
      { label: "LLMOps", href: "/research/llmops" },
    ],
  },
  { label: "Publications", href: "/publications" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Original Contributions", href: "/original-contributions" },
  { label: "Professional Service", href: "/professional-service" },
  { label: "Open Science", href: "/open-science" },
  { label: "Achievements", href: "/professional-certifications" },
  {
    label: "Ecosystem",
    href: "/knowledge-graph",
    children: [
      { label: "Knowledge Graph", href: "/knowledge-graph" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Timeline", href: "/timeline" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    label: "Projects",
    href: "/original-contributions",
    children: [
      { label: "Enterprise Digital Brain", href: "/original-contributions" },
      { label: "Enterprise AI Governance Framework", href: "/frameworks/enterprise-ai-governance-framework" },
      { label: "Enterprise AI Control Plane", href: "/frameworks/enterprise-ai-control-plane" },
      { label: "Enterprise Intelligence Framework", href: "/frameworks/enterprise-intelligence-framework" },
      { label: "BQEB Data", href: "/publications/bqeb-data-open-benchmark-dataset" },
      { label: "ForecastBench", href: "/publications/bqeb-forecastbench-benchmarking-ai-models" },
      { label: "LLMOps Maturity Model", href: "/frameworks/llmops-maturity-model" },
    ],
  },
  {
    label: "Book a Meeting",
    href: topmateProfile.href,
    external: true,
    ariaLabel: topmateProfile.ariaLabel,
  },
  { label: "Contact", href: "/contact" },
] as const;