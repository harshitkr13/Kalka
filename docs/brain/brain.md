# Kalka Co. — Master Project Rules & Brain

## 1. Identity & Mission
- **Company**: Kalka Co. Media Consultancy
- **Tagline**: Strategic Communication. Lasting Impact.
- **Nature**: Elite media consultancy, corporate communications, and PR advisory firm.
- **Brand Character**: Premium, editorial, corporate, sophisticated, strategic, human. Avoid generic SaaS, flashy tech startups, excessive gradients, glassmorphism, or cartoonish graphics.

## 2. Core Architectural Principles
1. **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion.
   - Public pages MUST prefer server rendering / static generation / ISR for maximum SEO and Core Web Vitals.
   - Client components used ONLY where interactivity is strictly required.
2. **Backend**: Node.js + Express.js + TypeScript modular REST API (`/api`).
   - Clean separation of concerns with modules, services, controllers, middlewares.
   - Centralized error handling.
3. **Database**: MongoDB Atlas + Mongoose.
   - Strict schemas, indexing on slugs, status, search fields.
   - Never store binary media in MongoDB.
4. **Media**: Cloudinary or approved object storage.
5. **Authentication**: Google OAuth for admin portal.
   - Server-verified session tokens / HttpOnly cookies.
   - Backend-enforced RBAC (SUPER_ADMIN, CONTENT_MANAGER, EDITOR, LEAD_MANAGER, HR_MANAGER).
6. **Integrations**: Resend / SES / SendGrid for transactional emails.
7. **Credentials Policy**: Phase-gated credentials. Never commit secrets. Phase 1 requires ZERO credentials.

## 3. Strict Content Integrity Rules
- **NEVER INVENT**: Client logos, case study metrics, awards, press coverage, team members, office addresses, or business statistics.
- Use explicit, clearly marked placeholders during development until approved assets are provided.

## 4. Execution Governance
- Each phase must be verified with lint, typecheck, production build, accessibility, and visual QA across viewports (320px to 1920px+).
- Do not proceed to subsequent phases without explicit approval.\n