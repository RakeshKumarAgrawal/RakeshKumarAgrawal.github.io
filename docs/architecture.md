# Architecture Guide

## System Overview

This portfolio is a static-exported Next.js App Router application optimized for reliability, traceability, and content scalability.

Core principles:

- Data-first rendering with JSON and typed resolver modules.
- Shared UI primitives for consistency and maintainability.
- Static generation for all routes, including dynamic detail pages.
- Verified-source traceability attached to public records.

## Layered Structure

1. App routes: page composition and metadata.
2. Components: reusable UI and feature widgets.
3. Data resolvers: typed mapping from JSON/raw records to render models.
4. Utility libraries: SEO, linking helpers, theme, and common logic.

## Current Refactor Highlights

- Added shared route scaffold component (`SectionPageLayout`) to remove repeated page shells.
- Added shared metadata helper (`createPageMetadata`) to normalize SEO settings.
- Added shared linking utilities (`createTitleIndex`, `resolveLinkedByTitle`, etc.) to remove duplicated resolver code.
- Added deferred client enhancement loader (`GlobalEnhancements`) to delay non-critical UI hydration.
- Added loading skeletons for root and detail route transitions.

## Knowledge Graph Design

- Source model in `src/data/knowledgeGraph.json` defines base hubs and relationships.
- Type-safe builder in `src/data/knowledgeGraph.ts` expands graph with nodes from existing datasets.
- Graph renderer in `src/components/knowledge-graph/KnowledgeGraphExplorer.tsx` supports filtering, zoom/pan, and node intelligence views.

## Testing Strategy

- Unit tests target pure reusable logic in `src/lib`.
- Initial coverage includes linking, SEO metadata creation, and theme preference resolution.
- Run:
  - `npm run test`
  - `npm run test:coverage`
