# Tasks: Home Footer Scope and Review Rail Navigation

**Input**: Design documents from `/specs/001-home-footer-review-rail/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical user journeys (routing integrity, chapter navigation, reduced-motion behavior, and accessibility-critical flows). This feature uses deterministic manual QA checklists plus typecheck regression.

**Organization**: Grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependency on incomplete tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Every task includes an exact file path

## Path Conventions

- App code: `src/`
- Manual QA artifacts: `src/tests/manual/`
- Feature docs: `specs/001-home-footer-review-rail/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare shared QA and styling scaffolds used by all stories.

- [X] T001 Create manual QA checklist scaffold in `src/tests/manual/README.md`
- [X] T002 Create story-specific QA files in `src/tests/manual/us1-home-zone.md`, `src/tests/manual/us1-internal-routes.md`, `src/tests/manual/us2-desktop-rail.md`, `src/tests/manual/us2-mobile-strip.md`, `src/tests/manual/us2-accessibility.md`, `src/tests/manual/us3-extensibility.md`, and `src/tests/manual/us3-edge-cases.md`
- [X] T003 [P] Add base class stubs for footer-zone and chapter-bar variants in `src/styles/global.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared behavior contracts before story implementation.

- [X] T004 Add route-aware footer policy wiring scaffold in `src/app/shell/SiteLayout.tsx`
- [X] T005 [P] Normalize chapter breakpoint mode helpers for dual rail layouts in `src/routes/chapters/ChapterShell.tsx`
- [X] T006 [P] Add shared accessibility utility styles for bar focus/active states in `src/styles/global.css`
- [X] T007 Align navigation behavior contract with implementation checkpoints in `specs/001-home-footer-review-rail/contracts/navigation-behavior-contract.md`

**Checkpoint**: Shared infrastructure and behavior contracts are ready.

---

## Phase 3: User Story 1 - Home-Only Footer Visibility (Priority: P1)

**Goal**: Footer appears only in Home and only while footer zone is in view; it stays hidden on all internal routes.

**Independent Test**: Open Home and internal routes, then verify zone-based show/hide on Home and complete suppression elsewhere.

### Tests for User Story 1

- [X] T008 [P] [US1] Document Home footer-zone visibility test cases in `src/tests/manual/us1-home-zone.md`
- [X] T009 [P] [US1] Document internal-route footer suppression matrix in `src/tests/manual/us1-internal-routes.md`

### Implementation for User Story 1

- [X] T010 [US1] Implement Home-only footer render gate in `src/app/shell/SiteLayout.tsx`
- [X] T011 [US1] Implement footer-zone observer/sentinel behavior in `src/routes/home/HomePage.tsx`
- [X] T012 [US1] Update footer structure and styles for in-view-only rendering in `src/components/shell/SiteFooter.tsx` and `src/styles/global.css`

**Checkpoint**: US1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Structural Review Rail Navigation (Priority: P1)

**Goal**: Replace index-style chapter rail with structural black bars (desktop/tablet right rail, small-screen horizontal strip) while preserving existing transitions.

**Independent Test**: On chapter pages, each child page maps to one bar and selecting any bar navigates to its route without transition regressions.

### Tests for User Story 2

- [X] T013 [P] [US2] Document desktop/tablet bar navigation and active-state QA in `src/tests/manual/us2-desktop-rail.md`
- [X] T014 [P] [US2] Document mobile horizontal bar strip QA and route parity checks in `src/tests/manual/us2-mobile-strip.md`
- [X] T015 [P] [US2] Document keyboard/touch accessibility checks for bar controls in `src/tests/manual/us2-accessibility.md`

### Implementation for User Story 2

- [X] T016 [US2] Replace index-list rail markup with desktop/tablet full-height black bar controls in `src/routes/chapters/ChapterShell.tsx`
- [X] T017 [US2] Implement small-screen horizontal black bar strip mode in `src/routes/chapters/ChapterShell.tsx`
- [X] T018 [US2] Implement bar visual system (solid black, active state, responsive spacing) in `src/styles/global.css`
- [X] T019 [US2] Preserve wheel/scroll/arrow/prev-next chapter transition behavior after rail refactor in `src/routes/chapters/ChapterShell.tsx`

**Checkpoint**: US2 works independently and remains behaviorally compatible with existing chapter transitions.

---

## Phase 5: User Story 3 - Extensible Chapter Composition (Priority: P2)

**Goal**: Ensure adding future chapter child pages automatically yields matching bar controls and navigation behavior.

**Independent Test**: Add a new child page entry and verify automatic bar rendering, active-state mapping, and navigation correctness.

### Tests for User Story 3

- [X] T020 [P] [US3] Document new-child-page extensibility regression test in `src/tests/manual/us3-extensibility.md`
- [X] T021 [P] [US3] Document deep-link and rapid multi-click edge-case tests in `src/tests/manual/us3-edge-cases.md`

### Implementation for User Story 3

- [X] T022 [US3] Refactor chapter bar generation to map directly from `chapter.pages` without hardcoded assumptions in `src/routes/chapters/ChapterShell.tsx`
- [X] T023 [US3] Ensure route-to-active-bar synchronization on direct URL entry and breakpoint changes in `src/routes/chapters/ChapterRoute.tsx` and `src/routes/chapters/ChapterShell.tsx`
- [X] T024 [US3] Add maintainer guidance for extending chapter pages in `specs/001-home-footer-review-rail/quickstart.md`

**Checkpoint**: US3 is independently testable and supports future chapter growth.

---

## Final Phase: Polish and Cross-Cutting

- [X] T025 [P] Run type regression check (`npm run typecheck`) and log result in `specs/001-home-footer-review-rail/quickstart.md`
- [ ] T026 [P] Execute full manual QA matrix and record outcomes in `src/tests/manual/us1-home-zone.md`, `src/tests/manual/us1-internal-routes.md`, `src/tests/manual/us2-desktop-rail.md`, `src/tests/manual/us2-mobile-strip.md`, `src/tests/manual/us2-accessibility.md`, `src/tests/manual/us3-extensibility.md`, and `src/tests/manual/us3-edge-cases.md`
- [X] T027 [P] Perform accessibility pass for keyboard order, `aria-current`, and touch target sizing in `src/routes/chapters/ChapterShell.tsx` and `src/styles/global.css`
- [X] T028 Verify footer suppression across internal routes and chapter paths in `src/app/router.tsx` and `src/app/shell/SiteLayout.tsx`
- [X] T029 Update feature behavior summary in `README.md`

---

## Dependencies and Execution Order

- Phase dependency chain: Setup -> Foundational -> User Stories -> Final Phase
- Story order for safest delivery: `US1` -> `US2` -> `US3`
- `US3` depends on chapter bar model introduced in `US2`
- `US1` is releasable independently once Phase 2 is complete

## Parallel Execution Examples

### User Story 1

- Run `T008` and `T009` in parallel (different QA files for Home zone and internal routes).

### User Story 2

- Run `T013`, `T014`, and `T015` in parallel (desktop, mobile, and accessibility QA files are separate).

### User Story 3

- Run `T020` and `T021` in parallel before implementation tasks.

### Cross-Cutting

- Run `T025`, `T026`, and `T027` in parallel near stabilization.

## Implementation Strategy

### MVP First (US1)

1. Complete Phases 1-2.
2. Deliver US1 and validate Home-only footer behavior.
3. Ship/verify before rail redesign if incremental rollout is desired.

### Incremental Delivery

1. Add US2 structural chapter bars while preserving existing transitions.
2. Add US3 extensibility hardening for future page growth.
3. Finish polish with typecheck, accessibility, and full QA matrix.

