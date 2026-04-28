# Manual QA: US1 Menu Toggle Reliability

Route baseline: `/`

## A. 30 Consecutive Toggle Reliability

| ID | Step | Expected | Status | Notes |
|----|------|----------|--------|-------|
| US1-TG-1 | Open menu from header burger button | Overlay opens and icon changes to close state | NOT RUN | |
| US1-TG-2 | Click same button to close | Overlay closes and icon returns to burger state | NOT RUN | |
| US1-TG-3 | Repeat open/close cycle 30 consecutive times | No stuck state, no icon/menu mismatch | NOT RUN | |

## B. Immediate Close on Menu Navigation

| ID | Step | Expected | Status | Notes |
|----|------|----------|--------|-------|
| US1-NAV-1 | Open menu and click `Reviews` | Menu closes immediately while route changes | NOT RUN | |
| US1-NAV-2 | Repeat with at least 4 additional links | Menu closes immediately for each link | NOT RUN | |
| US1-NAV-3 | Trigger rapid open -> link click -> open cycle | No stale open overlay after navigation | NOT RUN | |
