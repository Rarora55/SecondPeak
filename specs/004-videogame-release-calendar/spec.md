# Feature Specification: Videogame Release Calendar

**Feature Branch**: `[004-videogame-release-calendar]`  
**Created**: 2026-04-28  
**Status**: Draft  
**Input**: User description: "Add a new vertical videogame release calendar feature to the existing project."

## Clarifications

### Session 2026-04-28

- Q: Which URL strategy should represent selected release state on Calendar? -> A: Use query parameter format `/calendar?game=:gameSlug`.
- Q: What mobile detail interaction pattern should the Calendar use? -> A: Use a dedicated full-page detail state on the same route via `game` query parameter.
- Q: Which publication/date rule determines public Calendar visibility? -> A: Show all releases with `published` status regardless of past or future release date.

## User Scenarios and Testing (mandatory)

### User Story 1 - Browse Releases by Day (Priority: P1)

As a reader, I want a dedicated Calendar page that shows videogame releases grouped by day in a vertical timeline so I can quickly see what is releasing and when.

**Why this priority**: The day-grouped calendar is the core value of the feature and must exist before deeper interactions.

**Independent Test**: Navigate to Calendar from the main menu and confirm a vertical day list renders with one or more compact release cards under each day.

**Acceptance Scenarios**:

1. **Given** I open the Calendar page, **When** release data exists, **Then** I see days in a vertical timeline layout with release cards grouped under each day.
2. **Given** a day has multiple releases, **When** the day section renders, **Then** each release appears as a compact card with thumbnail, title, studio, and tags.
3. **Given** I use keyboard navigation, **When** I move through release cards, **Then** each card is reachable and exposes a clear focus and selected state.

---

### User Story 2 - Inspect a Selected Release Without Losing Context (Priority: P2)

As a reader, I want selecting a release card to open a larger detail panel while keeping the calendar visible so I can compare releases without losing my place.

**Why this priority**: Master-detail behavior is required for usable exploration and faster editorial browsing.

**Independent Test**: Select a release card on desktop and verify the calendar shifts left smoothly while a detail panel opens on the right with complete release information.

**Acceptance Scenarios**:

1. **Given** no release is selected on desktop, **When** I select a release card, **Then** a detail panel appears on the right and the calendar shifts left while both remain centered as a combined layout.
2. **Given** a release is selected, **When** I refresh or share the URL, **Then** the selected release state is restored from the URL.
3. **Given** I am on a mobile viewport, **When** I select a release, **Then** I get a readable detail experience that does not force a cramped two-column desktop layout.

---

### User Story 3 - Navigate by Identifiable Studios and Tags (Priority: P3)

As a reader, I want studio and tag data shown as identifiable entities so I can move toward future filtering and entity-based exploration.

**Why this priority**: Stable entity modeling protects future routes for studios, tags, and search.

**Independent Test**: Verify each release references structured studio/tag entities and that rendered studio/tag UI is presented as entity-aware links or link-ready controls rather than plain static strings.

**Acceptance Scenarios**:

1. **Given** a release card or detail panel is rendered, **When** studio and tags are shown, **Then** they come from identifiable entities with stable id and slug fields.
2. **Given** editorial content is published or hidden, **When** the Calendar page loads, **Then** only releases intended for public visibility are shown.

## Edge Cases

- Direct URL entry to an unknown or unpublished game slug shows a safe not-found or fallback state while keeping calendar access.
- Multiple releases on the same date remain readable without card overlap or clipping.
- Releases missing optional fields (for example quote or social links) still render a complete, usable detail panel.
- Reduced-motion users receive equivalent state changes without disorienting transitions.
- Mobile users can open and close release details without losing scroll position in the calendar list.
- Empty day ranges, loading states, and backend fetch failures preserve readable status messaging.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: System MUST provide a dedicated Calendar page reachable from the main navigation menu.
- **FR-002**: Main navigation structure MUST remain extensible so additional pages can be added without restructuring the menu model.
- **FR-003**: Calendar page MUST render release items grouped by release date in a vertical day-based timeline.
- **FR-004**: Each release mini card MUST show thumbnail, game title, studio entity label, and tag entity labels.
- **FR-005**: Release mini cards MUST be semantic interactive elements (link or button behavior) and support keyboard interaction.
- **FR-006**: Selecting a release on desktop MUST open a right-side detail panel and preserve visible calendar context.
- **FR-007**: On desktop, when a release is selected, calendar and detail panel MUST remain centered as a combined layout within available width and page margins.
- **FR-008**: Release detail panel MUST display thumbnail, title, studio, tag set, quote, synopsis, social/RSS links, and a CTA to the Steam page.
- **FR-009**: The selected release state MUST be URL-addressable using `/calendar?game=:gameSlug` and restorable after refresh.
- **FR-010**: Mobile behavior MUST provide a dedicated full-page detail state on `/calendar?game=:gameSlug` instead of forcing desktop two-column composition.
- **FR-011**: Calendar master view context MUST remain available when entering and exiting detail view.
- **FR-012**: Studio, tag, and social link values MUST be represented as identifiable entities, not loose text-only fields.
- **FR-013**: Game release records MUST reference a Studio entity and one or more ReleaseTag entities through stable identifiers.
- **FR-014**: ReleaseTag entity model MUST support at least: genre, subgenre, mechanic, mood, and platform tag types.
- **FR-015**: The feature MUST preserve future route compatibility for `/studios/:studioSlug`, `/tags/:tagSlug`, `/calendar` query filters, and `/search`.
- **FR-016**: Editorial create/update/publish workflows for release content MUST remain owned by Sanity.
- **FR-017**: Structured/indexable release data for search and filtering MUST be prepared in Supabase as derived normalized records, not as the primary editorial authoring interface.
- **FR-018**: Public calendar visibility MUST include all releases with `published` status, regardless of whether the release date is in the past or future.

### Accessibility and Motion Requirements

- **AM-001**: Calendar cards and panel controls MUST be fully operable by keyboard and touch.
- **AM-002**: Selected release state MUST be programmatically exposed and visually clear.
- **AM-003**: Detail panel MUST use clear heading structure and useful image alternative text.
- **AM-004**: Non-essential layout transitions MUST respect reduced-motion preferences.
- **AM-005**: Opening and closing detail views on mobile MUST preserve predictable focus behavior and must not trap focus incorrectly.
- **AM-006**: Mobile back navigation from `/calendar?game=:gameSlug` MUST return users to the calendar timeline context without losing usability.

### Discoverability and Linking Requirements

- **DL-001**: Calendar page URL MUST be directly navigable from browser address entry.
- **DL-002**: Selected release deep links MUST be shareable using the `game` query parameter and open the same selected state for another visitor.
- **DL-003**: Studio and tag UI elements MUST be link-ready for future entity landing pages and filtered calendar/search flows.

### Data Model Requirements

- **DM-001**: `GameRelease` MUST include stable id, slug, title, release date, publication status, media reference, and referenced entity ids for studio/tags/links.
- **DM-002**: `Studio` MUST include id, name, and slug.
- **DM-003**: `ReleaseTag` MUST include id, name, slug, and tag type.
- **DM-004**: `SocialLink` MUST include id, label, URL, and relation to a release.
- **DM-005**: Normalized mapping rules MUST avoid duplicating studio/tag records inside each release payload.

### Key Entities (include if feature involves data)

- **GameRelease**: Release record with editorial text/media and references to studio, tags, and social links.
- **Studio**: Named publisher/developer entity with stable slug used for display and future routing.
- **ReleaseTag**: Typed taxonomy entity (genre, subgenre, mechanic, mood, platform) used for display and future filtering.
- **SocialLink**: Outbound channel entity for social/RSS presence tied to a release.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: 100% of public releases with a valid release date appear under the correct day in the Calendar timeline.
- **SC-002**: 100% of release mini cards display thumbnail, title, studio, and at least one tag label when those fields are present.
- **SC-003**: In desktop validation, selecting a release opens the detail panel and preserves visible calendar context in all tested scenarios.
- **SC-004**: Shared or refreshed selected-release URLs restore the same selected game state in at least 95% of validation attempts.
- **SC-005**: 100% of tested release records use structured studio/tag entities with stable ids and slugs, with no loose string-only studio/tag fields in release storage.
- **SC-006**: Mobile task completion for open-detail and return-to-calendar flows is successful in 100% of tested primary viewport scenarios.

## Assumptions

- Existing editorial governance already defines who can publish or unpublish release content in Sanity.
- Existing site information architecture can add one new top-level Calendar destination without redesigning unrelated routes.
- Future search/filter pages will consume normalized Supabase records derived from the same canonical editorial data.
