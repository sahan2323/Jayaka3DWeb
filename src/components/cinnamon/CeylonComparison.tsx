import { ceylonBenefits, ceylonVsCassia } from "@/data/company";

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

        <div className="mt-14 overflow-x-auto rounded-3xl border border-velvet/10">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-velvet/10 text-eyebrow text-velvet/50">
                <th className="px-6 py-5 font-medium">Attribute</th>
                <th className="px-6 py-5 font-medium text-cinnamon">Ceylon Cinnamon</th>
                <th className="px-6 py-5 font-medium">Cassia</th>
              </tr>
            </thead>
            <tbody>
              {ceylonVsCassia.map((row) => (
                <tr key={row.attribute} className="border-b border-velvet/5 last:border-0">
                  <td className="px-6 py-5 text-sm text-velvet/50">{row.attribute}</td>
                  <td className="px-6 py-5 text-sm text-velvet sm:text-base">{row.ceylon}</td>
                  <td className="px-6 py-5 text-sm text-velvet/50 sm:text-base">{row.cassia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ceylonBenefits.map((benefit) => (
            <div
              key={benefit}
              className="rounded-2xl border border-velvet/10 p-6 text-sm text-velvet/70"
            >
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
