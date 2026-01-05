# testProjectSciTech — User Management API

> Minimal Node.js sample API (users) with tests and optional WebSocket notifications.

## Quick start

Prerequisites: Node.js (v18+), npm, Git

1. Install dependencies

```powershell
cd C:\vilas\code\testProjectSciTech
npm ci
```

2. Run the server

```powershell
npm start
# or for development
npm run dev
```

Server listens on http://localhost:3000 by default. API base path: `/api/users`.

3. Run tests

```powershell
npm test
# or (on Unix) ./run_tests.sh
```

## Endpoints (summary)
- POST /api/users — create user { name, email, age? }
- GET /api/users — list users
- GET /api/users/:id — get user
- PUT /api/users/:id — update user
- DELETE /api/users/:id — remove user

Schema is in `schema/user.schema.json` and tests validate responses against it.

## One-line architecture
Express REST API -> in-memory `src/store.js` (creates events) -> optional `ws` WebSocket server listens for `UserCreated` events.

## Notes
- Data is in-memory (not persisted) — useful for tests and demos.
- CI workflow is at `.github/workflows/ci.yml` (Node 18, runs `npm test`).
- If you plan to push to GitHub over SSH, ensure your SSH key is added to your GitHub account.

## Next steps (suggested)
- Persist data to a real DB for production-like behavior.
- Add linting (ESLint) and CI lint step.
- Expand tests for edge cases and concurrency.
# testProjectSciTech
Project for testing purpose
