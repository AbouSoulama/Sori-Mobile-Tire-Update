import "server-only";
import { NextResponse } from "next/server";
import type { z } from "zod";
import { captureError } from "./errors";
import { clientIp, isRateLimited } from "./rate-limit";
import { site } from "./site";
import { toFieldErrors } from "./validation";

export const HONEYPOT_FIELD = "company_website";

const MAX_BODY_BYTES = 48_000;

type Persist<T> = (data: T, ip: string) => Promise<void>;
type Notify<T> = (data: T) => Promise<boolean>;

function allowedOrigins() {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "");
  return new Set([
    configured,
    "http://localhost:3000",
    "http://localhost:3005",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3005",
  ]);
}

/** Reject cross-site POSTs (CSRF) and tools that omit a browser Origin/Referer. */
function isTrustedBrowserRequest(request: Request) {
  const allowed = allowedOrigins();
  const origin = request.headers.get("origin");
  if (origin) return allowed.has(origin.replace(/\/$/, ""));

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const { origin: refOrigin } = new URL(referer);
      return allowed.has(refOrigin);
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Shared POST pipeline: trust check -> honeypot -> rate limit -> validation -> MySQL -> email.
 * Succeeds if the lead was stored or at least one email was sent.
 */
export async function handleFormPost<S extends z.ZodType>(
  request: Request,
  schema: S,
  {
    name,
    persist,
    notify,
    limit = 5,
  }: { name: string; persist: Persist<z.infer<S>>; notify: Notify<z.infer<S>>; limit?: number },
) {
  if (request.method !== "POST") {
    return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, message: "Unsupported content type." }, { status: 415 });
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
  }

  if (!isTrustedBrowserRequest(request)) {
    return NextResponse.json({ ok: false, message: "Forbidden." }, { status: 403 });
  }

  let payload: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
    }
    payload = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (payload[HONEYPOT_FIELD]) {
    // Fake success so bots think it worked.
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request.headers);
  if (isRateLimited(`${name}:${ip}`, limit) || isRateLimited(`global:${ip}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please call us instead or try again later." },
      { status: 429 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  let storedOk = false;
  try {
    await persist(parsed.data, ip);
    storedOk = true;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    if (reason === "TIME_TAKEN") {
      return NextResponse.json(
        {
          ok: false,
          message: "That time was just booked. Please pick another slot.",
          errors: { appointmentTime: "This time is no longer available" },
        },
        { status: 409 },
      );
    }
    console.error(`[${name}] database error`, error);
    await captureError(error, { form: name, stage: "persist" });
  }

  let emailedOk = false;
  try {
    emailedOk = await notify(parsed.data);
  } catch (error) {
    console.error(`[${name}] email error`, error);
    await captureError(error, { form: name, stage: "notify" });
  }

  if (!storedOk && !emailedOk) {
    return NextResponse.json(
      { ok: false, message: "We couldn't send your request right now. Please call us directly." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
