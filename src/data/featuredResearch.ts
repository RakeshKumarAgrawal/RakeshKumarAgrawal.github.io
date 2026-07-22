import rawFeaturedResearch from "./featuredResearch.json";

type FeaturedResearchRecord = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  bannerLabel: string;
  highlights: string[];
  technologies: string[];
  actions: {
    details: string;
    publications: string;
    github: string;
  };
};

type FeaturedResearchLibrary = {
  eyebrow: string;
  title: string;
  description: string;
  items: FeaturedResearchRecord[];
};

export type FeaturedResearchItem = FeaturedResearchRecord;

const data = rawFeaturedResearch as FeaturedResearchLibrary;

export const featuredResearchHero = {
  eyebrow: data.eyebrow,
  title: data.title,
  description: data.description,
} as const;

export const featuredResearchItems: FeaturedResearchItem[] = data.items;
