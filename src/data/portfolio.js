/**
 * ============================================================
 *  SINGLE SOURCE OF TRUTH — all static portfolio content.
 *  Components must only read from this file (plus
 *  src/data/github-projects.json, which is generated at build time).
 *
 *  Remaining "[TODO: ...]" markers = information that exists
 *  neither in the CV nor in the GitHub README (Master's university
 *  and years). Nothing else is invented.
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
  location: "Nabeul, Tunisia",
  openTo: ["Internship", "PFE", "Junior role", "Freelance", "Remote"],
  heroParagraph:
    "Master's student in Networking & Cloud Computing with a Computer Science bachelor's degree, building full-stack web projects alongside my studies. Currently looking for my next opportunity.",
  aboutParagraph:
    "I am a Master's student in Networking and Cloud Computing, and I hold a Bachelor's degree in Computer Science from the Faculty of Sciences of Sfax. Understanding what happens under the hood — networks, servers, infrastructure — helps me build web applications that are not just functional, but solid. I complement that systems knowledge with day-to-day full-stack practice: turning ideas into working interfaces, APIs and deployments.",
  email: "aminenejip@gmail.com",
  photo: "/photo_profile.png",
  availabilityBadge: "Open to internships & PFE",
};

/* ------------------------------------------------------------------
 * HERO STATS — only real numbers.
 * ------------------------------------------------------------------ */
export const stats = [
  { id: "projects", label: "Featured projects", source: "github-count" },
  { id: "degrees", label: "Degrees (BSc done + MSc running)", value: 2 },
  { id: "open-to", label: "Opportunity types I'm open to", value: 5 },
];

/* ------------------------------------------------------------------
 * SKILLS — taken from the CV and the GitHub README.
 * ------------------------------------------------------------------ */
export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    line: "Building responsive interfaces with React and Angular.",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Angular"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    line: "Server-side development and databases, from REST APIs to data modeling.",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "Python",
      "Java",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    line: "Version control today, containers and cloud infrastructure in progress.",
    items: ["Git", "GitHub"],
  },
  {
    id: "networking",
    title: "Networking",
    icon: "network",
    line: "Solid networking fundamentals through my Master's and Cisco coursework.",
    items: [
      "TCP/IP",
      "IP addressing",
      "VLAN fundamentals",
      "Switching",
      "Routing basics",
    ],
  },
];

/** "Currently learning" — from the GitHub README. */
export const currentlyLearning = [
  "Docker & containerization",
  "CCNA 200-301 preparation",
  "Linux & command-line tools",
  "Cloud computing & infrastructure",
  "Software architecture",
];

/* ------------------------------------------------------------------
 * EDUCATION — vertical timeline.
 * ------------------------------------------------------------------ */
export const education = [
  {
    id: "master",
    degree: "Master's in Networking and Cloud Computing",
    university: "Faculty of Sciences of Sfax",
    years: "2026 – 2028",
    status: "in-progress",
    focus: "Networking, cloud computing and infrastructure.",
  },
  {
    id: "bachelor",
    degree: "Licence in Computer Science",
    university: "Faculty of Sciences of Sfax",
    years: "2023 – 2026",
    status: "completed",
    focus:
      "Programming, data structures, algorithmic problem solving, databases, analysis and modeling.",
  },
   {
    id: "bachelor",
    degree: "Baccalauréat Informatique",
    university: "Lycée Béni Khiar , nabeul ,tunisia",
    years: "2022-2023",
    status: "completed",
    focus:
      "Programming, data structures, algorithmic problem solving, databases, analysis and modeling.",
  },
];

/* ------------------------------------------------------------------
 * CERTIFICATIONS — exact course/credential names.
 * CCNA 1 is a *course*, not the CCNA certification.
 * ------------------------------------------------------------------ */
export const certifications = [
  {
    id: "ccna1",
    issuer: "Cisco Networking Academy",
    title: "CCNA 1: Introduction to Networks",
    date: "2025",
    credentialUrl: "",
  },
  {
    id: "dart",
    issuer: "Udemy",
    title: "The Complete Dart Learning Guide",
    date: "2024",
    credentialUrl: "",
  },
];

/**
 * EXPERIENCE — from the CV.
 */
export const experience = [
  {
    id: "elite-council",
    role: "IT Intern",
    company: "Elite Council Consulting",
    period: "September – December 2024",
    description:
      "Took part in an accounting analysis project and worked with the basics of Angular, Figma, Node.js and MongoDB, using GitHub and IntelliJ.",
  },
];

/* ------------------------------------------------------------------
 * SOCIAL LINKS
 * ------------------------------------------------------------------ */
export const social = {
  github: "https://github.com/aminenejip",
  linkedin: "https://www.linkedin.com/in/neji-amine-521942300/",
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
 * SECTION COPY
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
    subtitle:
      "Master's student in Networking & Cloud Computing — building full-stack web applications.",
  },
  education: {
    kicker: "Education & Certifications",
    title: "Degrees and certified coursework",
    subtitle:
      "Formal computer science training, ongoing networking & cloud specialization.",
  },
  contact: {
    kicker: "Contact",
    title: "Let's connect",
    subtitle:
      "Internship, PFE, junior role, freelance project or a question — my inbox is always open.",
  },
};

/** Deployed site URL — used by the SEO step (sitemap, canonical) */
export const site = {
  url: "https://portfolio-phi-coral-99.vercel.app",
};

/* ------------------------------------------------------------------
 * PROJECT FILTER CHIPS
 * ------------------------------------------------------------------ */
export const topicFilters = [
  {
    key: "all",
    label: "All",
    topics: "*",
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