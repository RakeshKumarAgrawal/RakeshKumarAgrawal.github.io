import {
  createAuditMetadata,
  githubSource,
  orcidSource,
  withTraceability,
} from "./sources";
import { scholarlyProfiles } from "./scholarlyProfiles";

const scholarlyExternalProfiles = scholarlyProfiles.map((profile) => {
  const identifierType = profile.id === "orcid" ? "ORCID" : "URL";
  const identifier = profile.id === "orcid" ? "0009-0009-7113-5539" : profile.url;

  return {
    title: profile.name,
    description: profile.description,
    href: profile.url,
    linkLabel: "Open Profile",
    openInNewTab: true,
    meta: ["Scholarly profile"],
    ...withTraceability({ source: orcidSource, identifierType, identifier }),
    ...(profile.id === "orcid"
      ? {
          audit: createAuditMetadata({
            id: "external-profile-orcid",
            title: "ORCID",
            sourceName: orcidSource.sourceName,
            sourceURL: orcidSource.sourceURL,
            identifierType: "ORCID",
            identifier,
          }),
        }
      : {}),
  };
});

export const externalProfiles = {
  ...orcidSource,
  eyebrow: "External Profiles",
  title: "Verified external profiles",
  description: "Public profiles and repositories linked from ORCID and verified through public APIs.",
  items: [
    ...scholarlyExternalProfiles,
    {
      title: "LinkedIn",
      description: "Public professional profile linked from ORCID.",
      href: "https://www.linkedin.com/in/rakeshkumaragrawal/",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Professional network"],
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://www.linkedin.com/in/rakeshkumaragrawal/" }),
      ...orcidSource,
    },
    {
      title: "ResearchID",
      description: "Public author identifier linked from ORCID.",
      href: "https://www.researchid.co/rid147706",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Author ID"],
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://www.researchid.co/rid147706" }),
      ...orcidSource,
    },
    {
      title: "Academia.edu",
      description: "Public academia profile linked from ORCID.",
      href: "https://ieee.academia.edu/RakeshAgrawal",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Academic profile"],
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://ieee.academia.edu/RakeshAgrawal" }),
      ...orcidSource,
    },
    {
      title: "Harvard Dataverse",
      description: "Public dataset landing page linked from ORCID works.",
      href: "https://dataverse.harvard.edu/dataverse/harvard",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Dataset repository"],
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://dataverse.harvard.edu/dataverse/harvard" }),
      ...orcidSource,
    },
    {
      title: "IEEE DataPort",
      description: "Public data publication portal linked from authored works.",
      href: "https://ieee-dataport.org/",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Data portal"],
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://ieee-dataport.org/" }),
      ...orcidSource,
    },
    {
      title: "GitHub",
      description: "Public code profile verified through the GitHub API.",
      href: "https://github.com/RakeshKumarAgrawal",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["GitHub"],
      ...withTraceability({ source: githubSource, identifierType: "URL", identifier: "https://github.com/RakeshKumarAgrawal" }),
      ...githubSource,
    },
    {
      title: "Enterprise Intelligence Lab",
      description: "Public lab identity linked from the GitHub profile and public web presence.",
      href: "https://www.enterpriseintelligencelab.com/",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Lab"],
      ...withTraceability({ source: githubSource, identifierType: "URL", identifier: "https://www.enterpriseintelligencelab.com/" }),
      ...githubSource,
    },
    {
      title: "SciProfiles",
      description: "Public profile identifier exposed in ORCID other IDs.",
      href: "https://sciprofiles.com/profile/5234141",
      linkLabel: "Open Profile",
      openInNewTab: true,
      meta: ["Profile ID"],
      ...withTraceability({ source: orcidSource, identifierType: "URL", identifier: "https://sciprofiles.com/profile/5234141" }),
      ...orcidSource,
    },
  ],
} as const;
