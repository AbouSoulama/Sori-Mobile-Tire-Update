import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function QuoteContactPanel({
  title = "Contact Us",
  text = "Reach out to us today for fast, reliable service and get back on the road with confidence.",
}: {
  title?: string;
  text?: string;
}) {
  const items = [
    { icon: Mail, label: "Office Mail", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Office Number", value: site.phone.display, href: site.phone.href },
    { icon: MapPin, label: "Office Address", value: site.address.full },
  ];

  return (
    <section className="bg-sand py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div data-reveal="left">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="text-4xl leading-[1] font-extrabold uppercase md:text-5xl">{title}</h2>
          <p className="mt-5 text-lg text-slate-muted">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote" className="btn-primary">
              Request a Quote
            </Link>
            <Link href="/schedule-appointment" className="btn-outline">
              Book an Appointment
            </Link>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <Icon className="size-7 text-brand" aria-hidden />
                <span className="mt-5 block text-xs font-bold tracking-[0.2em] text-slate-muted uppercase">{label}</span>
                <span className="mt-2 block font-semibold break-words text-navy">{value}</span>
              </>
            );
            return (
              <li
                key={label}
                data-reveal
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand/40"
              >
                {href ? (
                  <a href={href} className="block transition hover:opacity-80">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
