"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query in JS. Used where a component needs a
 * genuinely different implementation per breakpoint — not just
 * different Tailwind classes — such as swapping a pinned/scaled desktop
 * visual for a simpler stacked mobile layout.
 */
export function useMediaQuery(query: string): boolean {
  // Always initialize to false (matching SSR) to prevent hydration mismatches.
  // The true value will be set immediately after the first mount in useEffect.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches); // Set initial value on client
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
