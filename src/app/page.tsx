"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FallBeamBackground from "@/components/FallBeamBackground";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function Home() {
  const [isPageReady, setIsPageReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Wait for page to be ready
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader />
      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageReady ? 1 : 0 }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 0.5, 
          ease: [0.4, 0, 0.2, 1] 
        }}
      >
        <FallBeamBackground lineCount={20} beamColorClass="cyan-400" />
        <ScrollProgress />
        <Header />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
