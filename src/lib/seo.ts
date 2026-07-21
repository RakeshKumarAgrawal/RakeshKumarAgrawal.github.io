import type { Metadata } from "next";

export const siteConfig = {
  url: "https://rakeshkumaragrawal.github.io",
  name: "Rakesh Kumar Agrawal",
  title: "Rakesh Kumar Agrawal | Research and Engineering Profile",
  description:
    "Verified research and engineering profile for Rakesh Kumar Agrawal, with traceable publications, datasets, professional activity, and evidence records.",
  locale: "en_US",
} as const;

export type PageMetadataInput = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
};

export const createPageMetadata = ({
  title,
  description,
  canonical,
  keywords,
}: PageMetadataInput): Metadata => ({
  title,
  description,
  keywords,
  alternates: {
    canonical,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}${canonical}`,
    title: `${title} | ${siteConfig.name}`,
    description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
  },
});
