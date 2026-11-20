import "server-only";

/** Lightweight Sentry capture via envelope API when SENTRY_DSN is set. */
export async function captureError(error: unknown, context?: Record<string, unknown>) {
  const message = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error("[error]", message, context ?? "", stack ?? "");

  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  try {
    const match = dsn.match(/^https:\/\/([^@]+)@([^/]+)\/(\d+)/);
    if (!match) return;
    const [, key, host, project] = match;
    const payload = {
      message,
      level: "error",
      platform: "node",
      timestamp: Date.now() / 1000,
      tags: { app: "sori-mobile-tire" },
      extra: { ...context, stack },
    };
    await fetch(`https://${host}/api/${project}/store/?sentry_key=${key}&sentry_version=7`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[sentry] report failed", err);
  }
}
