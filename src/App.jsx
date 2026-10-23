import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import EducationAndCertifications from "./components/EducationAndCertifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

/**
 * App shell — final section order (fixed):
 * Hero(Home) → About → Projects → Education → Contact → Footer.
 */
export default function App() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <EducationAndCertifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
