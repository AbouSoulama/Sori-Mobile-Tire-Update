"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { coreServices } from "@/lib/services";

/**
 * Editorial service index: stacked rows with a sticky image panel that swaps
 * on hover/focus — purposely not a generic photo-card grid.
 */
export function ServiceGrid({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const current = coreServices[active] ?? coreServices[0];
  const dark = tone === "dark";

  return (
    <div
      className={`grid overflow-hidden rounded-[2rem] lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] ${
        dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-white shadow-[0_40px_80px_-40px_rgba(11,23,42,0.35)] ring-1 ring-navy/10"
      }`}
    >
      {/* List */}
      <ol className={`divide-y ${dark ? "divide-white/10" : "divide-navy/10"}`}>
        {coreServices.map((service, i) => {
          const isActive = i === active;
          return (
            <li key={service.slug} data-reveal>
              <Link
                href={service.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative flex items-start gap-5 px-6 py-6 transition duration-300 sm:gap-7 sm:px-8 sm:py-7 ${
                  isActive
                    ? dark
                      ? "bg-white/[0.06]"
                      : "bg-sand"
                    : dark
                      ? "hover:bg-white/[0.03]"
                      : "hover:bg-sand/60"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-0 bottom-0 left-0 w-1 origin-top scale-y-0 bg-brand transition duration-500 group-hover:scale-y-100 ${
                    isActive ? "scale-y-100" : ""
                  }`}
                />
                <span
                  className={`font-display text-4xl leading-none font-extrabold tabular-nums transition duration-300 sm:text-5xl ${
                    isActive ? "text-brand" : dark ? "text-white/20" : "text-navy/15"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`flex items-start justify-between gap-4 font-display text-2xl leading-[1.05] font-extrabold uppercase sm:text-3xl ${
                      dark ? "text-white" : "text-navy"
                    }`}
                  >
                    <span className="transition group-hover:text-brand-700">{service.title}</span>
                    <ArrowUpRight
                      className={`mt-1 size-6 shrink-0 transition duration-300 ${
                        isActive
                          ? "translate-x-0 translate-y-0 text-brand opacity-100"
                          : "-translate-x-1 translate-y-1 text-brand opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                      aria-hidden
                    />
                  </span>
                  <span
                    className={`mt-2 block max-w-xl text-[15px] leading-relaxed sm:text-base ${
                      dark ? "text-white/60" : "text-slate-muted"
                    }`}
                  >
                    {service.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Sticky image panel (desktop) */}
      <div
        className={`relative hidden min-h-[28rem] overflow-hidden lg:block ${
          dark ? "border-l border-white/10" : "border-l border-navy/10"
        }`}
        aria-hidden
      >
        {coreServices.map((service, i) => (
          <div
            key={service.slug}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes="40vw"
              className={`object-cover transition duration-[1.2s] ease-out ${
                i === active ? "scale-100" : "scale-110"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <p className="eyebrow text-brand">Service {String(active + 1).padStart(2, "0")}</p>
          <p className="mt-2 font-display text-3xl leading-none font-extrabold uppercase">{current.title}</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">{current.description}</p>
        </div>
        <span className="absolute top-6 right-6 flex size-14 items-center justify-center rounded-full bg-brand text-navy shadow-lg">
          <ArrowUpRight className="size-6" />
        </span>
      </div>
    </div>
  );
}
