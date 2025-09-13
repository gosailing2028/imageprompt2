# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Saasfly is an enterprise-grade Next.js SaaS boilerplate providing a complete open-source solution for building SaaS applications. It's a monorepo project using Turborepo with multiple apps and packages.

## Development Commands

### Core Commands
- **Install dependencies**: `bun install`
- **Run development server**: `bun run dev:web` (runs without stripe webhook)
- **Run full dev environment**: `bun run dev` (includes all services)
- **Build project**: `bun run build`
- **Database push**: `bun db:push` (requires POSTGRES_URL in .env.local)

### Code Quality
- **Linting**: `bun run lint`
- **Fix linting issues**: `bun run lint:fix`
- **Format code**: `bun run format`
- **Fix formatting**: `bun run format:fix`
- **Type checking**: `bun run typecheck`

### Package-specific Commands
For the main Next.js app (apps/nextjs):
- **Start production**: `cd apps/nextjs && bun start`
- **Run with environment**: Commands use `with-env` to load from `../../.env.local`

## Architecture

### Monorepo Structure
- **apps/**
  - `nextjs`: Main Next.js 14 application with App Router
  - `auth-proxy`: Authentication proxy service
  
- **packages/**
  - `api`: tRPC API endpoints and server logic
  - `auth`: Authentication utilities (Clerk integration)
  - `db`: Database layer using Kysely and Prisma for schema
  - `ui`: Shared UI components
  - `stripe`: Stripe payment integration
  - `common`: Shared utilities

- **tooling/**
  - `eslint-config`: ESLint configurations
  - `prettier-config`: Prettier configuration
  - `tailwind-config`: Tailwind CSS configuration
  - `typescript-config`: TypeScript configuration

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Authentication**: Clerk (default after June 1st, 2025)
- **Database**: PostgreSQL with Kysely (query builder) and Prisma (schema)
- **API**: tRPC for type-safe APIs
- **Styling**: Tailwind CSS with Shadcn/ui components
- **State Management**: Zustand for global state, React Query for server state
- **Payments**: Stripe integration
- **Email**: Resend with React Email templates
- **Internationalization**: Built-in i18n support (en, ja, ko, zh)

### Key Architectural Patterns
1. **Type-safe API calls**: tRPC provides end-to-end type safety between client and server
2. **Database access**: Kysely for type-safe queries, Prisma for schema management
3. **Component structure**: Shadcn/ui components in packages/ui, app-specific components in apps/nextjs/src/components
4. **Environment management**: T3 Env for validated environment variables
5. **Routing**: Internationalized routing with language prefix (e.g., /[lang]/dashboard)

### Environment Setup
Required environment variables (create `.env.local` from `.env.example`):
- `POSTGRES_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_APP_URL`: Application URL
- `NEXTAUTH_URL`: NextAuth URL (if using NextAuth)
- `NEXTAUTH_SECRET`: NextAuth secret
- `STRIPE_API_KEY`: Stripe API key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: GitHub OAuth
- `RESEND_API_KEY`: Email service API key
- `ADMIN_EMAIL`: Admin emails (comma-separated)

### Important Files
- `apps/nextjs/src/middleware.ts`: Handles i18n routing and authentication
- `apps/nextjs/src/app/[lang]/layout.tsx`: Root layout with providers
- `packages/api/src/index.ts`: tRPC router definitions
- `packages/db/schema.prisma`: Database schema
- `apps/nextjs/contentlayer.config.ts`: MDX content configuration for docs/blog