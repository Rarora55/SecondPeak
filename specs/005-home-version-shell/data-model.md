# Data Model: Home Version Shell

## Entities

## HomeTheme

- Purpose: Defines visual tokens applied to a HomeVersion without changing structure.
- Fields:
  - `accentColor` (string, required): Primary accent token.
  - `backgroundColor` (string, required): Page background token.
  - `textColor` (string, required): Primary readable text token.
- Validation:
  - All fields required and non-empty.
  - Theme combination must satisfy readable text contrast expectations for key text.

## HomeTile

- Purpose: Represents one side editorial block in left/right columns.
- Fields:
  - `id` (string, required): Stable tile identifier unique within a version.
  - `label` (string, required): Editorial label.
  - `title` (string, required): Tile headline text.
  - `imageSrc` (string, required): Tile image source.
  - `imageAlt` (string, required): Accessible alt text.
  - `href` (string, required): Route target.
- Validation:
  - All fields required.
  - `href` must be a valid internal route path used by the site.
  - `imageAlt` cannot be empty.

## HomeMainFeature

- Purpose: Represents the central dominant feature block.
- Fields:
  - `coverLabel` (string, required): Cover/topline label.
  - `title` (string, required): Main feature title.
  - `subtitle` (string, required): Feature subtitle text.
  - `imageSrc` (string, required): Main feature image.
  - `imageAlt` (string, required): Main feature alt text.
  - `href` (string, required): Main feature route target.
- Validation:
  - All fields required.
  - `href` must resolve to a valid in-app route.

## HomeVersion

- Purpose: Single editorial issue payload used by HomeStructure slots.
- Fields:
  - `slug` (string, required, unique): Route key for `/home/:versionSlug`.
  - `isActive` (boolean, required): Active version marker used for `/home`.
  - `title` (string, required): Issue-level title.
  - `issueNumber` (string, required): Issue identifier text.
  - `season` (string, required): Seasonal marker.
  - `month` (string, required): Month marker.
  - `year` (number or string, required): Year marker.
  - `footerText` (string, required): Footer slogan/copy.
  - `theme` (HomeTheme, required): Version theme tokens.
  - `mainFeature` (HomeMainFeature, required): Central slot content.
  - `leftTiles` (HomeTile[3], required): Exactly 3 left-side tiles.
  - `rightTiles` (HomeTile[3], required): Exactly 3 right-side tiles.
- Validation:
  - Exactly one HomeVersion has `isActive = true`.
  - `slug` uniqueness across registry.
  - `leftTiles.length === 3` and `rightTiles.length === 3`.
  - Missing required fields mark version invalid and non-renderable.

## HomeVersionRegistry

- Purpose: Local in-code source of HomeVersion entries, replaceable by future Sanity mapping.
- Fields:
  - `versions` (HomeVersion[], required): Ordered list of candidate versions.
- Operations:
  - `getActiveVersion()`: Returns the only active valid version.
  - `getVersionBySlug(slug)`: Returns valid version or null.
  - `listPublicVersions()`: Returns all valid historical/current versions for optional navigation uses.
- Validation:
  - On initialization/load, enforce invariants:
    - Unique slugs.
    - Exactly one active valid version.
    - Every version passes required-field checks.

## Relationships

- HomeVersion `1:1` HomeTheme.
- HomeVersion `1:1` HomeMainFeature.
- HomeVersion `1:3` left HomeTiles.
- HomeVersion `1:3` right HomeTiles.
- HomeVersionRegistry `1:N` HomeVersions.

## State Rules

- Active state: Exactly one valid version is active at all times.
- Historical state: Any valid non-active version remains slug-accessible indefinitely.
- Invalid state: Version excluded from render paths and falls back to in-shell "Version not found" behavior when requested directly.
