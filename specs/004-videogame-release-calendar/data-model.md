# Data Model: Videogame Release Calendar

## Entity: GameRelease

Purpose: Canonical release record rendered in calendar timeline and detail views.

Fields:

- `id` (string): Stable unique identifier.
- `slug` (string): URL-safe release identifier used by `game` query state.
- `title` (string): Display name of game.
- `releaseDate` (date): Calendar grouping date.
- `thumbnailAssetId` (string): Reference to media asset.
- `studioId` (string): Foreign key to `Studio`.
- `tagIds` (string[]): Foreign keys to `ReleaseTag`.
- `quote` (string | null): Short defining quote.
- `synopsis` (string): Editorial summary text.
- `socialLinkIds` (string[]): Foreign keys to `SocialLink`.
- `steamUrl` (string | null): External CTA target.
- `publicationStatus` (enum): `draft`, `published`, `archived`.

Validation rules:

- `id`, `slug`, `title`, `releaseDate`, `studioId`, and `publicationStatus` are required.
- `slug` must be globally unique across releases.
- Public calendar output includes only `publicationStatus=published`.
- `steamUrl` must be absolute URL when present.

## Entity: Studio

Purpose: Identifiable studio/publisher/developer reference.

Fields:

- `id` (string): Stable unique identifier.
- `name` (string): Display name.
- `slug` (string): URL-safe studio identifier.

Validation rules:

- `name` and `slug` are required.
- `slug` must be unique across studios.
- Deleting a studio must be blocked while published releases reference it.

## Entity: ReleaseTag

Purpose: Typed taxonomy entry used for display and future filtering/search.

Fields:

- `id` (string): Stable unique identifier.
- `name` (string): Display label.
- `slug` (string): URL-safe tag identifier.
- `type` (enum): `genre`, `subgenre`, `mechanic`, `mood`, `platform`.

Validation rules:

- `name`, `slug`, and `type` are required.
- `slug` uniqueness should be enforced within the full tag namespace.
- At least one tag is recommended for published releases.

## Entity: SocialLink

Purpose: External social/RSS relationship attached to a release.

Fields:

- `id` (string): Stable unique identifier.
- `releaseId` (string): Foreign key to `GameRelease`.
- `label` (string): Human-readable channel label.
- `url` (string): Absolute destination URL.
- `kind` (enum): `social`, `rss`, `community`, `store`, `other`.

Validation rules:

- `releaseId`, `label`, and `url` are required.
- `url` must be absolute and valid.
- Duplicate `label+url` pairs for the same release should be rejected.

## Entity: CalendarDayGroup

Purpose: View-model grouping for timeline rendering.

Fields:

- `dayKey` (string): Canonical date key (YYYY-MM-DD).
- `displayLabel` (string): Human-readable day heading.
- `releaseIds` (string[]): Ordered release ids for the day.

Validation rules:

- `dayKey` must match one calendar date.
- `releaseIds` must reference published `GameRelease` items only.

## Entity: CalendarSelectionState

Purpose: Route-driven UI state for selected detail context.

Fields:

- `selectedGameSlug` (string | null): Parsed `game` query value.
- `selectedReleaseId` (string | null): Resolved release id.
- `viewMode` (enum): `timeline_only`, `desktop_master_detail`, `mobile_detail_page`.
- `isValidSelection` (boolean): Whether query slug resolves to a published release.

State transitions:

- No query -> `timeline_only`.
- Valid `game` query on desktop -> `desktop_master_detail`.
- Valid `game` query on mobile -> `mobile_detail_page`.
- Invalid/unpublished `game` query -> fallback to `timeline_only` with safe not-found feedback.

Validation rules:

- `selectedGameSlug` must map to one published release when `isValidSelection=true`.
- Transitioning back from detail must preserve timeline scroll usability.

## Entity: SupabaseReleaseIndexRecord

Purpose: Normalized, indexable record derived from Sanity for future relational queries.

Fields:

- `releaseId` (string): Mirrors `GameRelease.id`.
- `releaseSlug` (string): Mirrors `GameRelease.slug`.
- `title` (string): Searchable title field.
- `releaseDate` (date): Filter/sort key.
- `studioId` (string): Join key.
- `tagIds` (string[]): Join/filter keys.
- `platformTagIds` (string[]): Derived subset of platform-type tags.
- `hasSteamUrl` (boolean): Availability flag.
- `publicationStatus` (string): Visibility filter field.
- `sourceUpdatedAt` (datetime): Source sync freshness marker.

Validation rules:

- Must be produced from Sanity editorial data; no manual Supabase authoring.
- Upsert key uses `releaseId` (or `releaseSlug` if required by storage design).
- `publicationStatus` must remain consistent with source publication state.

## Relationships

- `Studio 1 -> N GameRelease`
- `GameRelease N -> N ReleaseTag` (via release-tag mapping)
- `GameRelease 1 -> N SocialLink`
- `GameRelease 1 -> 1 SupabaseReleaseIndexRecord` (derived representation)
- `CalendarDayGroup 1 -> N GameRelease` (view-level grouping)

## Ownership Boundaries

- Sanity owns authoring lifecycle for `GameRelease`, `Studio`, `ReleaseTag`, and editorial text fields.
- Supabase owns derived index/search records optimized for query/filter workloads.
- UI consumes normalized models and never treats studio/tags as loose card-local strings.
