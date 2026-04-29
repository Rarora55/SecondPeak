# Quickstart: Home Version Shell

## Goal

Implement and verify a shared Home structure that renders multiple editorial versions without layout duplication.

## Prerequisites

- Node/npm dependencies installed.
- Current feature spec and plan:
  - `specs/005-home-version-shell/spec.md`
  - `specs/005-home-version-shell/plan.md`

## Implementation Steps

1. Define typed contracts:
   - Add `HomeTheme`, `HomeTile`, `HomeMainFeature`, `HomeVersion`.
2. Build local version registry:
   - Include Far: Lone Sails and Signalis as valid entries.
   - Enforce exactly one `isActive`.
3. Build reusable structure components:
   - `HomeShell`, `HomeGrid`, `HomeTile`, `HomeMainFeature`, `HomeFooterStrip`.
4. Implement `HomeVersionPage`:
   - Resolve active version for `/home`.
   - Resolve by slug for `/home/:versionSlug`.
   - Render in-shell fallback for unknown/invalid versions.
5. Wire router entries:
   - `/home`
   - `/home/:versionSlug`
6. Ensure a11y and reduced-motion support in structure behaviors.

## Verification Steps

1. Type and build checks:
   - `npm run typecheck`
2. Manual route checks:
   - Open `/home` and verify active issue.
   - Open `/home/far-lone-sails`.
   - Open `/home/signalis`.
   - Open unknown slug and verify in-shell fallback + recovery link.
3. Layout invariance:
   - Confirm switching versions changes content/theme only.
4. Accessibility checks:
   - Keyboard traversal for all links and actions.
   - Visible focus states in header/tiles/footer actions.
   - Alt text present for all images.

## Adding a New Version

1. Add a single typed object to HomeVersion registry.
2. Keep all required fields complete.
3. Optionally switch `isActive` to the new version (maintain exactly one active).
4. Re-run manual checks for `/home` and `/home/:newSlug`.
