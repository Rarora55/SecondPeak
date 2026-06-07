# Data Model: Home Cover Rebuild

## Entities

## HomeCoverTheme

- Purpose: Defines the visual tokens for the rebuilt editorial cover.
- Fields:
  - `backgroundColor` (string, required): Base paper color for the page.
  - `textColor` (string, required): Primary readable text color for metadata and topic copy.
  - `accentColor` (string, required): Accent used for the logo dot, topic markers, and fine separators.
  - `titleColor` (string, required): Low-opacity cover-title color treatment.
- Validation:
  - All fields are required and non-empty.
  - Combined colors must maintain readable contrast for metadata and topic copy.

## HomeCoverImage

- Purpose: Represents the central cover image shared across closed and open states.
- Fields:
  - `src` (string, required): Main image asset source.
  - `alt` (string, required): Accessible image description.
  - `widthPreference` (string, required): Responsive width token for the editorial layout contract.
  - `aspectRatio` (string, required): Declared ratio for stable rendering.
  - `treatment` (string, required): Named visual treatment profile describing faded, paper-integrated presentation.
- Validation:
  - `src` and `alt` are required.
  - Width and ratio values must map to supported layout expectations.

## HomeCoverTopic

- Purpose: Represents one revealed editorial topic beneath the SILENCE cover.
- Fields:
  - `id` (string, required): Stable identifier unique within the Home version.
  - `title` (string, required): Editorial topic headline.
  - `description` (string, required): Supporting teaser copy.
  - `href` (string, required): Direct URL destination for the linked article/page.
  - `section` (string, required): Destination editorial family, such as `reviews`, `features`, or `interviews`.
  - `markerLabel` (string, optional): Optional short label for editorial display.
- Validation:
  - Exactly three topics are required for this issue cover.
  - `href` must map to a valid in-app route.
  - Topic 2 must use the `features` route family.
  - Topic 3 must use the `interviews` route family.
  - `title` and `description` cannot be empty.

## HomeCoverIssue

- Purpose: Represents the issue-specific payload rendered by the rebuilt Home route.
- Fields:
  - `slug` (string, required, unique): Current issue route key used by `/home/:versionSlug`.
  - `isActive` (boolean, required): Current issue marker used by `/home`.
  - `publicationTitle` (string, required): Brand text shown in the header.
  - `issueNumber` (string, required): Issue identifier text.
  - `issueDateLabel` (string, required): Human-readable issue date such as `Julio 2026`.
  - `coverTitle` (string, required): Main cover wordmark text, currently `SILENCE`.
  - `theme` (HomeCoverTheme, required): Cover-level visual token set.
  - `image` (HomeCoverImage, required): Shared central image payload.
  - `topics` (HomeCoverTopic[3], required): Exactly three revealed topic links.
  - `fallbackHref` (string, required): Recovery path when the issue cannot be resolved.
- Validation:
  - Exactly one valid issue is active.
  - `topics.length === 3`.
  - Missing required fields mark the issue invalid and non-renderable.

## EditorialDestination

- Purpose: Describes a direct-entry editorial page reachable from a Home topic link.
- Fields:
  - `slug` (string, required): Stable destination identifier.
  - `href` (string, required): Public route path.
  - `section` (string, required): Editorial route family.
  - `title` (string, required): Page title used in content and metadata.
  - `description` (string, required): Summary/teaser used in metadata and page intro.
  - `contentMode` (string, required): Existing chapter reuse or standalone article page.
  - `isExisting` (boolean, required): Whether the route already exists before this feature.
- Validation:
  - Every HomeCoverTopic must map to one EditorialDestination.
  - `href` values must be unique across destination entries.
  - Topic 2 destination must match `/features/:articleSlug`.
  - Topic 3 destination must match `/interviews/:articleSlug`.

## EditorialSourceBoundary

- Purpose: Captures the single authoritative source rule for editorial content in this feature.
- Fields:
  - `sourceType` (string, required): Current source category, which is local typed data for this feature.
  - `scope` (string, required): Editorial surfaces covered by the source, including Home cover content and standalone destination pages.
- Validation:
  - Exactly one editorial source boundary applies to the Home cover feature.
  - The boundary must remain separate from non-editorial app/product data stores.

## Relationships

- HomeCoverIssue `1:1` HomeCoverTheme.
- HomeCoverIssue `1:1` HomeCoverImage.
- HomeCoverIssue `1:3` HomeCoverTopic.
- HomeCoverTopic `N:1` EditorialDestination.
- EditorialSourceBoundary `1:N` HomeCoverIssue and EditorialDestination.

## State Rules

- Closed state: HomeCoverIssue renders header, central image, cover title, and expand control only.
- Open state: The same cover content remains visible and the three HomeCoverTopic entries are revealed below it.
- Invalid issue state: Home falls back in-shell and exposes a recovery link to the active Home issue.
- Destination state: Each HomeCoverTopic destination must be directly reachable by URL whether it reuses an existing chapter route or a new standalone section article route.
- Route-family state: Topic 1 reuses the reviews chapter route, Topic 2 resolves through `features`, and Topic 3 resolves through `interviews`.
- Source-boundary state: Local typed data is the authoritative editorial source for both the Home cover issue and the standalone destination pages in this feature phase.
