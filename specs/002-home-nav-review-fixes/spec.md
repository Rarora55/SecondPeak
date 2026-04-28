# Feature Specification: Home Navigation and Review Spacing Fixes

**Feature Branch**: `[002-home-nav-review-fixes]`  
**Created**: 2026-04-27  
**Status**: Draft  
**Input**: User description: "ICON nav burger does not close menu after transforming into X; SecondPeak navbar title should navigate to Home; Reviews section has a black gap between bars and content; Home-to-footer trigger should be smaller."

## Clarifications

### Session 2026-04-27

- Q: What should the Home footer trigger size be? -> A: Trigger only in the last 10% of Home scroll.
- Q: How should the Reviews gap be handled? -> A: Remove the gap entirely.
- Q: When should the menu close during navigation actions? -> A: Close immediately when navigation is triggered.

## User Scenarios and Testing (mandatory)

### User Story 1 - Close Navigation Overlay Reliably (Priority: P1)

As a site visitor, I want the burger/X navigation control to open and close the menu every time so I can continue browsing without getting stuck in the overlay.

**Why this priority**: If the menu cannot close, navigation becomes blocked and the page is effectively unusable.

**Independent Test**: Open the global navigation menu, then close it using the same toggle control across repeated attempts on desktop and mobile-sized viewports.

**Acceptance Scenarios**:

1. **Given** the menu is closed, **When** the user selects the burger icon, **Then** the menu opens and the icon changes to the close state.
2. **Given** the menu is open and the icon is in the close state, **When** the user selects the icon again, **Then** the menu closes and the icon returns to the burger state.
3. **Given** the user opens and closes the menu multiple times in a row, **When** they repeat the toggle action, **Then** each click or tap consistently changes the menu state without becoming unresponsive.
4. **Given** the menu is open, **When** the user activates a navigation link, **Then** the menu closes immediately as navigation is triggered.

---

### User Story 2 - Brand Title Returns to Home (Priority: P1)

As a user on any route, I want selecting the "SecondPeak" navbar title to take me to Home so I always have a predictable route back to the main page.

**Why this priority**: This is a common navigation convention and reduces friction when moving between sections.

**Independent Test**: Navigate to several non-home routes and verify that selecting the navbar brand title always takes the user to Home.

**Acceptance Scenarios**:

1. **Given** the user is on any internal page, **When** they select the "SecondPeak" navbar title, **Then** the app navigates to Home.
2. **Given** the user is already on Home, **When** they select the "SecondPeak" navbar title, **Then** Home remains active with no broken state or visual glitch.

---

### User Story 3 - Remove Review Rail Gap and Tighten Footer Trigger (Priority: P2)

As a reader on Home and Reviews pages, I want layout spacing to be visually continuous so there are no unintended black gaps and the footer appears at a more precise point in Home scrolling.

**Why this priority**: These are polish issues that affect perceived quality and readability but do not block core navigation.

**Independent Test**: Inspect Reviews layouts at common viewport sizes to confirm bars and content are flush with no visible gap, then verify Home footer appears only in the final 10% of Home scroll progression.

**Acceptance Scenarios**:

1. **Given** the user views the Reviews section, **When** bars and content are rendered together, **Then** they share a continuous edge with zero interstitial spacing.
2. **Given** the user changes between supported breakpoints, **When** the Reviews layout reflows, **Then** rail/content seam continuity remains preserved with no visible gap.
3. **Given** the user scrolls Home, **When** they enter the last 10% of Home scroll progression, **Then** the footer appears.
4. **Given** the user scrolls away from the footer trigger region, **When** the trigger is no longer active, **Then** footer visibility returns to the non-trigger state.

## Edge Cases

- Rapid repeated taps on the burger/X control do not leave the menu in a mismatched visual state (for example, icon says close while menu is closed).
- Route changes triggered from inside the open menu close the menu immediately and keep icon/menu state synchronized.
- The navbar title remains operable when keyboard focus is on it and when touch input is used.
- Reviews layout remains seamless at both large desktop widths and narrow mobile widths with no seam introduced by responsive breakpoints.
- The Home footer trigger still activates for users who scroll quickly and for users who scroll in short increments before the final 10% boundary is crossed.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: System MUST allow the global navigation toggle to both open and close the menu using the same control.
- **FR-002**: System MUST keep menu visibility state and toggle icon state synchronized after every user interaction.
- **FR-003**: System MUST allow repeated sequential toggle interactions without entering a non-responsive state.
- **FR-004**: System MUST make the "SecondPeak" navbar title navigate to the Home route from any page.
- **FR-005**: System MUST preserve normal behavior when the navbar title is selected while already on Home.
- **FR-006**: System MUST prevent any visible seam artifact between Reviews navigation bars and adjacent review content surfaces.
- **FR-007**: System MUST preserve seam-free rail/content continuity during responsive breakpoint changes.
- **FR-008**: System MUST activate footer reveal only within the final 10% of Home scroll progression.
- **FR-009**: System MUST preserve existing footer hide behavior outside the active Home trigger zone.
- **FR-010**: System MUST close the menu immediately when any navigation action is triggered from an open menu state.

### Accessibility and Interaction Requirements

- **AIR-001**: Burger/X toggle and navbar title controls MUST remain keyboard-operable and touch-operable.
- **AIR-002**: Menu toggle state changes MUST remain perceivable to assistive technologies through valid interactive semantics.
- **AIR-003**: The Reviews spacing correction MUST not reduce readability or introduce overlapping interactive targets.

### Reduced-Motion Expectations

- Non-essential motion in menu and chapter-adjacent transitions MUST honor user reduced-motion preference while preserving complete interaction flow.

### SEO Expectations

- Public routes affected by this feature MUST preserve existing title/description/canonical behavior without discoverability regressions.

### Resilience Expectations

- Rapid input and route changes MUST not leave stale UI state (for example: stuck menu overlay or incorrect footer visibility state).

### Performance Expectations

- This feature MUST not introduce new heavy runtime dependencies or observable regressions in interaction responsiveness.

### Key Entities

- **NavMenuToggleState**: Interactive state model representing whether the global menu is open or closed and which icon state is shown.
- **BrandHomeLink**: Navbar brand title control that routes users to Home.
- **ReviewRailLayoutSurface**: Visual composition region containing review bars and content where spacing continuity is required.
- **HomeFooterTriggerZone**: Home scroll segment that controls when footer visibility activates.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: In manual QA of 30 consecutive burger/X interactions, the menu opens and closes correctly on every attempt with no stuck state.
- **SC-002**: In route QA across at least five non-home pages, selecting the "SecondPeak" title returns to Home in 100% of attempts.
- **SC-003**: In visual QA at mobile, tablet, and desktop widths, zero visual gap is present between Reviews bars and content.
- **SC-004**: In Home scroll QA, footer activation occurs only in the final 10% of Home scroll and never before that point.
- **SC-005**: In menu-link QA across at least five navigation actions from an open menu, the menu closes immediately on every action with no icon/menu mismatch.

## Assumptions

- Home footer activation is defined as the final 10% of Home scroll progression, while keeping the same overall footer reveal/hide pattern outside that zone.
- Reviews section bars and content are required to be flush with zero spacing between them.
- Existing route structure and naming for Home remain unchanged.

