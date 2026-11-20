import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getPool, isDbConfigured } from "@/lib/db";
import { timeSlotOptions } from "@/lib/form-options";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ ok: false, message: "Invalid date." }, { status: 400 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json({ ok: true, booked: [] as string[], slots: [...timeSlotOptions] });
  }

  try {
    const [rows] = await getPool().query<RowDataPacket[]>(
      `SELECT appointment_time FROM appointments
       WHERE appointment_date = ? AND status IN ('requested', 'confirmed')`,
      [date],
    );
    const booked = rows.map((r) => String(r.appointment_time));
    return NextResponse.json({
      ok: true,
      booked,
      slots: timeSlotOptions.filter((t) => !booked.includes(t)),
    });
  } catch (error) {
    console.error("[availability]", error);
    return NextResponse.json({ ok: true, booked: [] as string[], slots: [...timeSlotOptions] });
  }
}
