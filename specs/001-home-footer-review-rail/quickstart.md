# Quickstart: Home Footer Scope and Review Rail Navigation

## Prerequisites

- Node.js + npm installed
- Project dependencies installed (`npm install`)

## Run

```bash
npm run dev
```

Open the local Vite URL in browser.

## Validate Core Behavior

1. Home footer visibility
   - Open `/`.
   - Confirm footer is hidden before footer zone is reached.
   - Scroll into footer zone and confirm footer appears.
   - Scroll away and confirm footer hides again.

2. Internal routes footer suppression
   - Navigate to `/reviews`, `/manifesto`, `/contact`, and at least one chapter child route.
   - Confirm footer never appears while scrolling these routes.

3. Desktop/tablet chapter rail
   - Open a chapter child route (e.g., `/reviews/far-lone-sails/intro`) on desktop width.
   - Confirm right-side full-height black bars render (one per child page).
   - Click each bar and verify route and content change to matching child page.
   - Confirm existing lateral transition behavior still works.

4. Mobile chapter rail
   - Use responsive mode for small screen width.
   - Confirm chapter navigation appears as horizontal black bar strip.
   - Tap each bar and verify matching child route/content navigation.

## Maintainer Notes: Add Chapter Child Pages

1. Open `src/routes/chapters/chapter-config.ts`.
2. Add a new object in the relevant chapter `pages` array with `slug`, `title`, `summary`, and `color`.
3. Restart or refresh dev server.
4. Verify:
   - Desktop/tablet rail has one additional full-height black bar.
   - Mobile strip has one additional bar.
   - Direct route `{basePath}/{slug}` resolves correctly.

## Type Safety Check

```bash
npm run typecheck
```

Expected: no TypeScript errors introduced by this feature.

## Validation Log

- Typecheck result: PASS (`node .\\node_modules\\typescript\\bin\\tsc --noEmit` on 2026-04-26)
