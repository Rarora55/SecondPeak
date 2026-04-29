# Feature Specification: Home Version Shell

**Feature Branch**: `[005-home-version-shell]`
**Created**: 2026-04-29
**Status**: Draft
**Input**: User description: "Refactor Home architecture to separate fixed Home structure from monthly/editorial Home versions."

## Clarifications

### Session 2026-04-29

- Q: What should happen when `/home/:versionSlug` does not match any known version? → A: Show an in-shell “Version not found” fallback with a primary “Go to current issue” link.
- Q: How is the active HomeVersion selected for `/home`? → A: Exactly one version is explicitly flagged as active in the registry.
- Q: How should versions with missing required fields be handled? → A: Treat them as invalid, do not render them, and use in-shell fallback behavior for affected routes.
- Q: How long should valid historical versions remain publicly accessible? → A: All valid historical versions remain publicly accessible by slug indefinitely.

## User Scenarios and Testing (mandatory)

### User Story 1 - View Current Home Issue (Priority: P1)

A visitor opens `/home` and sees the currently active editorial home issue rendered inside the fixed home structure.

**Why this priority**: `/home` is the primary entry path and must always render a complete, readable, and navigable home experience.

**Independent Test**: Open `/home` and verify the page renders one active issue with all expected slots, theme styling, and working links without any layout change per issue.

**Acceptance Scenarios**:

1. **Given** an active home version exists, **When** the visitor navigates to `/home`, **Then** the system renders that active version in the shared home structure.
2. **Given** multiple historical home versions exist, **When** `/home` is loaded, **Then** only the active version is shown while preserving historical versions for direct URL access.

---

### User Story 2 - View Specific Historical Issue (Priority: P2)

A visitor opens a direct URL for a specific issue slug and sees that issue rendered with the same structural layout used by other issues.

**Why this priority**: Editorial archives must remain linkable and consistent, even when not featured in current navigation.

**Independent Test**: Open `/home/far-lone-sails` and `/home/signalis`; confirm both render with identical structure and only content/theme changes.

**Acceptance Scenarios**:

1. **Given** a valid historical version slug, **When** the visitor navigates to `/home/:versionSlug`, **Then** the matching version loads inside the shared home structure.
2. **Given** a version is no longer promoted in main navigation, **When** the visitor uses its direct URL, **Then** the version still renders correctly.

---

### User Story 3 - Add a New Monthly Issue (Priority: P3)

An editor or developer adds a new home issue by creating one new typed entry in the home version registry.

**Why this priority**: Monthly publishing needs low maintenance cost and predictable scaling without repeated layout work.

**Independent Test**: Add one new home version object to the registry and verify it becomes route-accessible with no new layout component creation.

**Acceptance Scenarios**:

1. **Given** a new version entry contains all required fields, **When** it is added to the registry, **Then** the issue renders through existing shared structure without duplicated layout code.
2. **Given** the new version is flagged as active, **When** `/home` is opened, **Then** the new version becomes the current home output.

## Edge Cases

- Visitor requests `/home/:versionSlug` for a slug that does not exist.
- Active version reference points to a missing or incomplete registry entry.
- A version contains missing image alt text or invalid link targets.
- Very long editorial labels or metadata values risk overflow in fixed slots.
- Keyboard-only navigation across all tiles and header links.
- Theme token combinations create low text contrast for critical text.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The system MUST define a fixed Home Structure that owns layout behavior, slot map, spacing, responsive rules, navigation placement, and base motion behavior.
- **FR-002**: The fixed Home Structure MUST expose exactly seven editorial content slots: three left tiles, one central main feature, and three right tiles.
- **FR-003**: The fixed Home Structure MUST include a header/navigation area and a footer strip for issue metadata and slogan text.
- **FR-004**: Home versions MUST supply content and theme data only, and MUST NOT alter structural rules or slot geometry.
- **FR-005**: Each home version MUST provide all required fields: slug, title, cover label, subtitle, main feature image, six side tile entries, issue number, season/month/year, footer text, theme tokens, and route targets.
- **FR-006**: The system MUST resolve `/home` to one active version selected from the version registry.
- **FR-006a**: The version registry MUST enforce exactly one explicitly flagged active HomeVersion at a time.
- **FR-007**: The system MUST resolve `/home/:versionSlug` to the matching version when it exists.
- **FR-008**: The system MUST preserve direct URL access to all valid historical versions indefinitely, even when they are not linked in primary home navigation.
- **FR-009**: The system MUST provide a safe fallback experience for unknown version slugs by rendering an in-shell “Version not found” state that includes a primary “Go to current issue” link to `/home`.
- **FR-010**: The version data source MUST be represented through a typed registry abstraction that can be replaced later by an editorial CMS-backed source without changing Home Structure behavior.
- **FR-011**: Editorial home content ownership MUST remain scoped to the editorial CMS domain and MUST NOT be stored in relational application data stores intended for users, analytics, interactions, or comments.
- **FR-012**: A HomeVersion with missing required fields MUST be treated as invalid, excluded from normal rendering, and any direct route to it MUST display the in-shell fallback state.

### Accessibility and Motion Requirements

- **AM-001**: Header links, tiles, and footer navigation controls MUST be keyboard reachable with visible focus states.
- **AM-002**: Linked visual tiles and main feature areas MUST include descriptive alternative text.
- **AM-003**: The structural DOM order MUST preserve logical reading order for assistive technologies.
- **AM-004**: Base motion effects in the shared structure MUST preserve readability and maintain usability when reduced-motion preferences are enabled.

### SEO and Discoverability Requirements

- **SEO-001**: `/home` and `/home/:versionSlug` pages MUST provide explicit metadata fields for title and description.
- **SEO-002**: `/home` and `/home/:versionSlug` pages MUST provide canonical URL metadata and Open Graph metadata.
- **SEO-003**: Sitemap and robots configuration MUST reflect the intended indexability of `/home` and valid `/home/:versionSlug` routes, including historical versions that remain publicly accessible.

### Content Ownership Requirements

- **CO-001**: HomeVersion content fields MUST be isolated from structural layout definitions.
- **CO-002**: Future CMS integration MUST map into the same HomeVersion contract so that issue publishing does not require structural component rewrites.
- **CO-003**: Relational application data services MUST remain limited to non-editorial application concerns.

### Key Entities (include if feature involves data)

- **HomeStructure**: Fixed shell definition containing structural slots, responsive behavior, and non-editorial UI rules.
- **HomeVersion**: Versioned issue payload containing slug, issue metadata, content for each slot, theme tokens, and destination routes.
- **HomeTile**: Side editorial block content unit with label, title, imagery, link target, and accessibility text.
- **HomeMainFeature**: Primary feature content unit with hero image, title context, link target, and supporting editorial labels.
- **HomeTheme**: Token set defining accent, background, and text presentation values applied by structure without changing layout.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: 100% of home issue routes (`/home` plus valid `/home/:versionSlug`) render with one shared structural layout and no duplicated layout implementations per issue.
- **SC-002**: Switching between two valid version URLs changes only issue content and visual theme while preserving identical slot positions and structural behavior.
- **SC-003**: Unknown version slugs always return a recoverable fallback state within 1 interaction step to the active home route.
- **SC-004**: Creating a new monthly issue requires only one new version data entry and zero structural component additions.
- **SC-005**: Keyboard-only users can traverse all interactive header and tile links in the home page without blocked focus paths.

## Assumptions

- Existing home visual skeleton is treated as the canonical structural contract.
- Historical versions remain publishable and addressable by stable slugs.
- Valid historical home versions remain publicly routable indefinitely unless explicitly removed from the registry as no longer valid.
- Active version selection is managed by version metadata in the local registry until CMS integration is introduced.
- Future editorial CMS integration will deliver complete version payloads that can satisfy the HomeVersion contract.
