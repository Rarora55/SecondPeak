# Home Cover Routing Contract

## Purpose

Define expected route behavior, Home cover state behavior, and linked editorial destination requirements for the rebuilt Home experience.

## Route Surface

- `GET /home`
- `GET /home/:versionSlug`
- `GET /reviews/far-lone-sails/:pageSlug` (existing destination reused by Topic 1)
- `GET /features/:articleSlug` (Topic 2 destination family)
- `GET /interviews/:articleSlug` (Topic 3 destination family)

## Resolution Rules

1. `/home` resolves to exactly one active valid Home cover issue.
2. `/home/:versionSlug` resolves to the matching valid Home cover issue by `slug`.
3. If `:versionSlug` does not exist or resolves to invalid data, Home renders an in-shell fallback state with a recovery action back to `/home`.
4. Each revealed topic link resolves directly to a published editorial destination page.
5. If a required destination already exists, Home must link to that existing route rather than duplicate it.

## Home Rendering Contract

1. Closed Home state renders:
   - Editorial header with SecondPeak branding and issue metadata.
   - Central issue image.
   - SILENCE cover title attached to the lower image edge.
   - Minimal expand indicator/button.
2. Open Home state renders:
   - The same header, image, and SILENCE title as the closed state.
   - The same expand/collapse control with reversed direction treatment.
   - Exactly three centered topic links beneath the cover.
3. Expand/collapse behavior is in-place UI state only and does not change the route.
4. Page-entry presentation may animate, but route usability must not depend on motion.

## Destination Contract

1. Topic 1 may resolve to an existing chapter page under the established reviews route.
2. Topic 2 resolves through `/features/:articleSlug`.
3. Topic 3 resolves through `/interviews/:articleSlug`.
4. Any missing destination page required by Topics 2 or 3 must be added in this feature as a direct-entry editorial article route under the existing section-oriented route structure.
5. Each destination page must expose public metadata expectations:
   - Title
   - Description
   - Canonical URL
   - Open Graph title/description
6. Destination routes must remain directly accessible on refresh and manual URL entry.

## Accessibility Contract

1. The expand/collapse control is a semantic button with programmatic expanded/collapsed state.
2. Topic entries are semantic links.
3. Keyboard users can open/close the topic area and activate any topic link.
4. Reduced-motion preference must preserve full route and state usability.

## Data Ownership Contract

1. Home cover issue content and destination article content remain editorial-domain content.
2. Local typed data is the single authoritative editorial source for this feature phase.
3. Non-editorial product/app data remains outside this editorial source boundary.
4. Future source migration must preserve route behavior if the project later replaces the local registries.
