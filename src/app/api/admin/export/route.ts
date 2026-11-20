import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPool, isDbConfigured } from "@/lib/db";

function csvEscape(value: unknown) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(rows: RowDataPacket[]) {
  if (!rows.length) return "id\n";
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(",")];
  for (const row of rows) {
    lines.push(keys.map((k) => csvEscape(row[k])).join(","));
  }
  return lines.join("\n");
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, message: "Database not configured." }, { status: 503 });
  }

  const type = new URL(request.url).searchParams.get("type") ?? "quotes";
  const pool = getPool();
  let rows: RowDataPacket[] = [];
  let filename = "export.csv";

  if (type === "quotes") {
    [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM quote_requests ORDER BY id DESC`);
    filename = "quotes.csv";
  } else if (type === "appointments") {
    [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM appointments ORDER BY id DESC`);
    filename = "appointments.csv";
  } else if (type === "contacts") {
    [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM contact_messages ORDER BY id DESC`);
    filename = "contacts.csv";
  } else if (type === "newsletter") {
    [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM newsletter_subscribers ORDER BY id DESC`);
    filename = "newsletter.csv";
  } else {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return new NextResponse(toCsv(rows), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
      "cache-control": "no-store",
    },
  });
}
