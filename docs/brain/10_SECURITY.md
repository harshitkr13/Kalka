# Kalka Co. — Security Requirements

## Authentication
Google OAuth is mandatory for admin authentication. Use secure server-managed sessions/cookies or an equivalent secure architecture. Never expose OAuth secrets to the browser.

## RBAC
SUPER_ADMIN, CONTENT_MANAGER, EDITOR, LEAD_MANAGER, HR_MANAGER. Authorization is enforced on backend APIs.

## Controls
HTTPS; HttpOnly/Secure/SameSite cookies where appropriate; rate limiting; CORS allowlist; security headers; Zod validation; sanitization; upload MIME/size validation; request limits; audit logs.

## Secrets
Environment variables only. Never commit .env. Never put secrets in NEXT_PUBLIC_*. Maintain .env.example.

## OAuth
Verify identity server-side, protect callback/state/CSRF appropriately, restrict admin access to approved accounts/domain policy and manage session expiration.

## Data
Minimize lead/application data and restrict access. Do not send personal data to analytics.

## Uploads
Validate file type/size and use external object storage in production. Never execute uploaded files.\n