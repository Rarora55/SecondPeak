# Quickstart: Editorial Black-and-White Visual System

## Prerequisites

- Node.js and npm installed
- Dependencies installed (`npm install`)

## Run

```bash
npm run dev
```

Open the local Vite URL.

## Validate Core Behaviors

1. Global editorial baseline
   - Visit Home, section routes, chapter routes, manifesto, and contact.
   - Confirm default surfaces are white with black text and 1px black borders.
   - Confirm no temporary placeholder colors remain visible.

2. Interactive inversion states
   - Trigger hover/focus/active/selected states on navigation elements and selectable blocks.
   - Confirm eligible states invert to black background with white text.
   - Confirm state reset returns elements to default white/black appearance.

3. Home block behavior preservation
   - On Home, interact with each selectable block by pointer and keyboard.
   - Confirm layout and click/navigation behavior are unchanged.
   - Confirm hover/focus/active/selected states follow inversion rules.

4. Reviews rail behavior (`current_only`)
   - Open a Reviews route and verify bars default on the right rail with white background, 1px black border, and black text.
   - Select a review bar and verify that same full vertical bar moves to the left rail and remains visible/inverted.
   - Select a different review bar and verify the new bar moves left while the previous selected bar returns to the right rail.
   - Confirm selected bars are not replaced by headers/tabs/breadcrumbs or hidden states.
   - Leave Reviews and return; confirm default right-rail presentation before new selection.

5. Reduced-motion behavior
   - Enable reduced-motion preference.
   - Repeat key review/home navigation interactions.
   - Confirm non-essential motion is reduced while state clarity and navigation comprehension remain intact.

6. SEO and discoverability non-regression
   - Confirm affected routes retain expected title, description, canonical, and Open Graph behavior.
   - Confirm sitemap/robots behavior shows no regression for affected routes.
   - Confirm review parent/child URLs remain directly reachable.

7. Resilience behavior
   - Validate loading, empty, and error states on affected routes.
   - Confirm these states remain readable in black-and-white styling and provide recovery/navigation affordances.
   - Confirm unavailable/invalid review rail data fails gracefully without overlap or navigation breakage.

8. Responsive integrity
   - Repeat checks on mobile, tablet, and desktop widths.
   - Confirm readability and visual consistency across breakpoints.
   - Confirm Reviews rail behavior remains stable across viewport changes.

## Type Safety Check

```bash
npm run typecheck
```

Expected: no TypeScript errors introduced by this feature.

Latest run: PASS (`npm run typecheck` on 2026-04-27).

## Validation Log Template

- Date:
- Environment:
- Global baseline result:
- Interactive inversion result:
- Home block behavior result:
- Reviews rail `current_only` behavior result:
- Reduced-motion result:
- SEO/discoverability non-regression result:
- Resilience states result:
- Responsive behavior result:
- Typecheck result:

## Implementation Notes

- Prioritize shared style definitions in `src/styles/global.css` to avoid per-component drift.
- Keep routing/content logic unchanged; style and interaction-state rules are the only intended scope.
- Reviews rail behavior must remain the same bar component with side partitioning (`current_only`), not component replacement.
- CMS/content ownership remains unchanged: editorial content stays in Sanity and non-editorial data remains in Supabase.
- Review parent/child URL structure remains unchanged (for example `/reviews/far-lone-sails/:pageSlug`).
