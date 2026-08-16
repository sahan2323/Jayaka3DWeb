"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { journeyStages } from "@/data/company";

/**
 * The desktop journey shrinks a whole winding path into a small pinned
 * viewport — that only works because there's enough width and height to
 * scale into. On phones there usually isn't, so rather than fight that
 * scale-down further, mobile gets its own layout entirely: a plain
 * vertical timeline in normal document flow. Each connecting line
 * segment is a flex child stretching to fill exactly the gap between
 * its two dots, so however tall any one stage's text runs, nothing can
 * ever overlap the stage above or below it.
 */
export function CinnamonJourneyMobile() {
  return (
    <section className="relative overflow-hidden bg-velvet px-5 py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/backgrounds/srilanka.png"
          alt=""
          fill
          className="object-contain opacity-[0.75]"
        />
        <div className="absolute inset-0 bg-velvet/60" />
      </div>

      <div className="relative z-10 text-center">
        <span className="text-eyebrow text-cinnamon">The Cinnamon Journey</span>
        <h2 className="text-display mt-3 text-4xl text-cocoa">Sri Lanka to the World</h2>
      </div>

      <ul className="relative z-10 mt-14 flex flex-col">
        {journeyStages.map((stage, i) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-velvet bg-cinnamon shadow-[0_0_0_3px_rgba(217,119,36,0.16)]" />
              {i < journeyStages.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-cocoa/15" />
              )}
            </div>

            <div className="flex-1 pb-10">
              <span className="text-eyebrow-lg text-cinnamon">{stage.label}</span>
              <p className="mt-1.5 text-sm leading-relaxed text-cocoa/70">
                {stage.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}