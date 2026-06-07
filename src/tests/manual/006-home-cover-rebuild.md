# Manual Test Plan: Home Cover Rebuild

## Routes

- `/home`
- `/home/:versionSlug`
- `/reviews/far-lone-sails/intro`
- `/features/el-terror-en-2d`
- `/interviews/wych-elm-silver-pines`

## Checks

1. Load `/home` and confirm only the header, main image, SILENCE title, and expand control show by default.
2. Activate the expand control with pointer and keyboard and confirm the three topic links appear below the title.
3. Activate the expand control again and confirm the Home page returns to the closed state.
4. Confirm the expand control exposes a visible focus state and correct expanded/collapsed accessibility state.
5. Confirm each topic link opens its destination route successfully.
6. Refresh each destination route directly and confirm it resolves without fallback errors.
7. Confirm Home route metadata and destination route metadata update correctly.
8. Confirm reduced-motion settings keep all interactions usable.
9. Confirm desktop, tablet, and mobile layouts remain readable and balanced.
10. Confirm `/home/silence` resolves directly and an unknown `/home/:versionSlug` shows the in-shell fallback with a recovery link.
11. Confirm unknown `/features/:articleSlug` and `/interviews/:articleSlug` routes show an editorial fallback state and a path back to `/home`.
12. Confirm `src/app/sitemap.ts` includes `/home`, `/home/silence`, `/features/el-terror-en-2d`, and `/interviews/wych-elm-silver-pines`.
13. Confirm `src/app/robots.ts` reflects the public Home and destination route allow-list.
14. Confirm the refinement-specific spacing, header width, and expanded-state fit checks continue to be tracked in `src/tests/manual/007-home-cover-refinement.md`.
