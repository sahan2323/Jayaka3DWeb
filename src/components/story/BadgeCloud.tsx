import Image from "next/image";
import { badges } from "@/data/badges";

/**
 * Adapted from the provided InfiniteSlider/ProgressiveBlur source. Two
 * changes from the original: the infinite-loop motion reuses the
 * project's existing `animate-marquee` keyframe (defined in
 * globals.css — duplicate the content once, animate to -50%) rather
 * than pulling in a new slider dependency, and the edge "blur" is a
 * plain fade-to-background gradient rather than layered blur panels —
 * same visual result (logos dissolve at the edges instead of hard-
 * cutting), simpler and more robust with only two badges to loop.
 *
 * With just two source badges, a single duplication doesn't produce
 * enough width to fill wide screens, which is what made the strip look
 * left-aligned/uncentered rather than a genuine centered loop. Each
 * "set" repeats the badge list several times first, then that whole
 * set is duplicated once for the seamless -50% loop — so there's always
 * enough content to fill the row and stay visually centered at any
 * screen width.
 */
const REPEAT = 6;

export function BadgeCloud() {
  const set = Array.from({ length: REPEAT }, () => badges).flat();
  const loop = [...set, ...set];

  return (
    <section className="bg-velvet pb-4 pt-12 sm:pt-16">
      <div className="container-edit">
        <p className="text-eyebrow text-center text-cocoa/40">
          Certified &amp; Registered
        </p>

        {/* Animated loop */}
        <div className="relative mt-6 flex justify-center overflow-hidden motion-reduce:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-velvet to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-velvet to-transparent sm:w-40" />

          <div className="flex w-max animate-marquee items-center gap-16 sm:gap-24">
            {loop.map((badge, i) => (
              <div
                key={`${badge.id}-${i}`}
                className="relative h-12 w-28 shrink-0 sm:h-14 sm:w-32"
              >
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  fill
                  className="object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reduced-motion fallback: a plain centered static row, not the
            repeated loop content (which only makes sense in motion). */}
        <div className="mt-6 hidden flex-wrap items-center justify-center gap-10 motion-reduce:flex">
          {badges.map((badge) => (
            <div key={badge.id} className="relative h-12 w-28 sm:h-14 sm:w-32">
              <Image
                src={badge.src}
                alt={badge.alt}
                fill
                className="object-contain opacity-70 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}