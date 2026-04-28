# Implementation Plan: Home Navigation and Review Spacing Fixes

**Branch**: `[002-home-nav-review-fixes]` | **Date**: 2026-04-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-home-nav-review-fixes/spec.md`

## Summary

Implement four scoped UI behavior fixes: ensure burger/X toggle consistently closes the overlay (including immediate close on navigation action), ensure navbar brand title routes to Home, eliminate the visual seam between review rail and review content (zero spacing), and tighten Home footer activation to the final 10% of Home scroll progression.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + `global.css` utility/layout rules  
**Animation**: Motion 12 (existing chapter transitions remain)  
**UI Primitives**: Radix Dialog (`@radix-ui/react-dialog`)  
**Editorial CMS**: Sanity (not modified in this feature)  
**Non-Editorial Data**: Supabase JS v2 (not modified in this feature)  
**Hosting**: Vercel (unchanged deployment model)  
**Testing**: `npm run typecheck` + deterministic manual QA of navigation/menu/layout behaviors  
**Target Platform**: Modern browsers (desktop/tablet + mobile responsive)  
**Project Type**: Editorial web app (route and shell behavior refinement)  
**Performance Goals**: No regression to chapter navigation smoothness; no additional heavy runtime work  
**Constraints**: Preserve accessibility semantics, reduced-motion compatibility, and existing route contracts  
**Scale/Scope**: Limited to Home, shared shell/header menu, and chapter review layout behavior

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first product: PASS - change scope improves clarity and removes visual friction in reading surfaces.
- Modular and typed architecture: PASS - updates remain in existing shell/route/style modules.
- Controlled horizontal storytelling: PASS - chapter flow remains route-driven and unchanged in navigation model.
- Accessibility and usability over novelty: PASS - explicit keyboard/touch requirements preserved for toggle and links.
- Performance as a feature: PASS - no new libraries or heavy animation changes.
- Content ownership discipline: PASS - no Sanity/Supabase ownership boundary changes.
- Production-ready scalability: PASS - behavior remains data-driven and compatible with existing deploy flow.

## Project Structure

### Documentation (this feature)

```text
specs/002-home-nav-review-fixes/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-navigation-contract.md
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
|   |-- navigation/
|   |   `-- BurgerMenu.tsx
|   `-- shell/
|       `-- SiteFooter.tsx
|-- routes/
|   |-- home/
|   |   |-- HomePage.tsx
|   |   `-- home-data.ts
|   |-- chapters/
|   |   |-- ChapterShell.tsx
|   |   |-- ChapterRoute.tsx
|   |   `-- chapter-config.ts
|   |-- sections/
|   |-- manifesto/
|   `-- contact/
|-- styles/
|   `-- global.css
`-- tests/
    `-- manual/
```

**Structure Decision**: Keep changes in existing shell, route, and style files only; avoid introducing new layers for this targeted behavior-fix feature.

## Phase 0: Research and Decisions

Research outputs are captured in [research.md](./research.md).

Resolved planning decisions:

1. Define deterministic close behavior for menu toggle and menu-link navigation.
2. Define source of truth for Home footer trigger threshold (final 10% of Home scroll).
3. Define strict review seam behavior contract (zero interstitial spacing).
4. Define validation approach (typecheck + manual interaction QA).

## Phase 1: Design and Contracts

Design artifacts produced:

- [data-model.md](./data-model.md): state entities and validation rules for menu, brand navigation, review layout seam, and Home footer trigger zone.
- [contracts/ui-navigation-contract.md](./contracts/ui-navigation-contract.md): user-facing interaction and layout behavior contract.
- [quickstart.md](./quickstart.md): implementation and verification checklist for this feature.

Post-design constitution check:

- Editorial-first product: PASS
- Modular and typed architecture: PASS
- Controlled horizontal storytelling: PASS
- Accessibility and usability over novelty: PASS
- Performance as a feature: PASS
- Content ownership discipline: PASS
- Production-ready scalability: PASS

## Phase 2: Implementation Planning

Execution slices:

1. Menu toggle state reliability and immediate close-on-navigation behavior.
2. Brand title route behavior verification and alignment.
3. Review rail/content seam elimination (zero spacing) across breakpoints.
4. Home footer trigger threshold refinement to final 10% of Home scroll.
5. Manual QA and regression validation for interactions and responsiveness.

Expected touched files:

- `src/components/navigation/BurgerMenu.tsx`
- `src/app/shell/SiteLayout.tsx`
- `src/routes/home/HomePage.tsx`
- `src/routes/chapters/ChapterShell.tsx`
- `src/routes/contact/ContactPage.tsx`
- `src/styles/global.css`
- Optional: `src/tests/manual/*.md` (if checklists are updated for this feature)

## Complexity Tracking

No constitution violations or intentional exceptions are required for this feature.

