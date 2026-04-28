# Manual QA Checklists

Run all checklists with `npm run dev` active.  
Record each row as `PASS`, `FAIL`, or `NOT RUN` with notes for failures.

## Feature 003: Editorial Black-and-White Visual System

- `003-foundation-editorial-baseline.md` - Global white/black/1px baseline checks.
- `003-foundation-accessibility-focus.md` - Focus outline and keyboard visibility checks.
- `003-foundation-route-regression.md` - Route-level baseline non-regression checks.
- `003-foundation-reduced-motion.md` - Reduced-motion behavior parity checks.
- `003-foundation-contact-validation.md` - Contact validation regression checks.
- `003-foundation-seo-discoverability.md` - Metadata/sitemap/robots non-regression checks.
- `003-foundation-resilience-states.md` - Loading/empty/error and fallback behavior checks.
- `003-us1-global-surfaces.md` - US1 default surface consistency checks.
- `003-us1-placeholder-removal.md` - Placeholder color removal checks.
- `003-us2-home-interactions.md` - Home block inversion/focus state checks.
- `003-us2-navigation-states.md` - Navigation inversion/active-state checks.
- `003-us2-reduced-motion-interactions.md` - US2 reduced-motion interaction parity checks.
- `003-us3-rail-relocation.md` - Reviews selected-bar relocation checks.
- `003-us3-rail-session-reset.md` - Reviews `current_only` rail policy checks.
- `003-us3-lateral-navigation.md` - Lateral chapter navigation regression checks.
- `003-regression-report.md` - Consolidated regression report template/outcome.

## Feature 004: Videogame Release Calendar

- `004-foundation-route-access.md` - Calendar route and direct URL accessibility checks.
- `004-foundation-seo-discoverability.md` - Calendar metadata/canonical/Open Graph and discoverability checks.
- `004-foundation-reduced-motion.md` - Calendar reduced-motion behavior checks.
- `004-foundation-resilience-states.md` - Calendar loading/empty/error resilience checks.
- `004-foundation-chapter-navigation-regression.md` - Out-of-scope chapter navigation non-regression checks.
- `004-foundation-contact-validation-regression.md` - Out-of-scope contact validation non-regression checks.
- `004-us1-day-timeline.md` - Day-grouped timeline rendering checks.
- `004-us1-mini-card-content.md` - Mini card content and semantics checks.
- `004-us1-calendar-seo.md` - Calendar route metadata checks.
- `004-us2-selection-url-state.md` - Query-param selection persistence checks.
- `004-us2-desktop-master-detail.md` - Desktop master-detail behavior checks.
- `004-us2-mobile-detail-flow.md` - Mobile full-page detail flow checks.
- `004-us2-reduced-motion-transitions.md` - US2 reduced-motion transition parity checks.
- `004-us2-accessibility-selection.md` - Selected-state, alt-text, and focus-return accessibility checks.
- `004-us3-entity-rendering.md` - Entity-backed studio/tag rendering checks.
- `004-us3-publication-visibility.md` - Published visibility rule checks.
- `004-us3-links-and-cta.md` - Social/RSS links and Steam CTA checks.
- `004-regression-report.md` - Consolidated regression report template/outcome.

## Feature 002: Home Navigation and Review Spacing Fixes

- `002-us1-menu-toggle.md` - Burger/X reliability and immediate close on navigation.
- `002-us2-brand-home.md` - "SecondPeak" brand navigation behavior.
- `002-us3-review-seam.md` - Review rail/content seam continuity across breakpoints.
- `002-us3-home-footer-threshold.md` - Home footer trigger in final 10% scroll window.
- `002-foundation-reduced-motion.md` - Reduced-motion fallback checks.
- `002-foundation-contact-validation.md` - Contact form validation regression checks.

## Legacy Feature 001 Checklists

- `us1-home-zone.md`
- `us1-internal-routes.md`
- `us2-desktop-rail.md`
- `us2-mobile-strip.md`
- `us2-accessibility.md`
- `us3-extensibility.md`
- `us3-edge-cases.md`
