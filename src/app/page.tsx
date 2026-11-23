import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarCheck,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";
import { site } from "@/lib/site";
import { HeroSlider } from "@/components/home/HeroSlider";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

const advantages = [
  {
    icon: Clock,
    title: "Save Time",
    text: "No need to drive to a shop and wait. We come to you at your home or office.",
  },
  {
    icon: Wrench,
    title: "Professional Service",
    text: "Our mobile technicians bring all the necessary equipment for quality tire service.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Pricing",
    text: "Get transparent pricing with no hidden fees. We offer great value for mobile service.",
  },
];

const steps = [
  {
    title: "Tell us what happened",
    text: "Call, message us on WhatsApp, or request a quote online with your vehicle and tire details.",
  },
  {
    title: "We drive to you",
    text: "Our fully equipped van reaches your home, office or roadside location.",
  },
  {
    title: "Back on the road",
    text: "Our agents repair, mount or balance on-site so you can drive away with confidence.",
  },
];

const quickInfo = [
  { icon: Phone, label: "Call 24/7", value: site.phone.display, href: site.phone.href },
  { icon: MapPin, label: "Service area", value: "Waldorf, MD & surrounding areas" },
  { icon: Clock, label: "Open", value: "Mon-Sun · 24/7 emergency" },
  { icon: FileText, label: "No obligation", value: "Get a free quote", href: "/get-a-quote" },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Quick info cards overlapping the hero */}
      <section className="relative z-10 -mt-14 bg-gradient-to-b from-transparent from-50% to-navy to-50% md:-mt-16">
        <div className="container-x">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:overflow-hidden lg:rounded-3xl lg:bg-white lg:shadow-[0_30px_60px_-20px_rgba(11,23,42,0.35)] lg:ring-1 lg:ring-navy/5">
            {quickInfo.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-brand transition duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-navy">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold tracking-[0.2em] text-brand-700 uppercase">{label}</span>
                    <span className="mt-1 block font-bold text-navy">{value}</span>
                  </span>
                </>
              );
              const cls =
                "group flex h-full items-center gap-4 rounded-3xl bg-white p-5 shadow-lg ring-1 ring-navy/5 transition duration-300 hover:-translate-y-1 lg:rounded-none lg:p-7 lg:shadow-none lg:ring-0 lg:hover:translate-y-0 lg:hover:bg-sand";
              return (
                <li key={label} data-reveal className="lg:border-r lg:border-navy/10 lg:last:border-r-0">
                  {href ? (
                    <a href={href} className={cls}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <WelcomeSection />

      {/* Services */}
      <section className="relative overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-3xl"
        />
        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Professional tire services, on-site"
              intro="From a flat on the highway to new tires in your driveway, our mobile team handles it where you are."
            />
            <Link href="/services" data-reveal="right" className="btn-dark shrink-0">
              All Services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-14">
            <ServiceGrid />
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <article
            data-reveal="left"
            className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] p-8 md:p-10"
          >
            <Image
              src="/images/plug-tire.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-20 object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-transparent" />
            <p className="eyebrow text-brand">Emergency</p>
            <h3 className="mt-3 text-4xl font-extrabold text-white uppercase">Flat Tire Repair</h3>
            <p className="mt-3 max-w-md text-white/75">
              Quickly and safely get back on the road after a flat tire emergency. We plug, patch or replace on the
              spot.
            </p>
            <Link href="/puncture-repair" className="mt-6 inline-flex items-center gap-2 font-bold text-brand">
              Tire repair <ArrowRight className="size-4 transition group-hover:translate-x-2" />
            </Link>
          </article>
          <div className="grid gap-6">
            <article
              data-reveal="right"
              className="group relative isolate flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[2rem] p-8"
            >
              <Image
                src="/images/alloy-wheel.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-20 object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <h3 className="text-3xl font-extrabold text-white uppercase">Wheel Repair</h3>
              <p className="mt-2 max-w-sm text-white/75">
                Reliable alloy wheel repair services, custom coloring &amp; OEM replacements. Ask for a free repair
                quote.
              </p>
              <Link href="/wheel-repair" className="mt-4 inline-flex items-center gap-2 font-bold text-brand">
                Wheel repair <ArrowRight className="size-4 transition group-hover:translate-x-2" />
              </Link>
            </article>
            <article
              data-reveal="right"
              style={{ "--d": "140ms" } as React.CSSProperties}
              className="group relative isolate flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[2rem] p-8"
            >
              <Image
                src="/images/technician-rolling-tire.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-20 object-cover object-[center_70%] transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <h3 className="text-3xl font-extrabold text-white uppercase">Online Tire Purchases Assistance</h3>
              <p className="mt-2 max-w-sm text-white/75">
                We help you pick the right tires online, then install them at your location.
              </p>
              <Link href="/tire-purchase-assistance" className="mt-4 inline-flex items-center gap-2 font-bold text-brand">
                How it works <ArrowRight className="size-4 transition group-hover:translate-x-2" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="container-x grid gap-14 py-24 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Advantages"
            title="Why Choose SMT RSA?"
            intro="We come to you, wherever you are, providing professional tire services on-site. We offer quality service, saving you time and hassle by coming to your location."
          />
          <ol className="relative mt-10 space-y-8">
            <span aria-hidden className="absolute top-6 bottom-6 left-6 w-0.5 bg-gradient-to-b from-brand via-brand/40 to-transparent" />
            {steps.map((step, i) => (
              <li key={step.title} data-reveal="left" className="relative flex gap-5">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand font-display text-xl font-extrabold text-navy shadow-[0_10px_24px_-8px_rgba(247,148,29,0.8)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold uppercase">{step.title}</h3>
                  <p className="mt-1 text-slate-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div data-reveal="wipe" className="relative min-h-[280px] overflow-hidden rounded-[2rem] sm:row-span-2">
            <Image
              src="/images/technician-impact-wrench.webp"
              alt="Technician tightening lug nuts with an impact wrench"
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
          {advantages.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              data-reveal="zoom"
              className={`group rounded-[2rem] ${i === advantages.length - 1 ? "sm:col-span-2" : ""} border border-navy/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-xl`}
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-navy">
                <Icon className="size-7" aria-hidden />
              </span>
              <h3 className="mt-4 text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-slate-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <BrandStrip />
      <Gallery />
      <Testimonials />

      {/* Any questions */}
      <section className="container-x grid gap-12 pt-24 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Get in touch"
          title="Any Questions?"
          intro="For any other information, do not hesitate to contact us via the most convenient means for you: by calling, sending an email, visiting us, or reaching out on social networks."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <ContactTile icon={Phone} label="Call us" value={site.phone.display} href={site.phone.href} />
          <ContactTile icon={Mail} label="Email us" value={site.email} href={`mailto:${site.email}`} />
          <ContactTile icon={MapPin} label="Visit us" value={site.address.full} />
          <ContactTile icon={CalendarCheck} label="Hours" value="Mon-Sun: 24/7" href="/schedule-appointment" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-navy">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="mt-4 block text-xs font-bold tracking-[0.2em] text-slate-muted uppercase">{label}</span>
      <span className="mt-1 block font-semibold break-words text-navy">{value}</span>
    </>
  );
  const className =
    "group block rounded-3xl border border-navy/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg";
  return href ? (
    <a href={href} data-reveal="zoom" className={className}>
      {content}
    </a>
  ) : (
    <div data-reveal="zoom" className={className}>
      {content}
    </div>
  );
}
