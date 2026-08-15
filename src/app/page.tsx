import { CinnamonScrollHero } from "@/components/hero/CinnamonScrollHero";
import { RangeCardStack } from "@/components/products/RangeCardStack";
import { ScrollStatement } from "@/components/animations/ScrollStatement";
import { CinnamonJourney } from "@/components/cinnamon/CinnamonJourney";
import { StoryTeaser } from "@/components/story/StoryTeaser";
import { QualityReach } from "@/components/story/QualityReach";
import { Testimonials } from "@/components/story/Testimonials";
import { QuoteCTA } from "@/components/story/QuoteCTA";

export default function Home() {
  return (
    <>
      {/* 1. Cinematic hero — includes its own "FROM CEYLON. CRAFTED FOR
          THE WORLD." closing beat, synced to the footage, so it hands
          off to the Range section directly with no separate transition
          section and no gap. */}
      <CinnamonScrollHero />

      {/* 2. Featured product range — interactive card stack */}
      <RangeCardStack />

      {/* 3. Cultivate / Harvest / Process / Craft / Refine / Export */}
      <ScrollStatement />

      {/* 4. Cinnamon journey */}
      <CinnamonJourney />

      {/* 5. Ceylon cinnamon story */}
      <StoryTeaser />

      {/* 6. Quality / global reach */}
      <QualityReach />

      <Testimonials />

      {/* 7. Request a quote */}
      <QuoteCTA />
    </>
  );
}
