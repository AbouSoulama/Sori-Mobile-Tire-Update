import type { Metadata } from "next";
import { CalendarCheck, MapPin, Phone, Truck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getVehicleCatalog } from "@/lib/vehicle-catalog";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Schedule Your Service",
  description:
    "Book your mobile tire service appointment and SORI Mobile Tire will come to you - anywhere, anytime in Waldorf, MD and surrounding areas.",
  alternates: { canonical: "/schedule-appointment" },
};

const steps = [
  { icon: CalendarCheck, title: "Pick a time", text: "Choose the service, date and time that work for you." },
  { icon: Phone, title: "We confirm", text: "We call or email you to confirm the details." },
  { icon: Truck, title: "We come to you", text: "Our equipped van arrives at your location." },
];

export default async function ScheduleAppointmentPage() {
  const catalog = await getVehicleCatalog();
  return (
    <>
      <PageHero
        eyebrow="Book online"
        title="Schedule Your Service"
        intro="Book your mobile tire service appointment and we'll come to you - anywhere, anytime!"
        image="/images/onsite-wheel-change.webp"
        crumbs={[{ label: "Schedule Appointment" }]}
      />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_340px]">
        <div data-reveal className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(11,23,42,0.35)] sm:p-10">
          <h2 className="text-3xl font-extrabold uppercase">Book Your Appointment</h2>
          <p className="mt-2 mb-10 text-slate-muted">Tell us what you need and when - we&apos;ll take care of the rest.</p>
          <AppointmentForm catalog={catalog} />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <ol data-reveal="right" className="space-y-5 rounded-[2rem] bg-sand p-8">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-muted">STEP {i + 1}</p>
                  <h3 className="text-lg font-bold uppercase">{title}</h3>
                  <p className="text-sm text-slate-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal="right" className="rounded-[2rem] bg-navy p-8 text-white">
            <p className="flex items-center gap-2 text-sm text-white/70">
              <MapPin className="size-4 text-brand" aria-hidden /> {site.address.city}, {site.address.region} &amp; surrounding areas
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold uppercase">Emergency? Don&apos;t wait.</p>
            <a href={site.phone.href} className="btn-primary mt-6 w-full">
              <Phone className="size-4" /> {site.phone.display}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
