import { orcidSource } from "./sources";

export const distinctions = {
  ...orcidSource,
  eyebrow: "Distinctions",
  title: "Public distinction record",
  description: "Verified public recognition surfaced in the ORCID record.",
  items: [
    {
      title: "Peer review activity",
      description: "ORCID lists 9 reviews for 1 publication or grant.",
      ...orcidSource,
    },
  ],
} as const;
