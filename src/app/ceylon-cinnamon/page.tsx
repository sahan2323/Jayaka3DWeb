import type { Metadata } from "next";
import { products } from "@/data/products";
import { CeylonComparison } from "@/components/cinnamon/CeylonComparison";
import { QuoteCTA } from "@/components/story/QuoteCTA";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ceylon Cinnamon",
  description:
    "What Ceylon cinnamon is, where it comes from, how it's graded and processed, and how it differs from cassia.",
};

const stickGrades = products.filter((p) => p.category === "sticks");

export default function CeylonCinnamonPage() {
  return (
    <>
      <header className="relative overflow-hidden pt-40 pb-20 sm:pt-52 sm:pb-28">
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
    <div className="absolute inset-0 rounded-full bg-cinnamon/15 blur-3xl" />
    <Image
      src="/images/page-heroes/ceylon-cinnamon.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-contain object-[80%_center] opacity-90"
    />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-velvet" />
  </div>

  <div className="container-edit relative z-10">
    <span className="text-eyebrow text-cinnamon drop-shadow-[0_1px_12px_rgba(248,246,242,0.9)]">
      Ceylon Cinnamon
    </span>
    <h1 className="text-display mt-4 max-w-3xl text-5xl text-cocoa [text-shadow:0_2px_28px_rgba(248,246,242,0.9),0_1px_3px_rgba(248,246,242,0.7)] sm:text-7xl">
      The true cinnamon of Sri Lanka.
    </h1>
    <p className="text-editorial mt-8 max-w-2xl text-cocoa/60">
  Indigenous to Sri Lanka, true Ceylon cinnamon (Cinnamomum verum) carries
  a legacy spanning thousands of years, once traded alongside gold and
  sought after by historic empires. Sri Lanka now produces over 90% of
  the world's true cinnamon, relying on generations of artisanal peeling
  and hand-rolling techniques on native estates. Today, this heritage
  fuels a modern global industry—exporting refined quills, custom cuts,
  and pure essential oils to top international retail and pharmaceutical
  markets worldwide.
</p>
  </div>
</header>


      <section className="bg-velvet py-20 sm:py-28">
        <div className="container-edit">
          <span className="text-eyebrow text-cinnamon">Stick Grades</span>
          <h2 className="text-display mt-4 max-w-xl text-4xl text-cocoa sm:text-5xl">
            From H1 to Alba.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-cocoa/10 bg-cocoa/10 sm:grid-cols-2">
            {stickGrades.map((grade) => (
              <div key={grade.id} className="bg-white p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-editorial text-xl text-cocoa">{grade.name}</h3>
                  {grade.specifications?.[0] && (
                    <span className="text-eyebrow whitespace-nowrap text-cinnamon">
                      {grade.specifications[0]}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-cocoa/60">{grade.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CeylonComparison />
      <QuoteCTA />
    </>
  );
}
