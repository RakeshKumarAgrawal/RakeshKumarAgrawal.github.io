import { describe, expect, it } from "vitest";

import { bookPortfolioMetrics, books, latestPublishedBook, publishedBooks } from "@/data/books";

describe("books portfolio", () => {
  it("keeps every published book in newest-first order", () => {
    expect(publishedBooks).toHaveLength(books.length);
    expect(latestPublishedBook.id).toBe("bio-quantum-energy-brain");
    expect(publishedBooks.map((book) => book.publicationDate)).toEqual([
      "2026-08-07",
      "2026-07-31",
    ]);
  });

  it("derives the dashboard values from the collection", () => {
    const metrics = new Map(bookPortfolioMetrics.map((metric) => [metric.label, metric.value]));

    expect(metrics.get("Published Books")).toBe(String(books.length));
    expect(metrics.get("Book Series")).toBe("2");
    expect(metrics.get("Current Volumes")).toBe("2");
    expect(metrics.get("Research Topics Covered")).toBe("13");
    expect(metrics.get("Years Publishing")).toBe("1");
  });
});