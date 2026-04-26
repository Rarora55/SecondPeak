# Contract: Navigation and Footer Behavior

## Contract Scope

This contract defines expected route and interaction behavior for:

- Home-only footer visibility
- Chapter child-page bar navigation on desktop/tablet and mobile

## Route/Footer Contract

1. Footer is eligible to render only on Home route context.
2. On Home, footer is visible only while Home footer zone is in view.
3. On non-Home routes (Reviews, Chapters, Articles, Manifesto, Contact, and other internal routes), footer must remain hidden.

## Chapter Bar Contract

1. For any chapter with `N` child pages, render exactly `N` bar controls.
2. Desktop/tablet layout mode:
   - Controls are full-height black bars on the right rail.
   - Each control maps to exactly one child page slug.
3. Small-screen layout mode:
   - Controls are presented as a horizontal strip of black bars.
   - The same one-control-per-child-page mapping must be preserved.
4. Activating any bar must navigate to its mapped child page route.
5. Active bar state must reflect current route slug in both layout modes.

## Transition Preservation Contract

1. Existing lateral chapter transitions remain route-driven and intact.
2. Existing wheel/scroll/keyboard/previous-next chapter progression behavior must continue to function.
3. Bar activation must not bypass or break chapter route synchronization.

## Accessibility Contract

1. Bar controls must be keyboard reachable and operable.
2. Active/current state must be programmatically exposed.
3. Touch targets must be reliably selectable in both desktop/tablet and mobile modes.

## Implementation Checkpoints

- [ ] Home route is the only route that can render footer.
- [ ] Home footer visibility toggles with footer-zone in-view state.
- [ ] Desktop/tablet chapter rail renders full-height black bars (one per child page).
- [ ] Small-screen chapter navigation renders horizontal black bar strip (one per child page).
- [ ] Bar selection updates route slug and active state without breaking existing lateral transitions.
