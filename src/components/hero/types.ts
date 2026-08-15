/**
 * Every hero visual layer (the CSS/SVG placeholder rig, the video scrub
 * layer, and the image-sequence canvas layer) implements this single
 * imperative interface. CinnamonScrollHero owns one ScrollTrigger and
 * pushes progress into whichever layer is mounted — so swapping the
 * placeholder for the final render is a one-line prop change, never a
 * rewrite of the hero itself.
 */
export interface HeroVisualHandle {
  onProgress: (progress: number) => void;
}
