import type { Metadata } from "next";
import Image from "next/image";
import { Award, Gauge, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Tire Repair",
  description:
    "Fast, on-site tire repair using high-quality techniques and materials. Nails, screws, sharp objects: SORI Mobile Tire fixes it where you are.",
  alternates: { canonical: "/puncture-repair" },
};

const reasons = [
  {
    icon: Award,
    title: "Expertise and Experience",
    text: "Our experienced mechanics have extensive expertise in repairing tires of all makes and models.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty and Reliability",
    text: "We offer a warranty on our repairs, giving you peace of mind for your driving.",
  },
  {
    icon: Gauge,
    title: "Modern Equipment",
    text: "We use state-of-the-art equipment to diagnose and repair punctures accurately and efficiently.",
  },
  {
    icon: Zap,
    title: "Fast and Efficient Service",
    text: "We understand the importance of your time. Our repairs are quick and completed with minimal delay.",
  },
];

const punctures = [
  {
    title: "Nails and Screws",
    text: "Nails and screws are one of the most common causes of flat tires. They can penetrate the tire and cause a slow or rapid leak.",
  },
  {
    title: "Sharp Objects",
    text: "Sharp objects such as glass, metal or debris can also cause punctures by cutting the tire.",
  },
  {
    title: "Sidewall Damage",
    text: "Tire sidewall damage can be caused by impacts with curbs or heavy objects. This damage is often irreparable.",
  },
];

const tools = [
  "Wheel wrench",
  "Tire levers",
  "Air compressor",
  "Tire repair kit",
  "Depth gauge",
  "Work light",
  "Protective gloves",
  "Safety glasses",
  "Other specialized tools",
];

export default function PunctureRepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Flat tire repair"
        title="Tire Repair"
        intro="We repair tires quickly and efficiently, using high-quality techniques and materials."
        image="/images/puncture-repair.webp"
        crumbs={[{ label: "Services", href: "/services" }, { label: "Tire Repair" }]}
      />

      <section className="container-x py-24">
        <SectionHeading eyebrow="Our promise" title="Why Choose Our Services?" align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal className="group rounded-[2rem] border border-navy/10 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-xl">
              <Icon className="size-9 text-brand transition group-hover:scale-110" aria-hidden />
              <h3 className="mt-5 text-xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-slate-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Know the cause" title="Types of Common Punctures" />
            <div className="mt-10 space-y-4">
              {punctures.map((p) => (
                <div key={p.title} data-reveal="left" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-brand/40">
                  <h3 className="text-xl font-bold uppercase">{p.title}</h3>
                  <p className="mt-2 text-slate-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal="wipe" className="relative aspect-square overflow-hidden rounded-[2rem] lg:sticky lg:top-32">
            <Image
              src="/images/plug-tire.webp"
              alt="Plugging a punctured tire"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-[1fr_1.2fr]">
        <div data-reveal="wipe" className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/tire-inspection.webp"
            alt="Technician inspecting a tire"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow="On board our van" title="Tools and Equipment Used" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool} data-reveal="zoom" className="flex items-center gap-3 rounded-xl bg-sand px-4 py-3 font-semibold text-navy transition duration-300 hover:translate-x-1 hover:bg-brand-100">
                <span className="size-2 rounded-full bg-brand" aria-hidden />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <BrandStrip />
      <CtaBand
        title="Appointment"
        text="Contact us today to make an appointment and benefit from our reliable and efficient tire repair service."
      />
    </>
  );
}
