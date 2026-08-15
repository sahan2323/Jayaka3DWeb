"use client";

import { useEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

/**
 * Tracks the real, rendered pixel size of an element. Used anywhere a
 * scroll-driven visual needs to compute exact positions against its own
 * box rather than assuming a fixed aspect ratio — the mismatch between
 * an assumed size and the real one is exactly what caused labels to
 * drift out of alignment with the Cinnamon Journey path on mobile.
 */
export function useContainerSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
