# Research: Home Cover Refinement

## Decision 1: Refine the existing Home cover implementation instead of rebuilding Home again

- Decision: Keep `HomeVersionPage`, `HomeShell`, `HomeCoverHero`, the current Home registry, and the current linked editorial destinations as the base implementation, and scope this feature to targeted layout and interaction fixes.
- Rationale: The user explicitly said the current visual direction is correct and asked for corrections to spacing, sizing, alignment, and interaction polish rather than a new editorial concept.
- Alternatives considered:
  - Start a second full Home rebuild: rejected because it would duplicate already approved work and increase regression risk.
  - Patch only CSS without considering component structure: rejected because some issues, such as route-entry fade replay boundaries and logo semantics, may require small component-level changes.

## Decision 2: Keep route-entry fade on initial route mount only

- Decision: Preserve the slow Home fade-in as route-entry behavior only, and keep expand/collapse motion separate from that entry animation.
- Rationale: The spec explicitly distinguishes initial page entry from local toggle state changes, and the current `motion.div` in `HomeCoverHero` is the correct seam to refine so the entry animation does not replay on topic toggles.
- Alternatives considered:
  - Remove the Home fade entirely: rejected because the user asked to keep it.
  - Reuse the same animation for both route entry and toggle transitions: rejected because it violates the requested interaction behavior and would make the page feel heavier.

## Decision 3: Use CSS-led layout refinement with minimal data-contract changes

- Decision: Implement the header width, title spacing, expanded-state resizing, centering, chevron, and responsive topic layout primarily through `global.css` and small class/state adjustments in `HomeCoverHero`.
- Rationale: The current data model already captures the Home issue, image, and topics correctly; the reported problems are presentational rather than content-structural.
- Alternatives considered:
  - Introduce a new Home-specific layout engine or breakpoint abstraction: rejected because the feature scope does not justify new architecture.
  - Change editorial payload shape to encode multiple layout modes: rejected because layout state can remain local UI behavior.

## Decision 4: Preserve local typed registries as the authoritative editorial source

- Decision: Keep `home-version-registry.ts` and the existing section article registries as the single editorial source boundary for this feature.
- Rationale: The refinement does not introduce new content surfaces and the constitution requires a single clear editorial owner; no CMS or split-source migration is needed.
- Alternatives considered:
  - Move the Home cover to a separate content file now: rejected because it adds churn without solving any of the requested layout issues.
  - Inline the topic copy directly in the component while refining layout: rejected because it would weaken the typed editorial contract.

## Decision 5: Treat logo interaction as a scoped brand-state refinement, not a header-wide theme shift

- Decision: Implement logo hover/focus as a local brand treatment that changes only the logo text and dot while leaving header layout and the surrounding metadata visually stable.
- Rationale: The request is explicit that the hover should affect only the logo, and this aligns with the editorial tone by keeping the interaction precise and restrained.
- Alternatives considered:
  - Animate the full header row on hover: rejected because it broadens the effect beyond the approved scope.
  - Leave the logo non-interactive: rejected because the requested refinement explicitly adds interaction.

## Decision 6: Expand QA coverage rather than widening implementation scope

- Decision: Keep the acceptance gate as `npm run typecheck` plus deterministic manual QA, but add a new feature-specific checklist for viewport-fit, centering, logo interaction, and fade behavior.
- Rationale: This repository already uses manual route-oriented QA for comparable editorial features, and the reported issues are best validated visually and behaviorally across breakpoints.
- Alternatives considered:
  - Add new end-to-end automation in this feature: rejected because it adds tooling scope beyond the requested Home refinement.
  - Rely only on visual spot checks: rejected because reduced motion, keyboard behavior, and regression routes need explicit verification steps.
