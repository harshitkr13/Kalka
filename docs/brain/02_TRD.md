# Kalka Co. — Technical Requirements

## Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion.
Backend: Node.js, Express.js, TypeScript.
Database: MongoDB Atlas + Mongoose.
Validation/forms: Zod + React Hook Form.
Media: Cloudinary or approved object storage.
Email: Resend / Amazon SES / SendGrid.
Analytics: GA4 + Search Console; GTM only if justified.
Deployment: Vercel + Railway/Render/AWS + MongoDB Atlas.

## Architecture Rules
- Do not build the public site as a client-only React SPA.
- Prefer Next.js server/static rendering and revalidation for public content.
- Use a modular REST API for backend/CMS/admin.
- Use client components only where interaction requires them.
- Do not introduce microservices, Redis, Elasticsearch, Kubernetes, etc. without a real requirement.
- Secrets exist only in server environment variables.

## Quality
TypeScript, linting, formatting, validation, centralized errors, tests and successful production build are required.

## Performance
Optimize images, fonts and JavaScript; use caching/revalidation and lazy loading; target excellent Core Web Vitals.

## Security
HTTPS, secure cookies, authentication, RBAC, rate limiting, CORS, security headers, validation, sanitization, upload validation and audit logs.\n