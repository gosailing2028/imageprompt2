import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "@neondatabase/serverless";
import type { GeneratedAlways } from "kysely";

interface Database {
  User: {
    id: GeneratedAlways<string>;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  Account: {
    id: GeneratedAlways<string>;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };
  Session: {
    id: GeneratedAlways<string>;
    userId: string;
    sessionToken: string;
    expires: Date;
  };
  VerificationToken: {
    identifier: string;
    token: string;
    expires: Date;
  };
}

// Create a connection pool using the POSTGRES_URL from environment
const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.warn("POSTGRES_URL is not defined - database features will be disabled");
}

// Use Pool for connection pooling - only if connection string is available
const pool = connectionString ? new Pool({ connectionString }) : null;

export const db = pool ? new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
}) : null;

// Helper function to check if database is available
export const isDatabaseAvailable = () => !!pool;
