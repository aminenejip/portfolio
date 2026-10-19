import { Cloud, LayoutTemplate, Network, Server, Sparkles, BookOpen } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { profile, skillGroups, currentlyLearning, sectionCopy } from "../data/portfolio.js";

/** icon key -> lucide component (edit skillGroups.icon in portfolio.js to remap) */
const ICONS = {
  layout: LayoutTemplate,
  server: Server,
  cloud: Cloud,
  network: Network,
};

export default function About() {
  const { kicker, title, subtitle } = sectionCopy.about;

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24 lg:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-link">{kicker}</p>
          <h2 id="about-title" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>

        {/* Intro paragraph */}
        <Reveal delay={0.06}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.aboutParagraph}
          </p>
        </Reveal>

        {/* 4 skill-group cards */}
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" role="list">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Sparkles;
            const hasSkills = group.items.length > 0;

            return (
              <Reveal as="li" key={group.id} delay={0.08 + i * 0.06}>
                <div className="card interactive-lift h-full p-5 sm:p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-content">{group.title}</h3>

                  {hasSkills ? (
                    <>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{group.line}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-content"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    /* Empty state while the real skill lists aren't filled in yet */
                    <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-muted">
                      <BookOpen size={15} className="mt-0.5 shrink-0 opacity-60" aria-hidden />
                      <span>
                        {group.line}
                        <br />
                        <span className="text-xs opacity-80">
                          [TODO: fill <code className="whitespace-nowrap">items</code> in{" "}
                          <code className="whitespace-nowrap">src/data/portfolio.js</code>]
                        </span>
                      </span>
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>

        {/* Currently learning chip row */}
        <Reveal delay={0.1} className="mt-10">
          <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <p className="flex shrink-0 items-center gap-2 text-sm font-semibold text-content sm:text-base">
              <Sparkles size={18} className="text-accent" aria-hidden />
              Currently learning
            </p>
            <ul className="flex flex-wrap gap-2" role="list">
              {currentlyLearning.length > 0 ? (
                currentlyLearning.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-dashed border-accent/50 bg-accent-soft px-3.5 py-1.5 text-xs font-semibold text-accent sm:text-sm"
                  >
                    {topic}
                  </li>
                ))
              ) : (
                <li className="rounded-full border border-dashed border-borderline px-3.5 py-1.5 text-xs text-muted sm:text-sm">
                  [TODO: add your real topics to <code>currentlyLearning</code> in{" "}
                  <code>src/data/portfolio.js</code>]
                </li>
              )}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
