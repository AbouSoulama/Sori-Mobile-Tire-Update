"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

type Item = { quote: string; service: string };

const INTERVAL = 8000;

export function TestimonialSlider({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAutoplay(false);
  }, []);

  const go = useCallback((i: number) => setActive((i + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [active, autoplay, paused, go]);

  return (
    <div
      className="mt-14 grid gap-8 lg:grid-cols-[18rem_1fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      {/* Tabs */}
      <div className="order-2 flex gap-2 lg:order-1 lg:flex-col" role="tablist" aria-label="Choose testimonial">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => go(i)}
            className={`group relative flex-1 overflow-hidden rounded-2xl border px-4 py-3 text-left transition lg:flex-none lg:px-5 lg:py-4 ${
              i === active
                ? "border-brand/60 bg-white/10 text-white"
                : "border-white/10 text-white/55 hover:border-white/30 hover:text-white"
            }`}
          >
            <span className="font-display text-sm font-bold tracking-widest text-brand">0{i + 1}</span>
            <span className="mt-0.5 hidden text-sm font-semibold lg:block">{item.service}</span>
            {i === active && autoplay && !paused && (
              <span
                key={active}
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
                style={{ animation: `slide-progress ${INTERVAL}ms linear forwards` }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Quotes */}
      <div className="relative order-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 md:p-12 lg:order-2">
        <Quote className="absolute -top-2 right-6 size-32 text-brand/10 md:size-44" aria-hidden />
        <div className="grid">
          {items.map((item, i) => (
            <figure
              key={i}
              aria-hidden={i !== active}
              className={`col-start-1 row-start-1 flex flex-col justify-between transition-all duration-700 ${
                i === active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0"
              }`}
            >
              <div>
                <div className="flex gap-1 text-brand" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-5 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-6 text-xl leading-relaxed text-white md:text-2xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3 text-sm font-bold tracking-wide text-brand uppercase">
                <span className="h-0.5 w-8 bg-brand" aria-hidden /> {item.service}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-brand hover:bg-brand hover:text-navy"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-brand hover:bg-brand hover:text-navy"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
