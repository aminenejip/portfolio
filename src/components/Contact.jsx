import { Github, Linkedin as LinkedinIcon, Mail, MapPin, MoveUpRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { profile, social, sectionCopy } from "../data/portfolio.js";

/**
 * Contact — big headline, short honest text, email button that opens a
 * Gmail compose window directly (per Amine's choice: no Web3Forms key,
 * no form). Social icon row: real links only — placeholder LinkedIn stays
 * hidden until a real URL is filled in portfolio.js.
 */

const isSafeUrl = (v) => typeof v === "string" && /^(https?:\/\/)/i.test(v.trim());
const isRealEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const { kicker, title, subtitle } = sectionCopy.contact;
  const hasEmail = isRealEmail(profile.email) && !(profile.email ?? "").startsWith("[");
  const linkedIn = isSafeUrl(social.linkedin) ? social.linkedin.trim() : null;
  const github = isSafeUrl(social.github) ? social.github.trim() : null;

  /* Opens the Gmail web compose window directly (no mail client config needed) */
  const gmailComposeUrl = hasEmail
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`
    : null;

  return (
    <section id="contact" className="gradient-bg py-20 sm:py-24 lg:py-28" aria-labelledby="contact-title">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="kicker text-link">{kicker}</p>
          <h2 id="contact-title" className="heading-section mt-2 text-[clamp(2.25rem,4.5vw,3.75rem)]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>

        {/* Email — Gmail compose directly */}
        {hasEmail ? (
          <Reveal delay={0.08}>
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2.5 rounded-[20px] bg-accent px-7 py-4 text-base font-semibold text-accent-fg shadow-card transition-colors hover:bg-accent-hover sm:text-lg"
            >
              <Mail size={20} aria-hidden />
              Email me on Gmail
              <MoveUpRight size={16} aria-hidden />
            </a>
            <p className="mt-4 text-sm text-muted">
              {profile.location} ·{" "}
              <a
                href={`mailto:${profile.email}`}
                className="font-medium text-link underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.08}>
            <p className="mt-8 rounded-2xl border border-dashed border-borderline bg-surface px-5 py-4 text-sm text-muted">
              [TODO: add a real email to <code>profile.email</code> in{" "}
              <code>src/data/portfolio.js</code> — the button shows up automatically]
            </p>
          </Reveal>
        )}

        {/* Social icon row — real links only */}
        <Reveal delay={0.14}>
          <ul className="mt-10 flex items-center justify-center gap-3" role="list" aria-label="Social profiles">
            {github && (
              <li>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="grid size-12 place-items-center rounded-2xl border border-borderline bg-surface text-content shadow-card transition-colors hover:bg-surface-2"
                >
                  <Github size={20} aria-hidden />
                </a>
              </li>
            )}
            {linkedIn && (
              <li>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="grid size-12 place-items-center rounded-2xl border border-borderline bg-surface text-content shadow-card transition-colors hover:bg-surface-2"
                >
                  <LinkedinIcon size={20} aria-hidden />
                </a>
              </li>
            )}
          </ul>
          {!github && !linkedIn && (
            <p className="mt-10 text-sm text-muted">
              [TODO: social links appear once <code>social</code> URLs are filled in{" "}
              <code>src/data/portfolio.js</code>]
            </p>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-12 flex items-center justify-center gap-1.5 text-xs text-muted">
            <MapPin size={13} aria-hidden />
            Based in Tunis, Tunisia — open to remote work worldwide.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
