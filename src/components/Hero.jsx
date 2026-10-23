import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, GraduationCap, MapPin } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { profile, stats } from "../data/portfolio.js";
import projectsData from "../data/github-projects.json";

/**
 * Hero — huge h1, honest copy, real stats, portrait card.
 *
 * Portrait resolution order:
 *   1. src/assets/profile-photo.{jpg,jpeg,png,webp}  (picked up by import.meta.glob)
 *   2. profile.photo from portfolio.js (an existing /public path with extension)
 * If neither resolves, a clearly-marked initials tile is shown — never a broken image.
 *
 * NOTE: no CV/download button — intentionally disabled at Amine's request.
 */

const photoModules = import.meta.glob("../assets/profile-photo.{jpg,jpeg,png,webp}", {
  import: "default",
  eager: true,
});
const bundledPhoto = Object.values(photoModules).at(0) ?? null;

/* Optional /public path (e.g. "/assets/photo-profile.jpg") */
const isRealPath = (v) =>
  typeof v === "string" && v.startsWith("/") && !v.includes("[TODO");
const publicPhoto = isRealPath(profile.photo) ? profile.photo : null;

const featuredCount = Array.isArray(projectsData)
  ? projectsData.filter((p) => !p.private).length
  : 0;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [photoError, setPhotoError] = useState(false);
  /* reset the fallback state whenever the resolved source changes */
  useEffect(() => setPhotoError(false), [bundledPhoto, publicPhoto]);
  const photoSrc = photoError ? null : (bundledPhoto ?? publicPhoto);

  const statValues = {
    "github-count": featuredCount,
  };

  return (
    <section id="home" className="gradient-bg relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-36">
        {/* ------------------------------- Text column */}
        <div>
          {/* Location + status line */}
          <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted" y={12}>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} className="text-accent" aria-hidden />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap size={16} className="text-accent" aria-hidden />
              Master&apos;s student in Networking &amp; Cloud Computing
            </span>
          </Reveal>

          {/* h1 — must read exactly "Amine Neji, Full-Stack Developer" */}
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0.3 } : { duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-balance display-hero text-[clamp(2.5rem,7vw,4.75rem)]"
          >
            {profile.name},{" "}
            <span className="mark-t">Full-Stack</span>{" "}
            <span className="mark-t">Developer</span>
          </motion.h1>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.heroParagraph}
            </p>
          </Reveal>

          {/* Actions — CV download intentionally not offered */}
          <Reveal delay={0.14} className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-[20px] bg-accent px-7 py-3.5 text-sm font-semibold text-accent-fg shadow-card transition-colors hover:bg-accent-hover sm:text-base"
            >
              Explore My Work
              <ArrowDown size={18} aria-hidden />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[20px] border border-card-border bg-surface px-7 py-3.5 text-sm font-semibold text-content shadow-card backdrop-blur-md transition-colors hover:bg-[rgba(0,186,167,0.22)] sm:text-base"
            >
              Let&apos;s Connect
            </a>
          </Reveal>

          {/* Open to chips */}
          <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-2">
            {profile.openTo.map((role) => (
              <span
                key={role}
                className="rounded-full border border-borderline bg-surface px-3 py-1 text-xs font-medium text-muted"
              >
                {role}
              </span>
            ))}
          </Reveal>

          {/* Stats — real numbers only */}
          <Reveal delay={0.26}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="card flex flex-col gap-1 px-3.5 py-3.5 sm:px-5 sm:py-4"
                >
                  <dd className="text-2xl font-bold leading-none text-content sm:text-3xl">
                    {stat.source === "github-count"
                      ? statValues[stat.source]
                      : stat.value}
                    {stat.suffix ?? ""}
                  </dd>
                  <dt className="text-[11px] font-medium leading-snug text-muted sm:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ------------------------------- Portrait column */}
        <Reveal delay={0.18} className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <div className="relative rounded-3xl bg-accent-soft p-2 shadow-card">
            {photoSrc ? (
              <img
                src={photoSrc}
                alt={`Portrait of ${profile.name}, ${profile.shortRole}`}
                width={800}
                height={1000}
                fetchPriority="high"
                decoding="async"
                onError={() => setPhotoError(true)}
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
            ) : (
              /* TODO [PROJECT SCREENSHOT equivalent] — styled initials tile until
                 profile-photo.{jpg,jpeg,png,webp} is dropped into src/assets/ */
              <div
                role="img"
                aria-label={`Portrait placeholder for ${profile.name}`}
                className="grid aspect-[4/5] w-full place-items-center rounded-2xl border border-borderline bg-surface-2"
              >
                <div className="text-center">
                  <span className="text-6xl font-black tracking-tight text-accent sm:text-7xl">
                    {profile.initials}
                  </span>
                  <p className="mx-auto mt-3 max-w-[12rem] text-[11px] leading-snug text-muted">
                    [PLACEHOLDER PHOTO] — add <code>src/assets/profile-photo.jpg</code> and it
                    appears here automatically
                  </p>
                </div>
              </div>
            )}

            {/* Floating badge */}
            <div className="card absolute -bottom-5 left-4 flex items-center gap-2.5 px-4 py-3 sm:-left-5">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-hl-deep opacity-60 motion-reduce:hidden [animation-duration:1.6s]" />
                <span className="relative inline-flex size-2.5 rounded-full bg-hl-deep" />
              </span>
              <span className="text-xs font-semibold text-content sm:text-sm">
                {profile.availabilityBadge}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
