import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import WorkProcess from './components/WorkProcess'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">
        <Hero />
    
        <About />
        <Skills />
        <Projects />
        <Services />
        <WorkProcess />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
