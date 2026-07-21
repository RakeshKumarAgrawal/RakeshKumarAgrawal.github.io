export type NavigationChild = {
  label: string;
  href: string;
};

export type NavigationGroup = {
  label: string;
  href: string;
  children?: readonly NavigationChild[];
};

export const navigation: readonly NavigationGroup[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Publications Library", href: "/publications" },
      { label: "Framework Library", href: "/frameworks" },
      { label: "Open Science", href: "/open-science" },
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
  { label: "Knowledge Graph", href: "/knowledge-graph" },
  { label: "About Page", href: "/about" },
  { label: "Contact Page", href: "/contact" },
  { label: "Media", href: "/media" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Timeline", href: "/timeline" },
  { label: "Open Science", href: "/open-science" },
  { label: "Professional Service", href: "/professional-service" },
  { label: "Certifications", href: "/professional-certifications" },
  { label: "Original Contributions", href: "/original-contributions" },
  {
    label: "Projects",
    href: "/#projects",
    children: [
      { label: "Enterprise Digital Brain", href: "/#projects" },
      { label: "Enterprise AI Blueprints", href: "/#projects" },
      { label: "Enterprise Intelligence Lab", href: "/#external-profiles" },
      { label: "Research Portfolio", href: "/#projects" },
      { label: "ForecastBench", href: "/#projects" },
      { label: "Open Source", href: "/#evidence" },
    ],
  },
  {
    label: "Thought Leadership",
    href: "/#thought-leadership",
    children: [
      { label: "LinkedIn Newsletter", href: "/#thought-leadership" },
      { label: "Articles", href: "/#thought-leadership" },
      { label: "Technical Blogs", href: "/#thought-leadership" },
      { label: "White Papers", href: "/#thought-leadership" },
      { label: "Research Insights", href: "/#thought-leadership" },
      { label: "Architecture Notes", href: "/#thought-leadership" },
    ],
  },
  {
    label: "Professional Activities",
    href: "/professional-service",
    children: [
      { label: "Service Library", href: "/professional-service" },
      { label: "IEEE Senior Member", href: "/#ieee" },
      { label: "IEEE Reviews", href: "/#ieee" },
      { label: "IEEE Innovation Portal", href: "/#ieee" },
      { label: "IEEE DataPort", href: "/#ieee" },
      { label: "IEEE Standards", href: "/#ieee" },
      { label: "Editorial Activities", href: "/#professional-activities" },
      { label: "Professional Memberships", href: "/#professional-activities" },
      { label: "Community Contributions", href: "/#professional-activities" },
    ],
  },
  { label: "External Profiles", href: "/#external-profiles" },
  { label: "Contact", href: "/#contact" },
] as const;