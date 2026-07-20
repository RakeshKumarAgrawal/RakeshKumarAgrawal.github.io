import { articles } from "./articles";
import { media } from "./media";
import { newsletter } from "./newsletter";
import { talks } from "./talks";

export const insights = {
  eyebrow: "Insights",
  title: "Insights",
  description:
    "Articles, newsletter publishing, media appearances, and speaking activity.",
  items: [
    { title: articles.title, description: articles.description, meta: [articles.eyebrow] },
    { title: newsletter.title, description: newsletter.description, meta: [newsletter.eyebrow] },
    { title: media.title, description: media.description, meta: [media.eyebrow] },
    { title: talks.title, description: talks.description, meta: [talks.eyebrow] },
  ],
} as const;