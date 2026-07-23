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
  externalProfiles: [
    { label: "ORCID", href: "https://orcid.org/0009-0009-7113-5539" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&user=dhXBvxQAAAAJ" },
    { label: "ResearchGate", href: "https://www.researchgate.net/profile/Rakesh-Agrawal-6?ev=hdr_xprf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rakeshkumaragrawal/" },
    { label: "ResearcherID", href: "https://www.researchid.co/rid147706" },
    { label: "Web of Science ResearcherID", href: "https://www.webofscience.com/wos/author/record/PSK-7083-2026" },
    { label: "Lens.org", href: "https://www.lens.org/lens/profile/700800239/scholar" },
    { label: "Academia.edu", href: "https://ieee.academia.edu/RakeshAgrawal" },
    { label: "Zenodo", href: "https://zenodo.org/" },
    { label: "Harvard Dataverse", href: "https://dataverse.harvard.edu/dataverse/harvard" },
    { label: "Europe PMC", href: "https://europepmc.org/search?query=Rakesh%20Kumar%20Agrawal" },
    { label: "ImpactStory", href: "https://profiles.impactstory.org/u/0000-0000-0000-0000" },
    { label: "SciProfiles", href: "https://sciprofiles.com/profile/5234141" },
  ],
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
