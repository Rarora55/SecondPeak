# Quickstart: Home Navigation and Review Spacing Fixes

## Prerequisites

- Node.js and npm installed
- Dependencies installed (`npm install`)

## Run

```bash
npm run dev
```

Open the local Vite URL.

## Validate Core Behaviors

1. Burger/X toggle reliability
   - Open and close menu 30 consecutive times from the header control.
   - Confirm overlay and icon state always match.

2. Immediate close on menu-link navigation
   - Open menu.
   - Click a navigation link.
   - Confirm menu closes immediately while route navigation proceeds.
   - Repeat for at least five links/routes.

3. Brand title Home navigation
   - From at least five non-home routes, select "SecondPeak" in header.
   - Confirm route changes to `/` each time.

4. Review rail/content seam
   - Open a chapter route (for example `/reviews/far-lone-sails/intro`).
   - Verify no visible spacing seam between rail and content.
   - Repeat checks on mobile, tablet, and desktop widths.

5. Home footer trigger threshold
   - Open `/`.
   - Scroll through Home and confirm footer remains hidden until final 10% of page progression.
   - Confirm footer appears inside final 10% zone and hides again when leaving that zone.

6. Reduced-motion fallback
   - Enable reduced-motion in OS/browser settings.
   - Confirm menu and chapter interactions remain fully usable with minimized non-essential motion.

7. Contact form validation regression
   - Open `/contact`.
   - Verify required-field and format validation.
   - Verify valid submission state shows success feedback.

## Type Safety Check

```bash
npm run typecheck
```

Expected: no TypeScript errors introduced by this feature.

Latest run: PASS (`cmd /c npx tsc --noEmit` on 2026-04-27).

## Validation Log Template

- Date:
- Environment:
- Toggle reliability result:
- Menu-link immediate close result:
- Brand title navigation result:
- Review seam result:
- Home footer threshold result:
- Reduced-motion regression result:
- Contact validation regression result:
- Typecheck result:

## Implementation Notes

- Menu state handling now uses explicit controlled toggling with immediate close on menu-link navigation.
- Home footer reveal now uses a final-10%-of-scroll threshold instead of an intersection-only footer sentinel trigger.
- Chapter rail/content seam uses full-width rail-track styling to eliminate interstitial black spacing across breakpoints.
- Contact form includes client-side validation for required email/message fields and basic success feedback state.
