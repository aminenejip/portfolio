import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/portfolio'

const colorMap = {
  primary: {
    text: 'text-primary',
    border: 'border-primary/30',
    bg: 'bg-primary/10',
    dot: 'bg-primary',
  },
  secondary: {
    text: 'text-secondary',
    border: 'border-secondary/30',
    bg: 'bg-secondary/10',
    dot: 'bg-secondary',
  },
  tertiary: {
    text: 'text-tertiary',
    border: 'border-tertiary/30',
    bg: 'bg-tertiary/10',
    dot: 'bg-tertiary',
  },
}

export default function Skills() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="skills" className="relative section-padding z-10">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
            — Technical Skills
          </span>
          <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-white">
            My Toolkit
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Technologies and tools I use to build modern, performant applications.
          </p>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => {
            const c = colorMap[skill.color]
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 premium-border flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                  <h3 className={`font-mono text-xs uppercase tracking-wider font-semibold ${c.text}`}>
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span
                      key={item}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${c.bg} ${c.border} ${c.text} tracking-wide`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 overflow-hidden"
        >
          <div className="flex gap-3 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070d1f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070d1f] to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="flex gap-3 shrink-0"
            >
              {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((item, idx) => (
                <span key={idx} className="tech-chip shrink-0">{item}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
