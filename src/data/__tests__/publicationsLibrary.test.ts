import { describe, expect, it } from "vitest";

import { publicationsLibrary } from "@/data/publicationsLibrary";
import { getResearchDomainBySlug } from "@/data/researchDomains";

describe("publications library", () => {
  const findUniquePublication = (slug: string) => {
    const records = publicationsLibrary.filter((item) => item.slug === slug);

    expect(records).toHaveLength(1);
    expect(publicationsLibrary.filter((item) => item.title === records[0]?.title)).toHaveLength(1);
    if (records[0]?.doi) {
      expect(publicationsLibrary.filter((item) => item.doi === records[0]?.doi)).toHaveLength(1);
    }
    return records[0];
  };

  it("includes the featured MDPI Enterprise AI Assurance article with verified metadata", () => {
    const publication = findUniquePublication("enterprise-ai-assurance-biomedical-diagnostics");

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
    expect(getResearchDomainBySlug("enterprise-ai-governance")?.relatedPublications).toContainEqual(
      expect.objectContaining({ title: publication?.title }),
    );
    expect(getResearchDomainBySlug("healthcare-ai")?.relatedPublications).toContainEqual(
      expect.objectContaining({ title: publication?.title }),
    );
  });

  it("includes the IJGIS digital-twins article with its synthetic-dataset evaluation", () => {
    const publication = findUniquePublication("dynamic-constitutional-control-agentic-enterprise-digital-twins");

    expect(publication).toMatchObject({
      title: "Dynamic Constitutional Control of Agentic Enterprise Digital Twins via Meta-Governor Agents",
      authors: ["Rakesh Kumar Agrawal"],
      category: "Journal Articles",
      status: "Published",
      publication: "International Journal of Global Innovations and Solutions (IJGIS), 3(8), September 2026",
      publicationDate: "2026-09-01",
      doi: "10.63412/8byqcw98",
      articleUrl: "https://ijgis.org/home/article/view/78",
      scholarlyMetadata: {
        journalName: "International Journal of Global Innovations and Solutions",
        volume: 3,
        issue: 8,
      },
    });
    expect(publication?.abstract).toContain("synthetic enterprise governance dataset");
    expect(publication?.abstract).toContain("does not establish real-world enterprise deployment");
    expect(publication?.keywords).toEqual([
      "Agentic AI",
      "Enterprise Digital Twins",
      "Human-in-the-loop",
      "Trustworthy AI",
      "Explainable AI",
      "Meta-Governor Agents",
      "Constitutional AI",
      "Algorithmic Fairness",
      "Transparency and Accountability",
    ]);
    expect(getResearchDomainBySlug("agentic-ai")?.relatedPublications).toContainEqual(
      expect.objectContaining({ title: publication?.title }),
    );
  });

  it("includes the IJGIS BQEB article with bounded reproducibility claims", () => {
    const publication = findUniquePublication("bqeb-reproducibility-first-energy-ai-benchmarking");

    expect(publication).toMatchObject({
      title: "BQEB: A Reproducibility-First Architecture for Modular Energy AI Benchmarking",
      authors: ["Rakesh Kumar Agrawal"],
      category: "Journal Articles",
      status: "Published",
      publication: "International Journal of Global Innovations and Solutions (IJGIS), 3(10), October 2026",
      publicationDate: "2026-10-31",
      doi: "10.63412/8cwwr131",
      articleUrl: "https://ijgis.org/home/article/view/82",
      scholarlyMetadata: {
        journalName: "International Journal of Global Innovations and Solutions",
        volume: 3,
        issue: 10,
      },
    });
    expect(publication?.abstract).toContain("15 real executions");
    expect(publication?.abstract).toContain("Cross-environment reproducibility");
    expect(publication?.abstract).toContain("remain pending or future work");
    expect(publication?.relatedResearchLinks).toContainEqual({
      title: "BQEB Reproducibility Architecture artifact",
      href: "https://doi.org/10.5281/zenodo.22291930",
    });
    expect(publication?.relatedResearchLinks).toContainEqual({
      title: "BQEB ForecastBench benchmark",
      href: "https://doi.org/10.5281/zenodo.21735978",
    });
    expect(getResearchDomainBySlug("decision-intelligence")?.relatedPublications).toContainEqual(
      expect.objectContaining({ title: publication?.title }),
    );
  });
});
