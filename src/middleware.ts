import { NextResponse, type NextRequest } from "next/server";

// Leftovers / attack paths from the hacked WordPress era — answer 410 Gone.
const GONE_PATTERNS = [
  /^\/wp-(admin|content|includes|json|login|cron|config)/i,
  /^\/(category|tag|author|feed|comments|trackback|xmlrpc)(\/|$|\.)/i,
  /\/feed\/?$/i,
  /\/(amp|embed)\/?$/i,
  /\.(php|asp|aspx|cgi|jsp|html?)$/i,
  /^\/\d{4}\/\d{2}(\/|$)/,
  // Keep blocking WP/probe paths; `/admin` is allowlisted in middleware() for the Next.js panel.
  /^\/(page|product|products|shop|casino|slot|bet|news|blog|wp|wordpress|administrator|phpmyadmin|pma|cgi-bin|shell|eval|vendor\/phpunit)\b/i,
  /^\/\.(env|git|svn|htaccess|htpasswd|DS_Store)/i,
  /^\/(autoload_classmap|wp-config|xmlrpc)/i,
];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "X-DNS-Prefetch-Control": "off",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

function withSecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Our real Next.js admin — never treat as a WordPress probe.
  const isAppAdmin = pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");

  // Block common WordPress / probe query strings on the homepage.
  const isWordPressQuery =
    pathname === "/" &&
    ["p", "page_id", "cat", "s", "m", "author", "feed", "rest_route"].some((k) => searchParams.has(k));

  // Probe for secrets / backups in the URL.
  const looksLikeSecretProbe =
    /\.(bak|old|sql|zip|tar|gz|rar|7z|env|log|ini|yml|yaml|dist)$/i.test(pathname) ||
    /(?:^|\/)(?:backup|dump|database|db_backup|wp-config)/i.test(pathname);

  if (
    !isAppAdmin &&
    (isWordPressQuery || looksLikeSecretProbe || GONE_PATTERNS.some((re) => re.test(pathname)))
  ) {
    return withSecurityHeaders(
      new NextResponse("410 Gone — this page no longer exists.", {
        status: 410,
        headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
      }),
    );
  }

  // API routes: POST by default. Allow GET only for safe read endpoints.
  if (pathname.startsWith("/api/")) {
    const method = request.method.toUpperCase();
    const allowGet =
      pathname === "/api/availability" || pathname.startsWith("/api/geocode/") || pathname.startsWith("/api/admin/");
    if (method === "OPTIONS") {
      return withSecurityHeaders(new NextResponse(null, { status: 204 }));
    }
    if (method === "GET" && allowGet) {
      return withSecurityHeaders(NextResponse.next());
    }
    if (method !== "POST" && method !== "HEAD") {
      return withSecurityHeaders(
        NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 }),
      );
    }
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico|sitemap.xml|robots.txt).*)"],
};
