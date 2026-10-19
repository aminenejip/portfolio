/**
 * ============================================================
 *  SINGLE SOURCE OF TRUTH — all static portfolio content.
 *  Components must only read from this file (plus
 *  src/data/github-projects.json, which is generated at build time).
 *
 *  HOW TO USE: replace every value marked like this —
 *      "[TODO: ...]"
 *  with the real information. Nothing here is invented; unknown
 *  facts stay placeholders until Amine provides them.
 * ============================================================
 */

/* ------------------------------------------------------------------
 * PROFILE
 * ------------------------------------------------------------------ */
export const profile = {
  name: "Amine Neji",
  initials: "AN",
  /** h1 must read exactly: "Amine Neji, Full-Stack Developer" */
  fullNameTitle: "Amine Neji, Full-Stack Developer",
  shortRole: "Full-Stack Developer",
  headline:
    "Full-Stack Developer | Master's student in Networking & Cloud Computing",
  location: "Tunis, Tunisia",
  openTo: ["Internship", "PFE", "Junior role", "Freelance", "Remote"],
  /** Hero / About copy — short and honest, no invented metrics. */
  heroParagraph:
    "Master's student in Networking & Cloud Computing with a Computer Science bachelor's degree, building full-stack web projects alongside my studies. Currently looking for my next opportunity.",
  aboutParagraph:
    "I am a Master's student in Networking and Cloud Computing, and I hold a Bachelor's degree in Computer Science. Understanding what happens under the hood — networks, servers, infrastructure — helps me build web applications that are not just functional, but solid. I complement that systems knowledge with day-to-day full-stack practice: turning ideas into working interfaces, APIs and deployments.",
  /** Email — provided by Amine. Contact buttons open a Gmail compose window directly. */
  email: "aminenejip@gmail.com",
  /** Portrait file (used by src/components/Hero.jsx).
   *  PREFERRED: drop the photo at  src/assets/profile-photo.jpg|jpeg|png|webp
   *             → bundled + optimized by Vite, auto-detected, no config.
   *  ALTERNATIVE: set photo to an existing /public path WITH extension, e.g. "/assets/photo-profile.jpg".
   *  If neither file exists yet, the hero shows the marked initials tile — never a broken image. */
  photo: null,
  /** Floating hero badge — real fact, edit any time. */
  availabilityBadge: "Open to internships & PFE",
};

/* ------------------------------------------------------------------
 * HERO STATS — only real numbers.
 *  - "Projects featured" is computed from github-projects.json at runtime (no hardcode).
 *  - Degrees: Master's (in progress) + Bachelor's (completed)      -> 2
 *  - Open to roles listed above                                    -> 5
 * ------------------------------------------------------------------ */
export const stats = [
  { id: "projects", label: "Featured projects", source: "github-count" },
  { id: "degrees", label: "Degrees (BSc done + MSc running)", value: 2 },
  { id: "open-to", label: "Opportunity types I'm open to", value: 5 },
];

/* ------------------------------------------------------------------
 * SKILLS — real skills only. Fill the `items` arrays; while an array
 * is empty the UI shows a discreet "to be filled" state.
 * ------------------------------------------------------------------ */
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout", // key -> see components/About.jsx icon map
    line: "[TODO: one short sentence about your frontend focus]",
    items: [], // TODO: e.g. ["React", "Tailwind CSS", "JavaScript"]
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    line: "[TODO: one short sentence about your backend focus]",
    items: [], // TODO: real backend skills only
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    line: "[TODO: one short sentence about your cloud focus]",
    items: [], // TODO: real cloud/DevOps skills only
  },
  {
    id: "networking",
    title: "Networking",
    icon: "network",
    line: "[TODO: one short sentence about your networking focus]",
    items: [], // TODO: real networking skills only (e.g. subetting, VLANs, routing)
  },
];

/** "Currently learning" — real items only. */
export const currentlyLearning = []; // TODO: only what you actually study right now

/* ------------------------------------------------------------------
 * EDUCATION — vertical timeline.
 * ------------------------------------------------------------------ */
export const education = [
  {
    id: "master",
    degree: "Master's in Networking and Cloud Computing",
    university: "[TODO: university name]",
    years: "[TODO: start year] – [TODO: expected graduation year]",
    status: "in-progress", // renders "In progress" + animated dot
    focus: "[TODO: one line on focus areas, e.g. what you actually study]",
  },
  {
    id: "bachelor",
    degree: "Bachelor's degree (Licence) in Computer Science",
    university: "[TODO: university name]",
    years: "[TODO: graduation year]",
    status: "completed",
    focus: "[TODO: one line on focus areas]",
  },
];

/* ------------------------------------------------------------------
 * CERTIFICATIONS — exact course/credential names, never invented ones.
 * IMPORTANT: CCNA 1 is a *course*, not the CCNA certification — always
 * keep the full course title, never shorten it to "CCNA" or claim the
 * certification exam was passed.
 * ------------------------------------------------------------------ */
export const certifications = [
  {
    id: "ccna1",
    issuer: "Cisco Networking Academy",
    title: "CCNA 1: Introduction to Networks",
    date: "[TODO: completion year]",
    /** Leave "" to hide the Verify button. Only add a real credential URL here. */
    credentialUrl: "",
  },
];

/**
 * EXPERIENCE — none published yet. Leave empty; the site must not
 * invent positions, employers or dates.
 */
export const experience = [];

/* ------------------------------------------------------------------
 * SOCIAL LINKS (components hide links whose value is "" / a TODO marker)
 * ------------------------------------------------------------------ */
export const social = {
  github: "https://github.com/aminenejip",
  /** TODO [PLACEHOLDER]: full LinkedIn profile URL */
  linkedin: "[TODO: https://www.linkedin.com/in/your-handle]",
  /** reuses profile.email */
};

/* ------------------------------------------------------------------
 * NAVIGATION (anchor ids must match the rendered sections)
 * ------------------------------------------------------------------ */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------
 * SECTION COPY — titles & subtitles for consistency across views
 * ------------------------------------------------------------------ */
export const sectionCopy = {
  projects: {
    kicker: "Featured Work",
    title: "Selected projects",
    subtitle:
      "Live project data is pulled from my GitHub profile at build time — repos tagged “portfolio”. Descriptions and metadata are real and always up to date.",
  },
  about: {
    kicker: "About",
    title: "Systems thinking, applied to the web",
    subtitle: "Master's student in Networking & Cloud Computing — building full-stack web applications.",
  },
  education: {
    kicker: "Education & Certifications",
    title: "Degrees and certified coursework",
    subtitle: "Formal computer science training, ongoing networking & cloud specialization.",
  },
  contact: {
    kicker: "Contact",
    title: "Let's connect",
    subtitle:
      "Internship, PFE, junior role, freelance project or a question — my inbox is always open.",
  },
};

/** TODO [PLACEHOLDER]: final deployed site URL — used by the SEO step (sitemap, canonical) */
export const site = {
  url: "https://amineneji-portfolio.example.com",
};

/* ------------------------------------------------------------------
 * PROJECT FILTER CHIPS — topics are mapped to 3 categories (All/Web/Cloud/Networking).
 * A project can appear in several categories if several of its topics match.
 * Extend freely — real GitHub topics only.
 * ------------------------------------------------------------------ */
export const topicFilters = [
  {
    key: "all",
    label: "All",
    topics: "*", // matches everything
  },
  {
    key: "web",
    label: "Web",
    topics: [
      "web", "website", "webapp", "web-app", "web-application", "frontend",
      "react", "reactjs", "vue", "angular", "nextjs", "svelte", "html", "css",
      "javascript", "typescript", "redux", "vite", "tailwind", "tailwindcss",
      "portfolio", "web-development",
    ],
  },
  {
    key: "cloud",
    label: "Cloud",
    topics: [
      "cloud", "devops", "docker", "kubernetes", "k8s", "aws", "azure", "gcp",
      "ci-cd", "github-actions", "terraform", "deployment", "serverless",
      "cloud-computing",
    ],
  },
  {
    key: "networking",
    label: "Networking",
    topics: [
      "networking", "network", "tcp", "dns", "subnetting", "vlan", "routing",
      "firewall", "cisco", "packettracer", "packet-tracer", "ccna",
    ],
  },
];
