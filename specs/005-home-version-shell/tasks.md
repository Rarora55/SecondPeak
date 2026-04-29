# Tasks: Home Version Shell

**Input**: Design documents from `/specs/005-home-version-shell/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical user journeys (routing integrity, reduced-motion behavior, accessibility-critical flows, and route-level resilience).

**Organization**: Grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create feature module scaffolding and baseline manual QA artifact.

- [x] T001 Create Home feature module directories and placeholder files in `src/routes/home/` and `src/routes/home/components/`
- [x] T002 Create manual QA checklist skeleton in `src/tests/manual/005-home-version-shell.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared types, registry invariants, and fallback primitives used by all stories.

- [x] T003 Define `HomeTheme`, `HomeTile`, `HomeMainFeature`, and `HomeVersion` contracts in `src/routes/home/home-types.ts`
- [x] T004 Implement registry validation helpers (required fields, slug uniqueness, tile counts) in `src/routes/home/home-version-registry.ts`
- [x] T005 Implement active-version invariant enforcement (exactly one `isActive`) in `src/routes/home/home-version-registry.ts`
- [x] T006 Implement slug lookup and invalid-version exclusion helpers in `src/routes/home/home-version-registry.ts`
- [x] T007 [P] Create shared in-shell fallback component/state contract in `src/routes/home/components/HomeShell.tsx`
- [x] T008 [P] Define base home layout tokens and shared structural styles in `src/styles/global.css`

**Checkpoint**: Shared data contracts and render invariants are enforced.

---

## Phase 3: User Story 1 - View Current Home Issue (Priority: P1)

**Goal**: Render `/home` with the active HomeVersion in the fixed shared structure.

**Independent Test**: Open `/home` and verify one active issue renders with 3-1-3 layout, header/footer strip, correct theme, and keyboard-reachable links.

### Tests for User Story 1

- [x] T009 [P] [US1] Add manual route integrity test steps for `/home` in `src/tests/manual/005-home-version-shell.md`
- [x] T010 [P] [US1] Add manual keyboard/focus traversal checks for header, tiles, and footer links in `src/tests/manual/005-home-version-shell.md`
- [x] T011 [P] [US1] Add manual reduced-motion verification steps for base home transitions in `src/tests/manual/005-home-version-shell.md`

### Implementation for User Story 1

- [x] T012 [P] [US1] Implement `HomeGrid` fixed 3-1-3 slot structure in `src/routes/home/components/HomeGrid.tsx`
- [x] T013 [P] [US1] Implement reusable side tile renderer with semantic link and alt handling in `src/routes/home/components/HomeTile.tsx`
- [x] T014 [P] [US1] Implement central main feature block renderer in `src/routes/home/components/HomeMainFeature.tsx`
- [x] T015 [P] [US1] Implement footer metadata strip renderer in `src/routes/home/components/HomeFooterStrip.tsx`
- [x] T016 [US1] Compose fixed shell with header/grid/footer and fallback support in `src/routes/home/components/HomeShell.tsx`
- [x] T017 [US1] Implement active-version page composition for `/home` in `src/routes/home/HomeVersionPage.tsx`
- [x] T018 [US1] Wire `/home` route to `HomeVersionPage` in `src/app/router.tsx`
- [x] T019 [US1] Implement `/home` page metadata (title, description, canonical, Open Graph) in `src/routes/home/HomeVersionPage.tsx`

**Checkpoint**: `/home` renders active issue with shared structure and baseline accessibility.

---

## Phase 4: User Story 2 - View Specific Historical Issue (Priority: P2)

**Goal**: Render `/home/:versionSlug` for valid historical versions using the same fixed structure.

**Independent Test**: Open `/home/far-lone-sails` and `/home/signalis`; confirm structure is unchanged and only version content/theme differs.

### Tests for User Story 2

- [x] T020 [P] [US2] Add manual comparison checks for structural invariance between `/home/far-lone-sails` and `/home/signalis` in `src/tests/manual/005-home-version-shell.md`
- [x] T021 [P] [US2] Add manual direct-URL historical route checks in `src/tests/manual/005-home-version-shell.md`
- [x] T022 [P] [US2] Add manual checks for `/home/:versionSlug` metadata (title, description, canonical, Open Graph) in `src/tests/manual/005-home-version-shell.md`

### Implementation for User Story 2

- [x] T023 [P] [US2] Add Far: Lone Sails and Signalis entries to typed registry in `src/routes/home/home-version-registry.ts`
- [x] T024 [US2] Implement slug-resolved rendering path in `src/routes/home/HomeVersionPage.tsx`
- [x] T025 [US2] Wire `/home/:versionSlug` route to `HomeVersionPage` in `src/app/router.tsx`

**Checkpoint**: Historical versions render independently via slug with identical structural layout rules.

---

## Phase 5: User Story 3 - Add a New Monthly Issue (Priority: P3)

**Goal**: Enable adding a new issue via one typed registry object without structural component changes.

**Independent Test**: Add a new version object and verify `/home/:newSlug` works; if set active, `/home` updates accordingly.

### Tests for User Story 3

- [x] T026 [P] [US3] Add manual onboarding test steps for adding a new HomeVersion entry in `src/tests/manual/005-home-version-shell.md`
- [x] T027 [P] [US3] Add manual invariant checks for exactly one active version and complete required fields in `src/tests/manual/005-home-version-shell.md`

### Implementation for User Story 3

- [x] T028 [P] [US3] Add registry utility to detect invalid version payloads and surface debug-safe diagnostics in `src/routes/home/home-version-registry.ts`
- [x] T029 [US3] Add in-code documentation/comments for single-object monthly version additions in `src/routes/home/home-version-registry.ts`
- [x] T030 [US3] Ensure `HomeVersionPage` fallback branch handles invalid versions from registry validation in `src/routes/home/HomeVersionPage.tsx`

**Checkpoint**: New issue publishing path is data-only and independent of layout changes.

---

## Final Phase: Polish and Cross-Cutting

- [x] T031 [P] Run and resolve TypeScript validation issues for touched files using `npm run typecheck`
- [ ] T032 [P] Complete full manual QA run and record results in `src/tests/manual/005-home-version-shell.md`
- [x] T033 [P] Add or verify sitemap entries for `/home` and valid `/home/:versionSlug` routes in `src/app/sitemap.ts`
- [x] T034 [P] Add or verify robots indexing directives for `/home` routes in `src/app/robots.ts`
- [x] T035 [P] Verify no editorial HomeVersion content is introduced in Supabase integration paths by reviewing `src/integrations/supabase/` references
- [x] T036 Update feature docs references if needed in `specs/005-home-version-shell/quickstart.md`

---

## Dependencies and Execution Order

- Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 -> Phase 5 -> Final Phase
- T012-T015 can run in parallel after foundational tasks complete.
- T023 can run in parallel with T020-T022.
- T028 can run in parallel with T026-T027.
- User Story 2 depends on foundational tasks and benefits from US1 shell completion.
- User Story 3 depends on foundational tasks and validates extensibility of US1/US2 architecture.

## Parallel Execution Examples

### User Story 1

- Run T012, T013, T014, and T015 in parallel, then integrate via T016 and T017.

### User Story 2

- Run T020, T021, and T022 in parallel with T023 before integrating route work in T024 and T025.

### User Story 3

- Run T026 and T027 in parallel with T028, then finalize with T029 and T030.

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phases 1-2.
2. Deliver Phase 3 to get `/home` stable with active version rendering.
3. Validate keyboard/focus/reduced-motion behavior for baseline release.

### Incremental Delivery

1. Add historical slug routes in Phase 4.
2. Add monthly issue authoring ergonomics and invalid-version hardening in Phase 5.
3. Finish cross-cutting validation in Final Phase.

