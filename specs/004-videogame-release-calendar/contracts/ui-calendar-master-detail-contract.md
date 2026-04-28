# Contract: Calendar Master-Detail and Normalized Entity Rendering

## Contract Scope

This contract defines required behavior for:

- Calendar route discoverability and URL-driven selected state
- Vertical day timeline and compact release-card rendering
- Desktop master-detail composition and mobile detail behavior
- Entity-first rendering of studio/tags/social links
- Hybrid Sanity/Supabase ownership boundaries
- Accessibility, reduced-motion, and resilience safeguards

## Route and URL-State Contract

1. Calendar MUST be reachable via `/calendar` from main navigation.
2. Selected release state MUST be represented by `game` query param (`/calendar?game=:gameSlug`).
3. Refreshing or sharing a selected URL MUST restore the same selected release when published.
4. Invalid or unpublished `game` query values MUST degrade safely without breaking timeline navigation.

## Timeline Rendering Contract

1. Releases MUST render grouped by day in a vertical timeline.
2. Each day block MUST support one or more release mini cards with no overlap.
3. Mini cards MUST display thumbnail, title, studio entity label, and tag entity labels.
4. Mini cards MUST be semantic interactive controls (link/button semantics), not plain clickable containers.

## Detail Presentation Contract

1. Desktop selection MUST keep timeline context visible while showing a right-side detail panel.
2. Desktop selected state MUST shift master timeline left and keep timeline + detail panel centered as a combined layout.
3. Mobile selected state MUST use dedicated full-page detail view on `/calendar?game=:gameSlug`.
4. Detail view MUST include thumbnail, title, studio, tags, quote, synopsis, social/RSS links, and Steam CTA.

## Entity and Linking Contract

1. Studio and tags MUST come from identifiable entities with stable ids and slugs.
2. ReleaseTag MUST preserve tag `type` (genre, subgenre, mechanic, mood, platform).
3. Studio/tag presentation controls MUST be link-ready for future `/studios/:slug`, `/tags/:slug`, and filtered calendar routes.
4. Social links MUST be rendered from structured `SocialLink` entities rather than ad hoc text fields.

## Ownership Boundary Contract

1. Sanity remains editorial authoring source for release fields, references, and publication state.
2. Supabase remains derived normalized index/search layer.
3. Supabase data for this feature MUST be generated/mapped from Sanity records, not manually authored as editorial input.
4. Publication visibility in public calendar output MUST include all records with `published` status, regardless of past/future release date.

## Accessibility and Motion Contract

1. Cards, links, and detail controls MUST support keyboard and touch interaction.
2. Selected state MUST be programmatically exposed and visually clear.
3. Detail headings and image alt text MUST remain meaningful.
4. Non-essential transitions MUST respect reduced-motion preferences while preserving task clarity.
5. Mobile detail entry/exit MUST preserve predictable focus order and usable return path to timeline context.

## Resilience Contract

1. Calendar MUST provide readable loading, empty, and error states.
2. Missing optional fields (quote, social links, Steam URL) MUST not break detail rendering.
3. Data-fetch failures MUST degrade gracefully while preserving navigation shell usability.

## Verification Checkpoints

- [ ] `/calendar` is reachable from the main menu.
- [ ] `game` query param controls selected release state and round-trips on refresh/share.
- [ ] Day timeline groups releases correctly and renders multiple releases per day without collisions.
- [ ] Desktop master-detail layout keeps combined content centered during selection.
- [ ] Mobile selected state is full-page detail and back path returns to calendar context.
- [ ] Mini cards and detail views render studio/tag/social data via entity models.
- [ ] Reduced-motion preference preserves usability and state discoverability.
- [ ] Loading/empty/error states remain readable and non-blocking.
- [ ] Sanity/Supabase responsibility boundary is preserved in data flow design.

## Implementation Verification (2026-04-28)

- Automated implementation pass completed for route wiring, URL-state handling, desktop/mobile detail composition, and normalized entity rendering.
- Manual verification checkpoints remain pending in `src/tests/manual/004-*.md` and must be executed before release.
