# Data Model: Home Navigation and Review Spacing Fixes

## Entity: NavMenuToggleState

Purpose: Represents the synchronized state of burger/X icon and menu overlay visibility.

Fields:

- `isOpen` (boolean): Whether the navigation overlay is currently open.
- `toggleVisualState` (enum): `burger` or `close`.
- `lastInteractionType` (enum): `toggle_click`, `menu_link_navigation`, `escape`, or `outside_click`.

State transitions:

- `closed -> open` on toggle activation.
- `open -> closed` on toggle activation.
- `open -> closed` immediately on menu-link navigation trigger.

Validation rules:

- `isOpen=true` MUST map to `toggleVisualState=close`.
- `isOpen=false` MUST map to `toggleVisualState=burger`.
- No intermediate state may persist after navigation trigger.

## Entity: BrandHomeLink

Purpose: Defines route behavior for the site title ("SecondPeak") in the global header.

Fields:

- `label` (string): Display title text.
- `targetRoute` (string): Home route path (`/`).
- `isInteractive` (boolean): Whether the brand element is operable as a navigation control.

Validation rules:

- `targetRoute` MUST always resolve to Home.
- Control MUST remain operable by pointer, keyboard, and touch inputs.

## Entity: ReviewRailLayoutSurface

Purpose: Describes the combined layout boundary between chapter rail and chapter content.

Fields:

- `hasVisualGap` (boolean): Whether any seam/spacing exists between rail and content.
- `interstitialSpacingPx` (number): Measured spacing between rail and content surfaces.
- `breakpointMode` (enum): `desktop_tablet` or `mobile`.

Validation rules:

- `hasVisualGap` MUST be `false` in all breakpoint modes.
- `interstitialSpacingPx` MUST equal `0` in all breakpoint modes.

## Entity: HomeFooterTriggerZone

Purpose: Encodes Home footer activation behavior based on scroll progression.

Fields:

- `activationStartPercent` (number): Start of activation window as percentage of Home scroll progression.
- `activationEndPercent` (number): End of activation window as percentage of Home scroll progression.
- `isInActivationWindow` (boolean): Current derived trigger state.

State transitions:

- `inactive -> active` when progression reaches `>= 90%`.
- `active -> inactive` when progression drops below `90%`.

Validation rules:

- Activation window MUST map to the final 10% of Home scroll progression (`90%-100%`).
- Footer visibility outside activation window MUST remain disabled.
