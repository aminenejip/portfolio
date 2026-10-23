/**
 * scripts/generate-covers.mjs — zero-dependency project cover generator.
 *
 * Draws a 1200×675 (16:9) designed cover for repos without a real
 * docs/screenshot: brand gradient + dot grid + big dot-matrix title.
 * Called from scripts/fetch-github.mjs (priority: portfolio.json override
 * > repo docs/screenshot > generated cover).
 *
 * CLI:  node scripts/generate-covers.mjs   (regenerates only OUR covers,
 *        tracked in public/projects/covers.json — never touches real shots)
 */
import zlib from "node:zlib";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "projects");
const REGISTRY = join(OUT_DIR, "covers.json");

/* ---------------- palette (matches src/components/Projects.jsx) ---------------- */
const PALETTES = [
  ["#14b8a6", "#115e59"], // teal
  ["#a78bfa", "#6d28d9"], // lilac
  ["#fbbf24", "#b45309"], // amber
  ["#60a5fa", "#1e40af"], // blue
];
const paletteFor = (seed) => {
  let h = 0;
  for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) % PALETTES.length;
  return PALETTES[h];
};

/* ---------------- 5×7 bitmap font ---------------- */
const F = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01110", "10000", "10000", "10111", "10001", "10001", "01110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "11001", "10101", "10011", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  2: ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
  3: ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  4: ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  5: ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  6: ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  9: ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  "-": ["00000", "00000", "00000", "01110", "00000", "00000", "00000"],
};
const GLYPH = (ch) => F[ch.toUpperCase()] ?? null;

/* ---------------- PNG primitives (same encoding as generate-og.mjs) ---------------- */
const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (bytes) => {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
function chunk(type, data) {
  const len = new Uint8Array(4);
  new DataView(len.buffer).setUint32(0, data.length);
  const typeAscii = Buffer.from(type, "ascii");
  const crcInput = Buffer.concat([typeAscii, data]);
  const crc = new Uint8Array(4);
  new DataView(crc.buffer).setUint32(0, crc32(crcInput));
  return Buffer.concat([len, typeAscii, data, crc]);
}
function encodePNG(raw, width, height) {
  const stride = width * 4;
  const flat = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    flat[y * (stride + 1)] = 0;
    raw.copy(flat, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, width);
  dv.setUint32(4, height);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(flat, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
/* break an overlong word at hyphens when possible, else mid-token */
const hardBreakWord = (w, maxChars) => {
  const parts = [];
  let cur = "";
  let lastHyphen = -1;
  for (let i = 0; i < w.length; i++) {
    cur += w[i];
    if (w[i] === "-") lastHyphen = cur.length - 1;
    if (cur.length >= maxChars && i < w.length - 1) {
      if (lastHyphen > 2) {
        parts.push(cur.slice(0, lastHyphen + 1));
        cur = cur.slice(lastHyphen + 1);
      } else {
        parts.push(cur);
        cur = "";
      }
      lastHyphen = -1;
    }
  }
  if (cur) parts.push(cur);
  return parts;
};
const wrapTitle = (title, maxChars) => {
  const words = String(title).toUpperCase().replace(/[^A-Z0-9\-\s]/g, " ").split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + (cur ? " " : "") + w).length <= maxChars) {
      cur = cur + (cur ? " " : "") + w;
    } else {
      if (cur) lines.push(cur);
      for (const p of hardBreakWord(w, maxChars)) lines.push(p);
      cur = "";
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
};

/**
 * Generate one cover PNG at `out`.
 * @param {{title: string, out: string, seed?: string}} opts
 */
export async function generateCover({ title, out, seed }) {
  const W = 1200;
  const H = 675;
  const [hexA, hexB] = paletteFor(seed ?? title);
  const A = hex(hexA);
  const B = hex(hexB);

  const px = Buffer.alloc(W * H * 4);
  const set = (x, y, r, g, b) => {
    const xi = Math.round(x);
    const yi = Math.round(y);
    if (xi < 0 || xi >= W || yi < 0 || yi >= H) return;
    const i = (yi * W + xi) * 4;
    px[i] = r;
    px[i + 1] = g;
    px[i + 2] = b;
    px[i + 3] = 255;
  };

  /* diagonal gradient + soft white highlight top-right */
  const hlX = W * 0.8;
  const hlY = H * 0.18;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = (x / W + y / H) / 2;
      let r = A[0] + (B[0] - A[0]) * t;
      let g = A[1] + (B[1] - A[1]) * t;
      let b = A[2] + (B[2] - A[2]) * t;
      const d2 = ((x - hlX) / 460) ** 2 + ((y - hlY) / 320) ** 2;
      const k = Math.exp(-d2) * 0.45;
      r += (255 - r) * k;
      g += (255 - g) * k;
      b += (255 - b) * k;
      set(x, y, r | 0, g | 0, b | 0);
    }
  }

  /* subtle dot grid */
  for (let gy = 0; gy < H; gy += 42)
    for (let gx = 0; gx < W; gx += 42)
      for (let dy = 0; dy < 3; dy++)
        for (let dx = 0; dx < 3; dx++) {
          const i = ((gy + dy) * W + gx + dx) * 4;
          px[i] = Math.min(255, px[i] + 14);
          px[i + 1] = Math.min(255, px[i + 1] + 14);
          px[i + 2] = Math.min(255, px[i + 2] + 14);
        }

  const drawDot = (cx0, cy0, r, color) => {
    const R = Math.ceil(r);
    const r2 = r * r;
    for (let dy = -R; dy <= R; dy++)
      for (let dx = -R; dx <= R; dx++) {
        if (dx * dx + dy * dy > r2) continue;
        set(cx0 + dx, cy0 + dy, color[0], color[1], color[2]);
      }
  };

  /* layout: wrap to ≤3 lines, auto dot size */
  const lines = wrapTitle(title, 14);
  const cols = (l) => [...l].reduce((n, ch) => n + (ch === " " ? 3 : 6), -1);
  const longest = Math.max(...lines.map(cols), 1);
  const SCALE = Math.max(12, Math.min(56, Math.floor((W * 0.82) / longest)));
  const rowH = Math.round(7 * SCALE * 1.35);
  const blockH = lines.length * rowH;
  const y0 = Math.round((H - blockH) / 2);
  const INK = [255, 255, 255];

  lines.forEach((line, li) => {
    let x0 = Math.round((W - cols(line) * SCALE) / 2);
    const yy = y0 + li * rowH;
    for (const ch of line) {
      if (ch !== " ") {
        const g = GLYPH(ch);
        if (g) {
          for (let ry = 0; ry < 7; ry++)
            for (let cx = 0; cx < 5; cx++)
              if (g[ry][cx] === "1")
                drawDot(x0 + cx * SCALE + SCALE / 2, yy + ry * SCALE + SCALE / 2, SCALE * 0.38, INK);
        }
      }
      x0 += (ch === " " ? 3 : 6) * SCALE;
    }
  });

  /* accent underline bar under the last line */
  const lastCols = cols(lines[lines.length - 1]);
  if (lastCols > 0) {
    const barW = Math.min(lastCols * SCALE, W * 0.82);
    const barX = Math.round((W - barW) / 2);
    const barY = y0 + (lines.length - 1) * rowH + 7 * SCALE + 24;
    for (let y = barY; y < barY + 10; y++)
      for (let x = barX; x < barX + barW; x++) set(x, y, 255, 255, 255);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, encodePNG(px, W, H));
  return out;
}

/* ---------------- registry helpers (protect real screenshots) ---------------- */
const readRegistry = () => {
  try {
    const r = JSON.parse(readFileSync(REGISTRY, "utf8"));
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
};
const writeRegistry = (entries) => {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(REGISTRY, JSON.stringify(entries, null, 2) + "\n");
};

/** like generateCover + registry bookkeeping */
export async function coverForEntry(entry) {
  const file = `${entry.name}.png`;
  const out = join(OUT_DIR, file);
  await generateCover({ title: entry.title ?? entry.name, out, seed: entry.name });
  const reg = readRegistry().filter((r) => r.file !== file);
  reg.push({ name: entry.name, title: entry.title ?? entry.name, file });
  writeRegistry(reg);
  return `/projects/${file}`;
}

/* ---------------- CLI ---------------- */
const invokedDirect =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirect) {
  const JSON_PATH = join(ROOT, "src", "data", "github-projects.json");
  if (!existsSync(JSON_PATH)) {
    console.log("[generate-covers] no github-projects.json — nothing to do");
  } else {
    const entries = JSON.parse(readFileSync(JSON_PATH, "utf8"));
    const reg = readRegistry();
    let n = 0;
    for (const e of entries) {
      const hit = reg.find((r) => r.name === e.name);
      if (!hit) continue; // real screenshot — never touch
      await generateCover({ title: e.title ?? e.name, out: join(OUT_DIR, hit.file), seed: e.name });
      hit.title = e.title ?? e.name;
      n++;
    }
    writeRegistry(reg);
    console.log(`[generate-covers] ✓ regenerated ${n} cover(s)`);
  }
}
