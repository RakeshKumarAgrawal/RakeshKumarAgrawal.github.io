import { orcidSource } from "./sources";

export const media = {
  ...orcidSource,
  eyebrow: "Media",
  title: "Verified public media records",
  description: "No verified public media appearances were surfaced in the verified source set.",
  items: [],
} as const;
