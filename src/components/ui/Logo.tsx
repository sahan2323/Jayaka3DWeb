"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Sizing container — e.g. "h-8 w-[130px]". Controls the logo's box; the
   * image itself scales within it via object-contain (never stretched). */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Renders the real Jayaka Cinnamon logo (see /public/logo/README.md for
 * where to place the file). If the image fails to load — most likely
 * because the file hasn't been added yet — this falls back to the text
 * wordmark automatically, so the navbar/footer never show a broken-image
 * icon while the asset is pending.
 */
export function Logo({ className, imgClassName, priority }: LogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={cn("text-editorial inline-flex items-center whitespace-nowrap tracking-[-0.01em]", className)}>
        JAYAKA&nbsp;<span className="text-cinnamon">CINNAMON</span>
      </span>
    );
  }

  return (
    <span className={cn("relative inline-block", className)}>
      <Image
        src="/logo/jayakalogo.png"
        alt="Jayaka Cinnamon"
        fill
        priority={priority}
        sizes="200px"
        className={cn("object-contain object-left", imgClassName)}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
