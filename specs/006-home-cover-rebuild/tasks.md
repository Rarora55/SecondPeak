# Tasks: Home Cover Rebuild

**Input**: Design documents from `/specs/006-home-cover-rebuild/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical user journeys in this feature: routing integrity, reduced-motion behavior, accessibility-critical flows, route-level resilience, and public-route discoverability. Execution is centered on `npm run typecheck` plus the manual checklist in `src/tests/manual/006-home-cover-rebuild.md`.

**Organization**: Grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the active feature docs and destination-route scaffolds for implementation.

- [X] T001 Update the feature-specific manual checklist scaffold in `src/tests/manual/006-home-cover-rebuild.md`
- [X] T002 Create the feature and interview article registry scaffold in `src/routes/sections/section-article-registry.ts`
- [X] T003 [P] Create the standalone feature/interview article page scaffold in `src/routes/sections/SectionArticlePage.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared data, routing, metadata, fallback, and discoverability foundations required by all stories.

- [X] T004 Refactor the Home cover data contracts with explicit feature/interview topic routing in `src/routes/home/home-types.ts`
- [X] T005 [P] Rebuild the Home version registry around the SILENCE cover issue payload and explicit Topic 2/3 route targets in `src/routes/home/home-version-registry.ts`
- [X] T006 [P] Register Topic 2 feature destinations and Topic 3 interview destinations with metadata payloads in `src/routes/sections/section-article-registry.ts`
- [X] T007 Implement shared standalone feature/interview destination rendering, fallback, and metadata behavior in `src/routes/sections/SectionArticlePage.tsx`
- [X] T008 Update public route wiring for Home, `/features/:articleSlug`, and `/interviews/:articleSlug` in `src/app/router.tsx`
- [X] T009 Preserve and adapt in-shell fallback plus route-level metadata resolution in `src/routes/home/HomeVersionPage.tsx`
- [X] T010 Establish reduced-motion-safe animation, focus-state, and legibility guardrails for the rebuilt Home route in `src/styles/global.css`
- [X] T011 Add sitemap/robots discoverability updates for the new public article routes in `src/app/sitemap.ts` and `src/app/robots.ts`

**Checkpoint**: Foundations complete; user story work can proceed independently.

---

## Phase 3: User Story 1 - Land on the editorial cover (Priority: P1)

**Goal**: Deliver the default closed Home cover experience with the issue header, central image, SILENCE title, and minimal expand indicator.

**Independent Test**: Open `/home` and verify that the initial state shows only the editorial header, cover image, SILENCE title, and minimal expand control with no revealed topics.

### Tests for User Story 1

- [X] T012 [P] [US1] Add closed-state verification steps for `/home` to `src/tests/manual/006-home-cover-rebuild.md`
- [X] T013 [P] [US1] Add direct URL and fallback verification steps for `/home` and `/home/:versionSlug` to `src/tests/manual/006-home-cover-rebuild.md`
- [X] T014 [P] [US1] Add keyboard-focus and collapsed-state accessibility checks for the cover entry state to `src/tests/manual/006-home-cover-rebuild.md`

### Implementation for User Story 1

- [X] T015 [P] [US1] Replace the old Home shell layout contract with the rebuilt cover shell in `src/routes/home/components/HomeShell.tsx`
- [X] T016 [P] [US1] Create the closed-cover hero composition in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T017 [US1] Update `src/routes/home/HomeVersionPage.tsx` to render the rebuilt cover shell for the active issue state
- [X] T018 [US1] Rebuild the editorial paper background, header line, centered image treatment, and SILENCE title styling in `src/styles/global.css`

**Checkpoint**: US1 fully functional and independently testable.

---

## Phase 4: User Story 2 - Expand to preview the issue topics (Priority: P1)

**Goal**: Let visitors expand the Home cover in place, reveal the three linked editorial topics, collapse them again, and reach Topic 1 via the FAR review route, Topic 2 via `features`, and Topic 3 via `interviews`.

**Independent Test**: From `/home`, expand the cover, verify the three centered topic links appear, collapse them again, and open the FAR review route, a `/features/:articleSlug` route, and an `/interviews/:articleSlug` route successfully from the revealed state.

### Tests for User Story 2

- [X] T019 [P] [US2] Add expand/collapse interaction checks to `src/tests/manual/006-home-cover-rebuild.md`
- [X] T020 [P] [US2] Add direct-entry and refresh checks for Topic 1, Topic 2 feature routes, and Topic 3 interview routes to `src/tests/manual/006-home-cover-rebuild.md`
- [X] T021 [P] [US2] Add `aria-expanded`, semantic-button, and topic-link keyboard checks to `src/tests/manual/006-home-cover-rebuild.md`

### Implementation for User Story 2

- [X] T022 [P] [US2] Create the reusable revealed topic link component in `src/routes/home/components/HomeTopicLink.tsx`
- [X] T023 [US2] Add local expanded/collapsed state, arrow-direction behavior, and three-topic reveal rendering in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T024 [US2] Add the missing Topic 2 `/features/:articleSlug` destinations and Topic 3 `/interviews/:articleSlug` destinations in `src/routes/sections/section-article-registry.ts`
- [X] T025 [US2] Render the standalone feature/interview destination pages from registry data in `src/routes/sections/SectionArticlePage.tsx`
- [X] T026 [US2] Extend `src/app/router.tsx` with any missing `/features/:articleSlug` and `/interviews/:articleSlug` destination routes

**Checkpoint**: US2 works independently and with US1.

---

## Phase 5: User Story 3 - Experience the cover gracefully across devices and motion settings (Priority: P2)

**Goal**: Ensure the rebuilt Home cover remains calm, readable, responsive, and reduced-motion-safe across desktop, tablet, and mobile viewports while preserving metadata/discoverability coverage for public routes.

**Independent Test**: Verify `/home` at desktop, tablet, and mobile widths, confirm topic columns reflow cleanly, confirm reduced-motion mode preserves clear state changes without pronounced animation, and verify feature/interview destination metadata remains correct.

### Tests for User Story 3

- [X] T027 [P] [US3] Add responsive layout checks for desktop, tablet, and mobile to `src/tests/manual/006-home-cover-rebuild.md`
- [X] T028 [P] [US3] Add reduced-motion verification steps for page-entry fade and topic reveal to `src/tests/manual/006-home-cover-rebuild.md`
- [X] T029 [P] [US3] Add feature/interview destination metadata, sitemap, and readability checks to `src/tests/manual/006-home-cover-rebuild.md`

### Implementation for User Story 3

- [X] T030 [P] [US3] Add subtle page-entry and reveal choreography with reduced-motion fallbacks in `src/routes/home/components/HomeCoverHero.tsx`
- [X] T031 [US3] Finalize responsive editorial layout, texture layers, and motion tuning in `src/styles/global.css`
- [X] T032 [US3] Add public metadata handling for standalone feature/interview destinations in `src/routes/sections/SectionArticlePage.tsx`

**Checkpoint**: All stories are independently functional.

---

## Final Phase: Polish and Cross-Cutting

- [X] T033 [P] Remove obsolete grid-only Home components or adapt them to the new cover composition in `src/routes/home/components/HomeGrid.tsx`, `src/routes/home/components/HomeMainFeature.tsx`, `src/routes/home/components/HomeTile.tsx`, and `src/routes/home/components/HomeFooterStrip.tsx`
- [X] T034 [P] Run `npm run typecheck` and resolve any resulting Home or route typing issues across `src/`
- [ ] T035 [P] Execute the full manual checklist in `src/tests/manual/006-home-cover-rebuild.md`
- [X] T036 Update feature documentation references if implementation changed expected behavior in `specs/006-home-cover-rebuild/quickstart.md`

---

## Dependencies and Execution Order

- Setup -> Foundational -> User Stories -> Final Phase
- T004-T011 must complete before story implementation begins.
- US1 is the MVP and should ship the default closed cover route first.
- US2 depends on the US1 cover composition and foundational routing/data tasks.
- US3 depends on the US1 and US2 UI structure being in place so responsive, reduced-motion, and discoverability tuning can be validated on the real composition.

## Parallel Execution Examples

### User Story 1

- Run T012, T013, and T014 in parallel because they all update different parts of `src/tests/manual/006-home-cover-rebuild.md`.
- Run T015 and T016 in parallel once foundational tasks are complete because `HomeShell.tsx` and `HomeCoverHero.tsx` can be built independently before integration in T017.

### User Story 2

- Run T019, T020, and T021 in parallel as separate manual verification additions in `src/tests/manual/006-home-cover-rebuild.md`.
- Run T022 and T024 in parallel because the topic link component and the explicit feature/interview destination registry can be built independently before T023, T025, and T026 wire them together.

### User Story 3

- Run T027, T028, and T029 in parallel as separate manual verification additions in `src/tests/manual/006-home-cover-rebuild.md`.
- Run T030 and T032 in parallel because Home motion tuning and standalone feature/interview metadata live in different files.

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) to deliver the closed SILENCE cover on `/home`.
3. Validate `/home` closed-state behavior before moving to reveal interactions.

### Incremental Delivery

1. Add Phase 4 (US2) to unlock expand/collapse behavior and working FAR/features/interviews destinations.
2. Add Phase 5 (US3) to harden responsiveness, reduced-motion behavior, and final metadata/discoverability details.
3. Finish with the polish phase, typecheck, and manual regression run.

## Notes

- Keep the feature-defined Home canvas structure documented consistently across spec, plan, and tasks.
- Do not reintroduce editorial ownership into Supabase.
- Preserve direct URL entry for all linked editorial destinations.
