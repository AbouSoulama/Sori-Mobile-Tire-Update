import type { Metadata } from "next";
import Image from "next/image";
import { CalendarClock, Clock, Gauge, Layers, ListChecks, Ruler, Sofa, Tags, Warehouse } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { QuoteContactPanel } from "@/components/sections/QuoteContactPanel";

export const metadata: Metadata = {
  title: "Assistance with Online Tire Purchases",
  description:
    "Find the perfect tires for your vehicle in just a few clicks. SORI Mobile Tire helps you choose online and installs them at your location.",
  alternates: { canonical: "/tire-purchase-assistance" },
};

const whyOnline = [
  { icon: Sofa, title: "Comfort and Simplicity", text: "Easily compare prices and models, and buy directly from home." },
  { icon: Clock, title: "Saving Time", text: "Avoid trips to the store and save valuable time." },
  { icon: Layers, title: "Wide Choice", text: "Access a wide selection of brands and models, suitable for all vehicles." },
];

const howToChoose = [
  {
    icon: Ruler,
    title: "Dimensions and Load Index",
    text: "Check your owner's manual or the sidewall of your current tires for the required dimensions and load rating.",
  },
  {
    icon: Gauge,
    title: "Speed Index and Tire Type",
    text: "Choose a speed rating that suits your driving style and select the tire type (summer, winter, all-season) based on your climate.",
  },
  {
    icon: Tags,
    title: "Brands and Prices",
    text: "Compare the prices and performance of different brands and choose the tire that best suits your budget and needs.",
  },
];

const installTips = [
  { icon: Warehouse, title: "Choose a Reliable Installer", text: "Choose a reliable and competent team for the installation of your tires, or let us come to you." },
  { icon: CalendarClock, title: "Make an Appointment", text: "Make an appointment in advance to ensure quick and efficient installation." },
  { icon: ListChecks, title: "Tire Check", text: "Request a complete check of your tires, including balancing and geometry." },
];

export default function TirePurchaseAssistancePage() {
  return (
    <>
      <PageHero
        eyebrow="Tire buying made easy"
        title="Assistance with Online Tire Purchases"
        intro="Find the perfect ones for your vehicle in just a few clicks, quickly and easily."
        image="/images/technician-rolling-tire.webp"
        crumbs={[{ label: "Services", href: "/services" }, { label: "Tire Purchase Assistance" }]}
      />

      <BrandStrip />

      <section className="container-x py-24">
        <SectionHeading eyebrow="Benefits" title="Why Buy Tires Online?" align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {whyOnline.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal="zoom" className="group rounded-[2rem] bg-sand p-8 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand text-navy transition duration-500 group-hover:rotate-[360deg]">
                <Icon className="size-7" aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-slate-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Buying guide" title="How to choose the right tires for your vehicle?" tone="dark" />
            <div className="mt-10 space-y-6">
              {howToChoose.map(({ icon: Icon, title, text }) => (
                <div key={title} data-reveal="left" className="flex gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase">{title}</h3>
                    <p className="mt-1 text-white/70">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/technician-impact-wrench.webp"
              alt="Technician installing a new tire"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <SectionHeading eyebrow="After you buy" title="Our advice for easy installation" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {installTips.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal className="rounded-[2rem] border border-navy/10 p-8 transition duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-xl">
              <Icon className="size-9 text-brand" aria-hidden />
              <h3 className="mt-5 text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-slate-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
      <QuoteContactPanel />
    </>
  );
}
