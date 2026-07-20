import type { ContentSectionData } from "@/components/home/ContentSection";

import { externalProfiles } from "./externalProfiles";
import { profile } from "./profile";

export const researchIdentity: ContentSectionData = {
  eyebrow: "Research Identity",
  title: "Verified research identity",
  description:
    "A consolidated view of persistent identifiers and external scholarly profiles linked from the public record.",
  items: [
    ...externalProfiles.items.map((item) => ({
      title: item.title,
      description: item.description,
      href: item.href,
      linkLabel: item.linkLabel,
      openInNewTab: item.openInNewTab,
      meta: item.meta,
      source: item.source,
      sourceName: item.sourceName,
      sourceURL: item.sourceURL,
      verified: item.verified,
      lastVerified: item.lastVerified,
      identifierType: item.identifierType,
      identifier: item.identifier,
      audit: "audit" in item ? item.audit : undefined,
    })),
    ...profile.externalIdentifiers.map((item) => ({
      title: item.label,
      description: item.value,
      href: item.identifierType === "URL" ? item.identifier : profile.sourceURL,
      linkLabel: "View Source",
      openInNewTab: true,
      meta: ["Identifier"],
      source: item.source,
      sourceName: item.sourceName,
      sourceURL: item.sourceURL,
      verified: item.verified,
      lastVerified: item.lastVerified,
      identifierType: item.identifierType,
      identifier: item.identifier,
    })),
  ],
};
