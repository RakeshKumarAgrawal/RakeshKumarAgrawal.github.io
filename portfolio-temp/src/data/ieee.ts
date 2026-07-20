import type { ContentSectionData } from "@/components/home/ContentSection";

import { innovationPortal } from "./innovationPortal";
import { memberships } from "./memberships";
import { services } from "./services";
import { withTraceability, ieeeDataPortSource, orcidSource } from "./sources";

const dataportSource = ieeeDataPortSource("https://ieee-dataport.org/");

export const ieee: ContentSectionData = {
  eyebrow: "IEEE",
  title: "IEEE Activity",
  description:
    "Verified public IEEE-related memberships, reviewer activity, standards participation, and data publishing surfaces.",
  items: [
    {
      title: "IEEE Senior Member",
      description: "Public ORCID membership entries include IEEE Computer Society Senior Member and IEEE Standards Association Senior Member.",
      href: memberships.items[1].url,
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Membership", "IEEE"],
      ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
    },
    {
      title: "IEEE Reviewer Activities",
      description: "Public ORCID activity includes IEEE Computer Society reviewer service.",
      href: memberships.items[0].url,
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Reviewer", "IEEE Computer Society"],
      ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
    },
    {
      title: "IEEE DataPort",
      description: "Public ORCID works include IEEE DataPort-linked datasets and related repository records.",
      href: dataportSource.url,
      linkLabel: "Open Platform",
      openInNewTab: true,
      meta: ["Data publishing", "Repository"],
      ...withTraceability({ source: dataportSource, identifierType: "URL", identifier: dataportSource.url }),
    },
    {
      title: "IEEE Standards Participation",
      description: "Public ORCID service records include IEEE Standards Association participation and senior membership.",
      href: services.items[0].url,
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Standards", "Professional service"],
      ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
    },
    {
      title: "Volunteer Activities",
      description: "Public ORCID service records include IEEE Standards Association Puzzle Creator / Reviewer / Ambassador activity.",
      href: services.items[0].url,
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Volunteer", "IEEE"],
      ...withTraceability({ source: orcidSource, identifierType: "ORCID", identifier: "0009-0009-7113-5539" }),
    },
    {
      title: "Innovation Portfolio",
      description:
        "No individual public IEEE Innovation Portal submissions are currently included in the verified dataset. Only publicly accessible entries should be shown here.",
      href: innovationPortal.sourceURL,
      linkLabel: "Open IEEE Innovation at Work",
      openInNewTab: true,
      meta: ["Innovation", "Public entries only"],
      source: innovationPortal.source,
      sourceName: innovationPortal.sourceName,
      sourceURL: innovationPortal.sourceURL,
      verified: innovationPortal.verified,
      lastVerified: innovationPortal.lastVerified,
      identifierType: innovationPortal.identifierType,
      identifier: innovationPortal.identifier,
      audit: innovationPortal.audit,
    },
  ],
};
