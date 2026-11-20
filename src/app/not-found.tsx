import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-28 text-white md:py-36">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 size-[520px] rounded-full bg-brand/20 blur-3xl"
      />
      <div className="container-x max-w-3xl text-center">
        <p className="eyebrow justify-center text-brand">Error 404</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold uppercase md:text-7xl">
          Looks like a <span className="text-brand">wrong turn</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
          The page you are looking for doesn&apos;t exist or has moved. Our team is still ready to come to
          you — wherever you are.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Back to home <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a href={site.phone.href} className="btn btn-ghost-light">
            <Phone className="size-4" aria-hidden /> {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
