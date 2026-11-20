"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { Typewriter } from "@/components/motion/Typewriter";
import { site } from "@/lib/site";

const INTERVAL = 7000;

type Slide = {
  image: string;
  position: string;
  eyebrow: string;
  title: [string, string];
  text: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    image: "/images/hero-tire-service.webp",
    position: "object-[68%_center]",
    eyebrow: "SORI Mobile Tire Roadside Assistance LLC",
    title: ["Tire trouble?", "We come to you."],
    text: site.tagline,
    cta: { label: "Get a Free Quote", href: "/get-a-quote" },
  },
  {
    image: "/images/smt-tire-handling.webp",
    position: "object-[center_40%]",
    eyebrow: "Flat tire repair",
    title: ["Flat tire?", "Fixed on the spot."],
    text: "Plug, patch or replace right where you are: highway shoulder, driveway or office parking lot.",
    cta: { label: "Puncture repair", href: "/puncture-repair" },
  },
  {
    image: "/images/tire-inspection.webp",
    position: "object-center",
    eyebrow: "Tire purchase assistance",
    title: ["New tires,", "installed at your door."],
    text: "We help you pick the right tires online, then mount and balance them on-site with our fully equipped van.",
    cta: { label: "How it works", href: "/tire-purchase-assistance" },
  },
  {
    image: "/images/onsite-wheel-change.webp",
    position: "object-[60%_center]",
    eyebrow: "Wheel repair & balancing",
    title: ["Wheels & balancing,", "done right."],
    text: "Wheel repair, balancing, TPMS calibration and valve stems, handled by skilled agents anywhere in Maryland.",
    cta: { label: "Wheel repair", href: "/wheel-repair" },
  },
];

const typed = ["Flat tire repair", "Tire installation", "Wheel repair", "Tire balancing", "TPMS calibration"];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAutoplay(false);
  }, []);

  const go = useCallback((index: number) => setActive((index + slides.length) % slides.length), []);

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [active, autoplay, paused, go]);

  const slide = slides[active];

  return (
    <section
      className="relative isolate flex min-h-[min(calc(100dvh-7.5rem),820px)] items-center overflow-hidden bg-navy pb-40 md:pb-44"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          aria-hidden={i !== active}
          className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${s.position} ${i === active ? "animate-kenburns" : "scale-[1.14]"}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 via-transparent to-navy/30" />

      {/* Decorative motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[8%] -z-10 size-72 animate-float rounded-full bg-brand/25 blur-3xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute top-1/2 -right-40 -z-10 hidden size-[640px] -translate-y-1/2 animate-spin-slow text-white/[0.07] lg:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="100" cy="100" r="96" strokeWidth="10" />
        <circle cx="100" cy="100" r="62" />
        <circle cx="100" cy="100" r="20" />
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="100" y1="38" x2="100" y2="4" transform={`rotate(${i * 36} 100 100)`} strokeWidth="6" />
        ))}
      </svg>

      <div className="container-x py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="inline-flex animate-slide-in items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1.5 pr-4 pl-2 text-sm font-semibold text-white backdrop-blur">
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand/70" />
              <span className="relative size-2.5 rounded-full bg-brand" />
            </span>
            <span className="text-white/70">Mobile service:</span>
            <Typewriter phrases={typed} className="min-w-[8.5rem] text-brand" />
          </p>

          <div key={active} aria-live={autoplay && !paused ? "off" : "polite"}>
            <p className="eyebrow mt-8 animate-rise text-brand">{slide.eyebrow}</p>
            <h1 className="mt-5 text-5xl leading-[0.9] font-extrabold text-white uppercase sm:text-7xl lg:text-[6.25rem]">
              <span className="block animate-rise [animation-delay:90ms]">{slide.title[0]}</span>
              <span className="block animate-rise text-brand [animation-delay:200ms]">{slide.title[1]}</span>
            </h1>
            <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-white/80 [animation-delay:320ms] md:text-xl">
              {slide.text}
            </p>
            <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:440ms] sm:flex-row">
              <a href={site.phone.href} className="btn-primary px-8 py-4 text-base">
                <Phone className="size-5" /> Call {site.phone.display}
              </a>
              <Link href={slide.cta.href} className="btn-ghost-light px-8 py-4 text-base">
                {slide.cta.label} <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 pb-20 md:pb-24">
        <div className="container-x flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-extrabold text-white tabular-nums">
              {String(active + 1).padStart(2, "0")}
              <span className="text-white/40"> / {String(slides.length).padStart(2, "0")}</span>
            </span>
            <div className="flex gap-2" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slide ${i + 1}: ${s.title[0]} ${s.title[1]}`}
                  onClick={() => go(i)}
                  className="group relative h-6 w-10 sm:w-14"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition group-hover:bg-white/40">
                    {i === active && (
                      <span
                        key={`${active}-${paused}`}
                        className="absolute inset-0 origin-left rounded-full bg-brand"
                        style={
                          autoplay && !paused
                            ? { animation: `slide-progress ${INTERVAL}ms linear forwards` }
                            : { transform: "scaleX(1)" }
                        }
                      />
                    )}
                    {i < active && <span className="absolute inset-0 rounded-full bg-brand/70" />}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="flex size-12 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur transition hover:border-brand hover:bg-brand hover:text-navy"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="flex size-12 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur transition hover:border-brand hover:bg-brand hover:text-navy"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
