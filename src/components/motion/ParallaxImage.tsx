"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Fills its (relative, overflow-hidden) parent and drifts slower than the page while scrolling. */
export function ParallaxImage({
  src,
  alt = "",
  strength = 0.14,
  className = "",
  sizes = "100vw",
}: {
  src: string;
  alt?: string;
  strength?: number;
  className?: string;
  sizes?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -200 || rect.top > viewport + 200) return;
      const offset = (rect.top + rect.height / 2 - viewport / 2) * -strength;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={wrap} className="absolute -inset-y-[18%] inset-x-0 will-change-transform">
      <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />
    </div>
  );
}
