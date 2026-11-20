import Image from "next/image";
import { brands } from "@/lib/site";

export function BrandStrip({ title = "Make your choice among our best tire brands" }: { title?: string }) {
  const loop = [...brands, ...brands];
  return (
    <section id="brands" className="border-y border-navy/10 bg-sand py-14">
      <div data-reveal className="container-x mb-8 flex flex-col items-center gap-2 text-center">
        <p className="eyebrow justify-center">Tire Brands</p>
        <h2 className="text-3xl font-extrabold uppercase md:text-4xl">{title}</h2>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {loop.map((brand, i) => (
            <li
              key={`${brand.name}-${i}`}
              aria-hidden={i >= brands.length}
              className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border border-navy/5 bg-white px-6 shadow-sm"
            >
              <Image
                src={brand.src}
                alt={i < brands.length ? brand.name : ""}
                width={180}
                height={60}
                className="max-h-14 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
