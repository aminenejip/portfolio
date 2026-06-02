import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { stats } from '../data/portfolio'

export default function About() {
  const [ref, inView] = useInView(0.15)

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section id="about" className="relative section-padding z-10">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center" ref={ref}>
          {/* Profile card */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="order-2 md:order-1"
          >
            {/* mx-16 pour laisser de la place aux badges qui débordent */}
            <div className="relative mx-16 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-20 group-hover:opacity-35 transition duration-1000" />

              {/* Card — overflow visible pour que les badges ne soient pas clippés */}
              <div className="relative rounded-[2rem] p-8 sm:p-10 flex flex-col items-center gap-6 text-center premium-border glass-card"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary/30 bg-surface-container overflow-hidden shadow-2xl flex items-center justify-center">
                     <span className="font-sora font-extrabold text-4xl sm:text-5xl text-primary">AN</span>
                  </div>
                   <div className="absolute -bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-[3px] sm:border-[4px] border-[var(--bg)]" />
                </div>

                <div>
                  <h3 className="font-sora font-bold text-xl sm:text-2xl text-on-surface">Amine Neji</h3>
                  <p className="font-mono text-sm text-primary mt-1">Full-Stack Engineer</p>
                  <p className="font-mono text-xs text-muted mt-1">Computer Science Student</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 w-full pt-2 border-t border-[var(--card-border)]">
                  {stats.map(s => (
                    <div key={s.label} className="text-center">
                      <span className="block font-sora font-extrabold text-2xl text-on-surface">{s.value}</span>
                      <span className="font-mono text-[9px] text-muted uppercase tracking-widest mt-1 block leading-tight">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges — EN DEHORS de la card pour éviter le clipping */}
              <div className="absolute -top-4 -right-14 glass-card px-3 py-1.5 rounded-xl text-[11px] font-mono text-secondary shadow-xl border border-secondary/20 z-10">
                UI/UX
              </div>
              <div className="absolute top-1/3 -left-14 glass-card px-3 py-1.5 rounded-xl text-[11px] font-mono text-primary shadow-xl border border-primary/20 z-10">
                Backend
              </div>
              <div className="absolute bottom-1/4 -right-16 glass-card px-3 py-1.5 rounded-xl text-[11px] font-mono text-tertiary shadow-xl border border-tertiary/20 z-10">
                API Design
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-1 md:order-2 space-y-8">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                — About Me
              </span>
              <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-on-surface leading-tight">
                Driven by Code,{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-gradient">
                  Guided by Design
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </motion.div>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="text-on-surface-variant leading-relaxed text-[17px]"
            >
              As a Computer Science student with a passion for building robust digital solutions,
              I bridge the gap between complex backend architectures and intuitive user interfaces.
            </motion.p>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="text-on-surface-variant leading-relaxed text-[17px]"
            >
              I specialize in creating end-to-end applications, from designing relational databases
              to crafting responsive frontends. My goal is to build software that not only works
              perfectly but also provides a delightful user journey.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="flex flex-wrap gap-3 pt-2"
            >
              {['Problem Solver', 'Team Player', 'Fast Learner', 'Detail Oriented'].map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 border border-[var(--card-border)] font-mono text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="flex gap-4 pt-2"
            >
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="primary-btn px-7 py-3.5 rounded-xl text-sm"
              >
                Work Together
              </a>
              <a
                href="#"
                className="ghost-btn px-7 py-3.5 rounded-xl text-sm"
              >
                Download CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
