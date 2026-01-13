# Playground Backend - Simplified Documentation

## Overview

This is a simplified NestJS backend for the Playground App. The server provides REST APIs to query playground data.

**Server runs on:** `http://localhost:3333`

---

## Installation

### Prerequisites

- Node.js (v18+)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start server in development mode (with auto-reload)
npm run start:dev

# Or: Build and then start
npm run build
npm start
```

---

## Available Endpoints

### 1. Health Check

```bash
GET http://localhost:3333/
```

**Response:**

```json
{
  "message": "Hello from playground-backend"
}
```

### 2. Get All Playgrounds

```bash
GET http://localhost:3333/playgrounds
```

**Response:** Array of all playgrounds with complete data

**Example:**

```bash
curl http://localhost:3333/playgrounds
```

### 3. Get Single Playground

```bash
GET http://localhost:3333/playgrounds/:id
```

**Example:**

```bash
curl http://localhost:3333/playgrounds/1f4e7f9c-21da-4b20-9f77-3ed4c1cbe001
```

---

## Project Structure

```
backend/
├── src/
│   ├── main.ts                 # Entry Point
│   ├── app.module.ts           # Root Module
│   ├── app.contoller.ts        # Health Check Endpoint
│   ├── playground/
│   │   ├── playground.controller.ts    # Playground Endpoints
│   │   ├── playground.service.ts       # Business Logic
│   │   ├── playground.module.ts        # Playground Module
│   │   └── playgrounds.data.json       # Test Data
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── dto/
│   │       └── auth.dto.ts
│   └── user/
│       └── user.module.ts
├── package.json
├── tsconfig.json
└── nest-cli.json
```

---

## Data Models

### Playground

```typescript
interface Playground {
  id: string;
  name: string;
  description?: string | null;
  manufacturer_age_min?: number | null;
  manufacturer_age_max?: number | null;
  avg_rating?: number | null;
  address?: PlaygroundAddress;
  features?: PlaygroundFeature[];
  images?: PlaygroundImage[];
  reviews?: PlaygroundReview[];
}
```

### PlaygroundAddress

```typescript
interface PlaygroundAddress {
  street?: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}
```

### PlaygroundFeature

```typescript
interface PlaygroundFeature {
  id: string;
  name: string;
  icon?: string;
}
```

---

## Test Data

Test data is loaded from `src/playground/playgrounds.data.json`. This JSON file contains a list of playgrounds with their properties.

---

## NPM Scripts

| Command              | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `npm run build`      | Compiles TypeScript to JavaScript                             |
| `npm start`          | Starts the compiled server                                    |
| `npm run start:dev`  | Starts the server in watch mode (recommended for development) |
| `npm run start:prod` | Starts the production server                                  |

---

## Environment Variables

The following variables can be set in `.env`:

| Variable | Default | Description                   |
| -------- | ------- | ----------------------------- |
| `PORT`   | 3333    | Port on which the server runs |

---

## Error Handling

The server is configured with `ValidationPipe` which automatically performs DTO validation.

---

## Next Steps

- [ ] Implement authentication
- [ ] Add database connection (PostgreSQL)
- [ ] Configure CORS
- [ ] Improve error handling
- [ ] Add API documentation (Swagger)

---

## Development

```bash
# Start the server
npm run start:dev

# In another terminal: Make test requests
curl http://localhost:3333/playgrounds
```

---

**Last Updated:** January 2026
