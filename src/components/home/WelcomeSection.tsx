import Link from "next/link";
import { CalendarCheck, CheckCircle2, FilePenLine, MapPin } from "lucide-react";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { AnimatedVan } from "./AnimatedVan";

const points = ["24/7 emergency roadside line", "Fully equipped service van", "Well-qualified, competent agents"];

export function WelcomeSection() {
  return (
    <section id="welcome" className="relative isolate overflow-hidden bg-navy py-24 md:py-32">
      <div className="absolute inset-0 -z-20">
        <ParallaxImage src="/images/wheel-lug-nuts.webp" strength={0.16} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/95 via-navy/85 to-navy/95" />
      <div
        aria-hidden
        className="absolute top-10 right-[6%] -z-10 size-28 animate-float rounded-full bg-brand/90 shadow-[0_0_80px_20px_rgba(247,148,29,0.35)] md:size-40"
      />
      <div
        aria-hidden
        className="absolute bottom-16 left-[4%] -z-10 size-16 animate-float-slow rounded-full border-[10px] border-brand/50"
      />

      <div className="container-x">
        <div
          data-reveal="zoom"
          className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.25rem] bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)] lg:grid-cols-[1.05fr_1fr]"
        >
          {/* Illustration */}
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#e6f3fa] via-white to-white p-8 sm:p-12 lg:border-r lg:border-navy/10">
            <AnimatedVan className="max-w-[34rem]" />
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-bold tracking-[0.16em] text-white uppercase">
              <MapPin className="size-4 text-brand" aria-hidden /> On-site in Waldorf, MD &amp; beyond
            </p>
          </div>

          {/* Copy */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-4 text-5xl leading-[0.95] font-extrabold uppercase md:text-6xl">
              Welcome
              <span className="mt-1 block text-brand">to Sori Mobile Tire</span>
            </h2>
            <span className="grow-rule mt-6" aria-hidden />

            <p className="mt-7 text-lg leading-relaxed text-slate-muted">
              At Sori Mobile Tire, we are dedicated to providing exceptional vehicle wheel repair services anywhere and
              anytime to ensure customer satisfaction.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-muted">
              Our truck van is equipped with all the necessary equipment, enabling SMT RSA to serve our customers
              professionally with our well-qualified and competent agents.
            </p>

            <ul className="mt-7 grid gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 font-semibold text-navy">
                  <CheckCircle2 className="size-5 shrink-0 text-brand" aria-hidden /> {point}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/schedule-appointment" className="btn-dark">
                <CalendarCheck className="size-4" aria-hidden /> Schedule appointment
              </Link>
              <Link href="/get-a-quote" className="btn-primary">
                <FilePenLine className="size-4" aria-hidden /> Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
