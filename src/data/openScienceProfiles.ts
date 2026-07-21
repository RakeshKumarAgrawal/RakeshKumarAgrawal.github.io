import { datasets } from "./datasets";
import rawOpenScienceProfiles from "./openScienceProfiles.json";
import { publicationsLibrary } from "./publicationsLibrary";
import { createKeyedIndex, createTitleIndex, resolveLinkedByKey, resolveLinkedByTitle } from "@/lib/data/linking";

type LogoTone = "scholar" | "orcid" | "researchgate" | "zenodo" | "dataverse" | "ieee" | "github" | "lab";

type OpenScienceProfileRecord = {
  slug: string;
  title: string;
  logoText: string;
  logoTone: LogoTone;
  description: string;
  profileUrl: string;
  researchFocus: string;
  latestActivityPlaceholder: string;
  relatedPublicationSlugs: string[];
  relatedDatasetTitles: string[];
};

type OpenScienceLibraryRecord = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  commitment: {
    title: string;
    description: string;
    principles: string[];
  };
  profiles: OpenScienceProfileRecord[];
};

export type OpenScienceLinkedItem = {
  title: string;
  href?: string;
  description?: string;
};

export type OpenScienceProfile = {
  slug: string;
  title: string;
  logoText: string;
  logoTone: LogoTone;
  description: string;
  profileUrl: string;
  researchFocus: string;
  latestActivityPlaceholder: string;
  relatedPublications: OpenScienceLinkedItem[];
  relatedDatasets: OpenScienceLinkedItem[];
};

const data = rawOpenScienceProfiles as OpenScienceLibraryRecord;

const publicationsIndex = createKeyedIndex(
  publicationsLibrary,
  (publication) => publication.slug,
  (publication) => ({
    title: publication.title,
    href: `/publications/${publication.slug}`,
    description: publication.abstract,
  }),
);

const datasetsIndex = createTitleIndex(datasets.items);

export const openScienceHero = data.hero;
export const openScienceCommitment = data.commitment;

export const openScienceProfiles: OpenScienceProfile[] = data.profiles.map((profile) => ({
  slug: profile.slug,
  title: profile.title,
  logoText: profile.logoText,
  logoTone: profile.logoTone,
  description: profile.description,
  profileUrl: profile.profileUrl,
  researchFocus: profile.researchFocus,
  latestActivityPlaceholder: profile.latestActivityPlaceholder,
  relatedPublications: resolveLinkedByKey(profile.relatedPublicationSlugs, publicationsIndex),
  relatedDatasets: resolveLinkedByTitle(profile.relatedDatasetTitles, datasetsIndex),
}));
