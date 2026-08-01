import type { MetadataRoute } from "next";

import { frameworksLibrary } from "@/data/frameworksLibrary";
import { publicationsLibrary } from "@/data/publicationsLibrary";
import { researchDomains } from "@/data/researchDomains";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootEntries: MetadataRoute.Sitemap = [
    {
      url: "https://rakeshkumaragrawal.github.io/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/research/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/original-contributions/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/publications/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/books/",
      lastModified: "2026-07-31",
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/frameworks/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/knowledge-graph/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/about/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/contact/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/media/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/timeline/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/open-science/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/dashboard/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/professional-service/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://rakeshkumaragrawal.github.io/professional-certifications/",
      lastModified: "2026-07-20",
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const domainEntries: MetadataRoute.Sitemap = researchDomains.map((domain) => ({
    url: `https://rakeshkumaragrawal.github.io/research/${domain.slug}/`,
    lastModified: "2026-07-20",
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const publicationEntries: MetadataRoute.Sitemap = publicationsLibrary.map((item) => ({
    url: `https://rakeshkumaragrawal.github.io/publications/${item.slug}/`,
    lastModified: "2026-07-20",
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const frameworkEntries: MetadataRoute.Sitemap = frameworksLibrary.map((item) => ({
    url: `https://rakeshkumaragrawal.github.io/frameworks/${item.slug}/`,
    lastModified: "2026-07-20",
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...rootEntries,
    ...domainEntries,
    ...publicationEntries,
    ...frameworkEntries,
  ];
}
