# Feature Specification: Home Cover Refinement

**Feature Branch**: `[007-home-cover-refinement]`
**Created**: 2026-06-07
**Status**: Draft
**Input**: User description: "Refine the current SecondPeak Home page implementation so the approved editorial cover direction is preserved while fixing header width, spacing, expanded-state scaling, centering, logo hover behavior, arrow behavior, responsive layout, and route-entry fade-in."

## User Scenarios and Testing (mandatory)

### User Story 1 - Land on a balanced editorial cover (Priority: P1)

A visitor opening the Home page sees the existing editorial cover language preserved, but with a header that properly spans the viewport, a centered main composition, and cleaner spacing between the image and the SILENCE title.

**Why this priority**: The Home page is the publication's first impression, and the requested fixes are mainly about restoring polish and proportional balance without changing the approved visual identity.

**Independent Test**: Open the Home page on desktop and mobile widths and verify that the header feels full-width, the logo remains on the left, the issue metadata remains on the right, the divider aligns with that same responsive width, and the image-title-arrow composition appears visually centered in the viewport.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Home page, **When** the route finishes loading, **Then** the header spans the available viewport width with responsive inner spacing rather than appearing as a fixed-width strip.
2. **Given** the Home page is in the closed state, **When** the visitor views the main composition, **Then** the image, SILENCE title, and arrow appear vertically balanced as a single centered group.
3. **Given** the visitor views the cover title beneath the image, **When** the title renders, **Then** a small visible gap separates it from the image while keeping the two elements visually connected.

---

### User Story 2 - Expand the cover without losing the composition (Priority: P1)

A visitor can reveal the three existing subtopics and still comfortably understand the cover as one composed page. When the topic section opens, the image and title subtly reduce in scale and spacing so the expanded group remains readable within the initial viewport whenever the viewport size allows.

**Why this priority**: The current problem is not whether the topics appear, but that the opened state no longer reads as a coherent editorial layout.

**Independent Test**: From the default Home page state, expand the topic section on a common laptop-sized viewport and confirm that the image, title, arrow, and all three topic previews remain visible together without immediate scrolling; collapse the section again and confirm the larger closed presentation returns.

**Acceptance Scenarios**:

1. **Given** the Home page is in the closed state, **When** the visitor activates the expand control, **Then** the same three subtopics appear beneath the title and the main image-title block becomes slightly smaller to make room for them.
2. **Given** the Home page is in the open state, **When** the visitor views the page on a supported desktop or tablet viewport, **Then** the full expanded composition remains visually balanced as one group rather than feeling cropped or bottom-heavy.
3. **Given** the Home page is in the open state, **When** the visitor activates the same control again, **Then** the subtopics collapse completely and the larger closed-state composition returns.

---

### User Story 3 - Experience polished interactions across devices (Priority: P2)

A visitor experiences restrained, readable interactions across desktop, tablet, and mobile: the logo responds only on hover/focus, the arrow clearly communicates open and closed states, the topic layout reflows cleanly on smaller screens, and route entry retains a calm fade-in without replaying on every toggle.

**Why this priority**: The requested improvements are heavily interaction- and proportion-driven, so the experience must feel intentional across viewports and input methods.

**Independent Test**: Verify the Home page on desktop, tablet, and mobile widths, including keyboard navigation, pointer hover on the logo, expand/collapse behavior, and reduced-motion behavior.

**Acceptance Scenarios**:

1. **Given** the visitor hovers or focuses the logo, **When** the interaction state changes, **Then** only the logo treatment changes and the rest of the header remains visually stable.
2. **Given** the visitor uses the expand control, **When** the page changes state, **Then** the arrow direction clearly reflects whether the topic section is closed or open.
3. **Given** the visitor views the expanded topics on a narrow screen, **When** the multi-column layout becomes too tight, **Then** the topics reflow into a simpler readable arrangement without overflow.
4. **Given** the visitor enters the Home route, **When** the page first appears, **Then** the route uses a calm fade-in; **and** given the visitor later expands or collapses the topics, **when** the page state changes, **then** that route-entry fade does not replay.

## Edge Cases

- On very wide screens, the header should still feel attached to the viewport instead of collapsing into a narrow fixed-width island.
- If the visitor rapidly toggles the expand control, the page should resolve cleanly to the most recent requested state with no overlapping topic content.
- If topic copy wraps onto additional lines, the columns or stacked layout should remain balanced and readable.
- If the viewport is too short to keep the full expanded composition visible, the page should still preserve readable spacing and prioritise the image-title-topics relationship without broken layout.
- If reduced-motion preferences are enabled, state changes should remain understandable without relying on pronounced movement.
- If the logo is used as a link, its hover and focus behavior should not reduce legibility or make its destination ambiguous.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The Home page MUST preserve the approved editorial visual language, including the warm paper-like background, faded cover image treatment, low-opacity SILENCE title, serif editorial typography, restrained orange accent use, and calm minimal tone.
- **FR-002**: The Home page MUST continue using the current cover composition as its base structure rather than replacing it with a different visual concept.
- **FR-003**: The publication header MUST span the available viewport width and use responsive horizontal spacing so it feels connected to the viewport across screen sizes.
- **FR-004**: The publication logo MUST remain aligned to the left side of the header, and the issue/date metadata MUST remain aligned to the right side of the header.
- **FR-005**: The horizontal divider beneath the header MUST align to the same responsive content width as the header itself.
- **FR-006**: The main cover image MUST remain centered as the primary visual anchor of the Home page.
- **FR-007**: The SILENCE title MUST remain directly beneath the main image with a small but visible separation that keeps the two elements visually connected without touching.
- **FR-008**: In the closed state, the image, SILENCE title, and expand control MUST appear vertically balanced within the initial viewport without excessive empty space below the composition.
- **FR-009**: The expand control MUST remain centered beneath the SILENCE title in both closed and open states.
- **FR-010**: The expand control MUST use a minimal chevron-style presentation and MUST clearly indicate opposite directions for the closed and open states.
- **FR-011**: Activating the expand control MUST reveal the same three editorial subtopics already approved for this Home cover.
- **FR-012**: Activating the expand control a second time MUST collapse the topic section completely and return the page to the closed cover presentation.
- **FR-013**: When the topic section is open, the main image-title composition MUST reduce in overall scale and spacing enough to keep the expanded presentation readable as one composed group.
- **FR-014**: On supported desktop and tablet viewports, the open state SHOULD present the image, title, control, and three topic previews within the initial viewport without requiring immediate scrolling.
- **FR-015**: The expanded topic section MUST appear centered beneath the cover block and use three columns on desktop-sized viewports when readability permits.
- **FR-016**: On narrower viewports, the topic section MUST reflow into a simpler arrangement that preserves readability and avoids horizontal overflow.
- **FR-017**: The logo MUST provide a distinct hover and focus treatment that changes only the logo itself while preserving the dot as a separate accent element.
- **FR-018**: The logo interaction treatment MUST not alter the layout, alignment, or styling of unrelated header content.
- **FR-019**: The Home page MUST retain a calm page-entry fade when the visitor enters the route for the first time.
- **FR-020**: The page-entry fade MUST NOT replay when the visitor only expands or collapses the topic section.
- **FR-021**: The three existing subtopic titles and descriptions MUST remain unchanged by this refinement feature.
- **FR-022**: The refinement MUST NOT shift the Home page toward a more colorful, cinematic, crowded, aggressive, or commercial visual tone.

### Accessibility and Motion Requirements

- **AM-001**: The expand/collapse control MUST be keyboard accessible, touch accessible, and programmatically expose its current expanded or collapsed state.
- **AM-002**: If the logo acts as a navigation link, it MUST remain keyboard focusable and its interactive purpose MUST remain clear to assistive technologies.
- **AM-003**: Reading order in both closed and open states MUST remain logical for assistive technologies.
- **AM-004**: Reduced-motion preferences MUST preserve the Home page's full usability and state clarity without relying on pronounced animation.
- **AM-005**: Hover-only visual changes MUST have an equivalent accessible focus treatment for keyboard users.

### Performance Requirements

- **PERF-001**: The Home page MUST preserve smooth visual state changes without obvious layout jank during expand or collapse.
- **PERF-002**: The page-entry fade and state transitions MUST remain subtle and must not make the route feel sluggish or visually noisy.
- **PERF-003**: Responsive header and expanded-state layout changes MUST not introduce visible overflow, clipping, or unstable reflow on supported viewports.

### Key Entities (include if feature involves data)

- **HomeHeader**: The top-of-page publication bar containing the SecondPeak logo, issue label, date, and matching divider.
- **CoverComposition**: The centered grouping of the main image, SILENCE title, and expand control that defines the Home page's primary visual hierarchy.
- **CoverState**: The two presentation modes of the Home page, consisting of the closed cover state and the expanded topic-preview state.
- **TopicPreviewGroup**: The revealed set of three editorial topic previews shown beneath the cover composition in the open state.
- **LogoInteractionState**: The default, hover, and focus appearance of the SecondPeak logo without affecting unrelated header elements.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: In manual QA on desktop, tablet, and mobile breakpoints, the header appears full-width and visually connected to the viewport in 100% of reviewed Home page sessions.
- **SC-002**: In manual QA on at least one common laptop-sized viewport, the open state shows the image, title, control, and all three topic previews together without immediate scrolling.
- **SC-003**: In manual QA, the expand/collapse interaction succeeds on the first attempt for pointer, touch, and keyboard input in both directions.
- **SC-004**: In manual QA, the route-entry fade occurs on initial Home page entry but does not replay during topic toggle interactions.
- **SC-005**: In reduced-motion testing, the Home page remains fully understandable and usable in both closed and open states.

## Assumptions

- This refinement applies to the current Home page implementation produced by the existing cover rebuild work rather than replacing that feature with a new concept.
- The provided visual reference folders continue to define the approved editorial direction and are used only to preserve that direction while correcting layout and interaction issues.
- The main image asset and the three existing topic previews remain approved and do not need new editorial copy as part of this refinement.
- The Home page continues to operate as a public editorial landing page with the same route and destination links already defined in prior Home-cover work.
