import {
  createAuditMetadata,
  ieeeInnovationPortalSource,
  withTraceability,
} from "./sources";

const innovationSource = ieeeInnovationPortalSource("https://innovationatwork.ieee.org/");

export const innovationPortal = {
  ...innovationSource,
  eyebrow: "Innovation Portfolio",
  title: "IEEE Innovation Portfolio",
  description:
    "No individual public IEEE Innovation Portal submissions are currently included in the verified dataset. Only publicly accessible entries should be added here.",
  ...withTraceability({
    source: innovationSource,
    identifierType: "URL",
    identifier: "https://innovationatwork.ieee.org/",
  }),
  audit: createAuditMetadata({
    id: "innovation-portfolio-ieee-authority",
    title: "IEEE Innovation Portfolio",
    sourceName: innovationSource.sourceName,
    sourceURL: innovationSource.sourceURL,
    identifierType: "URL",
    identifier: "https://innovationatwork.ieee.org/",
  }),
  items: [],
} as const;
