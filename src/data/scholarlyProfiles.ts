export type ScholarlyProfile = {
  id: string;
  name: string;
  url: string;
  synchronizationName: string;
  logoText: string;
  logoTone: "scholar" | "orcid" | "researchgate" | "zenodo" | "ieee";
  description: string;
  researchFocus: string;
  latestActivityPlaceholder: string;
  relatedPublicationSlugs: string[];
  relatedDatasetTitles: string[];
};

export const scholarlyProfiles: ScholarlyProfile[] = [
  {
    id: "orcid",
    name: "ORCID",
    url: "https://orcid.org/0009-0009-7113-5539",
    synchronizationName: "ORCID",
    logoText: "OR",
    logoTone: "orcid",
    description: "Persistent research identity record linking publications, activities, memberships, and service evidence.",
    researchFocus: "Research identity integrity, contributor records, and open metadata interoperability.",
    latestActivityPlaceholder: "Latest ORCID works, affiliations, and activity metadata updates will be listed here.",
    relatedPublicationSlugs: ["enterprise-ai-governance-framework-reference", "llmops-maturity-model-reference"],
    relatedDatasetTitles: ["BQEB-Data: An Open Benchmark Dataset for Autonomous Energy Intelligence and Smart Grid Analytics"],
  },
  {
    id: "datacite",
    name: "DataCite Commons",
    url: "https://commons.datacite.org/orcid.org/0009-0009-7113-5539",
    synchronizationName: "DataCite Commons",
    logoText: "DC",
    logoTone: "scholar",
    description: "Public research record connecting persistent identifiers, works, citations, and reusable research outputs.",
    researchFocus: "DOI-backed research discovery, metadata interoperability, and scholarly record synchronization.",
    latestActivityPlaceholder: "Latest DataCite works, citations, and linked identifier updates will be listed here.",
    relatedPublicationSlugs: ["enterprise-intelligence-framework-reference", "bqeb-data-open-benchmark-dataset"],
    relatedDatasetTitles: ["BQEB ForecastBench"],
  },
  {
    id: "google-scholar",
    name: "Google Scholar",
    url: "https://scholar.google.com/citations?hl=en&user=dhXBvxQAAAAJ",
    synchronizationName: "Google Scholar",
    logoText: "GS",
    logoTone: "scholar",
    description: "Public citation profile indexing scholarly publications and citation impact.",
    researchFocus: "Citation visibility, publication discovery, and scholarly impact tracking.",
    latestActivityPlaceholder: "Latest citation growth and indexed publication updates will be surfaced here.",
    relatedPublicationSlugs: ["biobrain-explainable-federated-ai", "digital-brain-it-operations-observability", "enterprise-intelligence-framework-reference"],
    relatedDatasetTitles: ["BQEB ForecastBench"],
  },
  {
    id: "lens",
    name: "Lens.org",
    url: "https://www.lens.org/lens/profile/700800239/scholar",
    synchronizationName: "Lens.org",
    logoText: "LE",
    logoTone: "scholar",
    description: "Public scholarly profile connecting research works, citations, and broader innovation records.",
    researchFocus: "Scholarly discovery, citation analysis, and research-to-innovation traceability.",
    latestActivityPlaceholder: "Latest Lens scholarly works and citation updates will be listed here.",
    relatedPublicationSlugs: ["enterprise-intelligence-framework-reference", "llmops-maturity-model-reference"],
    relatedDatasetTitles: ["BQEB ForecastBench"],
  },
  {
    id: "web-of-science",
    name: "Web of Science",
    url: "https://www.webofscience.com/wos/author/record/PSK-7083-2026",
    synchronizationName: "Web of Science",
    logoText: "WS",
    logoTone: "ieee",
    description: "Verified researcher record connecting indexed publications and citation metadata.",
    researchFocus: "Author identity, indexed research outputs, and citation record verification.",
    latestActivityPlaceholder: "Latest Web of Science author record updates will be listed here.",
    relatedPublicationSlugs: ["biobrain-explainable-federated-ai", "human-gastrointestinal-gas-wearable-edge-ai"],
    relatedDatasetTitles: ["BQEB ForecastBench"],
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    url: "https://www.semanticscholar.org/author/Rakesh-Kumar-Agrawal/2257269095",
    synchronizationName: "Semantic Scholar",
    logoText: "SS",
    logoTone: "scholar",
    description: "Public author profile used for scholarly identity and publication metadata enrichment.",
    researchFocus: "AI-assisted literature discovery, author disambiguation, and publication graph metadata.",
    latestActivityPlaceholder: "Latest Semantic Scholar publications and citation updates will be listed here.",
    relatedPublicationSlugs: ["biobrain-explainable-federated-ai", "enterprise-intelligence-framework-reference"],
    relatedDatasetTitles: ["BQEB ForecastBench"],
  },
  {
    id: "researchgate",
    name: "ResearchGate",
    url: "https://www.researchgate.net/profile/Rakesh-Agrawal-6?ev=hdr_xprf",
    synchronizationName: "ResearchGate (public metadata)",
    logoText: "RG",
    logoTone: "researchgate",
    description: "Public research profile for dissemination and community engagement around technical outputs.",
    researchFocus: "Research visibility, peer networking, and discipline-level engagement.",
    latestActivityPlaceholder: "Latest public ResearchGate publication metadata will be listed here.",
    relatedPublicationSlugs: ["enterprise-digital-brain-cognitive-productivity", "bqeb-forecastbench-benchmarking-ai-models"],
    relatedDatasetTitles: ["BQEB-Data BIO-Quantum Energy Brain Benchmark Dataset for Smart Grid Intelligence, Renewable Forecasting, Storage Optimization, and Cyber Resilience"],
  },
  {
    id: "zenodo",
    name: "Zenodo",
    url: "https://zenodo.org/",
    synchronizationName: "Zenodo",
    logoText: "ZE",
    logoTone: "zenodo",
    description: "Open repository with DOI-backed publications and technical outputs.",
    researchFocus: "Open archival publishing, DOI assignment, and reproducible technical dissemination.",
    latestActivityPlaceholder: "Latest Zenodo deposits, DOI releases, and versioned artifact updates will appear here.",
    relatedPublicationSlugs: ["enterprise-intelligence-framework-reference", "enterprise-ai-governance-framework-reference", "llmops-maturity-model-reference"],
    relatedDatasetTitles: ["BQEB ForecastBench", "BQEB-Data: An Open Benchmark Dataset for Autonomous Energy Intelligence and Smart Grid Analytics"],
  },
];