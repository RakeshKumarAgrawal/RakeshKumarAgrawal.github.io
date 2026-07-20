import { orcidSource } from "./sources";

export const talks = {
  ...orcidSource,
  eyebrow: "Talks",
  title: "Verified public talks",
  description: "No verified public talk records were surfaced in the verified source set.",
  items: [],
} as const;
