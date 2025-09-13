import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "@neondatabase/serverless";

import type { DB } from "./prisma/types";

export { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

export * from "./prisma/types";
export * from "./prisma/enums";

// Create a connection pool using the POSTGRES_URL from environment
const connectionString = process.env.POSTGRES_URL || "";

// Create a lazy-initialized database connection
let dbInstance: Kysely<DB> | undefined;

function getDb(): Kysely<DB> {
  if (!dbInstance) {
    if (!connectionString) {
      console.warn("POSTGRES_URL is not defined, database operations will fail");
      // Return a dummy instance that will fail at runtime rather than build time
      return {} as Kysely<DB>;
    }
    
    const pool = new Pool({ connectionString });
    dbInstance = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool,
      }),
    });
  }
  return dbInstance;
}

// Export a proxy that lazy-loads the database connection
export const db = new Proxy({} as Kysely<DB>, {
  get(_, prop, receiver) {
    const actualDb = getDb();
    return Reflect.get(actualDb, prop, receiver);
  },
});
