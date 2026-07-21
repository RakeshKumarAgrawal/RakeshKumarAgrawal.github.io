import rawHomeContent from "./homeContent.json";

type HomeContent = {
  hero: {
    badge: string;
    sourceLabel: string;
    summaryTitle: string;
    summaryPoints: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    actionLabel: string;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
  };
};

export const homeContent = rawHomeContent as HomeContent;
