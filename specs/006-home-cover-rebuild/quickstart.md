# Quickstart: Home Cover Rebuild

## Goal

Implement and verify a rebuilt Home route that behaves like an editorial cover with closed/open states and three linked topic destinations.

## Prerequisites

- Node/npm dependencies installed.
- Current feature spec and plan:
  - `specs/006-home-cover-rebuild/spec.md`
  - `specs/006-home-cover-rebuild/plan.md`

## Implementation Steps

1. Update Home data contracts:
   - Replace or refactor the old grid-oriented Home types so they describe the cover issue, central image, and three revealed topic links.
2. Update the Home registry:
   - Add the SILENCE issue payload.
   - Point the central image to the provided MainImage asset.
   - Define all three topic titles, descriptions, and destination routes.
   - Treat the local typed registry as the authoritative editorial source for this feature.
3. Rebuild Home presentation components:
   - Replace the old side-tile/grid composition with a dedicated cover component.
   - Keep the issue header, image, title, and expand control present in both states.
4. Implement interaction and motion:
   - Default to closed state.
   - Toggle open/closed with a semantic button.
   - Add subtle page-entry fade, topic reveal motion, and reduced-motion-safe fallbacks.
5. Rebuild Home styling:
   - Add the CSS-only paper background.
   - Apply responsive editorial spacing and typography rules.
6. Add destination pages:
   - Reuse the existing FAR route for Topic 1.
   - Create any missing `/features/:articleSlug` article page required for Topic 2.
   - Create any missing `/interviews/:articleSlug` article page required for Topic 3.
7. Update router and metadata coverage:
   - Ensure Home and all linked pages resolve directly by URL.
   - Preserve title/description/canonical/Open Graph behavior for public routes.
   - Update `src/app/sitemap.ts` and `src/app/robots.ts` for any new public destination routes.
8. Add fallback handling:
   - Unknown `/home/:versionSlug` must render an in-shell recovery state.
   - Unknown `/features/:articleSlug` and `/interviews/:articleSlug` must render an editorial fallback page with a return path to `/home`.

## Verification Steps

1. Type and build checks:
   - `npm run typecheck`
2. Manual Home checks:
   - Open `/home` and verify the default closed cover state.
   - Activate the expand control and verify the three revealed topics.
   - Collapse the topic area and verify the closed state returns cleanly.
3. Manual destination checks:
   - Open each topic from Home.
   - Manually load each topic URL directly and verify it resolves without redirect breakage.
   - Manually load invalid feature/interview URLs and verify the fallback page renders cleanly.
4. Accessibility checks:
   - Keyboard navigation reaches the expand control and all topic links.
   - Expand control exposes visible focus state and expanded/collapsed state.
   - Reduced-motion preference preserves full usability.
5. Responsive checks:
   - Desktop: cover remains centered and topics display in three readable columns.
   - Tablet/mobile: cover scales down cleanly and topics reflow without loss of readability.

## Content Update Notes

1. Keep the Home issue payload typed and complete.
2. Do not introduce background-image assets for the paper texture.
3. If destination page copy changes later, preserve the existing route paths unless there is an explicit routing decision to migrate them.
