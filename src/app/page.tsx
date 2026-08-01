import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ContactCTA from "@/components/home/ContactCTA";
import ExecutiveProfileCard from "@/components/profile/ExecutiveProfileCard";
import FeaturedResearchCarousel from "@/components/home/FeaturedResearchCarousel";
import FeaturedBook from "@/components/home/FeaturedBook";
import PremiumHomeSections from "@/components/home/PremiumHomeSections";
import ResearchImpactSection from "@/components/home/ResearchImpactSection";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="content" className="flex flex-1 flex-col pb-10">
        <Hero />
        <section className="py-6 sm:py-8" aria-label="Executive profile">
          <Container>
            <Reveal>
              <ExecutiveProfileCard />
            </Reveal>
          </Container>
        </section>
        <FeaturedBook />
        <FeaturedResearchCarousel />
        <ResearchImpactSection />
        <PremiumHomeSections />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
