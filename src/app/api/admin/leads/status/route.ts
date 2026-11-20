import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPool, isDbConfigured } from "@/lib/db";
import { isSameOriginRequest } from "@/lib/same-origin";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, message: "Database not configured." }, { status: 503 });
  }

  const body = (await request.json()) as { type?: string; id?: number; status?: string; is_read?: boolean };
  const id = Number(body.id);
  if (!Number.isFinite(id) || id < 1) {
    return NextResponse.json({ ok: false, message: "Invalid id." }, { status: 400 });
  }

  const pool = getPool();
  if (body.type === "quote") {
    const status = body.status ?? "contacted";
    if (!["new", "contacted", "quoted", "closed"].includes(status)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await pool.execute(`UPDATE quote_requests SET status = ? WHERE id = ?`, [status, id]);
  } else if (body.type === "appointment") {
    const status = body.status ?? "confirmed";
    if (!["requested", "confirmed", "completed", "cancelled"].includes(status)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await pool.execute(`UPDATE appointments SET status = ? WHERE id = ?`, [status, id]);
  } else if (body.type === "contact") {
    await pool.execute(`UPDATE contact_messages SET is_read = ? WHERE id = ?`, [body.is_read === false ? 0 : 1, id]);
  } else {
    return NextResponse.json({ ok: false, message: "Unknown type." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
