# Manual QA: Foundation Contact Validation Regression

Route baseline: `/contact`

| ID | Step | Expected | Status | Notes |
|----|------|----------|--------|-------|
| FM-CV-1 | Submit empty form | Validation errors shown for email and message | NOT RUN | |
| FM-CV-2 | Enter invalid email and valid message, submit | Email validation error shown | NOT RUN | |
| FM-CV-3 | Enter valid email and short message (<10 chars), submit | Message length validation error shown | NOT RUN | |
| FM-CV-4 | Enter valid email and valid message, submit | Success status shown, errors cleared | NOT RUN | |
| FM-CV-5 | After success, submit empty form again | Validation behavior remains consistent | NOT RUN | |
