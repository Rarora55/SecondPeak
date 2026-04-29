# Research: Home Version Shell

## Decision 1: Active HomeVersion selection uses explicit single active flag

- Decision: Use an explicit `isActive` boolean and enforce exactly one active entry in the local registry.
- Rationale: Deterministic behavior for `/home` prevents accidental current-issue changes from ordering or date heuristics.
- Alternatives considered:
  - Latest by date metadata: rejected due to implicit behavior and backfill risk.
  - First registry item: rejected as too fragile for editorial maintenance.

## Decision 2: Unknown slug handling remains in-shell

- Decision: Render an in-shell "Version not found" fallback with a primary action to `/home`.
- Rationale: Keeps user context within Home, surfaces invalid links clearly, and offers immediate recovery.
- Alternatives considered:
  - Hard redirect to `/home`: rejected because it hides slug errors.
  - Global 404 route: rejected because it breaks Home contextual continuity.

## Decision 3: Invalid versions are excluded from rendering

- Decision: Treat HomeVersion entries with missing required fields as invalid and exclude from normal rendering.
- Rationale: Prevents partially broken editorial experiences and ensures consistent slot completeness.
- Alternatives considered:
  - Best-effort placeholders: rejected due to unpredictable quality and editorial inconsistency.
  - Boot-time hard fail for entire app: rejected as too disruptive.

## Decision 4: Historical versions remain routable indefinitely

- Decision: Keep all valid historical HomeVersions publicly accessible by slug unless explicitly removed from the registry as invalid.
- Rationale: Preserves shareable archives and stable editorial references.
- Alternatives considered:
  - Time-limited retention: rejected because it breaks long-lived references.
  - Internal-only archive: rejected because public editorial continuity is required.

## Decision 5: Data boundary prepared for Sanity migration

- Decision: Define a typed registry contract that mirrors future Sanity-driven HomeVersion payloads while remaining local for now.
- Rationale: Enables immediate refactor with minimal migration cost when CMS integration is introduced.
- Alternatives considered:
  - Implement direct Sanity fetch now: rejected because this feature focuses on architecture separation, not content pipeline rollout.
  - Store versions in Supabase: rejected due to constitution-level content ownership rules.

## Decision 6: Accessibility baseline for shell and slots

- Decision: Require semantic links for all interactive tiles, readable alt text, visible focus states, and reduced-motion-safe transitions.
- Rationale: Home is a primary route and must remain fully operable across keyboard and assistive technologies.
- Alternatives considered:
  - Visual-only cues: rejected due to accessibility non-compliance risk.
  - Animation-only emphasis: rejected because reduced-motion compatibility is mandatory.
