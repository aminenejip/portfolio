import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { workProcess } from '../data/portfolio'

const colorMap = {
  primary: 'text-primary border-primary/30',
  secondary: 'text-secondary border-secondary/30',
  tertiary: 'text-tertiary border-tertiary/30',
}

export default function WorkProcess() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="process" className="relative section-padding z-10 overflow-hidden">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 space-y-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
            — How I Work
          </span>
          <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-white">
            The Engineering Loop
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            My systematic approach to solving problems and deploying features.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="relative px-2">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-7 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent z-0" />

          <div className="grid grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-4 relative z-10">
            {workProcess.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl glass-card border flex items-center justify-center font-sora font-bold text-lg shadow-xl transition-all group-hover:scale-110 ${colorMap[p.color]}`}
                >
                  {p.step}
                </div>
                <span className="font-mono text-[10px] text-white uppercase tracking-widest text-center leading-tight">
                  {p.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {[
            {
              phase: 'Discovery',
              steps: '1 — 2',
              color: 'primary',
              desc: 'Deep understanding of requirements, constraints, and user goals.',
            },
            {
              phase: 'Architecture',
              steps: '3 — 4',
              color: 'secondary',
              desc: 'System design, wireframes, and technical specification.',
            },
            {
              phase: 'Execution',
              steps: '5 — 6',
              color: 'tertiary',
              desc: 'Full-stack development and integration of all components.',
            },
            {
              phase: 'Delivery',
              steps: '7 — 8',
              color: 'primary',
              desc: 'Rigorous testing, performance tuning, and production deployment.',
            },
          ].map((card, i) => {
            const c = {
              primary: { text: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/5' },
              secondary: { text: 'text-secondary', border: 'border-secondary/20', bg: 'bg-secondary/5' },
              tertiary: { text: 'text-tertiary', border: 'border-tertiary/20', bg: 'bg-tertiary/5' },
            }[card.color]

            return (
              <motion.div
                key={card.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className={`rounded-2xl p-5 border ${c.border} ${c.bg} space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-sora font-bold text-base ${c.text}`}>{card.phase}</span>
                  <span className={`font-mono text-[10px] ${c.text} opacity-70`}>{card.steps}</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
