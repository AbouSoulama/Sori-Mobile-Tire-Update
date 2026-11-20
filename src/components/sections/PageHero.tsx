import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div className="absolute inset-0 -z-20 opacity-50">
        <ParallaxImage src={image} strength={0.12} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
      <div
        aria-hidden
        className="absolute -top-20 right-[10%] -z-10 size-64 animate-float rounded-full bg-brand/25 blur-3xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute top-1/2 -right-32 -z-10 hidden size-[460px] -translate-y-1/2 animate-spin-slow text-white/[0.07] md:block"
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

      <div className="container-x py-20 md:py-28">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex animate-slide-in flex-wrap items-center gap-1.5 text-sm text-white/60"
        >
          <Link href="/" className="transition hover:text-brand">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" aria-hidden />
              {crumb.href ? (
                <Link href={crumb.href} className="transition hover:text-brand">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <p className="eyebrow mb-5 animate-rise text-brand [animation-delay:40ms]">{eyebrow}</p>
        )}

        <AnimatedTitle
          text={title}
          className="max-w-4xl text-5xl leading-[0.95] font-extrabold text-white uppercase md:text-7xl"
        />

        {intro && (
          <p className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-white/75 [animation-delay:420ms] md:text-xl">
            {intro}
          </p>
        )}

        <span
          aria-hidden
          className="mt-8 block h-1 w-24 origin-left scale-x-0 animate-[slide-progress_1s_cubic-bezier(0.2,0.7,0.2,1)_0.55s_forwards] rounded-full bg-brand"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1.5 origin-left animate-[slide-progress_1.2s_cubic-bezier(0.2,0.7,0.2,1)_0.3s_both] bg-gradient-to-r from-brand via-brand to-transparent"
      />
    </section>
  );
}
