"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CinnamonStickRig } from "./CinnamonStickRig";
import { HeroVideo } from "./HeroVideo";
import { HeroCanvas } from "./HeroCanvas";
import { heroFrames } from "./hero-video-config";
import type { HeroVisualHandle } from "./types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const OUTRO_LINE_1 = "FROM CEYLON.";
const OUTRO_LINE_2 = "CRAFTED FOR THE WORLD.";

interface CinnamonScrollHeroProps {
  /**
   * The hero defaults to the extracted frame sequence (see
   * hero-video-config.ts). Override either prop to swap it out later
   * without touching this component's structure.
   */
  videoSrc?: string;
  frames?: string[];
}

export function CinnamonScrollHero({ videoSrc, frames }: CinnamonScrollHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const outroTextRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HeroVisualHandle>(null);
  const line1CharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const line2CharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const [visualPainted, setVisualPainted] = useState(false);

  const resolvedFrames = frames ?? (videoSrc ? [] : heroFrames);

  // Timed against the actual footage: the stick is still tumbling/level
  // through roughly 60% of the sequence, turns upright between ~70–85%,
  // and holds steady, floating, for the last stretch. The outro line
  // fades in right as that upright turn is underway, and is fully
  // settled with room to breathe before the pin releases — so there's
  // no dead pause and no rush at the handoff into the Range section.
  const INTRO_FADE_END = 0.3;
  const OUTRO_FADE_START = 0.72;
  const OUTRO_FADE_END = 0.9;

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const text = textRef.current;
    const outroText = outroTextRef.current;
    const cue = scrollCueRef.current;
    if (!section || !stage) return;

    // Per-character convergence for the outro headline: each character
    // starts scattered outward from its line's center in proportion to
    // its own distance from that center, and settles into place as the
    // same `fadeIn` value (below) goes 0→1 — so the text both fades in
    // and visibly "assembles" itself, in one motion, on the exact
    // timing that's already dialed in.
    const settleLine = (
      refs: Array<HTMLSpanElement | null>,
      text: string,
      settle: number,
      scale: number
    ) => {
      const center = (text.length - 1) / 2;
      refs.forEach((el, i) => {
        if (!el) return;
        const dist = i - center;
        gsap.set(el, {
          x: dist * 4.2 * scale * settle,
          y: Math.abs(dist) * 1.4 * scale * settle,
          rotateX: dist * 2 * scale * settle,
        });
      });
    };

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: stage,
        onUpdate: (self) => {
          visualRef.current?.onProgress(self.progress);

          if (text) {
            const fadeOut = gsap.utils.clamp(0, 1, self.progress / INTRO_FADE_END);
            gsap.set(text, {
              opacity: 1 - fadeOut,
              y: -fadeOut * 32,
              pointerEvents: fadeOut > 0.5 ? "none" : "auto",
            });
          }
          if (outroText) {
            const fadeIn = gsap.utils.clamp(
              0,
              1,
              (self.progress - OUTRO_FADE_START) / (OUTRO_FADE_END - OUTRO_FADE_START)
            );
            gsap.set(outroText, { opacity: fadeIn });

            const settle = 1 - fadeIn;
            const scale = window.innerWidth < 640 ? 0.6 : 1;
            settleLine(line1CharRefs.current, OUTRO_LINE_1, settle, scale);
            settleLine(line2CharRefs.current, OUTRO_LINE_2, settle, scale);
          }
          if (cue) {
            gsap.set(cue, { opacity: self.progress < 0.06 ? 1 : 0 });
          }
        },
      });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Once the visual layer paints its first frame, ScrollTrigger's own
  // positions may have shifted (fonts/images settling) — refresh once so
  // the pinned scrub distance stays accurate.
  useLayoutEffect(() => {
    if (!visualPainted || reducedMotion) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [visualPainted, reducedMotion]);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero-section"
        className="relative"
        style={{ height: reducedMotion ? "100svh" : "400vh" }}
      >
        <div
          ref={stageRef}
          className="relative h-svh w-full overflow-hidden bg-linear-to-b from-[#fbeee0] via-velvet to-velvet"
        >
          {/* Visual layer — real footage by default, falls back to the CSS
              rig only if explicitly given no video/frames. */}
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: reducedMotion || visualPainted ? 1 : 0 }}
          >
            {videoSrc ? (
              <HeroVideo ref={visualRef} src={videoSrc} />
            ) : resolvedFrames.length > 0 ? (
              <HeroCanvas
                ref={visualRef}
                frames={resolvedFrames}
                onFirstPaint={() => setVisualPainted(true)}
              />
            ) : (
              <CinnamonStickRig ref={visualRef} />
            )}
          </div>

          {/* Legibility treatment — soft and localized to the top/bottom
              edges only, so the footage itself stays clearly visible
              across the middle of the frame where it matters most. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(248,246,242,0.32) 0%, rgba(248,246,242,0.06) 24%, transparent 38%), " +
                "linear-gradient(to bottom, rgba(248,246,242,0.18) 0%, transparent 20%)",
            }}
          />

          {/* Editorial hero copy — inset below the fixed navbar so it can
              never sit underneath it, at any viewport height. */}
          <div
            ref={textRef}
            className="container-edit pointer-events-none absolute inset-x-0 top-[76px] bottom-0 flex flex-col items-center justify-center text-center md:top-[88px]"
          >
            <span className="text-eyebrow mb-5 text-cinnamon drop-shadow-[0_1px_12px_rgba(248,246,242,0.9)] sm:mb-6">
              Ceylon Cinnamon, from Sri Lanka
            </span>
            <h1 className="text-display text-[clamp(2.25rem,11vw,3.5rem)] text-cocoa [text-shadow:0_2px_28px_rgba(248,246,242,0.9),0_1px_3px_rgba(248,246,242,0.7)] sm:text-[10vw] lg:text-[7.25vw]">
              THE ESSENCE
              <br />
              OF CEYLON.
            </h1>
            <p className="text-editorial mt-6 max-w-md text-sm text-cocoa/80 [text-shadow:0_1px_16px_rgba(248,246,242,0.85)] sm:mt-7 sm:text-lg">
              Premium Ceylon cinnamon, cultivated, crafted and exported from Sri Lanka.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
              <Link
                href="/products"
                className="text-eyebrow inline-flex items-center gap-2 rounded-full bg-cinnamon px-7 py-3.5 text-white shadow-lg shadow-cinnamon/20 transition-transform hover:scale-[1.03] sm:py-4"
              >
                Explore Our Cinnamon <ArrowRight size={16} />
              </Link>
              <Link
                href="/our-story"
                className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-cocoa/40 bg-white/25 px-7 py-3.5 text-cocoa backdrop-blur-sm transition-colors hover:border-cocoa/70 hover:bg-white/40 sm:py-4"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Closing statement — appears as the stick settles vertical
              near the end of the sequence, in the exact same premium
              treatment as the opening copy, so the hero reads as one
              continuous cinematic beat rather than two moments stitched
              together. (Reduced-motion equivalent renders separately,
              below, as a simple static block — see return value.) */}
          {!reducedMotion && (
            <div
              ref={outroTextRef}
              className="container-edit pointer-events-none absolute inset-x-0 top-[76px] bottom-0 flex flex-col items-center justify-center text-center opacity-0 md:top-[88px]"
            >
              <h2
                className="text-display text-[clamp(1.9rem,9vw,3.25rem)] text-cocoa [text-shadow:0_2px_28px_rgba(248,246,242,0.9),0_1px_3px_rgba(248,246,242,0.7)] sm:text-[7.5vw] lg:text-[5.25vw]"
                style={{ perspective: "600px" }}
              >
                <span className="block" style={{ transformStyle: "preserve-3d" }}>
                  {OUTRO_LINE_1.split("").map((char, i) => (
                    <span
                      key={i}
                      ref={(el) => {
                        line1CharRefs.current[i] = el;
                      }}
                      className="inline-block will-change-transform"
                      style={{ whiteSpace: "pre" }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span
                  className="block text-cinnamon"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {OUTRO_LINE_2.split("").map((char, i) => (
                    <span
                      key={i}
                      ref={(el) => {
                        line2CharRefs.current[i] = el;
                      }}
                      className="inline-block will-change-transform"
                      style={{ whiteSpace: "pre" }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h2>
              <p className="text-editorial mt-5 max-w-md text-sm text-cocoa/80 [text-shadow:0_1px_16px_rgba(248,246,242,0.85)] sm:mt-6 sm:text-lg">
                One stick, rolled by hand in Kurundugaha — refined into a full
                range of grades, cuts and extracts for the world.
              </p>
            </div>
          )}

          <div
            ref={scrollCueRef}
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-cocoa/70 [text-shadow:0_1px_10px_rgba(248,246,242,0.85)] sm:bottom-9"
          >
            <span className="text-eyebrow text-[10px]">Scroll</span>
            <ArrowDown size={16} className={reducedMotion ? "" : "animate-bounce"} />
          </div>
        </div>
      </section>

      {/* Reduced-motion fallback: the closing statement still needs to
          reach these visitors, just without a scroll-synced animation
          to hang it on — a plain static block, right after the hero. */}
      {reducedMotion && (
        <div className="bg-velvet px-6 py-20 text-center sm:py-28">
          <h2 className="text-display text-4xl text-cocoa sm:text-6xl">
            FROM CEYLON.
            <br />
            <span className="text-cinnamon">CRAFTED FOR THE WORLD.</span>
          </h2>
          <p className="text-editorial mx-auto mt-5 max-w-md text-cocoa/70">
            One stick, rolled by hand in Kurundugaha — refined into a full
            range of grades, cuts and extracts for the world.
          </p>
        </div>
      )}
    </>
  );
}
