"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResultMatch } from "fuse.js";
import { Command, Search, X } from "lucide-react";

import Card from "@/components/ui/Card";
import { globalSearchEntries, type GlobalSearchCategory, type GlobalSearchEntry } from "@/data/globalSearchIndex";

type SearchResult = {
  item: GlobalSearchEntry;
  matches?: readonly FuseResultMatch[];
};

const categoryTone: Record<GlobalSearchCategory, string> = {
  Research: "border-blue-300/40 bg-blue-500/20 text-blue-100",
  Frameworks: "border-indigo-300/40 bg-indigo-500/20 text-indigo-100",
  Datasets: "border-cyan-300/40 bg-cyan-500/20 text-cyan-100",
  Projects: "border-emerald-300/40 bg-emerald-500/20 text-emerald-100",
  Publications: "border-amber-300/40 bg-amber-500/20 text-amber-100",
  Newsletters: "border-violet-300/40 bg-violet-500/20 text-violet-100",
  "Professional Service": "border-rose-300/40 bg-rose-500/20 text-rose-100",
  Timeline: "border-slate-300/40 bg-slate-500/20 text-slate-100",
  "Knowledge Graph": "border-sky-300/40 bg-sky-500/20 text-sky-100",
};

const isInternalHref = (href: string) => href.startsWith("/");

const getHighlightedSegments = (value: string, indices: readonly [number, number][]) => {
  if (!indices.length) {
    return [value];
  }

  const sorted = [...indices].sort((a, b) => a[0] - b[0]);
  const segments: Array<{ text: string; highlighted: boolean }> = [];
  let cursor = 0;

  sorted.forEach(([start, end]) => {
    if (start > cursor) {
      segments.push({ text: value.slice(cursor, start), highlighted: false });
    }

    segments.push({ text: value.slice(start, end + 1), highlighted: true });
    cursor = end + 1;
  });

  if (cursor < value.length) {
    segments.push({ text: value.slice(cursor), highlighted: false });
  }

  return segments.map((segment, index) =>
    segment.highlighted ? (
      <mark key={`${segment.text}-${index}`} className="rounded bg-primary/25 px-0.5 text-foreground">
        {segment.text}
      </mark>
    ) : (
      <span key={`${segment.text}-${index}`}>{segment.text}</span>
    ),
  );
};

const getIndicesForField = (matches: readonly FuseResultMatch[] | undefined, field: string) => {
  if (!matches?.length) {
    return [] as [number, number][];
  }

  return matches
    .filter((match) => match.key === field)
    .flatMap((match) => match.indices as [number, number][]);
};

export default function GlobalSearchModal() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = "global-search-results-listbox";

  const fuse = useMemo(
    () =>
      new Fuse(globalSearchEntries, {
        includeMatches: true,
        threshold: 0.34,
        ignoreLocation: true,
        minMatchCharLength: 2,
        keys: [
          { name: "title", weight: 0.45 },
          { name: "description", weight: 0.3 },
          { name: "category", weight: 0.15 },
          { name: "keywords", weight: 0.1 },
        ],
      }),
    [],
  );

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) {
      return globalSearchEntries.slice(0, 12).map((item) => ({ item, matches: [] }));
    }

    return fuse.search(query, { limit: 24 }).map((result) => ({
      item: result.item,
      matches: result.matches,
    }));
  }, [fuse, query]);

  const closeModal = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const openModal = () => {
    setOpen(true);
  };

  const navigateToResult = (result: SearchResult) => {
    if (!result.item.href) {
      return;
    }

    if (isInternalHref(result.item.href)) {
      closeModal();
      router.push(result.item.href);
      return;
    }

    window.open(result.item.href, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openModal();
      }

      if (event.key === "Escape") {
        closeModal();
      }
    };

    const onOpen = () => {
      openModal();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("global-search:open", onOpen as EventListener);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("global-search:open", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground shadow-[0_8px_24px_rgba(2,6,23,0.4)] backdrop-blur transition hover:border-primary/40 hover:bg-white/10 md:hidden"
        aria-label="Open global search"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90]">
          <button
            type="button"
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close search"
          />

          <div className="relative mx-auto mt-6 w-[94vw] max-w-4xl px-2 sm:mt-10" role="dialog" aria-modal="true" aria-label="Global search">
            <Card className="space-y-4 border-border/80 bg-background/95 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Global Search</h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-white/5 text-foreground transition hover:border-primary/40 hover:bg-white/10"
                  aria-label="Close search dialog"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/70 px-4 py-3 text-muted focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
                <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setActiveIndex((current) => Math.min(current + 1, results.length - 1));
                    }

                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setActiveIndex((current) => Math.max(current - 1, 0));
                    }

                    if (event.key === "Enter") {
                      event.preventDefault();
                      const active = results[activeIndex];
                      if (active) {
                        navigateToResult(active);
                      }
                    }
                  }}
                  placeholder="Search research, frameworks, datasets, projects, publications, newsletters, service, and timeline"
                  aria-label="Search across site content"
                  role="combobox"
                  aria-controls={listboxId}
                  aria-expanded={true}
                  aria-autocomplete="list"
                  aria-activedescendant={results[activeIndex] ? `search-option-${results[activeIndex].item.id}` : undefined}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
                />
                <span className="hidden items-center gap-1 rounded-lg border border-border/80 bg-white/5 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:inline-flex">
                  <Command className="h-3 w-3" aria-hidden="true" />
                  Ctrl+K
                </span>
              </label>

              <div className="max-h-[58vh] overflow-y-auto pr-1" role="listbox" aria-label="Search results" id={listboxId}>
                {results.length ? (
                  <ul className="space-y-2">
                    {results.map((result, index) => {
                      const isActive = index === activeIndex;
                      const titleIndices = getIndicesForField(result.matches, "title");
                      const descriptionIndices = getIndicesForField(result.matches, "description");

                      return (
                        <li key={result.item.id}>
                          <button
                            id={`search-option-${result.item.id}`}
                            type="button"
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => navigateToResult(result)}
                            className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                              isActive
                                ? "border-primary/45 bg-primary/10"
                                : "border-border/70 bg-surface/60 hover:border-primary/30 hover:bg-white/10"
                            }`}
                            role="option"
                            aria-selected={isActive}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-foreground">
                                {getHighlightedSegments(result.item.title, titleIndices)}
                              </p>
                              <span
                                className={`rounded-full border px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${categoryTone[result.item.category]}`}
                              >
                                {result.item.category}
                              </span>
                            </div>
                            <p className="mt-2 text-xs leading-6 text-muted">
                              {getHighlightedSegments(result.item.description, descriptionIndices)}
                            </p>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="rounded-2xl border border-border/70 bg-surface/60 px-4 py-6 text-sm text-muted">
                    No results found. Try broader keywords.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </>
  );
}
