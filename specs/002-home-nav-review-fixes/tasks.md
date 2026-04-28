# Tasks: Home Navigation and Review Spacing Fixes

**Input**: Design documents from `/specs/002-home-nav-review-fixes/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical journeys in this feature scope (routing integrity, chapter navigation behavior, reduced-motion handling, contact form validation regression, and accessibility-critical flows). This task list uses deterministic manual QA checklists plus `npm run typecheck`.

**Organization**: Grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependency on incomplete tasks)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Every task includes an exact file path

## Path Conventions

- App code: `src/`
- Manual QA artifacts: `src/tests/manual/`
- Feature docs: `specs/002-home-nav-review-fixes/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature-specific QA and execution scaffolding.

- [X] T001 Add feature-002 checklist index and execution notes in `src/tests/manual/README.md`
- [X] T002 Create manual QA template for menu toggle behavior in `src/tests/manual/002-us1-menu-toggle.md`
- [X] T003 Create manual QA template for brand-title Home navigation in `src/tests/manual/002-us2-brand-home.md`
- [X] T004 Create manual QA templates for review seam and footer threshold checks in `src/tests/manual/002-us3-review-seam.md` and `src/tests/manual/002-us3-home-footer-threshold.md`
- [X] T005 Create shared reduced-motion and contact-validation regression QA templates in `src/tests/manual/002-foundation-reduced-motion.md` and `src/tests/manual/002-foundation-contact-validation.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared guardrails before user-story implementation.

- [X] T006 Define shared constants for footer trigger threshold and menu interaction state handling in `src/routes/home/HomePage.tsx` and `src/components/navigation/BurgerMenu.tsx`
- [X] T007 [P] Normalize header and menu focus/interaction styles in `src/styles/global.css`
- [X] T008 [P] Add reduced-motion fallback QA criteria and pass/fail rubric in `src/tests/manual/002-foundation-reduced-motion.md`
- [X] T009 [P] Add contact form validation regression QA criteria (required-field, format, and submit-state checks) in `src/tests/manual/002-foundation-contact-validation.md`
- [X] T010 Confirm shell-level footer reset behavior for non-Home routes in `src/app/shell/SiteLayout.tsx`
- [X] T011 Add feature-002 validation log sections (including reduced-motion and contact-validation regression) in `specs/002-home-nav-review-fixes/quickstart.md`

**Checkpoint**: Shared prerequisites are in place; user story work can begin.

---

## Phase 3: User Story 1 - Close Navigation Overlay Reliably (Priority: P1)

**Goal**: Ensure burger/X always opens and closes correctly, including immediate close when a menu navigation action is triggered.

**Independent Test**: Open and close the menu repeatedly on desktop/mobile and verify no stuck state; verify menu closes immediately on in-menu navigation.

### Tests for User Story 1

- [X] T012 [US1] Document 30-consecutive-toggle reliability cases in `src/tests/manual/002-us1-menu-toggle.md`
- [X] T013 [US1] Document in-menu navigation immediate-close cases in `src/tests/manual/002-us1-menu-toggle.md`

### Implementation for User Story 1

- [X] T014 [US1] Refactor open/close transitions to keep icon and overlay synchronized in `src/components/navigation/BurgerMenu.tsx`
- [X] T015 [US1] Implement immediate close on menu-link activation and route-change-safe cleanup in `src/components/navigation/BurgerMenu.tsx`
- [X] T016 [US1] Adjust burger/overlay layering and pointer interaction to prevent non-responsive click states in `src/styles/global.css`
- [X] T017 [US1] Verify escape/outside-click and focus-return behavior remains consistent in `src/components/navigation/BurgerMenu.tsx`

**Checkpoint**: US1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Brand Title Returns to Home (Priority: P1)

**Goal**: Make "SecondPeak" a reliable Home navigation control from any route while preserving current-page stability.

**Independent Test**: From at least five non-home routes, activate the brand title and verify navigation to `/`; verify no broken state when activating on Home.

### Tests for User Story 2

- [X] T018 [US2] Document cross-route brand navigation checks in `src/tests/manual/002-us2-brand-home.md`
- [X] T019 [US2] Document keyboard and touch operability checks for the brand control in `src/tests/manual/002-us2-brand-home.md`

### Implementation for User Story 2

- [X] T020 [US2] Ensure header brand uses canonical Home link semantics and stable labeling in `src/app/shell/SiteLayout.tsx`
- [X] T021 [US2] Preserve no-regression behavior when brand is activated on Home in `src/app/shell/SiteLayout.tsx`
- [X] T022 [US2] Add explicit focus-visible and affordance styling for the site brand control in `src/styles/global.css`

**Checkpoint**: US2 works independently and remains stable with existing shell behavior.

---

## Phase 5: User Story 3 - Remove Review Rail Gap and Tighten Footer Trigger (Priority: P2)

**Goal**: Enforce zero gap between review rail and content, and activate Home footer only in the final 10% of Home scroll progression.

**Independent Test**: Verify zero seam across breakpoints on chapter pages and verify footer appears only at 90%-100% Home scroll progression.

### Tests for User Story 3

- [X] T023 [P] [US3] Document zero-gap seam checks across desktop/tablet/mobile in `src/tests/manual/002-us3-review-seam.md`
- [X] T024 [P] [US3] Document final-10%-trigger Home footer checks in `src/tests/manual/002-us3-home-footer-threshold.md`

### Implementation for User Story 3

- [X] T025 [US3] Remove interstitial rail/content spacing in chapter layout markup in `src/routes/chapters/ChapterShell.tsx`
- [X] T026 [US3] Enforce zero-gap rail/content styling across breakpoints in `src/styles/global.css`
- [X] T027 [US3] Replace footer-zone trigger logic with final-10%-of-scroll progression logic in `src/routes/home/HomePage.tsx`
- [X] T028 [US3] Align Home footer visibility transitions with the new threshold behavior in `src/app/shell/SiteLayout.tsx` and `src/routes/home/HomePage.tsx`
- [X] T029 [US3] Verify chapter navigation interactions remain intact after rail seam refactor in `src/routes/chapters/ChapterShell.tsx`

**Checkpoint**: US3 is independently testable and meets clarified layout/trigger requirements.

---

## Final Phase: Polish and Cross-Cutting

- [X] T030 [P] Run `npm run typecheck` and record results in `specs/002-home-nav-review-fixes/quickstart.md`
- [ ] T031 [P] Execute full manual QA matrix and record outcomes in `src/tests/manual/002-us1-menu-toggle.md`, `src/tests/manual/002-us2-brand-home.md`, `src/tests/manual/002-us3-review-seam.md`, `src/tests/manual/002-us3-home-footer-threshold.md`, `src/tests/manual/002-foundation-reduced-motion.md`, and `src/tests/manual/002-foundation-contact-validation.md`
- [X] T032 [P] Perform final accessibility and reduced-motion pass for header/menu/rail flows in `src/components/navigation/BurgerMenu.tsx`, `src/app/shell/SiteLayout.tsx`, `src/routes/chapters/ChapterShell.tsx`, and `src/styles/global.css`
- [ ] T033 Verify contact form validation regression remains intact on `/contact` route in `src/routes/contact/ContactPage.tsx` and log outcomes in `src/tests/manual/002-foundation-contact-validation.md`
- [X] T034 Update feature documentation with final implementation notes in `specs/002-home-nav-review-fixes/quickstart.md` and `specs/002-home-nav-review-fixes/research.md`

---

## Dependencies and Execution Order

- Phase flow: Setup -> Foundational -> User Stories -> Final Phase
- Story dependency graph:
  - `US1`: can start after Phase 2
  - `US2`: can start after Phase 2 and can run in parallel with `US1` (shared shell/header changes require merge coordination)
  - `US3`: should start after `US1` styling/menu changes stabilize because it also modifies `src/styles/global.css` and `src/app/shell/SiteLayout.tsx`
- Constitution-critical shared tasks (`T008`, `T009`, `T031`, `T033`) must be completed before feature sign-off.

## Parallel Execution Examples

### User Story 1

- Run `T014` and `T016` in parallel (component logic vs styling file).

### User Story 2

- Run `T020` and `T022` in parallel (shell logic and styling are in different files).

### User Story 3

- Run `T023` and `T024` in parallel (separate QA files for seam and threshold behavior).

### Cross-Cutting

- Run `T030`, `T031`, and `T032` in parallel during stabilization.

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Deliver `US1` menu reliability fix and validate against SC-001 and SC-005.
3. Ship or review before moving to `US2` and `US3`.

### Incremental Delivery

1. Deliver `US2` brand-title navigation behavior.
2. Deliver `US3` review seam and footer-threshold changes.
3. Complete constitution-required reduced-motion and contact-validation regression checks plus final documentation tasks.
