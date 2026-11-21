"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Disc3,
  Mail,
  Menu,
  Phone,
  Settings2,
  ShoppingCart,
  Wrench,
  X,
} from "lucide-react";
import { mainNav, servicesMenu, site } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

const menuIcons = [Wrench, ShoppingCart, Disc3, Settings2];

const serviceRoutes = ["/services", "/puncture-repair", "/wheel-repair", "/other", "/tire-purchase-assistance"];

const mobileUtilityLinks = [
  { label: "Emergency flat tire", href: "/emergency" },
  { label: "Service area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (progress.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openServices = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }, []);

  const closeServicesSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/services") return serviceRoutes.some((r) => pathname.startsWith(r));
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Mobile utility strip — always visible on small screens */}
      <div className="border-b border-white/10 bg-navy-900 text-[12px] text-white/80 md:hidden">
        <div className="container-x flex h-10 items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/emergency"
            className="shrink-0 font-semibold whitespace-nowrap text-brand transition hover:text-white"
          >
            Emergency flat tire
          </Link>
          <span className="shrink-0 text-white/25" aria-hidden>
            |
          </span>
          <Link href="/service-area" className="shrink-0 whitespace-nowrap transition hover:text-brand">
            Service area
          </Link>
          <span className="shrink-0 text-white/25" aria-hidden>
            |
          </span>
          <Link href="/faq" className="shrink-0 whitespace-nowrap transition hover:text-brand">
            FAQ
          </Link>
          <span className="shrink-0 text-white/25" aria-hidden>
            |
          </span>
          <a
            href={site.phone.href}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap transition hover:text-brand"
            aria-label="24/7 emergency line"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative size-1.5 rounded-full bg-emerald-400" />
            </span>
            <Clock className="size-3 text-brand" aria-hidden />
            24/7 emergency line
          </a>
        </div>
      </div>

      {/* Top bar (collapses on scroll) */}
      <div
        className={`hidden bg-navy-900 text-[13px] text-white/75 transition-[grid-template-rows] duration-300 md:grid ${
          scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="container-x flex h-11 items-center justify-between">
            <div className="flex items-center gap-6">
              <a href={site.phone.href} className="flex items-center gap-2 transition hover:text-brand">
                <Phone className="size-3.5 text-brand" aria-hidden />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition hover:text-brand">
                <Mail className="size-3.5 text-brand" aria-hidden />
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/emergency" className="font-semibold text-brand transition hover:text-white">
                Emergency flat tire
              </Link>
              <Link href="/service-area" className="hidden transition hover:text-brand xl:inline">
                Service area
              </Link>
              <Link href="/faq" className="hidden transition hover:text-brand xl:inline">
                FAQ
              </Link>
              <p className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative size-2 rounded-full bg-emerald-400" />
                </span>
                <Clock className="size-3.5 text-brand" aria-hidden />
                24/7 emergency line
              </p>
              <SocialLinks className="[&_a]:size-7 [&_svg]:size-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`relative z-10 border-b bg-white transition-shadow duration-300 ${
          scrolled ? "border-navy/10 shadow-[0_10px_30px_-14px_rgba(11,23,42,0.35)]" : "border-transparent"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${
            scrolled ? "h-20 lg:h-[4.5rem]" : "h-20 lg:h-[5.5rem]"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image
              src="/images/logo.webp"
              alt={`${site.name} logo`}
              width={56}
              height={60}
              priority
              className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "h-14 lg:h-12" : "h-14 lg:h-16"
              }`}
            />
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-xl font-extrabold tracking-wide text-navy uppercase">
                Sori Mobile Tire
              </span>
              <span className="mt-1 block text-[11px] font-bold tracking-[0.28em] text-brand-700 uppercase">
                Roadside Assistance
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              const linkClass = `nav-underline rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${
                active ? "text-navy" : "text-slate-muted hover:text-navy"
              }`;

              if (item.href !== "/services") {
                return (
                  <Link key={item.href} href={item.href} data-active={active} className={linkClass}>
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServicesSoon}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setServicesOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <Link href={item.href} data-active={active} className={`${linkClass} pr-1.5`}>
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      aria-label="Toggle services menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="-ml-1 flex size-7 items-center justify-center rounded-full text-slate-muted transition hover:bg-sand hover:text-navy"
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-brand" : ""}`}
                      />
                    </button>
                  </div>

                  <div
                    id="services-menu"
                    className={`absolute top-full left-1/2 z-50 w-[46rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-4 transition-[opacity,translate,visibility] duration-300 ease-out ${
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="absolute top-2.5 left-1/2 size-4 -translate-x-1/2 rotate-45 rounded-sm bg-white ring-1 ring-navy/10"
                    />
                    <div className="relative grid grid-cols-[15rem_1fr] overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-20px_rgba(11,23,42,0.45)] ring-1 ring-navy/10">
                      {/* Promo panel */}
                      <div className="relative isolate flex flex-col justify-end overflow-hidden p-6 text-white">
                        <Image
                          src="/images/technician-impact-wrench.webp"
                          alt=""
                          fill
                          sizes="240px"
                          className="-z-20 object-cover"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
                        <p className="eyebrow text-brand">24/7 emergency</p>
                        <p className="mt-2 font-display text-3xl leading-none font-extrabold uppercase">
                          Stuck on the road?
                        </p>
                        <a href={site.phone.href} className="btn-primary mt-5 py-3 text-[13px]">
                          <Phone className="size-4" aria-hidden /> {site.phone.display}
                        </a>
                      </div>

                      {/* Links */}
                      <div className="flex flex-col p-3">
                        <ul className="grid gap-1">
                          {servicesMenu.map((entry, i) => {
                            const Icon = menuIcons[i];
                            const current = pathname === entry.href;
                            return (
                              <li key={entry.href}>
                                <Link
                                  href={entry.href}
                                  className={`group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-sand ${
                                    current ? "bg-sand" : ""
                                  }`}
                                >
                                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-brand transition duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-navy">
                                    <Icon className="size-5" aria-hidden />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block font-display text-lg leading-tight font-bold text-navy uppercase">
                                      {entry.label}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-slate-muted">{entry.description}</span>
                                  </span>
                                  <ArrowRight className="size-4 shrink-0 -translate-x-2 text-brand opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <Link
                          href="/services"
                          className="mt-2 flex items-center justify-between rounded-2xl bg-sand px-4 py-3 text-sm font-bold text-navy transition hover:bg-brand-100"
                        >
                          View all services <ArrowRight className="size-4 text-brand-700" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phone.href}
              className="group hidden items-center gap-3 rounded-full py-1 pr-2 pl-1 transition hover:bg-sand xl:flex"
              aria-label={`Call ${site.phone.display}`}
            >
              <span className="relative flex size-10 items-center justify-center rounded-full bg-navy text-brand">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/40" />
                <Phone className="relative size-4" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-bold tracking-widest text-slate-muted uppercase">Call 24/7</span>
                <span className="block text-sm font-extrabold text-navy">{site.phone.display}</span>
              </span>
            </a>
            <Link href="/get-a-quote" className="btn-primary hidden sm:inline-flex">
              Get a Free Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-brand hover:bg-brand-50 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px]">
          <div ref={progress} className="h-full origin-left scale-x-0 bg-brand" />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-0 overflow-y-auto bg-navy pt-[7.5rem] text-white transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-6" aria-label="Mobile">
          <div
            className={`mb-4 grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 ${
              open ? "animate-rise" : ""
            }`}
          >
            <p className="px-1 text-[11px] font-bold tracking-[0.2em] text-brand uppercase">Quick help</p>
            {mobileUtilityLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-base font-semibold text-white transition hover:bg-white/10 hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phone.href}
              className="flex items-center gap-2 rounded-xl bg-brand px-3 py-2.5 text-base font-extrabold text-navy"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-navy/40" />
                <span className="relative size-2 rounded-full bg-navy" />
              </span>
              24/7 emergency line
            </a>
          </div>

          {mainNav.map((item, i) => {
            const active = isActive(item.href);
            const delay = { animationDelay: `${open ? 80 + i * 60 : 0}ms` };

            if (item.href !== "/services") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={delay}
                  className={`border-b border-white/10 py-4 font-display text-3xl font-bold ${
                    open ? "animate-rise" : ""
                  } ${active ? "text-brand" : "text-white"}`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} style={delay} className={`border-b border-white/10 ${open ? "animate-rise" : ""}`}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 py-4 font-display text-3xl font-bold ${active ? "text-brand" : "text-white"}`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services"
                    aria-label="Toggle services submenu"
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 transition hover:border-brand"
                  >
                    <ChevronDown
                      className={`size-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-brand" : ""}`}
                    />
                  </button>
                </div>
                <div
                  id="mobile-services"
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ul className="overflow-hidden">
                    {servicesMenu.map((entry, i) => {
                      const Icon = menuIcons[i];
                      return (
                        <li key={entry.href}>
                          <Link
                            href={entry.href}
                            tabIndex={mobileServicesOpen ? 0 : -1}
                            className="flex items-center gap-4 rounded-2xl px-2 py-3 text-lg font-semibold text-white/85 transition hover:bg-white/5 hover:text-brand"
                          >
                            <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-brand">
                              <Icon className="size-5" aria-hidden />
                            </span>
                            {entry.label}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="pb-3">
                      <Link
                        href="/services"
                        tabIndex={mobileServicesOpen ? 0 : -1}
                        className="flex items-center gap-2 px-2 py-2 font-bold text-brand"
                      >
                        View all services <ArrowRight className="size-4" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}

          <div className={`mt-8 grid gap-3 ${open ? "animate-rise [animation-delay:420ms]" : ""}`}>
            <Link href="/get-a-quote" className="btn-primary">
              Get a Free Quote
            </Link>
            <a href={site.phone.href} className="btn-ghost-light">
              <Phone className="size-4" /> Call {site.phone.display}
            </a>
          </div>
          <div className={`mt-8 space-y-2 text-sm text-white/60 ${open ? "animate-rise [animation-delay:500ms]" : ""}`}>
            <p>{site.address.full}</p>
            <p>{site.emergency}</p>
            <SocialLinks className="pt-2" />
          </div>
        </nav>
      </div>
    </header>
  );
}
