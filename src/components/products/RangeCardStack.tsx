"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { ProductVisual } from "./ProductVisual";
import { featuredProducts, type ProductCategory } from "@/data/products";
import { useContainerSize } from "@/hooks/useContainerSize";

interface RangeItem extends CardStackItem {
  category: ProductCategory;
  tag: string;
  grade?: string;
}

const rangeItems: RangeItem[] = featuredProducts.map((p) => ({
  id: p.id,
  title: p.name,
  description: p.shortDescription,
  category: p.category,
  tag: p.categoryLabel,
  grade: p.grade,
}));

interface StackConfig {
  cardWidth: number;
  cardHeight: number;
  maxVisible: number;
  spreadDeg: number;
  overlap: number;
  depthPx: number;
  tiltXDeg: number;
  activeLiftPx: number;
  perspectivePx: number;
}

function resolveConfig(containerWidth: number): StackConfig {
  if (containerWidth === 0) {
    // Not measured yet — a sensible desktop-ish default avoids a flash
    // of drastically different sizing before the first measurement.
    return {
      cardWidth: 460,
      cardHeight: 340,
      maxVisible: 5,
      spreadDeg: 44,
      overlap: 0.5,
      depthPx: 130,
      tiltXDeg: 12,
      activeLiftPx: 24,
      perspectivePx: 1200,
    };
  }

  if (containerWidth < 560) {
    // Mobile: width derived directly from the available container so
    // cards never risk pushing the page wider than the viewport.
    const cardWidth = Math.max(200, Math.min(272, containerWidth - 56));
    return {
      cardWidth,
      cardHeight: Math.round(cardWidth * 1.24),
      maxVisible: 3,
      spreadDeg: 18,
      overlap: 0.6,
      depthPx: 40,
      tiltXDeg: 7,
      activeLiftPx: 12,
      perspectivePx: 900,
    };
  }

  if (containerWidth < 900) {
    return {
      cardWidth: 340,
      cardHeight: 300,
      maxVisible: 5,
      spreadDeg: 32,
      overlap: 0.53,
      depthPx: 90,
      tiltXDeg: 10,
      activeLiftPx: 18,
      perspectivePx: 1050,
    };
  }

  return {
    cardWidth: 460,
    cardHeight: 340,
    maxVisible: 5,
    spreadDeg: 44,
    overlap: 0.5,
    depthPx: 130,
    tiltXDeg: 12,
    activeLiftPx: 24,
    perspectivePx: 1200,
  };
}

export function RangeCardStack() {
  const { ref, size } = useContainerSize<HTMLDivElement>();
  const config = resolveConfig(size.width);

  return (
    <section className="overflow-x-clip bg-velvet py-24 sm:py-32">
      <div className="container-edit text-center">
        <span className="text-eyebrow text-cinnamon">The Range</span>
        <h2 className="text-display mt-4 text-4xl text-cocoa sm:text-6xl">
          A Catalogue of Ceylon Cinnamon
        </h2>
        <p className="text-editorial mx-auto mt-5 max-w-xl text-sm text-cocoa/60 sm:text-base">
          From Alba, the finest grade grown, to bark oil distilled on our own
          estate — every product is graded, cut and packed in Karandeniya.
          Tap or drag to explore.
        </p>
      </div>

      <div ref={ref} className="container-edit mt-14 sm:mt-16">
        <CardStack
          items={rangeItems}
          maxVisible={config.maxVisible}
          cardWidth={config.cardWidth}
          cardHeight={config.cardHeight}
          overlap={config.overlap}
          spreadDeg={config.spreadDeg}
          perspectivePx={config.perspectivePx}
          depthPx={config.depthPx}
          tiltXDeg={config.tiltXDeg}
          activeLiftPx={config.activeLiftPx}
          activeScale={1.05}
          inactiveScale={0.92}
          loop
          showDots
          renderCard={(item, state) => (
            <RangeCard item={item as RangeItem} active={state.active} />
          )}
        />
      </div>

      <div className="container-edit mt-10 flex justify-center">
        <Link
          href="/products"
          className="text-eyebrow group inline-flex items-center gap-2 text-cocoa"
        >
          Explore the Full Range
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function RangeCard({ item, active }: { item: RangeItem; active: boolean }) {
  return (
    <div className="relative h-full w-full">
      <ProductVisual category={item.category} className="absolute inset-0 h-full w-full" />

      <span className="text-eyebrow absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1.5 text-cocoa backdrop-blur">
        {item.tag}
      </span>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/15 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7">
        {item.grade && (
          <span className="text-eyebrow text-blur">{item.grade}</span>
        )}
        <h3 className="text-editorial mt-1 text-xl text-white sm:text-2xl">{item.title}</h3>
        {item.description && (
          <p
            className={
              active
                ? "mt-2 line-clamp-2 text-sm text-white/80 sm:line-clamp-3"
                : "mt-2 hidden text-sm text-white/60 sm:block sm:line-clamp-1"
            }
          >
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
