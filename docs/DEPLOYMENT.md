# Kalka Co. Media Consultancy — Production Deployment Guide & Runbook

This document details the production architecture, environment configuration, platform deployment procedures, and go-live verification checklist for **Kalka Co. Media Consultancy**.

---

## 1. Production Architecture Overview

```text
                                [ User Browser ]
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
           HTTPS (kalka.co)                     HTTPS (api.kalka.co)
                    ▼                                     ▼
        ┌──────────────────────┐              ┌──────────────────────┐
        │   Frontend (Next.js) │              │    Backend (Express) │
        │     Hosted on Vercel │              │  Hosted on Render    │
        └──────────────────────┘              │      / Railway       │
                    │                         └──────────┬───────────┘
                    │ REST API / CORS                    │
                    └────────────────────────────────────┤
                                                         ▼
                                              ┌──────────────────────┐
                                              │    MongoDB Atlas     │
                                              │   (Primary + Store)  │
                                              └──────────────────────┘
```

- **Frontend Host:** Vercel (Next.js 15 App Router, React 19)
- **Backend Host:** Render / Railway / Node.js production container (Node 20+)
- **Database:** MongoDB Atlas (Mongoose + connect-mongo session storage)
- **Primary Domain:** `https://kalka.co`
- **API Host:** `https://api.kalka.co` (or platform host e.g. `https://kalka-backend.onrender.com`)

---

## 2. Environment Variable Matrix

> **SECURITY NOTE:** Never commit real secrets to Git. Configure these variables directly in the respective hosting dashboards.

### Frontend Environment Variables (Vercel)

| Variable | Required | Purpose | Production Example |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | **Yes** | Public & server-side API base endpoint | `https://api.kalka.co/api` |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `NODE_ENV` | Automatic | Environment flag (set by Vercel) | `production` |

### Backend Environment Variables (Render / Railway)

| Variable | Required | Purpose | Production Example / Guidance |
|---|---|---|---|
| `NODE_ENV` | **Yes** | Enables secure cookies, strict error handling | `production` |
| `PORT` | **Yes** | Server port (Render/Railway default: 5000 or 10000) | `5000` |
| `API_PREFIX` | **Yes** | Base API path route prefix | `/api` |
| `MONGODB_URI` | **Yes** | MongoDB Atlas connection string | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/kalka?retryWrites=true&w=majority` |
| `SESSION_SECRET` | **Yes** | Express session signing key (min 32 chars) | `openssl rand -hex 32` |
| `CORS_ORIGIN` | **Yes** | Allowed CORS origins for browser fetch | `https://kalka.co` |
| `FRONTEND_URL` | **Yes** | Destination for OAuth callbacks & redirects | `https://kalka.co` |
| `GOOGLE_CLIENT_ID` | **Yes** | Google Cloud OAuth 2.0 Client ID | `*.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET`| **Yes** | Google Cloud OAuth 2.0 Client Secret | Secure random client secret |
| `GOOGLE_CALLBACK_URL` | **Yes** | Exact Google OAuth redirect callback URL | `https://api.kalka.co/api/auth/google/callback` |
| `ADMIN_ALLOWED_EMAILS`| **Yes** | Comma-delimited list of approved admin emails| `admin@kalka.co,djdurgesh8@gmail.com` |
| `RATE_LIMIT_WINDOW_MS`| Optional | Rate limit rolling time window in ms | `900000` (15 minutes) |
| `RATE_LIMIT_MAX` | Optional | Max requests per IP per window | `100` |
| `EMAIL_API_KEY` | Optional | Live email provider key (Resend / SES) | `re_...` |
| `EMAIL_FROM` | Optional | Sender header for system emails | `Kalka Co. <djdurgesh8@gmail.com>` |
| `NOTIFICATION_RECEIVER_EMAIL` | Optional | Recipient address for lead alerts | `djdurgesh8@gmail.com` |

---

## 3. External Dashboard Configuration

### A. MongoDB Atlas
1. Log into [cloud.mongodb.com](https://cloud.mongodb.com).
2. Create or select the production cluster.
3. Under **Database Access**, create a dedicated database user with `readWrite` privileges for the `kalka` database.
4. Under **Network Access**, add the IP addresses of your backend deployment:
   - For Render/Railway dynamic IPs: temporarily allow `0.0.0.0/0` with strong password authentication, or configure a static outbound IP proxy if required.
5. In **Connection**, choose "Connect your application" and copy the SRV URI:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/kalka?retryWrites=true&w=majority`
6. Run the non-destructive official database seed if initial institutional records are needed:
   ```bash
   npm run seed
   ```

### B. Google Cloud Console (OAuth 2.0)
1. Navigate to [console.cloud.google.com](https://console.cloud.google.com) → **APIs & Services** → **Credentials**.
2. Select your OAuth 2.0 Client ID (Web application).
3. Under **Authorized JavaScript origins**, add:
   - `https://kalka.co`
   - `https://api.kalka.co` (if using custom domain)
   - `https://<backend-id>.onrender.com` (if using platform domain)
4. Under **Authorized redirect URIs**, add the exact callback path:
   - `https://api.kalka.co/api/auth/google/callback`
   - and/or `https://<backend-id>.onrender.com/api/auth/google/callback`
5. Ensure the OAuth Consent Screen publishing status is set appropriately (Internal or Published).

### C. Backend Deployment (Render / Railway)
1. **Using Render Blueprint (`render.yaml`):**
   - Connect the repository on [render.com](https://render.com).
   - Render detects `render.yaml` and provisions `kalka-backend`.
   - In the Render dashboard, populate the un-synced environment variables (`MONGODB_URI`, `SESSION_SECRET`, `GOOGLE_CLIENT_ID`, etc.).
2. **Manual Web Service setup:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. Verify health endpoint returns:
   `GET https://<backend-url>/api/health` → `200 OK` (`status: "healthy"`)

### D. Frontend Deployment (Vercel)
1. Log into [vercel.com](https://vercel.com) and click **New Project**.
2. Select the `harshitkr13/Kalka` repository.
3. Configure project settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Next.js`
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL`: `https://api.kalka.co/api` (or `https://<backend-id>.onrender.com/api`)
   - `NEXT_PUBLIC_GA_ID`: Your GA4 Measurement ID (e.g. `G-XXXXXXXXXX`)
5. Click **Deploy**.

---

## 4. DNS & Domain Configuration

| Hostname | Type | Target / Value | Purpose |
|---|---|---|---|
| `kalka.co` | `A` / `ALIAS` | `76.76.21.21` (Vercel Anycast IP) | Apex domain for public website |
| `www.kalka.co` | `CNAME` | `cname.vercel-dns.com` | Redirect / alias to `kalka.co` |
| `api.kalka.co` | `CNAME` | `<backend-id>.onrender.com` or Railway target | Backend API subdomain |

> **Note:** HTTPS certificates are automatically provisioned and renewed by Vercel and Render via Let's Encrypt once DNS records propagate.

---

## 5. Post-Deployment Verification & Smoke Tests

Verify each of the following in production:

- [ ] **Public Website:** `https://kalka.co` renders with status 200.
- [ ] **Robots Exclusion:** `https://kalka.co/robots.txt` disallows `/admin/`, `/admin`, `/api/`, `/api`, `/_next/`.
- [ ] **Sitemap:** `https://kalka.co/sitemap.xml` lists canonical `https://kalka.co/*` URLs.
- [ ] **Canonical Tags:** Page source shows `<link rel="canonical" href="https://kalka.co/...">`.
- [ ] **Security Headers:** Response headers include:
  - `Content-Security-Policy`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] **API Health:** `https://api.kalka.co/api/health` returns status `healthy` with `database: "connected"`.
- [ ] **Contact Form Submission:** Submit a test enquiry on `/contact`; confirm lead persistence in database.
- [ ] **Anti-Spam Trap:** Honeypot field blocks automated submissions.
- [ ] **Admin Authentication:**
  - Visit `/admin/login`.
  - Click "Sign in with Google".
  - Log in with an approved Google account listed in `ADMIN_ALLOWED_EMAILS`.
  - Confirm redirect to `/admin` and session cookie `kalka.sid` received (`HttpOnly`, `Secure`, `SameSite=None`).
- [ ] **Admin Denial Test:** Attempt sign-in with an unapproved Google email; confirm access denied banner displays.
- [ ] **Public Content Protection:** Ensure only `status: "published"` and `approvalStatus: "APPROVED"` clients appear on `/clients`.
