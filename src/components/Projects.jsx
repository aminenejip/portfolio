import { useState } from "react";
import { ExternalLink, Github, Lock, Star, FolderGit2, Code2 } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { sectionCopy, topicFilters, social } from "../data/portfolio.js";
import projectsData from "../data/github-projects.json";

/**
 * "Featured Work" — renders EXCLUSIVELY from src/data/github-projects.json
 * (generated at build time by scripts/fetch-github.mjs).
 *
 * Guarantees:
 *  - public repos:  "GitHub" link (html_url) + "Live Demo" only when homepage exists
 *  - private repos: "Private" badge — NO code/repo links; "Live Demo" only when a
 *                   homepage URL exists (the only externally verified data allowed)
 *  - no dead links: every URL is validated before rendering
 *  - empty/invalid JSON → friendly message, the page never crashes
 */

/** A link is rendered only for real, absolute http(s) URLs — everything else (empty,
 *  placeholder markers) is treated as "no link" so the page can't contain dead links. */
const isSafeUrl = (v) => typeof v === "string" && /^(https?:\/\/)/i.test(v.trim());

/** sorted copy: manual `order` asc → newest `updated_at` → name */
const getSortedProjects = () => {
  if (!Array.isArray(projectsData)) return [];
  const orderOf = (p) => (typeof p.order === "number" ? p.order : Number.MAX_SAFE_INTEGER);
  return [...projectsData].sort(
    (a, b) =>
      orderOf(a) - orderOf(b) ||
      String(b.updated_at ?? "").localeCompare(String(a.updated_at ?? "")) ||
      String(a.name ?? "").localeCompare(String(b.name ?? "")),
  );
};

const formatDate = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(d);
};

const topicsOf = (p) => (Array.isArray(p.topics) ? p.topics.map((t) => String(t).toLowerCase()) : []);

/** deterministic tile gradients from the accent palette (teal / lilac / amber / blue) */
const TILE_GRADIENTS = [
  ["#14b8a6", "#115e59"], // teal
  ["#a78bfa", "#6d28d9"], // lilac
  ["#fbbf24", "#b45309"], // amber
  ["#60a5fa", "#1e40af"], // blue
];
const gradientFor = (seed) => {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) % TILE_GRADIENTS.length;
  const [a, b] = TILE_GRADIENTS[h];
  return `linear-gradient(135deg, ${a}, ${b})`;
};

export default function Projects() {
  const [active, setActive] = useState("all");
  const { kicker, title, subtitle } = sectionCopy.projects;

  const allProjects = getSortedProjects();
  const hasAny = allProjects.length > 0;

  const visible = active === "all" ? allProjects : allProjects.filter((p) => matches(p, active));
  const countFor = (key) => (key === "all" ? allProjects.length : allProjects.filter((p) => matches(p, key)).length);

  function matches(project, key) {
    if (key === "all") return true;
    const filter = topicFilters.find((f) => f.key === key);
    if (!filter) return true;
    const topics = topicsOf(project);
    return filter.topics.some((t) => topics.includes(t));
  }

  return (
    <section id="projects" className="bg-surface-2/40 py-20 sm:py-24 lg:py-28" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal className="max-w-2xl">
          <p className="kicker text-link">{kicker}</p>
          <h2 id="projects-title" className="heading-section mt-2 text-[clamp(1.875rem,3.5vw,2.5rem)]">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>

        {/* Filter chips */}
        {hasAny && (
          <Reveal delay={0.06} className="mt-8 flex flex-wrap gap-2">
            {topicFilters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(f.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-fg"
                      : "border border-borderline bg-surface text-muted hover:bg-surface-2 hover:text-content"
                  }`}
                >
                  {f.label}
                  <span
                    className={`text-xs font-semibold ${isActive ? "text-accent-fg/80" : "text-muted/70"}`}
                  >
                    {countFor(f.key)}
                  </span>
                </button>
              );
            })}
          </Reveal>
        )}

        {/* Empty repo state — friendly, never a crash */}
        {!hasAny && (
          <Reveal delay={0.08} className="mt-10">
            <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent">
                <FolderGit2 size={26} aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-content">Featured projects coming soon</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                This section is generated at build time from my GitHub repositories. Any repo I tag
                with the <code className="rounded bg-surface-2 px-1.5 py-0.5">portfolio</code> topic
                will appear here automatically — with up-to-date descriptions, languages and dates.
              </p>
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-borderline bg-surface px-5 py-2.5 text-sm font-semibold text-content transition-colors hover:bg-surface-2"
              >
                <Github size={16} aria-hidden />
                See my GitHub profile
              </a>
            </div>
          </Reveal>
        )}

        {/* Filtered-empty state */}
        {hasAny && visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        )}

        {/* Cards grid */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {visible.map((project, i) => (
            <Reveal as="li" key={project.name} delay={Math.min(i * 0.05, 0.25)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const title = project.title || project.name;
  const topics = topicsOf(project);
  const stars = typeof project.stargazers_count === "number" ? project.stargazers_count : 0;
  const updated = formatDate(project.updated_at);

  const isPrivate = Boolean(project.private);
  const demoUrl = isSafeUrl(project.homepage) ? project.homepage.trim() : null;
  const repoUrl = isPrivate
    ? null /* private code is never linked */
    : isSafeUrl(project.html_url)
      ? project.html_url.trim()
      : null;

  const screenshot =
    project.screenshot && !String(project.screenshot).startsWith("[") ? project.screenshot : null;
  const showImg = screenshot && !imgError;

  return (
    <article className="card interactive-lift flex h-full flex-col overflow-hidden">
      {/* Media */}
      <div className="relative border-b border-borderline/70" style={showImg ? undefined : { background: gradientFor(title) }}>
        {showImg ? (
          <img
            src={screenshot}
            alt={`Screenshot of ${title}`}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="grid aspect-video w-full place-items-center" aria-hidden>
            <Code2 size={42} className="text-white/60" />
          </div>
        )}

        {isPrivate && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-borderline bg-surface/95 px-2.5 py-1 text-xs font-semibold text-content shadow-card backdrop-blur">
            <Lock size={12} aria-hidden />
            Private
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-content">
          {title}
          {isPrivate && <span className="ml-2 align-middle text-xs font-medium text-muted">(private source)</span>}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description || "No description provided yet."}
        </p>

        {/* Tags: language + first topics */}
        <ul className="mt-4 flex flex-wrap gap-1.5" role="list">
          {project.language && (
            <li className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
              <span className="size-2 rounded-full bg-accent" aria-hidden />
              {project.language}
            </li>
          )}
          {topics.slice(0, 4).map((t) => (
            <li key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
              {t}
            </li>
          ))}
          {topics.length > 4 && (
            <li className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
              +{topics.length - 4}
            </li>
          )}
        </ul>

        {/* Footer: meta + actions — no dead links by construction */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-borderline/70 pt-4">
          <p className="text-xs text-muted">
            {updated ? `Updated ${updated}` : ""}
            {stars > 0 && (
              <span className="ml-2 inline-flex items-center gap-1">
                <Star size={12} className="inline" aria-hidden />
                <span>{stars}</span>
              </span>
            )}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                <ExternalLink size={13} aria-hidden />
                Live Demo
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-borderline bg-surface px-3 py-2 text-xs font-semibold text-content transition-colors hover:bg-surface-2"
              >
                <Github size={13} aria-hidden />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
