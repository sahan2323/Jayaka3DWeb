"use client";

import { motion } from "framer-motion";
import { originToExport } from "@/data/company";

export function StoryTimeline() {
  return (
    <section className="bg-velvet py-24 sm:py-32">
      <div className="container-edit">
        <span className="text-eyebrow text-cinnamon">Origin to Export</span>
        <h2 className="text-display mt-4 max-w-2xl text-4xl text-cocoa sm:text-6xl">
          Three generations, one estate.
        </h2>
      </div>

      <div className="container-edit mt-16 sm:mt-20">
        <div className="flex flex-col">
          {originToExport.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-6 sm:gap-10"
            >
              <div className="flex flex-col items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cinnamon text-sm font-semibold text-white shadow-[0_0_0_5px_rgba(217,119,36,0.15)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < originToExport.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-cocoa/10" />
                )}
              </div>

              <div className="relative flex-1 pb-16 sm:pb-24">
                <span
                  className="text-display pointer-events-none absolute -top-4 right-0 text-6xl leading-none text-cocoa/[0.05] sm:-top-6 sm:text-8xl lg:text-9xl"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-editorial relative text-2xl text-cocoa sm:text-3xl">
                  {stage.label}
                </h3>
                <p className="relative mt-4 max-w-2xl text-cocoa/60 sm:text-lg">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}