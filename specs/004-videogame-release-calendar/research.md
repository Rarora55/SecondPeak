# Research: Videogame Release Calendar

## Decision 1: Selected Release URL Model

- Decision: Use `/calendar?game=:gameSlug` as the canonical selected-release state.
- Rationale: Query-param state keeps one stable calendar route and composes directly with future filters like `tag` and `studio`.
- Alternatives considered:
  - Path-param state (`/calendar/:gameSlug`): rejected because it complicates coexistence with future calendar filter params and route composition.
  - Dual canonical forms (path + query): rejected to avoid duplicate state representations and extra redirect logic.

## Decision 2: Mobile Detail Interaction

- Decision: On mobile, selected release opens as dedicated full-page detail state on the same route using `game` query param.
- Rationale: Full-page detail gives predictable readability, focus order, and touch targets while preserving shareable URL state.
- Alternatives considered:
  - Drawer/bottom-sheet: rejected due to higher focus-management and scroll-restoration complexity under dense content.
  - Inline expansion inside timeline: rejected because long synopsis/links can destabilize scan flow and day-group readability.

## Decision 3: Publication Visibility Rule

- Decision: Calendar includes all releases with `published` status, regardless of past/future release date.
- Rationale: Editorial calendar value depends on upcoming discovery as much as historical lookback; publication remains the single visibility control.
- Alternatives considered:
  - Show only past or current releases: rejected because it suppresses upcoming release utility.
  - Add separate `scheduled` status to public output: deferred until editorial workflow explicitly requires it.

## Decision 4: Master-Detail Layout Transition

- Decision: Use Motion layout transitions for desktop calendar-shift/detail-enter behavior, with reduced-motion fallback that preserves state clarity without positional animation.
- Rationale: Layout animation keeps spatial context between master and detail views while respecting accessibility preferences.
- Alternatives considered:
  - Instant swap with no transition: rejected because context shift becomes abrupt on dense day timelines.
  - Absolute-positioned panel choreography: rejected due to fragility across responsive breakpoints and content-height variance.

## Decision 5: Entity-First Rendering Contract

- Decision: Render studio and tags as identifiable entities (`id`, `slug`, `name`, and `type` for tags) through link-ready controls in both mini and detail cards.
- Rationale: This enforces normalized data usage and preserves compatibility with upcoming `/studios/:slug`, `/tags/:slug`, and filtered search routes.
- Alternatives considered:
  - Flatten studio/tag strings into release records: rejected because it breaks identity consistency and future relational queries.
  - Hide entity links until future routes launch: rejected because discoverability and semantics are part of current acceptance criteria.

## Decision 6: Hybrid Sanity + Supabase Boundary

- Decision: Treat Sanity as editorial source and transform published release records into normalized Supabase index/search documents via explicit mapping functions.
- Rationale: Keeps authoring workflows in CMS while enabling future relational filtering/search performance in structured storage.
- Alternatives considered:
  - Author release data directly in Supabase: rejected because it violates content ownership discipline.
  - Query Sanity only for all future search use cases: deferred because spec requires Supabase preparation for indexed relational querying.

## Decision 7: Data Normalization Strategy

- Decision: Model `GameRelease`, `Studio`, `ReleaseTag`, and `SocialLink` as separate entities with stable ids/slugs and referenced relationships.
- Rationale: Normalization avoids duplication drift and provides deterministic joins/filter dimensions for future search pages.
- Alternatives considered:
  - Denormalized embedded tag/studio arrays only: rejected because updates would require broad record rewrites and weaken relational integrity.
  - Runtime-only normalization without persisted index model: rejected because future search/index requirements need stable structured persistence.

## Decision 8: Validation Strategy

- Decision: Use `npm run typecheck` and deterministic manual QA scenarios covering route access, selection persistence, desktop/mobile detail behavior, reduced-motion, and resilience states.
- Rationale: Feature is interaction-heavy and must be validated across viewport/input combinations beyond type safety.
- Alternatives considered:
  - Full E2E suite in this slice: deferred to keep plan scope focused and unblock implementation.
  - Typecheck-only validation: rejected because it cannot verify runtime layout and accessibility behaviors.

## Implementation Notes (2026-04-28)

- Calendar module should isolate route-state/data concerns from presentational components to keep future filter/search extensions straightforward.
- Data adapters should explicitly map editorial Sanity fields into normalized indexable shapes expected by Supabase.
- URL state parsing must tolerate missing/invalid `game` values without breaking timeline rendering.
