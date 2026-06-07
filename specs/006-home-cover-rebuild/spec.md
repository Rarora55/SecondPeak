# Feature Specification: Home Cover Rebuild

**Feature Branch**: `[006-home-cover-rebuild]`
**Created**: 2026-06-06
**Status**: Draft
**Input**: User description: "Rebuild the SecondPeak Home page following the provided visual references, using the provided MainImage as the central visual and supporting a closed and open editorial cover state."

## Clarifications

### Session 2026-06-06

- Q: Should the three subtopics act as navigation links or remain static previews? → A: Each subtopic is clickable and opens its corresponding article/page.
- Q: If any target article/page is missing, should this feature also create it? → A: This feature must also create any missing article/pages needed for those links.
- Q: Which route structure should the linked article/pages use? → A: Use the existing editorial/article route structure already used in the project.
- Q: Which route families should Topic 2 and Topic 3 use? → A: Topic 2 uses `/features/:articleSlug` and Topic 3 uses `/interviews/:articleSlug`.

## User Scenarios and Testing (mandatory)

### User Story 1 - Land on the editorial cover (Priority: P1)

A visitor opening the Home page sees a quiet editorial cover with the central image, the SILENCE title, the issue header, and a minimal expand indicator. The first impression must feel calm, spacious, and intentional rather than busy or commercial.

**Why this priority**: The Home page is the primary first impression for the publication and must immediately establish the issue identity and visual tone.

**Independent Test**: Open the Home page on a fresh load and verify that only the cover image, header, SILENCE title, and minimal expand indicator are visible before any interaction.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Home page, **When** the route finishes loading, **Then** the page presents the issue header, central cover image, SILENCE title, and a minimal expand indicator in a calm editorial layout.
2. **Given** the Home page is in its default state, **When** the visitor has not interacted with the page, **Then** no subtopic cards or supporting article summaries are shown.

---

### User Story 2 - Expand to preview the issue topics (Priority: P1)

A visitor can expand the cover to reveal the featured subtopics for the issue without leaving the page. The expanded content remains centered beneath the image and title, each subtopic can open its corresponding article/page, any missing linked article/page is included in this feature scope, and the topic area can be collapsed again from the same control.

**Why this priority**: The reveal interaction is the main functional behavior of the requested redesign and is necessary to connect the cover treatment to the issue's editorial content.

**Independent Test**: From the default Home page state, activate the expand indicator and confirm that three centered topic columns appear beneath the title; activate the same control again and confirm the page returns to the closed cover state.

**Acceptance Scenarios**:

1. **Given** the Home page is in the closed state, **When** the visitor activates the expand control, **Then** the page reveals the three issue subtopics beneath the SILENCE title and updates the indicator to show the reversed direction.
2. **Given** the Home page is in the open state, **When** the visitor activates the same control again, **Then** the subtopics are hidden and the page returns to the closed cover presentation.
3. **Given** the subtopics are visible, **When** the visitor reads the topic area, **Then** the three editorial previews remain aligned as centered columns on larger screens and remain readable on smaller screens.
4. **Given** the subtopics are visible, **When** the visitor activates a subtopic, **Then** the visitor is taken to that subtopic's corresponding article/page.

---

### User Story 3 - Experience the cover gracefully across devices and motion settings (Priority: P2)

A visitor experiences the Home page as refined and readable across desktop, tablet, and mobile screens, with restrained motion that supports the editorial mood and does not overwhelm the content.

**Why this priority**: The visual direction depends on pacing, spacing, and readability; those qualities must hold across viewports and for visitors who prefer reduced motion.

**Independent Test**: Verify the Home page on desktop, tablet, and mobile widths, and confirm that the page remains legible, the reveal interaction remains usable, and motion is softened or minimized when reduced-motion preferences are enabled.

**Acceptance Scenarios**:

1. **Given** a visitor loads the Home page on any supported screen size, **When** the cover renders, **Then** the image, title, header, and control remain centered, readable, and visually balanced.
2. **Given** a visitor expands the topic area, **When** the reveal animation plays, **Then** the motion is subtle and calm rather than abrupt or dramatic.
3. **Given** a visitor has requested reduced motion, **When** the Home page loads or changes between states, **Then** the page still communicates state changes clearly without relying on pronounced animation.

## Edge Cases

- If the main cover image cannot be displayed, the page should preserve the layout and continue showing the issue title, metadata, and expand behavior without breaking the editorial presentation.
- If the visitor rapidly toggles the expand control, the page should always settle into the most recent requested state without duplicated or overlapping content.
- If a topic title or description wraps across additional lines, the column layout should remain readable and visually balanced.
- If the viewport is too narrow for three readable columns, the topic previews should reflow into a simpler readable stack.
- If motion preferences limit animation, the distinction between closed and open states must still be obvious from layout and indicator direction alone.
- If one or more destination article/pages do not yet exist, this feature must provide those destinations rather than leaving the subtopic links unresolved.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The Home page MUST present a default closed cover state on initial load.
- **FR-002**: The closed cover state MUST show only the issue header, the central main image, the SILENCE title, and a minimal expand indicator beneath the title.
- **FR-003**: The Home page MUST use the provided MainImage asset as the primary central visual for this issue cover.
- **FR-004**: The Home page MUST include the publication header with SecondPeak branding on the left and the issue metadata "Issue 01" and "Julio 2026" on the right.
- **FR-005**: The Home page MUST provide a single expand/collapse control directly beneath the SILENCE title.
- **FR-006**: Activating the expand/collapse control MUST toggle between the closed and open visual states without navigating away from the Home page.
- **FR-007**: In the open state, the Home page MUST retain the same central image and SILENCE title shown in the closed state.
- **FR-008**: In the open state, the Home page MUST reveal exactly three featured subtopics centered beneath the image and title block.
- **FR-009**: The three featured subtopics MUST use the following editorial content:
- **FR-009a**: Topic 1 title: "El silencio de Far: Lone Sails"
- **FR-009b**: Topic 1 text: "Cómo el videojuego enseña preguntas que somos nosotros quienes tendremos que responder."
- **FR-009c**: Topic 2 title: "El terror en 2d"
- **FR-009d**: Topic 2 text: "El viaje a la solución de una mecánica complicada, los rebeldes del teatro."
- **FR-009e**: Topic 3 title: "Quiénes son los nuevos"
- **FR-009f**: Topic 3 text: "Hablamos de Wych Elm y su nuevo juego Silver Pines."
- **FR-009g**: Topic 2 destination route: `/features/:articleSlug`
- **FR-009h**: Topic 3 destination route: `/interviews/:articleSlug`
- **FR-010**: Each featured subtopic MUST display a distinct editorial title and supporting text in a calm, minimal presentation.
- **FR-011**: Each featured subtopic MUST include a visible vertical accent marker aligned with its title.
- **FR-012**: The expand indicator MUST visually change direction between the closed and open states.
- **FR-013**: The expand indicator MUST remain minimal in form and communicate that the topic area can be revealed or hidden.
- **FR-014**: The Home page background MUST be generated without using a background image and MUST convey a quiet paper-like editorial texture.
- **FR-015**: The Home page visual design MUST preserve a minimal editorial magazine character and MUST avoid loud, cinematic, aggressive, or overtly commercial styling.
- **FR-016**: The issue title "SILENCE" MUST remain directly attached to the bottom edge of the main image with little or no visual gap.
- **FR-017**: The issue title MUST read as wide, heavy, quiet, and softly integrated into the cover image rather than as a sharp or dominant headline.
- **FR-018**: The main image treatment MUST feel faded and integrated with the paper-like page background rather than appearing glossy or high-contrast.
- **FR-019**: Each featured subtopic MUST act as a navigation link to its corresponding article/page.
- **FR-020**: This feature MUST include creation of any missing destination article/pages required by the three featured subtopic links.
- **FR-021**: The three featured subtopic destinations MUST use the existing editorial/article route structure already established in the project.
- **FR-022**: Topic 2 MUST resolve through the `/features/:articleSlug` route family.
- **FR-023**: Topic 3 MUST resolve through the `/interviews/:articleSlug` route family.

### Accessibility and Motion Requirements

- **AM-001**: The expand/collapse control MUST be keyboard accessible and touch accessible.
- **AM-002**: The current state of the expand/collapse control MUST be programmatically exposed to assistive technologies.
- **AM-003**: The Home page reading order MUST remain logical for assistive technologies in both closed and open states.
- **AM-004**: Initial page appearance, state changes, and content reveal MUST remain understandable when motion is reduced or disabled.
- **AM-005**: Decorative visual treatments MUST not prevent text from remaining legible against the background and image.

### Performance Requirements

- **PERF-001**: The initial Home page load MUST present the core cover composition without noticeable delay on a standard broadband connection.
- **PERF-002**: Expanding or collapsing the topic area MUST feel smooth and immediate to the visitor.
- **PERF-003**: Visual transitions MUST remain subtle and must not cause obvious layout instability during the state change.

### Key Entities (include if feature involves data)

- **HomeCoverState**: The current presentation mode of the Home page, consisting of a closed cover state and an open topic-preview state.
- **IssueHeader**: The visible publication identity and issue metadata shown at the top of the Home page.
- **FeaturedTopic**: A single editorial preview containing a title, supporting description, and accent marker within the open state.
- **CoverVisual**: The main issue image and SILENCE title pairing that anchors both visual states.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: On first load, 100% of reviewed Home page sessions show the closed cover state before any user interaction.
- **SC-002**: In manual QA across desktop, tablet, and mobile breakpoints, all three topic previews remain readable and visually organized when the page is expanded.
- **SC-003**: In manual QA, the expand/collapse interaction succeeds on the first attempt for keyboard, pointer, and touch input.
- **SC-004**: In manual QA, the Home page transitions are consistently described as subtle and calm rather than abrupt or visually distracting.
- **SC-005**: In reduced-motion testing, the Home page remains fully usable and the difference between closed and open states remains clear without relying on pronounced animation.

## Assumptions

- The provided visual reference folders define the intended editorial mood and composition for the redesign.
- The provided MainImage asset is approved for use as the sole central image on the Home page.
- The requested redesign applies to the existing Home route rather than creating a separate alternate landing page.
- The three provided featured subtopics are the complete set of editorial previews required for this issue cover.
- Existing editorial/article routing conventions are available for reuse by the three linked destination pages.
- Topic 1 continues to reuse the existing reviews chapter route, while Topics 2 and 3 use feature and interview article routes respectively.
