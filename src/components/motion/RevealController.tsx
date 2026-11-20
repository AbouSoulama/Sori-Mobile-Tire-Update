"use client";

import { useEffect } from "react";

/**
 * Adds a scroll-triggered entrance animation to any element carrying `data-reveal`
 * (values: up (default), left, right, zoom, fade, wipe). Works for server-rendered
 * markup and for elements added later (route changes, conditional UI).
 */
export function RevealController() {
  useEffect(() => {
    const seen = new WeakSet<Element>();

    const show = (el: Element) => el.setAttribute("data-in", "true");

    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
