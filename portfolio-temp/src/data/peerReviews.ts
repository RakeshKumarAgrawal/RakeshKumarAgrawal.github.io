import { createAuditMetadata, orcidSource, withTraceability } from "./sources";

export const peerReviews = {
  ...orcidSource,
  eyebrow: "Peer Reviews",
  title: "Verified public peer review activity",
  description:
    "Only public ORCID peer review metadata is included. ORCID currently exposes group-level IGI Global review activity without confidential manuscript titles or per-review dates.",
  stats: {
    totalReviews: 9,
    reviewGroups: 1,
    publicationOrGrantCount: 1,
    publisher: "IGI Global",
    reviewGroup: "IGI Global Book Chapter Peer Reviews",
    visibility: "public",
    ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
  },
  items: Array.from({ length: 9 }, (_, index) => ({
    title: `Public peer review record ${index + 1}`,
    description:
      "ORCID publicly exposes review activity in aggregate form for IGI Global book chapter peer reviews. Detailed manuscript information is not publicly available and is intentionally omitted.",
    publisher: "IGI Global",
    reviewGroup: "IGI Global Book Chapter Peer Reviews",
    reviewDate: null,
    role: null,
    type: null,
    visibility: "public",
    sourceOrganization: "ORCID",
    reviewURL: null,
    meta: ["Peer review", "Public ORCID record"],
    ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
    audit: createAuditMetadata({
      id: `peer-review-igi-global-${index + 1}`,
      title: `Public peer review record ${index + 1}`,
      sourceName: orcidSource.sourceName,
      sourceURL: orcidSource.sourceURL,
      identifierType: "ORCID",
      identifier: "0009-0009-7113-5539",
    }),
    ...orcidSource,
  })),
} as const;
