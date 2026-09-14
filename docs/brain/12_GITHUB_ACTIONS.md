# Kalka Co. — GitHub Actions / CI-CD

PR checks:
- install
- typecheck
- lint
- tests
- production build

Main branch must pass the same checks before deployment.

Use GitHub Actions secrets for CI/CD credentials and never print secrets in logs. Do not add deployment automation until the application builds reliably.\n