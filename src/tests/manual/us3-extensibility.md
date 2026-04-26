# US3 Manual QA: Extensibility With New Chapter Child Page

Precondition: add one temporary child page object in `src/routes/chapters/chapter-config.ts`.

| Case | Steps | Expected | Status | Notes |
|------|-------|----------|--------|-------|
| US3-EXT-1 | Add temporary child page and reload app | A new bar appears automatically in desktop rail and mobile strip | NOT RUN | |
| US3-EXT-2 | Activate new bar | Route navigates to new slug and content matches new child page | NOT RUN | |
| US3-EXT-3 | Remove temporary child page and reload | Rail returns to original bar count without layout breakage | NOT RUN | |
