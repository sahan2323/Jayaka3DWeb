export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Smoothstep-eased 0..1 interpolation between two scroll-progress breakpoints. */
export function segment(progress: number, from: number, to: number): number {
  if (to === from) return progress >= to ? 1 : 0;
  const t = clamp01((progress - from) / (to - from));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
