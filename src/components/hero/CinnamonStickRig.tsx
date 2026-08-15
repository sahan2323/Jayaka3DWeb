"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { lerp, segment } from "@/lib/animation";
import type { HeroVisualHandle } from "./types";

/**
 * Placeholder for the externally generated cinematic render (see
 * CinnamonScrollHero). Builds the same physical choreography the brief
 * specifies — three sticks converge, two roll fully out of frame, the
 * remaining stick is inspected, then stands vertical and floats — using
 * plain CSS transforms on three bark-textured bars. No fades, no
 * teleports: every exit is a real translation across the frame.
 */
export const CinnamonStickRig = forwardRef<HeroVisualHandle, object>(
  function CinnamonStickRig(_props, ref) {
    const stageRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const mainWrapRef = useRef<HTMLDivElement>(null);
    const idleTween = useRef<gsap.core.Tween | null>(null);
    const idleActive = useRef(false);

    useImperativeHandle(ref, () => ({
      onProgress(progress) {
        const left = leftRef.current;
        const right = rightRef.current;
        const main = mainRef.current;
        const mainWrap = mainWrapRef.current;
        if (!left || !right || !main || !mainWrap) return;

        // --- Secondary sticks: converge toward center, then roll fully
        // out of frame. Position is a continuous physical path, never a
        // snap or a fade.
        const converge = segment(progress, 0, 0.4); // 0 -> aligned near center
        const exit = segment(progress, 0.42, 0.62); // aligned -> fully offscreen

        const convergeX = lerp(-260, -46, converge);
        const exitX = lerp(-46, -1400, exit);
        const leftX = progress < 0.42 ? convergeX : exitX;
        const leftRotate = lerp(-16, -2, converge) - lerp(0, 46, exit);
        const leftY = lerp(46, 0, converge) - lerp(0, 60, exit);

        const convergeXR = lerp(260, 46, converge);
        const exitXR = lerp(46, 1400, exit);
        const rightX = progress < 0.42 ? convergeXR : exitXR;
        const rightRotate = lerp(16, 2, converge) + lerp(0, 46, exit);
        const rightY = lerp(-34, 0, converge) - lerp(0, 60, exit);

        left.style.transform = `translate(${leftX}px, ${leftY}px) rotate(${leftRotate}deg)`;
        right.style.transform = `translate(${rightX}px, ${rightY}px) rotate(${rightRotate}deg)`;
        left.style.opacity = "1";
        right.style.opacity = "1";

        // --- Main stick: settle to center, then become the 3D showcase,
        // then rotate upright and float.
        const settle = segment(progress, 0, 0.4);
        const showcase = segment(progress, 0.6, 0.7);
        const uprightT = segment(progress, 0.7, 0.85);
        const floatT = segment(progress, 0.85, 1);

        const mainRotate2D = lerp(6, 0, settle); // settles flat/centered
        const mainScale = lerp(0.92, 1, settle) + lerp(0, 0.16, showcase);
        const mainRotateY = lerp(-18, 18, showcase) + lerp(18, 210, uprightT) + lerp(210, 250, floatT);
        const mainStand = lerp(0, -90, uprightT); // lie flat -> stand vertical
        const floatBob = lerp(0, -18, floatT);

        mainWrap.style.transform = `translateY(${floatBob}px) scale(${mainScale})`;
        main.style.transform = `rotate(${mainRotate2D + mainStand}deg) rotateY(${mainRotateY}deg)`;

        // --- Idle floating loop once the stick is fully upright.
        if (progress >= 0.985 && !idleActive.current) {
          idleActive.current = true;
          idleTween.current = gsap.to(mainWrap, {
            y: "+=14",
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        } else if (progress < 0.985 && idleActive.current) {
          idleActive.current = false;
          idleTween.current?.kill();
          idleTween.current = null;
          gsap.set(mainWrap, { y: 0 });
        }
      },
    }));

    return (
      <div
        ref={stageRef}
        className="relative h-full w-full"
        style={{ perspective: "1400px" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={leftRef} className="absolute will-change-transform">
            <Stick length={340} width={34} />
          </div>
          <div ref={rightRef} className="absolute will-change-transform">
            <Stick length={300} width={30} />
          </div>
          <div
            ref={mainWrapRef}
            className="absolute will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div ref={mainRef} className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
              <Stick length={400} width={42} main />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

function Stick({
  length,
  width,
  main = false,
}: {
  length: number;
  width: number;
  main?: boolean;
}) {
  const rings = Math.round(length / 26);

  return (
    <div
      className="relative rounded-full shadow-[0_30px_60px_-20px_rgba(43,26,16,0.45)]"
      style={{
        width: length,
        height: width,
        background:
          "linear-gradient(180deg, #e6b483 0%, #d9922f 38%, #b3671f 72%, #7c4318 100%)",
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 18px, rgba(43,26,16,0.35) 18px 20px)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-1/3 rounded-full opacity-50"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.55), transparent)",
        }}
      />
      {/* End caps hint at rolled bark layers */}
      {[0, 1].map((side) => (
        <div
          key={side}
          className="absolute top-1/2 h-[85%] -translate-y-1/2 rounded-full border-2 border-cocoa/20"
          style={{
            width: width * 0.32,
            [side === 0 ? "left" : "right"]: -width * 0.06,
          }}
        />
      ))}
      {main &&
        Array.from({ length: rings }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-cocoa/10"
            style={{ left: `${((i + 1) / (rings + 1)) * 100}%` }}
          />
        ))}
    </div>
  );
}
