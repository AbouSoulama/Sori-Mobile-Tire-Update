import "server-only";
import mysql, { type Pool } from "mysql2/promise";

declare global {
  var __smtPool: Pool | undefined;
}

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL || (process.env.DB_USER && process.env.DB_NAME));
}

function createPool(): Pool {
  if (process.env.DATABASE_URL) {
    return mysql.createPool({ uri: process.env.DATABASE_URL, connectionLimit: 5, timezone: "Z" });
  }
  return mysql.createPool({
    // Hostinger: the app must use 127.0.0.1, not "localhost" (which may resolve to IPv6).
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    timezone: "Z",
  });
}

export function getPool(): Pool {
  if (!isDbConfigured()) {
    throw new Error("Database is not configured. Set DATABASE_URL or DB_HOST/DB_USER/DB_PASSWORD/DB_NAME.");
  }
  globalThis.__smtPool ??= createPool();
  return globalThis.__smtPool;
}
