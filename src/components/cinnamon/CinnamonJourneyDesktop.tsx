"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { journeyStages } from "@/data/company";
import { useContainerSize } from "@/hooks/useContainerSize";

const WIDTH = 320;
const STEP = 220;
const MARGIN = 120;
const HEIGHT = MARGIN * 2 + (journeyStages.length - 1) * STEP;

// A hand-authored serpentine path (not the original demo's exact
// geometry) — one continuous line winding top to bottom, visiting each
// stage's marker in turn. The horizontal swing is deliberately gentle
// (42%–58% of the width) so there's always comfortable room for a label
// on either side.
const points = journeyStages.map((_, i) => {
  const y = MARGIN + i * STEP;
  const x = i % 2 === 0 ? WIDTH * 0.42 : WIDTH * 0.58;
  return { x, y };
});

function buildPath(): string {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dy = (curr.y - prev.y) / 2;
    d += ` C${prev.x},${prev.y + dy} ${curr.x},${curr.y - dy} ${curr.x},${curr.y}`;
  }
  return d;
}

export function CinnamonJourneyDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const { ref: boxRef, size: box } = useContainerSize<HTMLDivElement>();

  const pathLength = useTransform(scrollYProgress, [0, 0.92], [0, 1]);
  const pathD = buildPath();

  // Replicates the browser's own SVG `preserveAspectRatio="meet"` math in
  // real pixels, with a little breathing room, so the HTML labels (which
  // live outside the SVG's coordinate system) always land exactly on the
  // path — at any container size, not just the one this was designed at.
  const PADDING = 0.88;
  const scale =
    box.width && box.height
      ? Math.min((box.width * PADDING) / WIDTH, (box.height * PADDING) / HEIGHT)
      : 0;
  const renderedW = WIDTH * scale;
  const renderedH = HEIGHT * scale;
  const offsetX = (box.width - renderedW) / 2;
  const offsetY = (box.height - renderedH) / 2;
  const toScreenX = (x: number) => offsetX + x * scale;
  const toScreenY = (y: number) => offsetY + y * scale;

  return (
    <section
      ref={sectionRef}
      className="relative bg-velvet"
      style={{ height: `${HEIGHT + 480}px` }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center overflow-hidden py-16 sm:py-20">
        {/* Header lives in normal flow, above the path — it can never
            overlap the visual, on any screen size. */}
        <div className="container-edit shrink-0 text-center">
          <span className="text-eyebrow text-cinnamon">The Cinnamon Journey</span>
          <h2 className="text-display mt-3 text-4xl text-cocoa sm:text-6xl">
            Sri Lanka to the World
          </h2>
        </div>

        {/* The path gets whatever space remains — never less, never
            overlapping the header above it. */}
        <div
          ref={boxRef}
          className="relative mt-6 w-full max-w-md flex-1 sm:mt-10 sm:max-w-lg"
        >
          {box.width > 0 && (
            <>
              <svg
                width={box.width}
                height={box.height}
                viewBox={`0 0 ${box.width} ${box.height}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <path
                  d={pathD}
                  stroke="rgba(43,26,16,0.1)"
                  strokeWidth={Math.max(2, 3 * scale)}
                  fill="none"
                  transform={`translate(${offsetX} ${offsetY}) scale(${scale})`}
                />
                <motion.path
                  d={pathD}
                  stroke="#D97724"
                  strokeWidth={Math.max(2.5, 4 * scale)}
                  strokeLinecap="round"
                  fill="none"
                  transform={`translate(${offsetX} ${offsetY}) scale(${scale})`}
                  style={{ pathLength }}
                />

                {points.map((p, i) => {
                  const start = Math.min(1, Math.max(0, i / (points.length - 1) - 0.03));
                  return (
                    <JourneyMarker
                      key={journeyStages[i].id}
                      x={toScreenX(p.x)}
                      y={toScreenY(p.y)}
                      scrollYProgress={scrollYProgress}
                      start={start}
                    />
                  );
                })}
              </svg>

              {points.map((p, i) => (
                <JourneyLabel
                  key={journeyStages[i].id}
                  stage={journeyStages[i]}
                  x={toScreenX(p.x)}
                  y={toScreenY(p.y)}
                  onLeft={p.x < WIDTH / 2}
                  progressStart={i / (points.length - 1) - 0.03}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function JourneyMarker({
  x,
  y,
  scrollYProgress,
  start,
}: {
  x: number;
  y: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
}) {
  const end = Math.min(1, start + 0.06);
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="7"
      fill="#D97724"
      stroke="#F8F6F2"
      strokeWidth="3"
      style={{ scale, transformOrigin: `${x}px ${y}px` }}
    />
  );
}

function JourneyLabel({
  stage,
  x,
  y,
  onLeft,
  progressStart,
  scrollYProgress,
}: {
  stage: (typeof journeyStages)[number];
  x: number;
  y: number;
  onLeft: boolean;
  progressStart: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = Math.min(1, Math.max(0, progressStart));
  const end = Math.min(1, start + 0.07);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const align = onLeft ? "items-end text-right" : "items-start text-left";

  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: onLeft ? "translate(calc(-100% - 14px), -50%)" : "translate(14px, -50%)",
        opacity,
      }}
      className={`flex w-32 flex-col ${align} lg:w-48`}
    >
      <span className="text-eyebrow-lg text-cinnamon">{stage.label}</span>
      <span className="mt-1.5 text-sm leading-relaxed text-cocoa/70 lg:text-base">
        {stage.description}
      </span>
    </motion.div>
  );
}
