import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerQuickLinks, footerServiceLinks, site } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white/70">
      {/* Top CTA strip */}
      <div className="border-b border-white/10 bg-navy">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
          <div data-reveal="left">
            <p className="eyebrow text-brand">Ready when you are</p>
            <p className="mt-3 max-w-xl font-display text-3xl leading-[1] font-extrabold text-white uppercase md:text-4xl">
              Flat tire tonight? <span className="text-brand">We come to you.</span>
            </p>
          </div>
          <div data-reveal="right" className="flex flex-wrap gap-3">
            <a href={site.phone.href} className="btn-primary">
              <Phone className="size-4" aria-hidden /> {site.phone.display}
            </a>
            <Link href="/schedule-appointment" className="btn-ghost-light">
              Book service <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* Brand wordmark */}
      <div className="container-x pt-14 pb-6">
        <p
          data-reveal="fade"
          className="font-display text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.85] font-extrabold tracking-tight text-white/[0.06] uppercase select-none"
          aria-hidden
        >
          Sori Mobile Tire
        </p>
      </div>

      <div className="container-x relative grid gap-12 pb-16 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-16">
        {/* Brand + newsletter */}
        <div data-reveal="left">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="rounded-2xl bg-white p-1.5">
              <Image src="/images/logo.webp" alt={`${site.name} logo`} width={52} height={56} className="h-12 w-auto" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl font-extrabold tracking-wide text-white uppercase">
                Sori Mobile Tire
              </span>
              <span className="mt-1 block text-[11px] font-bold tracking-[0.28em] text-brand uppercase">
                Roadside Assistance
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">{site.tagline}</p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm font-semibold text-white">
              Subscribe for exclusive offers and updates
            </p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
          <SocialLinks className="mt-6" />
        </div>

        {/* Link columns */}
        <div data-reveal className="grid grid-cols-2 gap-10 sm:gap-12">
          <FooterColumn title="Quick Links" links={footerQuickLinks} />
          <FooterColumn title="Our Services" links={footerServiceLinks} />
        </div>

        {/* Contact card */}
        <div data-reveal="right">
          <h4 className="font-display text-lg font-bold tracking-wide text-white uppercase">Contact Us</h4>
          <span className="mt-3 block h-1 w-10 rounded-full bg-brand" aria-hidden />
          <ul className="mt-6 space-y-5 text-[15px]">
            <li className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand">
                <MapPin className="size-4" aria-hidden />
              </span>
              <span className="pt-2">{site.address.full}</span>
            </li>
            <li>
              <a href={site.phone.href} className="group flex gap-3 transition hover:text-brand">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand transition group-hover:bg-brand group-hover:text-navy">
                  <Phone className="size-4" aria-hidden />
                </span>
                <span className="pt-2 font-semibold text-white">{site.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="group flex gap-3 break-all transition hover:text-brand">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand transition group-hover:bg-brand group-hover:text-navy">
                  <Mail className="size-4" aria-hidden />
                </span>
                <span className="pt-2">{site.email}</span>
              </a>
            </li>
            <li className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand">
                <Clock className="size-4" aria-hidden />
              </span>
              <span className="pt-2">
                <span className="block font-semibold text-white">Mon-Sun: 24/7</span>
                <span className="text-sm text-white/50">{site.emergency}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition hover:text-brand">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-display text-lg font-bold tracking-wide text-white uppercase">{title}</h4>
      <span className="mt-3 block h-1 w-10 rounded-full bg-brand" aria-hidden />
      <ul className="mt-6 space-y-3 text-[15px]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 transition hover:text-brand"
            >
              <span
                aria-hidden
                className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3"
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
