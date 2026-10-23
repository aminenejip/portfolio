/**
 * scripts/set-topic.mjs — dev helper: writes topics to your repo via the API
 * (needs a token with Administration:write; fetch-github only READS).
 *   usage: node scripts/set-topic.mjs <owner/repo> <topic> [topic2 ...]
 * e.g.:  node scripts/set-topic.mjs aminenejip/portfolio portfolio
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

async function token() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  try {
    const raw = await readFile(join(ROOT, ".env.local"), "utf8");
    const m = raw.match(/^\s*GH_TOKEN\s*=\s*("?)([^\s"]+)\1\s*$/m);
    if (m) return m[2].trim();
  } catch {
    /* absent */
  }
  return null;
}

const [repo, ...topics] = process.argv.slice(2);
if (!repo || topics.length === 0) {
  console.error("usage: node scripts/set-topic.mjs <owner/repo> <topic> [more...]");
  process.exit(1);
}
const t = await token();
if (!t) {
  console.error("no GH_TOKEN (env or .env.local)");
  process.exit(1);
}

const res = await fetch(`https://api.github.com/repos/${repo}/topics`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${t}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "amine-neji-portfolio",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ names: topics.map((s) => s.toLowerCase()) }),
});
console.log(`PUT /repos/${repo}/topics → ${res.status} ${res.statusText}`);
if (res.status === 403 || res.status === 404) {
  console.error("→ the token needs 'Administration: Read and write' for this repo.");
}
