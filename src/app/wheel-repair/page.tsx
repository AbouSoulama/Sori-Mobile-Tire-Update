import type { Metadata } from "next";
import Image from "next/image";
import { CircleDollarSign, Leaf, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { QuoteContactPanel } from "@/components/sections/QuoteContactPanel";

export const metadata: Metadata = {
  title: "Wheel Repair",
  description:
    "Mobile wheel repair for cracks, dents, corrosion and wear. Your road safety starts with wheels in perfect condition. Free quote from SORI Mobile Tire.",
  alternates: { canonical: "/wheel-repair" },
};

const reasons = [
  {
    icon: ShieldCheck,
    title: "Road Safety",
    text: "Damaged wheels can affect handling and braking, putting your safety at risk.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    text: "Repairing your wheels can extend their life, allowing you to enjoy your vehicle for longer.",
  },
  {
    icon: CircleDollarSign,
    title: "Economy",
    text: "Repair is often more affordable than replacement, saving you money in the long run.",
  },
];

const damages = [
  { title: "Cracks", text: "Cracks can appear following impacts or excessive wear, weakening the structure of the wheel." },
  { title: "Dents", text: "Dents can form after an impact, deforming the wheel and affecting balance." },
  { title: "Corrosion", text: "Corrosion can damage the rim, reducing its strength and durability." },
  { title: "Wear", text: "Normal wear and tear can damage the edges of the wheel, affecting grip and safety." },
];

const tips = [
  { title: "Regular Inspection", text: "Examine your wheels regularly for signs of damage or wear." },
  { title: "Tire Pressure", text: "Check and adjust tire pressure according to the manufacturer's recommendations." },
  { title: "Regular Balancing", text: "Have your wheels balanced regularly to prevent vibration and premature wear." },
  { title: "Rim Maintenance", text: "Clean your rims regularly to remove dirt and debris that can damage the surface." },
];

export default function WheelRepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Wheel repair & balancing"
        title="Wheel Repair"
        intro="Your road safety starts with wheels in perfect condition."
        image="/images/alloy-wheel.webp"
        crumbs={[{ label: "Services", href: "/services" }, { label: "Wheel Repair" }]}
      />

      <section className="container-x py-24">
        <SectionHeading eyebrow="Why it matters" title="Why Repair Your Wheels?" align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} data-reveal className="group rounded-[2rem] bg-sand p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-navy text-brand transition duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-navy">
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
          <div data-reveal="wipe" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/wheel-lug-nuts.webp"
              alt="Technician removing wheel lug nuts"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Diagnosis" title="Types of Wheel Damage" tone="dark" />
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {damages.map((d, i) => (
                <div key={d.title} data-reveal="zoom" className="rounded-2xl border border-white/10 p-6 transition duration-300 hover:border-brand/60 hover:bg-white/[0.04]">
                  <dt className="flex items-baseline gap-3">
                    <span className="font-display text-lg font-bold text-brand">0{i + 1}</span>
                    <span className="font-display text-2xl font-bold text-white uppercase">{d.title}</span>
                  </dt>
                  <dd className="mt-2 text-white/70">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <SectionHeading eyebrow="Care guide" title="Maintenance Tips for Wheels" />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip, i) => (
            <li key={tip.title} data-reveal className="border-t-4 border-brand pt-6">
              <span className="font-display text-sm font-bold tracking-widest text-slate-muted">STEP {i + 1}</span>
              <h3 className="mt-2 text-2xl font-bold uppercase">{tip.title}</h3>
              <p className="mt-2 text-slate-muted">{tip.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <QuoteContactPanel title="Contact us for a Free Quote" />
    </>
  );
}
