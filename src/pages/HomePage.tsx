import { useEffect } from "react";
import Header from "../components/Header";
import ProjectSection from "../components/ProjectSection";
import TechList from "../components/TechList";

export default function HomePage() {
  // SEO: set page-specific title on mount
  useEffect(() => {
    document.title = "Clément Andreani — Développeur Full Stack | Portfolio";
  }, []);

  return (
    <>
      <Header />
      <main className="bg-[#f8f9fa]">
        <TechList />
        <ProjectSection />
      </main>
      <footer className="bg-[#f8f9fa] text-center py-6 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Clément Andreani. Tous droits réservés.</p>
      </footer>
    </>
  );
}
