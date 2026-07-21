# Performance and SEO Notes

## SEO

- Shared metadata helper ensures canonical URLs, Open Graph, and Twitter metadata are consistently applied.
- Root layout includes organization/person JSON-LD schema.
- `sitemap.ts` and `robots.ts` are statically generated.

## Lighthouse-Oriented Improvements

- Deferred non-critical global client features with `requestIdleCallback` fallback.
- Added route loading skeletons to improve perceived performance.
- Reduced duplicate code paths for easier long-term optimization.
- Added reduced-motion handling in animated reveal components.

## Bundle Size Considerations

- Force graph renderer is loaded client-side and route-scoped.
- Search modal initialization is deferred until idle to reduce startup pressure.

## Image Strategy

- Static export mode uses unoptimized image handling for hosting compatibility.
- Keep image assets compressed and dimensioned appropriately in `/public`.
- Prefer SVG for logos/marks and concise raster assets for content images.
