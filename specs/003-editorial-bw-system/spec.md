# Feature Specification: Editorial Black-and-White Visual System

**Feature Branch**: `[003-editorial-bw-system]`  
**Created**: 2026-04-27  
**Status**: Draft  
**Input**: User description: "Update the website visual system from temporary solid-colour placeholders to a strict black-and-white editorial layout while preserving existing layout, routing, interactions, and content structure."

## Clarifications

### Session 2026-04-27

- Q: Review rail reposition model after selection? -> A: The selected review vertical bar moves from the right rail to the left rail while preserving the same bar identity (shape, size, label, border style, and interaction behavior).
- Q: How should right and left rails coexist during Reviews navigation? -> A: Use a two-sided rail system where only the currently selected review bar renders on the left rail, and all unselected bars remain on the right rail.
- Q: What is the rail policy when a different review bar is selected? -> A: Use `current_only` policy: the newly selected bar moves to the left rail and any previously selected bar returns to the right rail.
- Q: How should keyboard focus be shown in the black-and-white system? -> A: Keep inversion and also show a consistent 2px focus outline with offset on all focusable controls.
- Q: What is the canonical thin border width? -> A: Thin border means exactly 1px across all supported breakpoints.

## User Scenarios and Testing (mandatory)

### User Story 1 - Read in a Consistent Editorial Layout (Priority: P1)

As a visitor, I want every page section to follow one consistent black-and-white editorial style so the site feels intentional and readable instead of showing temporary placeholder colors.

**Why this priority**: This is the foundational visual system change and affects every route and every section.

**Independent Test**: Open each public route and verify all visible sections and blocks use white backgrounds, 1px black borders, and black default text with no temporary solid-color placeholders.

**Acceptance Scenarios**:

1. **Given** a page is loaded, **When** I view any non-highlighted block or section, **Then** its background is white, its border is a thin black line, and its text is black.
2. **Given** I navigate between routes, **When** each page renders, **Then** the visual system remains consistent and no section reverts to temporary solid colors.

---

### User Story 2 - Recognize Interactive State Changes (Priority: P2)

As a visitor using mouse, touch, or keyboard, I want highlighted and selected elements to invert to black background with white text so interaction state is obvious without introducing extra colors.

**Why this priority**: State clarity directly affects navigation confidence and usability.

**Independent Test**: Trigger hover, focus, active, and selected states on navigation items and content blocks (including Home blocks) and verify each eligible element inverts to black background with white text while remaining legible.

**Acceptance Scenarios**:

1. **Given** an interactive block is in default state, **When** it is hovered, focused, active, or selected, **Then** its background becomes black and its text becomes white.
2. **Given** an element leaves highlighted state, **When** the state resets, **Then** it returns to white background, thin black border, and black text.

---

### User Story 3 - Use Review Rail Without Losing Position (Priority: P3)

As a reader in the Reviews section, I want selected review vertical bars to move to a left-side rail while unselected bars remain on the right so I can keep orientation without losing the bar itself.

**Why this priority**: Review navigation must preserve wayfinding during lateral progression without hiding the current position.

**Independent Test**: In Reviews, verify bars default on the right, select different bars, verify the same selected bar appears on the left with unchanged bar form, verify unselected bars remain on the right, and confirm existing page navigation continues to work.

**Acceptance Scenarios**:

1. **Given** I am on a Reviews page, **When** no bar is selected, **Then** review bars are displayed as vertical bars on the right with white background, 1px black border, and black text.
2. **Given** I select a review bar on the right, **When** selection is applied, **Then** that same full vertical bar moves to the left, remains visible, and uses black background with white text.
3. **Given** one bar is currently selected on the left, **When** I select a different review bar, **Then** the newly selected bar appears on the left and the previously selected bar returns to the right as unselected.
4. **Given** a selected bar is shown on the left, **When** I continue navigating review children, **Then** the bar keeps the same vertical-bar aesthetic and is not converted into a horizontal tab/header/breadcrumb.

## Edge Cases

- Keyboard-only navigation across Home blocks and review bars shows both inversion and a visible 2px offset focus outline.
- Touch-only devices with no hover support still show correct active and selected inversion states.
- Extremely long labels in blocks or bars remain readable in both default and inverted states.
- Changing viewport size (desktop/tablet/mobile) after selecting a review bar keeps the current selected bar on the left and unselected bars on the right without overlap.
- Leaving Reviews and returning restores default right-side bar presentation until a new selection occurs.
- Rapid navigation between review children does not cause selected bars to disappear or break lateral page progression.
- Users with reduced-motion preferences receive an equivalent readable experience without essential motion for navigation comprehension.
- Affected routes retain readable loading, empty, and error states under the black-and-white visual system.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The system MUST replace all temporary solid-color section and block backgrounds with a black-and-white editorial style.
- **FR-002**: The default page background MUST be white.
- **FR-003**: Each non-highlighted section and block MUST render with white background, 1px black border, and black text by default.
- **FR-004**: Border weight MUST be exactly 1px and border color MUST be black across routes and sections in default state.
- **FR-005**: Hovered, focused, active, highlighted, and selected interactive elements MUST invert to black background and white text.
- **FR-006**: HomePage selectable section blocks MUST keep existing layout and click behavior while adopting the global default and inversion states.
- **FR-007**: In Reviews, vertical bars representing article pages/children MUST use white background, 1px black border, and black text in default state.
- **FR-008**: In Reviews, a hovered, focused, active, or selected vertical bar MUST invert to black background and white text.
- **FR-009**: In Reviews default state, all review child/page bars MUST render as vertical bars on the right rail.
- **FR-010**: When a review bar is selected, that same bar MUST move from the right rail to the left rail and MUST remain visible as a full vertical bar.
- **FR-011**: A bar moved to the left rail MUST keep the same dimensions, orientation, label treatment, border style, and interaction logic as before selection.
- **FR-012**: Only the currently selected review bar MUST render on the left rail, and all unselected bars MUST render on the right rail.
- **FR-013**: The selected left-rail bar MUST NOT disappear, collapse, or be replaced by a different UI component type (including header, tab, breadcrumb, hidden state, or index/sidebar substitute).
- **FR-014**: Review vertical bar selection and side repositioning MUST preserve existing lateral scrolling and route navigation behavior for review child/pages.
- **FR-015**: Existing routing structure, review URL structure, page hierarchy, and content entities (sections, blocks, review pages, article children) MUST remain intact.
- **FR-016**: The feature MUST NOT remove or alter the existing CMS/block-editable architecture.

### Accessibility and Motion Requirements

- **AM-001**: All updated interactive elements MUST remain keyboard and touch accessible.
- **AM-002**: Focused controls MUST apply black/white inversion and a consistent 2px focus outline with offset so focus is visually distinct from hover or selected states.
- **AM-003**: Text contrast in both default and inverted states MUST remain readable for standard accessibility expectations.
- **AM-004**: Semantic navigation structure and logical reading order MUST remain unchanged.
- **AM-005**: Non-essential motion in affected flows MUST respect reduced-motion user preference while preserving equivalent navigation clarity and state discoverability.

### Performance Requirements

- **PERF-001**: The styling update MUST NOT introduce noticeable delays in route transitions or interactive state feedback.
- **PERF-002**: Review bar repositioning on selection MUST feel immediate and must not degrade existing page navigation responsiveness.

### SEO and Discoverability Requirements

- **SEO-001**: Existing page metadata behavior (title, description, canonical URL, and Open Graph fields) MUST remain intact for affected routes.
- **SEO-002**: Existing sitemap and robots behavior MUST remain unchanged by this feature.
- **SEO-003**: Review parent/child URLs MUST remain directly reachable and indexable under the existing URL structure.

### Resilience Requirements

- **RES-001**: Affected routes MUST preserve readable loading, empty, and error states after styling and rail-state updates.
- **RES-002**: If review rail data is unavailable or invalid, the interface MUST fail gracefully without overlapping content or breaking primary navigation.
- **RES-003**: Error or empty states in affected routes MUST preserve black-and-white readability and clear recovery/navigation affordances.

### Key Entities (include if feature involves data)

- **Surface Block**: Any section or block container that participates in the global editorial styling rules.
- **Interactive Surface State**: The current state of an interactive surface (`default`, `hover`, `focus`, `active`, `selected`) that determines inversion behavior.
- **Review Vertical Bar**: A Reviews navigation control representing an article page/child with default, highlighted, selected, and positioned-side properties.

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: 100% of visible page sections and layout blocks on supported routes use white background and 1px black borders in default state.
- **SC-002**: 100% of audited interactive states (hover, focus, active, selected) for applicable blocks and navigation elements invert to black background with white text.
- **SC-003**: In Reviews, bars default to the right rail, only the currently selected bar appears on the left rail as the same full vertical bar, and no selected bar disappears in tested article-child navigation flows.
- **SC-004**: Core route navigation and review page progression complete successfully across desktop, tablet, and mobile breakpoints with no regression in behavior.
- **SC-005**: 100% of audited keyboard-focusable controls display the defined 2px offset focus outline in tested routes.
- **SC-006**: 100% of audited default-state sections and blocks render a 1px black border across desktop, tablet, and mobile breakpoints.
- **SC-007**: 100% of audited reduced-motion preference scenarios on affected routes preserve equivalent navigation comprehension and visible state changes without relying on non-essential motion.
- **SC-008**: 100% of audited affected routes retain expected metadata behavior (title, description, canonical URL, Open Graph), and sitemap/robots outputs show no feature-induced regression.
- **SC-009**: 100% of audited loading, empty, and error states on affected routes remain readable, navigable, and visually consistent with the black-and-white system.

## Non-Goals

- Do not remove bars after selection.
- Do not hide the selected bar.
- Do not convert selected bars into a different component pattern.
- Do not replace vertical bars with an index/sidebar-only navigation.
- Do not change the review URL structure.
- Do not change CMS/content ownership or article hierarchy.

## Assumptions

- "Thin border" is defined as 1px across the interface.
- Existing component-level interaction logic and routing contracts remain valid and do not require structural refactors.
- No additional color accents are required for this feature beyond black and white unless already defined as explicit exceptions elsewhere.
