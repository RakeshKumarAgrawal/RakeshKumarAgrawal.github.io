import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rakeshkumaragrawal.github.io/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
