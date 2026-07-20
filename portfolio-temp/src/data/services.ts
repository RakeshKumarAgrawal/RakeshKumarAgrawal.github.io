import { orcidSource } from "./sources";

export const services = {
  ...orcidSource,
  eyebrow: "Services",
  title: "Public service record",
  description: "Verified standards, review, and invited-position activities surfaced in the ORCID public record.",
  items: [
    {
      ...orcidSource,
      organization: "IEEE Standards Association",
      role: "Puzzle Creator / Reviewer / Ambassador",
      location: "Piscataway, New Jersey, US",
      url: "https://ct.ieee.org/puzzlers/",
    },
    {
      ...orcidSource,
      organization: "IEEE Computer Society",
      role: "Reviewer",
      location: "Washington, District of Columbia, US",
      period: "2025-07-01 to present",
      url: "https://ieee-collabratec.ieee.org/app/p/RkAgrawal1172503",
    },
    {
      organization: "Peer review",
      role: "9 reviews for 1 publication or grant",
      location: "IGI Global Book Chapter Peer Reviews",
      ...orcidSource,
    },
  ],
} as const;
