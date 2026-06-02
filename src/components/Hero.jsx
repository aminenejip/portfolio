import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
import { heroTechs } from '../data/portfolio'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.25 + 0.05
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
          this.reset()
      }
      draw() {
        ctx.fillStyle = `rgba(173, 198, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = Array.from({ length: 80 }, () => new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      raf = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()
    window.addEventListener('resize', () => { resize(); init() })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <>
      <ParticleCanvas />
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-28 pb-20 z-10 overflow-hidden"
      >
        {/* Glow spheres */}
        <div
          className="glow-sphere bg-primary"
          style={{ top: '-10%', left: '-15%' }}
        />
        <div
          className="glow-sphere bg-tertiary"
          style={{ bottom: '10%', right: '-10%', opacity: 0.07 }}
        />

        <div className="section-container w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 space-y-8"
            >
              {/* Available badge */}
              <motion.div variants={item}>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="font-mono text-[10px] text-primary/80 uppercase tracking-[0.2em]">
                    Available for new opportunities
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div variants={item} className="space-y-4">
                <h1 className="font-sora font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight">
                  Building modern{' '}
                  <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                    digital experiences.
                  </span>
                </h1>
                <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                  A junior full-stack developer obsessed with performance, clean architectures,
                  and the intersection of engineering and elegant UI design.
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={item} className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  onClick={e => {
                    e.preventDefault()
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="primary-btn px-8 py-4 rounded-xl text-base gap-2 shadow-lg shadow-primary/20"
                >
                  View Projects <ArrowRight size={16} />
                </a>
                <a
                  href="#contact"
                  onClick={e => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="ghost-btn px-8 py-4 rounded-xl text-base"
                >
                  Get in Touch
                </a>
              </motion.div>

              {/* Tech chips */}
              <motion.div variants={item} className="flex flex-wrap gap-2">
                {heroTechs.map(t => (
                  <span key={t} className="tech-chip">{t}</span>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div variants={item} className="flex items-center gap-5 pt-2">
                <a
                  href="https://github.com/aminenejip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-outline hover:text-primary transition-colors"
                >
                  <GithubIcon size={15} /> GitHub
                </a>
                <div className="w-px h-4 bg-outline/30" />
                <a
                  href="#"
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-outline hover:text-secondary transition-colors"
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </motion.div>
            </motion.div>

            {/* Right — hero visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="animate-float relative z-10 rounded-3xl overflow-hidden glass-card p-3 premium-border">
                  {/* Code editor mockup */}
                  <div className="rounded-2xl code-editor border border-white/5 overflow-hidden">
                    {/* Editor top bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 code-editor-bar">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                      <span className="ml-4 font-mono text-[11px] text-outline">portfolio.jsx</span>
                    </div>
                    {/* Code content */}
                    <div className="p-6 font-mono text-[13px] leading-6 space-y-1 dark:text-white light:text-slate-800">
                      <p><span className="text-violet-500 light:text-violet-600">const</span> <span className="text-primary">Developer</span> <span className="text-on-surface">= {'{'}</span></p>
                      <p className="pl-6"><span className="text-secondary">name</span><span className="text-on-surface">: </span><span className="text-green-500 light:text-green-700">"Amine Neji"</span><span className="text-on-surface">,</span></p>
                      <p className="pl-6"><span className="text-secondary">role</span><span className="text-on-surface">: </span><span className="text-green-500 light:text-green-700">"Full-Stack Dev"</span><span className="text-on-surface">,</span></p>
                      <p className="pl-6"><span className="text-secondary">stack</span><span className="text-on-surface">: [</span></p>
                      <p className="pl-12"><span className="text-green-500 light:text-green-700">"React"</span><span className="text-on-surface">, </span><span className="text-green-500 light:text-green-700">"Spring Boot"</span><span className="text-on-surface">,</span></p>
                      <p className="pl-12"><span className="text-green-500 light:text-green-700">"Angular"</span><span className="text-on-surface">, </span><span className="text-green-500 light:text-green-700">"Laravel"</span></p>
                      <p className="pl-6"><span className="text-on-surface">],</span></p>
                      <p className="pl-6"><span className="text-secondary">available</span><span className="text-on-surface">: </span><span className="text-orange-500 light:text-orange-700">true</span></p>
                      <p><span className="text-on-surface">{'}'}</span></p>
                      <p className="mt-3 text-outline/60 light:text-outline/50">{'// Currently building awesome things'}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-outline/60">{'> '}</span>
                        <span className="w-2 h-5 bg-primary/70 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating tags */}
                <div className="absolute -top-5 -right-5 glass-card px-4 py-2 rounded-xl border border-secondary/20 shadow-xl z-20">
                  <span className="font-mono text-[11px] text-secondary">UI/UX Design</span>
                </div>
                <div className="absolute top-1/3 -left-8 glass-card px-4 py-2 rounded-xl border border-primary/20 shadow-xl z-20">
                  <span className="font-mono text-[11px] text-primary">Backend</span>
                </div>
                <div className="absolute bottom-1/4 -right-10 glass-card px-4 py-2 rounded-xl border border-tertiary/20 shadow-xl z-20">
                  <span className="font-mono text-[11px] text-tertiary">API Design</span>
                </div>

                {/* Decorative blurs */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 blur-3xl rounded-full pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center mt-16"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-outline/50">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-outline/30 to-transparent animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
