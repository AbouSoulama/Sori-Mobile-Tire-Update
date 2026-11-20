"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Loader2, Lock, LogOut, RefreshCw } from "lucide-react";

type Leads = {
  quotes: Record<string, unknown>[];
  appointments: Record<string, unknown>[];
  messages: Record<string, unknown>[];
  subscribers: Record<string, unknown>[];
};

export function AdminApp({
  configured,
  initialAuthed,
  adminEmail,
}: {
  configured: boolean;
  initialAuthed: boolean;
  adminEmail: string;
}) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Leads | null>(null);
  const [tab, setTab] = useState<"quotes" | "appointments" | "messages" | "newsletter">("quotes");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", { credentials: "same-origin" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!data.ok) {
        setError(data.message || "Could not load leads.");
        return;
      }
      setLeads(data);
    } catch {
      setError("Could not reach the server. Check that the site is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) void load();
  }, [authed, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message || `Login failed (${res.status}).`);
        return;
      }
      setPassword("");
      setAuthed(true);
    } catch {
      setError("Could not reach the login API. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setLeads(null);
  }

  async function setStatus(type: string, id: number, status?: string, is_read?: boolean) {
    await fetch("/api/admin/leads/status", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type, id, status, is_read }),
    });
    await load();
  }

  if (!configured) {
    return (
      <section className="container-x py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-navy/10 bg-sand p-10">
          <Lock className="size-10 text-brand" aria-hidden />
          <h1 className="mt-4 text-3xl font-extrabold uppercase">Admin not configured</h1>
          <p className="mt-3 text-slate-muted">
            Set <code className="rounded bg-white px-1.5">ADMIN_PASSWORD</code> and{" "}
            <code className="rounded bg-white px-1.5">ADMIN_SESSION_SECRET</code> in the Hostinger environment
            variables, then rebuild.
          </p>
        </div>
      </section>
    );
  }

  if (!authed) {
    return (
      <section className="container-x flex min-h-[70vh] items-center justify-center py-16">
        <form onSubmit={login} className="w-full max-w-md rounded-[2rem] border border-navy/10 bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold uppercase">Staff login</h1>
          <p className="mt-2 text-sm text-slate-muted">Protected inbox for quotes, appointments and messages.</p>
          <label className="field-label mt-8" htmlFor="admin-email">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            required
          />
          <label className="field-label mt-4" htmlFor="admin-pass">
            Password
          </label>
          <input
            id="admin-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
            required
          />
          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
          </button>
        </form>
      </section>
    );
  }

  const rows =
    tab === "quotes"
      ? leads?.quotes
      : tab === "appointments"
        ? leads?.appointments
        : tab === "messages"
          ? leads?.messages
          : leads?.subscribers;

  return (
    <section className="container-x py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold uppercase">Leads desk</h1>
          <p className="text-slate-muted">Mark items processed and export CSV anytime.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void load()} className="btn-outline py-2">
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button type="button" onClick={() => void logout()} className="btn-dark py-2">
            <LogOut className="size-4" /> Log out
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["quotes", "Quotes"],
            ["appointments", "Appointments"],
            ["messages", "Messages"],
            ["newsletter", "Newsletter"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              tab === key ? "bg-navy text-white" : "bg-sand text-navy hover:bg-brand-100"
            }`}
          >
            {label}
          </button>
        ))}
        <a
          href={`/api/admin/export?type=${tab === "messages" ? "contacts" : tab}`}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2 text-sm font-bold"
        >
          <Download className="size-4" /> Export CSV
        </a>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-navy/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-sand text-xs tracking-wide text-slate-muted uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Who</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((row) => {
              const id = Number(row.id);
              const who =
                tab === "newsletter"
                  ? String(row.email)
                  : tab === "messages"
                    ? `${row.name} · ${row.email}`
                    : `${row.first_name} ${row.last_name} · ${row.email}`;
              const details =
                tab === "quotes"
                  ? `${Array.isArray(row.services) ? (row.services as string[]).join(", ") : row.services} — ${row.city}, ${row.state}`
                  : tab === "appointments"
                    ? `${row.service} · ${row.appointment_date} ${row.appointment_time}`
                    : tab === "messages"
                      ? `${row.subject || "No subject"} — ${String(row.message).slice(0, 80)}`
                      : row.is_active ? "Active" : "Inactive";
              const status =
                tab === "messages" ? (row.is_read ? "read" : "new") : String(row.status ?? "—");
              return (
                <tr key={`${tab}-${id}`} className="border-t border-navy/10 align-top">
                  <td className="px-4 py-3 font-mono text-xs">{id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-navy">{who}</div>
                    {"phone" in row && row.phone ? (
                      <a href={`tel:${row.phone}`} className="text-brand-700">
                        {String(row.phone)}
                      </a>
                    ) : null}
                  </td>
                  <td className="max-w-sm px-4 py-3 text-slate-muted">{details}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-sand px-2.5 py-1 text-xs font-bold uppercase">{status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-muted">
                    {row.created_at ? new Date(String(row.created_at)).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {tab === "quotes" && (
                      <button
                        type="button"
                        className="text-sm font-bold text-brand-700"
                        onClick={() => void setStatus("quote", id, status === "closed" ? "new" : "contacted")}
                      >
                        {status === "new" ? "Mark contacted" : "Mark new"}
                      </button>
                    )}
                    {tab === "appointments" && (
                      <button
                        type="button"
                        className="text-sm font-bold text-brand-700"
                        onClick={() =>
                          void setStatus(
                            "appointment",
                            id,
                            status === "confirmed" ? "completed" : "confirmed",
                          )
                        }
                      >
                        {status === "requested" ? "Confirm" : status === "confirmed" ? "Complete" : "Re-confirm"}
                      </button>
                    )}
                    {tab === "messages" && (
                      <button
                        type="button"
                        className="text-sm font-bold text-brand-700"
                        onClick={() => void setStatus("contact", id, undefined, !row.is_read)}
                      >
                        {row.is_read ? "Mark unread" : "Mark read"}
                      </button>
                    )}
                    {tab === "newsletter" && <span className="text-slate-muted">—</span>}
                  </td>
                </tr>
              );
            })}
            {!rows?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-muted">
                  {loading ? "Loading…" : "No records yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
