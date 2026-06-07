# Manual Test Plan: Home Cover Refinement

## Routes

- `/home`
- `/home/:versionSlug`
- `/reviews/far-lone-sails/intro`
- `/features/el-terror-en-2d`
- `/interviews/wych-elm-silver-pines`

## Closed State Checks

1. Load `/home` and confirm the Home header spans the viewport with responsive inner padding rather than reading as a fixed-width strip.
2. Confirm the `SecondPeak.` brand remains aligned left and the issue metadata remains aligned right.
3. Confirm the divider beneath the header aligns to the same width as the header content.
4. Confirm the closed-state image, SILENCE title, and chevron appear visually centered as one balanced group.
5. Confirm a small visible gap exists between the bottom of the image and the SILENCE title.
6. Confirm `/home/silence` resolves directly and an unknown `/home/:versionSlug` shows the in-shell fallback with a recovery link.

## Expanded State Checks

7. Activate the chevron with pointer and keyboard and confirm the three topic links appear beneath the title.
8. Confirm the chevron reverses direction when the topics are visible and returns to its original direction when collapsed.
9. Confirm the expanded state scales the cover block down slightly so the image, title, chevron, and topics fit together comfortably on a common laptop viewport.
10. Confirm repeated rapid toggles always settle into the last requested state without duplicate or overlapping topics.
11. Confirm each topic link opens its destination route successfully.
12. Refresh `/reviews/far-lone-sails/intro`, `/features/el-terror-en-2d`, and `/interviews/wych-elm-silver-pines` directly and confirm they still resolve without fallback errors.

## Interaction and Accessibility Checks

13. Confirm the `SecondPeak.` brand hover affects only the logo treatment and not the surrounding metadata.
14. Confirm keyboard focus on the brand link and topic toggle is visible and readable.
15. Confirm the expand control exposes a visible focus state and correct expanded/collapsed accessibility state.
16. Confirm topic links remain keyboard reachable in the expanded state.
17. Confirm reduced-motion settings keep the Home route fully usable in both closed and open states.

## Responsive and Motion Checks

18. Desktop: confirm the topics render as three readable columns and the header still feels full-width.
19. Tablet: confirm the cover shrinks in the expanded state and the topic layout remains readable without disconnected spacing.
20. Mobile: confirm the cover width fits the viewport, the title scales down, and the topics stack into a single readable column.
21. Confirm the calm Home fade occurs when entering the Home route.
22. Confirm the route-entry fade does not replay when only opening or closing the topics.

## Metadata and Discoverability Checks

23. Confirm Home route metadata and destination route metadata still update correctly.
24. Confirm `src/app/sitemap.ts` still includes `/home`, `/home/silence`, `/features/el-terror-en-2d`, and `/interviews/wych-elm-silver-pines`.
25. Confirm `src/app/robots.ts` still reflects the public Home and destination route allow-list.
