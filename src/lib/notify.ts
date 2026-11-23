import "server-only";
import { site } from "./site";
import { customerWhatsAppFollowUp } from "./whatsapp";

export { whatsappLink, customerWhatsAppFollowUp } from "./whatsapp";

/**
 * Optional SMS via Twilio REST API (no SDK). Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM.
 * Fails soft — never blocks form success.
 */
export async function sendSms(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) return false;

  const digits = to.replace(/\D/g, "");
  const e164 = digits.length === 10 ? `+1${digits}` : digits.startsWith("1") && digits.length === 11 ? `+${digits}` : `+${digits}`;

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: e164, From: from, Body: body.slice(0, 1500) }),
    });
    if (!res.ok) {
      console.error("[sms] Twilio error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[sms] failed", error);
    return false;
  }
}

export async function notifyCustomerChannels({
  kind,
  emailName,
  phone,
}: {
  kind: string;
  emailName?: string;
  phone?: string | null;
}) {
  const first = (emailName ?? "").trim().split(/\s+/)[0] || "there";
  const wa = customerWhatsAppFollowUp(kind);
  if (phone) {
    await sendSms(
      phone,
      `Hi ${first}, SORI Mobile Tire received your ${kind}. We'll contact you shortly. Call ${site.phone.display} or WhatsApp: ${wa}`,
    ).catch(() => false);
  }
  return { whatsappUrl: wa };
}
