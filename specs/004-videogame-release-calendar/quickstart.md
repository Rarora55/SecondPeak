# Quickstart: Videogame Release Calendar

## Prerequisites

- Node.js and npm installed.
- Dependencies installed (`npm install`).
- Branch checked out: `004-videogame-release-calendar`.

## Run

```bash
npm run dev
```

Open the local Vite URL in desktop and mobile viewport modes.

## Validate Core Behaviors

1. Calendar route and navigation
   - Open burger menu and verify `Calendar` appears in primary navigation.
   - Navigate to `/calendar` and confirm day-grouped vertical timeline renders.

2. Mini-card rendering
   - Confirm each mini card shows thumbnail, title, studio label, and tag labels.
   - Confirm cards are keyboard-focusable and actionable as semantic controls.

3. URL-driven selection
   - Select a release and verify URL becomes `/calendar?game=<slug>`.
   - Refresh and confirm the same release remains selected.
   - Open copied URL in a new tab and confirm selected release restores.

4. Desktop master-detail behavior
   - In desktop viewport, select a release and confirm calendar shifts left while detail panel appears on the right.
   - Confirm calendar + detail remain centered as a combined layout.
   - Confirm changing selection updates detail without losing timeline context.

5. Mobile detail behavior
   - In mobile viewport, select a release and confirm full-page detail state renders.
   - Use back navigation and confirm return to timeline context remains usable.

6. Detail content completeness
   - Confirm detail view shows thumbnail, title, studio, tags, quote, synopsis, social/RSS links, and Steam CTA.
   - Confirm missing optional fields degrade gracefully (no broken layout).

7. Entity integrity and link readiness
   - Verify studio and tags come from entity records (id/slug/name-driven rendering).
   - Confirm UI controls are link-ready for future studio/tag routes.

8. Publication and visibility
   - Verify only `published` releases are shown publicly.
   - Verify future-dated `published` releases remain visible in calendar.

9. Reduced-motion and resilience
   - Enable reduced-motion preference and repeat selection flows.
   - Verify transitions remain understandable without motion-heavy effects.
   - Validate loading, empty, and error states remain readable and navigable.

## Type Safety Check

```bash
npm run typecheck
```

Expected: no TypeScript errors introduced by this feature.

Latest automated run: PASS (`npm run typecheck` on 2026-04-28).

## Validation Log Template

- Date:
- Environment:
- Calendar route/nav result:
- URL-driven selection result:
- Desktop master-detail result:
- Mobile full-page detail result:
- Detail content completeness result:
- Entity integrity/link readiness result:
- Publication visibility result:
- Reduced-motion/resilience result:
- Typecheck result:

## Implementation Notes

- Keep routing/data-state logic in `CalendarPage` and presentation logic in dedicated calendar components.
- Maintain normalized entity contracts (`GameRelease`, `Studio`, `ReleaseTag`, `SocialLink`) through mapping helpers.
- Keep Sanity as editorial source and treat Supabase projection as derived/indexable representation.
- Preserve menu extensibility by defining nav entries through scalable configuration rather than hardcoded branching.

## Data Ownership Mapping

- Sanity-owned editorial fields: title, slug, release date, thumbnail, studio/tag references, quote, synopsis, social links, Steam URL, publication status.
- Supabase-owned derived index fields: release/studio/tag ids, platform tag ids, title keyword field, publication status filter, Steam-availability flag, source freshness timestamp.
- UI contract: studio/tag/social values are always rendered from resolved entities, never from loose string-only card payloads.
