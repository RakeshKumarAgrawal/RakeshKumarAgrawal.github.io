import { employment } from "./employment";
import { profile } from "./profile";

export const experience = {
  ...profile,
  eyebrow: "About",
  title: "Verified public profile",
  description: profile.biography,
  highlights: [
    {
      title: "Large-scale IT operations",
      description: "Across banking and healthcare domains.",
    },
    {
      title: "Applied AI",
      description: "Intelligent healthcare, predictive analytics, and enterprise digital transformation.",
    },
    {
      title: "Human-in-the-loop decision support",
      description: "Reliability, ethics, and practical systems bridging theory and real-world operations.",
    },
    ...employment.items.map((item) => ({
      title: item.organization,
      description: `${item.role} · ${item.period}`,
    })),
  ],
} as const;
