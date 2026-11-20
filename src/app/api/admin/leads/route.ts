import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPool, isDbConfigured } from "@/lib/db";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, message: "Database not configured." }, { status: 503 });
  }

  const pool = getPool();
  const [quotes] = await pool.query<RowDataPacket[]>(
    `SELECT id, first_name, last_name, email, phone, services, city, state, status, created_at
     FROM quote_requests ORDER BY created_at DESC LIMIT 100`,
  );
  const [appointments] = await pool.query<RowDataPacket[]>(
    `SELECT id, first_name, last_name, email, phone, service, appointment_date, appointment_time, city, status, created_at
     FROM appointments ORDER BY created_at DESC LIMIT 100`,
  );
  const [messages] = await pool.query<RowDataPacket[]>(
    `SELECT id, name, email, phone, subject, message, is_read, created_at
     FROM contact_messages ORDER BY created_at DESC LIMIT 100`,
  );
  const [subscribers] = await pool.query<RowDataPacket[]>(
    `SELECT id, email, is_active, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 200`,
  );

  return NextResponse.json({ ok: true, quotes, appointments, messages, subscribers });
}
