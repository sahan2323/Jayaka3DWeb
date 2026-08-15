"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, products, type ProductCategory } from "@/data/products";
import { ProductVisual } from "./ProductVisual";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | ProductCategory;

export function ProductCatalogue() {
  const [active, setActive] = useState<CategoryFilter>("all");

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter products by category"
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat.id)}
              className={cn(
                "text-eyebrow rounded-full border px-5 py-2.5 transition-colors",
                isActive
                  ? "border-cinnamon bg-cinnamon text-white"
                  : "border-cocoa/15 text-cocoa/60 hover:border-cocoa/35 hover:text-cocoa"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.article
                key={product.id}
                id={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group scroll-mt-28 overflow-hidden rounded-3xl border border-cocoa/10 bg-white"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <ProductVisual
                    category={product.category}
                    image={product.image}
                    alt={product.name}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="text-eyebrow absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-cocoa backdrop-blur">
                    {product.categoryLabel}
                  </span>
                </div>

                <div className="p-7">
                  {product.grade && (
                    <span className="text-eyebrow text-cinnamon">{product.grade}</span>
                  )}
                  <h3 className="text-editorial mt-2 text-2xl text-cocoa">{product.name}</h3>
                  <p className="mt-3 text-sm text-cocoa/60">{product.shortDescription}</p>

                  {product.specifications && product.specifications.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {product.specifications.map((spec) => (
                        <li
                          key={spec}
                          className="text-eyebrow rounded-full border border-cocoa/15 px-2.5 py-1 text-[10px] text-cocoa/70"
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href="/contact"
                    className="text-eyebrow group/link mt-6 inline-flex items-center gap-1.5 text-cocoa"
                  >
                    Request a Quote
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
