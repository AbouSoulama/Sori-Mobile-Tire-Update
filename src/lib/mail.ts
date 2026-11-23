import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { captureError } from "./errors";
import { customerWhatsAppFollowUp } from "./notify";
import { site } from "./site";

let transporter: Transporter | null = null;
let logoBuffer: Buffer | null = null;

const MAX_SEND_ATTEMPTS = 3;

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  // Fresh connection per message — Hostinger pooled sockets often go stale between form submits.
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    pool: false,
    connectionTimeout: 20_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
    tls: { minVersion: "TLSv1.2" },
  });
}

function getTransporter() {
  if (!smtpConfigured()) return null;
  transporter ??= createTransporter();
  return transporter;
}

function resetTransporter() {
  if (!transporter) return;
  try {
    transporter.close();
  } catch {
    // ignore close errors on a broken socket
  }
  transporter = null;
}

function isTransientMailError(error: unknown) {
  if (!error || typeof error !== "object") return true;
  const err = error as { code?: string; responseCode?: number; permanent?: boolean };
  if (err.permanent === true) return false;
  if (typeof err.responseCode === "number" && err.responseCode >= 500 && err.responseCode !== 503) {
    return false;
  }
  const code = (err.code ?? "").toUpperCase();
  return [
    "ETIMEDOUT",
    "ESOCKET",
    "ECONNECTION",
    "ECONNRESET",
    "ECONNREFUSED",
    "EPIPE",
    "EENVELOPE",
    "ETLS",
    "EDNS",
  ].includes(code) || code === "" || err.responseCode === 421 || err.responseCode === 450 || err.responseCode === 451 || err.responseCode === 452 || err.responseCode === 503;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getLogoAttachment() {
  if (!logoBuffer) {
    logoBuffer = await readFile(path.join(process.cwd(), "public", "images", "logo-email.png"));
  }
  return {
    filename: "logo.png",
    content: logoBuffer,
    cid: "smt-logo",
    contentType: "image/png" as const,
    contentDisposition: "inline" as const,
  };
}

const escape = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export type MailRow = [label: string, value: unknown];

/** Strip accidental wrapping quotes from Hostinger/hPanel env values. */
function fromAddress() {
  const raw = (process.env.MAIL_FROM ?? `${site.name} <${site.email}>`).trim();
  return raw.replace(/^['"]+|['"]+$/g, "");
}

/** Comma/semicolon-separated list; always falls back to the public contact mailbox. */
function notifyRecipients() {
  const raw = (process.env.NOTIFY_EMAIL ?? site.email).trim();
  const list = raw
    .split(/[,;]+/)
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  return list.length ? [...new Set(list)] : [site.email];
}

const notifyTo = () => notifyRecipients().join(", ");

/** Shared branded shell used for every transactional email. Logo is embedded via cid:smt-logo. */
function emailShell({
  preheader,
  eyebrow,
  title,
  bodyHtml,
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escape(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f3ee;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escape(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ee;padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 18px 50px rgba(11,23,42,0.12)">
          <tr>
            <td style="background:#0b172a;padding:22px 28px;border-bottom:4px solid #f7941d">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;width:64px">
                    <img src="cid:smt-logo" width="56" height="60" alt="${escape(site.name)}" style="display:block;border:0;width:56px;height:auto;background:#ffffff;border-radius:12px;padding:4px" />
                  </td>
                  <td style="vertical-align:middle;padding-left:14px">
                    <div style="font-size:18px;font-weight:800;letter-spacing:0.04em;color:#ffffff;text-transform:uppercase">${escape(site.name)}</div>
                    <div style="margin-top:4px;font-size:11px;font-weight:700;letter-spacing:0.22em;color:#f7941d;text-transform:uppercase">Roadside Assistance</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px">
              <div style="font-size:12px;font-weight:700;letter-spacing:0.18em;color:#c06a05;text-transform:uppercase">${escape(eyebrow)}</div>
              <h1 style="margin:10px 0 0;font-size:26px;line-height:1.15;color:#0b172a">${escape(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;font-size:15px;line-height:1.6;color:#0f172a">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b172a;border-radius:14px">
                <tr>
                  <td style="padding:18px 20px;color:#ffffff;font-size:14px">
                    <div style="font-weight:700;margin-bottom:6px">Need help right away?</div>
                    <a href="${site.phone.href}" style="color:#f7941d;text-decoration:none;font-weight:700">${escape(site.phone.display)}</a>
                    &nbsp;·&nbsp;
                    <a href="mailto:${site.email}" style="color:#ffffff;text-decoration:none">${escape(site.email)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f6f3ee;padding:18px 28px;font-size:12px;line-height:1.55;color:#5b6577;border-top:1px solid #ebe5db">
              <strong style="color:#0b172a">${escape(site.legalName)}</strong><br />
              ${escape(site.address.full)}<br />
              <a href="${site.url}" style="color:#c06a05;text-decoration:none">${escape(site.url.replace(/^https?:\/\//, ""))}</a>
              &nbsp;·&nbsp;${escape(site.emergency)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function rowsToTable(rows: MailRow[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:18px 0;border:1px solid #ebe5db;border-radius:12px;overflow:hidden">
    ${rows
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(
        ([label, value]) =>
          `<tr>
            <td style="padding:10px 14px;background:#f6f3ee;font-weight:700;color:#0b172a;width:38%;vertical-align:top;border-bottom:1px solid #ebe5db;font-size:13px">${escape(label)}</td>
            <td style="padding:10px 14px;color:#0f172a;white-space:pre-wrap;border-bottom:1px solid #ebe5db;font-size:14px">${escape(
              Array.isArray(value) ? value.join(", ") : value,
            )}</td>
          </tr>`,
      )
      .join("")}
  </table>`;
}

function rowsToText(rows: MailRow[]) {
  return rows
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([l, v]) => `${l}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
}

async function sendBrandedMail({
  to,
  subject,
  replyTo,
  preheader,
  eyebrow,
  title,
  bodyHtml,
  text,
  highPriority = false,
}: {
  to: string | string[];
  subject: string;
  replyTo?: string;
  preheader: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  text: string;
  highPriority?: boolean;
}) {
  if (!smtpConfigured()) {
    console.warn(`[mail] SMTP not configured, skipping: ${subject}`);
    return false;
  }

  const recipients = (Array.isArray(to) ? to : [to]).map((v) => v.trim()).filter(Boolean);
  if (!recipients.length) {
    console.warn(`[mail] no recipients, skipping: ${subject}`);
    return false;
  }

  const logo = await getLogoAttachment();
  const smtpUser = process.env.SMTP_USER!;
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_SEND_ATTEMPTS; attempt++) {
    const t = getTransporter();
    if (!t) return false;

    try {
      const info = await t.sendMail({
        from: fromAddress(),
        to: recipients,
        replyTo,
        subject,
        html: emailShell({ preheader, eyebrow, title, bodyHtml }),
        text,
        attachments: [logo],
        // Envelope must match the authenticated Hostinger mailbox (avoids silent relay drops).
        envelope: { from: smtpUser, to: recipients },
        headers: highPriority
          ? {
              Importance: "high",
              Priority: "urgent",
              "X-Priority": "1",
              "X-MSMail-Priority": "High",
            }
          : undefined,
      });
      console.info(
        `[mail] sent ok → ${recipients.join(", ")} | id=${info.messageId ?? "?"} | accepted=${JSON.stringify(info.accepted ?? [])}`,
      );
      return true;
    } catch (error) {
      lastError = error;
      const transient = isTransientMailError(error);
      console.error(
        `[mail] send failed (attempt ${attempt}/${MAX_SEND_ATTEMPTS}, transient=${transient}): ${subject} → ${recipients.join(", ")}`,
        error,
      );
      resetTransporter();
      if (!transient || attempt === MAX_SEND_ATTEMPTS) break;
      await sleep(500 * attempt);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError ?? "mail send failed"));
}

export type CustomerMailKind = "quote" | "appointment" | "contact" | "newsletter";

export async function notifyBusiness(subject: string, rows: MailRow[], replyTo?: string) {
  return sendBrandedMail({
    to: notifyRecipients(),
    subject: `[${site.name}] ${subject}`,
    replyTo,
    preheader: subject,
    eyebrow: "New website submission",
    title: subject,
    bodyHtml: `<p style="margin:0 0 4px">A new request just arrived from the ${escape(site.name)} website.</p>${rowsToTable(rows)}`,
    text: `${subject}\n\n${rowsToText(rows)}\n\n— ${site.name}\n${site.phone.display}\n${site.email}`,
    highPriority: true,
  });
}

/**
 * Send admin notification first (critical), then customer confirmation.
 * Parallel SMTP to Hostinger often drops one of the two messages.
 * Returns true if the admin email was delivered.
 */
export async function deliverFormEmails({
  form,
  adminSubject,
  adminRows,
  replyTo,
  customer,
}: {
  form: string;
  adminSubject: string;
  adminRows: MailRow[];
  replyTo?: string;
  customer?: {
    to: string;
    kind: CustomerMailKind;
    name?: string | null;
    summary?: MailRow[];
  };
}) {
  let adminOk = false;
  try {
    adminOk = await notifyBusiness(adminSubject, adminRows, replyTo);
  } catch (error) {
    console.error(`[mail] admin notify failed for ${form}`, error);
    await captureError(error, { form, stage: "notify-admin", to: notifyTo() });
  }

  if (customer) {
    try {
      await sendCustomerConfirmation(customer);
    } catch (error) {
      console.error(`[mail] customer confirmation failed for ${form}`, error);
      await captureError(error, { form, stage: "notify-customer", to: customer.to });
    }
  }

  if (!adminOk) {
    console.error(`[mail] admin did not receive notification for ${form} → ${notifyTo()}`);
  }

  return adminOk;
}

const customerCopy: Record<
  CustomerMailKind,
  { subject: string; eyebrow: string; title: (name: string) => string; intro: string; next: string }
> = {
  quote: {
    subject: "We received your quote request",
    eyebrow: "Quote request",
    title: (name) => `Thank you${name ? `, ${name}` : ""}!`,
    intro:
      "We received your quote request. One of our technicians will review the details and get back to you shortly.",
    next: "If this is an emergency flat tire, call us now — we are available 24/7.",
  },
  appointment: {
    subject: "We received your appointment request",
    eyebrow: "Appointment",
    title: (name) => `You're on our list${name ? `, ${name}` : ""}`,
    intro: "We received your appointment request. We will confirm the date and time with you as soon as possible.",
    next: "Need to change something? Reply to this email or call our 24/7 line.",
  },
  contact: {
    subject: "We received your message",
    eyebrow: "Contact message",
    title: (name) => `Thanks for reaching out${name ? `, ${name}` : ""}`,
    intro: "We received your message and will reply as soon as we can.",
    next: "For roadside emergencies, please call us directly — do not wait for an email reply.",
  },
  newsletter: {
    subject: "You're subscribed",
    eyebrow: "Newsletter",
    title: () => "Welcome aboard",
    intro: "You're subscribed to the SORI Mobile Tire newsletter. Expect exclusive offers and useful tire tips.",
    next: "You can unsubscribe anytime by replying to this email.",
  },
};

/**
 * Confirmation email to the customer. Always sent when SMTP is configured
 * (set SEND_CUSTOMER_CONFIRMATION=false only to disable temporarily).
 */
export async function sendCustomerConfirmation({
  to,
  kind,
  name,
  summary,
}: {
  to: string;
  kind: CustomerMailKind;
  name?: string | null;
  summary?: MailRow[];
}) {
  if (process.env.SEND_CUSTOMER_CONFIRMATION === "false") return false;

  const copy = customerCopy[kind];
  const first = (name ?? "").trim().split(/\s+/)[0] ?? "";
  const summaryHtml = summary?.length
    ? `<p style="margin:18px 0 6px;font-weight:700;color:#0b172a">Here is a copy of what you sent:</p>${rowsToTable(summary)}`
    : "";

  const wa = customerWhatsAppFollowUp(
    kind === "quote"
      ? "quote request"
      : kind === "appointment"
        ? "appointment request"
        : kind === "contact"
          ? "contact message"
          : "newsletter signup",
  );

  return sendBrandedMail({
    to,
    subject: `${copy.subject} — ${site.name}`,
    replyTo: site.email,
    preheader: copy.intro,
    eyebrow: copy.eyebrow,
    title: copy.title(first),
    bodyHtml: `<p style="margin:0">${escape(copy.intro)}</p>
      ${summaryHtml}
      <p style="margin:18px 0 0">${escape(copy.next)}</p>
      <p style="margin:22px 0 0">
        <a href="${site.phone.href}" style="display:inline-block;background:#f7941d;color:#0b172a;text-decoration:none;font-weight:800;padding:12px 20px;border-radius:999px;margin-right:8px">Call ${escape(site.phone.display)}</a>
        <a href="${wa}" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;font-weight:800;padding:12px 20px;border-radius:999px">WhatsApp us</a>
      </p>`,
    text: `${copy.title(first)}\n\n${copy.intro}\n\n${summary ? rowsToText(summary) + "\n\n" : ""}${copy.next}\n\nCall: ${site.phone.display}\nWhatsApp: ${wa}\n${site.email}\n${site.address.full}`,
  });
}
