import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { additionalServices } from "@/lib/services";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Mobile Tire Services",
  description:
    "Flat tire repair, tire installation, wheel repair, balancing, TPMS calibration, valve stems and more, delivered on-site by SORI Mobile Tire.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Mobile tire services"
        title="Services"
        intro="We come to you, wherever you are, providing professional tire services on-site. Quality service that saves you time and hassle."
        image="/images/tire-inspection.webp"
        crumbs={[{ label: "Services" }]}
      />

      <section className="relative overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 size-[28rem] rounded-full bg-brand/[0.08] blur-3xl"
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Core services"
            title="What we can do for you"
            intro="Every service below is delivered on-site by our mobile team — no shop wait, no towing."
          />
          <div className="mt-14">
            <ServiceGrid />
          </div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Also available"
              title="More tire services"
              intro="For any tire repair needs, we resolve all these concerns for our customers."
              tone="dark"
            />
            <Link href="/other" data-reveal="right" className="btn-ghost-light shrink-0">
              View details <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service) => (
              <li key={service.id} data-reveal="zoom">
                <Link
                  href={`/other#${service.id}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:bg-white/[0.08]"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white">
                    <Image src={service.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  <span className="font-display text-lg leading-tight font-bold text-white uppercase group-hover:text-brand">
                    {service.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BrandStrip />
      <CtaBand />
    </>
  );
}
