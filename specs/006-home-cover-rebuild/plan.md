# Implementation Plan: Home Cover Rebuild

**Branch**: `[004-videogame-release-calendar]` | **Date**: 2026-06-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-home-cover-rebuild/spec.md`

## Summary

Rebuild the Home route into a quiet editorial cover with two toggled visual states: a closed cover that shows only the issue header, central image, SILENCE title, and chevron; and an open state that reveals three linked editorial topics beneath the cover. Reuse the existing version-aware Home route shell where practical, use local typed data as the authoritative editorial source for this feature, preserve route-level metadata and reduced-motion behavior, and add any missing linked destination article pages using the project's existing editorial route conventions: Topic 1 reuses the FAR review chapter route, Topic 2 resolves under `/features/:articleSlug`, and Topic 3 resolves under `/interviews/:articleSlug`.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + shared home/editorial rules in `src/styles/global.css`  
**Animation**: Motion 12 for subtle page-entry and reveal transitions with reduced-motion fallback; CSS transitions for low-cost state changes  
**UI Primitives**: Native semantic links and buttons; existing app primitives remain available but no new dialog/overlay primitives are required  
**Editorial Content Source**: Local typed data in route-level registries for this feature  
**Non-Editorial Data**: Supabase JS v2 remains out of scope for this feature  
**Hosting**: Vercel (preview + production unchanged)  
**Testing**: `npm run typecheck` + deterministic manual QA for `/home`, expand/collapse behavior, linked article routes, keyboard flow, reduced-motion behavior, metadata regression, and sitemap/robots impact  
**Target Platform**: Modern desktop/tablet/mobile browsers  
**Project Type**: Editorial web app route redesign plus minimal linked article completion  
**Performance Goals**: Page-entry fade completes smoothly within the requested calm range, expand/collapse transitions avoid visible layout jank, and added route/content code does not materially regress Home initial load  
**Constraints**: Respect reduced motion, keyboard accessibility, direct URL entry for linked article pages, CSS-only paper background texture, keep all new styling quiet and non-commercial, and route Topic 2/3 through their clarified feature/interview families  
**Scale/Scope**: One issue-specific Home cover redesign plus three linked editorial destinations, implemented in a way that can later be migrated to another editorial source if needed

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first product: PASS - the redesign is explicitly driven by magazine-cover hierarchy, pacing, and reading tone.
- Route architecture: PASS - `/home` remains a public route and linked editorial destinations stay directly addressable by URL.
- Horizontal storytelling: PASS - no new horizontal global navigation is introduced.
- Accessibility: PASS - expand/collapse state, semantic controls, keyboard access, and reduced-motion behavior remain explicit.
- Performance: PASS - subtle transitions and CSS-generated texture avoid heavy media or animation overhead.
- Content ownership: PASS - local typed data is the single authoritative editorial source for this feature and remains separate from non-editorial data.
- SEO/discoverability: PASS - Home metadata remains route-managed and new destination pages require explicit metadata and sitemap/robots coverage.
- Resilience: PASS - Home fallback behavior remains in-shell and linked-page gaps are handled in scope by creating missing destinations.
- Deployability: PASS - the work remains within the current React Router/Vite/Vercel stack.
- Product architecture standards: PASS - Home is an editorial canvas under the updated constitution, and this feature defines its structure explicitly.

## Project Structure

### Documentation (this feature)

```text
specs/006-home-cover-rebuild/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- home-cover-routing-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   `-- router.tsx
|-- routes/
|   |-- home/
|   |   |-- HomeVersionPage.tsx
|   |   |-- home-types.ts
|   |   |-- home-version-registry.ts
|   |   `-- components/
|   |       |-- HomeShell.tsx
|   |       |-- HomeCoverHero.tsx
|   |       `-- HomeTopicLink.tsx
|   |-- chapters/
|   |   `-- chapter-config.ts
|   |-- sections/
|   |   |-- SectionArticlePage.tsx
|   |   `-- section-article-registry.ts
|   `-- manifesto/
|-- styles/
|   `-- global.css
`-- tests/
    `-- manual/
```

**Structure Decision**: Preserve the existing `HomeVersionPage` route entry and route-level metadata ownership, but replace the old grid-specific presentation path with a dedicated cover-hero composition. Use the local Home registry and section article registry as the single authoritative editorial source for this feature instead of introducing a second route family or a feature-scoped CMS integration.

## Phase 0: Outline & Research

Research conclusions are documented in [research.md](./research.md).

Resolved planning decisions:

1. Replace the current Home presentation with a dedicated cover-state composition defined explicitly by this feature.
2. Keep expand/collapse as an in-place state toggle controlled by a semantic button rather than route navigation.
3. Model the three revealed topics as typed linked entries so Home can render them and route to destination pages deterministically.
4. Reuse the existing FAR chapter route for Topic 1, route Topic 2 through `/features/:articleSlug`, and route Topic 3 through `/interviews/:articleSlug`.
5. Use local typed data as the authoritative editorial content source for this feature.
6. Implement the paper background entirely in CSS layers and use low-cost Motion/CSS transitions with reduced-motion fallbacks.

## Phase 1: Design & Contracts

Design artifacts produced:

- [data-model.md](./data-model.md): entity schema for the Home cover payload, reveal topics, route destinations, and linked article entries.
- [contracts/home-cover-routing-contract.md](./contracts/home-cover-routing-contract.md): route, toggle-state, metadata, and destination-link behavior contract for the rebuilt Home cover.
- [quickstart.md](./quickstart.md): implementation and verification flow for developers rebuilding the Home cover and linked article destinations.

Agent context update:

- `AGENTS.md` plan reference updated to `specs/006-home-cover-rebuild/plan.md`.

### Post-Design Constitution Re-Check

- Editorial-first product: PASS
- Route architecture: PASS
- Horizontal storytelling: PASS
- Accessibility: PASS
- Performance: PASS
- Content ownership: PASS
- SEO/discoverability: PASS
- Resilience: PASS
- Deployability: PASS
- Product architecture standards: PASS

## Phase 2: Implementation Planning

Execution slices:

1. Refactor Home type contracts to support cover-state rendering, cover metadata, and revealed topic link content instead of the old fixed left/right tile grid.
2. Update the Home version registry with the SILENCE issue payload, central image asset reference, editorial topic copy, and destination route targets, including explicit `features` and `interviews` routing for Topics 2 and 3.
3. Replace the current Home composition with dedicated cover components that render the image, title, header line, toggle control, and revealable topic columns.
4. Implement slow route-entry fade, subtle reveal motion, arrow-direction transitions, and reduced-motion-safe fallbacks in the Home route presentation layer.
5. Rebuild Home background and typography styling in `src/styles/global.css`, including the CSS-only paper texture and responsive editorial spacing rules.
6. Keep Home route metadata management in `HomeVersionPage` and ensure canonical/title/description behavior still resolves correctly for the active cover issue.
7. Create any missing linked editorial destinations required by the three topics, reusing the existing FAR chapter route for Topic 1 and adding direct-entry `/features/:articleSlug` and `/interviews/:articleSlug` article routes where needed.
8. Extend router configuration to support the new destination pages while preserving current Home and chapter behavior.
9. Add explicit sitemap/robots updates for the new public routes and verify public metadata/discoverability coverage.
10. Validate type safety and manual acceptance checks for `/home`, expand/collapse, linked destination pages, reduced-motion behavior, and route-level fallback states.

Expected touched files:

- `src/app/router.tsx`
- `src/routes/home/HomeVersionPage.tsx`
- `src/routes/home/home-types.ts`
- `src/routes/home/home-version-registry.ts`
- `src/routes/home/components/HomeShell.tsx`
- `src/routes/home/components/HomeGrid.tsx`
- `src/routes/home/components/HomeMainFeature.tsx`
- `src/routes/home/components/HomeTile.tsx`
- `src/routes/home/components/HomeFooterStrip.tsx`
- `src/routes/home/components/HomeCoverHero.tsx`
- `src/routes/home/components/HomeTopicLink.tsx`
- `src/routes/sections/SectionArticlePage.tsx`
- `src/routes/sections/section-article-registry.ts`
- `src/styles/global.css`
- `src/tests/manual/006-home-cover-rebuild.md`
- Relevant sitemap/robots-related files under `src/`

## Complexity Tracking

No constitution violations or exceptions are required for this feature under version 2.0.0.
