# Research: Home Footer Scope and Review Rail Navigation

## Decision 1: Home Footer Visibility Trigger

- Decision: Render footer only on Home and only while the Home footer zone is in view.
- Rationale: Matches clarified requirement exactly, avoids footer persistence ambiguity, and prevents footer bleed into internal routes.
- Alternatives considered:
  - Persist footer after first reveal until route change: rejected because it weakens "scroll-zone-only" behavior.
  - Keep global footer and hide with CSS on internal routes: rejected due to layout coupling and higher regression risk.

## Decision 2: Responsive Chapter Navigation Pattern

- Decision: Use full-height right-side black bars on desktop/tablet and a horizontal black-bar strip on small screens.
- Rationale: Preserves structural one-bar-per-child-page navigation while keeping mobile readability and tap ergonomics.
- Alternatives considered:
  - Force full-height right rail on all breakpoints: rejected as poor fit for narrow viewports.
  - Remove bar controls on mobile and keep previous/next only: rejected because per-page direct navigation is lost.

## Decision 3: Preserve Existing Lateral Chapter Transitions

- Decision: Keep current route-driven lateral chapter transitions (wheel/scroll/arrow/prev-next) unchanged; bar controls only change selection UI.
- Rationale: Reduces behavioral risk and satisfies acceptance criteria requiring no lateral transition regression.
- Alternatives considered:
  - Replace transitions with new animation model: rejected as out of scope and higher risk.

## Decision 4: Verification Strategy for This Feature

- Decision: Use `npm run typecheck` plus explicit manual QA scenarios for desktop/tablet and mobile behavior parity.
- Rationale: Repository currently has no configured automated browser test harness; this keeps validation concrete without introducing unrelated tooling scope.
- Alternatives considered:
  - Add Playwright in this feature: deferred to follow-up because setup overhead is outside immediate scope.
