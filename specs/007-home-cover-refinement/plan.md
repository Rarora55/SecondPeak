# Implementation Plan: Home Cover Refinement

**Branch**: `[004-videogame-release-calendar]` | **Date**: 2026-06-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-home-cover-refinement/spec.md`

## Summary

Refine the current Home cover implementation without changing its approved editorial direction. Keep the existing issue data, routes, metadata ownership, and linked topic destinations intact while correcting the full-width header behavior, image-title spacing, expanded-state scaling, composition centering, logo hover/focus treatment, chevron behavior, responsive topic layout, and route-entry fade timing.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + shared editorial rules in `src/styles/global.css`  
**Animation**: Motion 12 for route-entry/reveal choreography, with CSS transitions for sizing, spacing, chevron, and hover states  
**UI Primitives**: Native semantic button/link elements inside the existing Home shell  
**Editorial Content Source**: Existing local typed Home/version registry and section article registries remain authoritative; no content-source migration is in scope  
**Non-Editorial Data**: Supabase JS v2 remains out of scope for this refinement  
**Hosting**: Vercel (preview + production unchanged)  
**Testing**: `npm run typecheck` plus deterministic manual QA for `/home`, `/home/:versionSlug`, expand/collapse behavior, logo hover/focus, responsive layout, reduced-motion behavior, and Home metadata/non-regression route coverage  
**Target Platform**: Modern desktop, tablet, and mobile browsers  
**Project Type**: Editorial web app layout and interaction refinement  
**Performance Goals**: Preserve fast Home entry, avoid visible layout jank while toggling topics, keep route-entry fade calm, and maintain stable responsive behavior without overflow or clipping  
**Constraints**: Preserve the approved visual language, respect reduced motion, keep all current public destinations working, avoid introducing a more commercial visual tone, and scope content changes to presentation-only unless a validation gap requires a minor copy encoding fix  
**Scale/Scope**: One refinement pass on the current SILENCE Home cover implementation and its manual QA coverage, with no new editorial route families or content-source changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first product: PASS - the feature protects the approved cover tone and focuses on hierarchy, proportion, spacing, and reading comfort.
- Route architecture: PASS - `/home` and existing linked editorial destinations remain direct-entry public routes with no new routing complexity required.
- Horizontal storytelling: PASS - no horizontal navigation changes are introduced.
- Accessibility: PASS - keyboard/touch access, focus states, reduced motion, and semantic controls remain explicit in scope.
- Performance: PASS - the plan limits motion to calm entry/reveal behavior and uses CSS transitions for low-cost layout refinement.
- Content ownership: PASS - existing local typed editorial registries remain the single authoritative source for Home and linked destination content.
- SEO/discoverability: PASS - Home metadata ownership remains in `HomeVersionPage`, and route discoverability is a non-regression check rather than a new SEO surface.
- Resilience: PASS - Home fallback behavior and linked destination direct-entry behavior remain preserved and are checked for regression.
- Deployability: PASS - the work stays within the current React Router/Vite/Vercel stack.
- Product architecture standards: PASS - Home remains a feature-defined editorial canvas and this refinement is explicitly scoped in the feature plan.

## Project Structure

### Documentation (this feature)

```text
specs/007-home-cover-refinement/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- home-cover-refinement-contract.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- router.tsx
|   |-- seo.ts
|   |-- robots.ts
|   `-- sitemap.ts
|-- routes/
|   |-- home/
|   |   |-- HomePage.tsx
|   |   |-- HomeVersionPage.tsx
|   |   |-- home-types.ts
|   |   |-- home-data.ts
|   |   |-- home-version-registry.ts
|   |   `-- components/
|   |       |-- HomeCoverHero.tsx
|   |       |-- HomeShell.tsx
|   |       `-- HomeTopicLink.tsx
|   `-- sections/
|       |-- SectionArticlePage.tsx
|       `-- section-article-registry.ts
|-- styles/
|   `-- global.css
`-- tests/
    `-- manual/
        |-- 006-home-cover-rebuild.md
        `-- 007-home-cover-refinement.md
```

**Structure Decision**: Keep the existing `HomeVersionPage` route shell, `HomeCoverHero` interaction component, typed Home registry, and linked section/article routes. Scope this feature primarily to Home presentation logic and global CSS, with metadata/SEO files and destination routes treated as regression checks unless the refinement uncovers a direct contract mismatch.

## Phase 0: Outline & Research

Research conclusions are documented in [research.md](./research.md).

Resolved planning decisions:

1. Treat this feature as a refinement of the current `HomeCoverHero` implementation rather than a second Home redesign.
2. Keep route-entry animation on the route container only, and prevent it from replaying during expand/collapse state changes.
3. Use CSS-driven responsive sizing and spacing for the header, cover block, and topics grid while leaving editorial content unchanged.
4. Preserve local typed registries and current route destinations as the authoritative content contract; this feature is presentation-first, not a content migration.
5. Expand manual QA from the existing `006-home-cover-rebuild` checklist with explicit checks for header width, visual centering, logo interaction, viewport-fit in open state, and fade behavior.

## Phase 1: Design & Contracts

Design artifacts produced:

- [data-model.md](./data-model.md): refined entity/state contract for the Home header, cover composition, toggle state, topic group, and interaction states.
- [contracts/home-cover-refinement-contract.md](./contracts/home-cover-refinement-contract.md): route, layout, interaction, accessibility, and non-regression behavior contract for the refined Home cover.
- [quickstart.md](./quickstart.md): implementation and verification flow for refining the Home cover layout and interactions.

Agent context update:

- `AGENTS.md` plan reference updated to `specs/007-home-cover-refinement/plan.md`.

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

1. Audit the current Home cover implementation in `HomeCoverHero`, `HomeShell`, and `global.css` to map which layout rules currently create the fixed-width header, title/image collision, and open-state overflow.
2. Refine the header structure and styles so the Home header spans the viewport with responsive inner padding, aligned brand/meta content, and a matching divider width.
3. Adjust the cover figure spacing so the SILENCE title keeps a small controlled gap beneath the image while remaining visually attached to it.
4. Update the open/closed state layout contract so the cover block scales down smoothly in the expanded state and the overall composition stays visually centered and readable on desktop and tablet.
5. Refine chevron presentation and toggle behavior so its direction, positioning, and transition clearly communicate expanded/collapsed state without adding visual noise.
6. Add logo hover/focus interaction styling that affects only the logo treatment and preserves accessible link semantics if the brand is implemented as a link.
7. Rework the topics container sizing and responsive grid behavior so it aligns with the cover width on desktop, degrades cleanly on tablet, and stacks into a readable single-column flow on mobile.
8. Keep route-entry fade behavior limited to initial Home entry while preserving reduced-motion fallbacks and preventing replay during local toggle interactions.
9. Validate Home route metadata, version fallback behavior, and linked destination access as non-regression checks rather than new implementation scope.
10. Add a dedicated manual QA checklist for this refinement and keep `npm run typecheck` plus direct route/manual interaction verification as the acceptance gate.

Expected touched files:

- `AGENTS.md`
- `src/routes/home/HomeVersionPage.tsx`
- `src/routes/home/home-types.ts`
- `src/routes/home/home-version-registry.ts`
- `src/routes/home/components/HomeCoverHero.tsx`
- `src/routes/home/components/HomeShell.tsx`
- `src/routes/home/components/HomeTopicLink.tsx`
- `src/styles/global.css`
- `src/tests/manual/006-home-cover-rebuild.md`
- `src/tests/manual/007-home-cover-refinement.md`
- Potential non-regression verification only: `src/app/router.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`

## Complexity Tracking

No constitution violations or exceptions are required for this feature under version 2.0.0.
