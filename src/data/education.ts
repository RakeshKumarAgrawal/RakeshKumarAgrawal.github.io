import { orcidSource } from "./sources";

export const education = {
  ...orcidSource,
  eyebrow: "Education",
  title: "Public education record",
  description: "Verified education entry surfaced in the ORCID public record.",
  items: [
    {
      institution: "Dr. A.P.J. Abdul Kalam Technical University",
      location: "Lucknow, Uttar Pradesh, IN",
      qualification: "Bachelor of Technology (Electronics and Communications)",
      period: "2002-07-01 to 2006-06-30",
      ...orcidSource,
    },
  ],
} as const;
