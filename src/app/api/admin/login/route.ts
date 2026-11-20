import { NextResponse } from "next/server";
import { createAdminSession, isAdminConfigured, verifyAdminCredentials } from "@/lib/admin-auth";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { isSameOriginRequest } from "@/lib/same-origin";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, message: "Forbidden." }, { status: 403 });
  }
  if (!isAdminConfigured()) {
    return NextResponse.json({ ok: false, message: "Admin is not configured on this server." }, { status: 503 });
  }

  const ip = clientIp(request.headers);
  if (isRateLimited(`admin-login:${ip}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Too many attempts." }, { status: 429 });
  }

  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = body.email ?? "";
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
