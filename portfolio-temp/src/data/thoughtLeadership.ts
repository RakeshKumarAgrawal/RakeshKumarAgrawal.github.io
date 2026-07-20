import type { ContentSectionData } from "@/components/home/ContentSection";

import { articles } from "./articles";
import { linkedInSource, zenodoSource } from "./sources";
import { newsletter } from "./newsletter";

const architectureNotesSource = zenodoSource("https://doi.org/10.5281/zenodo.21347650");
const enterpriseInsightsSource = zenodoSource("https://doi.org/10.5281/zenodo.21349856");
const commentarySource = zenodoSource("https://doi.org/10.71097/ijsat.v17.i2.10738");

export const thoughtLeadership: ContentSectionData = {
  eyebrow: "Thought Leadership",
  title: "Thought Leadership",
  description:
    "Verified public writing, framework notes, and commentary collected from authoritative public sources.",
  items: [
    {
      title: "Enterprise Intelligence Lab Newsletter",
      description:
        "LinkedIn is the authoritative source for newsletter editions. No individual public editions are currently included in the verified dataset.",
      href: newsletter.archiveURL,
      linkLabel: "Open LinkedIn",
      openInNewTab: true,
      meta: ["LinkedIn", "Newsletter"],
      source: newsletter.source,
      sourceName: newsletter.sourceName,
      sourceURL: newsletter.sourceURL,
      verified: newsletter.verified,
      lastVerified: newsletter.lastVerified,
      identifierType: newsletter.identifierType,
      identifier: newsletter.identifier,
      audit: newsletter.audit,
    },
    {
      title: "LinkedIn Articles",
      description:
        "LinkedIn is the authoritative source for article records. No individual public LinkedIn articles are currently included in the verified dataset.",
      href: articles.sourceURL,
      linkLabel: "Open LinkedIn",
      openInNewTab: true,
      meta: ["LinkedIn", "Articles"],
      source: articles.source,
      sourceName: articles.sourceName,
      sourceURL: articles.sourceURL,
      verified: articles.verified,
      lastVerified: articles.lastVerified,
      identifierType: articles.identifierType,
      identifier: articles.identifier,
      audit: articles.audit,
    },
    {
      title: "Research Commentary",
      description:
        "DOI-backed public research commentary and applied analysis are currently represented through public works such as Digital Brain for IT Operations and Observability.",
      href: "https://doi.org/10.71097/ijsat.v17.i2.10738",
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Commentary", "DOI"],
      source: commentarySource.source,
      sourceName: commentarySource.sourceName,
      sourceURL: commentarySource.sourceURL,
      verified: commentarySource.verified,
      lastVerified: commentarySource.lastVerified,
      identifierType: "DOI",
      identifier: "10.71097/ijsat.v17.i2.10738",
    },
    {
      title: "Architecture Notes",
      description:
        "Public architecture and operating-model notes are represented through DOI-backed framework publications such as Enterprise Intelligence Framework™.",
      href: "https://doi.org/10.5281/zenodo.21347650",
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Architecture", "Frameworks"],
      source: architectureNotesSource.source,
      sourceName: architectureNotesSource.sourceName,
      sourceURL: architectureNotesSource.sourceURL,
      verified: architectureNotesSource.verified,
      lastVerified: architectureNotesSource.lastVerified,
      identifierType: "DOI",
      identifier: "10.5281/zenodo.21347650",
    },
    {
      title: "Enterprise AI Insights",
      description:
        "Public enterprise AI insights are currently represented through DOI-backed works such as LLMOps Maturity Model™ and Enterprise AI Governance Framework™.",
      href: "https://doi.org/10.5281/zenodo.21349856",
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Enterprise AI", "Insights"],
      source: enterpriseInsightsSource.source,
      sourceName: enterpriseInsightsSource.sourceName,
      sourceURL: enterpriseInsightsSource.sourceURL,
      verified: enterpriseInsightsSource.verified,
      lastVerified: enterpriseInsightsSource.lastVerified,
      identifierType: "DOI",
      identifier: "10.5281/zenodo.21349856",
    },
  ],
};
