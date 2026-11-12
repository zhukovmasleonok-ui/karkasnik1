import { Hero, FactsMarquee, KeyFacts } from '@/components/home/Hero';
import {
  Manifesto,
  TechnologiesSection,
  ProjectsTeaser,
  Advantages,
  WorkSteps,
  Configurations,
  Trust,
  MortgageTeaser,
  Geography,
  ReviewsTeaser,
  FaqSection,
} from '@/components/home/sections';
import { FinalCta } from '@/components/home/FinalCta';
import { pagesMeta } from '@/content/site';

export const metadata = {
  title: pagesMeta.home.title,
  description: pagesMeta.home.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FactsMarquee />
      <KeyFacts />
      <Manifesto />
      <TechnologiesSection />
      <ProjectsTeaser />
      <Advantages />
      <ReviewsTeaser />
      <WorkSteps />
      <Configurations />
      <Trust />
      <MortgageTeaser />
      <Geography />
      <FaqSection />
      <FinalCta />
    </>
  );
}
