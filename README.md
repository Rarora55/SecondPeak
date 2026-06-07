# Videogame Magazine Web App

Modern editorial web app for videogame journalism, criticism, and visual storytelling.

## Core Direction

- Editorial-first reading experience
- Chapter-based storytelling with controlled horizontal navigation
- Feature-defined editorial content source and Supabase for non-editorial app data
- React 19 + TypeScript + Vite + React Router + Tailwind + Motion
- Vercel preview-ready deployment flow

## Governance

Project governance and non-negotiable rules live in:

- `.specify/memory/constitution.md`

## Current Navigation Behavior

- Footer renders only on Home (`/`) and only while the Home footer trigger zone is in view.
- Footer stays hidden on all internal routes (reviews, chapters, manifesto, contact, etc.).
- Review chapter navigation uses structural bar controls:
  - Desktop/tablet: right-side full-height black bars (one per child page).
  - Mobile: horizontal black bar strip (one per child page).
- Existing chapter lateral transitions (wheel, keyboard arrows, previous/next links) remain active.
