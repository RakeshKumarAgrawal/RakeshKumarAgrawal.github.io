import { employment } from "@/data/employment";
import { profile } from "@/data/profile";

export type ExecutiveProfileLinkKey =
  | "github"
  | "google-scholar"
  | "orcid"
  | "researchgate"
  | "zenodo"
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
  researchAreas: string[];
  professionalSummary: string;
  researchPhilosophy: string;
  technicalExpertise: string[];
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
    "Applied AI researcher and enterprise technology leader focused on designing scalable, secure, and responsible AI systems. My work bridges research and industry by developing enterprise AI architectures, governance frameworks, open research datasets, and cloud-native engineering solutions that enable trustworthy intelligent systems.",
  researchPhilosophy:
    "Build enterprise AI systems that are measurable, governed, and useful in real-world operations by connecting rigorous research with practical engineering delivery.",
  technicalExpertise: [
    "Enterprise AI architecture and governance",
    "Cloud-native platform engineering and reliability",
    "Open research dataset and benchmark design",
    "Responsible AI and observability for production systems",
  ],
  actions: [
    { label: "View Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "GitHub", href: "https://github.com/RakeshKumarAgrawal", external: true },
    { label: "Contact", href: "/contact" },
  ],
  links: [
    { key: "github", label: "GitHub", href: "https://github.com/RakeshKumarAgrawal" },
    { key: "google-scholar", label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=dhXBvxQAAAAJ" },
    { key: "orcid", label: "ORCID", href: "https://orcid.org/0009-0009-7113-5539" },
    { key: "researchgate", label: "ResearchGate", href: "https://www.researchgate.net/profile/Rakesh-Agrawal-6?ev=hdr_xprf" },
    { key: "zenodo", label: "Zenodo", href: "https://zenodo.org/" },
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
