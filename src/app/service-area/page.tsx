import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Ruler } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { getServiceArea } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "SORI Mobile Tire serves Waldorf, MD and surrounding Southern Maryland communities — typically within 40 miles. Call for an ETA.",
  alternates: { canonical: "/service-area" },
};

export default async function ServiceAreaPage() {
  const area = await getServiceArea();
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(area.hub.name)}&z=10&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Service Area"
        intro={area.intro}
        image="/images/onsite-wheel-change.webp"
        crumbs={[{ label: "Service Area" }]}
      />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading eyebrow="Where we drive" title={area.headline} intro={area.note} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div data-reveal className="rounded-3xl bg-sand p-6">
              <Ruler className="size-8 text-brand" aria-hidden />
              <p className="mt-4 font-display text-3xl font-extrabold uppercase">~{area.radiusMiles} miles</p>
              <p className="mt-1 text-slate-muted">Typical mobile radius from {area.hub.name}</p>
            </div>
            <div data-reveal className="rounded-3xl bg-navy p-6 text-white">
              <MapPin className="size-8 text-brand" aria-hidden />
              <p className="mt-4 font-display text-3xl font-extrabold uppercase">Home base</p>
              <p className="mt-1 text-white/70">{site.address.full}</p>
            </div>
          </div>
          <a href={site.phone.href} className="btn-primary mt-8">
            <Phone className="size-4" /> Call for a live ETA
          </a>
        </div>
        <div data-reveal="right" className="overflow-hidden rounded-[2rem] border border-navy/10 shadow-sm">
          <iframe title={`Map of ${area.hub.name} service area`} src={mapSrc} className="h-[420px] w-full" loading="lazy" />
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Cities we serve"
            title="Southern Maryland & nearby"
            intro="If your city is listed — or nearby — we can usually reach you. Outside the list? Call anyway for emergencies."
          />
          <ul className="mt-12 columns-2 gap-x-10 sm:columns-3 lg:columns-4">
            {area.cities.map((city) => (
              <li key={city} data-reveal className="mb-3 break-inside-avoid font-semibold text-navy">
                <span className="mr-2 inline-block size-1.5 rounded-full bg-brand align-middle" aria-hidden />
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-slate-muted">
            Looking for an emergency flat?{" "}
            <Link href="/emergency" className="font-bold text-brand-700 underline underline-offset-2">
              Open the emergency page
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand title="Not sure if we cover your spot?" text="Call or WhatsApp with your address — we'll tell you immediately if we can come." />
    </>
  );
}
