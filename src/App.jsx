import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Timeline from "./sections/Timeline";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  return (
    <div className="relative min-h-screen text-white selection:bg-indigo-500/30 selection:text-white">
      {/* Fixed global atmospheric radial gradient that seamlessly persists across scrolling without cutoff */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(120vw 60vh at 20% 8%, rgba(99,102,241,0.30), transparent 70%),
            radial-gradient(100vw 50vh at 80% 20%, rgba(168,85,247,0.25), transparent 70%),
            radial-gradient(110vw 60vh at 15% 50%, rgba(99,102,241,0.22), transparent 70%),
            radial-gradient(100vw 55vh at 85% 72%, rgba(168,85,247,0.22), transparent 70%),
            radial-gradient(90vw 60vh at 50% 92%, rgba(34,211,238,0.20), transparent 75%),
            #05060a
          `,
        }}
      />

      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Projects />
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
