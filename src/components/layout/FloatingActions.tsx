import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingActions() {
  return (
    <>
      <a
        href={site.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed right-5 bottom-24 z-40 flex items-center gap-3 md:bottom-6"
      >
        <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-lg transition group-hover:translate-x-0 md:block md:translate-x-2 md:opacity-0 md:group-hover:opacity-100">
          How can I help you?
        </span>
        <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition group-hover:scale-105">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40 [animation-duration:2.5s]" />
          <svg viewBox="0 0 24 24" className="relative size-7" fill="currentColor" aria-hidden>
            <path d="M19.1 4.9A9.9 9.9 0 0 0 3.5 16.8L2 22l5.3-1.4a9.9 9.9 0 0 0 4.7 1.2 9.9 9.9 0 0 0 7.1-16.9ZM12 20.1a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3.1-.2-.3a8.2 8.2 0 1 1 7 3.9Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
          </svg>
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-navy/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <a href={site.phone.href} className="btn-dark py-3">
          <Phone className="size-4" /> Call Now
        </a>
        <Link href="/schedule-appointment" className="btn-primary py-3">
          <CalendarCheck className="size-4" /> Book Service
        </Link>
      </div>
    </>
  );
}
