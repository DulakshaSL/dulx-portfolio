import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Skills from "./sections/Skills";
import Timeline from "./sections/Timeline";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-500/35 selection:text-white overflow-x-clip">
      {/* Clean Modern Dark Backdrop: Crisp slate gradient & technical architectural grid without bubbles */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle linear studio gradation (no colorful blurry bubbles) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1424] via-[#0b0f19] to-[#080b12]" />

        {/* Clean geometric micro-grid for architectural precision */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:40px_40px]"
        />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
