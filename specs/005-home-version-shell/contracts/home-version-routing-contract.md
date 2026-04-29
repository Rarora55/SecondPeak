# Home Version Routing Contract

## Purpose

Define expected route behavior and resolution rules for the shared HomeStructure and HomeVersion data model.

## Route Surface

- `GET /home`
- `GET /home/:versionSlug`

## Resolution Rules

1. `/home` resolves to exactly one active valid HomeVersion.
2. `/home/:versionSlug` resolves to the matching valid HomeVersion by `slug`.
3. If `:versionSlug` does not exist or maps to an invalid version, render an in-shell fallback state.
4. Historical valid versions remain routable by slug indefinitely.

## Rendering Contract

1. Structure/layout behavior is fixed across all versions:
   - Header/navigation zone.
   - 3 left tiles.
   - 1 central main feature.
   - 3 right tiles.
   - Footer strip with issue metadata and slogan.
2. Version-specific payload controls only content and theme tokens.
3. Version payload cannot alter slot count, slot geometry, or responsive structure rules.

## Fallback Contract

1. Fallback renders inside HomeShell (not global 404).
2. Fallback includes:
   - "Version not found" message.
   - Primary recovery action linking to `/home`.
3. Fallback preserves keyboard accessibility and visible focus states.

## Accessibility Contract

1. All tile/main-feature interactions are semantic links.
2. Every image includes descriptive alt text.
3. Focus indicators are visible on keyboard navigation.
4. Reduced-motion preference does not block content access.

## Data Ownership Contract

1. HomeVersion editorial fields are owned by Sanity domain (future source of truth).
2. Local registry is a temporary typed adapter for this phase.
3. Supabase remains out of scope for editorial HomeVersion content.
