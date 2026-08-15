"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import type { HeroVisualHandle } from "./types";

interface HeroVideoProps {
  /** Path to the final ~10-11s cinematic cinnamon render, e.g. "/video/hero.mp4" */
  src: string;
  poster?: string;
}

/**
 * Drop-in replacement for CinnamonStickRig once the externally generated
 * cinematic animation is ready. Renders the video paused and scrubs
 * `currentTime` directly against scroll progress — no autoplay, no
 * playback controls, fully driven by the same ScrollTrigger as the rest
 * of the hero.
 */
export const HeroVideo = forwardRef<HeroVisualHandle, HeroVideoProps>(
  function HeroVideo({ src, poster }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const durationRef = useRef(0);

    useImperativeHandle(ref, () => ({
      onProgress(progress) {
        const video = videoRef.current;
        if (!video || !durationRef.current) return;
        video.currentTime = progress * durationRef.current;
      },
    }));

    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-cover"
        onLoadedMetadata={(e) => {
          durationRef.current = e.currentTarget.duration || 0;
        }}
      />
    );
  }
);
