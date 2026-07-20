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
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  {
    label: "Research",
    href: "#research",
    children: [
      { label: "Publications", href: "#research" },
      { label: "Datasets", href: "#research" },
      { label: "Peer Reviews", href: "#evidence" },
      { label: "White Papers", href: "#research" },
      { label: "Technical Reports", href: "#research" },
      { label: "Research Areas", href: "#research" },
      { label: "Benchmarks", href: "#research" },
      { label: "Open Science", href: "#research" },
    ],
  },
  {
    label: "Projects",
    href: "#projects",
    children: [
      { label: "Enterprise Digital Brain", href: "#projects" },
      { label: "Enterprise AI Blueprints", href: "#projects" },
      { label: "Enterprise Intelligence Lab", href: "#external-profiles" },
      { label: "Research Portfolio", href: "#projects" },
      { label: "ForecastBench", href: "#projects" },
      { label: "Open Source", href: "#evidence" },
    ],
  },
  {
    label: "Thought Leadership",
    href: "#thought-leadership",
    children: [
      { label: "LinkedIn Newsletter", href: "#thought-leadership" },
      { label: "Articles", href: "#thought-leadership" },
      { label: "Technical Blogs", href: "#thought-leadership" },
      { label: "White Papers", href: "#thought-leadership" },
      { label: "Research Insights", href: "#thought-leadership" },
      { label: "Architecture Notes", href: "#thought-leadership" },
    ],
  },
  {
    label: "Professional Activities",
    href: "#professional-activities",
    children: [
      { label: "IEEE Senior Member", href: "#ieee" },
      { label: "IEEE Reviews", href: "#ieee" },
      { label: "IEEE Innovation Portal", href: "#ieee" },
      { label: "IEEE DataPort", href: "#ieee" },
      { label: "IEEE Standards", href: "#ieee" },
      { label: "Editorial Activities", href: "#professional-activities" },
      { label: "Professional Memberships", href: "#professional-activities" },
      { label: "Community Contributions", href: "#professional-activities" },
    ],
  },
  { label: "External Profiles", href: "#external-profiles" },
  { label: "Contact", href: "#contact" },
] as const;