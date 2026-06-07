# Quickstart: Home Cover Refinement

## Goal

Refine the existing Home cover so it keeps the approved editorial direction while fixing header width, spacing, expanded-state sizing, centering, chevron behavior, logo interaction, and responsive layout polish.

## Prerequisites

- Node/npm dependencies installed.
- Current feature spec and plan:
  - `specs/007-home-cover-refinement/spec.md`
  - `specs/007-home-cover-refinement/plan.md`
- Existing Home cover rebuild already present in the working tree.

## Implementation Steps

1. Audit the current Home cover surface:
   - Review `HomeVersionPage`, `HomeShell`, `HomeCoverHero`, `HomeTopicLink`, and `global.css`.
   - Confirm which behaviors already match the approved direction and which are strictly refinement targets.
2. Refine header behavior:
   - Make the header span the viewport.
   - Use responsive inner padding and max-width behavior that still feels full-width.
   - Keep brand left, issue/date right, and align the divider to the same width.
3. Refine cover spacing and centering:
   - Keep the main image centered.
   - Add a small controlled gap between image and SILENCE title.
   - Balance the closed-state composition vertically within the viewport.
4. Refine open-state layout:
   - Reduce cover scale and tighten spacing when expanded.
   - Keep the image, title, toggle, and topics readable as one composition on common desktop/tablet viewports.
5. Refine interactions:
   - Keep the chevron minimal and centered.
   - Ensure direction changes correctly between states.
   - Add logo hover/focus treatment that only affects the logo.
   - Preserve reduced-motion-safe behavior.
6. Refine responsive topics behavior:
   - Keep three columns on desktop where readable.
   - Allow tablet to degrade when needed.
   - Stack topics cleanly on mobile without overflow.
7. Preserve non-regression surfaces:
   - Keep Home metadata behavior in `HomeVersionPage`.
   - Preserve current topic destinations and direct URL access.
   - Check `router.tsx`, `sitemap.ts`, and `robots.ts` only if the refinement touches route discoverability behavior.
8. Add manual QA coverage:
   - Create `src/tests/manual/007-home-cover-refinement.md`.
   - Keep `src/tests/manual/006-home-cover-rebuild.md` as the broader non-regression baseline and use the `007` checklist for refinement-specific spacing, viewport-fit, and logo-interaction checks.

## Verification Steps

1. Type checks:
   - `npm run typecheck`
2. Manual Home checks:
   - Load `/home` and confirm the header feels full-width and connected to the viewport.
   - Confirm the image/title/toggle group is centered in the closed state.
   - Confirm a small visible gap exists between the image and SILENCE title.
3. Expanded-state checks:
   - Expand the topics and confirm the cover block scales down slightly.
   - Confirm the image, title, toggle, and three topics fit together comfortably on a common laptop viewport.
   - Collapse the topics and confirm the larger closed-state composition returns cleanly.
4. Interaction checks:
   - Hover/focus the logo and confirm only the logo treatment changes.
   - Toggle the chevron with pointer and keyboard and confirm direction and expanded state stay synchronized.
   - Confirm rapid repeated toggles do not leave duplicate or broken topic content.
5. Responsive checks:
   - Desktop: header spans full width and topics render as three readable columns.
   - Tablet: cover scale tightens and topics remain readable without disconnected spacing.
   - Mobile: cover width fits the viewport and topics stack into a single readable column.
6. Motion and regression checks:
   - Confirm the calm fade occurs when entering Home.
   - Confirm the same fade does not replay when only toggling topics.
   - Confirm reduced-motion preference preserves full usability.
   - Confirm `/home/silence` and linked topic destinations still resolve directly.
7. Documentation and release checks:
   - Confirm `src/tests/manual/006-home-cover-rebuild.md` still points to the refinement checklist for the newer spacing/header-fit expectations.
   - Confirm the implementation still matches the editorial constraints recorded in `specs/007-home-cover-refinement/plan.md`.

## Content Update Notes

1. Keep the existing Home issue payload and destination routes unchanged unless a minor encoding cleanup is required.
2. Do not replace the approved visual language with a new theme direction.
3. Prefer presentation and interaction refinements over data-model churn.
