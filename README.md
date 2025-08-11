# Smart Feedback App

- **Frontend**: Next.js (React)
- **Backend**: NestJS
- **Machine Learning Service**: Python (FastAPI)
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## Features
- Submit feedback from the frontend.
- Backend API stores feedback in PostgreSQL.
- Backend calls ML service to analyze sentiment (`positive, neutral, negative`).
- All services run in Docker containers.

---

## Tech Stack
- **Frontend**: Next.js, TailwindCSS
- **Backend**: NestJS, TypeORM, PostgreSQL
- **ML Service**: Python, FastAPI, transformers
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

---

## Getting Started

### Prerequisites
Make sure you have installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

### Environment Variables

**Backend (`backend/.env`)**

- DATABASE_HOST=db
- DATABASE_PORT=5432
- DATABASE_USER=postgres
- DATABASE_PASSWORD=postgres
- DATABASE_NAME=smart_feedback
- ML_SERVICE_URL=http://ml:8000/analyze
- PORT=3001


**Frontend (`frontend/.env.local`)**

- NEXT_PUBLIC_API_URL=http://backend:3001

**ML Service (`ml-service/.env`)**

- PORT=8000

### Running the App

```bash
docker-compose up --build

Services:

Frontend: http://localhost:3000

Backend API: http://localhost:3001

ML Service: http://localhost:8000

PostgreSQL: localhost:5432 (user: postgres, password: postgres)
```

### Stopping the App

```bash
docker-compose down
```

### Contact and Support
```bash
amadnaseem05@gmail.com
```

---

## Prisma Migrations (Alternative to TypeORM Synchronize)

Prisma schema added under `backend/prisma/schema.prisma` for managed migrations.

1. Create `backend/.env` (if not present) with:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/smart_feedback?schema=public"
```

2. Install dependencies & generate client:

```
cd backend
npm install
npm run prisma:generate
```

3. Run initial migration:

```
npm run prisma:migrate
```

4. (Optional) Open Prisma Studio:

```
npm run prisma:studio
```

5. Seed initial admin user:

```
npm run seed
```

Disable TypeORM auto `synchronize` once Prisma is fully adopted to prevent schema drift.
