# Creature Feature

A web application for designing and managing creature species in simulation games. Define the genetics, stats, attributes, and breeds of a species, then generate individual animals with traits derived from your definitions.

## What It Does

- **Species** — the top-level container. Each species has its own genes, stats, attributes, and breeds.
- **Genes** — genetic traits defined by loci, alleles (with dominance and probability), and expression rules that determine what trait is displayed based on dominant allele count. Breeds can override allele probabilities.
- **Stats** — numeric ranges (e.g. speed, stamina). Breeds can define their own min/max ranges per stat.
- **Attributes** — everything else: free text, numbers with ranges, enums with fixed options, or boolean flags. Each attribute can be marked optional and/or mutable (changeable after creation).
- **Breeds** — variants of a species with their own allele probability overrides and stat ranges.
- **Animals** — generated instances belonging to a breed, with expressed traits, stats, and attributes stored as JSON.

## Tech Stack

**Backend**
- Node.js + TypeScript
- Express 5
- Prisma ORM + PostgreSQL
- Zod for request validation
- Pino for logging
- Vitest + Supertest for testing

**Frontend**
- React 19 + TypeScript
- Vite
- React Router

## Project Structure

```
creature-feature/
├── backend/
│   ├── prisma/          # Schema and migrations
│   ├── routes/          # Express route handlers
│   ├── lib/             # Prisma client, logger, validation, schemas
│   ├── services/        # Query helpers and breed profile builder
│   ├── tests/           # Route integration tests
│   └── server.ts
└── frontend/
    └── src/
        ├── components/  # GeneSection, StatSection, AttributeSection, BreedSection
        ├── hooks/        # useGeneSection, useAttributeSection
        ├── pages/        # SpeciesPage, SpeciesProfilePage, BreedProfilePage, etc.
        └── types.ts
```

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/creature-feature"
```

Run migrations and start:
```bash
npx prisma migrate dev
npm start
```

The backend runs on `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Running Tests

```bash
cd backend
npm test
```

Tests use a separate test database. Create a `.env.test` file with a `DATABASE_URL` pointing to your test database, then run:

```bash
npm run start:test
```
