import { useEffect } from "react";
import VibeFooter from "../components/VibeFooter";
import VibeHero from "../components/VibeHero";
import VibeProjects from "../components/VibeProjects";
import VibeTechMarquee from "../components/VibeTechMarquee";

export default function VibeHome() {
  useEffect(() => {
    document.title = "Clément Andreani — Développeur Full Stack | Portfolio";
  }, []);

  return (
    <>
      <VibeHero />
      <main>
        <VibeTechMarquee />
        <VibeProjects />
      </main>
      <VibeFooter />
    </>
  );
}
