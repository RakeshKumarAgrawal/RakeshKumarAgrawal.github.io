import { scholarlyProfiles } from "./scholarlyProfiles";

export const socials = {
  eyebrow: "External Profiles",
  title: "Connected profiles and repositories",
  description:
    "These destinations connect the site to scholarly profiles, code, data repositories, and the lab identity.",
  items: [
    ...scholarlyProfiles.map((profile) => ({
      title: profile.name,
      description: profile.description,
      href: profile.url,
    })),
    { title: "GitHub", description: "Open-source repositories and engineering projects.", href: "#" },
    { title: "LinkedIn", description: "Professional network and career profile.", href: "#" },
    { title: "IEEE Collabratec", description: "IEEE community and contributor profile.", href: "#" },
    { title: "Harvard Dataverse", description: "Data publication and reuse.", href: "#" },
    { title: "IEEE DataPort", description: "Open research data and assets.", href: "#" },
    { title: "Enterprise Intelligence Lab", description: "Lab identity and publishing home.", href: "#" },
  ],
} as const;