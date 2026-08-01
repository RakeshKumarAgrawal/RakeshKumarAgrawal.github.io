import { scholarlyProfiles } from "@/data/scholarlyProfiles";

export type DataCiteResearchMetricValue = number | null;

export type DataCiteResearchMetrics = {
  works: DataCiteResearchMetricValue;
  citations: DataCiteResearchMetricValue;
  views: DataCiteResearchMetricValue;
  downloads: DataCiteResearchMetricValue;
};

export type DataCiteProfileLink = {
  label: string;
  href: string;
};

export type DataCiteProfile = {
  profileUrl: string;
  profileSummary: string;
  otherIdentifiers: string[];
  externalProfiles: DataCiteProfileLink[];
  professionalLinks: DataCiteProfileLink[];
  researchMetrics: DataCiteResearchMetrics;
  lastUpdated: string;
};

export const dataciteProfile: DataCiteProfile = {
  profileUrl: "https://commons.datacite.org/orcid.org/0009-0009-7113-5539",
  profileSummary:
    "Applied AI researcher and enterprise technology leader working at the intersection of enterprise architecture, cloud-native engineering, and responsible AI. Public profile indicators are consolidated from DataCite Commons and linked scholarly identity platforms to preserve traceability across research outputs, open datasets, and professional impact.",
  otherIdentifiers: [
    "ORCID: 0009-0009-7113-5539",
    "DataCite Commons Profile: commons.datacite.org/orcid.org/0009-0009-7113-5539",
  ],
  externalProfiles: scholarlyProfiles.map((profile) => ({ label: profile.name, href: profile.url })),
  professionalLinks: [
    { label: "Enterprise Intelligence Lab", href: "https://www.enterpriseintelligencelab.com/" },
    { label: "GitHub", href: "https://github.com/RakeshKumarAgrawal" },
    { label: "IEEE DataPort", href: "https://ieee-dataport.org/" },
  ],
  researchMetrics: {
    works: 37,
    citations: 65,
    views: 36,
    downloads: 2,
  },
  lastUpdated: "2026-07-22",
};

export const toDisplayMetricValue = (value: DataCiteResearchMetricValue): string => {
  if (value === null || Number.isNaN(value)) {
    return "Not Available";
  }

  return String(value);
};
