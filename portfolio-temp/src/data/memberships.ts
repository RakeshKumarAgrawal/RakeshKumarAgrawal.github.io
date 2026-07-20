import { orcidSource } from "./sources";

export const memberships = {
  ...orcidSource,
  eyebrow: "Memberships",
  title: "Public membership record",
  description: "Verified membership and standing entries surfaced in the ORCID public record.",
  items: [
    {
      ...orcidSource,
      organization: "IEEE Computer Society",
      role: "Reviewer",
      period: "2025-07-01 to present",
      url: "https://ieee-collabratec.ieee.org/app/p/RkAgrawal1172503",
    },
    {
      ...orcidSource,
      organization: "IEEE Computer Society",
      role: "Senior Member",
      period: "2025-03-01 to present",
      url: "https://ieee-collabratec.ieee.org/app/p/RkAgrawal1172503",
    },
    {
      ...orcidSource,
      organization: "IEEE Standards Association",
      role: "Senior Member",
      period: "2025-01-01 to present",
      url: "https://ieee-collabratec.ieee.org/app/p/RkAgrawal1172503",
    },
    {
      organization: "PMI",
      role: "Membership",
      period: "2024-10 to 2027-10",
      ...orcidSource,
    },
    {
      ...orcidSource,
      organization: "Institution of Electronics and Telecommunication Engineers",
      role: "Fellow",
      period: "2026-05-22 to present",
      url: "https://www.iete.org/iete-membership/",
    },
  ],
} as const;
