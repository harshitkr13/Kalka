# Kalka Co. Media Consultancy

> **Strategic Communication. Lasting Impact.**

Official digital platform and Content Management System (CMS) for **Kalka Co. Media Consultancy**, a strategic communications and public relations advisory firm based in Haryana, India.

---

## Table of Contents

- [1. Business & Brand Identity](#1-business--brand-identity)
- [2. System Architecture](#2-system-architecture)
- [3. Technology Stack](#3-technology-stack)
- [4. Key Features](#4-key-features)
  - [Public Portal](#public-portal)
  - [Administrative CMS Platform](#administrative-cms-platform)
- [5. Content Governance & Integrity](#5-content-governance--integrity)
- [6. Authentication & Authorization](#6-authentication--authorization)
  - [Google OAuth 2.0 & Session Lifecycle](#google-oauth-20--session-lifecycle)
  - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
- [7. CMS Lifecycle & Workflows](#7-cms-lifecycle--workflows)
- [8. Security Architecture](#8-security-architecture)
- [9. API Architecture](#9-api-architecture)
- [10. Project Directory Structure](#10-project-directory-structure)
- [11. Environment Variables](#11-environment-variables)
- [12. Local Development Workflow](#12-local-development-workflow)
- [13. Production Deployment](#13-production-deployment)
- [14. Search Engine Optimization (SEO)](#14-search-engine-optimization-seo)
- [15. Forms & Lead Ingestion](#15-forms--lead-ingestion)
- [16. Production Content Status](#16-production-content-status)
- [17. Development & Production Operations](#17-development--production-operations)

---

## 1. Business & Brand Identity

- **Entity Name:** Kalka Co. Media Consultancy
- **Tagline:** Strategic Communication. Lasting Impact.
- **Description:** Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.
- **Corporate Location:** Faridabad, Haryana 121003, India
- **Business Enquiries Email:** `kalkacomediaconsultancy@gmail.com`
- **Direct Telephones:** `+91 87450 01570` / `+91 76830 15257`
- **Official WhatsApp Desk:** `+91 87450 01570`
- **Operating Hours:** 09:30 &ndash; 18:30 IST

---

## 2. System Architecture

The platform uses a decoupled client-server architecture deployed on modern cloud infrastructure:

```mermaid
flowchart TD
    subgraph ClientLayer ["Client & Edge Layer"]
        Browser["User Browser / Desktop & Mobile"]
        VercelEdge["Vercel Edge Network (Next.js 15 App Router)"]
    end

    subgraph ServiceLayer ["Application Service Layer"]
        RenderService["Render Web Service (Node.js / Express.js REST API)"]
        AuthModule["OAuth 2.0 & Session Security (express-session)"]
        RBACModule["Server-Side RBAC Enforcement"]
        RateLimiter["Rate Limiting & Abuse Protection"]
    end

    subgraph PersistenceLayer ["Persistence & External Services"]
        MongoAtlas[("MongoDB Atlas Replica Set")]
        GoogleOAuth["Google Identity Services (OAuth 2.0)"]
    end

    Browser -->|"HTTPS / SSR & Static Assets"| VercelEdge
    Browser -->|"HTTPS REST API / Cross-Origin Credentials"| RenderService
    VercelEdge -->|"Server Component Prefetching"| RenderService
    RenderService --> AuthModule
    RenderService --> RBACModule
    RenderService --> RateLimiter
    AuthModule <-->|"Token Exchange & Verification"| GoogleOAuth
    RenderService <-->|"Mongoose ODM (TLS / SRV)"| MongoAtlas
```

### Deployment Topology
- **Frontend:** Deployed on **Vercel** (`https://kalka-ten.vercel.app`)
- **Backend API:** Deployed on **Render** (`https://kalka-backend.onrender.com`)
- **Database:** **MongoDB Atlas** M0/Shared Replica Set
- **Canonical Domain:** `https://kalka.co` (configured in SEO metadata, canonical links, robots.txt, and sitemaps)

---

## 3. Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 with custom editorial design system tokens
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **Typography:** `next/font/google` (Playfair Display, Inter, JetBrains Mono)

### Backend
- **Runtime:** Node.js 20+
- **Server Framework:** Express.js 4
- **Language:** TypeScript 5 (executed via `tsx` in development, compiled with `tsc` for production)
- **Session Management:** `express-session` backed by `connect-mongo`
- **Security Middleware:** `helmet`, `cors`, `express-rate-limit`
- **Data Validation:** Zod 3
- **Testing:** Vitest 3, Supertest 7

### Database & Storage
- **Database:** MongoDB 7+ / MongoDB Atlas
- **ODM:** Mongoose 8

---

## 4. Key Features

### Public Portal
- **Home (`/`):** Strategic narrative positioning, core practice areas, client marquee, firm statistics, and direct consultation triggers.
- **About (`/about`):** Institutional ethos, advisory methodology, and corporate governance principles.
- **Practice Areas (`/services`, `/services/[slug]`):** Structured service portfolios including Public Relations, Crisis Communications, Reputation Management, Corporate Communications, Media Relations, and Executive Thought Leadership.
- **Industry Sectors (`/industries`, `/industries/[slug]`):** Sector-specific briefs spanning Real Estate, Infrastructure, Corporate Conglomerates, Startups, Hospitality, Healthcare, and Professional Services.
- **Associated Brands & Organizations (`/clients`):** Approved corporate engagements rendered without internal governance flags.
- **Case Studies / Our Work (`/case-studies`, `/case-studies/[slug]`, `/work`):** Detailed strategic briefs outlining client context, strategic interventions, and outcomes.
- **Articles & Insights (`/insights`, `/insights/[slug]`, `/news`):** Executive thought leadership, market perspectives, and policy analysis.
- **Media & Press Hub (`/media`, `/media-mentions`, `/media-gallery`):** Verified third-party media coverage, press features, and high-resolution event archives.
- **Accolades (`/awards`):** Industry recognition and communications honors.
- **Leadership & Advisory (`/team`):** Biographies and practice specializations of firm leadership.
- **Careers (`/careers`, `/careers/[slug]`):** Talent requisitions and applicant briefs.
- **Strategic Consultation (`/contact`):** Multi-tiered consultation intake form with anti-spam honeypot and priority routing.
- **Legal Compliance (`/privacy-policy`, `/terms`, `/cookie-policy`):** Regulatory governance, terms of advisory engagement, and privacy disclosures.
- **Design System Reference (`/design-system`):** Typography scale, color tokens, and atomic UI primitives.

### Administrative CMS Platform
- **Command Dashboard (`/admin`):** Live counts of active leads, published articles, client records, and system health status.
- **Access Policy & Governance (`/admin/access-policy`):** Authoritative view of current session clearance, active role capabilities, and backend permission matrix.
- **Client Roster Management (`/admin/clients`):** Client creation, metadata curation, confidentiality level controls, and approval state toggling.
- **Practice Area Management (`/admin/services`):** Service drafting, process sequencing, capabilities list curation, and publishing.
- **Industry Sector Management (`/admin/industries`):** Sector challenge definitions, strategic approach documentation, and service mappings.
- **Case Study Management (`/admin/case-studies`):** Challenge, strategy, execution, and quantifiable impact documentation.
- **Insights Management (`/admin/insights`):** Rich editorial authoring, category mapping, and publishing controls.
- **Media Coverage Management (`/admin/media`):** Press mention citation, publication metadata, and URL referencing.
- **Media Assets Library (`/admin/media-assets`):** Media asset cataloging, aspect ratio definitions, and accessibility alt text curation.
- **Team Management (`/admin/team`):** Leadership profile drafting, expertise tags, and display order sequencing.
- **Career Requisition Management (`/admin/careers`):** Job description authoring, requirements specification, and status lifecycle management.
- **Lead & Inquiry Management (`/admin/leads`):** Inbound brief triage, status workflows (`NEW`, `CONTACTED`, `QUALIFIED`, `PROPOSAL`, `WON`, `LOST`, `CLOSED`), priority flags, and internal advisory note logs.

> [!NOTE]
> Modules without approved production content display branded empty states. The CMS supports data ingestion across all modules, but the production website intentionally withholds unverified or placeholder data.

---

## 5. Content Governance & Integrity

The platform enforces strict content governance:

1. **Zero Fabricated Content:** The codebase strictly prohibits placeholder client logos, fabricated executive testimonials, unverified awards, or synthetic engagement metrics.
2. **Separation of Approval and Publication:** Content records (such as client relationships) maintain distinct `status` (`draft` | `published` | `archived`) and `approvalStatus` (`PENDING` | `APPROVED` | `REJECTED`) fields.
3. **Public View Filtration:** Public API endpoints explicitly filter for approved and published records (`status === 'published'` and `approvalStatus === 'APPROVED'`). Internal governance metadata is stripped from public responses.
4. **Resilient Dual-Mode Data Access:** Public frontend views utilize a dual-mode content adapter (`frontend/lib/api/publicContent.ts`). If the backend CMS collection is populated, live records are rendered; if empty or unreachable, the system gracefully falls back to verified static content datasets (`frontend/lib/content/`).

---

## 6. Authentication & Authorization

### Google OAuth 2.0 & Session Lifecycle

Administrative authentication uses Google OAuth 2.0 with server-side state validation:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrator
    participant FE as Next.js (/admin/login)
    participant BE as Express API (/api/auth)
    participant Google as Google Identity
    participant DB as MongoDB Atlas

    Admin->>FE: Click "Authenticate via Google"
    FE->>BE: GET /api/auth/google
    BE->>BE: Generate cryptographic state (32 bytes)
    BE-->>Admin: Redirect to accounts.google.com with state
    Admin->>Google: Authenticate & approve profile scope
    Google-->>BE: Redirect to /api/auth/google/callback?code=...&state=...
    BE->>BE: Validate session state matches Google state
    BE->>Google: POST oauth2.googleapis.com/token (code + client_secret)
    Google-->>BE: Access Token
    BE->>Google: GET userinfo (sub, email, name, picture)
    Google-->>BE: Verified Google Profile
    BE->>BE: Verify email against ADMIN_ALLOWED_EMAILS
    BE->>DB: Query User by googleId or email
    alt First system user
        BE->>DB: Create User (Role: SUPER_ADMIN)
    else Subsequent user
        BE->>DB: Create User (Role: EDITOR)
    end
    BE->>BE: Regenerate session (fixation defense)
    BE->>DB: Persist session in 'sessions' collection
    BE-->>Admin: Set HttpOnly kalka.sid cookie & redirect to /admin
```

- **Session Security:** Session cookie `kalka.sid` is configured with `HttpOnly: true`, `Secure: true` (in production), `SameSite: 'none'` (to permit cross-site cookie transmission between Vercel and Render), `Path: '/'`, and a 14-day lifetime.
- **Session Destruction:** Calling `POST /api/auth/logout` deletes the MongoDB session document and clears the cookie via `res.clearCookie('kalka.sid')`.

### Role-Based Access Control (RBAC)

Authorization is enforced **exclusively on the backend** via Express middleware (`authenticate`, `requireRole`, and `requirePermission`). Frontend route shielding and button visibility are supplementary convenience measures.

#### Implemented Roles
- **`SUPER_ADMIN`:** Full administrative authority across all operational domains.
- **`CONTENT_MANAGER`:** Authority to draft, edit, publish, and delete editorial CMS records.
- **`EDITOR`:** Authority to draft and edit content; cannot publish or delete published items.
- **`LEAD_MANAGER`:** Authority to triage inbound client briefs, update pipeline statuses, and append notes.
- **`HR_MANAGER`:** Authority to manage talent requisitions and recruitment postings.

#### Permission Matrix

| Permission Key | Description | SUPER_ADMIN | CONTENT_MANAGER | EDITOR | LEAD_MANAGER | HR_MANAGER |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| `content:view` | View CMS collections and drafts | Yes | Yes | Yes | No | No |
| `content:edit` | Create and edit draft CMS content | Yes | Yes | Yes | No | No |
| `content:publish` | Publish, archive, or delete content | Yes | Yes | No | No | No |
| `leads:view` | View inbound consultation briefs | Yes | Yes | No | Yes | No |
| `leads:manage` | Triage briefs, update status, add notes | Yes | No | No | Yes | No |
| `careers:view` | View talent requisitions and drafts | Yes | Yes | Yes | No | Yes |
| `careers:manage` | Create, edit, publish, and close jobs | Yes | No | No | No | Yes |
| `users:manage` | Manage operator accounts and role scopes | Yes | No | No | No | No |
| `settings:manage` | Top-level system governance | Yes | No | No | No | No |

---

## 7. CMS Lifecycle & Workflows

### Standard Content Lifecycle
```text
[ Draft ] ──(content:edit)──> [ Review ] ──(content:publish)──> [ Published ] ──(content:publish)──> [ Archived ]
```

### Client Relationship Governance
```text
[ Client Created ] ──> [ Status: draft ]
                              │
                    (content:publish)
                              │
                              ▼
                   [ Approval: PENDING ]
                              │
                    (content:publish)
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
   [ Approval: APPROVED ]            [ Approval: REJECTED ]
             │
   (Rendered on Public Portal)
```

Public collection controllers (`client.controller.ts`, `service.controller.ts`, etc.) return only records where `status === 'published'`. In addition, client queries require `approvalStatus === 'APPROVED'`.

---

## 8. Security Architecture

The application enforces security at multiple boundaries:

- **Server-Side Authorization:** Zero-trust architecture where all mutation routes check permissions at the Express layer.
- **Security Headers:** Enforced via `helmet` on the backend and custom response headers in `frontend/next.config.ts`:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - Content Security Policy (CSP) restricting frame embedding and unauthorized script execution.
- **Cross-Origin Resource Sharing (CORS):** Strict origin allowlist limited to `https://kalka-ten.vercel.app`, authorized `.vercel.app` preview branches, and local development hosts. All cross-origin responses include `credentials: true`.
- **Payload & Input Sanitation:**
  - Request body limits restricted to 1MB (`express.json({ limit: '1mb' })`).
  - Strict schema parsing using Zod on every ingestion endpoint.
  - Parameterized MongoDB queries via Mongoose to prevent NoSQL injection.
- **Abuse Prevention & Rate Limiting:**
  - Global API limiter: 100 requests per 15-minute window.
  - Public consultation intake limiter: 10 submissions per 15-minute window per IP.
  - Anti-spam honeypot field (`hp_company_sec`) trapping automated bots.
  - 60-second duplicate submission debounce window.

---

## 9. API Architecture

### Public Endpoints

| Endpoint | Method | Purpose | Protection |
| :--- | :---: | :--- | :--- |
| `/api/health` | `GET` | Service liveness & database connectivity check | Public |
| `/api/services`, `/:slug` | `GET` | Retrieve published advisory services | Public |
| `/api/industries`, `/:slug` | `GET` | Retrieve published industry sectors | Public |
| `/api/clients` | `GET` | Retrieve approved public client roster | Public (Filtered) |
| `/api/case-studies`, `/:slug`| `GET` | Retrieve published client case studies | Public |
| `/api/blogs`, `/:slug` | `GET` | Retrieve published editorial insights | Public |
| `/api/media-mentions` | `GET` | Retrieve verified press features | Public |
| `/api/awards` | `GET` | Retrieve firm accolades | Public |
| `/api/team` | `GET` | Retrieve leadership profiles | Public |
| `/api/careers`, `/:slug` | `GET` | Retrieve active career requisitions | Public |
| `/api/contact`, `/api/leads` | `POST` | Ingest public consultation requests | Rate Limited + Honeypot |

### Authentication Endpoints

| Endpoint | Method | Purpose | Protection |
| :--- | :---: | :--- | :--- |
| `/api/auth/google` | `GET` | Initiate Google OAuth authorization code flow | Public |
| `/api/auth/google/callback` | `GET` | Exchange authorization code and create session | State Verified + Allowlist |
| `/api/auth/me` | `GET` | Retrieve current authenticated operator & roles | Session Authenticated |
| `/api/auth/logout` | `POST` | Invalidate session in MongoDB and clear cookie | Public / Authenticated |

### Administrative CMS Endpoints (`/api/admin/*`)

All `/api/admin/*` endpoints require an active session cookie (`authenticate` middleware):

| Resource | Endpoints | Required Permissions |
| :--- | :--- | :--- |
| **Services** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Industries** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Case Studies** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Articles** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Clients** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (approval & delete) |
| **Media Mentions**| `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Media Assets** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Team Profiles**| `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `content:view` (read), `content:edit` (write), `content:publish` (delete) |
| **Careers** | `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id` | `careers:view` (read), `careers:manage` (write & delete) |
| **Leads Pipeline**| `GET /`, `GET /:id`, `PATCH /:id`, `POST /:id/notes`, `DELETE /:id`| `leads:view` (read), `leads:manage` (status triage & notes) |

---

## 10. Project Directory Structure

```text
Kalka/
├── frontend/                     # Next.js 15 App Router Frontend
│   ├── app/                      # Page routes and layouts
│   │   ├── (public routes)       # /, /about, /services, /industries, /clients, etc.
│   │   ├── admin/                # Administrative dashboard & CMS routes
│   │   ├── layout.tsx            # Root HTML layout, font injection & metadata
│   │   ├── robots.ts             # Dynamic robots.txt generation
│   │   └── sitemap.ts            # Dynamic sitemap.xml generation
│   ├── components/               # React UI components
│   │   ├── admin/                # Admin navigation, tables, and modal components
│   │   ├── forms/                # Form components and validation wrappers
│   │   ├── layout/               # Header, Footer, and navigation shells
│   │   └── ui/                   # Design system primitives (Button, Input, Badge, etc.)
│   ├── contexts/                 # React Contexts (AdminAuthContext, etc.)
│   ├── lib/                      # Client utilities, API adapters, and static content
│   │   ├── api/                  # Unified API fetching layer (publicContent, leads, etc.)
│   │   └── content/              # Verified fallback content modules
│   ├── public/                   # Static assets, branding marks, and optimized WebP images
│   ├── next.config.ts            # Next.js build configuration, image domains, and headers
│   ├── package.json              # Frontend dependencies and scripts
│   └── tailwind.config.ts        # Tailwind CSS design system token configuration
│
├── backend/                      # Node.js + Express.js REST API
│   ├── src/
│   │   ├── app.ts                # Express application setup, middleware, and route mounting
│   │   ├── server.ts             # Server entry point, database connection, graceful shutdown
│   │   ├── config/               # Environment configuration and database connection logic
│   │   ├── middleware/           # Auth, RBAC, rate limiting, error handlers, request loggers
│   │   ├── models/               # Mongoose schemas (User, Client, Service, Lead, etc.)
│   │   ├── modules/              # Domain-specific route controllers and validation schemas
│   │   ├── services/             # Background services (email notifications, etc.)
│   │   └── utils/                # API response helpers, loggers, seeders
│   ├── tests/                    # Integration and unit test suite (Vitest + Supertest)
│   ├── package.json              # Backend dependencies and scripts
│   └── tsconfig.json             # TypeScript compiler configuration
│
├── docs/                         # System documentation and architectural specifications
│   └── brain/                    # Master project guidelines, contracts, and ADRs
│
├── .env.example                  # Environment variable reference template
├── .gitignore                    # Version control exclusions
└── README.md                     # Master project documentation
```

---

## 11. Environment Variables

Create environment configuration files for both frontend and backend based on `.env.example`.

> [!CAUTION]
> Never commit actual `.env` files or secret keys to version control. Production values must be configured through Vercel and Render management consoles.

### Frontend (`frontend/.env.local`)

| Variable | Required | Description | Safe Example |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | **Yes** | Base URL for backend REST API | `http://localhost:5000/api` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |

### Backend (`backend/.env`)

| Variable | Required | Description | Safe Example |
| :--- | :---: | :--- | :--- |
| `PORT` | Optional | HTTP port for the Express service (default: 5000) | `5000` |
| `NODE_ENV` | **Yes** | Runtime environment (`development`, `production`, `test`) | `development` |
| `CORS_ORIGIN` | **Yes** | Permitted cross-origin origin | `http://localhost:3000` |
| `FRONTEND_URL` | **Yes** | Frontend origin for OAuth redirects | `http://localhost:3000` |
| `MONGODB_URI` | **Yes** | MongoDB connection string (Atlas or local) | `mongodb+srv://user:pass@cluster.mongodb.net/kalka` |
| `SESSION_SECRET` | **Yes** | HMAC signing key for sessions (min 32 chars) | `your_random_32_character_secret_string` |
| `GOOGLE_CLIENT_ID` | **Yes** | Google OAuth Client ID | `your_client_id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | **Yes** | Google OAuth Client Secret | `your_google_client_secret` |
| `GOOGLE_CALLBACK_URL` | **Yes** | OAuth redirect URI registered in Google Console | `http://localhost:5000/api/auth/google/callback` |
| `ADMIN_ALLOWED_EMAILS` | **Yes** | Comma-delimited list of approved admin Google emails | `admin@example.com,editor@example.com` |
| `NOTIFICATION_RECEIVER_EMAIL` | Optional | Destination email address for inbound lead alerts | `kalkacomediaconsultancy@gmail.com` |

---

## 12. Local Development Workflow

### Prerequisites
- **Node.js:** v20.x or later
- **npm:** v10.x or later
- **MongoDB:** Active MongoDB Atlas cluster or local MongoDB instance

### 1. Repository Setup
```bash
git clone https://github.com/harshitkr13/Kalka.git
cd Kalka
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create and populate backend/.env from template
cp ../.env.example .env

# Run database seeder (seeds official practice areas, industries, and clients)
npm run seed

# Start development API server (runs with tsx watch on port 5000)
npm run dev
```

### 3. Frontend Setup
In a separate terminal window:
```bash
cd frontend
npm install

# Create frontend/.env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start Next.js development server (port 3000)
npm run dev
```

### 4. Verification & Testing
```bash
# Backend test suite (Vitest)
cd backend
npm test

# Type checking
npm run typecheck
cd ../frontend
npm run typecheck

# Linting
npm run lint
```

---

## 13. Production Deployment

```mermaid
flowchart LR
    subgraph Vercel ["Vercel Edge Platform"]
        VercelApp["Next.js App Router (kalka-ten.vercel.app)"]
    end

    subgraph Render ["Render Cloud Service"]
        RenderApp["Express API (kalka-backend.onrender.com)"]
    end

    subgraph Atlas ["MongoDB Atlas"]
        MongoCluster["Production MongoDB Cluster"]
    end

    VercelApp -->|"Client API Requests / Credentials: true"| RenderApp
    RenderApp -->|"Mongoose TLS Connection"| MongoCluster
```

- **Frontend Deployment (Vercel):** Connected to GitHub repository `master` branch. Automatic CI builds execute `next build` on push.
- **Backend Deployment (Render):** Deployed as a Web Service running Node.js. Start command: `npm run start` (`node dist/server.js`). Health checks are routed to `/api/health`.
- **Environment Isolation:** Secrets are entered directly into platform environment variable dashboards and are never checked into Git.

---

## 14. Search Engine Optimization (SEO)

- **Metadata Architecture:** Route-level `<title>` and `<meta name="description">` tags configured across all public pages.
- **Canonical URLs:** Configured with absolute base `https://kalka.co`.
- **Crawling Rules (`/robots.txt`):** Generated via Next.js Metadata Route ([frontend/app/robots.ts](frontend/app/robots.ts)). Disallows `/admin/`, `/api/`, and `/_next/` while permitting public indexing.
- **Sitemap (`/sitemap.xml`):** Generated dynamically ([frontend/app/sitemap.ts](frontend/app/sitemap.ts)), indexing all 17 public routes and dynamic CMS slugs.
- **Structured Data (JSON-LD):** Implements `ProfessionalService` and `Organization` schemas containing verified headquarters location, phone numbers, and official communication channels.
- **404 Handling:** Custom branded Not-Found view returning semantic HTTP 404 response status.

---

## 15. Forms & Lead Ingestion

```mermaid
flowchart TD
    A["Visitor Submits Consultation Form (/contact)"] --> B["Frontend Validation (Required fields, email, phone)"]
    B --> C["POST /api/contact"]
    C --> D{"Anti-Spam Honeypot (hp_company_sec filled?)"}
    D -- "Yes" --> E["Simulate HTTP 200 (Ignore Bot Submission)"]
    D -- "No" --> F{"Duplicate Check (Same email + text in 60s?)"}
    F -- "Yes" --> G["Acknowledge without creating duplicate document"]
    F -- "No" --> H["Zod Schema Validation (publicContactSubmissionSchema)"]
    H --> I["Atomic Insert into MongoDB 'leads' Collection"]
    I --> J["Asynchronous Background Email Notification Trigger"]
    I --> K["HTTP 201 Response with sanitized Reference ID"]
    K --> L["Frontend renders Confirmation Screen & direct follow-ups"]
```

- **Data Privacy:** Client inquiry payloads are sanitized; public responses return only the generated reference ID and submission status, protecting internal database IDs and admin notes.
- **Admin Workflow:** Leads can be managed under `/admin/leads` by operators with `leads:view` and `leads:manage` permissions.

---

## 16. Production Content Status

To maintain content authenticity, the public portal strictly renders verified firm data:

### Approved Public Client Roster (8 Organizations)
The following 8 client organizations represent the approved client roster displayed on the public website:
1. **Keventers**
2. **SS Group**
3. **VVIP Group**
4. **Jiaara Jewellery**
5. **Basic Alliance**
6. **Bhaarat Wealth Group**
7. **CARESY**
8. **The Chambers of Bharat Chugh**

### Practice Areas (Official Core Portfolio)
- Public Relations & Corporate Positioning
- Crisis Communications & Media Defense
- Executive Reputation Management & Thought Leadership
- Strategic Media Relations & Advocacy
- Internal & Institutional Communications
- Digital Public Relations & Narrative Strategy

---

## 17. Development & Production Operations

- **URL Handling:** Local development environments use `http://localhost:3000` (frontend) and `http://localhost:5000` (backend). Production environments strictly use HTTPS.
- **Cross-Origin Configuration:** `SameSite: 'none'` and `Secure: true` are required on the session cookie in production to enable credentialed cross-site communication between Vercel and Render.
- **Database Maintenance:** Database migrations and collection seeding must be performed via `npm run seed` or targeted seeder commands (`npm run seed:clients`, `npm run seed:industries`).
- **Administrative Account Promotion:** Newly allowlisted Google accounts are provisioned with role `EDITOR` upon their initial OAuth sign-in. Elevation to `SUPER_ADMIN` is executed via database update:
  ```javascript
  db.users.updateOne(
    { email: "authorized_admin@example.com" },
    { $set: { role: "SUPER_ADMIN" } }
  );
  ```

---

## License

Proprietary & Confidential &mdash; &copy; Kalka Co. Media Consultancy. All rights reserved.
