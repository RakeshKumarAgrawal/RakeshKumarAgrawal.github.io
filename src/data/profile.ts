import { createAuditMetadata, orcidSource, withTraceability } from "./sources";

export const profile = {
  ...orcidSource,
  ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
  name: "Rakesh Kumar Agrawal",
  title: "Applied researcher and technology leader",
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
    "Applied researcher and technology leader with 20+ years of experience in large-scale IT operations across banking and healthcare domains. My work focuses on practical applications of AI, including intelligent healthcare, predictive analytics, and enterprise digital transformation, with emphasis on reliability, ethics, and human-in-the-loop decision support. I publish practitioner-oriented research bridging theory and real-world systems to improve performance, resilience, and value delivery.",
  verifiedEmails: ["rkagrawal@ieee.org", "rakesh1608@gmail.com"],
  verifiedDomains: ["ieee.org"],
  keywords: ["Artificial Intelligence", "Healthcare Intelligence", "Smart Healthcare"],
  researcherUrls: [
    "https://www.linkedin.com/in/rakeshkumaragrawal/",
    "https://www.researchgate.net/profile/Rakesh-Agrawal-6?ev=hdr_xprf",
    "https://scholar.google.com/citations?user=dhXBvxQAAAAJ",
    "https://www.researchid.co/rid147706",
    "https://www.webofscience.com/wos/author/record/PSK-7083-2026",
    "https://www.lens.org/lens/profile/700800239/scholar",
    "https://ieee.academia.edu/RakeshAgrawal",
    "https://zenodo.org/me/uploads?q=&f=shared_with_me%3Afalse&l=list&p=1&s=10&sort=newest",
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
