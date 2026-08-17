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

          <section className="overflow-hidden bg-velvet py-20 sm:py-28">
        <div className="container-edit">
          <span className="text-eyebrow text-cinnamon">Stick Grades</span>
          <h2 className="text-display mt-4 max-w-xl text-4xl text-cocoa sm:text-5xl">
            From H1 to Alba.
          </h2>
          <p className="text-editorial mt-4 text-sm text-cocoa/50 sm:hidden">
            Swipe to explore every grade →
          </p>

          <div className="relative mt-10 overflow-hidden sm:mt-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-velvet to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-velvet to-transparent sm:w-16" />

            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
              {stickGrades.map((grade, i) => (
                <div
                  key={grade.id}
                  className="flex w-[76vw] shrink-0 snap-center flex-col rounded-2xl border border-cocoa/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cocoa/10 sm:w-72 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    {grade.grade && (
                      <span className="text-eyebrow text-cinnamon">{grade.grade}</span>
                    )}
                    <span className="text-eyebrow shrink-0 text-cocoa/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-editorial mt-2 text-xl text-cocoa">{grade.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa/60">
                    {grade.description}
                  </p>
                  {grade.specifications?.[0] && (
                    <span className="text-eyebrow mt-4 w-fit rounded-full border border-cocoa/15 px-3 py-1.5 text-[10px] text-cocoa/70">
                      {grade.specifications[0]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        </div>
      </section>

      <CeylonComparison />
      <QuoteCTA />
    </>
  );
}
