# User Management System

Full-stack assessment project. Next.js frontend with a NestJS REST API backed by MySQL.

---

## Project Structure

```
/frontend    Next.js 14 · MUI · Formik · Yup · Context API
/backend     NestJS · TypeORM · MySQL · Jose JWT · Swagger
```

---

## Backend

### Requirements

- Node.js 18+
- MySQL 8.x running locally
- Database `users_db` created

### Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=users_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600
```

### Run

```bash
npm run start:dev
```

API runs on `http://localhost:3001`  
Swagger docs at `http://localhost:3001/api/docs`

### Tests

```bash
npm run test:e2e
```

---

## Frontend

### Setup

```bash
cd frontend
npm install
```

### Run

```bash
npm run dev
```

App runs on `http://localhost:3000`

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Bearer | Current user |
| GET | `/api/users` | Bearer | List users |
| POST | `/api/users` | Public | Create user |
| PATCH | `/api/users/:id` | Bearer | Update user |
| DELETE | `/api/users/:id` | Bearer | Soft delete |
| DELETE | `/api/users/:id/permanent` | Bearer | Hard delete |

---

## Testing the API

The database starts empty — there are no pre-seeded users. Before testing login, you need to create a user first.

Open Swagger at `http://localhost:3001/api/docs` and follow this order:

**Step 1 — Create a user**  
Hit `POST /api/users` with a name, email, and password. This is the account you'll log in with.

**Step 2 — Login**  
Hit `POST /api/auth/login` with the same email and password. Copy the `access_token` from the response.

**Step 3 — Authorize**  
Click the **Authorize** button at the top right of the Swagger page, paste the token, and confirm.

**Step 4 — Test protected routes**  
`GET /api/users`, `PATCH`, and `DELETE` endpoints are now accessible.