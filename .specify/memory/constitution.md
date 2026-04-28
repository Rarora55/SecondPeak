<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
  - No principle title changes; governance obligations clarified in Delivery Workflow and Product Architecture Standards.
- Added sections:
  - None
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md: unchanged (already aligned)
  - .specify/templates/spec-template.md: unchanged (already aligned)
  - .specify/templates/tasks-template.md: updated
  - .specify/templates/commands/*.md: pending (directory not present)
  - README.md: unchanged (already aligned)
- Follow-up TODOs: None
-->

# Videogame Magazine Web App Constitution

## Core Principles

### I. Editorial-First Product
All interface, layout, typography, spacing, media rhythm, and transition decisions MUST
prioritize reading quality, visual hierarchy, and narrative pacing. Articles MUST be
implemented as editorial experiences, not generic blog layouts. Novel UI effects are allowed
only when they improve comprehension and storytelling continuity.

Rationale: The product differentiator is premium editorial storytelling quality.

### II. Modular and Typed Architecture
The codebase MUST remain modular, strongly typed, and domain-oriented. Routing, layout shells,
content rendering, CMS integration, non-editorial data access, UI primitives, and animation
orchestration MUST be separated with clear boundaries. Monolithic page components and duplicated
logic are prohibited.

Rationale: Clear boundaries preserve maintainability and long-term expansion velocity.

### III. Controlled Horizontal Storytelling
Horizontal navigation patterns MUST be limited to chapter/article reading experiences and MUST
not be used as global site navigation. Desktop chapter flows MAY translate vertical input to
horizontal progression when it improves narrative continuity. Mobile and small screens MUST
degrade gracefully to readable vertical flows when horizontal behavior harms usability.

Rationale: Controlled application of cinematic navigation preserves novelty without sacrificing
clarity.

### IV. Accessibility and Usability Over Novelty
All major interactions MUST be keyboard accessible, touch-usable, and semantically correct.
Dialog and overlay navigation MUST include focus trapping, escape-to-close, and clear labels.
All non-essential animation MUST respect `prefers-reduced-motion` with equivalent reduced-motion
fallback behavior.

Rationale: Editorial quality is invalid if users cannot reliably read and navigate the product.

### V. Performance as a Feature
Features MUST meet production-grade performance constraints: fast initial load, low layout shift,
optimized media delivery, and smooth interaction under realistic device conditions. Route code,
non-critical media, and long-form article assets MUST be lazy loaded. Animation libraries MUST be
used only when their value exceeds payload and runtime cost.

Rationale: Performance directly affects readability, immersion, and retention.

### VI. Content Ownership Discipline
Sanity is the single source of truth for editorial content, including sections, articles, chapter
pages, authors, hero assets, ordering, publish state, and SEO fields. Supabase MUST only store
non-editorial product/app data such as contact submissions and future interaction data. Editorial
ownership MUST never be split between Sanity and Supabase.

Rationale: Strict ownership avoids schema drift, duplicated logic, and publishing inconsistency.

### VII. Production-Ready Scalability
All implementation decisions MUST support growth in sections, issues, chapter templates,
contributors, and multilingual evolution. The application MUST remain deployable on Vercel with
stable preview flows and safe environment variable handling. Integrations MUST fail gracefully and
must not expose privileged credentials in client code.

Rationale: Early architecture choices determine whether future editorial scale is feasible.

## Product Architecture Standards

- Routing MUST use React Router 7 nested routes with predictable human-readable slugs and direct
  entry support for any published article page.
- Home MUST use a block-based editorial grid with one dominant center block and six secondary
  blocks (three left, three right), expandable without architectural rewrites.
- Chapter experiences MUST support parent and child URLs, consistent chapter shell UI, right-side
  progress rail, bottom navigation controls, and explicit reader position state.
- Burger navigation MUST open a full-screen accessible overlay using Radix Dialog primitives where
  appropriate.
- Every public page MUST support metadata: title, description, canonical URL, and Open Graph.
- Sitemap and robots configuration MUST be generated and maintained.
- Any feature that introduces or changes a public route MUST include explicit metadata and
  discoverability coverage in its spec, plan, and tasks (title/description/canonical/Open Graph
  plus sitemap/robots impact).
- Missing or unavailable CMS/backend content MUST degrade gracefully with loading, empty, and error
  states, including route-level error boundaries where appropriate.

## Delivery Workflow and Quality Gates

- All feature plans MUST include an explicit constitution check before implementation starts and
  after design artifacts are produced.
- Feature specifications MUST define accessibility, reduced-motion behavior, SEO behavior,
  resilience states, and performance expectations before task generation.
- Task plans MUST include work items for routing integrity, content rendering, responsive behavior,
  reduced-motion handling, and accessibility-critical flows.
- Task plans MUST include chapter navigation and contact validation work items when those surfaces
  are in scope for the feature; out-of-scope surfaces MUST be explicitly labeled as non-regression
  checks only.
- Code review MUST reject changes that blur Sanity/Supabase ownership boundaries, introduce
  unnecessary animation complexity, or degrade readability/performance.
- CI/CD for Vercel previews MUST remain functional; broken preview deployability blocks merge.

## Governance

This constitution supersedes local conventions when conflicts occur.

- Amendment process: propose change in a PR with impacted principles, migration impact, and
  template sync updates.
- Approval policy: at least one maintainer approval is required for PATCH updates, and at least
  two maintainer approvals are required for MINOR or MAJOR updates.
- Versioning policy:
  - MAJOR for incompatible principle redefinitions or principle removals.
  - MINOR for new principles/sections or materially expanded obligations.
  - PATCH for clarifications and non-semantic wording improvements.
- Compliance review: every plan, spec, task list, and production PR MUST include a constitution
  compliance check.
- Operational guidance source: repository templates under `.specify/templates/` MUST remain in
  sync with this document.

**Version**: 1.1.0 | **Ratified**: 2026-04-22 | **Last Amended**: 2026-04-28


