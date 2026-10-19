import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";

/**
 * App shell.
 * Section order (fixed): Hero(Home) → About → Projects → Education → Contact.
 * Remaining sections are added one at a time; the stubs below keep anchor
 * navigation working until each real component replaces them.
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
        <Stub id="education" label="Education & Certifications" />
        <Stub id="contact" label="Contact" />
      </main>
    </>
  );
}

function Stub({ id, label }) {
  return (
    <section
      id={id}
      aria-label={label}
      className="flex min-h-[60vh] items-center justify-center border-b border-dashed border-borderline/60"
    >
      <p className="text-sm text-muted">
        [STUB] {label} — built in an upcoming step
      </p>
    </section>
  );
}
