import { createAuditMetadata, linkedInSource, withTraceability } from "./sources";

const articleSource = linkedInSource("https://www.linkedin.com/in/rakeshkumaragrawal/");

export const articles = {
  ...articleSource,
  eyebrow: "Articles",
  title: "LinkedIn Articles",
  description:
    "LinkedIn is treated as the authoritative public source for article records. No individual public LinkedIn articles are currently included in the verified dataset.",
  ...withTraceability({
    source: articleSource,
    identifierType: "URL",
    identifier: "https://www.linkedin.com/in/rakeshkumaragrawal/",
  }),
  audit: createAuditMetadata({
    id: "articles-linkedin-authority",
    title: "LinkedIn Articles",
    sourceName: articleSource.sourceName,
    sourceURL: articleSource.sourceURL,
    identifierType: "URL",
    identifier: "https://www.linkedin.com/in/rakeshkumaragrawal/",
  }),
  items: [],
} as const;

