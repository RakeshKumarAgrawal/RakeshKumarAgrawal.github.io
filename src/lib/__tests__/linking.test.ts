import { describe, expect, it } from "vitest";

import { createKeyedIndex, createTitleIndex, resolveLinkedByKey, resolveLinkedByTitle } from "@/lib/data/linking";

describe("data linking utilities", () => {
  it("creates a title index and resolves linked titles", () => {
    const index = createTitleIndex([
      { title: "A", href: "/a", description: "Alpha" },
      { title: "B", href: "/b", description: "Beta" },
    ]);

    const linked = resolveLinkedByTitle(["A", "C"], index);

    expect(linked).toEqual([
      { title: "A", href: "/a", description: "Alpha" },
      { title: "C" },
    ]);
  });

  it("creates keyed index and resolves keyed links", () => {
    const keyed = createKeyedIndex(
      [
        { slug: "one", title: "One" },
        { slug: "two", title: "Two" },
      ],
      (item) => item.slug,
      (item) => ({ title: item.title, href: `/${item.slug}` }),
    );

    const linked = resolveLinkedByKey(["two", "three"], keyed);

    expect(linked).toEqual([{ title: "Two", href: "/two" }, { title: "three" }]);
  });
});
