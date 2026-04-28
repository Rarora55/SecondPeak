# Tasks: Videogame Release Calendar

**Input**: Design documents from `/specs/004-videogame-release-calendar/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical user journeys (routing integrity, reduced-motion behavior, accessibility-critical flows, and route-level resilience). Chapter navigation and contact-validation tasks are out-of-scope implementation surfaces for this feature, so they are included as explicit non-regression checks.  
**Organization**: Tasks are grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Every task includes an explicit file path

## Path Conventions

- Web app defaults: `src/` and `src/tests/`
- Documentation updates under `specs/004-videogame-release-calendar/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare calendar module scaffolding, navigation extension points, and QA templates.

- [X] T001 Create calendar route module skeleton in `src/routes/calendar/CalendarPage.tsx`
- [X] T002 Create calendar presentation component directory scaffold in `src/routes/calendar/components/.gitkeep`
- [X] T003 [P] Create calendar data module scaffold in `src/routes/calendar/calendar-data.ts`
- [X] T004 [P] Add Feature 004 checklist entries in `src/tests/manual/README.md`
- [X] T005 [P] Create foundational manual QA checklist for calendar route/access in `src/tests/manual/004-foundation-route-access.md`
- [X] T006 [P] Create foundational manual QA checklist for SEO/discoverability coverage in `src/tests/manual/004-foundation-seo-discoverability.md`
- [X] T007 [P] Create foundational manual QA checklist for reduced-motion behavior in `src/tests/manual/004-foundation-reduced-motion.md`
- [X] T008 [P] Create foundational manual QA checklist for loading/empty/error resilience in `src/tests/manual/004-foundation-resilience-states.md`
- [X] T009 [P] Create chapter-navigation non-regression checklist (out-of-scope surface) in `src/tests/manual/004-foundation-chapter-navigation-regression.md`
- [X] T010 [P] Create contact-validation non-regression checklist (out-of-scope surface) in `src/tests/manual/004-foundation-contact-validation-regression.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared architecture and data boundaries required by all calendar stories.

- [X] T011 Create normalized calendar entity types (`GameRelease`, `Studio`, `ReleaseTag`, `SocialLink`, `CalendarDayGroup`) in `src/routes/calendar/calendar-types.ts`
- [X] T012 Implement route-query helpers for `game` parsing/validation in `src/routes/calendar/calendar-query.ts`
- [X] T013 [P] Implement day-grouping and sort utilities in `src/routes/calendar/calendar-utils.ts`
- [X] T014 [P] Implement publication-status filtering and safe fallback utilities in `src/routes/calendar/calendar-visibility.ts`
- [X] T015 Implement Sanity editorial-to-domain mapping adapters in `src/routes/calendar/calendar-data.ts`
- [X] T016 [P] Implement Supabase index projection mapper (`SupabaseReleaseIndexRecord`) in `src/routes/calendar/calendar-projection.ts`
- [X] T017 Implement scalable top-level navigation config model in `src/app/navigation/site-nav.ts`
- [X] T018 Integrate `site-nav` model into burger menu rendering in `src/components/navigation/BurgerMenu.tsx`
- [X] T019 [P] Define shared calendar shell/resilience CSS primitives in `src/styles/global.css`
- [X] T020 Implement calendar route SEO metadata helper contract in `src/routes/calendar/calendar-seo.ts`

**Checkpoint**: Foundation complete; user story work can begin.

---

## Phase 3: User Story 1 - Browse Releases by Day (Priority: P1)

**Goal**: Provide a dedicated Calendar page with vertical day-grouped timeline and compact release cards.

**Independent Test**: Navigate to `/calendar` from main menu and confirm day-grouped timeline renders with one or more mini cards per day, each showing thumbnail/title/studio/tags.

### Tests for User Story 1

- [X] T021 [P] [US1] Create manual checklist for day-group timeline rendering in `src/tests/manual/004-us1-day-timeline.md`
- [X] T022 [P] [US1] Create manual checklist for mini-card content/semantics in `src/tests/manual/004-us1-mini-card-content.md`
- [X] T023 [P] [US1] Create manual checklist for Calendar route metadata/canonical/Open Graph behavior in `src/tests/manual/004-us1-calendar-seo.md`

### Implementation for User Story 1

- [X] T024 [P] [US1] Add Calendar route entry to router configuration in `src/app/router.tsx`
- [X] T025 [US1] Add Calendar navigation entry in `src/app/navigation/site-nav.ts`
- [X] T026 [P] [US1] Implement `CalendarTimeline` grouped-day renderer in `src/routes/calendar/components/CalendarTimeline.tsx`
- [X] T027 [P] [US1] Implement `CalendarDay` day-section renderer in `src/routes/calendar/components/CalendarDay.tsx`
- [X] T028 [P] [US1] Implement `ReleaseTags` entity-label renderer in `src/routes/calendar/components/ReleaseTags.tsx`
- [X] T029 [P] [US1] Implement `ReleaseMiniCard` compact semantic card renderer in `src/routes/calendar/components/ReleaseMiniCard.tsx`
- [X] T030 [US1] Compose timeline data loading and resilience states in `src/routes/calendar/CalendarPage.tsx`
- [X] T031 [US1] Add centered timeline master-view layout styles in `src/styles/global.css`
- [X] T032 [US1] Apply Calendar metadata/canonical/Open Graph integration in `src/routes/calendar/CalendarPage.tsx`

**Checkpoint**: US1 fully functional and independently testable.

---

## Phase 4: User Story 2 - Inspect a Selected Release Without Losing Context (Priority: P2)

**Goal**: Implement URL-driven selection with desktop master-detail layout and mobile full-page detail behavior.

**Independent Test**: Select release to produce `/calendar?game=<slug>`, verify refresh/share restores selection, desktop shifts timeline with right detail panel, and mobile uses readable full-page detail state.

### Tests for User Story 2

- [X] T033 [P] [US2] Create manual checklist for URL-driven selection persistence in `src/tests/manual/004-us2-selection-url-state.md`
- [X] T034 [P] [US2] Create manual checklist for desktop master-detail composition in `src/tests/manual/004-us2-desktop-master-detail.md`
- [X] T035 [P] [US2] Create manual checklist for mobile full-page detail and back flow in `src/tests/manual/004-us2-mobile-detail-flow.md`
- [X] T036 [P] [US2] Create manual checklist for reduced-motion transition parity in `src/tests/manual/004-us2-reduced-motion-transitions.md`
- [X] T037 [P] [US2] Create manual checklist for focus-return and selected-state accessibility in `src/tests/manual/004-us2-accessibility-selection.md`

### Implementation for User Story 2

- [X] T038 [P] [US2] Implement `ReleaseDetailPanel` expanded detail renderer in `src/routes/calendar/components/ReleaseDetailPanel.tsx`
- [X] T039 [US2] Implement selected-release resolution from `game` query param in `src/routes/calendar/CalendarPage.tsx`
- [X] T040 [US2] Implement mini-card selection navigation updates to `game` query param in `src/routes/calendar/components/ReleaseMiniCard.tsx`
- [X] T041 [US2] Implement desktop calendar-left/detail-right master-detail layout in `src/routes/calendar/CalendarPage.tsx`
- [X] T042 [US2] Implement mobile dedicated full-page detail state on `/calendar?game=:gameSlug` in `src/routes/calendar/CalendarPage.tsx`
- [X] T043 [US2] Add reduced-motion-safe transition styling for calendar/detail layout changes in `src/styles/global.css`
- [X] T044 [US2] Implement ARIA selected-state exposure and mobile focus-return behavior in `src/routes/calendar/CalendarPage.tsx`
- [X] T045 [US2] Add invalid/unpublished `game` fallback behavior and message handling in `src/routes/calendar/CalendarPage.tsx`

**Checkpoint**: US2 works independently and preserves master context across detail interactions.

---

## Phase 5: User Story 3 - Navigate by Identifiable Studios and Tags (Priority: P3)

**Goal**: Ensure studio/tag/social data is entity-driven and hybrid Sanity/Supabase boundaries are explicit for future search/filter routes.

**Independent Test**: Verify rendered studio/tags use id/slug-backed entities, social links render from structured records, and publication visibility reflects `published` status regardless of date direction.

### Tests for User Story 3

- [X] T046 [P] [US3] Create manual checklist for entity-backed studio/tag rendering in `src/tests/manual/004-us3-entity-rendering.md`
- [X] T047 [P] [US3] Create manual checklist for publication visibility with future-dated published releases in `src/tests/manual/004-us3-publication-visibility.md`
- [X] T048 [P] [US3] Create manual checklist for social/RSS links and Steam CTA behavior in `src/tests/manual/004-us3-links-and-cta.md`

### Implementation for User Story 3

- [X] T049 [US3] Implement studio/tag slug-aware link targets in `src/routes/calendar/components/ReleaseTags.tsx`
- [X] T050 [US3] Implement structured social links and Steam CTA fallback behavior in `src/routes/calendar/components/ReleaseDetailPanel.tsx`
- [X] T051 [US3] Enforce publication visibility (`published` only, past/future inclusive) in `src/routes/calendar/calendar-visibility.ts`
- [X] T052 [US3] Finalize normalized Sanity mapping with no loose studio/tag strings in `src/routes/calendar/calendar-data.ts`
- [X] T053 [US3] Finalize Supabase projection fields for future search/filter dimensions in `src/routes/calendar/calendar-projection.ts`
- [X] T054 [US3] Document Sanity-vs-Supabase mapping responsibilities in `specs/004-videogame-release-calendar/quickstart.md`

**Checkpoint**: US3 independently functional and future-route compatible.

---

## Final Phase: Polish and Cross-Cutting

- [ ] T055 [P] Run accessibility audit for Calendar route and record outcomes in `src/tests/manual/004-foundation-route-access.md`
- [ ] T056 [P] Run reduced-motion audit and record outcomes in `src/tests/manual/004-foundation-reduced-motion.md`
- [ ] T057 [P] Run resilience-state audit and record outcomes in `src/tests/manual/004-foundation-resilience-states.md`
- [ ] T058 [P] Run SEO/discoverability audit (metadata, canonical, Open Graph, sitemap, robots impact) in `src/tests/manual/004-foundation-seo-discoverability.md`
- [ ] T059 [P] Run chapter-navigation non-regression audit and record outcomes in `src/tests/manual/004-foundation-chapter-navigation-regression.md`
- [ ] T060 [P] Run contact-validation non-regression audit and record outcomes in `src/tests/manual/004-foundation-contact-validation-regression.md`
- [ ] T061 [P] Run story-level QA checklists and summarize outcomes in `src/tests/manual/004-regression-report.md`
- [X] T062 [P] Run type safety validation and record result in `specs/004-videogame-release-calendar/quickstart.md`
- [X] T063 Verify implementation alignment with contract checkpoints in `specs/004-videogame-release-calendar/contracts/ui-calendar-master-detail-contract.md`

---

## Dependencies and Execution Order

- Phase order: Setup -> Foundational -> US1 -> US2 -> US3 -> Final Phase.
- US1 depends on completion of Foundational tasks.
- US2 depends on US1 timeline/card rendering plus Foundational query/model utilities.
- US3 depends on US1/US2 rendering surfaces and Foundational normalization/projection adapters.
- Final Phase depends on completion of all user stories.

## Parallel Execution Examples

- US1: execute `T026`, `T027`, `T028`, and `T029` in parallel after `T024` and `T025`.
- US2: execute `T033`, `T034`, `T035`, `T036`, and `T037` in parallel while implementation begins with `T038` and `T039`.
- US3: execute `T046`, `T047`, and `T048` in parallel; then execute `T050` and `T051` in parallel after `T049`.

## Implementation Strategy

- MVP first: complete Phase 1 + Phase 2 + Phase 3 (US1) to ship navigable timeline experience with route discoverability coverage.
- Increment 2: complete US2 for URL-driven selection and responsive master-detail behavior.
- Increment 3: complete US3 for normalized entity rendering and hybrid data-boundary completion.
- Finalize with cross-cutting audits (accessibility, reduced-motion, resilience, SEO/discoverability, out-of-scope non-regressions, and type safety).

