/**
 * scripts/list-repos.mjs — dev helper: prints your owned repos exactly as
 * scripts/fetch-github.mjs sees them (topics included), so you can verify
 * which repo is missing the "portfolio" topic before running a build.
 *   usage: node scripts/list-repos.mjs      (reads GH_TOKEN from env or .env.local)
 */
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import https from "node:https";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.github.com";

const jsonHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "amine-neji-portfolio",
});

function request(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      { hostname: u.hostname, path: u.pathname + u.search, method: "GET", headers, timeout: 20_000 },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({ status: res.statusCode, statusText: res.statusMessage || "", body: Buffer.concat(chunks) }),
        );
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout after 20s")));
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  let token = process.env.GH_TOKEN;
  if (!token) {
    try {
      const raw = await readFile(join(ROOT, ".env.local"), "utf8");
      const m = raw.match(/^\s*GH_TOKEN\s*=\s*("?)([^\s"]+)\1\s*$/m);
      if (m) token = m[2].trim();
    } catch {
      /* absent */
    }
  }
  if (!token) {
    console.error("[list-repos] no GH_TOKEN (env or .env.local)");
    process.exit(0);
  }

  const all = [];
  for (let page = 1; page <= 10; page++) {
    const r = await request(
      `${API}/user/repos?per_page=100&page=${page}&affiliation=owner`,
      jsonHeaders(token),
    );
    if (r.status >= 300) {
      console.error(`[list-repos] API error ${r.status} ${r.statusText}`);
      process.exit(0);
    }
    const batch = JSON.parse(r.body.toString("utf8"));
    all.push(...batch);
    if (batch.length < 100) break;
  }

  console.log(`owned repos: ${all.length}\n`);
  for (const r of all) {
    const flag = r.fork ? " [fork]" : r.archived ? " [archived]" : "";
    const has = (r.topics ?? []).includes("portfolio") ? "✓ HAS portfolio topic" : "✗ missing topic";
    console.log(`  ${r.name}${flag} — ${has}`);
    console.log(`      topics: ${(r.topics ?? []).join(", ") || "(none)"}`);
  }
}

main().then(() => process.exit(0));
