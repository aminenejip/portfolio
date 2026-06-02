import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0-4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
import { useInView } from '../hooks/useInView'
import { sendContactForm } from '../config/emailjs'

export default function Contact() {
  const [ref, inView] = useInView(0.1)
  const [form, setForm] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.from_name || !form.from_email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setSending(true)
    try {
      await sendContactForm(e.target)
      setSubmitted(true)
      setForm({ from_name: '', from_email: '', subject: '', message: '' })
    } catch (err) {
      if (err.status === 429) {
        setError('Too many requests. Please wait a moment before trying again.')
      } else {
        setError('Something went wrong. Please try again later.')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative section-spacing z-10">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
            — Get In Touch
          </span>
          <h2 className="font-sora font-extrabold text-4xl md:text-5xl text-on-surface">
            Let's build the future.
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Currently available for freelance opportunities and full-time engineering roles.
            Whether you have a project or just want to chat tech, my inbox is open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />

              <p className="text-muted leading-relaxed">
                I respond within 24 hours. Let's discuss your project, a collaboration, or
                just connect about technology.
              </p>

            {/* Contact cards */}
            <div className="space-y-4">
              <a
                href="mailto:aminenejip@gmail.com"
                className="glass-card contact-card flex items-center hover:border-primary/40 group transition-all premium-border block"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="contact-card-label block font-mono text-[9px] uppercase tracking-widest mb-1">Email</span>
                  <span className="contact-card-value text-sm font-medium">aminenejip@gmail.com</span>
                </div>
              </a>

              <a
                href="#"
                className="glass-card contact-card flex items-center hover:border-secondary/40 group transition-all premium-border block"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shrink-0">
                  <LinkedinIcon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="contact-card-label block font-mono text-[9px] uppercase tracking-widest mb-1">LinkedIn</span>
                  <span className="contact-card-value text-sm font-medium">linkedin.com/in/amine-neji</span>
                </div>
              </a>
            </div>

            {/* Availability */}
            <div className="glass-card rounded-2xl p-5 border border-green-500/15 bg-green-500/5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="font-mono text-xs text-green-400 uppercase tracking-widest">
                  Available for hire
                </span>
              </div>
              <p className="text-on-surface-variant text-sm mt-3 leading-relaxed">
                Open to full-time positions, freelance projects, and interesting collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="glass-card rounded-[2rem] p-12 premium-border text-center space-y-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-2xl text-on-surface">Message Sent!</h3>
                  <p className="text-muted mt-2">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="ghost-btn px-6 py-3 rounded-xl text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card p-8 md:p-10 rounded-[2rem] space-y-6 premium-border shadow-2xl"
              >
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-outline uppercase tracking-widest pl-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      value={form.from_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3.5 text-on-surface placeholder:text-muted/60 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-outline uppercase tracking-widest pl-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      value={form.from_email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3.5 text-on-surface placeholder:text-muted/60 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="font-mono text-[10px] text-outline uppercase tracking-widest pl-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project Collaboration"
                      required
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3.5 text-on-surface placeholder:text-muted/60 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-outline uppercase tracking-widest pl-1">
                    Project Details
                  </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or how I can help..."
                      required
                      rows={5}
                      className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3.5 text-on-surface placeholder:text-muted/60 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                    />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="primary-btn w-full py-4 rounded-xl font-sora font-bold text-base gap-2 disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Initialize Contact
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
