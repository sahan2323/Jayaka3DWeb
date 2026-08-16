import { Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ContainerScroll, CardSticky } from "@/components/ui/sticky-card-stack";

interface Pillar {
  id: string;
  title: string;
  copy: string;
  gradient: string;
  image?: string;
}

const pillars: Pillar[] = [
  {
    id: "cultivation",
    title: "Cultivation",
    copy: "We plant and grade the finest cinnamon on our own estate, preserving Ceylon cinnamon's unique quality.",
    gradient: "linear-gradient(155deg, #f3d9b6 0%, #e5a86b 45%, #b3671f 85%, #5a3820 100%)",
    image: "/images/cultivation.jpg",
  },
  {
    id: "processing",
    title: "Processing",
    copy: "The outer bark is removed and rolled into quills by our village workforce — a way of giving back to the community.",
    gradient: "linear-gradient(155deg, #eccba0 0%, #d9922f 50%, #8a531f 85%, #43290f 100%)",
    image: "/images/processing.jpg",
  },
  {
    id: "distribution",
    title: "Distribution",
    copy: "An extensive domestic network delivers our products to customers reliably and cost-effectively.",
    gradient: "linear-gradient(155deg, #e9b989 0%, #c76a29 50%, #6b3f1c 85%, #2b1a10 100%)",
    image: "/images/distribution.jpg",
  },
  {
    id: "exporting",
    title: "Exporting",
    copy: "We ship to any country worldwide, navigating international regulations to deliver on time, every time.",
    gradient: "linear-gradient(155deg, #e5c39a 0%, #b3671f 50%, #5a3820 85%, #2b1a10 100%)",
    image: "/images/exporting.jpg",
  },
];

export function QualityReach() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-edit">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <span className="text-eyebrow text-cinnamon">Quality &amp; Global Reach</span>
            <h2 className="text-display mt-4 max-w-xl text-4xl text-cocoa sm:text-6xl">
              Estate to export, in-house.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Badge icon={<Leaf size={16} />} label="Pure Ceylon Cinnamon" />
            <Badge icon={<ShieldCheck size={16} />} label="FDA Registered Exporter" />
          </div>
        </div>
      </div>

      {/* Sticky card stack — adapted from the supplied ContainerScroll /
          CardSticky source. Each pillar pins in turn and the next one
          deals on top of it as you scroll, like a hand of cards. */}
      <ContainerScroll className="container-edit mt-16 min-h-[220vh] sm:mt-20">
        {pillars.map((pillar, i) => (
          <CardSticky
            key={pillar.id}
            index={i}
            incrementY={16}
            className="mb-8 flex min-h-[420px] flex-col overflow-hidden rounded-[1.75rem] border border-cocoa/10 bg-white shadow-[0_30px_70px_-35px_rgba(43,26,16,0.35)] sm:min-h-[300px] sm:flex-row"
          >
            <div
              className="relative h-48 w-full shrink-0 sm:h-auto sm:w-2/5"
              style={pillar.image ? {} : { background: pillar.gradient }}
              aria-hidden="true"
            >
              {pillar.image ? (
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-30 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(115deg, transparent 0 24px, rgba(43,26,16,0.28) 24px 26px)",
                  }}
                />
              )}
              <span className="text-eyebrow-lg absolute left-6 top-6 text-white/90 drop-shadow-md">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12">
              <h3 className="text-editorial text-2xl text-cocoa sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-cocoa/60 sm:text-lg">
                {pillar.copy}
              </p>
            </div>
          </CardSticky>
        ))}
      </ContainerScroll>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-cocoa/15 px-4 py-2.5 text-xs text-cocoa/70">
      <span className="text-cinnamon">{icon}</span>
      {label}
    </div>
  );
}
