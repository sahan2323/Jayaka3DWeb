"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CinnamonJourneyDesktop } from "./CinnamonJourneyDesktop";
import { CinnamonJourneyMobile } from "./CinnamonJourneyMobile";

/**
 * This section sits well below the fold on every page it's used on, so
 * the brief flash while `useMediaQuery` settles on mount (it can't know
 * the viewport during server render) never has a chance to be visible —
 * by the time a visitor scrolls this far, hydration is long finished.
 */
export function CinnamonJourney() {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  return isDesktop ? <CinnamonJourneyDesktop /> : <CinnamonJourneyMobile />;
}
