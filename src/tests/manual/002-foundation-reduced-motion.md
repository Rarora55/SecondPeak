# Manual QA: Foundation Reduced-Motion Regression

Prerequisite: enable OS/browser reduced-motion preference.

| ID | Step | Expected | Status | Notes |
|----|------|----------|--------|-------|
| FM-RM-1 | Open and close burger menu | State changes remain functional with reduced motion | NOT RUN | |
| FM-RM-2 | Navigate chapter pages (desktop/mobile) | Content transitions avoid non-essential motion while preserving usability | NOT RUN | |
| FM-RM-3 | Use rail interactions and keyboard navigation | Controls remain responsive and readable in reduced-motion mode | NOT RUN | |
| FM-RM-4 | Toggle reduced-motion setting off and on during session | UI remains stable and functional | NOT RUN | |

Pass/fail rubric:

- PASS if no essential interaction depends on animation timing.
- FAIL if motion preference breaks navigation, visibility state, or readability.
