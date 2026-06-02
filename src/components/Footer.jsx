import { motion } from 'framer-motion'
import { FileText, Heart } from 'lucide-react'

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const LinkedinIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
import { navLinks } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  const socials = [
    { label: 'GitHub', href: 'https://github.com/aminenejip', Icon: GithubIcon },
    { label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
    { label: 'Resume', href: '#', Icon: FileText },
  ]

  return (
    <footer className="relative z-10 border-t border-[var(--card-border)] bg-[var(--bg)] backdrop-blur-md">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <span className="font-sora font-extrabold text-xl text-on-surface">
              DevTerminal<span className="text-primary">.</span>
            </span>
            <p className="font-mono text-[10px] text-outline uppercase tracking-[0.2em]">
              Designed with Technological Elegance
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-end gap-4"
          >
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-outline hover:text-primary hover:border-primary/30 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
            © {year} Amine Neji — All rights reserved
          </p>
          <p className="font-mono text-[10px] text-muted flex items-center gap-1.5">
            Built with <Heart size={10} className="text-primary/70" /> React + Tailwind + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
