# Implementation Plan: Editorial Black-and-White Visual System

**Branch**: `[001-home-footer-review-rail]` | **Date**: 2026-04-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-editorial-bw-system/spec.md`

## Summary

Apply the strict editorial black-and-white visual system across existing routes while preserving architecture and navigation behavior, and implement a clarified Reviews two-sided rail with `current_only` policy plus explicit reduced-motion, SEO/discoverability, and resilience guarantees.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + shared rules in `src/styles/global.css`  
**Animation**: Motion 12 (existing stack only; no new animation dependency)  
**UI Primitives**: Radix Dialog (existing usage unchanged)  
**Editorial CMS**: Sanity (ownership unchanged)  
**Non-Editorial Data**: Supabase JS v2 (ownership unchanged)  
**Hosting**: Vercel (preview and production unchanged)  
**Testing**: `npm run typecheck` plus deterministic manual QA for baseline styling, interaction inversion, focus visibility, reduced-motion, SEO/discoverability regression, resilience states, and Reviews rail behavior  
**Target Platform**: Modern browsers on desktop/tablet/mobile  
**Project Type**: Editorial web app (visual-system refinement)  
**Performance Goals**: Preserve route-transition smoothness and immediate interaction feedback  
**Constraints**: Exact black/white palette, 1px borders, 2px offset focus outline, `current_only` left rail policy for Reviews, no route/content hierarchy changes, no component replacement for selected bars  
**Scale/Scope**: Global styling-state normalization plus Reviews rail partition behavior and non-functional regression safeguards

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first product: PASS - spec preserves reading hierarchy and editorial consistency.
- Modular and typed architecture: PASS - updates stay in route-shell and style layers.
- Controlled horizontal storytelling: PASS - review/chapter navigation semantics remain intact.
- Accessibility and usability over novelty: PASS - keyboard/touch behavior and reduced-motion guarantees are explicit.
- Performance as a feature: PASS - no heavy dependency additions or architecture expansion.
- Content ownership discipline: PASS - no Sanity/Supabase boundary changes.
- Production-ready scalability: PASS - behavior remains extensible across routes/content growth.

## Project Structure

### Documentation (this feature)

```text
specs/003-editorial-bw-system/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-editorial-style-contract.md
|-- checklists/
|   `-- requirements.md
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- router.tsx
|   `-- shell/
|       `-- SiteLayout.tsx
|-- components/
|   `-- navigation/
|       `-- BurgerMenu.tsx
|-- routes/
|   |-- home/
|   |   |-- HomePage.tsx
|   |   `-- home-data.ts
|   |-- chapters/
|   |   `-- ChapterShell.tsx
|   |-- sections/
|   |   `-- SectionLandingPage.tsx
|   |-- manifesto/
|   |   `-- ManifestoPage.tsx
|   `-- contact/
|       `-- ContactPage.tsx
|-- styles/
|   `-- global.css
`-- tests/
    `-- manual/
```

**Structure Decision**: Keep implementation within existing style and route shell boundaries to preserve architecture while enforcing the updated visual and behavioral contract.

## Phase 0: Outline & Research

Research outputs are captured in [research.md](./research.md).

Resolved planning decisions:

1. Canonical black-and-white baseline and inversion behavior.
2. Fixed border/focus constants for objective validation.
3. Reviews rail partition model with explicit `current_only` policy.
4. Reduced-motion compatibility behavior for affected flows.
5. SEO/discoverability non-regression expectations for metadata, sitemap, and robots.
6. Resilience behavior for loading/empty/error and rail-data fallback.
7. Verification strategy combining type safety and manual QA matrix.

## Phase 1: Design & Contracts

Design artifacts produced:

- [data-model.md](./data-model.md): entities/state transitions for visual behavior, review rail partitioning, and resilience fallbacks.
- [contracts/ui-editorial-style-contract.md](./contracts/ui-editorial-style-contract.md): user-visible styling and navigation-state contract including reduced-motion, SEO, and resilience checkpoints.
- [quickstart.md](./quickstart.md): implementation and validation workflow for all functional and non-functional outcomes.

Agent context update:

- `AGENTS.md` already references `specs/003-editorial-bw-system/plan.md` between `SPECKIT` markers.

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

1. Enforce default black-and-white surfaces and remove placeholder styling.
2. Apply inversion and focus outline behavior to shared interactive elements.
3. Preserve Home/selectable route behavior under updated visual-state rules.
4. Implement Reviews two-sided rail with `current_only` policy and preserved bar identity.
5. Validate reduced-motion behavior parity in affected flows.
6. Validate SEO/discoverability non-regression for metadata, canonical, Open Graph, sitemap, and robots behavior.
7. Validate resilience behavior for loading/empty/error states and rail-data fallback.

Expected touched files:

- `src/styles/global.css`
- `src/routes/home/HomePage.tsx`
- `src/routes/home/home-data.ts`
- `src/routes/chapters/ChapterShell.tsx`
- `src/routes/sections/SectionLandingPage.tsx`
- `src/routes/manifesto/ManifestoPage.tsx`
- `src/routes/contact/ContactPage.tsx`
- `src/app/shell/SiteLayout.tsx`
- `src/components/navigation/BurgerMenu.tsx`
- `src/tests/manual/*.md`

## Complexity Tracking

No constitution violations or approved exceptions are required for this feature.

