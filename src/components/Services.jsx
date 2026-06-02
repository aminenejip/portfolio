import { motion } from 'framer-motion'
import { Monitor, LayoutDashboard, Plug, Smartphone, Database, Shield } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { services } from '../data/portfolio'

const iconComponents = { Monitor, LayoutDashboard, Plug, Smartphone, Database, Shield }

const colorMap = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary/10',
    dot: 'bg-primary',
    border: 'border-primary/20',
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary/10',
    dot: 'bg-secondary',
    border: 'border-secondary/20',
  },
  tertiary: {
    text: 'text-tertiary',
    bg: 'bg-tertiary/10',
    dot: 'bg-tertiary',
    border: 'border-tertiary/20',
  },
}

export default function Services() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="services" className="relative section-padding z-10 bg-[rgba(7,13,31,0.5)]">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
            — What I Do
          </span>
          <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-white">
            Capabilities
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            I focus on delivering solutions that are technically sound and strategically valuable.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconComponents[service.icon]
            const c = colorMap[service.color]

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-3xl p-8 premium-border flex flex-col gap-6 group"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {Icon && <Icon size={22} className={c.text} />}
                </div>

                {/* Text */}
                <div className="space-y-3 flex-1">
                  <h4 className="font-sora font-bold text-xl text-white">{service.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Feature list */}
                <ul className="space-y-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 font-mono text-[10px] text-outline uppercase tracking-wider">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
