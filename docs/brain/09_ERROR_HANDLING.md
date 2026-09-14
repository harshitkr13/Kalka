# Kalka Co. — Error Handling

Frontend asynchronous features require loading, success, empty and error states, with retry where appropriate.

Backend handles:
Validation, Authentication, Authorization, Not Found, Conflict, Rate limiting, Upload failures, Database failures, External-service failures, Unexpected errors.

Use centralized Express error middleware. Never expose production stack traces.

A stored lead must not disappear because an email notification fails. An upload failure must not leave an invalid media record.

Forms should show field-level errors and prevent duplicate rapid submission.\n