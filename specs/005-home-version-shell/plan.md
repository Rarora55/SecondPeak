# Implementation Plan: Home Version Shell

**Branch**: `[005-home-version-shell]` | **Date**: 2026-04-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-home-version-shell/spec.md`

## Summary

Refactor Home into a fixed structural shell plus versioned editorial data so `/home` and `/home/:versionSlug` both render through the same layout contract. Use a typed local HomeVersion registry now, keep route-safe fallbacks, and preserve CMS ownership boundaries so the registry can later be replaced by Sanity-backed content mapping.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + shared home-specific rules in `src/styles/global.css`  
**Animation**: Motion 12 for base home transitions with reduced-motion fallback  
**UI Primitives**: Native semantic links and existing app primitives (Radix remains available if overlay behavior changes)  
**Editorial CMS**: Sanity as current and future source of truth for editorial HomeVersion content  
**Non-Editorial Data**: Supabase JS v2 remains reserved for relational app data only  
**Hosting**: Vercel (preview + production unchanged)  
**Testing**: `npm run typecheck` + deterministic manual route/a11y QA for `/home`, `/home/:versionSlug`, fallback, and keyboard flow  
**Target Platform**: Modern desktop/tablet/mobile browsers  
**Project Type**: Editorial web app architecture refactor  
**Performance Goals**: No route-level regression, stable layout when swapping versions, minimal additional bundle overhead  
**Constraints**: Fixed 3-1-3 structure must remain invariant across versions, exactly one active version, invalid versions excluded, unknown slug fallback in-shell  
**Scale/Scope**: Enable monthly issue growth by adding typed data only; no per-issue layout forks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first product: PASS - structure preserves strong reading hierarchy while allowing issue-specific editorial content.
- Modular and typed architecture: PASS - shell/layout concerns split from version content contract and registry.
- Controlled horizontal storytelling: PASS - no new global horizontal navigation behavior introduced.
- Accessibility and usability over novelty: PASS - keyboard focus, semantic links, alt text, and reduced-motion behavior remain explicit.
- Performance as a feature: PASS - refactor consolidates layout code and avoids multi-layout duplication.
- Content ownership discipline: PASS - Sanity remains editorial owner; Supabase remains non-editorial.
- Production-ready scalability: PASS - slug routing and typed version registry support long-lived issue archives.

## Project Structure

### Documentation (this feature)

```text
specs/005-home-version-shell/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- home-version-routing-contract.md
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
|   |   |-- home-version-registry.ts
|   |   |-- home-types.ts
|   |   `-- components/
|   |       |-- HomeShell.tsx
|   |       |-- HomeGrid.tsx
|   |       |-- HomeTile.tsx
|   |       |-- HomeMainFeature.tsx
|   |       `-- HomeFooterStrip.tsx
|   `-- calendar/
|-- styles/
|   `-- global.css
`-- tests/
    `-- manual/
```

**Structure Decision**: Keep route logic and version resolution in a page-level module (`HomeVersionPage`) and keep all visual scaffolding in composable Home components. This preserves one structural source of truth and makes future Sanity mapping a data-layer concern only.

## Phase 0: Outline & Research

Research conclusions are documented in [research.md](./research.md).

Resolved planning decisions:

1. Active issue selection uses an explicit single `isActive` flag with invariant enforcement.
2. Unknown or invalid slugs render an in-shell fallback state with one-step recovery to `/home`.
3. Invalid HomeVersion payloads are excluded from render paths and cannot become active.
4. Version registry contract mirrors future Sanity document mapping to reduce migration risk.
5. Accessibility baseline includes semantic anchors, visible focus states, alt text requirements, and reduced-motion-safe transitions.

## Phase 1: Design & Contracts

Design artifacts produced:

- [data-model.md](./data-model.md): entity schema for HomeStructure, HomeVersion, HomeTile, HomeMainFeature, and HomeTheme with validation and invariants.
- [contracts/home-version-routing-contract.md](./contracts/home-version-routing-contract.md): route, fallback, and version-resolution behavior contract.
- [quickstart.md](./quickstart.md): implementation and verification flow for developers adding or changing Home versions.

Agent context update:

- `AGENTS.md` plan reference updated to `specs/005-home-version-shell/plan.md`.

### Post-Design Constitution Re-Check

- Editorial-first product: PASS
- Modular and typed architecture: PASS
- Controlled horizontal storytelling: PASS
- Accessibility and usability over novelty: PASS
- Performance as a feature: PASS
- Content ownership discipline: PASS
- Production-ready scalability: PASS

## Phase 2: Implementation Planning

Execution slices:

1. Define `HomeTheme`, `HomeTile`, `HomeMainFeature`, and `HomeVersion` type contracts and validation helpers.
2. Create version registry with explicit `isActive` enforcement and slug lookup helpers.
3. Build reusable structure components (`HomeShell`, `HomeGrid`, `HomeTile`, `HomeMainFeature`, `HomeFooterStrip`) with no embedded version-specific content.
4. Implement `HomeVersionPage` route composition for active and slug-based versions.
5. Add `/home` and `/home/:versionSlug` route behavior, including invalid/unknown in-shell fallback.
6. Map existing Far: Lone Sails and Signalis data into typed versions without duplicating layout code.
7. Verify keyboard navigation, focus visibility, alt text coverage, and reduced-motion behavior.
8. Validate type safety and manual acceptance checks for routing and version swapping.

Expected touched files:

- `src/app/router.tsx`
- `src/routes/home/HomeVersionPage.tsx`
- `src/routes/home/home-version-registry.ts`
- `src/routes/home/home-types.ts`
- `src/routes/home/components/HomeShell.tsx`
- `src/routes/home/components/HomeGrid.tsx`
- `src/routes/home/components/HomeTile.tsx`
- `src/routes/home/components/HomeMainFeature.tsx`
- `src/routes/home/components/HomeFooterStrip.tsx`
- `src/styles/global.css`
- `src/tests/manual/005-home-version-shell.md`

## Complexity Tracking

No constitution violations or exceptions are required for this feature.

