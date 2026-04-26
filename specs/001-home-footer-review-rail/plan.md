# Implementation Plan: Home Footer Scope and Review Rail Navigation

**Branch**: `[001-home-footer-review-rail]` | **Date**: 2026-04-26 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-home-footer-review-rail/spec.md`

## Summary

Scope this change to layout/navigation behavior only: the footer must render exclusively in Home scroll flow, and chapter right-rail navigation on desktop/tablet must become structural full-height black bars with one bar per child page. On small screens, chapter navigation must switch to a horizontal bar strip while preserving the same child-page routing and existing lateral chapter transition behavior.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + global.css utility styles  
**Animation**: Motion 12 (existing chapter transitions stay intact)  
**UI Primitives**: Existing native/button semantics (no new primitive dependency required)  
**Editorial CMS**: Not touched in this feature (editorial content remains source-driven)  
**Non-Editorial Data**: Not touched in this feature  
**Hosting**: Vite local dev; deployment target remains Vercel  
**Testing**: Typecheck + deterministic manual browser QA flows; optional Playwright smoke can be added in follow-up  
**Target Platform**: Modern browsers (desktop/tablet + mobile responsive behavior)  
**Project Type**: Editorial web app route/navigation enhancement  
**Performance Goals**: No regression to chapter transition smoothness; no additional blocking runtime work in layout shell  
**Constraints**: Preserve existing route contracts and child-page slugs; keyboard/touch operability for new bar nav; reduced-motion compatibility  
**Scale/Scope**: Must auto-scale with future chapter child pages without per-page rail rewrites

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first: PASS - Internal pages stay visually focused by removing global footer bleed.
- Route architecture: PASS - Existing nested chapter routes and direct child URLs remain canonical.
- Controlled horizontal storytelling: PASS - Horizontal chapter behavior remains limited to chapter context; mobile uses alternate readable pattern.
- Accessibility and usability: PASS - Plan keeps keyboard/touch operation and current-page semantics explicit.
- Performance as a feature: PASS - No heavy dependency additions; behavior change is route-conditional rendering and lightweight nav styling.
- Content ownership discipline: PASS - No Sanity/Supabase boundary changes.
- Production-ready scalability: PASS - Bar generation remains data-driven from chapter page arrays.

## Project Structure

### Documentation (this feature)

```text
specs/001-home-footer-review-rail/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- navigation-behavior-contract.md
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
|   |-- navigation/
|   `-- shell/
|       `-- SiteFooter.tsx
|-- routes/
|   |-- home/
|   |-- chapters/
|   |-- sections/
|   |-- manifesto/
|   `-- contact/
`-- styles/
    `-- global.css
```

**Structure Decision**: Keep modifications inside existing route/layout modules (`SiteLayout`, `HomePage`, `ChapterShell`, global styles) and avoid introducing new architectural layers for this scoped UX change. Use chapter page data as the single source for both desktop and mobile bar controls.

## Phase 0: Research and Decisions

Research outcomes are captured in [research.md](./research.md).  
All previously open planning choices are resolved:

- Footer visibility trigger model selected (in-view zone only on Home).
- Responsive navigation model selected (desktop/tablet right rail, mobile horizontal bar strip).
- Testing/verification strategy selected for this feature scope.

## Phase 1: Design and Contracts

Design artifacts:

- [data-model.md](./data-model.md): UI-state entities, validation rules, and transitions.
- [contracts/navigation-behavior-contract.md](./contracts/navigation-behavior-contract.md): route and interaction behavior contract for footer and chapter bars.
- [quickstart.md](./quickstart.md): implementation and verification flow.

Post-design constitution review:

- Editorial-first: PASS
- Route architecture: PASS
- Controlled horizontal storytelling: PASS
- Accessibility and usability: PASS
- Performance as a feature: PASS
- Content ownership discipline: PASS
- Production-ready scalability: PASS

## Phase 2: Implementation Planning

Planned execution slices:

1. Route-scoped footer behavior
2. Home scroll-zone footer reveal/hide logic
3. Desktop/tablet chapter rail conversion to full-height black bars
4. Small-screen horizontal bar strip behavior
5. Accessibility + regression verification for chapter navigation parity

Expected touched files:

- `src/app/shell/SiteLayout.tsx`
- `src/routes/home/HomePage.tsx`
- `src/routes/chapters/ChapterShell.tsx`
- `src/styles/global.css`
- Optional: `src/components/shell/SiteFooter.tsx` (if footer wrapper semantics are adjusted)

## Complexity Tracking

No constitution violations are planned.

