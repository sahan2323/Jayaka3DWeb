// The hero's cinematic visual, extracted frame-by-frame from the
// generated video (public/video/jayakavideo-source note: original file
// isn't shipped in the repo, only the extracted sequence is) so scroll
// position can map to an exact frame with no video-seek latency or
// codec-compatibility concerns (the source was HEVC 10-bit, which most
// browsers other than Safari won't play back at all).
//
// To swap in a different render later: replace the files in
// public/video/frames/ (same naming/padding) and update HERO_FRAME_COUNT,
// or just pass a `frames` prop directly to <CinnamonScrollHero />.

export const HERO_FRAME_COUNT = 169;

function heroFramePath(index: number): string {
  return `/video/frames/hero_${String(index).padStart(4, "0")}.webp`;
}

export const heroFrames: string[] = Array.from({ length: HERO_FRAME_COUNT }, (_, i) =>
  heroFramePath(i)
);

export const HERO_LAST_FRAME = heroFramePath(HERO_FRAME_COUNT - 1);
// Not currently consumed anywhere (the hero's closing beat now overlays
// the live footage in-place, rather than dissolving to a separate static
// image) — kept as a ready-made reference for things like a poster frame
// or an OG/share image.
