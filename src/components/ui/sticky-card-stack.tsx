"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Adapted from the supplied cards-stack source. The interaction pattern —
 * a column of cards, each pinned via `position: sticky` at its own
 * incrementing offset so later cards visually deal on top of earlier
 * ones as you scroll — is preserved. Two changes from the source:
 *
 *  - `z-index` (a real, standards-backed property) replaces the source's
 *    `z` inline style, which isn't a valid standalone CSS property and
 *    had no effect; explicit z-index guarantees correct stacking order
 *    regardless of DOM position or sibling stacking contexts.
 *  - No visual opinions baked in (colors, borders, radius) — callers
 *    supply those via `className`, so this stays reusable.
 */

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1200px", ...style }}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerScroll.displayName = "ContainerScroll";

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number;
  incrementY?: number;
}

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ index, incrementY = 18, children, className, style, ...props }, ref) => {
    const top = index * incrementY;

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          top,
          zIndex: index,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn("sticky", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
CardSticky.displayName = "CardSticky";

export { ContainerScroll, CardSticky };
