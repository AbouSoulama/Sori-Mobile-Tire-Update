import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export function CtaBand({
  title = "Ready for Expert Tire Service?",
  text = "Schedule an appointment today and our mobile team will come to your location with all the equipment needed to provide top-quality tire services.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-x py-20">
      <div
        data-reveal="zoom"
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand to-brand-600 px-8 py-14 md:px-16 md:py-16"
      >
        <div
          aria-hidden
          className="absolute -top-20 left-1/3 size-56 animate-float rounded-full bg-white/20 blur-2xl"
        />
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute -right-16 -bottom-24 size-96 animate-spin-slow text-navy/10"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
        >
          <circle cx="100" cy="100" r="86" />
          <circle cx="100" cy="100" r="44" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="56"
              x2="100"
              y2="14"
              transform={`rotate(${i * 45} 100 100)`}
            />
          ))}
        </svg>
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-4xl leading-[0.95] font-extrabold text-navy uppercase md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-lg text-navy/80">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/schedule-appointment" className="btn-dark">
              Schedule Appointment
            </Link>
            <a href={site.phone.href} className="btn border-2 border-navy text-navy hover:bg-navy hover:text-white">
              <Phone className="size-4" /> {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
