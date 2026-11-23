import { site } from "./site";

/** Build a WhatsApp deep link (safe for client + server). */
export function whatsappLink(text: string, phoneDigits = site.whatsapp.href.match(/\d+/)?.[0] ?? "13012669830") {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`;
}

export function customerWhatsAppFollowUp(kind: string) {
  return whatsappLink(
    `Hi SORI Mobile Tire — I just submitted a ${kind} on your website and I'd like to confirm details.`,
  );
}
