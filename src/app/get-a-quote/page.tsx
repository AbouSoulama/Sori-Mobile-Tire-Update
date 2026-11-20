import type { Metadata } from "next";
import { BadgeDollarSign, Clock, Phone, Wrench } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getVehicleCatalog } from "@/lib/vehicle-catalog";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a custom quote for mobile tire services: flat repair, tire purchase assistance, mounting, balancing, TPMS and more. SORI Mobile Tire, Waldorf MD.",
  alternates: { canonical: "/get-a-quote" },
};

const perks = [
  { icon: Clock, title: "Save Time", text: "No need to drive to a shop and wait. We come to you at your home or office." },
  { icon: Wrench, title: "Professional Service", text: "Our mobile technicians bring all the necessary equipment for quality tire service." },
  { icon: BadgeDollarSign, title: "Competitive Pricing", text: "Get transparent pricing with no hidden fees. We offer great value for mobile service." },
];

export default async function GetAQuotePage() {
  const catalog = await getVehicleCatalog();
  return (
    <>
      <PageHero
        eyebrow="Free estimate"
        title="Get a Quote"
        intro="Fill out the form below and we'll provide you with a custom quote for our mobile tire services."
        image="/images/technician-impact-wrench.webp"
        crumbs={[{ label: "Get a Quote" }]}
      />

      <section className="container-x grid gap-10 py-20 lg:grid-cols-[1fr_340px]">
        <div data-reveal className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(11,23,42,0.35)] sm:p-10">
          <h2 className="mb-10 text-3xl font-extrabold uppercase">Request a Quote</h2>
          <QuoteForm catalog={catalog} />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div data-reveal="right" className="rounded-[2rem] bg-navy p-8 text-white">
            <p className="eyebrow text-brand">Need help now?</p>
            <p className="mt-4 font-display text-3xl font-extrabold uppercase">Call our 24/7 line</p>
            <a href={site.phone.href} className="btn-primary mt-6 w-full">
              <Phone className="size-4" /> {site.phone.display}
            </a>
          </div>
          <h3 className="pt-4 text-2xl font-extrabold uppercase">Why Choose Our Mobile Tire Service?</h3>
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal="right" className="flex gap-4 rounded-3xl bg-sand p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Icon className="size-7 shrink-0 text-brand" aria-hidden />
              <div>
                <h3 className="text-lg font-bold uppercase">{title}</h3>
                <p className="mt-1 text-sm text-slate-muted">{text}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}
