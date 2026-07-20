import { createAuditMetadata, linkedInSource, withTraceability } from "./sources";

const newsletterSource = linkedInSource("https://www.linkedin.com/in/rakeshkumaragrawal/");

export const newsletter = {
  ...newsletterSource,
  eyebrow: "Newsletter",
  title: "LinkedIn Newsletter",
  description:
    "LinkedIn is treated as the authoritative public source for newsletter editions. No individual public editions are currently included in the verified dataset.",
  archiveURL: "https://www.linkedin.com/in/rakeshkumaragrawal/",
  ...withTraceability({
    source: newsletterSource,
    identifierType: "URL",
    identifier: "https://www.linkedin.com/in/rakeshkumaragrawal/",
  }),
  audit: createAuditMetadata({
    id: "newsletter-linkedin-authority",
    title: "LinkedIn Newsletter",
    sourceName: newsletterSource.sourceName,
    sourceURL: newsletterSource.sourceURL,
    identifierType: "URL",
    identifier: "https://www.linkedin.com/in/rakeshkumaragrawal/",
  }),
  items: [],
} as const;
