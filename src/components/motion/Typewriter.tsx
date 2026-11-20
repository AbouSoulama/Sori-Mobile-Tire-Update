"use client";

import { useEffect, useState } from "react";

/** Types and erases a rotating list of phrases (echoes the typing effect of the old WordPress hero). */
export function Typewriter({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let charIndex = phrases[0]?.length ?? 0;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = phrases[phraseIndex];
      if (deleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }
      setText(phrase.slice(0, charIndex));

      let delay = deleting ? 38 : 85;
      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={className} aria-label={phrases.join(", ")}>
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[0.15em] bg-brand [animation:caret_0.9s_steps(1)_infinite]"
      />
    </span>
  );
}
