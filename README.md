
## Project structure

- `backend`: Node.js + TypeScript API implementation.
- `frontend`: React + TypeScript app for manually exercising API endpoints.
- `docker-compose.yml`: Optional one-command startup for MySQL + backend + frontend.

## Quick start (local)
From the repository root:

```bash
docker compose up --build
```

Then open `http://localhost:5173`.

else
1. Backend:
   - `cd backend`
   - `npm install`
   - `npm run dev`
2. Frontend (new terminal):
   - `cd frontend`
   - `npm install`
   - `npm run dev`


## API endpoints

- `POST /api/register`
- `GET /api/commonstudents`
- `POST /api/suspend`
- `POST /api/retrievefornotifications`


