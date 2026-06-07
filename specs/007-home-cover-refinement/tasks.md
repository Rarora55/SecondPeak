# Tasks: Home Cover Refinement

**Input**: Design documents from `/specs/007-home-cover-refinement/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical user journeys in this feature: Home route integrity, reduced-motion behavior, accessibility-critical flows, route-level resilience, and public-route discoverability non-regression. Execution is centered on `npm run typecheck` plus manual verification in `src/tests/manual/007-home-cover-refinement.md`.

**Organization**: Grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the refinement-specific QA surface and documentation pointers before implementation.

- [X] T001 Create the refinement manual checklist scaffold in `src/tests/manual/007-home-cover-refinement.md`
- [X] T002 Update shared Home refinement references and implementation notes in `specs/007-home-cover-refinement/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared Home-shell, layout, accessibility, and regression foundations required by all user stories.

- [X] T003 Audit and tighten the Home cover shell contract, metadata ownership, and fallback expectations in `src/routes/home/HomeVersionPage.tsx`
- [X] T004 [P] Preserve and clarify the typed Home cover contract for refinement states in `src/routes/home/home-types.ts`
- [X] T005 [P] Confirm the SILENCE issue payload remains the authoritative editorial source and keep refinement-only data constraints explicit in `src/routes/home/home-version-registry.ts`
- [X] T006 [P] Restructure the Home cover component state and semantic hooks for refined layout/control behavior in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T007 [P] Establish shared CSS guardrails for responsive header width, cover sizing, motion fallback, and overflow prevention in `src/styles/global.css`
- [X] T008 Add Home-route and linked-destination non-regression checks to the refinement checklist in `src/tests/manual/007-home-cover-refinement.md`

**Checkpoint**: Foundations complete; user story work can proceed independently.

---

## Phase 3: User Story 1 - Land on a balanced editorial cover (Priority: P1)

**Goal**: Deliver a polished closed Home cover with a full-width responsive header, centered composition, and a controlled image-title gap while preserving the approved editorial tone.

**Independent Test**: Open `/home` on desktop and mobile widths and verify that the header spans the viewport with responsive inner spacing, the brand remains left-aligned, the issue metadata remains right-aligned, and the image-title-arrow group appears visually centered with a small visible title gap.

### Tests for User Story 1

- [X] T009 [P] [US1] Add closed-state header-width and alignment verification steps to `src/tests/manual/007-home-cover-refinement.md`
- [X] T010 [P] [US1] Add centered-composition and image-title gap verification steps to `src/tests/manual/007-home-cover-refinement.md`
- [X] T011 [P] [US1] Add `/home` and `/home/:versionSlug` closed-state regression checks to `src/tests/manual/007-home-cover-refinement.md`

### Implementation for User Story 1

- [X] T012 [P] [US1] Refine the Home header markup and brand/meta structure in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T013 [US1] Implement full-width header spacing, divider alignment, centered closed-state layout, and title-gap styling in `src/styles/global.css`
- [X] T014 [US1] Adjust the Home shell wrapper so the closed-state cover remains vertically balanced within the route surface in `src/routes/home/components/HomeShell.tsx`

**Checkpoint**: US1 fully functional and independently testable.

---

## Phase 4: User Story 2 - Expand the cover without losing the composition (Priority: P1)

**Goal**: Let visitors expand and collapse the three existing topics while the cover block scales down smoothly enough to keep the open state readable as one composition.

**Independent Test**: From `/home`, expand the topic section on a common laptop-sized viewport and verify that the image, title, arrow, and all three topics remain visible together without immediate scrolling; collapse again and confirm the larger closed presentation returns.

### Tests for User Story 2

- [X] T015 [P] [US2] Add expanded-state viewport-fit and composition-balance checks to `src/tests/manual/007-home-cover-refinement.md`
- [X] T016 [P] [US2] Add expand/collapse synchronization checks for button state, chevron direction, and rapid retoggle behavior to `src/tests/manual/007-home-cover-refinement.md`
- [X] T017 [P] [US2] Add linked-topic route non-regression checks for `/reviews/far-lone-sails/:pageSlug`, `/features/:articleSlug`, and `/interviews/:articleSlug` to `src/tests/manual/007-home-cover-refinement.md`

### Implementation for User Story 2

- [X] T018 [P] [US2] Implement expanded/collapsed cover-sizing state, chevron-direction logic, and topic reveal lifecycle in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T019 [US2] Add expanded-state width, spacing, and vertical alignment rules for the cover block and topic container in `src/styles/global.css`
- [X] T020 [US2] Tune topic preview structure and width behavior for the refined expanded composition in `src/routes/home/components/HomeTopicLink.tsx`

**Checkpoint**: US2 works independently and with US1.

---

## Phase 5: User Story 3 - Experience polished interactions across devices (Priority: P2)

**Goal**: Preserve calm, responsive, accessible interactions across desktop, tablet, and mobile, including logo hover/focus behavior and a route-entry fade that does not replay on local toggles.

**Independent Test**: Verify `/home` on desktop, tablet, and mobile widths, confirm logo hover/focus affects only the logo, confirm topics reflow without overflow, and confirm the calm route-entry fade occurs on page entry but not when only toggling topics.

### Tests for User Story 3

- [X] T021 [P] [US3] Add responsive desktop/tablet/mobile layout checks to `src/tests/manual/007-home-cover-refinement.md`
- [X] T022 [P] [US3] Add logo hover/focus, keyboard, and reduced-motion verification steps to `src/tests/manual/007-home-cover-refinement.md`
- [X] T023 [P] [US3] Add route-entry fade and no-replay-on-toggle checks to `src/tests/manual/007-home-cover-refinement.md`

### Implementation for User Story 3

- [X] T024 [P] [US3] Add scoped logo hover/focus semantics and route-entry animation boundaries in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T025 [US3] Implement responsive topic reflow, mobile stacking, logo interaction styling, and reduced-motion-safe motion tuning in `src/styles/global.css`
- [X] T026 [US3] Verify Home metadata ownership and destination discoverability remain unchanged by the refinement in `src/routes/home/HomeVersionPage.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`

**Checkpoint**: All stories are independently functional.

---

## Final Phase: Polish and Cross-Cutting

- [X] T027 [P] Run `npm run typecheck` and resolve any refinement-related typing issues across `src/routes/home/` and `src/app/`
- [X] T028 [P] Reconcile legacy Home cover manual checks in `src/tests/manual/006-home-cover-rebuild.md` with any shared expectations updated by the refinement
- [ ] T029 [P] Execute the full refinement manual checklist in `src/tests/manual/007-home-cover-refinement.md`
- [X] T030 Review the final Home refinement against editorial tone, accessibility, and motion constraints in `specs/007-home-cover-refinement/plan.md`

---

## Dependencies and Execution Order

- Setup -> Foundational -> User Stories -> Final Phase
- T003-T008 must complete before user story implementation begins.
- US1 is the MVP and should ship the corrected closed-state cover first.
- US2 depends on the foundational component/CSS guardrails and the US1 closed-state composition.
- US3 depends on the US1 and US2 layout structure being in place so responsive, motion, and interaction polish can be validated on the final composition.

## Parallel Execution Examples

### User Story 1

- Run T009, T010, and T011 in parallel because they add different manual verification slices to `src/tests/manual/007-home-cover-refinement.md`.
- Run T012 and T013 in parallel once foundational tasks are complete because the header/component markup and the corresponding CSS rules can be refined concurrently before T014 integrates the shell balance.

### User Story 2

- Run T015, T016, and T017 in parallel as separate manual verification additions in `src/tests/manual/007-home-cover-refinement.md`.
- Run T018 and T020 in parallel because expanded-state control logic in `HomeCoverHero.tsx` and topic-preview structure tuning in `HomeTopicLink.tsx` can proceed independently before T019 finalizes the shared CSS composition rules.

### User Story 3

- Run T021, T022, and T023 in parallel as separate manual verification additions in `src/tests/manual/007-home-cover-refinement.md`.
- Run T024 and T025 in parallel because interaction semantics in `HomeCoverHero.tsx` and responsive/logo/motion styling in `global.css` are closely related but implemented in different files.

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) to deliver the corrected closed Home cover with a full-width header and balanced composition.
3. Validate `/home` closed-state behavior before moving to expanded-state refinements.

### Incremental Delivery

1. Add Phase 4 (US2) to refine the expanded-state composition and preserve direct topic-route behavior.
2. Add Phase 5 (US3) to harden responsive behavior, logo interaction, reduced motion, and route-entry fade boundaries.
3. Finish with the polish phase, typecheck, and the full refinement manual checklist run.

## Notes

- Keep the Home route as a feature-defined editorial canvas and avoid widening the scope into a new content architecture change.
- Preserve the existing typed editorial source boundaries in `src/routes/home/home-version-registry.ts` and the linked section/article routes.
- Treat `src/app/sitemap.ts` and `src/app/robots.ts` as non-regression surfaces unless refinement work directly changes discoverability behavior.
