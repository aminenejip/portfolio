/**
 * scripts/fetch-github.mjs — build-time GitHub data pipeline (Node 20+, zero dependencies).
 *
 *  1. Reads GH_TOKEN from process.env (Actions secret / shell env) or from the
 *     gitignored `.env.local` file at the project root — never from VITE_ vars,
 *     never imported in src/, never exposed to the client bundle.
 *  2. GET /user/repos?per_page=100&affiliation=owner (public + private), paginated.
 *  3. Keeps ONLY repos carrying the "portfolio" topic; skips forks and archived repos.
 *  4. Extracts name/description/language/topics/homepage/html_url/private/updated_at/stars.
 *  5. Optional per-repo overrides from `portfolio.json` at the repo root (title,
 *     description, order, screenshot).
 *     PRIVACY RULES for private repos: NOTHING is read except portfolio.json;
 *     html_url is NEVER emitted in the JSON; READMEs and code are never touched.
 *  6. docs/screenshot.{webp,png,jpg,jpeg} in a PUBLIC repo is downloaded to
 *     public/projects/<repo>.<same-ext>. (For automatic .webp serving, commit a
 *     docs/screenshot.webp — this script never re-encodes images, keeping zero deps.)
 *  7. Writes src/data/github-projects.json.
 *
 *  FAILURE POLICY: any API/network error → the existing JSON is kept untouched and
 *  the script exits 0, so `npm run build` never breaks because of GitHub.
 */
import { writeFile, mkdir, readFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import https from "node:https";
import { coverForEntry } from "./generate-covers.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_JSON = join(ROOT, "src", "data", "github-projects.json");
const OUT_IMG_DIR = join(ROOT, "public", "projects");
const REQUIRED_TOPIC = "portfolio";
const SHOT_NAMES = ["screenshot.webp", "screenshot.png", "screenshot.jpg", "screenshot.jpeg"];
const API = "https://api.github.com";

const log = (msg) => console.log(`[fetch-github] ${msg}`);
const warn = (msg) => console.warn(`[fetch-github] ${msg}`);

const jsonHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "amine-neji-portfolio",
});
const rawHeaders = (token, ref) => ({
  ...jsonHeaders(token),
  Accept: "application/vnd.github.raw",
  ...(ref ? { ref } : {}),
});

/**
 * Minimal GET over node:https (non-keep-alive: each socket is closed as soon
 * as its response ends, so nothing is left pending at process exit — avoids
 * the Windows libuv teardown assertion that global `fetch`/undici triggers).
 */
function request(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers,
        timeout: 20_000,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            statusText: res.statusMessage || "",
            body: Buffer.concat(chunks),
          }),
        );
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout after 20s")));
    req.on("error", reject);
    req.end();
  });
}

async function getJson(url, token) {
  const r = await request(url, jsonHeaders(token));
  if (r.status >= 300) {
    const err = new Error(`${r.status} ${r.statusText} — ${url}`);
    err.status = r.status;
    throw err;
  }
  return JSON.parse(r.body.toString("utf8"));
}

async function getRaw(url, token) {
  const r = await request(url, rawHeaders(token));
  if (r.status >= 300) {
    const err = new Error(`${r.status} ${r.statusText} — ${url}`);
    err.status = r.status;
    throw err;
  }
  return r.body;
}

/** fetch all owned repos, paginated */
async function fetchAllOwnedRepos(token) {
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await getJson(
      `${API}/user/repos?per_page=100&page=${page}&affiliation=owner`,
      token,
    );
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

/** per-repo portfolio.json overrides (works for public AND private repos) */
async function fetchOverrides(token, fullName, defaultBranch) {
  for (const [url, ref] of [
    [`${API}/repos/${fullName}/contents/portfolio.json`, null],
    [`${API}/repos/${fullName}/contents/portfolio.json`, defaultBranch],
  ]) {
    try {
      const text = await resText(url, token);
      if (text.trim().startsWith("{")) return JSON.parse(text);
    } catch {
      /* no overrides in this repo — fine */
    }
  }
  return null;
}

async function resText(url, token) {
  return (await getRaw(url, token)).toString("utf8");
}

/* download public-repo screenshot → public/projects/<repo>.<ext> */
const SHOT_EXT = { webp: "webp", png: "png", jpg: "jpg", jpeg: "jpeg" };
async function fetchScreenshot(token, fullName, repoName, defaultBranch) {
  const base = `${API}/repos/${fullName}/contents/docs/`;
  for (const name of SHOT_NAMES) {
    try {
      const blob = await getRaw(base + name, token);
      if (blob.length === 0) continue;
      const ext = SHOT_EXT[name.split(".").pop()];
      const file = join(OUT_IMG_DIR, `${repoName}.${ext}`);
      await mkdir(OUT_IMG_DIR, { recursive: true });
      await writeFile(file, Buffer.from(blob));
      log(`screenshot: ${repoName} → public/projects/${repoName}.${ext}`);
      return `/projects/${repoName}.${ext}`;
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

const isHttpUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v.trim());

/**
 * Reads a GH_TOKEN from ROOT/.env.local as a local-only convenience
 * (so you never have to paste the token into a chat or terminal history).
 * The file is gitignored and the value is never logged or written anywhere.
 */
async function readLocalToken() {
  try {
    const raw = await readFile(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*GH_TOKEN\s*=\s*("?)([^\s"]+)\1\s*$/);
      if (m) return m[2].trim();
    }
  } catch {
    /* file absent — fine */
  }
  return null;
}

async function main() {
  const token = process.env.GH_TOKEN || (await readLocalToken());
  if (!token) {
    warn('GH_TOKEN not set — keeping the existing github-projects.json. Add it via env var, .env.local (GH_TOKEN=...), or the Actions secret.');
    return 0; // deliberate exit 0: builds stay green without a token
  }

  let existing = [];
  try {
    existing = JSON.parse(await readFile(OUT_JSON, "utf8"));
    if (!Array.isArray(existing)) existing = [];
  } catch {
    existing = [];
  }

  /* ------------------------------------------------ fetch + filter */
  let repos;
  try {
    repos = await fetchAllOwnedRepos(token);
  } catch (err) {
    warn(`GitHub API unavailable (${err.message}) — keeping existing data.`);
    return 0;
  }

  /* ------------------------------------------------ explicit include list
     Repos named here are shown even without the "portfolio" topic
     (still owned by you — this only widens the topic filter). */
  let includeList = [];
  let stagedShots = {};
  try {
    const cfg = JSON.parse(await readFile(join(ROOT, "portfolio.config.json"), "utf8"));
    if (Array.isArray(cfg.include)) includeList = cfg.include.map((s) => String(s).trim().toLowerCase()).filter(Boolean);
    if (cfg.screenshotsFiles && typeof cfg.screenshotsFiles === "object") {
      for (const [k, v] of Object.entries(cfg.screenshotsFiles)) {
        if (typeof v === "string") stagedShots[k.trim().toLowerCase()] = v.trim();
      }
    }
  } catch {
    /* no portfolio.config.json — topic filter only */
  }

  const byTopic = (r) => !r.fork && !r.archived && Array.isArray(r.topics) && r.topics.includes(REQUIRED_TOPIC);
  const byInclude = (r) => includeList.includes(r.full_name.toLowerCase());
  const selected = repos.filter((r) => byTopic(r) || byInclude(r));
  log(`${selected.length} repo(s) tagged "${REQUIRED_TOPIC}" out of ${repos.length} owned.`);
  if (includeList.length) log(`(+ explicit include list from portfolio.config.json: ${includeList.join(", ")})`);

  /* ------------------------------------------------ build entries */
  const entries = [];
  for (const repo of selected) {
    const fullName = repo.full_name;
    const branch = repo.default_branch;
    const base = {
      name: repo.name,
      description: repo.description ?? null,
      language: repo.language ?? null,
      topics: Array.isArray(repo.topics) ? [...repo.topics] : [],
      homepage: isHttpUrl(repo.homepage) ? repo.homepage.trim() : null,
      private: Boolean(repo.private),
      /** private repos: html_url is deliberately NOT emitted */
      html_url: repo.private ? null : repo.html_url,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count ?? 0,
    };

    /* per-repo overrides from portfolio.json (the ONLY file allowed for private repos) */
    try {
      const overrides = await fetchOverrides(token, fullName, branch);
      if (overrides) {
        log(`portfolio.json: ${repo.name}`);
        if (typeof overrides.title === "string") base.title = overrides.title;
        if (typeof overrides.description === "string") base.description = overrides.description;
        if (typeof overrides.order === "number") base.order = overrides.order;
        if (typeof overrides.screenshot === "string" && overrides.screenshot.trim())
          base.screenshot = overrides.screenshot.trim();
      }
    } catch (err) {
      warn(`portfolio.json unreadable for ${repo.name}: ${err.message}`);
    }

    /* screenshots: public repos only (privacy rule — no repo content read for private) */
    if (!repo.private && !base.screenshot) {
      try {
        const shot = await fetchScreenshot(token, fullName, repo.name, branch);
        if (shot) base.screenshot = shot;
      } catch (err) {
        warn(`screenshot fetch failed for ${repo.name}: ${err.message}`);
      }
    }

    /* locally staged image (upload-to-github/) — a stand-in until the repo
       carries its own docs/screenshot, which takes priority above. */
    if (!base.screenshot) {
      const staged = stagedShots[fullName.toLowerCase()] ?? stagedShots[repo.name.toLowerCase()];
      if (staged) {
        try {
          const ext = staged.split(".").pop().toLowerCase();
          await copyFile(join(ROOT, staged), join(OUT_IMG_DIR, `${repo.name}.${ext}`));
          base.screenshot = `/projects/${repo.name}.${ext}`;
          log(`staged image: ${repo.name} ← ${staged}`);
        } catch {
          warn(`staged image missing for ${repo.name}: ${staged}`);
        }
      }
    }

    /* drop keys that are null/undefined so the diff stays clean */
    const cleaned = Object.fromEntries(
      Object.entries(base).filter(([, v]) => v !== null && v !== undefined),
    );
    entries.push(cleaned);
  }

  /* ------------------------------------------------ write out */
  /* decorative cover for entries with no real screenshot
     (priority: portfolio.json override > docs/screenshot.* > cover) */
  for (const entry of entries) {
    if (entry.screenshot) continue;
    try {
      entry.screenshot = await coverForEntry(entry);
      log(`cover: ${entry.name} → ${entry.screenshot}`);
    } catch (err) {
      warn(`cover generation failed for ${entry.name}: ${err.message}`);
    }
  }

  await mkdir(dirname(OUT_JSON), { recursive: true });
  await writeFile(OUT_JSON, JSON.stringify(entries, null, 2) + "\n");
  log(`✓ wrote ${entries.length} project(s) → ${OUT_JSON}`);
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    warn(`Unexpected error, keeping existing data: ${err.message}`);
    process.exit(0); // failure policy: never break the build
  });
