# Tasks: Editorial Black-and-White Visual System

**Input**: Design documents from `/specs/003-editorial-bw-system/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical journeys in this feature (routing integrity, chapter navigation, reduced-motion behavior, contact validation, and accessibility-critical flows).  
**Organization**: Tasks are grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Every task includes an explicit file path

## Path Conventions

- Web app defaults: `src/` and `src/tests/`
- Documentation updates under `specs/003-editorial-bw-system/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared styling anchors and QA scaffolding for feature execution.

- [X] T001 Establish editorial black-and-white token anchors in `src/styles/global.css`
- [X] T002 Create or refresh baseline visual QA checklist in `src/tests/manual/003-foundation-editorial-baseline.md`
- [X] T003 [P] Create or refresh accessibility/focus QA checklist in `src/tests/manual/003-foundation-accessibility-focus.md`
- [X] T004 [P] Create reduced-motion QA checklist in `src/tests/manual/003-foundation-reduced-motion.md`
- [X] T005 [P] Create contact validation regression checklist in `src/tests/manual/003-foundation-contact-validation.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared baseline behavior and cross-cutting checks required before user-story implementation.

- [X] T006 Implement reusable default surface rules (white background, black text, 1px black border) in `src/styles/global.css`
- [X] T007 Implement reusable inversion and 2px offset focus-visible rules in `src/styles/global.css`
- [X] T008 [P] Apply shared shell baseline wrappers in `src/app/shell/SiteLayout.tsx`
- [X] T009 [P] Align burger/global navigation controls with baseline and focus classes in `src/components/navigation/BurgerMenu.tsx`
- [X] T010 [P] Add route and chapter navigation regression checklist in `src/tests/manual/003-foundation-route-regression.md`
- [X] T011 [P] Add SEO/discoverability non-regression checklist in `src/tests/manual/003-foundation-seo-discoverability.md`
- [X] T012 [P] Add resilience states checklist (loading/empty/error + fallback) in `src/tests/manual/003-foundation-resilience-states.md`
- [X] T013 Update manual QA index entries for all 003 checklists in `src/tests/manual/README.md`

**Checkpoint**: Foundation is complete; user story work can begin.

---

## Phase 3: User Story 1 - Read in a Consistent Editorial Layout (Priority: P1)

**Goal**: Remove temporary solid-color placeholders and enforce the black-and-white default surface system across affected routes.

**Independent Test**: Open Home, sections, chapter, manifesto, and contact routes; verify white surfaces, black text, 1px black borders, and no placeholder colors.

### Tests for User Story 1

- [X] T014 [P] [US1] Add route-by-route default surface verification checklist in `src/tests/manual/003-us1-global-surfaces.md`
- [X] T015 [P] [US1] Add placeholder-color removal verification checklist in `src/tests/manual/003-us1-placeholder-removal.md`

### Implementation for User Story 1

- [X] T016 [US1] Replace Home placeholder surface styling with editorial defaults in `src/routes/home/HomePage.tsx`
- [X] T017 [US1] Align Home data-driven style metadata with editorial defaults in `src/routes/home/home-data.ts`
- [X] T018 [US1] Apply editorial default surface treatment to section landing route in `src/routes/sections/SectionLandingPage.tsx`
- [X] T019 [US1] Apply editorial default surface treatment to manifesto route in `src/routes/manifesto/ManifestoPage.tsx`
- [X] T020 [US1] Apply editorial default surface treatment to contact route in `src/routes/contact/ContactPage.tsx`
- [X] T021 [US1] Remove or override legacy placeholder color selectors in `src/styles/global.css`

**Checkpoint**: US1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Recognize Interactive State Changes (Priority: P2)

**Goal**: Ensure hover/focus/active/selected states invert to black background with white text and maintain clear keyboard and reduced-motion behavior.

**Independent Test**: Trigger interactive states on Home blocks and global navigation controls; verify inversion, focus outline, and reduced-motion-safe behavior.

### Tests for User Story 2

- [X] T022 [P] [US2] Add Home interaction-state checklist (hover/focus/active/selected) in `src/tests/manual/003-us2-home-interactions.md`
- [X] T023 [P] [US2] Add navigation interaction-state and keyboard-focus checklist in `src/tests/manual/003-us2-navigation-states.md`
- [X] T024 [P] [US2] Add reduced-motion interaction parity checklist in `src/tests/manual/003-us2-reduced-motion-interactions.md`

### Implementation for User Story 2

- [X] T025 [US2] Apply inversion and selected-state behavior to Home selectable blocks in `src/routes/home/HomePage.tsx`
- [X] T026 [US2] Align Home block interaction metadata with inversion/focus requirements in `src/routes/home/home-data.ts`
- [X] T027 [US2] Apply active/hover/focus inversion behavior to burger/global nav controls in `src/components/navigation/BurgerMenu.tsx`
- [X] T028 [US2] Ensure shared shell interactive wrappers honor inversion semantics in `src/app/shell/SiteLayout.tsx`
- [X] T029 [US2] Implement reduced-motion-safe non-essential transitions for affected interactive elements in `src/styles/global.css`
- [X] T030 [US2] Finalize consistent 2px offset focus-visible styling in `src/styles/global.css`

**Checkpoint**: US2 works independently and remains compatible with US1.

---

## Phase 5: User Story 3 - Use Review Rail Without Losing Position (Priority: P3)

**Goal**: Implement two-sided review rails with explicit `current_only` policy while preserving bar identity and lateral navigation behavior.

**Independent Test**: In Reviews routes, verify right-side defaults, exactly one selected bar on left, previous selection returns right on reselection, and no regression to lateral navigation.

### Tests for User Story 3

- [X] T031 [P] [US3] Add right-default and selected-left visibility checklist in `src/tests/manual/003-us3-rail-relocation.md`
- [X] T032 [P] [US3] Add `current_only` policy checklist (new selection left, previous returns right) in `src/tests/manual/003-us3-rail-session-reset.md`
- [X] T033 [P] [US3] Add lateral review child-navigation no-regression checklist in `src/tests/manual/003-us3-lateral-navigation.md`

### Implementation for User Story 3

- [X] T034 [US3] Implement default right-rail vertical bar rendering in `src/routes/chapters/ChapterShell.tsx`
- [X] T035 [US3] Implement selected bar transfer to left rail while preserving full bar identity in `src/routes/chapters/ChapterShell.tsx`
- [X] T036 [US3] Implement explicit `current_only` partition logic in `src/routes/chapters/ChapterShell.tsx`
- [X] T037 [US3] Preserve lateral child-route transitions and reset-on-exit behavior in `src/routes/chapters/ChapterShell.tsx`
- [X] T038 [US3] Apply responsive two-rail layout rules without overlap/occlusion in `src/styles/global.css`

**Checkpoint**: US3 is independently functional and preserves review navigation behavior.

---

## Final Phase: Polish and Cross-Cutting

- [ ] T039 [P] Run route/chapter navigation regression matrix and record outcomes in `src/tests/manual/003-foundation-route-regression.md`
- [ ] T040 [P] Run contact validation regression matrix and record outcomes in `src/tests/manual/003-foundation-contact-validation.md`
- [ ] T041 [P] Run reduced-motion regression matrix and record outcomes in `src/tests/manual/003-foundation-reduced-motion.md`
- [ ] T042 [P] Run SEO/discoverability non-regression matrix and record outcomes in `src/tests/manual/003-foundation-seo-discoverability.md`
- [ ] T043 [P] Run resilience states matrix and record outcomes in `src/tests/manual/003-foundation-resilience-states.md`
- [ ] T044 [P] Run full accessibility audit pass and record outcomes in `src/tests/manual/003-foundation-accessibility-focus.md`
- [X] T045 [P] Run type safety validation and record result in `specs/003-editorial-bw-system/quickstart.md`
- [X] T046 Verify CMS/content ownership and URL-structure non-regression notes in `specs/003-editorial-bw-system/quickstart.md`
- [X] T047 Execute consolidated Feature 003 report in `src/tests/manual/003-regression-report.md`

---

## Dependencies and Execution Order

- Phase order: Setup -> Foundational -> US1 -> US2 -> US3 -> Final Phase
- US1 depends on completion of Foundational tasks.
- US2 depends on Foundational style utilities and US1 baseline consistency.
- US3 depends on Foundational style utilities and existing chapter/review route behavior.
- Final Phase depends on completion of all user stories.

## Parallel Execution Examples

- US1: run `T014` and `T015` in parallel while implementation starts with `T016`.
- US2: run `T022`, `T023`, and `T024` in parallel; then run `T027` and `T028` in parallel after `T030`.
- US3: run `T031`, `T032`, and `T033` in parallel; then run `T038` in parallel with `T035` after `T034`.

## Implementation Strategy

- MVP first: complete Phase 1 + Phase 2 + Phase 3 (US1) to ship global editorial baseline.
- Increment 2: complete US2 for interaction-state inversion, focus visibility, and reduced-motion parity.
- Increment 3: complete US3 for Reviews `current_only` two-sided rail behavior.
- Finalize with cross-cutting regression passes for SEO/discoverability, resilience, contact validation, accessibility, and type safety.

