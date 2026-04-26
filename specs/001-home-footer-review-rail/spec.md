# Feature Specification: Home Footer Scope and Review Rail Navigation

**Feature Branch**: `[001-home-footer-review-rail]`  
**Created**: 2026-04-26  
**Status**: Draft  
**Input**: User description: "Update the current layout and navigation behavior so the footer is Home-only and review child navigation uses full-height vertical black bars that preserve current lateral page transitions."

## Clarifications

### Session 2026-04-26

- Q: On Home, should the footer remain visible after first reveal, or only while the user is in the footer segment of the scroll flow? -> A: Footer is visible only when Home scroll reaches the footer zone and hides again when user scrolls away.
- Q: Should full-height right-side black bars also be used on small mobile screens? -> A: Use full-height right-side bars on desktop/tablet, with a mobile-optimized navigation pattern on small screens.
- Q: Which mobile-optimized chapter navigation pattern should be used on small screens? -> A: Use a horizontal strip of black bars, one per child page.

## User Scenarios and Testing (mandatory)

### User Story 1 - Home-Only Footer Visibility (Priority: P1)

As a site visitor, I want the footer to appear only in the Home experience so internal editorial pages stay focused and uncluttered.

**Why this priority**: This is the clearest global behavior change and affects every route transition.

**Independent Test**: Open Home and multiple internal routes, then verify footer rendering and scroll-triggered appearance behavior route-by-route.

**Acceptance Scenarios**:

1. **Given** the user is on Home at initial load, **When** they have not progressed through the Home scroll flow, **Then** the footer is not yet visible.
2. **Given** the user scrolls through Home, **When** they reach the footer segment of that flow, **Then** the footer appears as part of Home scrolling.
3. **Given** the user scrolls away from the Home footer segment, **When** the footer segment is no longer in view, **Then** the footer hides again.
4. **Given** the user is on Reviews, Chapters, Articles, Manifesto, Contact, or any other internal page, **When** they scroll the page, **Then** the footer remains hidden.

---

### User Story 2 - Structural Review Rail Navigation (Priority: P1)

As a reader on a review chapter page, I want a minimal right-side rail made of full-height black bars so I can jump to any child section without a traditional index list.

**Why this priority**: This is the primary navigation redesign for the review reading surface.

**Independent Test**: Open a review chapter with multiple child pages, click each bar, and verify the URL and active content match the selected child page.

**Acceptance Scenarios**:

1. **Given** a review chapter contains N child pages, **When** the chapter view renders, **Then** exactly N vertical black bars are shown on the right rail.
2. **Given** the user clicks a specific bar, **When** navigation resolves, **Then** the matching child page/section is displayed and route state updates correctly.
3. **Given** the user navigates across child pages, **When** page transitions occur, **Then** the existing lateral transition behavior remains intact.
4. **Given** the user is on a small-screen viewport, **When** chapter navigation is shown, **Then** a horizontal strip of black bars (one per child page) is used instead of full-height right-side bars.

---

### User Story 3 - Extensible Chapter Composition (Priority: P2)

As an editor or maintainer, I want child-page navigation to scale automatically so adding future review pages does not require redesigning the rail.

**Why this priority**: The new pattern must remain maintainable as chapter length and count grow.

**Independent Test**: Add one additional child page entry to a chapter definition and verify a corresponding bar appears and navigates correctly without bespoke layout changes.

**Acceptance Scenarios**:

1. **Given** a chapter gains a new child page, **When** the chapter is rendered, **Then** a new bar is included automatically in the rail.
2. **Given** the new bar is selected, **When** navigation completes, **Then** the newly added child page is shown using the same transition system.

## Edge Cases

- User lands directly on a deep review child URL; the correct bar is still represented as selected/current.
- User rapidly clicks multiple bars; navigation settles on the last selected child page without broken state.
- First and last child pages keep existing boundary behavior for previous/next controls.
- Internal pages that share layout shell elements do not accidentally inherit Home footer visibility.
- Very tall or very short desktop/tablet viewport heights still render bars from top to bottom of the visible viewport area.
- Small-screen viewports preserve child-page navigation using a horizontal bar strip without forcing full-height right-side bar layout.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: System MUST scope footer rendering to Home only by default.
- **FR-002**: System MUST reveal the footer only while the Home footer segment is reached/in view within the existing Home scroll progression.
- **FR-003**: System MUST keep footer fully hidden on Reviews, Chapters, Articles, Manifesto, Contact, and all other internal pages unless explicitly enabled by a future requirement.
- **FR-004**: System MUST replace the current right-side review index-style navigation with a bar-based structure.
- **FR-005**: System MUST render one vertical black bar per child page/section in the active review chapter.
- **FR-006**: System MUST render each bar to span from top to bottom of the viewport height on desktop/tablet layouts.
- **FR-007**: System MUST navigate to the corresponding child page/section when a bar is activated.
- **FR-008**: System MUST preserve existing lateral scroll/page transition behavior for review child pages.
- **FR-009**: System MUST provide a clear active-state indicator for the currently selected child page while preserving a minimal, structural visual language.
- **FR-010**: System MUST keep chapter rail generation modular so future child pages are represented without per-page rail rewrites.
- **FR-011**: System MUST use a horizontal strip of black bars on small screens, with one bar per child page, instead of full-height right-side bars.

### Accessibility and Interaction Requirements

- **AIR-001**: Bar navigation MUST remain keyboard reachable and operable.
- **AIR-002**: Current-page state in the bar rail MUST be programmatically exposed for assistive technologies.
- **AIR-003**: Click/touch targets in both desktop/tablet bar rail and small-screen horizontal bar strip MUST be reliably selectable across supported viewport sizes.

### Key Entities

- **HomeFooterVisibilityState**: Route-scoped state defining whether footer can render, with Home as enabled and internal routes as disabled by default.
- **ChapterRailBar**: Navigation control representing one review child page/section, including target route and active-state metadata.
- **ChapterChildPage**: Ordered review segment with stable route identity used by both lateral transitions and bar navigation.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: In route-level QA covering Home and at least six internal pages, footer visibility is observed only on Home and never on internal pages.
- **SC-002**: In chapter QA, 100% of child pages are represented by one corresponding bar control (full-height right-rail on desktop/tablet, horizontal strip on small screens), and each bar activates its matching child route.
- **SC-003**: Existing lateral navigation inputs (scroll-driven and directional navigation) continue to move between child pages without regression in expected route progression.
- **SC-004**: Adding a new child page to an existing chapter results in a new navigable bar without bespoke rail markup changes.

## Assumptions

- Home already has, or will keep, a scroll flow where footer appearance can be tied to progression.
- Review chapters continue to use an ordered child-page model with stable route slugs.
- The immediate visual style for the new rail is intentionally minimal: solid black bars and simple active differentiation.
- Future internal-page footer enablement, if needed, will be introduced through an explicit requirement change.
