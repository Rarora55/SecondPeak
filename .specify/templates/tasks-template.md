---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for constitution-critical user journeys (routing integrity,
reduced-motion behavior, accessibility-critical flows, route-level resilience, and public-route
discoverability). Chapter navigation and contact-validation tasks are REQUIRED when those surfaces
are in scope; otherwise add explicit non-regression checks.

**Organization**: Group tasks by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies)
- **[Story]**: User story label (US1, US2, US3)
- Include exact file paths in each task

## Path Conventions

- Web app defaults: `src/` and `src/tests/`
- Adapt paths to the structure selected in `plan.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Base setup for feature execution

- [ ] T001 Create or update route/module structure in `src/routes/` and `src/domains/`
- [ ] T002 Configure feature flags/env validation for required integrations
- [ ] T003 [P] Wire baseline observability and error boundary hooks for the feature shell

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Mandatory foundations before user stories

- [ ] T004 Define editorial vs non-editorial data boundaries for the feature source in the integration layer
- [ ] T005 [P] Add schema-safe access adapters for the selected editorial content source
- [ ] T006 [P] Add validation and persistence path for non-editorial records (if needed)
- [ ] T007 Implement route-level loading/empty/error states and fallback UI
- [ ] T008 Establish accessibility baseline for navigation/dialog/focus behavior
- [ ] T009 Define reduced-motion fallback strategy for feature animations
- [ ] T010 Set performance guardrails (lazy loading, media strategy, bundle boundaries)

**Checkpoint**: Foundation ready, user story work can begin

---

## Phase 3: User Story 1 - [Title] (Priority: P1)

**Goal**: [Describe MVP value]

**Independent Test**: [Describe a test that validates this story in isolation]

### Tests for User Story 1

- [ ] T011 [P] [US1] Route integrity test for direct URL entry
- [ ] T012 [P] [US1] Accessibility test for primary user interaction path
- [ ] T013 [P] [US1] Reduced-motion behavior test for key transitions

### Implementation for User Story 1

- [ ] T014 [P] [US1] Implement core domain logic
- [ ] T015 [US1] Implement route/UI composition
- [ ] T016 [US1] Add resilience states and telemetry hooks

**Checkpoint**: US1 fully functional and independently testable

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Describe value]

**Independent Test**: [Describe isolated validation]

### Tests for User Story 2

- [ ] T017 [P] [US2] Integration test for in-scope navigation flow
- [ ] T018 [P] [US2] Accessibility and keyboard navigation test

### Implementation for User Story 2

- [ ] T019 [P] [US2] Implement feature-specific data and rendering layer
- [ ] T020 [US2] Implement navigation/progress UI states
- [ ] T021 [US2] Integrate with shared shell components

**Checkpoint**: US2 works independently and with US1

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Describe value]

**Independent Test**: [Describe isolated validation]

### Tests for User Story 3

- [ ] T022 [P] [US3] In-scope form/input validation and submission flow test (or explicit non-regression check)
- [ ] T023 [P] [US3] Error-handling and retry behavior test

### Implementation for User Story 3

- [ ] T024 [P] [US3] Implement final user-facing flows
- [ ] T025 [US3] Add SEO metadata and canonical handling
- [ ] T026 [US3] Harden error paths and empty states

**Checkpoint**: All stories independently functional

---

## Final Phase: Polish and Cross-Cutting

- [ ] T027 [P] Accessibility audit pass (semantics, focus, contrast, labels)
- [ ] T028 [P] Performance audit pass (CLS, payload, interaction smoothness)
- [ ] T029 [P] SEO audit pass (metadata, sitemap, robots)
- [ ] T030 Verify Vercel preview deployment and regression smoke checks
- [ ] T031 Update docs impacted by feature behavior or architecture

---

## Dependencies and Execution Order

- Setup -> Foundational -> User Stories -> Final Phase
- User stories can run in parallel only after foundational tasks are complete
- Each user story must remain independently testable and releasable

## Notes

- Keep feature work aligned with constitution gates in `plan.md`
- Reject tasks that split ownership for the same editorial surface or blur editorial and non-editorial boundaries
- Prefer reusable abstractions over page-level duplication
