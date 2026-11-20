import Image from "next/image";
import { getGallery } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export async function Gallery() {
  const gallery = await getGallery();
  return (
    <section className="bg-sand py-24">
      <div className="container-x">
        <SectionHeading eyebrow="In the field" title={gallery.title} intro={gallery.intro} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.items.map((item) => (
            <figure
              key={item.src}
              data-reveal="zoom"
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-navy"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              {item.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent p-5 text-sm font-bold tracking-wide text-white uppercase">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
