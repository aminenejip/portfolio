import { Award, BadgeCheck, GraduationCap, MoveUpRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { education, certifications, sectionCopy } from "../data/portfolio.js";

/**
 * Education & Certifications — two columns on desktop, stacked on mobile.
 * Left: vertical timeline (Master's "In progress" with animated dot, Bachelor's "Completed").
 * Right: certification cards. The "Verify" button renders ONLY for a real credential URL —
 * never for placeholders (no dead links, no claimed credentials).
 */

const isSafeUrl = (v) => typeof v === "string" && /^(https?:\/\/)/i.test(v.trim());

export default function EducationAndCertifications() {
  const { kicker, title, subtitle } = sectionCopy.education;
  const hasCerts = certifications.length > 0;
  const hasEducation = education.length > 0;

  return (
    <section id="education" className="py-20 sm:py-24 lg:py-28" aria-labelledby="education-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal className="max-w-2xl">
          <p className="kicker text-link">{kicker}</p>
          <h2 id="education-title" className="heading-section mt-2 text-[clamp(1.875rem,3.5vw,2.5rem)]">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          {/* ------------------------------------------------- Education timeline */}
          <Reveal delay={0.06}>
            <h3 className="flex items-center gap-2.5 text-xl font-semibold text-content">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-link">
                <GraduationCap size={19} aria-hidden />
              </span>
              Education
            </h3>

            {hasEducation ? (
              <ol className="relative mt-6 space-y-8 border-l-2 border-borderline pl-7 sm:pl-9">
                {education.map((item) => {
                  const inProgress = item.status === "in-progress";

                  return (
                    <li key={item.id} className="relative">
                      {/* animated dot for in-progress, solid dot for completed */}
                      {inProgress ? (
                        <span className="absolute -left-[36.5px] top-1 flex size-[13px] sm:-left-[43px]">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-hl-deep opacity-50 motion-reduce:hidden [animation-duration:1.8s]" />
                          <span className="relative inline-flex size-[13px] rounded-full bg-hl-deep ring-4 ring-bg" />
                        </span>
                      ) : (
                        <span className="absolute -left-[36.5px] top-1 inline-flex size-[13px] rounded-full border-2 border-hl-deep bg-surface ring-4 ring-bg sm:-left-[43px]" />
                      )}

                      <div className="card p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          {inProgress ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                              <span className="relative flex size-1.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-hl-deep opacity-60 motion-reduce:hidden [animation-duration:1.8s]" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-hl-deep" />
                              </span>
                              In progress
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted">
                              <BadgeCheck size={13} aria-hidden />
                              Completed
                            </span>
                          )}
                          <span className="text-xs font-medium text-muted">{item.years}</span>
                        </div>

                        <h4 className="mt-3 text-base font-semibold text-content sm:text-lg">
                          {item.degree}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-link">{item.university}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{item.focus}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="mt-6 text-sm text-muted">Education details coming soon.</p>
            )}
          </Reveal>

          {/* ------------------------------------------------- Certifications */}
          <Reveal delay={0.12}>
            <h3 className="flex items-center gap-2.5 text-xl font-semibold text-content">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-link">
                <Award size={19} aria-hidden />
              </span>
              Certifications
            </h3>

            {hasCerts ? (
              <ul className="mt-6 space-y-4" role="list">
                {certifications.map((cert) => {
                  const verifyUrl = isSafeUrl(cert.credentialUrl) ? cert.credentialUrl.trim() : null;

                  return (
                    <li key={cert.id} className="card p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                            {cert.issuer}
                          </p>
                          {/* exact course title — never shortened, certification never overclaimed */}
                          <h4 className="mt-1.5 text-base font-semibold text-content sm:text-lg">
                            {cert.title}
                          </h4>
                          <span className="mt-2 inline-block rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                            Completed {cert.date}
                          </span>
                        </div>
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-link">
                          <Award size={18} aria-hidden />
                        </span>
                      </div>

                      {verifyUrl && (
                        <a
                          href={verifyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-borderline bg-surface px-3.5 py-2 text-xs font-semibold text-content transition-colors hover:bg-surface-2"
                        >
                          Verify credential
                          <MoveUpRight size={13} aria-hidden />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-muted">Certifications coming soon.</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
