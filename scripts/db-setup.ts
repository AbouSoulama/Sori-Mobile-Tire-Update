// Creates the MySQL tables and seeds vehicle makes/models. Safe to run multiple times.
// Usage: npm run db:setup   (reads .env.local / .env)
import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";
import { vehicleCatalog } from "../src/lib/vehicles";

config({ path: ".env.local" });
config();

async function main() {
  const connection = process.env.DATABASE_URL
    ? await mysql.createConnection({ uri: process.env.DATABASE_URL, multipleStatements: true })
    : await mysql.createConnection({
        host: process.env.DB_HOST ?? "127.0.0.1",
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
      });

  const schema = await readFile(path.join(process.cwd(), "db", "schema.sql"), "utf8");
  await connection.query(schema);
  console.log("Tables ready.");

  let makeOrder = 0;
  let modelCount = 0;
  for (const [make, models] of Object.entries(vehicleCatalog)) {
    makeOrder += 1;
    await connection.execute(
      `INSERT INTO vehicle_makes (name, sort_order) VALUES (?, ?) ON DUPLICATE KEY UPDATE sort_order = VALUES(sort_order)`,
      [make, makeOrder],
    );
    const [[row]] = await connection.query<mysql.RowDataPacket[]>(`SELECT id FROM vehicle_makes WHERE name = ?`, [make]);
    for (const [i, model] of models.entries()) {
      await connection.execute(
        `INSERT INTO vehicle_models (make_id, name, sort_order) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE sort_order = VALUES(sort_order)`,
        [row.id, model, i + 1],
      );
      modelCount += 1;
    }
  }
  console.log(`Seeded ${makeOrder} makes and ${modelCount} models.`);
  await connection.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
