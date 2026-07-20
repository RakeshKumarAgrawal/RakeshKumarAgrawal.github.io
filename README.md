# Rakesh Kumar Agrawal

Professional research and engineering profile built with Next.js App Router and prepared for GitHub Pages deployment from the repository root.

Expected public URL:
https://rakeshkumaragrawal.github.io

## Repository Layout

The repository root is the Next.js application.

- `.github/`
- `public/`
- `src/`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.gitignore`
- `README.md`
- `LICENSE`

## Local Development

Run from the repository root:

```bash
npm install
npm run dev
```

## Validation

Run from the repository root:

```bash
npm run lint
npm run build
```

The production build exports a static site into `out/` at the repository root.

## GitHub Pages Deployment

The repository includes:

- `.github/workflows/deploy.yml`

The workflow:

- triggers on pushes to `main`
- installs dependencies with `npm ci`
- builds the Next.js app from the repository root
- uploads the exported `out/` directory
- deploys the artifact to GitHub Pages

## Static Export Configuration

The application is configured for GitHub Pages static export.

- `output: "export"`
- `images.unoptimized: true`
- `trailingSlash: true`
- no `basePath` because this is a GitHub user pages repository

## Deployment Checklist

1. In GitHub repository settings, set Pages to deploy from GitHub Actions.
2. Confirm the default branch is `main`.
3. Push changes to `main`.
4. Wait for `.github/workflows/deploy.yml` to complete successfully.
5. Verify the published site at `https://rakeshkumaragrawal.github.io`.
6. Confirm `robots.txt`, `sitemap.xml`, favicon, and metadata load correctly.

## Notes

- This refactor keeps the existing website UI, components, styles, and routing behavior unchanged.
- Internal navigation remains compatible with GitHub Pages static hosting.
