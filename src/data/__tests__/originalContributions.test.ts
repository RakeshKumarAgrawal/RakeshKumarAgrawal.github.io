import { describe, expect, it } from "vitest";

import { originalContributions } from "@/data/originalContributions";
import rawOriginalContributions from "@/data/originalContributions.json";
import { publications } from "@/data/publications";
import { createTitleIndex, resolveLinkedByTitle } from "@/lib/data/linking";

const program = originalContributions.find((item) => item.slug === "bqeb-research-program")!;

describe("BQEB original contributions", () => {
  it("keeps the four-layer architecture and seven-artifact lineage explicit", () => {
    expect(program.title).toBe("BIO-Quantum Energy Brain (BQEB) Research Program");
    for (const layer of [
      "Research Artifact Layer",
      "Reproducibility Layer",
      "Benchmark Evolution Layer",
      "Scientific Lineage Layer",
    ]) {
      expect(program.architecture).toContain(layer);
    }
    expect(program.architecture).toContain("four-layer");
    expect(JSON.stringify(program)).not.toMatch(/six[ -]layer/i);
    expect(program.researchContributions).toHaveLength(7);
    expect(program.timelineTitle).toBe("Research Program Evolution");
    expect(program.timeline.map((entry) => entry.phase)).toEqual([
      "1. Architecture",
      "2. Dataset",
      "3. Forecasting benchmark",
      "4. Cyber-resilience benchmark",
      "5. Foundation-model benchmark",
      "6. Explainability benchmark",
      "7. Digital-twin + multi-agent benchmark",
    ]);
  });

  it("exposes each exact DOI with its title, year, and evidence status", () => {
    expect(program.publicationsTitle).toBe("Evidence & Publications");
    expect(program.publications.map((item) => item.doi)).toEqual([
      "10.20944/preprints202608.2262.v2",
      "10.5281/zenodo.22291930",
      "10.20944/preprints202609.0013.v2",
      "10.20944/preprints202609.0115.v2",
      "10.20944/preprints202609.0201.v2",
      "10.20944/preprints202609.0927.v1",
    ]);
    for (const artifact of program.publications) {
      expect(artifact.title.length).toBeGreaterThan(0);
      expect(artifact.href).toBe(`https://doi.org/${artifact.doi}`);
      expect(artifact.description).toContain("2026");
      expect(artifact.description).toContain(
        artifact.doi?.startsWith("10.5281/") ? "Archived software artifact" : "Preprint",
      );
    }
  });

  it("distinguishes executed ForecastBench evidence from benchmark specifications", () => {
    expect(program.technicalInnovation).toContain("first validated benchmark implementation");
    expect(program.technicalInnovation).toContain("does not establish experimental validation of the other modules");
    expect(program.researchContributions[3]).toContain("no trained or evaluated detection models are claimed");
    expect(program.researchContributions[4]).toContain("not executed model evaluation or experimental results");
    expect(program.researchContributions[5]).toContain("reports no executed evaluations");
    expect(program.researchContributions[6]).toContain("fifth module within the existing Benchmark Evolution Layer");
    expect(program.researchContributions[6]).toContain("reports no executed evaluations");
    for (const slug of ["bqeb-data", "forecastbench"]) {
      expect(originalContributions.find((item) => item.slug === slug)?.overview).toContain(
        "BIO-Quantum Energy Brain (BQEB) Research Program",
      );
    }
  });

  it("preserves the existing publication resolver and default headings for other records", () => {
    const publicationIndex = createTitleIndex(publications.items);
    for (const record of rawOriginalContributions.contributions) {
      if (record.slug === program.slug) continue;
      const contribution = originalContributions.find((item) => item.slug === record.slug)!;
      expect(contribution.publications).toEqual(resolveLinkedByTitle(record.relatedPublicationTitles, publicationIndex));
      expect(contribution.publicationsTitle).toBeUndefined();
      expect(contribution.researchContributionsTitle).toBeUndefined();
      expect(contribution.timelineTitle).toBeUndefined();
    }
    expect(new Set(originalContributions.map((item) => item.slug)).size).toBe(originalContributions.length);
  });
});