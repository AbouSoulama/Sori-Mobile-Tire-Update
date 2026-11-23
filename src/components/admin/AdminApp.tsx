"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Loader2, Lock, LogOut, RefreshCw, X } from "lucide-react";

type Leads = {
  quotes: Record<string, unknown>[];
  appointments: Record<string, unknown>[];
  messages: Record<string, unknown>[];
  subscribers: Record<string, unknown>[];
};

type Tab = "quotes" | "appointments" | "messages" | "newsletter";

const HIDDEN_DETAIL_KEYS = new Set(["id", "ip_address"]);

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.filter(Boolean).join(", ") || "—";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  if (key === "created_at" || key.endsWith("_date")) {
    const d = new Date(String(value));
    if (!Number.isNaN(d.getTime()) && String(value).includes("-")) {
      return key === "created_at" ? d.toLocaleString() : String(value);
    }
  }
  if (key === "is_read" || key === "is_active") return value ? "Yes" : "No";
  return String(value);
}

function labelFor(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function detailRows(tab: Tab, row: Record<string, unknown>): Array<[string, string]> {
  const preferred =
    tab === "quotes"
      ? [
          "first_name",
          "last_name",
          "email",
          "phone",
          "services",
          "quantity",
          "vehicle_year",
          "vehicle_make",
          "vehicle_model",
          "tire_width",
          "tire_profile",
          "rim_size",
          "address",
          "city",
          "state",
          "postal_code",
          "contact_preference",
          "message",
          "status",
          "created_at",
        ]
      : tab === "appointments"
        ? [
            "first_name",
            "last_name",
            "email",
            "phone",
            "service",
            "appointment_date",
            "appointment_time",
            "wait_preference",
            "vehicle_year",
            "vehicle_make",
            "vehicle_model",
            "tire_width",
            "tire_profile",
            "rim_size",
            "address",
            "city",
            "state",
            "postal_code",
            "contact_preference",
            "message",
            "status",
            "created_at",
          ]
        : tab === "messages"
          ? ["name", "email", "phone", "subject", "message", "is_read", "created_at"]
          : ["email", "is_active", "created_at"];

  const rows: Array<[string, string]> = [];
  const seen = new Set<string>();
  for (const key of preferred) {
    if (!(key in row) || HIDDEN_DETAIL_KEYS.has(key)) continue;
    rows.push([labelFor(key), formatValue(key, row[key])]);
    seen.add(key);
  }
  for (const key of Object.keys(row)) {
    if (seen.has(key) || HIDDEN_DETAIL_KEYS.has(key)) continue;
    rows.push([labelFor(key), formatValue(key, row[key])]);
  }
  return rows;
}

function LeadDetailPanel({
  tab,
  row,
  onClose,
}: {
  tab: Tab;
  row: Record<string, unknown>;
  onClose: () => void;
}) {
  const title =
    tab === "newsletter"
      ? String(row.email ?? "Subscriber")
      : tab === "messages"
        ? String(row.name ?? "Message")
        : `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim() || "Lead";

  const phone = row.phone ? String(row.phone) : "";
  const email = row.email ? String(row.email) : "";
  const fields = useMemo(() => detailRows(tab, row), [tab, row]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="lead-detail-title">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close details" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-white shadow-2xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-navy/10 bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand uppercase">{tab}</p>
            <h2 id="lead-detail-title" className="mt-1 text-2xl font-extrabold text-navy uppercase">
              {title}
            </h2>
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              {email && (
                <a href={`mailto:${email}`} className="font-semibold text-brand-700 hover:underline">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="font-semibold text-brand-700 hover:underline">
                  {phone}
                </a>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-navy/10 p-2 text-navy hover:bg-sand"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <dl className="divide-y divide-navy/10 px-6 py-2">
          {fields.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="text-xs font-bold tracking-wide text-slate-muted uppercase">{label}</dt>
              <dd className="whitespace-pre-wrap text-sm font-medium text-navy">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

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
  const [tab, setTab] = useState<Tab>("quotes");
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);

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

  useEffect(() => {
    setSelected(null);
  }, [tab]);

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
    setSelected(null);
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
          <p className="text-slate-muted">Click a client name to open the full submission.</p>
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
              const whoName =
                tab === "newsletter"
                  ? String(row.email)
                  : tab === "messages"
                    ? String(row.name)
                    : `${row.first_name} ${row.last_name}`;
              const whoEmail = tab === "newsletter" ? "" : String(row.email ?? "");
              const details =
                tab === "quotes"
                  ? `${Array.isArray(row.services) ? (row.services as string[]).join(", ") : row.services}${row.quantity ? ` · qty ${row.quantity}` : ""} — ${row.city}, ${row.state}`
                  : tab === "appointments"
                    ? `${row.service} · ${row.appointment_date} ${row.appointment_time}`
                    : tab === "messages"
                      ? `${row.subject || "No subject"} — ${String(row.message).slice(0, 80)}`
                      : row.is_active
                        ? "Active"
                        : "Inactive";
              const status =
                tab === "messages" ? (row.is_read ? "read" : "new") : String(row.status ?? "—");
              return (
                <tr key={`${tab}-${id}`} className="border-t border-navy/10 align-top">
                  <td className="px-4 py-3 font-mono text-xs">{id}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(row)}
                      className="text-left font-semibold text-navy underline-offset-2 hover:text-brand-700 hover:underline"
                    >
                      {whoName}
                    </button>
                    {whoEmail ? <div className="text-xs text-slate-muted">{whoEmail}</div> : null}
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

      {selected && <LeadDetailPanel tab={tab} row={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
