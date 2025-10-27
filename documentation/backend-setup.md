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

## Running the project on docker:

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

...
