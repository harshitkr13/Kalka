# Kalka Co. — API Contract

Base path: `/api`

## Public Endpoints
- `GET /services`
- `GET /services/:slug`
- `GET /industries`
- `GET /industries/:slug`
- `GET /clients`
- `GET /case-studies`
- `GET /case-studies/:slug`
- `GET /blogs`
- `GET /blogs/:slug`
- `GET /news`
- `GET /news/:slug`
- `GET /media-mentions`
- `GET /awards`
- `GET /gallery`
- `GET /careers`
- `GET /careers/:slug`
- `POST /leads`
- `POST /contact`
- `POST /newsletter`

## Admin Endpoints
CRUD endpoints for services, industries, clients, case-studies, blogs, news, media-mentions, team, awards, gallery and careers; lead view/update; settings management.

## Response Format
- **Success**: `{"success":true,"data":{},"message":"..."}`
- **Error**: `{"success":false,"error":{"code":"VALIDATION_ERROR","message":"Invalid request"}}`

All writes require validation and appropriate authorization. Never expose stack traces, secrets or database internals.\n