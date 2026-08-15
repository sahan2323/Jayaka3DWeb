"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statementLines } from "@/data/company";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Refactor of the supplied GSAP scroll-text source. Stripped of Tweakpane,
 * the random hue/start/end demo config, and the demo copy — the one
 * interaction pattern that was worth keeping is preserved: as the user
 * scrolls, the phrase nearest the center of the viewport becomes large and
 * dark, while the rest recede into a quiet, low-opacity list.
 */
export function ScrollStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!items.length) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const activeFloat = self.progress * (items.length - 1);
          items.forEach((item, i) => {
            const distance = Math.abs(i - activeFloat);
            const opacity = gsap.utils.clamp(0.15, 1, 1 - distance * 0.68);
            const scale = gsap.utils.clamp(0.86, 1, 1 - distance * 0.09);
            const xOffset = gsap.utils.clamp(0, 28, distance * 22);
            gsap.set(item, {
              opacity,
              scale,
              x: i % 2 === 0 ? xOffset : -xOffset,
            });
          });
        },
      });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cocoa text-velvet"
      style={{ height: reducedMotion ? "auto" : `${statementLines.length * 46}vh` }}
    >
      <div
        className={
          reducedMotion
            ? "container-edit flex flex-col items-center gap-6 py-28 text-center"
            : "container-edit sticky top-0 flex h-svh flex-col items-center justify-center text-center"
        }
      >
        <span className="text-eyebrow mb-10 text-cinnamon">From Estate to Export</span>
        <ul className="flex flex-col items-center gap-2 sm:gap-3">
          {statementLines.map((line, i) => (
            <li
              key={line}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="text-display break-words text-[clamp(1.9rem,10vw,3.75rem)] leading-[1.05] text-velvet sm:text-6xl lg:text-7xl"
              style={reducedMotion ? undefined : { opacity: i === 0 ? 1 : 0.2 }}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
