import "server-only";
import { site } from "./site";

function isLocalDevOrigin(origin: string) {
  if (process.env.NODE_ENV === "production") return false;
  try {
    const url = new URL(origin);
    return (
      (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
      (url.protocol === "http:" || url.protocol === "https:")
    );
  } catch {
    return false;
  }
}

export function isSameOriginRequest(request: Request) {
  const allowed = new Set(
    [(process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, "")].filter(Boolean),
  );
  const origin = request.headers.get("origin");
  if (origin) {
    const normalized = origin.replace(/\/$/, "");
    return allowed.has(normalized) || isLocalDevOrigin(normalized);
  }
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    const refOrigin = new URL(referer).origin;
    return allowed.has(refOrigin) || isLocalDevOrigin(refOrigin);
  } catch {
    return false;
  }
}
