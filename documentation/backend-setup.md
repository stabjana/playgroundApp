# Overview

This backend is built using NestJS, Prisma ORM, and Supabase with PostgreSQL as the database.
It runs in a Dockerized environment for local development and can connect to either:

- a local PostgreSQL container (with Docker Compose), or
- a remote Supabase database (for production)

## Project structure

playgroundApp/
├── playground-backend/
│ ├── Dockerfile
│ ├── docker-compose.yml
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── migrations/
│ ├── src/
│ ├── .env
│ ├── package.json
│ └── README.md
└── ...

## Requirements:

- Docker and Docker Compose installed
- Node.js
- npm
- (Optional) Supabase CLI if you use remote Supabase

## 1. Running the project on docker:

```bash
docker compose up -d
```

This will:

- Build the NestJS backend image
- Start a PostgreSQL container on port 54322
- Automatically create a shared Docker network for service communication

You can verify containers are running:

```bash
docker ps
```

Expected output:

```bash
CONTAINER ID   IMAGE                  PORTS
123abc456def   postgres:15            0.0.0.0:54322->5432/tcp
789xyz123uvw   playgroundapp-backend  0.0.0.0:3001->3001/tcp
```

stop containers:

```bash
docker compose stop
```

## 2. Environment Configuration

Environment variables are stored in `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/playground"
PORT=3001
NODE_ENV=development
```

For Supabase (remote DB), replace DATABASE_URL with your project’s URL:

```env
DATABASE_URL="postgresql://postgres:<YOUR_PASSWORD>@db.<PROJECT>.supabase.co:5432/postgres"
```

## 3. Database in supabase PostgreSQL

Local Database (Docker)

A local PostgreSQL database runs in a container via Docker Compose.
Your app connects to it through localhost:54322.

Remote Database (Supabase)

Supabase provides a managed PostgreSQL instance.
You can use it by simply updating your DATABASE_URL and running:

```bash
npx prisma db pull
```

to synchronize Prisma with your Supabase schema.

## 4. Prisma ORM

Prisma is used for database schema management and migrations.

| Command                              | Description                                               |
| ------------------------------------ | --------------------------------------------------------- |
| `npx prisma db pull`                 | Introspect the existing database and update Prisma schema |
| `npx prisma generate`                | Generate the Prisma client for use in the NestJS app      |
| `npx prisma migrate dev --name init` | Create and apply a new migration                          |
| `npx prisma studio`                  | Open Prisma Studio (GUI for DB management)                |

Example: Apply a Migration

After modifying prisma/schema.prisma:

```bash
npx prisma migrate dev --name add_user_table
```

## 5. NestJS backend

The backend is a standard NestJS application that uses Prisma as its database layer.

Start it locally (if not using Docker):

```bash
npm run start:dev
```

Or inside Docker (already running via Compose):

```bash
http://localhost:3001
```

The app automatically loads configuration from .env and connects to the database using the Prisma Client.

## 6.Typical Development Workflow

1. Start containers

```bash
docker compose up -d

```

2. Update database schema (if needed)

```bash
npx prisma migrate dev --name update_schema

```

3. Run the backend

```bash
npm run start:dev

```

4. Test database connection

```bash
npx prisma studio

```

5. Stop everything

```bash
docker compose down

```

## 7. Supabase + Prisma Notes

If using Supabase remotely:

You don’t need Docker locally — Supabase hosts Postgres for you.

Prisma connects directly via your Supabase connection string.

You can still use prisma migrate to sync schema changes.

If using Supabase locally (npx supabase start), it runs a local Postgres instance in Docker —
similar to the Compose setup here.

| Component            | Purpose                        | Tool/Command                    |
| -------------------- | ------------------------------ | ------------------------------- |
| **API Layer**        | REST / GraphQL endpoints       | NestJS                          |
| **ORM**              | Database schema + queries      | Prisma                          |
| **Database**         | PostgreSQL (local or Supabase) | Docker Compose / Supabase       |
| **Containerization** | Unified dev setup              | Dockerfile + docker-compose.yml |

Example Diagram

```diff
+-------------------+
|  NestJS Backend   |
|  (Docker)         |
|   - Uses Prisma   |
+---------+---------+
          |
          | DATABASE_URL
          |
+---------v----------+
| PostgreSQL DB      |
| (Docker or Supabase) |
+--------------------+
```

--- überarbeitete mit weniger für mich README

# Playground Backend — Full Setup Guide

This backend stack powers the Playground App, built with **NestJS**, **Prisma**, **PostgreSQL**, and optionally **Supabase** for remote hosting.  
It runs fully containerized via **Docker Compose**.

---

## ⚙️ 1. Environment Configuration

Environment variables are stored in `.env` (at the project root):

```env
# Database connection for local development
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/playground"

# App configuration
PORT=3001
NODE_ENV=development
```

For Supabase (remote DB), replace DATABASE_URL with your project’s URL:

```env
DATABASE_URL="postgresql://postgres:<YOUR_PASSWORD>@db.<PROJECT>.supabase.co:5432/postgres"
```

2. Docker & Services Overview

The project runs in two containers:

| Service     | Description             | Port         |
| ----------- | ----------------------- | ------------ |
| **db**      | PostgreSQL 16 database  | 54322 → 5432 |
| **backend** | NestJS + Prisma backend | 3001         |

```yaml
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: playground
    ports:
      - "54322:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data

  backend:
    build: ./playground-backend
    restart: always
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/playground
    ports:
      - "3001:3001"
    command: npm run start:dev
```

3. Prisma ORM

Prisma is used to manage database schema, migrations, and type-safe database access.

Common Commands

| Command                              | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| `npx prisma db pull`                 | Introspect existing database and update Prisma schema |
| `npx prisma generate`                | Generate the Prisma Client for use in NestJS          |
| `npx prisma migrate dev --name init` | Apply schema changes to database                      |
| `npx prisma studio`                  | Open Prisma Studio GUI                                |

Example Workflow

1. Modify your Prisma schema (playground-backend/prisma/schema.prisma)

2. Run a new migration:

```bash
npx prisma migrate dev --name add_new_feature
```

3. Generate client:

```bash
npx prisma generate
```

4. Access Prisma in NestJS via PrismaService

5. Running the Backend
   Option 1 — Local with Docker

```bash
docker compose up -d
```

Access:

API → http://localhost:3001
Database → localhost:54322

Prisma Studio → npx prisma studio
Stop containers:

```bash
docker compose down
```

Option 2 — Local with Supabase (Remote DB)

If you’re using a hosted Supabase database:

1. Update your .env DATABASE_URL to Supabase’s connection string.
2. Skip Docker for db, only run backend:

```bash
npm run start:dev
```

3. run:

```bash
npx prisma db pull
```

5. Development Workflow

| Step                      | Command                                         | Description               |
| ------------------------- | ----------------------------------------------- | ------------------------- |
| 1️⃣ Start local containers | `docker compose up -d`                          | Launch Postgres & backend |
| 2️⃣ Update schema          | Edit `schema.prisma` + `npx prisma migrate dev` | Apply changes             |
| 3️⃣ Open DB UI             | `npx prisma studio`                             | Inspect data              |
| 4️⃣ Stop environment       | `docker compose down`                           | Clean stop                |

6. Folder Structure

```kotlin
playgroundApp/
│
├── playground-backend/
│   ├── src/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env
└── postgres-data/
```

7. Tech stack summary

| Layer                | Tool           | Purpose                    |
| -------------------- | -------------- | -------------------------- |
| **API**              | NestJS         | Backend framework          |
| **ORM**              | Prisma         | Schema + DB access         |
| **Database**         | PostgreSQL 16  | Local or hosted (Supabase) |
| **Containerization** | Docker Compose | Unified dev setup          |
| **Hosting Option**   | Supabase       | Managed PostgreSQL         |

8. Architecture Overview

```diff
+---------------------------+
| NestJS Backend |
| (Docker, port 3001) |
| └── uses Prisma ORM |
+-------------+-------------+
|
| DATABASE_URL
|
+-------------v-------------+
| PostgreSQL Database |
| (Docker port 54322) |
| or Supabase Remote DB |
+---------------------------+
```
