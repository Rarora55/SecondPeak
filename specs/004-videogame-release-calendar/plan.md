# Implementation Plan: Videogame Release Calendar

**Branch**: `[004-videogame-release-calendar]` | **Date**: 2026-04-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-videogame-release-calendar/spec.md`

## Summary

Add a dedicated Calendar route with a vertical day-grouped master timeline of game releases, URL-driven selected state (`/calendar?game=:gameSlug`), and a responsive master-detail experience that preserves context. Keep Sanity as editorial source-of-truth and model Supabase as a derived, normalized search/index layer for future filter/search routes.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)  
**Frontend Framework**: React 19 + React Router 7 + Vite 8  
**Styling**: Tailwind CSS 4 + shared rules in `src/styles/global.css`  
**Animation**: Motion 12 layout transitions with reduced-motion fallback  
**UI Primitives**: Radix Dialog (existing overlay primitives remain available)  
**Editorial CMS**: Sanity (editorial authoring and publication source)  
**Non-Editorial Data**: Supabase JS v2 (normalized index/search store)  
**Hosting**: Vercel (preview and production unchanged)  
**Testing**: `npm run typecheck` + deterministic manual QA for calendar timeline, selection URL state, responsive detail behavior, entity rendering, reduced-motion, and resilience states  
**Target Platform**: Modern browsers on desktop/tablet/mobile  
**Project Type**: Editorial web app feature expansion  
**Performance Goals**: Smooth selection transition, readable timeline density, no route-level regression in perceived responsiveness  
**Constraints**: Preserve navigation extensibility, keep Sanity/Supabase ownership boundaries, maintain keyboard and touch accessibility, and keep URL-shareable selected state  
**Scale/Scope**: New Calendar destination with reusable entity model for future `/studios/:slug`, `/tags/:slug`, and `/search`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Review

- Editorial-first product: PASS - timeline and detail hierarchy prioritize reading clarity and discoverability.
- Modular and typed architecture: PASS - plan decomposes route shell, presentation components, and data mapping boundaries.
- Controlled horizontal storytelling: PASS - no new global horizontal navigation pattern is introduced.
- Accessibility and usability over novelty: PASS - keyboard, focus semantics, reduced-motion, and mobile detail behavior are explicit.
- Performance as a feature: PASS - no new heavy runtime dependencies beyond existing stack.
- Content ownership discipline: PASS - Sanity remains editorial owner; Supabase remains derived index layer.
- Production-ready scalability: PASS - entity/slugs and URL strategy preserve future growth to search/filter routes.

## Project Structure

### Documentation (this feature)

```text
specs/004-videogame-release-calendar/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-calendar-master-detail-contract.md
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
|   |-- calendar/
|   |   |-- CalendarPage.tsx
|   |   |-- calendar-data.ts
|   |   `-- components/
|   |       |-- CalendarTimeline.tsx
|   |       |-- CalendarDay.tsx
|   |       |-- ReleaseMiniCard.tsx
|   |       |-- ReleaseDetailPanel.tsx
|   |       `-- ReleaseTags.tsx
|   |-- home/
|   |-- chapters/
|   |-- sections/
|   |-- manifesto/
|   `-- contact/
|-- styles/
|   `-- global.css
`-- tests/
    `-- manual/
```

**Structure Decision**: Introduce a dedicated `routes/calendar` module with strict separation between route/data-state and presentational components, while only extending existing router/navigation entries and shared styling.

## Phase 0: Outline & Research

Research outputs are captured in [research.md](./research.md).

Resolved planning decisions:

1. Selected release URL strategy uses `game` query param on `/calendar`.
2. Mobile detail behavior uses dedicated full-page state on `/calendar?game=:gameSlug`.
3. Public visibility includes all `published` releases regardless of release date direction.
4. Master-detail transition uses Motion layout animation with reduced-motion-safe fallback.
5. Sanity-to-Supabase normalization keeps editorial and search/index responsibilities separated.
6. Studio/tag rendering remains entity-first with stable ids/slugs and link-ready controls.
7. Validation strategy uses type safety plus deterministic manual QA coverage for responsive and resilience flows.

## Phase 1: Design & Contracts

Design artifacts produced:

- [data-model.md](./data-model.md): normalized entities, relationships, and visibility/state rules for timeline and detail rendering.
- [contracts/ui-calendar-master-detail-contract.md](./contracts/ui-calendar-master-detail-contract.md): route, interaction, layout, accessibility, and ownership contracts.
- [quickstart.md](./quickstart.md): implementation and verification workflow for core and edge acceptance behavior.

Agent context update:

- `AGENTS.md` plan reference updated to `specs/004-videogame-release-calendar/plan.md`.

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

1. Add Calendar route and scalable menu entry configuration.
2. Implement URL-driven selected-release state via `game` query param.
3. Build vertical day timeline and per-day card rendering components.
4. Build desktop detail panel with centered combined layout and left-shifted master state.
5. Build mobile dedicated detail-state behavior preserving calendar context and back usability.
6. Implement structured entity rendering for studio/tags/social links with link-ready semantics.
7. Add data mapping boundaries for Sanity editorial payload to normalized Supabase index payload.
8. Validate accessibility, reduced-motion behavior, loading/empty/error resilience, and responsive integrity.

Expected touched files:

- `src/app/router.tsx`
- `src/components/navigation/BurgerMenu.tsx`
- `src/routes/calendar/CalendarPage.tsx`
- `src/routes/calendar/calendar-data.ts`
- `src/routes/calendar/components/CalendarTimeline.tsx`
- `src/routes/calendar/components/CalendarDay.tsx`
- `src/routes/calendar/components/ReleaseMiniCard.tsx`
- `src/routes/calendar/components/ReleaseDetailPanel.tsx`
- `src/routes/calendar/components/ReleaseTags.tsx`
- `src/styles/global.css`
- `src/tests/manual/004-*.md`

## Complexity Tracking

No constitution violations or approved exceptions are required for this feature.
