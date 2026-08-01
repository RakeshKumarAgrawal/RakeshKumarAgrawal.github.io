import { createAuditMetadata, orcidSource, withTraceability } from "./sources";
import { scholarlyProfiles } from "./scholarlyProfiles";

export const profile = {
  ...orcidSource,
  ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
  name: "Rakesh Kumar Agrawal",
  title: "Applied AI Researcher | Enterprise AI Architect | Platform Engineering Leader",
  organization: "Enterprise Intelligence Lab",
  roles: [
    "Applied researcher",
    "Technology leader",
    "Senior Consultant at Atos",
    "Infra Dev Specialist at Cognizant",
    "System lead Specialist at IBM",
  ],
  biography:
    "Applied researcher and technology leader with 20+ years of experience in large-scale IT operations across banking and healthcare domains. My work focuses on practical applications of AI, including intelligent healthcare, predictive analytics, and enterprise digital transformation, with emphasis on reliability, ethics, and human-in-the-loop decision support. I publish practitioner-oriented research bridging theory and real-world systems to improve performance, resilience, and value delivery.",
  summary:
    "Designing trustworthy Enterprise AI systems through applied research, scalable cloud platforms, and AI governance. My work bridges academic innovation with real-world enterprise implementation across banking, healthcare, and cloud-native technologies.",
  verifiedEmails: ["rkagrawal@ieee.org", "rakesh1608@gmail.com"],
  verifiedDomains: ["ieee.org"],
  keywords: ["Artificial Intelligence", "Healthcare Intelligence", "Smart Healthcare"],
  researcherUrls: [
    ...scholarlyProfiles.map((profile) => profile.url),
    "https://www.linkedin.com/in/rakeshkumaragrawal/",
    "https://www.researchid.co/rid147706",
    "https://ieee.academia.edu/RakeshAgrawal",
    "https://sciprofiles.com/profile/5234141",
  ],
  externalIdentifiers: [
    {
      label: "ORCID",
      value: "0009-0009-7113-5539",
      ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
    },
    {
      label: "SciProfiles",
      value: "5234141",
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://sciprofiles.com/profile/5234141" }),
    },
  ],
  peerReviewStats: {
    totalReviews: 9,
    reviewGroups: 1,
    publicationOrGrantCount: 1,
    reviewGroupLabel: "IGI Global Book Chapter Peer Reviews",
    ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
  },
  country: "United States",
  audit: createAuditMetadata({
    id: "profile-rakesh-kumar-agrawal-orcid",
    title: "Rakesh Kumar Agrawal",
    sourceName: orcidSource.sourceName,
    sourceURL: orcidSource.sourceURL,
    identifierType: "ORCID",
    identifier: "0009-0009-7113-5539",
  }),
} as const;
