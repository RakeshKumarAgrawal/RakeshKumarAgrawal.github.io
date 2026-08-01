import { employment } from "@/data/employment";
import { profile } from "@/data/profile";
import { scholarlyProfiles, type ScholarlyProfile } from "@/data/scholarlyProfiles";

export type ExecutiveProfileLinkKey =
  | "github"
  | ScholarlyProfile["id"]
  | "enterprise-intelligence-lab";

export type ExecutiveProfileAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ExecutiveProfileLink = {
  key: ExecutiveProfileLinkKey;
  label: string;
  href: string;
};

export type ExecutiveProfileConfig = {
  name: string;
  title: string;
  memberships: string[];
  experienceLabel: string;
  careerJourney: string;
  researchAreas: string[];
  professionalSummary: string;
  researchPhilosophy: string;
  professionalValues: string[];
  technicalExpertise: string[];
  leadership: string[];
  actions: ExecutiveProfileAction[];
  links: ExecutiveProfileLink[];
  careerTimeline: Array<{
    role: string;
    organization: string;
    period: string;
  }>;
};

export const executiveProfile: ExecutiveProfileConfig = {
  name: "Rakesh Kumar Agrawal",
  title: "Senior Consultant | Applied AI Researcher",
  memberships: ["IEEE Senior Member", "IETE Fellow"],
  experienceLabel: "20+ Years of Experience",
  careerJourney:
    "Career progression across IBM, Cognizant, and Atos with focus on enterprise technology operations, platform engineering, and applied AI delivery in large-scale environments.",
  researchAreas: [
    "Enterprise Artificial Intelligence",
    "AI Governance",
    "Platform Engineering",
    "Cloud Computing",
    "Generative AI",
    "Agentic AI",
    "Knowledge Engineering",
    "LLMOps",
    "AI Observability",
    "Responsible AI",
  ],
  professionalSummary:
    "Research Mission: I am committed to advancing Enterprise Artificial Intelligence through practical research, open science, and engineering excellence. My work focuses on creating reusable AI frameworks, governance models, enterprise knowledge systems, and benchmark datasets that help organizations deploy reliable, secure, and responsible AI solutions at scale.",
  researchPhilosophy:
    "Build enterprise AI systems that are measurable, governed, and useful in real-world operations by connecting rigorous research with practical engineering delivery.",
  professionalValues: [
    "Evidence-driven engineering and transparent decision-making",
    "Security, reliability, and governance by design",
    "Responsible AI practices with human oversight",
    "Open science and reproducible technical communication",
  ],
  technicalExpertise: [
    "Enterprise AI architecture and governance",
    "Cloud-native platform engineering and reliability",
    "Open research dataset and benchmark design",
    "Responsible AI and observability for production systems",
  ],
  leadership: [
    "Leading cross-functional architecture initiatives from strategy to execution",
    "Mentoring engineering teams on modern AI platform practices",
    "Driving standards-aligned governance across enterprise AI programs",
  ],
  actions: [
    { label: "View Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "GitHub", href: "https://github.com/RakeshKumarAgrawal", external: true },
    { label: "Contact", href: "/contact" },
  ],
  links: [
    { key: "github", label: "GitHub", href: "https://github.com/RakeshKumarAgrawal" },
    ...scholarlyProfiles.map((scholarlyProfile) => ({
      key: scholarlyProfile.id,
      label: scholarlyProfile.name,
      href: scholarlyProfile.url,
    })),
    { key: "enterprise-intelligence-lab", label: "Enterprise Intelligence Lab", href: "https://www.enterpriseintelligencelab.com/" },
  ],
  careerTimeline: employment.items.map((item) => ({
    role: item.role,
    organization: item.organization,
    period: item.period,
  })),
};

export const executiveProfileIdentity = {
  country: profile.country,
  researchFocus: profile.keywords.join(" · "),
  emails: profile.verifiedEmails,
} as const;
