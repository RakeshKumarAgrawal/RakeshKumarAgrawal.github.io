export const VERIFIED_ON = "2026-07-20" as const;

export interface EvidenceSource {
  source:
    | "ORCID"
    | "GitHub"
    | "LinkedIn"
    | "Google Scholar"
    | "Semantic Scholar"
    | "Lens"
    | "IEEE DataPort"
    | "IEEE Innovation Portal"
    | "Zenodo"
    | "Harvard Dataverse"
    | "ResearchGate";
  url: string;
  verified: boolean;
  lastVerified: string;
}

export type EvidenceSourceName = EvidenceSource["source"];

export type AuditIdentifierType = "DOI" | "ORCID" | "URL" | "OTHER";

export type TraceabilityFields = {
  source: EvidenceSourceName;
  url: string;
  verified: boolean;
  lastVerified: string;
  sourceName: EvidenceSourceName;
  sourceURL: string;
  identifierType: AuditIdentifierType;
  identifier: string;
};

export type AuditMetadata = {
  id: string;
  title: string;
  sourceName: string;
  sourceURL: string;
  identifierType: AuditIdentifierType;
  identifier: string;
  verified: true;
  lastVerified: typeof VERIFIED_ON;
};

export const sourceRecord = (source: EvidenceSourceName, url: string) =>
  ({
    source,
    url,
    verified: true,
    lastVerified: VERIFIED_ON,
    sourceName: source,
    sourceURL: url,
  } as const);

export const orcidSource = sourceRecord("ORCID", "https://orcid.org/0009-0009-7113-5539");

export const githubSource = sourceRecord("GitHub", "https://api.github.com/users/RakeshKumarAgrawal");

export const zenodoSource = (sourceURL: string) => sourceRecord("Zenodo", sourceURL);

export const dataverseSource = (sourceURL: string) => sourceRecord("Harvard Dataverse", sourceURL);

export const googleScholarSource = (sourceURL: string) => sourceRecord("Google Scholar", sourceURL);

export const semanticScholarSource = (sourceURL: string) => sourceRecord("Semantic Scholar", sourceURL);

export const lensSource = (sourceURL: string) => sourceRecord("Lens", sourceURL);

export const researchGateSource = (sourceURL: string) => sourceRecord("ResearchGate", sourceURL);

export const ieeeDataPortSource = (sourceURL: string) => sourceRecord("IEEE DataPort", sourceURL);

export const linkedInSource = (sourceURL: string) => sourceRecord("LinkedIn", sourceURL);

export const ieeeInnovationPortalSource = (sourceURL: string) =>
  sourceRecord("IEEE Innovation Portal", sourceURL);

export const withTraceability = ({
  source,
  identifierType,
  identifier,
}: {
  source: ReturnType<typeof sourceRecord>;
  identifierType: AuditIdentifierType;
  identifier: string;
}): TraceabilityFields => ({
  ...source,
  identifierType,
  identifier,
});

export const createAuditMetadata = ({
  id,
  title,
  sourceName,
  sourceURL,
  identifierType,
  identifier,
}: {
  id: string;
  title: string;
  sourceName: string;
  sourceURL: string;
  identifierType: AuditIdentifierType;
  identifier: string;
}): AuditMetadata => ({
  id,
  title,
  sourceName,
  sourceURL,
  identifierType,
  identifier,
  verified: true,
  lastVerified: VERIFIED_ON,
});
