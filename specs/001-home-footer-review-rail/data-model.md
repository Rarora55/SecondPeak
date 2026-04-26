# Data Model: Home Footer Scope and Review Rail Navigation

## Entity: RouteFooterPolicy

Purpose: Defines whether footer behavior is enabled for a route context.

Fields:

- `routeId` (string): Canonical route context identifier (e.g., `home`, `reviews`, `manifesto`).
- `footerEnabled` (boolean): Whether footer can render in this route context.
- `visibilityMode` (enum): `in_view_zone_only` for Home, `hidden` for internal pages.

Validation rules:

- Home route must map to `footerEnabled=true` and `visibilityMode=in_view_zone_only`.
- All internal routes must map to `footerEnabled=false` and `visibilityMode=hidden`.

## Entity: HomeFooterZoneState

Purpose: Represents live visibility state for the Home footer segment.

Fields:

- `isFooterZoneInView` (boolean): True only while the Home footer zone is intersecting viewport.
- `isFooterVisible` (boolean): Derived from `footerEnabled && isFooterZoneInView`.

State transitions:

- `not_in_view -> in_view`: footer becomes visible.
- `in_view -> not_in_view`: footer hides.

Validation rules:

- `isFooterVisible` must never be true on non-Home routes.

## Entity: ChapterChildPage

Purpose: Route-addressable chapter segment represented by one bar control.

Fields:

- `slug` (string): Stable child route segment.
- `order` (number): Sequence index inside the chapter.
- `title` (string): User-facing label.

Validation rules:

- Slugs must be unique within a chapter.
- Order must be contiguous by rendered index.

## Entity: ChapterBarControl

Purpose: Interactive control bound to one `ChapterChildPage`.

Fields:

- `targetSlug` (string): Child page slug to navigate to.
- `layoutMode` (enum): `desktop_right_rail` or `mobile_horizontal_strip`.
- `isActive` (boolean): True when child page route matches current route slug.
- `isInteractive` (boolean): False only if target page is unavailable.

Relationships:

- `ChapterBarControl.targetSlug` maps 1:1 to `ChapterChildPage.slug`.
- One chapter renders `N` controls for `N` child pages in both layout modes.

Validation rules:

- Exactly one control is active for a valid chapter route.
- Activating a control must navigate to matching child page route.

## Entity: ChapterNavigationMode

Purpose: Breakpoint-resolved presentation strategy for bar controls.

Fields:

- `isDesktopOrTablet` (boolean): True when viewport uses right-rail mode.
- `mode` (enum): `desktop_right_rail` or `mobile_horizontal_strip`.

State transitions:

- Mode flips when viewport crosses configured breakpoint.
- Active child route must remain unchanged during mode transition.
