"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { HeroVisualHandle } from "./types";

interface HeroCanvasProps {
  /** Ordered frame URLs. */
  frames: string[];
  /** Fires once every frame has finished loading. */
  onReady?: () => void;
  /** Fires as soon as the very first frame is painted (before the rest finish). */
  onFirstPaint?: () => void;
}

/**
 * Draws the frame matching the current scroll progress onto a canvas
 * sized to its container — the technique behind most "video that scrubs
 * perfectly with scroll" hero builds, since it sidesteps the seek
 * latency and jank that `video.currentTime` scrubbing has on many
 * browsers/devices. See HeroVideo for the video.currentTime alternative.
 */
export const HeroCanvas = forwardRef<HeroVisualHandle, HeroCanvasProps>(
  function HeroCanvas({ frames, onReady, onFirstPaint }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentIndexRef = useRef(0);
    const firstPaintedRef = useRef(false);

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.max(w / img.width, h / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - drawW) / 2, (h - drawH) / 2, drawW, drawH);

      if (!firstPaintedRef.current) {
        firstPaintedRef.current = true;
        onFirstPaint?.();
      }
    };

    useEffect(() => {
      let cancelled = false;
      let loadedCount = 0;
      const total = frames.length;

      const images = frames.map((src, i) => {
        const img = new window.Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return;
          loadedCount += 1;
          if (i === 0) drawFrame(0);
          if (loadedCount === total) onReady?.();
        };
        img.src = src;
        return img;
      });
      imagesRef.current = images;

      return () => {
        cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frames]);

    useEffect(() => {
      const handleResize = () => drawFrame(currentIndexRef.current);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      onProgress(progress) {
        const total = frames.length;
        if (!total) return;
        const index = Math.min(total - 1, Math.max(0, Math.round(progress * (total - 1))));
        currentIndexRef.current = index;
        drawFrame(index);
      },
    }));

    return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
  }
);
