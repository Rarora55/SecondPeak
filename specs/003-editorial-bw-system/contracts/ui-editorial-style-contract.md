# Contract: UI Editorial Style and Review Rail Behavior

## Contract Scope

This contract defines required user-facing behavior for:

- Global black-and-white visual baseline
- Interactive inversion and focus state rules
- HomePage selectable block behavior
- Reviews rail partition behavior with explicit `current_only` policy
- Reduced-motion compatibility behavior
- SEO/discoverability non-regression behavior
- Route resilience behavior (loading, empty, error)

## Global Visual Baseline Contract

1. Default page background MUST be white.
2. Default section and block surfaces MUST be white with black text and 1px black borders.
3. Placeholder solid-color section backgrounds MUST not remain visible on supported routes.
4. Added visual treatments in this feature MUST remain black-and-white.

## Interactive State Contract

1. Hover, focus, active, highlighted, and selected states MUST invert to black background with white text on eligible controls/surfaces.
2. State reset MUST restore white background, black text, and 1px black border.
3. Focused controls MUST show a visible 2px offset outline.

## HomePage Block Contract

1. Home selectable blocks MUST preserve existing layout and navigation/click behavior.
2. Home block hover/focus/active/selected states MUST follow the global inversion rule.
3. Home readability and responsive integrity MUST be preserved on desktop/tablet/mobile.

## Reviews Rail Contract

1. In default Reviews state, bars MUST render with white background, 1px black border, and black text on the right rail.
2. On selection, that same full vertical bar MUST move from the right rail to the left rail.
3. Rails MUST use `current_only` policy: exactly one currently selected bar on the left; all unselected bars on the right.
4. On selecting a different bar, the newly selected bar MUST move left and the previously selected bar MUST return right.
5. Selected left-rail bars MUST retain the same bar identity (shape, size, label/orientation/border treatment) and render inverted.
6. Selected bars MUST NOT disappear, collapse, or be replaced by headers/tabs/breadcrumbs/hidden states.
7. Rail partition behavior MUST not break existing lateral review navigation behavior.

## Reduced-Motion Contract

1. Non-essential motion in affected flows MUST respect reduced-motion preference.
2. Reduced-motion behavior MUST preserve equivalent state clarity and navigation comprehension.
3. Reduced-motion handling MUST not hide selected/active rail state feedback.

## SEO and Discoverability Contract

1. Existing metadata behavior (title, description, canonical, Open Graph) MUST remain intact for affected routes.
2. Existing sitemap and robots behavior MUST remain unchanged by this feature.
3. Review parent and child URLs MUST remain directly reachable and indexable under existing URL structure.

## Resilience Contract

1. Affected routes MUST preserve readable loading, empty, and error states after updates.
2. If rail data is unavailable or invalid, behavior MUST fail gracefully without overlap or navigation breakage.
3. Error and empty states MUST maintain black-and-white readability and clear recovery affordances.

## Preservation Contract

1. Existing routing structure and page hierarchy MUST remain unchanged.
2. Existing CMS/block-editable architecture MUST remain unchanged.
3. Existing section, block, review-page, and article-child entities MUST remain intact.

## Verification Checkpoints

- [ ] All default-state surfaces render white background, black text, and 1px black borders.
- [ ] Eligible interactive states invert to black background with white text.
- [ ] Focused controls show a visible 2px offset outline.
- [ ] Home blocks keep existing behavior and invert correctly across interaction states.
- [ ] Reviews bars default to right rail before selection.
- [ ] Exactly one selected/current bar appears on left rail (`current_only`) and unselected bars remain on right rail.
- [ ] Selecting a new bar returns the previous selected bar to the right rail.
- [ ] No selected bar disappears, collapses, or changes component type.
- [ ] Reduced-motion preference preserves equivalent navigation comprehension.
- [ ] Metadata/sitemap/robots behavior shows no regression on affected routes.
- [ ] Loading/empty/error states remain readable and navigable on affected routes.
- [ ] No route hierarchy or content ownership regression is introduced.
