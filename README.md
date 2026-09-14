# Kalka Co. Media Consultancy

> **Strategic Communication. Lasting Impact.**

Enterprise digital platform and Content Management System (CMS) for **Kalka Co. Media Consultancy**, an elite communications, media relations, and PR advisory firm.

---

## 🏛 Project Governance & Source of Truth

All specifications, architectural blueprints, product rules, and compliance contracts are maintained under:

📁 [`docs/brain/`](./docs/brain/)

| Document | Purpose |
| :--- | :--- |
| [`docs/brain/brain.md`](./docs/brain/brain.md) | **Master Project Constitution** — Brand rules, non-negotiables, credential policy |
| [`docs/brain/01_PRD.md`](./docs/brain/01_PRD.md) | **Product Requirements** — Personas, pages, features, lead lifecycle |
| [`docs/brain/02_TRD.md`](./docs/brain/02_TRD.md) | **Technical Requirements** — Tech stack, SSR/SSG rules, Core Web Vitals |
| [`docs/brain/03_ARCHITECTURE.md`](./docs/brain/03_ARCHITECTURE.md) | **System Architecture** — Module boundaries, data flow, API layout |
| [`docs/brain/04_DATA_MODEL.md`](./docs/brain/04_DATA_MODEL.md) | **Data Model** — MongoDB collections, schemas, indexing rules |
| [`docs/brain/05_DATA_SOURCES.md`](./docs/brain/05_DATA_SOURCES.md) | **Content Integrity** — Strict rules against invented client/metric data |
| [`docs/brain/07_API_CONTRACT.md`](./docs/brain/07_API_CONTRACT.md) | **API Contract** — Public and admin REST API endpoints |
| [`docs/brain/08_UI_SPEC.md`](./docs/brain/08_UI_SPEC.md) | **UI/UX Specification** — Editorial design system, typography, breakpoints |
| [`docs/brain/09_ERROR_HANDLING.md`](./docs/brain/09_ERROR_HANDLING.md) | **Error Handling** — Centralized error middleware, UX async states |
| [`docs/brain/10_SECURITY.md`](./docs/brain/10_SECURITY.md) | **Security Requirements** — Google OAuth, RBAC, input sanitization |
| [`docs/brain/13_TESTING.md`](./docs/brain/13_TESTING.md) | **Testing Strategy** — Unit, API, integration, and E2E flows |
| [`docs/brain/14_PRODUCTION_CHECKLIST.md`](./docs/brain/14_PRODUCTION_CHECKLIST.md) | **Production Checklist** — Pre-launch audit gate |
| [`docs/brain/15_MICROTASKS.md`](./docs/brain/15_MICROTASKS.md) | **Microtask Plan** — Step-by-step roadmap from Phase 0 to 14 |
| [`docs/brain/17_DECISIONS.md`](./docs/brain/17_DECISIONS.md) | **Architecture Decision Records (ADRs)** |

---

## 🏗 Repository Layout

```text
Kalka_Ready/
│
├── frontend/                     # Next.js App Router, React, TypeScript, Tailwind CSS
│   ├── app/                      # App router pages & layouts (SSR/SSG)
│   ├── components/               # Atomic UI primitives & composite components
│   ├── sections/                 # Page section blocks (Hero, Services, CTA, etc.)
│   ├── hooks/                    # Reusable React hooks
│   ├── lib/                      # Client utilities & helpers
│   ├── types/                    # Shared frontend TypeScript interfaces
│   └── public/                   # Static public assets (fonts, icons, brand marks)
│
├── backend/                      # Node.js + Express.js + TypeScript Modular REST API
│   └── src/
│       ├── modules/              # Domain modules (auth, blogs, leads, services, etc.)
│       ├── middleware/           # Auth, RBAC, validation, error handler
│       ├── config/               # App configuration & environment parsing
│       ├── utils/                # Loggers, token helpers, formatters
│       └── app.ts                # Express application entry
│
├── docs/
│   └── brain/                    # Master project brain & specification documents
│
├── .env.example                  # Safe template for required environment variables
├── .gitignore                    # Git exclusions for dependencies, builds, & secrets
└── README.md                     # Root project documentation
```

---

## 🔒 Credential & Security Policy

1. **Phase-Gated Credentials**: Phase 1 requires **ZERO credentials**. Never commit `.env` files or secrets.
2. **Google OAuth**: Admin access requires Google OAuth with backend-enforced RBAC.
3. **Data Integrity**: Never invent client logos, awards, media mentions, statistics, or team bios. Use designated placeholders until officially provided.

---

## 🚦 Phase Status

- [x] **Repository Reconciliation**: Application code cleanly separated from documentation (`docs/brain/`).
- [ ] **Phase 1**: Premium Design System + Interactive UI Foundation (`/design-system` route).
- [ ] **Phase 2**: Public Page Shell & Routing.
- [ ] **Phase 3**: Backend & Database Architecture.
- [ ] **Phase 4**: Admin Authentication & RBAC.
