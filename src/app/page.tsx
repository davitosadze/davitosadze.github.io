import {
  Hero,
  FeatureRibbon,
  HowToPlay,
  GameplaySection,
  BottleBreakSection,
  ProgressionSection,
  CustomizationSection,
  LevelCompleteSection,
  FinalCTA,
} from '@/components/home-sections';
import { ScreenshotGallery } from '@/components/gallery';
export default function Home() {
  return (
    <>
      <Hero />
      <FeatureRibbon />
      <HowToPlay />
      <GameplaySection />
      <BottleBreakSection />
      <ProgressionSection />
      <CustomizationSection />
      <LevelCompleteSection />
      <ScreenshotGallery />
      <FinalCTA />
    </>
  );
}
