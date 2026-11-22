import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SORI Mobile Tire at +1 227 213 7071 or sorimobiletire@gmail.com. 3812 Light Arms Pl, Waldorf, MD 20602. 24/7 emergency service available.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        intro="We come to you, providing professional tire services on-site wherever you are. Our quality service saves you time and hassle by bringing expert care directly to your location."
        image="/images/tire-inspection.webp"
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <SectionHeading
            eyebrow="We're here to help"
            title="Get in Touch"
            intro="We're always ready to help with your mobile tire needs. Reach out through any of the methods below or fill out our contact form."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <InfoCard icon={MapPin} title="Our Location">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
              <br />
              United States
            </InfoCard>
            <InfoCard icon={Phone} title="Contact Info">
              Phone:{" "}
              <a href={site.phone.href} className="font-semibold text-navy hover:text-brand-700">
                {site.phone.display}
              </a>
              <br />
              Email:{" "}
              <a href={`mailto:${site.email}`} className="font-semibold break-all text-navy hover:text-brand-700">
                {site.email}
              </a>
            </InfoCard>
            <InfoCard icon={Clock} title="Business Hours">
              {site.hours.map((h) => (
                <span key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="font-semibold text-navy">{h.time}</span>
                </span>
              ))}
            </InfoCard>
            <InfoCard icon={Siren} title="Emergency" highlight>
              {site.emergency}
              <br />
              <a href={site.phone.href} className="mt-1 inline-block font-display text-2xl font-bold text-brand">
                {site.phone.display}
              </a>
            </InfoCard>
          </div>
        </div>

        <div data-reveal="right" className="rounded-[2rem] border border-navy/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(11,23,42,0.35)] sm:p-10">
          <h2 className="mb-2 text-3xl font-extrabold uppercase">Send us a message</h2>
          <p className="mb-8 text-slate-muted">
            Need a price?{" "}
            <Link href="/get-a-quote" className="font-semibold text-brand-700 underline underline-offset-2">
              Request a detailed quote
            </Link>{" "}
            instead.
          </p>
          <ContactForm />
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Service area"
            title="Our Location"
            intro="Visit us or request our mobile service to come to your location anywhere in Waldorf, MD and the surrounding areas."
          />
          <div data-reveal="zoom" className="mt-10 overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-sm">
            <iframe
              src={site.mapEmbed}
              title={`Map of ${site.address.full}`}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div data-reveal="zoom" className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-navy p-10 md:flex-row md:items-center md:p-14">
          <div>
            <h2 className="text-4xl font-extrabold text-white uppercase">Need Immediate Assistance?</h2>
            <p className="mt-2 text-white/70">Call our 24/7 emergency line or request service online.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.phone.href} className="btn-primary">
              <Phone className="size-4" /> Call Now
            </a>
            <Link href="/schedule-appointment" className="btn-ghost-light">
              <Mail className="size-4" /> Request Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
  highlight,
}: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      data-reveal="zoom"
      className={`rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        highlight ? "bg-navy text-white/80" : "bg-sand text-slate-muted"
      }`}
    >
      <Icon className="size-7 text-brand" aria-hidden />
      <h3 className={`mt-4 text-xl font-bold uppercase ${highlight ? "text-white" : ""}`}>{title}</h3>
      <div className="mt-2 space-y-1 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}
