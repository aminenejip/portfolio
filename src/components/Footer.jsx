import { Github, Linkedin as LinkedinIcon } from "lucide-react";
import { profile, navLinks, social } from "../data/portfolio.js";

/**
 * Footer — copyright, quick links, social icons. Real links only
 * (placeholders stay hidden until filled in portfolio.js).
 */

const isSafeUrl = (v) => typeof v === "string" && /^(https?:\/\/)/i.test(v.trim());

export default function Footer() {
  const year = new Date().getFullYear();
  const github = isSafeUrl(social.github) ? social.github.trim() : null;
  const linkedIn = isSafeUrl(social.linkedin) ? social.linkedin.trim() : null;
  const socials = [
    github && { key: "github", href: github, label: "GitHub profile", Icon: Github },
    linkedIn && { key: "linkedin", href: linkedIn, label: "LinkedIn profile", Icon: LinkedinIcon },
  ].filter(Boolean);

  return (
    <footer className="border-t border-borderline bg-surface/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 text-center sm:px-8 md:grid-cols-[1fr_auto_1fr] md:items-center md:text-left">
        {/* Brand */}
        <div className="md:justify-self-start">
          <a href="#home" className="inline-flex items-center gap-2.5" aria-label={`${profile.initials} ${profile.name}, back to top`}>
            <span className="grid size-9 place-items-center rounded-xl bg-accent text-sm font-bold text-accent-fg">
              {profile.initials}
            </span>
            <span className="text-sm font-semibold text-content">{profile.name}</span>
          </a>
          <p className="mt-2 text-xs text-muted">
            {profile.location} · {profile.shortRole}
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-content"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        {socials.length > 0 && (
          <ul className="flex items-center justify-center gap-3 md:justify-self-end" role="list" aria-label="Social profiles">
            {socials.map(({ key, href, label, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-xl border border-borderline bg-surface text-muted transition-colors hover:bg-surface-2 hover:text-content"
                >
                  <Icon size={18} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-borderline/70">
        <p className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-muted sm:px-8">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
