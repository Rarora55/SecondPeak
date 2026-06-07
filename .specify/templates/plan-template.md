# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

[Extract from feature spec: primary requirement + technical approach]

## Technical Context

**Language/Version**: TypeScript 5.9 (strict)
**Frontend Framework**: React 19 + React Router 7 + Vite 8
**Styling**: Tailwind CSS 4
**Animation**: Motion 12 (GSAP only when justified)
**UI Primitives**: Radix Dialog
**Editorial Content Source**: [NEEDS CLARIFICATION: local typed data, static files, or CMS adapter]
**Non-Editorial Data**: Supabase JS v2
**Hosting**: Vercel (production + previews)
**Testing**: [NEEDS CLARIFICATION: choose Vitest/Playwright or equivalent]
**Target Platform**: Modern browsers (mobile-first)
**Project Type**: Editorial web app
**Performance Goals**: Fast initial load, low CLS, smooth chapter navigation
**Constraints**: Respect reduced motion, keyboard accessibility, graceful degradation
**Scale/Scope**: Multi-section publication with chapter-based article growth

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Editorial-first: Reading hierarchy, narrative pacing, and content clarity are explicit.
- Route architecture: Nested routes and direct URL entry for published article pages are defined.
- Horizontal storytelling: Limited to chapter reading flows; mobile fallback is defined.
- Accessibility: Keyboard flows, focus management, touch usability, and reduced-motion fallback are defined.
- Performance: Budgets/strategy for lazy loading, media optimization, and animation cost are defined.
- Content ownership: Editorial source and non-editorial data boundaries are explicit.
- SEO/discoverability: Metadata, canonical, Open Graph, sitemap, and robots expectations are defined.
- Resilience: Loading, empty, and error states plus route-level error boundaries are defined.
- Deployability: Vercel preview and production viability is preserved.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
`-- tasks.md
```

### Source Code (repository root)

```text
src/
|-- app/
|   |-- router/
|   |-- providers/
|   `-- layout/
|-- routes/
|   |-- home/
|   |-- sections/
|   |-- chapter/
|   |-- manifesto/
|   `-- contact/
|-- domains/
|   |-- editorial/
|   |-- navigation/
|   |-- seo/
|   `-- forms/
|-- integrations/
|   |-- content/
|   `-- supabase/
|-- ui/
|   |-- primitives/
|   |-- shell/
|   `-- motion/
|-- styles/
`-- tests/
    |-- unit/
    |-- integration/
    |-- a11y/
    `-- e2e/
```

**Structure Decision**: [Document deviations required by this feature and why]

## Complexity Tracking

> Fill only if constitution constraints are intentionally bent and approved.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., global GSAP dependency] | [specific requirement] | [why Motion/CSS alone failed] |
| [e.g., temporary single-feature hard-coded content source] | [delivery constraint] | [why broader content integration is not needed yet] |
