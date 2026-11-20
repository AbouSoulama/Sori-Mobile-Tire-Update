import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SORI Mobile Tire Roadside Assistance LLC (SMT RSA) brings professional tire services on-site wherever you are in Waldorf, MD and surrounding areas.",
  alternates: { canonical: "/about" },
};

const commitments = [
  "Fully equipped service van with professional-grade tools",
  "Well-qualified and competent agents",
  "On-site service at your home, office or roadside",
  "24/7 emergency assistance line",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SMT RSA"
        title="About Us"
        intro="We come to you, providing professional tire services on-site wherever you are. Our quality service saves you time and hassle by bringing expert care directly to your location."
        image="/images/onsite-wheel-change.webp"
        crumbs={[{ label: "About" }]}
      />

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Our mission"
            title="Why Choose SMT RSA?"
            intro="We come to your location to provide professional tire services on-site, wherever you are. Our quality service saves you time and hassle by bringing specialized care directly to your location."
          />
          <ul className="mt-8 space-y-4">
            {commitments.map((item) => (
              <li key={item} data-reveal="left" className="flex items-start gap-3 text-lg text-navy">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div data-reveal="wipe" className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/smt-tire-mounting.webp"
              alt="Technician mounting a tire on a rim"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div data-reveal="zoom" className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image
              src="/images/technician-rolling-tire.webp"
              alt="Technician rolling a new tire"
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div data-reveal="zoom" className="flex aspect-square flex-col justify-end rounded-[2rem] bg-navy p-6 text-white">
            <p className="font-display text-6xl leading-none font-extrabold text-brand">100%</p>
            <p className="mt-2 text-sm text-white/75">Mobile. We bring the shop to you.</p>
          </div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title="Our Services"
            intro="Everything you need to keep your tires and wheels safe, handled by our mobile team."
            tone="dark"
          />
          <div className="mt-14">
            <ServiceGrid tone="dark" />
          </div>
        </div>
      </section>

      <Gallery />
      <CtaBand />
    </>
  );
}
