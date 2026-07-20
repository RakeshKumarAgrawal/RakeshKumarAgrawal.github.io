import { distinctions } from "./distinctions";
import { memberships } from "./memberships";
import { createAuditMetadata, orcidSource } from "./sources";
import { services } from "./services";

export const professionalActivities = {
  ...orcidSource,
  eyebrow: "Professional Activities",
  title: "Verified public service and membership activity",
  description: "A source-traceable view of the public professional activities surfaced in ORCID.",
  items: [
    ...services.items.map((item) => {
      const serviceItem = item as {
        organization: string;
        role: string;
        location?: string;
        period?: string;
        url?: string;
      };

      return {
      title: `${item.organization}: ${item.role}`,
        description: serviceItem.location
          ? `${serviceItem.location}${serviceItem.period ? ` · ${serviceItem.period}` : ""}`
          : serviceItem.period ?? "Public service entry",
        href: serviceItem.url,
        meta: [serviceItem.organization],
        audit: createAuditMetadata({
          id: `professional-activity-${serviceItem.organization.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${serviceItem.role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          title: `${serviceItem.organization}: ${serviceItem.role}`,
          sourceName: orcidSource.sourceName,
          sourceURL: serviceItem.url ?? orcidSource.sourceURL,
          identifierType: serviceItem.url ? "URL" : "ORCID",
          identifier: serviceItem.url ?? "0009-0009-7113-5539",
        }),
        ...orcidSource,
      };
    }),
    ...memberships.items.map((item) => {
      const membershipItem = item as {
        organization: string;
        role: string;
        period?: string;
        url?: string;
      };

      return {
        title: `${membershipItem.organization}: ${membershipItem.role}`,
        description: membershipItem.period ?? "Public membership entry",
        href: membershipItem.url,
        meta: [membershipItem.organization],
        audit: createAuditMetadata({
          id: `professional-membership-${membershipItem.organization.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${membershipItem.role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          title: `${membershipItem.organization}: ${membershipItem.role}`,
          sourceName: orcidSource.sourceName,
          sourceURL: membershipItem.url ?? orcidSource.sourceURL,
          identifierType: membershipItem.url ? "URL" : "ORCID",
          identifier: membershipItem.url ?? "0009-0009-7113-5539",
        }),
        ...orcidSource,
      };
    }),
    ...distinctions.items.map((item) => ({
      title: item.title,
      description: item.description,
      meta: ["Peer review"],
      audit: createAuditMetadata({
        id: "professional-distinction-peer-review-activity",
        title: item.title,
        sourceName: orcidSource.sourceName,
        sourceURL: orcidSource.sourceURL,
        identifierType: "ORCID",
        identifier: "0009-0009-7113-5539",
      }),
      ...orcidSource,
    })),
  ],
} as const;
