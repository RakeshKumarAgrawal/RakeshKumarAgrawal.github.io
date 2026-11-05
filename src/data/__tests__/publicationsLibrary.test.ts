import { describe, expect, it } from "vitest";

import { publicationsLibrary } from "@/data/publicationsLibrary";
import { getResearchDomainBySlug } from "@/data/researchDomains";

describe("publications library", () => {
  it("includes the featured MDPI Enterprise AI Assurance article with verified metadata", () => {
    const publication = publicationsLibrary.find(
      (item) => item.slug === "enterprise-ai-assurance-biomedical-diagnostics",
    );

    expect(publication).toBeDefined();
    expect(publication).toMatchObject({
      title:
        "An Enterprise AI Assurance Framework for Biomedical Diagnostics: Integrating a Human Validation Boundary and a Multidimensional Assurance Score into a Lifecycle Governance Model.",
      category: "Journal Articles",
      status: "Published",
      publicationDate: "2026-11-05",
      doi: "10.3390/informatics13110186",
      articleUrl: "https://www.mdpi.com/2227-9709/13/11/186",
      featured: true,
      frameworkConceptualization:
        "Framework conceptualization: Rakesh Kumar Agrawal and Ather Husain.",
      scholarlyMetadata: {
        journalName: "Informatics",
        publisher: "MDPI",
        volume: 13,
        issue: 11,
        articleNumber: "186",
      },
    });
    expect(publication?.authors).toEqual([
      "Rakesh Kumar Agrawal",
      "Ather Husain",
      "Wasim Mohammed Amin Tambe",
      "Pankaj Kumar Yadav",
      "Anjan Chatterjee",
    ]);
    expect(publication?.abstract).toContain("has not been empirically validated");
    expect(publication?.relatedResearchLinks).toContainEqual({
      title: "Enterprise AI Assurance and Responsible AI research",
      href: "/research/responsible-ai",
    });
    expect(getResearchDomainBySlug("responsible-ai")?.relatedPublications).toContainEqual({
      title: publication?.title,
      href: "/publications/enterprise-ai-assurance-biomedical-diagnostics/",
      description: publication?.citation,
    });
  });
});
