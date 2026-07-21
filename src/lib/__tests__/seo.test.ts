import { describe, expect, it } from "vitest";

import { createPageMetadata } from "@/lib/seo";

describe("createPageMetadata", () => {
  it("creates normalized metadata fields", () => {
    const metadata = createPageMetadata({
      title: "Knowledge Graph",
      description: "Network view",
      canonical: "/knowledge-graph",
      keywords: ["graph", "research"],
    });

    expect(metadata.title).toBe("Knowledge Graph");
    expect(metadata.description).toBe("Network view");
    expect(metadata.alternates?.canonical).toBe("/knowledge-graph");
    expect(metadata.openGraph?.url).toBe("https://rakeshkumaragrawal.github.io/knowledge-graph");
    expect(metadata.keywords).toEqual(["graph", "research"]);
  });
});
