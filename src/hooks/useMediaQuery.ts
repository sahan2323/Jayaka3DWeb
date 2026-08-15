"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query in JS. Used where a component needs a
 * genuinely different implementation per breakpoint — not just
 * different Tailwind classes — such as swapping a pinned/scaled desktop
 * visual for a simpler stacked mobile layout.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
