import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ExperienceTimeline from "@/components/home/ExperienceTimeline";
import ContentSection from "@/components/home/ContentSection";
import ContactCTA from "@/components/home/ContactCTA";

import { evidence } from "@/data/evidence";
import { ieee } from "@/data/ieee";
import { research } from "@/data/research";
import { projects } from "@/data/projects";
import { professionalActivities } from "@/data/professionalActivities";
import { thoughtLeadership } from "@/data/thoughtLeadership";
import { externalProfiles } from "@/data/externalProfiles";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="content" className="flex flex-1 flex-col pb-10">
        <Hero />
        <AboutPreview />
        <ExperienceTimeline />
        <ContentSection id="evidence" data={evidence} />
        <ContentSection id="research" data={research} />
        <ContentSection id="projects" data={projects} />
        <ContentSection id="thought-leadership" data={thoughtLeadership} />
        <ContentSection id="professional-activities" data={professionalActivities} />
        <ContentSection id="ieee" data={ieee} />
        <ContentSection id="external-profiles" data={externalProfiles} />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
