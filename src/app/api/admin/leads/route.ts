import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPool, isDbConfigured } from "@/lib/db";

function parseServices(rows: RowDataPacket[]) {
  for (const row of rows) {
    if (typeof row.services === "string") {
      try {
        row.services = JSON.parse(row.services);
      } catch {
        // keep raw string
      }
    }
  }
  return rows;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, message: "Database not configured." }, { status: 503 });
  }

  const pool = getPool();
  const [quotes] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 100`,
  );
  const [appointments] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM appointments ORDER BY created_at DESC LIMIT 100`,
  );
  const [messages] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100`,
  );
  const [subscribers] = await pool.query<RowDataPacket[]>(
    `SELECT id, email, is_active, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 200`,
  );

  return NextResponse.json({
    ok: true,
    quotes: parseServices(quotes),
    appointments,
    messages,
    subscribers,
  });
}
