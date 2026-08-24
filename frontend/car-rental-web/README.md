# RoadGo Rentals — Car Rental Frontend

React + Vite frontend for the Car Rental System. Talks to the existing ASP.NET Core Web API.

## Getting started

```bash
npm install
copy .env.example .env   # then set VITE_API_BASE_URL to your API base URL
npm run dev
```

`VITE_API_BASE_URL` must point at your API without a trailing slash, e.g.
`https://localhost:7042`. Without it, requests are sent to the dev server origin.

## Routes

| Route       | Description                                        |
| ----------- | -------------------------------------------------- |
| `/login`    | Sign in (default redirect from `/`)                |
| `/register` | Create an account                                  |
| `/main`     | Authenticated car search page (requires JWT token) |

## API endpoints used

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/cars?location=...&maxDailyRate=...` (sent with `Authorization: Bearer <token>`)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint
- `npm run preview` — preview the production build
