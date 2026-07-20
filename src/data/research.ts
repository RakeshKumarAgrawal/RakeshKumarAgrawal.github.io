import { datasets } from "./datasets";
import { publications } from "./publications";
import { researchAreas } from "./researchAreas";

export const research = {
  eyebrow: "Research",
  title: "Verified research archive",
  description: "Public research interests, works, and datasets surfaced from verified public sources.",
  items: [
    ...researchAreas.items,
    ...publications.items,
    ...datasets.items,
  ],
} as const;
