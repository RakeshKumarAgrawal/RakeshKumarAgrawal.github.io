import certificationsData from "@/data/certifications.json";
import honorsAwardsData from "@/data/honorsAwards.json";
import { articles } from "@/data/articles";
import { dashboardResearchMetrics } from "@/data/dashboardMetrics";
import { datasets } from "@/data/datasets";
import { employment } from "@/data/employment";
import { executiveProfile } from "@/data/executiveProfile";
import { externalProfiles } from "@/data/externalProfiles";
import { frameworksLibrary } from "@/data/frameworksLibrary";
import { globalSearchEntries } from "@/data/globalSearchIndex";
import { memberships } from "@/data/memberships";
import { newsletter } from "@/data/newsletter";
import { openScienceProfiles } from "@/data/openScienceProfiles";
import { originalContributions } from "@/data/originalContributions";
import { peerReviews } from "@/data/peerReviews";
import { professionalServiceTimelineEntries } from "@/data/professionalServiceLibrary";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { projects } from "@/data/projects";
import { publicationsLibrary } from "@/data/publicationsLibrary";
import { researchAreas } from "@/data/researchAreas";
import { researchDomains } from "@/data/researchDomains";
import { services } from "@/data/services";
import { skills } from "@/data/skills";
import { software } from "@/data/software";
import { speaking } from "@/data/speaking";
import { timelineEntries } from "@/data/timelineLibrary";
import { topmateProfile } from "@/data/profileLinks";
import { dataciteProfile } from "@/lib/dataciteProfile";

export type ExecutiveFilter =
  | "All"
  | "Research"
  | "Professional"
  | "Recognition"
  | "Learning"
  | "Leadership"
  | "Open Science"
  | "Engineering"
  | "Artificial Intelligence"
  | "Cloud";

export type ExecutiveOverviewItem = {
  label: string;
  value: string;
};

export type ExecutiveMetric = {
  id: string;
  title: string;
  value: number;
  description: string;
  href: string;
  icon: string;
  filter: ExecutiveFilter;
  progress: number;
};

export type DashboardLinkedCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  chips: string[];
};

export type TechnicalSkillCard = {
  id: string;
  skill: string;
  experienceLevel: "Advanced" | "Intermediate" | "Emerging";
  supportingCertifications: string[];
  relatedResearch: string[];
};

export type ExecutiveTimelineItem = {
  id: string;
  title: string;
  domain: string;
  date: string;
  description: string;
  href: string;
  filter: ExecutiveFilter;
};

export type UnifiedSearchEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string[];
};

const certificationsDataset = certificationsData as {
  certifications: Array<{
    id: string;
    title: string;
    category: string;
    issueDate: string;
    skills: string[];
    tags: string[];
  }>;
  digitalBadges: Array<{ id: string; name: string; category: string }>;
};

const honorsDataset = honorsAwardsData as {
  recognitions: Array<{
    id: string;
    title: string;
    category: string;
    description: string;
    issueDate: string;
    tags: string[];
  }>;
};

const currentEmployment = employment.items.find((item) => /present/i.test(item.period)) ?? employment.items[0];

const publicationCount = publicationsLibrary.length;
const originalContributionCount = originalContributions.length;
const projectCount = projects.items.length;
const frameworkCount = frameworksLibrary.length;
const datasetCount = datasets.items.length;
const technicalArticleCount = publicationsLibrary.filter((item) => item.category === "Professional Articles").length;
const newsletterEditionCount = Math.max(
  publicationsLibrary.filter((item) => item.category === "Newsletter Editions").length,
  newsletter.items.length,
);
const professionalCertificationCount = certificationsDataset.certifications.length;
const digitalBadgeCount = certificationsDataset.digitalBadges.length;
const honorsAwardsCount = honorsDataset.recognitions.length;
const professionalMembershipCount = memberships.items.length;
const peerReviewCount = peerReviews.items.length;
const editorialActivityCount = professionalServiceTimelineEntries.filter((item) => item.category === "Editorial Activities").length;
const conferenceParticipationCount = professionalServiceTimelineEntries.filter((item) => item.category === "Conference Service").length;
const openScienceProfileCount = new Set(externalProfiles.items.map((item) => item.title)).size;
const githubRepositoryCount = software.items.length;
const speakingCount = speaking.items.length;
const volunteerCount = professionalServiceTimelineEntries.filter((item) => item.category === "Volunteer Activities").length;
const researchImpactCount = publicationCount + originalContributionCount + frameworkCount + datasetCount + projectCount;

const researchMetricsValue = [
  dashboardResearchMetrics.works,
  dashboardResearchMetrics.citations,
  dashboardResearchMetrics.views,
  dashboardResearchMetrics.downloads,
].reduce<number>((sum, value) => sum + (value ?? 0), 0);

const rawMetrics: Omit<ExecutiveMetric, "progress">[] = [
  {
    id: "publications",
    title: "Publications",
    value: publicationCount,
    description: "Journal papers, conference papers, chapters, reports, and articles.",
    href: "/publications",
    icon: "book",
    filter: "Research",
  },
  {
    id: "original-contributions",
    title: "Original Contributions",
    value: originalContributionCount,
    description: "Flagship frameworks, control planes, benchmark systems, and reference architectures.",
    href: "/original-contributions",
    icon: "layers",
    filter: "Research",
  },
  {
    id: "research-projects",
    title: "Research Projects",
    value: projectCount,
    description: "Applied project portfolio spanning enterprise AI, cloud, and benchmark initiatives.",
    href: "/projects",
    icon: "rocket",
    filter: "Research",
  },
  {
    id: "frameworks",
    title: "Frameworks",
    value: frameworkCount,
    description: "Enterprise and research frameworks designed for governed implementation pathways.",
    href: "/frameworks",
    icon: "network",
    filter: "Engineering",
  },
  {
    id: "datasets",
    title: "Datasets",
    value: datasetCount,
    description: "Open datasets and benchmark data assets supporting reproducible research.",
    href: "/datasets",
    icon: "database",
    filter: "Research",
  },
  {
    id: "technical-articles",
    title: "Technical Articles",
    value: technicalArticleCount,
    description: "Long-form technical publications and practitioner-oriented engineering writing.",
    href: "/publications",
    icon: "file-text",
    filter: "Professional",
  },
  {
    id: "newsletter-editions",
    title: "Newsletter Editions",
    value: newsletterEditionCount,
    description: "Newsletter contributions and ongoing public research communication cadence.",
    href: "/publications",
    icon: "newspaper",
    filter: "Professional",
  },
  {
    id: "professional-certifications",
    title: "Professional Certifications",
    value: professionalCertificationCount,
    description: "Credential portfolio across AI, cloud, standards, and delivery leadership.",
    href: "/professional-certifications",
    icon: "award",
    filter: "Learning",
  },
  {
    id: "digital-badges",
    title: "Digital Badges",
    value: digitalBadgeCount,
    description: "Verifiable digital badges linked to technical and professional competency tracks.",
    href: "/professional-certifications",
    icon: "badge",
    filter: "Learning",
  },
  {
    id: "honors-awards",
    title: "Honors & Awards",
    value: honorsAwardsCount,
    description: "Professional recognition across fellowships, memberships, leadership, and innovation.",
    href: "/honors-awards",
    icon: "sparkles",
    filter: "Recognition",
  },
  {
    id: "professional-memberships",
    title: "Professional Memberships",
    value: professionalMembershipCount,
    description: "Public memberships and standing across IEEE, IETE, and professional communities.",
    href: "/professional-service",
    icon: "users",
    filter: "Professional",
  },
  {
    id: "peer-reviews",
    title: "Peer Reviews",
    value: peerReviewCount,
    description: "Verified peer-review activity and scholarly review service footprint.",
    href: "/professional-service",
    icon: "check-circle",
    filter: "Professional",
  },
  {
    id: "editorial-activities",
    title: "Editorial Activities",
    value: editorialActivityCount,
    description: "Editorial and publication governance activities in professional service records.",
    href: "/professional-service",
    icon: "pen-square",
    filter: "Professional",
  },
  {
    id: "conference-participation",
    title: "Conference Participation",
    value: conferenceParticipationCount,
    description: "Conference and technical community participation represented in service timelines.",
    href: "/professional-service",
    icon: "calendar",
    filter: "Leadership",
  },
  {
    id: "research-metrics",
    title: "Research Metrics",
    value: researchMetricsValue,
    description: "DataCite profile metrics including works, citations, views, and downloads.",
    href: "/dashboard",
    icon: "activity",
    filter: "Research",
  },
  {
    id: "open-science-profiles",
    title: "Open Science Profiles",
    value: openScienceProfileCount,
    description: "Connected scholarly and technical identity profiles across global platforms.",
    href: "/open-science",
    icon: "globe",
    filter: "Open Science",
  },
  {
    id: "github-repositories",
    title: "GitHub Repositories",
    value: githubRepositoryCount,
    description: "Public repositories for portfolio, research artifacts, and implementation assets.",
    href: "/github",
    icon: "github",
    filter: "Engineering",
  },
  {
    id: "research-impact",
    title: "Research Impact",
    value: researchImpactCount,
    description: "Combined research artifact scale across publications, projects, frameworks, datasets, and contributions.",
    href: "/research",
    icon: "trending-up",
    filter: "Research",
  },
  {
    id: "speaking-activities",
    title: "Speaking Activities",
    value: speakingCount,
    description: "Speaking and thought-leadership sessions across enterprise AI and platform engineering.",
    href: "/media",
    icon: "mic",
    filter: "Leadership",
  },
  {
    id: "volunteer-activities",
    title: "Volunteer Activities",
    value: volunteerCount,
    description: "Volunteer leadership activities represented in standards and professional service timelines.",
    href: "/professional-service",
    icon: "handshake",
    filter: "Leadership",
  },
];

const maxMetricValue = Math.max(...rawMetrics.map((metric) => metric.value), 1);

export const executiveMetrics: ExecutiveMetric[] = rawMetrics.map((metric) => ({
  ...metric,
  progress: Math.round((metric.value / maxMetricValue) * 100),
}));

const toCommaList = (values: string[]) => values.join(", ");

export const executiveOverview: ExecutiveOverviewItem[] = [
  { label: "Professional Experience", value: executiveProfile.experienceLabel },
  { label: "Research Focus", value: profile.summary },
  { label: "Professional Memberships", value: toCommaList(executiveProfile.memberships) },
  { label: "Research Interests", value: toCommaList(researchAreas.items.map((item) => item.title)) },
  {
    label: "Current Position",
    value: currentEmployment ? `${currentEmployment.role} at ${currentEmployment.organization}` : executiveProfile.title,
  },
  { label: "Research Areas", value: toCommaList(executiveProfile.researchAreas.slice(0, 6)) },
  {
    label: "Enterprise Domains",
    value: toCommaList(Array.from(new Set(projects.items.flatMap((item) => item.meta))).slice(0, 6)),
  },
  { label: "Professional Mission", value: executiveProfile.professionalSummary },
];

export const researchImpactCards: DashboardLinkedCard[] = [
  {
    id: "impact-publications",
    title: "Research Publications",
    description: `${publicationCount} records linked to publications and long-form scholarly outputs.`,
    href: "/publications",
    chips: ["Publications", "Research"],
  },
  {
    id: "impact-original-contributions",
    title: "Original Contributions",
    description: `${originalContributionCount} original systems and frameworks with linked evidence.`,
    href: "/original-contributions",
    chips: ["Innovation", "Architecture"],
  },
  {
    id: "impact-frameworks",
    title: "Frameworks",
    description: `${frameworkCount} enterprise and applied-research frameworks available.`,
    href: "/frameworks",
    chips: ["Engineering", "Governance"],
  },
  {
    id: "impact-datasets",
    title: "Datasets",
    description: `${datasetCount} open datasets and benchmark assets for reproducibility.`,
    href: "/datasets",
    chips: ["Open Data", "Benchmark"],
  },
  {
    id: "impact-research-projects",
    title: "Research Projects",
    description: `${projectCount} project artifacts spanning AI, cloud, and enterprise domains.`,
    href: "/research",
    chips: ["Projects", "Applied Research"],
  },
  {
    id: "impact-openscience-profiles",
    title: "Open Science Profiles",
    description: `${openScienceProfiles.length} profile records connected to research outputs.`,
    href: "/open-science",
    chips: ["Open Science", "Identity"],
  },
];

export const professionalExcellenceCards: DashboardLinkedCard[] = [
  {
    id: "excellence-certifications",
    title: "Professional Certifications",
    description: `${professionalCertificationCount} certification records with verifiable metadata.`,
    href: "/professional-certifications",
    chips: ["Learning", "Credentials"],
  },
  {
    id: "excellence-digital-credentials",
    title: "Digital Credentials",
    description: `${digitalBadgeCount} digital badges and credentials represented in the profile.`,
    href: "/professional-certifications",
    chips: ["Badges", "Verification"],
  },
  {
    id: "excellence-memberships",
    title: "Professional Memberships",
    description: `${professionalMembershipCount} public memberships and society recognitions.`,
    href: "/professional-service",
    chips: ["Professional", "Membership"],
  },
  {
    id: "excellence-service",
    title: "Professional Service",
    description: `${professionalServiceTimelineEntries.length} timeline service activities with category coverage.`,
    href: "/professional-service",
    chips: ["Service", "Leadership"],
  },
  {
    id: "excellence-editorial",
    title: "Editorial Activities",
    description: `${editorialActivityCount} editorial activities available in service timelines.`,
    href: "/professional-service",
    chips: ["Editorial", "Professional"],
  },
  {
    id: "excellence-peer-review",
    title: "Peer Review",
    description: `${peerReviewCount} peer-review records from public ORCID activity.`,
    href: "/professional-service",
    chips: ["Peer Review", "Research"],
  },
  {
    id: "excellence-volunteer",
    title: "Volunteer Leadership",
    description: `${volunteerCount} volunteer service records plus standards participation entries.`,
    href: "/professional-service",
    chips: ["Volunteer", "Leadership"],
  },
  {
    id: "excellence-industry",
    title: "Industry Contributions",
    description: `${services.items.length} verified industry-facing service and standards activities.`,
    href: "/professional-service",
    chips: ["Industry", "Standards"],
  },
];

const recognitionText = (record: (typeof honorsDataset.recognitions)[number]) =>
  `${record.title} ${record.category} ${record.description} ${record.tags.join(" ")}`;

export const recognitionCards: DashboardLinkedCard[] = [
  {
    id: "recognition-honors",
    title: "Honors",
    description: `${honorsAwardsCount} recognition records in the honors dashboard repository.`,
    href: "/honors-awards",
    chips: ["Honors", "Recognition"],
  },
  {
    id: "recognition-employer",
    title: "Employer Recognition",
    description: `${honorsDataset.recognitions.filter((item) => /employer/i.test(recognitionText(item))).length} employer-associated recognitions.`,
    href: "/honors-awards",
    chips: ["Employer", "Impact"],
  },
  {
    id: "recognition-fellowships",
    title: "Professional Fellowships",
    description: `${honorsDataset.recognitions.filter((item) => /fellow/i.test(recognitionText(item))).length} fellowship-related recognitions.`,
    href: "/honors-awards",
    chips: ["Fellowships", "Professional"],
  },
  {
    id: "recognition-senior-memberships",
    title: "Senior Memberships",
    description: `${honorsDataset.recognitions.filter((item) => /senior member/i.test(recognitionText(item))).length} senior membership recognitions.`,
    href: "/honors-awards",
    chips: ["Membership", "Leadership"],
  },
  {
    id: "recognition-leadership",
    title: "Leadership Recognition",
    description: `${honorsDataset.recognitions.filter((item) => /leadership/i.test(recognitionText(item))).length} leadership recognitions represented.`,
    href: "/honors-awards",
    chips: ["Leadership", "Recognition"],
  },
  {
    id: "recognition-innovation",
    title: "Innovation Awards",
    description: `${honorsDataset.recognitions.filter((item) => /innovation/i.test(recognitionText(item))).length} innovation-focused recognitions in records.`,
    href: "/honors-awards",
    chips: ["Innovation", "Awards"],
  },
];

const openScienceTargetNames = [
  "ORCID",
  "Google Scholar",
  "ResearchGate",
  "Zenodo",
  "Harvard Dataverse",
  "IEEE DataPort",
  "GitHub",
  "LinkedIn",
  "Lens",
  "DataCite Commons",
  "ResearcherID",
  "Web of Science",
];

type OpenScienceLinkRecord = {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
  openInNewTab?: boolean;
  meta?: readonly string[];
};

const normalizedProfileName = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("lens")) {
    return "Lens";
  }
  if (lower.includes("researcherid")) {
    return "ResearcherID";
  }
  if (lower.includes("web of science")) {
    return "Web of Science";
  }

  return title;
};

const externalProfileMap = new Map<string, OpenScienceLinkRecord>(
  externalProfiles.items.map((item) => [normalizedProfileName(item.title), item]),
);

externalProfileMap.set("DataCite Commons", {
  title: "DataCite Commons",
  description: dataciteProfile.profileSummary,
  href: dataciteProfile.profileUrl,
  linkLabel: "Open Profile",
  openInNewTab: true,
  meta: ["DataCite"],
});

export const openScienceCards: DashboardLinkedCard[] = openScienceTargetNames
  .map((name) => {
    const profileItem = externalProfileMap.get(name);
    if (!profileItem) {
      return null;
    }

    return {
      id: `open-science-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: name,
      description: profileItem.description,
      href: profileItem.href,
      chips: ["Open Science", "Profile"],
    };
  })
  .filter((item): item is DashboardLinkedCard => item !== null);

const skillInputs = [
  "Artificial Intelligence",
  "Generative AI",
  "LLMOps",
  "Cloud",
  "AWS",
  "Azure",
  "Google Cloud",
  "Platform Engineering",
  "Site Reliability Engineering",
  "DevSecOps",
  "Observability",
  "Enterprise Architecture",
  "Project Management",
  "Cybersecurity",
  "Data Engineering",
  "Automation",
];

const baseSkillTitles = new Set([
  ...skillInputs,
  ...skills.items.map((item) => item.title),
  ...researchDomains.flatMap((domain) => domain.keywords),
]);

const skillMatchText = (value: string) => value.toLowerCase();

const relevantCertificationsForSkill = (skill: string) => {
  const normalized = skillMatchText(skill);
  return certificationsDataset.certifications
    .filter((item) => {
      const text = `${item.title} ${item.category} ${item.skills.join(" ")} ${item.tags.join(" ")}`.toLowerCase();
      return text.includes(normalized) || normalized.split(" ").every((part) => text.includes(part));
    })
    .slice(0, 3)
    .map((item) => item.title);
};

const relatedResearchForSkill = (skill: string) => {
  const normalized = skillMatchText(skill);
  return researchDomains
    .filter((domain) => {
      const text = `${domain.title} ${domain.summary} ${domain.keywords.join(" ")}`.toLowerCase();
      return text.includes(normalized) || normalized.split(" ").every((part) => text.includes(part));
    })
    .slice(0, 3)
    .map((domain) => domain.title);
};

const deriveExperience = (supportingCertifications: string[], relatedResearch: string[]): TechnicalSkillCard["experienceLevel"] => {
  const score = supportingCertifications.length + relatedResearch.length;

  if (score >= 4) {
    return "Advanced";
  }

  if (score >= 2) {
    return "Intermediate";
  }

  return "Emerging";
};

export const technicalSkills: TechnicalSkillCard[] = Array.from(baseSkillTitles)
  .filter((skill) => skillInputs.includes(skill) || skills.items.some((item) => item.title === skill))
  .map((skill) => {
    const supportingCertifications = relevantCertificationsForSkill(skill);
    const relatedResearch = relatedResearchForSkill(skill);

    return {
      id: `skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      skill,
      experienceLevel: deriveExperience(supportingCertifications, relatedResearch),
      supportingCertifications,
      relatedResearch,
    };
  })
  .sort((a, b) => a.skill.localeCompare(b.skill));

const periodToDate = (period: string) => {
  const match = period.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "2000-01-01";
};

const careerTimelineEntries: ExecutiveTimelineItem[] = employment.items.map((item) => ({
  id: `career-${item.organization.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${periodToDate(item.period)}`,
  title: `${item.role} · ${item.organization}`,
  domain: "Career",
  date: periodToDate(item.period),
  description: `${item.location} · ${item.period}`,
  href: "/about",
  filter: "Professional",
}));

const researchTimelineEntries: ExecutiveTimelineItem[] = publicationsLibrary.map((item) => ({
  id: `publication-${item.slug}`,
  title: item.title,
  domain: "Publication",
  date: item.publicationDate,
  description: `${item.category} · ${item.status}`,
  href: `/publications/${item.slug}`,
  filter: "Research",
}));

const projectTimelineEntries: ExecutiveTimelineItem[] = projects.items.map((item, index) => ({
  id: `project-${index}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  title: item.title,
  domain: "Project",
  date: item.meta.find((meta) => /^\d{4}$/.test(meta)) ? `${item.meta.find((meta) => /^\d{4}$/.test(meta))}-01-01` : "2026-01-01",
  description: item.description,
  href: "/projects",
  filter: "Engineering",
}));

const honorsTimelineEntries: ExecutiveTimelineItem[] = honorsDataset.recognitions.map((item) => ({
  id: `honors-${item.id}`,
  title: item.title,
  domain: "Award",
  date: item.issueDate,
  description: `${item.category} · ${item.description}`,
  href: "/honors-awards",
  filter: "Recognition",
}));

const membershipTimelineEntries: ExecutiveTimelineItem[] = memberships.items.map((item, index) => ({
  id: `membership-${index}-${item.organization.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  title: `${item.organization} · ${item.role}`,
  domain: "Membership",
  date: periodToDate(item.period),
  description: item.period,
  href: "/professional-service",
  filter: "Professional",
}));

const certificationTimelineEntries: ExecutiveTimelineItem[] = certificationsDataset.certifications.map((item) => ({
  id: `certification-${item.id}`,
  title: item.title,
  domain: "Certification",
  date: item.issueDate,
  description: item.category,
  href: "/professional-certifications",
  filter: "Learning",
}));

const milestoneTimelineEntries: ExecutiveTimelineItem[] = timelineEntries.map((item) => ({
  id: `milestone-${item.id}`,
  title: item.title,
  domain: "Professional Milestone",
  date: item.date,
  description: `${item.category} · ${item.summary}`,
  href: "/timeline",
  filter: item.category === "Research" ? "Research" : "Leadership",
}));

export const executiveTimeline: ExecutiveTimelineItem[] = [
  ...careerTimelineEntries,
  ...researchTimelineEntries,
  ...projectTimelineEntries,
  ...honorsTimelineEntries,
  ...membershipTimelineEntries,
  ...certificationTimelineEntries,
  ...milestoneTimelineEntries,
].sort((left, right) => right.date.localeCompare(left.date));

export const enterpriseImpactCards: DashboardLinkedCard[] = [
  {
    id: "enterprise-ai",
    title: "Enterprise AI",
    description: `${researchDomains.filter((domain) => /enterprise ai|agentic|governance/i.test(domain.title)).length} active domains aligned to Enterprise AI transformation.`,
    href: "/research/enterprise-ai",
    chips: ["AI", "Enterprise"],
  },
  {
    id: "cloud-transformation",
    title: "Cloud Transformation",
    description: `${certificationsDataset.certifications.filter((item) => /cloud|aws|azure/i.test(`${item.title} ${item.category} ${item.skills.join(" ")}`)).length} cloud-focused credential and project signals.`,
    href: "/research/cloud-computing",
    chips: ["Cloud", "Transformation"],
  },
  {
    id: "research-impact",
    title: "Research",
    description: `${publicationCount + projectCount} combined publication and project artifacts driving evidence-based delivery.`,
    href: "/research",
    chips: ["Research", "Impact"],
  },
  {
    id: "innovation-impact",
    title: "Innovation",
    description: `${honorsDataset.recognitions.filter((item) => /innovation/i.test(recognitionText(item))).length + originalContributionCount} innovation-aligned artifacts and recognitions.`,
    href: "/original-contributions",
    chips: ["Innovation", "Delivery"],
  },
  {
    id: "leadership-impact",
    title: "Leadership",
    description: `${professionalMembershipCount + honorsDataset.recognitions.filter((item) => /leadership|senior member|fellow/i.test(recognitionText(item))).length} leadership indicators from memberships and honors.`,
    href: "/professional-service",
    chips: ["Leadership", "Professional"],
  },
  {
    id: "open-source-impact",
    title: "Open Source",
    description: `${githubRepositoryCount} public repositories connected to the technical portfolio and research assets.`,
    href: "/github",
    chips: ["Open Source", "GitHub"],
  },
  {
    id: "platform-engineering-impact",
    title: "Platform Engineering",
    description: `${frameworksLibrary.filter((framework) => /platform|architecture/i.test(`${framework.title} ${framework.overview}`)).length} platform-centric frameworks and blueprints.`,
    href: "/frameworks",
    chips: ["Platform", "Engineering"],
  },
  {
    id: "digital-transformation-impact",
    title: "Digital Transformation",
    description: `${originalContributionCount + frameworkCount + projectCount} enterprise transformation artifacts in the delivery graph.`,
    href: "/dashboard",
    chips: ["Transformation", "Enterprise"],
  },
];

export const quickAccessLinks: Array<{ id: string; label: string; href: string; external?: boolean }> = [
  { id: "quick-research", label: "Research", href: "/research" },
  { id: "quick-publications", label: "Publications", href: "/publications" },
  { id: "quick-projects", label: "Projects", href: "/projects" },
  { id: "quick-frameworks", label: "Frameworks", href: "/frameworks" },
  { id: "quick-original", label: "Original Contributions", href: "/original-contributions" },
  { id: "quick-certifications", label: "Professional Certifications", href: "/professional-certifications" },
  { id: "quick-honors", label: "Honors & Awards", href: "/honors-awards" },
  { id: "quick-service", label: "Professional Service", href: "/professional-service" },
  { id: "quick-open-science", label: "Open Science", href: "/open-science" },
  { id: "quick-knowledge-graph", label: "Knowledge Graph", href: "/knowledge-graph" },
  { id: "quick-dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "quick-contact", label: "Contact", href: "/contact" },
  { id: "quick-topmate", label: topmateProfile.label, href: topmateProfile.href, external: true },
];

const certificationSearchEntries: UnifiedSearchEntry[] = certificationsDataset.certifications.map((item) => ({
  id: `search-certification-${item.id}`,
  title: item.title,
  description: item.category,
  category: "Certifications",
  href: "/professional-certifications",
  keywords: [...item.skills, ...item.tags],
}));

const honorsSearchEntries: UnifiedSearchEntry[] = honorsDataset.recognitions.map((item) => ({
  id: `search-honors-${item.id}`,
  title: item.title,
  description: item.description,
  category: "Awards",
  href: "/honors-awards",
  keywords: [item.category, ...item.tags],
}));

const articleSearchEntries: UnifiedSearchEntry[] = [
  {
    id: "search-articles",
    title: articles.title,
    description: articles.description,
    category: "Articles",
    href: "/publications",
    keywords: ["articles", "linkedin", "technical writing"],
  },
];

const newsletterSearchEntries: UnifiedSearchEntry[] = [
  {
    id: "search-newsletter",
    title: newsletter.title,
    description: newsletter.description,
    category: "Newsletters",
    href: "/publications",
    keywords: ["newsletter", "research updates", "linkedin"],
  },
];

const baseSearchEntries: UnifiedSearchEntry[] = globalSearchEntries.map((entry) => ({
  id: `search-${entry.id}`,
  title: entry.title,
  description: entry.description,
  category: entry.category,
  href: entry.href,
  keywords: entry.keywords,
}));

export const unifiedSearchEntries: UnifiedSearchEntry[] = [
  ...baseSearchEntries,
  ...certificationSearchEntries,
  ...honorsSearchEntries,
  ...articleSearchEntries,
  ...newsletterSearchEntries,
];

export const executiveFilters: ExecutiveFilter[] = [
  "All",
  "Research",
  "Professional",
  "Recognition",
  "Learning",
  "Leadership",
  "Open Science",
  "Engineering",
  "Artificial Intelligence",
  "Cloud",
];

export const executiveHeader = {
  title: "Executive Career Dashboard",
  subtitle:
    "A consolidated view of my research, engineering leadership, professional recognition, enterprise innovation, technical expertise, and contributions to the global technology community.",
} as const;

export const executiveSignals = {
  profileLinksCount: socials.items.length,
  enterpriseMission: executiveProfile.researchPhilosophy,
  openIdentityCount: openScienceCards.length,
  works: dataciteProfile.researchMetrics.works ?? 0,
  citations: dataciteProfile.researchMetrics.citations ?? 0,
  views: dataciteProfile.researchMetrics.views ?? 0,
  downloads: dataciteProfile.researchMetrics.downloads ?? 0,
} as const;
