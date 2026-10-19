# Amine Neji — Portfolio

Personal portfolio of **Amine Neji**, Full-Stack Developer and Master's student in Networking & Cloud Computing (Tunis, Tunisia), open to internships, PFE projects, junior roles, freelance and remote work. It is a fast, accessible single-page site built with **Vite + React 19, Tailwind CSS v4, Motion and lucide-react**: a hero with real stats, skill groups, a projects grid that is **generated at build time from GitHub** (repos tagged `portfolio`, refreshed daily by a GitHub Actions workflow), an education & certifications timeline, and a direct Gmail contact link. **Live: [TODO: deployed URL]** · **CV: not published on request** · ![Portfolio](public/og-image.png)

## Local development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # also runs scripts/fetch-github.mjs (safely no-ops without GH_TOKEN)
```

Content lives in **`src/data/portfolio.js`** — fill every `[TODO]` marker there (email ✓, university names, years, LinkedIn URL, skills, currently-learning topics). Everything else (`src/data/github-projects.json`, `public/projects/…`) is generated — never edit by hand.

## How the GitHub pipeline works

1. Create a **fine-grained personal access token** — read-only:
   <https://github.com/settings/personal-access-tokens/new>
   - **Repository access:** *Only select repositories* (the ones you tag `portfolio`)
   - **Metadata:** Read-only (this is the single permission needed)
   - No code, no secrets, no write permissions. Optionally add **Contents: Read-only** if your repos contain `docs/screenshot.png` you want pulled automatically.
2. Add it as a repository / organization secret named **`GH_TOKEN`** — *Settings → Secrets and variables → Actions → New repository secret* (never commit it, never name it `VITE_…`: it must never reach the browser bundle).
3. Tag the projects you want to feature with the topic **`portfolio`** (*repo → About ⚙ → Topics*).
4. Each day (and on every push to `main`) the workflow **`.github/workflows/refresh-portfolio.yml`** runs `scripts/fetch-github.mjs`, commits refreshed data if it changed, and that commit triggers your redeploy.

Per-repo overrides (title, nicer description, display order, local screenshot path) go in a **`portfolio.json`** at the repo root:

```json
{ "title": "Better display name", "description": "One-liner", "order": 1, "screenshot": "/projects/my-shot.png" }
```

Private repos are treated strictly: only `portfolio.json` is read, the repo URL is never published, and no code/README is ever accessed — a demo can still be linked via the repo's homepage field.

> Screenshots: commit `docs/screenshot.webp` (or `.png`/`.jpg`) in the repo for an automatic image, or set `screenshot` in the override file. The script stores files as-is (`.webp` recommended).

## Getting deployed (one-time TODOs)

- Replace `https://amineneji-portfolio.example.com` (canonical, OG tags, `robots.txt`, `sitemap.xml`) with your real domain.
- Drop your portrait at `src/assets/profile-photo.jpg|png|webp`.
- Create the `GH_TOKEN` secret, tag repos with `portfolio` — data refreshes automatically afterwards.
