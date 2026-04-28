# Research: Editorial Black-and-White Visual System

## Decision 1: Global Color System Baseline

- Decision: Use white as the default page and block background, black as default text color, and black for all default borders.
- Rationale: This enforces the strict editorial black-and-white direction and removes temporary placeholder semantics.
- Alternatives considered:
  - Keep section-level accent colors for structure hints: rejected because it violates the strict black-and-white direction.
  - Use off-white/charcoal defaults: rejected because exact black/white contrast is part of the requirement.

## Decision 2: Canonical Border and Focus Definition

- Decision: Define "thin border" as exactly 1px across supported breakpoints and require a consistent 2px focus outline with offset.
- Rationale: Fixed numeric values make acceptance criteria objective and prevent per-component drift.
- Alternatives considered:
  - Variable hairline borders by breakpoint: rejected to avoid inconsistent rendering behavior.
  - Inversion-only focus indicator: rejected because focus can be ambiguous when elements are already selected or active.

## Decision 3: Interactive Inversion Contract

- Decision: Apply black background plus white text inversion for eligible hover, focus, active, highlighted, and selected states.
- Rationale: A single interaction language improves predictability and state discoverability.
- Alternatives considered:
  - Different visual patterns per state (for example dashed borders for focus): rejected due to unnecessary visual complexity.
  - Apply inversion only to selected state: rejected because hover/focus discoverability becomes inconsistent.

## Decision 4: Reviews Rail Policy

- Decision: Use a two-sided rail model with explicit `current_only` policy: only the currently selected bar moves to and remains on the left; all unselected bars remain on the right.
- Rationale: This resolves behavior ambiguity while preserving orientation and keeping the selected bar as the same full vertical component.
- Alternatives considered:
  - `current_or_visited` policy: rejected because it conflicts with the clarified requirement and weakens deterministic QA.
  - Relocate the full rail to the left: rejected because it removes the right-side unselected rail model.

## Decision 5: Reduced-Motion Behavior

- Decision: Respect `prefers-reduced-motion` in affected flows by removing non-essential motion while preserving equivalent state clarity and navigation comprehension.
- Rationale: Accessibility requirements in the constitution and spec require motion-safe behavior without functional loss.
- Alternatives considered:
  - Disable all transitions globally: rejected because it can degrade affordance clarity where static cues are not adjusted.
  - Keep existing motion unchanged: rejected because it violates reduced-motion requirements.

## Decision 6: SEO and Discoverability Preservation

- Decision: Treat metadata behavior (title, description, canonical, Open Graph), sitemap, and robots as non-regression constraints for all affected routes.
- Rationale: The feature is visual/behavioral and must not alter discoverability outputs or route indexability.
- Alternatives considered:
  - Rework SEO structure in this feature: rejected as out of scope and unnecessary risk.
  - Skip SEO validation due to no backend changes: rejected because front-end route/shell changes can still regress metadata behavior.

## Decision 7: Resilience and Fallback Behavior

- Decision: Preserve readable loading, empty, and error states on affected routes, and fail gracefully if review rail data is unavailable/invalid.
- Rationale: Visual-system updates must not degrade route resilience or block navigation recovery paths.
- Alternatives considered:
  - Assume existing resilience is sufficient and untested: rejected due to regression risk in layout/state rendering.
  - Hide rail on invalid data without fallback messaging: rejected because it harms orientation and discoverability.

## Decision 8: Verification Strategy

- Decision: Validate with `npm run typecheck` and a deterministic manual QA matrix covering baseline styles, interaction inversion, focus visibility, Reviews rail behavior, reduced-motion, SEO, and resilience states.
- Rationale: This feature is UI/interaction heavy and requires route-level behavior checks across breakpoints and input modes.
- Alternatives considered:
  - Add new automated E2E suite in this feature: deferred to avoid expanding scope beyond requested planning refinement.

## Implementation Notes (2026-04-27)

- No architectural changes are required for routing, CMS ownership, or page hierarchy.
- Styling updates should remain centralized in shared styles with targeted route-shell adjustments.
- Reviews rail behavior must preserve component identity while applying `current_only` left/right partition logic.
