import { employment } from "./employment";

export const timeline = {
  ...employment,
  eyebrow: "Experience",
  title: "Employment timeline",
  description: "Verified employment entries surfaced in the ORCID public record.",
  currentRole: employment.items[0],
  previousRolesLabel: "Previous Role",
  items: employment.items.slice(1),
} as const;
