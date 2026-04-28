# Research: Home Navigation and Review Spacing Fixes

## Decision 1: Menu Close Behavior

- Decision: Keep menu close logic deterministic by closing the overlay immediately when any in-menu navigation action is triggered, and preserve toggle parity between icon state and overlay state.
- Rationale: This directly addresses the "X does not respond" risk and prevents transient mismatch during route transitions.
- Alternatives considered:
  - Close only after route transition completion: rejected due to temporary stale open state risk.
  - Keep menu open across route changes: rejected because it increases stuck/overlay mismatch likelihood.

## Decision 2: Brand Title Home Navigation

- Decision: Treat the "SecondPeak" header title as a canonical Home link from all routes.
- Rationale: Predictable site-shell behavior and standard navigation expectation; already aligned with existing route map.
- Alternatives considered:
  - Non-clickable brand title: rejected because it removes a common recovery/navigation affordance.
  - Route-conditional behavior for brand title: rejected because it adds ambiguity without user value.

## Decision 3: Review Rail and Content Seam Rule

- Decision: Enforce zero interstitial spacing between review rail and adjacent content surfaces across all supported breakpoints.
- Rationale: The clarified spec requires full seam elimination, not cosmetic color masking.
- Alternatives considered:
  - Keep gap but color-match it: rejected because it leaves layout coupling and can regress at breakpoints.
  - Allow either gap removal or color fill: rejected because acceptance criteria would become ambiguous.

## Decision 4: Home Footer Trigger Threshold

- Decision: Activate Home footer visibility only during the final 10% of Home scroll progression.
- Rationale: Matches user clarification and provides precise, testable trigger behavior.
- Alternatives considered:
  - Last 15% or 20% activation: rejected because user selected stricter 10% threshold.
  - Intersection-only sentinel with no normalized progression rule: rejected because it is harder to validate consistently.

## Decision 5: Verification Strategy

- Decision: Validate via `npm run typecheck` plus manual QA scenarios for menu toggle, brand navigation, review seam continuity, and Home footer trigger threshold.
- Rationale: Repository currently has typecheck script and established manual QA workflow; this keeps scope focused on requested UI fixes.
- Alternatives considered:
  - Add automated browser test harness in this feature: deferred due to setup overhead outside this scope.

## Implementation Notes (2026-04-27)

- Burger menu interaction is implemented with explicit controlled state toggling and route-change-safe close handling.
- Home footer activation is implemented from normalized scroll progression with a fixed start threshold at 90%.
- Review seam behavior is implemented by removing partial-width rail track styling and preserving flush continuity in responsive layouts.
- Reduced-motion and contact-validation regressions are tracked through dedicated manual QA checklists for this feature.
