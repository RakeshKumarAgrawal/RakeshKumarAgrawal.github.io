import { orcidSource } from "./sources";

export const qualifications = {
  ...orcidSource,
  eyebrow: "Qualifications",
  title: "Public qualification record",
  description: "Verified degree information surfaced in the ORCID public record.",
  items: [
    {
      institution: "Dr. A.P.J. Abdul Kalam Technical University",
      qualification: "Bachelor of Technology (Electronics and Communications)",
      period: "2002-07-01 to 2006-06-30",
      location: "Lucknow, Uttar Pradesh, IN",
      ...orcidSource,
    },
  ],
} as const;
