# testProjectSciTech — User Management API

> Minimal Node.js sample API (users) with tests, optional WebSocket notifications.

## Prerequisites

- Node.js (v18+)
- npm

## Installation

1. Navigate to the project directory:

```bash
cd C:\vilas\code\testProjectSciTech
```

2. Install dependencies for the main project (API and tests):

```bash
npm ci
```

## Running the Application

### API Server

Run the backend API server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The API will be available at http://localhost:3000. API base path: `/api/users`.

## Testing

### Unit Tests

Run unit tests for the API with Jest:

```bash
npm test
```

This includes coverage reports generated in the `coverage/` directory.

```

## API Endpoints (summary)

- POST /api/users — create user { name, email, age? }
- GET /api/users — list users
- GET /api/users/:id — get user
- PUT /api/users/:id — update user
- DELETE /api/users/:id — remove user

Schema is in `schema/user.schema.json` and tests validate responses against it.

## Architecture

Express REST API -> in-memory `src/store.js` (creates events) -> optional `ws` WebSocket server listens for `UserCreated` events.

## Notes

- Data is in-memory (not persisted) — useful for tests and demos.
- CI workflow is at `.github/workflows/ci.yml` (Node 18, runs `npm test`).
- If you plan to push to GitHub over SSH, ensure your SSH key is added to your GitHub account.

## Next Steps (suggested)

- Persist data to a real DB for production-like behavior.
- Add linting (ESLint) and CI lint step.
- Expand tests for edge cases and concurrency.
