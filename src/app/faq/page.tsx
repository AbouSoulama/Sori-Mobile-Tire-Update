import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { getFaq, getPricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "FAQ for SORI Mobile Tire: arrival times, service area, payments, tire repair, tire installs and 24/7 emergency help in Waldorf, MD.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const [faq, pricing] = await Promise.all([getFaq(), getPricing()]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Help center"
        title="FAQ"
        intro={faq.intro}
        image="/images/tire-inspection.webp"
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="container-x max-w-4xl py-20">
        <div className="space-y-4">
          {faq.items.map((item, i) => (
            <details
              key={item.q}
              data-reveal
              className="group rounded-3xl border border-navy/10 bg-white p-6 open:border-brand/40 open:shadow-lg"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none font-display text-xl font-bold text-navy uppercase marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="mt-1 text-brand transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Starting prices"
            title="Indicative pricing"
            intro={pricing.disclaimer}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pricing.items.map((item) => (
              <div key={item.name} data-reveal className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/5">
                <p className="text-sm font-bold tracking-widest text-brand-700 uppercase">{item.unit}</p>
                <h3 className="mt-2 text-xl font-bold uppercase">{item.name}</h3>
                <p className="mt-3 font-display text-4xl font-extrabold text-navy">
                  {item.from === 0 ? "Ask" : `From $${item.from}`}
                </p>
                {item.note && <p className="mt-2 text-sm text-slate-muted">{item.note}</p>}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-muted">
            Edit prices anytime in <code className="rounded bg-white px-1.5 py-0.5">content/pricing.json</code>. Need a
            firm number?{" "}
            <Link href="/get-a-quote" className="font-bold text-brand-700 underline">
              Request a quote
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
