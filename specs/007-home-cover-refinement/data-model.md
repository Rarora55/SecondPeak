# Data Model: Home Cover Refinement

## Entities

## HomeHeader

- Purpose: Defines the top publication bar that frames the Home cover.
- Fields:
  - `publicationTitle` (string, required): Brand text shown on the left side of the header.
  - `issueNumber` (string, required): Issue identifier shown in header metadata.
  - `issueDateLabel` (string, required): Human-readable publication date shown in header metadata.
  - `isLink` (boolean, required): Whether the brand is implemented as a navigable link.
  - `interactionState` (`default | hover | focus`, required): Current visual state of the brand treatment.
- Validation:
  - Header content must remain visible and readable across supported breakpoints.
  - Logo interaction may change brand styling only and must not shift header layout.

## CoverComposition

- Purpose: Represents the centered Home cover block shared between closed and open states.
- Fields:
  - `image` (HomeCoverImage, required): Central issue image.
  - `coverTitle` (string, required): Issue title shown beneath the image.
  - `toggleState` (CoverToggleState, required): Current expanded/collapsed presentation state.
  - `widthProfile` (string, required): Responsive width rule used to size the cover block.
  - `verticalAlignmentMode` (`centered | top-shifted`, required): Overall layout mode used to keep the composition balanced by state.
- Validation:
  - The cover title must remain visually attached to, but not touching, the image.
  - Closed and open states must preserve the same core cover identity.

## HomeCoverImage

- Purpose: Stores the shared cover image contract already supplied by the Home version registry.
- Fields:
  - `src` (string, required): Main image asset source.
  - `alt` (string, required): Accessible image description.
  - `aspectRatio` (string, required): Stable ratio used by the layout.
  - `treatment` (string, required): Paper-faded visual treatment profile.
- Validation:
  - Image must remain the dominant visual anchor in both states.
  - Treatment must stay quiet and integrated with the paper background.

## CoverToggleState

- Purpose: Models the local Home interaction state for topic reveal behavior.
- Fields:
  - `isExpanded` (boolean, required): Whether the topics are currently shown.
  - `ariaExpanded` (boolean, required): Assistive-technology state exposed by the toggle button.
  - `chevronDirection` (`up | down`, required): Visual direction associated with the current state.
  - `entryAnimationPlayed` (boolean, required): Whether the one-time Home route fade has already occurred for the current route entry.
- Validation:
  - Expanded and collapsed states must remain synchronized between visible layout and accessibility state.
  - Chevron direction must invert clearly between closed and open states.

## TopicPreviewGroup

- Purpose: Represents the revealed editorial preview area beneath the cover block.
- Fields:
  - `topics` (`HomeCoverTopic[3]`, required): The three existing editorial topic previews.
  - `layoutMode` (`desktop-columns | tablet-columns | stacked`, required): Responsive arrangement of the previews.
  - `visibilityState` (`hidden | entering | visible | exiting`, required): Current visual lifecycle of the topics block.
  - `containerWidthProfile` (string, required): Responsive width contract relative to the cover block.
- Validation:
  - Exactly three topics remain in scope.
  - The layout must avoid horizontal overflow and remain readable at all supported breakpoints.

## HomeCoverTopic

- Purpose: Represents one editorial preview already defined in the existing Home registry.
- Fields:
  - `id` (string, required): Stable topic identifier.
  - `title` (string, required): Topic headline.
  - `description` (string, required): Supporting teaser copy.
  - `href` (string, required): Direct editorial destination URL.
  - `section` (string, required): Editorial route family.
- Validation:
  - Topic content remains unchanged by this refinement.
  - All topic destinations must remain directly accessible by URL.

## Relationships

- HomeHeader `1:1` CoverComposition.
- CoverComposition `1:1` HomeCoverImage.
- CoverComposition `1:1` CoverToggleState.
- CoverComposition `1:1` TopicPreviewGroup.
- TopicPreviewGroup `1:3` HomeCoverTopic.

## State Rules

- Closed state: HomeHeader, HomeCoverImage, cover title, and centered toggle are visible; TopicPreviewGroup is fully collapsed.
- Open state: The same header and cover identity remain visible while CoverComposition scales down and TopicPreviewGroup becomes visible beneath it.
- Route-entry state: The calm Home fade may occur once on initial route entry only.
- Toggle transition state: Expanding/collapsing topics may animate subtly, but must not replay the full route-entry fade.
- Responsive state: Desktop favors three columns, tablet keeps multi-column only when readable, and mobile falls back to a stacked topic flow.
- Regression state: Home metadata ownership, version fallback behavior, and linked destination routes remain unchanged by this refinement.
