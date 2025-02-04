import Header from "../components/Header";
import ProjectSection from "../components/ProjectSection";
import TechList from "../components/TechList";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-[#f8f9fa]">
        <TechList />
        <ProjectSection />
      </main>
    </>
  );
}
