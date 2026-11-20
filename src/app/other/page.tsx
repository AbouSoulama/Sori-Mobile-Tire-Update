import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { additionalServices } from "@/lib/services";
import { PageHero } from "@/components/sections/PageHero";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { QuoteContactPanel } from "@/components/sections/QuoteContactPanel";

export const metadata: Metadata = {
  title: "Tire Mounting, Balancing, TPMS & More",
  description:
    "TPMS sensor calibration, wheel balance, tire assembly, valve stem replacement, tire disposal and patch repair, all on-site with SORI Mobile Tire.",
  alternates: { canonical: "/other" },
};

export default function OtherServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Other services"
        title="Tire Mounting"
        intro="For any tire repair needs, we resolve all these concerns for our customers."
        image="/images/smt-tire-mounting.webp"
        crumbs={[{ label: "Services", href: "/services" }, { label: "Other Services" }]}
      />

      <section className="container-x space-y-6 py-24">
        {additionalServices.map((service, i) => (
          <article
            id={service.id}
            key={service.id}
            data-reveal={i % 2 ? "right" : "left"}
            className="group grid scroll-mt-32 overflow-hidden rounded-[2rem] border border-navy/10 bg-white transition duration-300 hover:border-brand/50 hover:shadow-xl md:grid-cols-[320px_1fr]"
          >
            <div className={`relative min-h-[220px] bg-sand ${i % 2 ? "md:order-2" : ""}`}>
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="font-display text-sm font-bold tracking-widest text-brand-700">
                {String(i + 1).padStart(2, "0")} / {String(additionalServices.length).padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-3xl font-extrabold uppercase md:text-4xl">{service.title}</h2>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-muted">{service.description}</p>
              <Link
                href={`/schedule-appointment`}
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-brand-700 hover:text-navy"
              >
                Book this service <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <BrandStrip />
      <QuoteContactPanel />
    </>
  );
}
