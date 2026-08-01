import { describe, expect, it } from "vitest";

import {
  dashboardMetrics,
  dashboardResearchMetrics,
  dashboardSynchronizationModel,
} from "@/data/dashboardMetrics";
import { openScienceCards } from "@/data/executiveDashboard";
import { openScienceProfiles } from "@/data/openScienceProfiles";
import { scholarlyProfiles } from "@/data/scholarlyProfiles";
import { dataciteProfile } from "@/lib/dataciteProfile";

describe("scholarly profile synchronization", () => {
  it("derives every scholarly profile consumer from the authoritative collection", () => {
    const names = scholarlyProfiles.map((profile) => profile.name);
    const synchronizationNames = scholarlyProfiles.map((profile) => profile.synchronizationName);
    const metric = dashboardMetrics.find((item) => item.source === "scholarlyProfiles");

    expect(metric?.value).toBe(scholarlyProfiles.length);
    expect(metric?.breakdown.map((item) => item.label)).toEqual(names);
    expect(metric?.actionLabel).toBe("Explore Research Profiles");
    expect(metric?.footer).toBe("Updated automatically from verified scholarly sources.");
    expect(dashboardResearchMetrics.scholarlyProfiles).toBe(scholarlyProfiles.length);
    expect(openScienceProfiles.map((profile) => profile.title)).toEqual(names);
    expect(openScienceCards.map((profile) => profile.title)).toEqual(names);
    expect(dataciteProfile.externalProfiles.map((profile) => profile.label)).toEqual(names);
    expect(dashboardSynchronizationModel.authoritativeSources.slice(0, scholarlyProfiles.length)).toEqual(
      synchronizationNames,
    );
  });
});