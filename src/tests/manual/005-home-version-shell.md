# 005 Home Version Shell Manual QA

## Route Integrity

- [ ] `/home` renders the active version with 3 left tiles, 1 main feature, and 3 right tiles.
- [ ] `/home/far-lone-sails` renders with the same structure as `/home`.
- [ ] `/home/signalis` renders with the same structure as `/home`.
- [ ] `/home/unknown-slug` renders in-shell fallback with "Go to current issue" link to `/home`.

## Accessibility and Motion

- [ ] Keyboard traversal reaches header links, all tiles, and fallback link with visible focus.
- [ ] All home tile/main images expose non-empty alt text.
- [ ] Reduced-motion preference removes non-essential transitions.

## Metadata and Discoverability

- [ ] `/home` sets title, description, canonical, and Open Graph metadata.
- [ ] `/home/far-lone-sails` sets title, description, canonical, and Open Graph metadata.
- [ ] `src/app/sitemap.ts` includes `/home` and valid `/home/:versionSlug` paths.
- [ ] `src/app/robots.ts` reflects `/home` route indexability rules.

## Registry Invariants

- [ ] Exactly one HomeVersion entry is marked active.
- [ ] Invalid version entries are excluded from rendering paths.
- [ ] Adding one valid version object enables `/home/:newSlug` without layout changes.

