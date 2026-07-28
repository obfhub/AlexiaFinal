import HeroSection from "../components/home/HeroSection";
import SpecialOfferSection from "../components/home/SpecialOfferSection";
import ClassVarietiesSection from "../components/home/ClassVarietiesSection";
import BenefitsCarousel from "../components/home/BenefitsCarousel";
import CoachSpotlights from "../components/home/CoachSpotlights";
import TestimonialsSection from "../components/home/TestimonialsSection";
import StatisticsSection from "../components/home/StatisticsSection";

import DecorativeSection from "../components/home/DecorativeSection";
import FaqSection from "../components/home/FaqSection";
import WhereToFindUs from "../components/location/WhereToFindUs";

const IMAGES = {
  hero: "/heroalexia.png",
  classes: [
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/ba8f3ebde_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/9b1197d00_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/99696e861_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/6ed7fb813_generated_image.png",
  ],
  facility: [
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/b193141f3_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/b47b3a1ca_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/ba8f3ebde_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/bd34b99df_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/99696e861_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/9b1197d00_generated_image.png",
    "https://media.base44.com/images/public/6a6694c080572115c141e8b7/6ed7fb813_generated_image.png",
  ],
};

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={IMAGES.hero} />
      <SpecialOfferSection />
      <ClassVarietiesSection images={IMAGES.classes} />
      <DecorativeSection />
      <StatisticsSection />
      <BenefitsCarousel />
      <CoachSpotlights />
      <TestimonialsSection />
      <FaqSection />
      <WhereToFindUs />

    </div>
  );
}