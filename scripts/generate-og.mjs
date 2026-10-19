/**
 * scripts/generate-og.mjs — zero-dependency placeholder OG image generator.
 *
 * Creates public/og-image.png (1200×630) — a soft dark-indigo gradient with
 * block-rendered "AN" initials (5×7 bitmap font, no external font needed).
 *
 * RUN:            node scripts/generate-og.mjs
 * WHEN TO RERUN:  only to regenerate the placeholder, or to recolor below.
 * REPLACE:        with a real branded 1200×630 image any time — same filename,
 *                 index.html already points at /og-image.png.
 */
import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;

/* ---------- PNG primitives ---------- */
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
  /* filter 0 per scanline */
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
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(flat, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- drawing ---------- */
const px = Buffer.alloc(W * H * 4);

const bgA = [15, 20, 40]; // top-left tone
const bgB = [6, 9, 22]; // bottom-right tone
const glow = [79, 70, 229]; // indigo accent
const glowX = W * 0.72;
const glowY = H * 0.28;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x / W + y / H) / 2;
    let r = bgA[0] + (bgB[0] - bgA[0]) * t;
    let g = bgA[1] + (bgB[1] - bgA[1]) * t;
    let b = bgA[2] + (bgB[2] - bgA[2]) * t;

    const d2 = ((x - glowX) / 420) ** 2 + ((y - glowY) / 300) ** 2;
    const k = Math.exp(-d2) * 0.5;
    r += (glow[0] - r) * k;
    g += (glow[1] - g) * k;
    b += (glow[2] - b) * k;

    const i = (y * W + x) * 4;
    px[i] = Math.min(255, r | 0);
    px[i + 1] = Math.min(255, g | 0);
    px[i + 2] = Math.min(255, b | 0);
    px[i + 3] = 255;
  }
}

/* 5×7 bitmap font (A, N) — enough for the initials placeholder */
const GLYPHS = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  N: ["10001", "11001", "11001", "10101", "10011", "10001", "10001"],
};

const SCALE = 32; // dot pitch
const GAP = 34;
const INK = [244, 246, 255];
const SUB = [129, 140, 248]; // indigo-300 accent bar

/** filled circular dot centered in (x0,y0) */
function drawDot(cx0, cy0, r, color) {
  const R = Math.ceil(r);
  const r2 = r * r;
  for (let dy = -R; dy <= R; dy++) {
    for (let dx = -R; dx <= R; dx++) {
      if (dx * dx + dy * dy > r2) continue;
      const x = cx0 + dx;
      const y = cy0 + dy;
      if (x < 0 || x >= W || y < 0 || y >= H) continue;
      const i = (y * W + x) * 4;
      px[i] = color[0];
      px[i + 1] = color[1];
      px[i + 2] = color[2];
    }
  }
}

function drawGlyph(letter, x0, y0, color) {
  const rows = GLYPHS[letter];
  for (let ry = 0; ry < rows.length; ry++)
    for (let cx = 0; cx < 5; cx++)
      if (rows[ry][cx] === "1")
        drawDot(x0 + cx * SCALE + SCALE / 2, y0 + ry * SCALE + SCALE / 2, SCALE * 0.36, color);
}

const letters = ["A", "N"];
const blockW = 5 * SCALE;
const blockH = 7 * SCALE;
const totalW = letters.length * blockW + (letters.length - 1) * GAP;
const x0 = Math.round((W - totalW) / 2);
const y0 = Math.round((H - blockH) / 2 - 24);

/* letters — dot-matrix pass (deliberate LED-sign style) */
for (const [idx, letter] of letters.entries())
  drawGlyph(letter, x0 + idx * (blockW + GAP), y0, INK);

/* accent underline bar */
const barW = totalW;
const barH = 10;
const barX = x0;
const barY = y0 + blockH + 50;
for (let y = barY; y < barY + barH; y++)
  for (let x = barX; x < barX + barW; x++) {
    const i = (y * W + x) * 4;
    px[i] = SUB[0];
    px[i + 1] = SUB[1];
    px[i + 2] = SUB[2];
  }

/* ---------- write ---------- */
const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", "public", process.env.OG_OUT ?? "og-image.png");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, encodePNG(px, W, H));
console.log(`✓ written: public/og-image.png (${W}×${H})`);
