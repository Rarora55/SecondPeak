# Data Model: Editorial Black-and-White Visual System

## Entity: EditorialSurfaceBlock

Purpose: Represents any section or block surface that participates in the global editorial visual system.

Fields:

- `surfaceId` (string): Stable identifier for the UI surface.
- `backgroundMode` (enum): `default_white` or `inverted_black`.
- `textMode` (enum): `default_black` or `inverted_white`.
- `borderColor` (enum): `black`.
- `borderWidthPx` (number): `1`.
- `isInteractive` (boolean): Whether the surface supports interaction state transitions.

Validation rules:

- In default mode, surface MUST be white with black text and 1px black border.
- `borderWidthPx` MUST equal `1` across breakpoints.
- Non-black/white surface colors are out of scope for this feature.

## Entity: InteractionStatePolicy

Purpose: Defines styling behavior for global interaction states.

Fields:

- `state` (enum): `default`, `hover`, `focus`, `active`, `highlighted`, `selected`.
- `requiresInversion` (boolean): Whether state forces black background plus white text.
- `focusOutlineWidthPx` (number): `2`.
- `focusOutlineOffsetPx` (number): Positive offset for focus ring separation.

State transitions:

- `default -> hover/focus/active/highlighted/selected` applies inversion.
- `hover/focus/active/highlighted/selected -> default` restores white background plus black text.

Validation rules:

- `requiresInversion` MUST be true for all non-default states in scope.
- Focused state MUST include `focusOutlineWidthPx=2` with visible offset.

## Entity: HomeSelectableBlock

Purpose: Captures HomePage blocks that are selectable/clickable and must preserve behavior while adopting visual rules.

Fields:

- `blockKey` (string): Home block identity.
- `isSelectable` (boolean): Interaction capability.
- `navigationTarget` (string): Existing route/action target.
- `visualState` (enum): `default` or `inverted`.

State transitions:

- `default -> inverted` on hover/focus/active/selected.
- `inverted -> default` when state ends.

Validation rules:

- Existing click/navigation target MUST not change.
- Visual updates MUST not alter Home layout structure or responsiveness.

## Entity: ReviewsRailPartitionState

Purpose: Tracks review bar partitioning between left and right rails under explicit `current_only` policy.

Fields:

- `leftRailBarIds` (string[]): Bar IDs rendered on the left rail.
- `rightRailBarIds` (string[]): Bar IDs rendered on the right rail.
- `currentBarId` (string | null): Currently selected review bar.
- `leftRailPolicy` (enum): `current_only`.
- `isInReviewsRoute` (boolean): Whether current route belongs to Reviews.
- `barsVisible` (boolean): Visibility status for all review bars.

State transitions:

- Enter Reviews with no selection: all bars on right, left rail empty.
- Select bar `X`: move `X` to left, set `currentBarId=X`, keep all others on right.
- Select bar `Y`: move `Y` to left and return previous `X` to right.
- Exit Reviews: reset to default right-rail-only state.

Validation rules:

- `barsVisible` MUST remain true after any selection.
- `leftRailBarIds` MUST contain exactly one bar when `currentBarId` is set.
- Selected bar MUST remain a full vertical bar component when moved left.
- Partition changes MUST not break existing lateral review navigation behavior.

## Entity: RouteResilienceState

Purpose: Defines required resilience rendering states for routes affected by this feature.

Fields:

- `routeId` (string): Route identifier.
- `loadState` (enum): `loading`, `ready`, `empty`, `error`.
- `isReadableInBw` (boolean): State preserves black-and-white readability.
- `hasRecoveryAffordance` (boolean): State provides clear recovery/navigation affordance.

Validation rules:

- `loading`, `empty`, and `error` states MUST remain readable and navigable.
- Resilience states MUST preserve editorial black-and-white contrast rules.

## Entity: RouteDiscoverabilityState

Purpose: Represents discoverability outputs that must remain stable for affected routes.

Fields:

- `routePath` (string): Public route path.
- `hasTitle` (boolean): Title metadata present.
- `hasDescription` (boolean): Description metadata present.
- `hasCanonical` (boolean): Canonical URL metadata present.
- `hasOpenGraph` (boolean): Open Graph metadata present.
- `includedInSitemap` (boolean): Route discoverable through sitemap behavior.
- `allowedByRobots` (boolean): Route/metadata behavior consistent with robots expectations.

Validation rules:

- Metadata behavior for affected routes MUST not regress.
- Sitemap and robots behavior MUST remain unchanged by this feature.
