# Research: Home Cover Rebuild

## Decision 1: Replace the old grid presentation inside the existing Home route

- Decision: Keep `HomeVersionPage` as the public route entry and metadata owner, but replace the old 3-1-3 grid presentation with a dedicated cover-state composition inside the Home view layer.
- Rationale: The updated constitution now treats Home as a feature-defined editorial canvas, so the redesign can fully diverge from the previous issue-grid layout without requiring a governance exception.
- Alternatives considered:
  - Keep the 3-1-3 grid and approximate the cover state inside it: rejected because it would not match the requested closed/open references.
  - Create a separate alternate Home route: rejected because the redesign is meant to replace the current Home experience rather than live beside it.

## Decision 2: Expand/collapse stays local UI state, not route state

- Decision: Model the closed/open cover behavior as local component state toggled by a semantic button with explicit expanded/collapsed accessibility state.
- Rationale: The user asked for an in-place reveal interaction, and there is no publishing or deep-link requirement for the open state itself.
- Alternatives considered:
  - Encode open state in the URL: rejected because it adds route complexity without adding editorial value.
  - Navigate to a different route for the topic reveal: rejected because the requested behavior is explicitly non-navigational.

## Decision 3: Use typed cover-topic entries instead of the old left/right tile contract

- Decision: Replace the old left/right tile expectations with a typed list of exactly three reveal topics, each carrying title, description, and destination route metadata.
- Rationale: The new Home experience no longer uses six side tiles; the data model should reflect the actual editorial contract rather than forcing an obsolete structure.
- Alternatives considered:
  - Keep left/right tiles and hide them in CSS: rejected because it preserves dead structure and obscures the true issue contract.
  - Use untyped inline JSX content: rejected because it weakens reuse and future CMS mapping.

## Decision 3a: Use local typed data as the single editorial source for this feature

- Decision: Keep the Home issue payload and standalone destination article payloads in local typed registries for this feature phase.
- Rationale: The updated constitution allows a feature-defined authoritative editorial source, and local typed data is sufficient for this scoped rebuild without introducing premature CMS integration work.
- Alternatives considered:
  - Add a feature-scoped CMS adapter now: rejected because it adds integration work without being required for the requested Home rebuild.
  - Split Home and destination content across multiple local sources: rejected because the constitution now forbids split ownership for the same editorial surface.

## Decision 4: Reuse existing route conventions and bind each topic to an explicit route family

- Decision: Route Topic 1 to the existing FAR chapter path, route Topic 2 through `/features/:articleSlug`, and route Topic 3 through `/interviews/:articleSlug`, adding direct-entry section article pages where the latter two do not already exist.
- Rationale: The current app already uses stable chapter URLs for reviews and section-based top-level paths for editorial areas, and the clarified topic intent maps cleanly to features and interviews without inventing a new route family.
- Alternatives considered:
  - Force all three topics into the chapter system: rejected because the second and third topics are not defined as chapter experiences.
  - Route Topics 2 and 3 through the same section family: rejected because the clarification established distinct editorial destinations.
  - Use placeholder or dead-end links: rejected because clarification established that missing destination pages are in scope.

## Decision 5: Build the paper background entirely in CSS layers

- Decision: Implement the Home background through layered pseudo-elements, radial gradients, and low-opacity texture treatment in CSS rather than background image assets.
- Rationale: The request explicitly prohibits background images and calls for a tactile paper effect driven entirely by CSS.
- Alternatives considered:
  - Use a scanned paper image: rejected because it violates the requirement.
  - Use a flat color only: rejected because it misses the requested editorial texture.

## Decision 6: Use restrained Motion/CSS transitions with reduced-motion fallbacks

- Decision: Use Motion only for the page-entry fade and topic reveal choreography where it adds clarity, and rely on CSS transitions for arrow direction changes and other low-cost state shifts.
- Rationale: This keeps the interaction calm and lightweight while respecting the repo's existing Motion usage and constitution-level reduced-motion requirements.
- Alternatives considered:
  - Use only CSS for all transitions: rejected because Motion already exists and can handle entrance/reveal timing more predictably.
  - Introduce GSAP: rejected because the interaction does not justify a heavier animation dependency.

## Decision 7: Keep testing focused on type safety plus deterministic manual route and accessibility checks

- Decision: Validate the feature with `npm run typecheck` and a manual checklist covering Home state changes, linked article routes, keyboard navigation, metadata, and reduced-motion behavior.
- Rationale: This matches the repository's current planning/testing pattern for route-heavy editorial features and avoids inventing a new automated harness in this scope.
- Alternatives considered:
  - Add new end-to-end automation as part of this feature: rejected because the current repository pattern does not require it for comparable Home-route work.
  - Rely on visual inspection only: rejected because route behavior and accessibility state need structured verification.
