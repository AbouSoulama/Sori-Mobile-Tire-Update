import { getReviews } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { TestimonialSlider } from "./TestimonialSlider";

export async function Testimonials() {
  const reviews = await getReviews();
  const items = reviews.reviews.map((r) => ({
    quote: r.text,
    service: r.service || r.author,
  }));

  return (
    <section className="relative isolate overflow-hidden bg-navy py-24">
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 -z-10 size-[520px] animate-float-slow rounded-full bg-brand/10 blur-3xl"
      />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Testimonials"
            title="What People Think About Us"
            intro={`${reviews.sourceLabel}${reviews.reviewCount ? ` · ${reviews.rating}/5 from ${reviews.reviewCount} reviews` : ""}. Real feedback from drivers we've helped get back on the road.`}
            tone="dark"
          />
          {reviews.googleBusinessUrl ? (
            <a
              href={reviews.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="right"
              className="btn-ghost-light shrink-0"
            >
              Read us on Google
            </a>
          ) : null}
        </div>
        <TestimonialSlider items={items} />
        <p className="mt-8 text-center text-sm text-white/45">
          Update reviews in <code className="text-white/70">content/reviews.json</code>
          {reviews.googleBusinessUrl ? " or paste your Google Business profile URL there." : " — add your Google Business URL when ready."}
        </p>
      </div>
    </section>
  );
}
