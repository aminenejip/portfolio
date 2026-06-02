import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
import { useInView } from '../hooks/useInView'
import { projects } from '../data/portfolio'

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group glass-card rounded-3xl overflow-hidden premium-border flex flex-col"
    >
      {/* Project visual header */}
      <div className={`h-52 relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        {/* Code-like pattern */}
        <div className="absolute inset-0 opacity-20 p-6 font-mono text-[11px] text-primary leading-5 overflow-hidden select-none">
          <p>{'// ' + project.title}</p>
          <p>{'const build = async () => {'}</p>
          <p className="pl-4">{'const result = await develop({'}</p>
          <p className="pl-8">stack: [{project.techs.map(t => `"${t}"`).join(', ')}],</p>
          <p className="pl-8">quality: "premium",</p>
          <p className="pl-4">{'});'}</p>
          <p>{'}'}</p>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--overlay-grad)] via-transparent to-transparent" />
        {/* Tech chips bottom */}
        <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
          {project.techs.map(t => (
            <span key={t} className="tech-chip bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-sora font-bold text-xl text-on-surface">{project.title}</h3>
          <div className="flex gap-2">
            <a
              href={project.github}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--card-border)] hover:bg-[var(--card-bg)] transition-colors text-muted hover:text-on-surface"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={14} />
            </a>
            <a
              href={project.live}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-colors text-on-surface-variant hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex items-center justify-between font-mono text-[10px] text-muted uppercase tracking-wider pt-2 border-t border-[var(--card-border)]">
          <span>{project.year}</span>
          <span className="text-primary">{project.label}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [headerRef, headerInView] = useInView(0.2)

  return (
    <section id="projects" className="relative section-padding z-10">
      {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-container-lowest/20 to-transparent pointer-events-none dark:via-surface-container-lowest/20" />

      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
              — Portfolio
            </span>
            <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-on-surface">
              Featured Works
            </h2>
            <p className="text-on-surface-variant max-w-xl leading-relaxed">
              Deep-dives into selected projects showcasing full-stack proficiency and
              engineering standards.
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            href="https://github.com/aminenejip"
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-btn px-6 py-3 rounded-xl flex items-center gap-2 text-sm shrink-0"
          >
            <GithubIcon size={15} /> Explore Repository
          </motion.a>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
