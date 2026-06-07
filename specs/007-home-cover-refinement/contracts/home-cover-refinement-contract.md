# Home Cover Refinement Contract

## Purpose

Define the expected layout, interaction, accessibility, and non-regression behavior for the refined Home cover experience.

## Route Surface

- `GET /home`
- `GET /home/:versionSlug`
- Existing linked editorial destinations already surfaced by the Home cover:
  - `GET /reviews/far-lone-sails/:pageSlug`
  - `GET /features/:articleSlug`
  - `GET /interviews/:articleSlug`

## Resolution Rules

1. `/home` resolves to exactly one active valid Home version.
2. `/home/:versionSlug` resolves to the matching valid Home version by `slug`.
3. If `:versionSlug` is unknown or invalid, Home renders the existing in-shell fallback state with a recovery path to `/home`.
4. This refinement does not change the topic destination paths or the direct-entry behavior of their public routes.

## Header Layout Contract

1. The Home header spans the available viewport width.
2. Header content uses responsive horizontal spacing rather than a visually fixed-width strip.
3. The publication brand remains aligned left and issue metadata remains aligned right.
4. The divider beneath the header aligns to the same responsive content width as the header row.
5. Brand hover/focus treatment affects only the brand treatment, not the surrounding header layout or metadata styling.

## Cover Composition Contract

1. Closed Home state renders:
   - Editorial header.
   - Centered main image.
   - SILENCE title directly beneath the image with a small controlled gap.
   - Minimal centered expand control.
2. Open Home state renders:
   - The same header, image, title, and toggle control.
   - The same three editorial topic links already defined by the Home version registry.
   - A slightly reduced cover scale and tighter vertical spacing so the overall composition remains readable as one group.
3. The cover image and title remain the visual anchor in both states.
4. The visual design remains quiet, paper-like, and editorial, with no shift toward a more commercial tone.

## Interaction Contract

1. Expand/collapse behavior remains local UI state and does not change the URL.
2. The toggle control remains a semantic button with programmatic expanded/collapsed state.
3. The chevron clearly communicates opposite directions for closed and open states.
4. The Home route may fade in on initial route entry only.
5. Expand/collapse interactions may use subtle reveal transitions, but must not replay the full route-entry fade.
6. Rapid repeated toggles must settle into the most recently requested state without duplicated topic content or broken layout.

## Responsive Layout Contract

1. Desktop viewports present the topics in three columns when readability permits.
2. Tablet viewports may keep a multi-column arrangement only while topic width remains readable.
3. Mobile viewports collapse the topics into a single readable column.
4. The open state should keep the cover block and revealed topics within the initial viewport on supported desktop and tablet viewports when feasible.
5. The refined layout must avoid horizontal overflow, clipping, and disconnected header alignment across supported breakpoints.

## Accessibility and Motion Contract

1. The toggle control is keyboard accessible, touch accessible, and exposes expanded/collapsed state.
2. Topic previews remain semantic links.
3. If the publication brand is a link, it remains keyboard reachable and has a visible focus treatment that matches its interactive purpose.
4. Reading order remains logical in both closed and open states.
5. Reduced-motion preference preserves full Home usability and keeps state changes understandable without pronounced movement.

## Non-Regression Contract

1. `HomeVersionPage` remains the owner of Home route metadata behavior.
2. Existing Home version registry data remains the authoritative editorial source for this feature phase.
3. Existing section/article destination routes remain directly accessible on refresh and manual URL entry.
4. Sitemap/robots behavior for the existing Home and linked editorial routes remains valid; this feature treats those files as regression surfaces rather than a route expansion project.
