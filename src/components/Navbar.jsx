import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import { navLinks, profile } from "../data/portfolio.js";

/**
 * Fixed, centered pill navbar.
 * Centering is done with `inset-x-0` + `mx-auto` (never translate-x).
 * Mobile: hamburger with animated open/close panel.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu on Escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const common = reduceMotion ? { duration: 0 } : undefined;

  return (
    <header className="fixed inset-x-0 top-3 z-50 sm:top-4">
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex w-[calc(100%-1.5rem)] max-w-3xl items-center justify-between gap-2 rounded-2xl border px-3 py-2 backdrop-blur-md transition-colors sm:px-4 ${
          scrolled || open
            ? "border-borderline bg-surface/90 shadow-card"
            : "border-transparent bg-surface/60"
        }`}
      >
        {/* Logo / initials */}
        <a
          href="#home"
          className="flex items-center gap-2.5"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-sm font-bold text-white">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-semibold lg:block">
            {profile.name}
          </span>
        </a>

        {/* Desktop anchor links — real <a href="#id"> */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-content"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + CTA + hamburger */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <a
            href="#contact"
            className="hidden items-center gap-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover md:inline-flex"
          >
            Let&apos;s Connect
            <ArrowUpRight size={16} aria-hidden />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-xl border border-borderline bg-surface text-content transition-colors hover:bg-surface-2 md:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, scaleY: 0.96 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scaleY: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut", ...common }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto mt-2 w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-2xl border border-borderline bg-surface/95 p-2 shadow-card backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-content transition-colors hover:bg-surface-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-1 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Let&apos;s Connect
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
