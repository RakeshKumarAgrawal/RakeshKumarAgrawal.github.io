# Contributing Guide

## Branch and PR Workflow

1. Create a feature branch from `main`.
2. Keep commits focused and scoped.
3. Open a PR with:
   - Problem statement
   - Implementation summary
   - Validation evidence (lint/build/test)

## Local Setup

1. `npm install`
2. `npm run dev`

## Quality Gates

Before opening a PR, run all checks:

1. `npm run lint`
2. `npm run test`
3. `npm run build`

## Coding Standards

- Keep UI branding and design language consistent.
- Prefer reusable components over one-off JSX duplication.
- Put user-facing copy in JSON or Markdown where practical.
- Prefer typed resolver modules for all non-trivial data transformations.
- Preserve static export compatibility.

## Accessibility Checklist

- Keyboard operable controls.
- Appropriate ARIA labels/roles.
- Preserve focus visibility.
- Respect reduced-motion preferences.

## Performance Checklist

- Defer non-critical client-only logic.
- Keep heavy dependencies scoped to specific routes.
- Avoid unnecessary re-renders and oversized client bundles.

## Documentation Expectations

Update docs when changing:

- Data schemas
- Route architecture
- Build/deploy behavior
- Testing workflows
