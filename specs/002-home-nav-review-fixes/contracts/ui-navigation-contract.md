# Contract: UI Navigation and Layout Behavior

## Contract Scope

This contract defines required user-facing behavior for:

- Global burger/X menu interaction
- Header brand-title Home navigation
- Review rail/content seam handling
- Home footer trigger activation threshold

## Menu Toggle Contract

1. The burger/X control MUST open and close the overlay menu using the same control.
2. Toggle visual state and overlay visibility MUST remain synchronized on every interaction.
3. When a user activates any navigation link from an open menu, the menu MUST close immediately.
4. Repeated rapid interactions MUST not produce a stuck state (for example: close icon while overlay is closed).

## Brand Title Contract

1. The "SecondPeak" header title MUST act as a navigable control to Home (`/`) from all routes.
2. Selecting the title while already on Home MUST not break layout or interactive state.
3. The title control MUST be keyboard-operable and touch-operable.

## Review Seam Contract

1. Review rail and adjacent review content MUST render with zero interstitial spacing.
2. No black seam or any visible gap is permitted between the rail and content surfaces.
3. Zero-spacing behavior MUST hold across desktop, tablet, and mobile breakpoints.

## Home Footer Trigger Contract

1. Footer activation on Home MUST occur only in the final 10% of Home scroll progression.
2. Footer MUST remain hidden before the 90% progression threshold.
3. Footer MUST hide again when scroll progression exits the activation window.

## Verification Checkpoints

- [ ] 30 consecutive menu toggle interactions complete without stuck or mismatched state.
- [ ] In-menu navigation action closes menu immediately on each tested route change.
- [ ] Header title navigates to Home from at least five non-home routes.
- [ ] Review rail/content seam remains at zero spacing across mobile/tablet/desktop.
- [ ] Home footer appears only in final 10% of Home scroll and not before.
