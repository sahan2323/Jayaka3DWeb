"use client";

import { motion } from "framer-motion";
import { journeyStages } from "@/data/company";

export function StoryTimeline() {
  return (
    <section className="bg-velvet py-24 sm:py-32">
      <div className="container-edit">
        <span className="text-eyebrow text-cinnamon">Origin to Export</span>
        <h2 className="text-display mt-4 max-w-2xl text-4xl text-cocoa sm:text-6xl">
          Three generations, one estate.
        </h2>

        <div className="mt-16 divide-y divide-cocoa/10 border-y border-cocoa/10">
          {journeyStages.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:gap-10 sm:py-10"
            >
              <span className="text-eyebrow w-16 shrink-0 text-cocoa/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-editorial w-full shrink-0 text-2xl text-cocoa sm:w-56 sm:text-3xl">
                {stage.label}
              </h3>
              <p className="max-w-xl text-cocoa/60">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
