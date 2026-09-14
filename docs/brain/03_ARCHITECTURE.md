# Kalka Co. — System Architecture

```text
Browser
  ↓
Next.js / Vercel
  ↓ REST
Express / Node
  ├── MongoDB Atlas
  ├── Cloudinary
  ├── Email Provider
  └── Google OAuth
```

## Repository Structure
```text
kalka-co/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── sections/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── public/
├── backend/
│   └── src/
│       ├── modules/
│       ├── middleware/
│       ├── config/
│       ├── utils/
│       └── app.ts
└── docs/
    └── brain/
```

## Backend Modules
auth, users, blogs, news, caseStudies, mediaMentions, services, industries, clients, team, awards, careers, offices, leads, settings.

## Data Flow
- **CMS**: Admin → API → validation → authorization → MongoDB → revalidation/cache → public page.
- **Lead**: Visitor → validated API → MongoDB → notification email → admin.
- **Media**: Admin → validated upload → Cloudinary → metadata in MongoDB.

## Authentication
Google OAuth authenticates admin users. The backend maps users to approved roles/permissions. Authorization is always enforced server-side.

Do not replace the architecture wholesale without documenting the reason in 17_DECISIONS.md.\n