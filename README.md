# Rakesh Kumar Agrawal

Professional research and engineering profile published with Next.js App Router and prepared for GitHub Pages deployment.

Expected public URL:
https://rakeshkumaragrawal.github.io

## Project Layout

- Root repository: GitHub Pages repository and workflow configuration
- App source: `portfolio-temp`

## Deployment Configuration

The Next.js application is configured for static export and GitHub Pages hosting.

- `next.config.ts` uses `output: "export"`
- `next.config.ts` uses `images.unoptimized: true`
- `next.config.ts` uses `trailingSlash: true`
- No `basePath` is configured because this is the GitHub Pages user repository

## Local Development

From `portfolio-temp`:

```bash
npm run dev
```

## Production Build

From `portfolio-temp`:

```bash
npm run build
```

The production build exports a static site into `portfolio-temp/out`.

## GitHub Pages Workflow

The repository includes:

- `.github/workflows/deploy.yml`

The workflow:

- triggers on pushes to `main`
- installs dependencies with `npm ci`
- builds the Next.js app in `portfolio-temp`
- uploads the exported `out` directory
- deploys the artifact to GitHub Pages

## Metadata and Static SEO Files

The deployment prep includes:

- title metadata
- description metadata
- Open Graph metadata
- Twitter metadata
- favicon support
- `robots.ts`
- `sitemap.ts` placeholder

## Deployment Checklist

1. In GitHub repository settings, enable GitHub Pages and set the source to GitHub Actions.
2. Confirm the default branch is `main`.
3. Push the latest changes to `main`.
4. Wait for `.github/workflows/deploy.yml` to complete successfully.
5. Verify the published site at `https://rakeshkumaragrawal.github.io`.
6. Confirm `robots.txt`, `sitemap.xml`, metadata, and favicon load correctly.

## Notes

- This deployment setup does not redesign the application.
- The current App Router surface is static-export compatible.
- Internal navigation is hash-based on the homepage, which is compatible with GitHub Pages static hosting.
