import { Check, Minus } from "lucide-react";
import { ceylonVsCassia } from "@/data/company";


export function CeylonComparison() {
  return (
    <section className="bg-cocoa py-24 text-velvet sm:py-32">
      <div className="container-edit">
        <div className="max-w-2xl">
          <span className="text-eyebrow text-cinnamon">Why Ceylon, Not Cassia</span>
          <h2 className="text-display mt-4 text-4xl sm:text-6xl">
            The True Cinnamon.
          </h2>
          <p className="text-editorial mt-5 text-velvet/60">
            Most cinnamon sold worldwide is cassia. Ceylon cinnamon — Cinnamomum
            zeylanicum — is a different species entirely, indigenous to Sri Lanka
            and prized for its mild flavor and negligible coumarin content.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="relative overflow-hidden rounded-3xl border border-cinnamon/40 bg-velvet/[0.04] p-8 sm:p-10 lg:rounded-r-none lg:border-r-0">
            <span className="text-eyebrow text-cinnamon">Ceylon Cinnamon</span>
            <p className="mt-2 text-sm text-velvet/50">Cinnamomum zeylanicum</p>

            <ul className="mt-8 flex flex-col gap-5">
              {ceylonVsCassia.map((row) => (
                <li key={row.attribute} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cinnamon/15 text-cinnamon">
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-velvet/40">
                      {row.attribute}
                    </span>
                    <span className="text-velvet">{row.ceylon}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-8 z-10 hidden -translate-x-1/2 lg:block">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-velvet/15 bg-cocoa text-xs font-semibold tracking-wide text-velvet/60">
              VS
            </span>
          </div>

          <div className="rounded-3xl border border-velvet/10 bg-velvet/[0.02] p-8 sm:p-10 lg:rounded-l-none">
            <span className="text-eyebrow text-velvet/40">Cassia</span>
            <p className="mt-2 text-sm text-velvet/50">Cinnamomum cassia</p>

            <ul className="mt-8 flex flex-col gap-5">
              {ceylonVsCassia.map((row) => (
                <li key={row.attribute} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-velvet/10 text-velvet/40">
                    <Minus size={13} strokeWidth={2.5} />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-velvet/40">
                      {row.attribute}
                    </span>
                    <span className="text-velvet/60">{row.cassia}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-velvet/10 bg-velvet/[0.03] p-8 sm:p-12">
  <span className="text-eyebrow text-cinnamon">Health &amp; Safety</span>
  <p className="text-editorial mt-4 max-w-3xl text-lg leading-relaxed text-velvet/75 sm:text-xl">
    Pure Ceylon cinnamon (Cinnamomum verum) offers powerful health benefits,
    supporting healthy blood sugar management, reducing inflammation, and
    delivering rich antioxidant protection. In contrast, common Cassia
    cinnamon carries high levels of coumarin, a compound linked to liver
    toxicity and increased cancer risks in health studies. Ceylon cinnamon
    provides all the natural wellness benefits of true cinnamon safely,
    making it the ideal choice for everyday consumption.
  </p>
</div>
      </div>
    </section>
  );
}