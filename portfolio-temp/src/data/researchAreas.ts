import { orcidSource } from "./sources";

export const researchAreas = {
  ...orcidSource,
  eyebrow: "Research Areas",
  title: "Verified research interests",
  description: "Keywords surfaced directly in the ORCID public record.",
  items: [
    {
      title: "Artificial Intelligence",
      description: "ORCID keyword.",
      ...orcidSource,
    },
    {
      title: "Healthcare Intelligence",
      description: "ORCID keyword.",
      ...orcidSource,
    },
    {
      title: "Smart Healthcare",
      description: "ORCID keyword.",
      ...orcidSource,
    },
  ],
} as const;
